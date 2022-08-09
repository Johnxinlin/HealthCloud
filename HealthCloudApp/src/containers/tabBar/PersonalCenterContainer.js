import React from 'react';
import {StyleSheet, View, Text, Button, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import {pxToDp} from '../../utils/stylesKits';

function PersonalCenterContainer() {
  return (
    <View>
      <ImageBackground
        source={require('../../img/blueBg4.jpg')}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
        <View
          style={{
            width: "auto",
            height: 50,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: '#FFF',
            justifyContent: 'center',
            alignSelf: 'center',
            // marginTop: 100,
            flex:1
          }}>
          <Text style={{color: 'black', fontSize: pxToDp(0, 20)}}>
            功能正在实现中，敬请期待
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default PersonalCenterContainer;
