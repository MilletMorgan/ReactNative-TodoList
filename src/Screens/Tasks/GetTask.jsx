import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { getData } from "../../features/AsyncStorageTask";

export const GetTask = (key) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	useEffect(() => {
		getData(key.route.params).then(response => {
			setTitle(response.taskTitle)
			setDescription(response.taskDescription)
		}).catch(error => console.log(error))
	}, [])

	return (
		<View style={ styles.container }>
			<Text style={ styles.title }>DETAIL DE LA TACHE</Text>
			<Text style={ styles.taskTitle }>{ title }</Text>
			<Text style={ styles.taskDescription }>{ description }</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',

		textAlign: 'center',
		marginHorizontal: 10,
	},

	title: {
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 20,
	},

	taskTitle: {
		fontSize: 22,
		fontWeight: 'bold'
	},

	taskDescription: {
		color: '#8F93A2',
	},

	shadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},

});
