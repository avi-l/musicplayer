import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AudioContext from '../context/AudioProvider'
import { colorScheme } from '../constants/constants'
import { ListItem, Avatar } from '@rneui/themed'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabActions, useNavigation } from '@react-navigation/native'
export default function Playlist() {
  const navigation = useNavigation()
  const { songList } = useContext(AudioContext)

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem bottomDivider containerStyle={styles.listItemContainer}>
      <Avatar source={{ uri: item.artwork }} rounded size={50} />
      <ListItem.Content  >
        <ListItem.Title style={styles.text}>{item.artist}</ListItem.Title>
        <ListItem.Subtitle style={styles.text}>{item.title}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <FlatList
          data={songList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
        {/* <TouchableOpacity onPress={() => navigation.dispatch(TabActions.jumpTo('Add Audio'))}>
          <MaterialCommunityIcons name='playlist-plus' size={30} />
        </TouchableOpacity> */}
      </View>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colorScheme.darkest,
  },
  listItemContainer: {
    backgroundColor: colorScheme.darkest
  },
  text: {
    // flexDirection: 'row', 
    color: colorScheme.lightest
  }
})