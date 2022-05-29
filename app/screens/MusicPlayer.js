import {
    Image, View, TouchableOpacity,
    Dimensions, StyleSheet, Text, Animated, ActivityIndicator
} from 'react-native'
import React, { useEffect, useContext, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { songs } from '../model/data'
import Slider from '@react-native-community/slider'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import TrackPlayer,
{
    Capability, Event, RepeatMode, State,
    usePlaybackState, useProgress, useTrackPlayerEvents
} from 'react-native-track-player'
import AudioContext from '../context/AudioProvider'
import { colorScheme } from '../constants/constants'
const { width, height } = Dimensions.get('window')

export default function MusicPlayer() {
    const playbackState = usePlaybackState()
    const progress = useProgress()
    const scrollX = useRef(new Animated.Value(0)).current
    const songSlider = useRef(null)
    const [songIndex, setSongIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [repeatMode, setRepeatMode] = useState('off')
    const [trackArtwork, setTrackArtwork] = useState()
    const [trackTitle, setTrackTitle] = useState()
    const [trackArtist, setTrackArtist] = useState()
    const { songList } = useContext(AudioContext)

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const { title, artwork, artist } = track;
            setTrackArtist(artist);
            setTrackTitle(title);
            setTrackArtwork(artwork);
        }
    })

    useEffect(() => {
        setUpPlayer()
        scrollX.addListener(({ value }) => {
            const index = Math.round(value / width)
            skipTo(index)
            setSongIndex(index)
        })
        return () => {
            scrollX.removeAllListeners()
        }
    }, [songList])

    const setUpPlayer = async () => {
        console.log(songList)
        try {
            await TrackPlayer.setupPlayer({})
            await TrackPlayer.updateOptions({
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ]
            })
            await TrackPlayer.add(songList.map(i=>i))
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const togglePlayback = async (playbackState) => {
            if (playbackState == State.Playing)
                await TrackPlayer.pause()
            else
                await TrackPlayer.play() 
    }

    const skipToNext = async () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width
        })
        // await TrackPlayer.skipToNext()
    }
    const skipToPrevious = async () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width
        })
        // await TrackPlayer.skipToPrevious()
    }
    const skipTo = async (trackId) => {
        await TrackPlayer.skip(trackId)
    }

    const repeatIcon = () => {
        if (repeatMode === 'off') {
            return 'repeat-off'
        }
        if (repeatMode === 'track') {
            return 'repeat-once'
        }
        if (repeatMode === 'repeat') {
            return 'repeat'
        }
    }

    const changeRepeatMode = () => {
        if (repeatMode === 'off') {
            setRepeatMode('track')
            TrackPlayer.setRepeatMode(RepeatMode.Track)
        }
        if (repeatMode === 'track') {
            setRepeatMode('repeat')
            TrackPlayer.setRepeatMode(RepeatMode.Queue)
        }
        if (repeatMode === 'repeat') {
            setRepeatMode('off')
            TrackPlayer.setRepeatMode(RepeatMode.Off)
        }
    }
    const renderSongs = ({ index, item }) => {
        return (
            <Animated.View style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={styles.artworkWrapper}>
                    <Image
                        source={{ uri: trackArtwork }}
                        style={styles.artworkImg}
                    />
                </View>
            </Animated.View>
        )
    }



    if (isLoading) {
        return (
            <View style={styles.activityIndicator} >
                <ActivityIndicator size="large" color={colorScheme.lightest} />
            </View>

        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={{ width: width }}>
                    <Animated.FlatList
                        ref={songSlider}
                        data={songs}
                        renderItem={renderSongs}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: { x: scrollX }
                                }
                            }],
                            { useNativeDriver: true }
                        )
                        }
                    />
                </View>
                <View >
                    <Text style={styles.songTitle}>{trackTitle}</Text>
                    <Text style={styles.artistName}>{trackArtist}</Text>
                </View>
                <View>
                    <Slider style={styles.progressContainer}
                        value={progress.position}
                        minimumValue={0}
                        maximumValue={progress.duration}
                        thumbTintColor={colorScheme.light}
                        minimumTrackTintColor={colorScheme.light}
                        maximumTrackTintColor={colorScheme.light}
                        onSlidingComplete={async (time) => {
                            await TrackPlayer.seekTo(time)
                        }}
                    />
                    <View style={styles.progressLabelContainer} >
                        <Text style={styles.progressLabelText}>
                            {new Date(progress.position * 1000).toISOString().substr(14, 5)}</Text>
                        <Text style={styles.progressLabelText}>
                            {new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}
                        </Text>
                    </View>
                    <View style={styles.musicControls} >
                        <TouchableOpacity onPress={() => skipToPrevious()}>
                            <Ionicons name="play-skip-back-outline" size={45} color={colorScheme.light} style={{ marginTop: 52 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
                            <Ionicons name={playbackState !== State.Playing ? "play-circle-outline" : "pause-circle-outline"} size={150} color={colorScheme.light} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => skipToNext()}>
                            <Ionicons name="play-skip-forward-outline" size={45} color={colorScheme.light} style={{ marginTop: 52 }} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomControls}>
                    <TouchableOpacity onPress={() => { console.log('hey') }}>
                        <Ionicons name="heart-outline" size={30} color={colorScheme.light} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeRepeatMode()}>
                        <MaterialCommunityIcons name={`${repeatIcon()}`} size={30} color={repeatMode !== 'off' ? colorScheme.lightest : colorScheme.light} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => { console.log('hey') }}>
                        <Ionicons name="upload" size={30} color={colorScheme.light} />
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => handlePicker()}>
                        <Ionicons name="ellipsis-horizontal-outline" size={30} color={colorScheme.light} />
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colorScheme.darkest
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorScheme.darkest,
    },
    activityIndicator: {
        backgroundColor: colorScheme.darkest,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        borderTopColor: colorScheme.light,
        borderTopWidth: 1,
        width: width,
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: colorScheme.darkest,
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    artworkWrapper: {
        width: 300,
        height: 340,
        marginBottom: 25,
    },
    artworkImg: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        backgroundColor: colorScheme.light,
    },
    songTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: colorScheme.lightest
    },
    artistName: {
        fontSize: 16,
        fontWeight: '200',
        textAlign: 'center',
        color: colorScheme.lightest
    },
    progressContainer: {
        width: 350,
        height: 40,
        marginTop: 24,
        flexDirection: 'row'
    },
    progressLabelContainer: {
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressLabelText: {
        color: colorScheme.light
    },
    musicControls: {
        width: 300,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
});