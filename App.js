import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants'


import { Navigation } from "./src/navigation/Navigation";

export default function App() {
	return (
		<View style={ styles.container }>
			<Navigation/>
			<StatusBar style="auto"/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,

	},
});
