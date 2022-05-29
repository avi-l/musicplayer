import React, { useEffect, useContext, useState, useCallback } from 'react'

import { Image, StyleSheet, SafeAreaView, StatusBar, View, Text, Button } from 'react-native'
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob';
import AudioContext from '../context/AudioProvider';
import { extractMetaData, buffer2base64 } from '../utilities/utils';


const FilePicker = () => {
    const [fileResponse, setFileResponse] = useState();
    const [imgString, setImgString] = useState()
    const { songList, updateSongList } = useContext(AudioContext)

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
        } catch (err) {
            console.warn(err);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            {/* {fileResponse.map((file, index) => (
                <><Text
                    key={index.toString()}
                    style={styles.uri}
                    numberOfLines={1}
                    ellipsizeMode={'middle'}>
                    {file?.width}
                    {file?.heigth}

                </Text>
                </>

            ))} */}
            {/* <Text style={{color: 'black'}}>{fileResponse}</Text> */}
            
            <Image source={{ uri: fileResponse?.artwork }} size={75} style={{
                width: 150,
                height:  150,
                borderRadius: 15,
                backgroundColor: 'red',
            }} />
          
            <Button title="Select 📑" onPress={handleDocumentSelection} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',
    },
    uri: {
        paddingBottom: 8,
        paddingHorizontal: 18,
    },
});

export default FilePicker; 