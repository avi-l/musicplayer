import { StackActions, TabActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useState, useCallback } from 'react'
import { Button, ButtonGroup, withTheme } from '@rneui/base';
import { Image, StyleSheet, SafeAreaView, StatusBar, View, Text } from 'react-native'
import DocumentPicker, {
    DirectoryPickerResponse, DocumentPickerResponse, isInProgress, types,
} from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob';
import AudioContext from '../context/AudioProvider';
import { extractMetaData, buffer2base64 } from '../utilities/utils';
import { colorScheme } from '../constants/constants';


const FilePicker = () => {
    const [fileResponse, setFileResponse] = useState();
    const { updateSongList } = useContext(AudioContext)
    const navigation = useNavigation()

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                allowMultiSelection: true,
                type: [DocumentPicker.types.audio]
            });
            const fileBlob = await RNFetchBlob.fs.stat(response[0].uri)
            const metaData = await extractMetaData(fileBlob.path)
            const { data, format } = metaData.tags.picture;
            const base64img = buffer2base64(data)
            const newSongObj = {
                title: metaData.tags.title,
                url: fileBlob,
                id: Math.floor(Math.random() * 99999999999).toString(),
                artist: metaData.tags.artist,
                album: metaData.tags.album,
                artwork: `data:${format};base64,${base64img}`
            }
            setFileResponse(newSongObj);
            await updateSongList(newSongObj)
            navigation.dispatch(TabActions.jumpTo('Playlist'))
        } catch (err) {
            console.warn(err);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* <Image source={{ uri: fileResponse?.artwork }} size={75} style={{
                width: 150,
                height: 150,
                borderRadius: 15,
            }} /> */}
            <Button type="outline"
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
                buttonStyle={{
                    borderColor: colorScheme.light,
                    borderRadius: 10
                    
                }}
                titleStyle={{color: colorScheme.light}}
                title="Select A Song"
                onPress={() => handleDocumentSelection()} 
                />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorScheme.darkest,
    },
    uri: {
        paddingBottom: 8,
        paddingHorizontal: 18,
    },
    button: {
        color: colorScheme.light
    }
});

export default FilePicker; 