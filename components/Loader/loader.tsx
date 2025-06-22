import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <DotLottieReact
        src="https://lottie.host/044108e2-0678-4e0e-86de-3f95612aa281/hsxo6FOPUe.lottie"
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}  
      />
    </View>
  );
}
