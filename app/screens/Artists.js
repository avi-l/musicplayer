import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AudioContext from '../context/AudioProvider'
import { colorScheme } from '../constants/constants'
import { List, ListItem, Avatar } from '@rneui/themed'

export default function Artists() {
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