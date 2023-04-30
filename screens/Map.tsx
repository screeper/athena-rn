import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import React from 'react';
import { Image, View } from 'react-native';

const Map = () => {
  return (
    <ReactNativeZoomableView
      //   maxZoom={2}
      //   minZoom={0.1}
      maxZoom={1.5}
      minZoom={0.15}
      zoomStep={0.5}
      initialZoom={0.15}
      // // Give these to the zoomable view so it can apply the boundaries around the actual content.
      // // Need to make sure the content is actually centered and the width and height are
      // // dimensions when it's rendered naturally. Not the intrinsic size.
      // // For example, an image with an intrinsic size of 400x200 will be rendered as 300x150 in this case.
      // // Therefore, we'll feed the zoomable view the 300x150 size.
      contentWidth={2200}
      contentHeight={2734}
    >
      <View>
        <Image source={require('../assets/buskers-map.jpg')} />
      </View>
    </ReactNativeZoomableView>
  );
};

export default Map;
