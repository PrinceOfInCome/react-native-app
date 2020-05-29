import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'

export default class MessengerApp extends Component {
	render() {
		return (
			<SafeAreaView style = {styles.container} >
				<Text> textInComponent </Text>
			</SafeAreaView>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
})
