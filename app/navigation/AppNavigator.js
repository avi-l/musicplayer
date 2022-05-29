
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {View, Text} from 'react-native'
import AudioList from '../screens/AudioList'
import MusicPlayer from '../screens/MusicPlayer'
import PlayList from '../screens/PlayList'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FilePicker from '../component/FilePicker'

const Tab = createBottomTabNavigator()
const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='AudioList' component={AudioList} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="playlist-play" size={size} color={color} />
                ),
                headerShown: false
            }}
            />
            <Tab.Screen name='MusicPlayer' component={MusicPlayer} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="cassette" size={size} color={color} />
                ),
                headerShown: false
            }} 
 
            />
            <Tab.Screen name='PlayLists' component={PlayList} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="playlist-music" size={size} color={color} />
                ),
                headerShown: false
            }}
            />
            <Tab.Screen name='Add Audio' component={FilePicker} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="playlist-music" size={size} color={color} />
                ),
                headerShown: false
            }}
            />
        </Tab.Navigator>
    )
}
export default AppNavigator;