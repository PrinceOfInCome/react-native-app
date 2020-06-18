import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
const {Value, timing} = Animated;
var {width, height} = Dimensions.get('window');

export default function Home({navigation}) {
  const _scroll_y = new Value(0);

  const _diff_clamp_scroll_y = Animated.diffClamp(_scroll_y, 0, 50);

  const _header_height = Animated.interpolate(_diff_clamp_scroll_y, {
    inputRange: [0, 50],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });

  const _header_translate_y = Animated.interpolate(_diff_clamp_scroll_y, {
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const _header_opacity = Animated.interpolate(_diff_clamp_scroll_y, {
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: _header_height,
            transform: [{translateY: _header_translate_y}],
            opacity: _header_opacity,
          },
        ]}>
        <Image
          style={{width: 172, height: 60}}
          source={{
            uri:
              'https://download.logo.wine/logo/Facebook/Facebook-Logo.wine.png',
          }}
        />
        <View style={styles.view_fb}>
          <View style={styles.icon_facebook}>
            <Icon
              onPress={() => alert('Hello')}
              name="sistrix"
              size={28}
              color="black"
            />
          </View>
          <View style={styles.icon_facebook}>
            <Icon1
              onPress={() => navigation.navigate('Chat')}
              name="message1"
              size={24}
              color="black"
            />
          </View>
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={[styles.scroll_view, {}]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={10}
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {y: _scroll_y}},
          },
        ])}>
        <View style={[styles.fake_post, {backgroundColor: '#222222'}]} />
        <View style={[styles.fake_post, {backgroundColor: '#333333'}]} />
        <View style={[styles.fake_post, {backgroundColor: '#444444'}]} />
        <View style={[styles.fake_post, {backgroundColor: '#555555'}]} />
        <View style={[styles.fake_post, {backgroundColor: '#666666'}]} />
        <View style={[styles.fake_post, {backgroundColor: '#222222'}]} />
        <View style={[styles.fake_post, {backgroundColor: '#333333'}]} />
        <View style={[styles.fake_post, {backgroundColor: '#444444'}]} />
        <View style={[styles.fake_post, {backgroundColor: '#555555'}]} />
        <View style={[styles.fake_post, {backgroundColor: '#666666'}]} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  icon_facebook: {
    backgroundColor: '#e4e6eb',
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    right: 16,
  },
  view_fb: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scroll_view: {
    flex: 1,
    marginBottom: 72,
  },
  fake_post: {
    height: 250,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
});
