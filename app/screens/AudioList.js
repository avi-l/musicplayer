import { StyleSheet, Text, View , FlatList} from 'react-native'
import React, {useContext} from 'react'

import AudioContext from '../context/AudioProvider'

export default function AudioList() {
  const { songList } = useContext(AudioContext)

  return (
    <View style={styles.container}>
      <Text style={{marginTop: 20, flexDirection: 'row',color: 'black'}}> Songs </Text>
    <FlatList
        data={songList}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item }) => (
        <><Text style={{ color: 'black' }}>{item.artist}</Text>
        <Text style={{ color: 'black' }}>{item.title}</Text>
        <Text style={{ color: 'black' }}>{item.album}</Text></>
        )}
    />
</View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'gray',
        marginTop: 20, 
        flexDirection: 'row'
    },
})