import React, { useEffect, useState } from 'react';
import jsmediatags from '@avi-l/jsmediatags'
import { Buffer } from 'buffer';
import TrackPlayer,
{
    Capability, Event, RepeatMode, State,
    usePlaybackState, useProgress, useTrackPlayerEvents
} from 'react-native-track-player'
import { colorScheme } from './app/constants/constants';

export const extractMetaData = async (file) => new Promise(
  (resolve, reject) => {
    new jsmediatags.Reader(file)
      .read({
        onSuccess: (tag) => {
          resolve(tag);
        },
        onError: (error) => {
          reject(error);
        }
      });
  })
  .then(tagInfo => {
    return tagInfo
  })
  .catch(error => {
    return error
  });

export const buffer2base64 = (arrayBuffer) => {
  try {
    return Buffer.from(arrayBuffer).toString('Base64')
  } catch (error) {
    return error;
  }
}
export const initializePlayer = async () => {
    try {
      const ct = await TrackPlayer.getCurrentTrack()
      const res = await TrackPlayer.setupPlayer({})
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ]
      })
      return res;
    } catch (error) {
      return error;
    }
  }




