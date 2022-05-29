import React, { createContext, useState } from 'react'
import { songs } from '../model/data'
const AudioContext = createContext(undefined)
const AudioDispatchContext = createContext(undefined)

export function AudioProvider({ children }) {
    const [songList, setSongList] = useState(songs) 
    const updateSongList = async ({title, artist, artwork, url, id}) => {
        setSongList(prev => [
            ...prev, 
            {title, artist, artwork, url, id} 
        ])
    }
    return (
        <AudioContext.Provider value={{ songList, updateSongList }}>
            {children}
        </AudioContext.Provider>
    )
}

export default AudioContext;