import React, {Component} from 'react';
import { View } from 'react-native';
import ShakaPlayer from 'shaka-player-react';

export default function Player() {
  return (
          <View id="player">
              <ShakaPlayer autoPlay src='https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8' />
          </View>
  );               
}

