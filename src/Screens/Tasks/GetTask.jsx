import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getData } from "../../features/AsyncStorageTask";

export const GetTask = (key, { navigation }) => {
	const [task, setTask] = useState({
		title: '',
		description: '',
		user: '',
		importance: '',
		date: {}
	})

	let date

	if (task.date.jours === 0)
		date = 'Aucune date limite'
	else
		date = 'Date limite : ' + task.date.jours + '/' + task.date.mois + '/' + task.date.annee


	useEffect(() => {
		getData(key.route.params).then(response => {
			setTask({
				...task,
				['key']: response.taskKey,
				['title']: response.taskTitle,
				['description']: response.taskDescription,
				['user']: response.taskUser,
				['importance']: response.taskImportance,
				['date']: response.taskDateLimite
			})
		}).catch(error => console.log(error))
	}, [])

	return (
		<View style={ styles.container }>
			<Text style={ styles.title }>{ task.title }</Text>
			<View style={ { flexDirection: 'row' } }>
				<Text style={ styles.taskInfo }>Team : { task.user }</Text>
				<Text style={ styles.taskInfo }>{ date }</Text>
			</View>

			<TouchableOpacity onPress={ () => navigation.navigate('EditTask', { key: task.key, }) }
							  style={ [styles.button, styles.buttonSuccess, styles.shadow] }
			>
				<Text style={ styles.textButton }>Modifier la tâche</Text>
			</TouchableOpacity>

			<Text style={ styles.taskDescription }>{ task.description }</Text>

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

	taskInfo: {
		flex: 1,
		color: '#000'
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

	button: {
		borderRadius: 5,
		padding: 15,
		marginTop: 10,
		marginBottom: 10,
	},

	buttonSuccess: {
		backgroundColor: '#82aaff',
	},

	textButton: {
		textAlign: 'center',
		fontWeight: 'bold',
	},
});
