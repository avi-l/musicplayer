
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text } from 'react-native'
import Artists from '../screens/Artists'
import MusicPlayer from '../screens/MusicPlayer'
import PlayList from '../screens/PlayList'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FilePicker from '../component/FilePicker'
import { colorScheme } from '../constants/constants'

const Tab = createBottomTabNavigator()
const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.bottomNavBar,
                tabBarActiveTintColor: colorScheme.light,
                tabBarShowLabel: false
            }}
        >
            {/* <Tab.Screen  style={styles.tabScreen} name='Artists' component={Artists} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons style={styles.icons} name="playlist-play" size={size} color={colorScheme.dark} />
                ),
                headerShown: false
            }}
            /> */}
            <Tab.Screen style={styles.tabScreen} name='MusicPlayer' component={MusicPlayer} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <><MaterialCommunityIcons style={styles.icons} name="cassette" size={size} color={focused ? colorScheme.lightest : colorScheme.light} />
                    <Text style={focused ? {color: colorScheme.lightest } : {color: colorScheme.light }}>Player</Text></>
                ),
                headerShown: false,
            }}

            />
            <Tab.Screen style={styles.tabScreen} name='Playlist' component={PlayList} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <><MaterialCommunityIcons style={styles.icons} name="playlist-music" size={size} color={focused ? colorScheme.lightest : colorScheme.light} />
                    <Text style={focused ? {color: colorScheme.lightest } : {color: colorScheme.light }}>Playlist</Text></>
                ),
                headerShown: false
            }}
            />
            <Tab.Screen style={styles.tabScreen} color={colorScheme.light} name='Add Audio' component={FilePicker} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <>
                        <MaterialCommunityIcons style={styles.icons} name="playlist-plus" size={size} color={focused ? colorScheme.lightest : colorScheme.light} />
                        <Text style={focused ? {color: colorScheme.lightest } : {color: colorScheme.light }}>Add Tracks</Text>
                    </>
                ),
                headerShown: false
            }}
            />
        </Tab.Navigator>
    )

}
const styles = StyleSheet.create({
    bottomNavBar: {
        backgroundColor: colorScheme.darkest,
        borderTopColor: colorScheme.light,
        height: 60
    },
    tabScreen: {
        color: colorScheme.light,
    },
    icons: {

    },
})
export default AppNavigator;