// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export default function PlayList() {
//   return (
//     <View>
//       <Text>Playlist</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
// })
import  React, {useState} from 'react';
import Permissions from 'react-native-permissions';
import { StyleSheet, View, Text } from 'react-native';



export default function PlayList() {

  const [ source, setSource ] = useState(null)

  React.useEffect(() => {

    (async () => {
      try {
        const status = await Permissions.request(Permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        if(status !== Permissions.RESULTS.GRANTED) {
          console.log("Permission fail", status)
          return
        }

        // const files = await Mediastore.readAudioVideoExternalMedias("")
        // console.log(files)

        // if(files.length > 0) {
        //   setSource({
        //     uri: files[0].contentUri
        //   })
        // }
      }
      catch (err) {
        console.log(err)
      }
    })()
  }, []);

  

  console.log(source)

  return (
    <View style={styles.container}>
      <Text>Hello, MediaStore!</Text>
       {source}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});