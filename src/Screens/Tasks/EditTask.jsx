import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { editData, getData } from "../../features/AsyncStorageTask";

const actionEditTask = (key, taskTitle, taskDescription, taskStatut, navigation) => {
	const editTask = { taskTitle: taskTitle, taskDescription: taskDescription, taskStatut: taskStatut }

	const ActionOnEdit = () => {
		Alert.alert(
			`La tâche "${ taskTitle }" à bien été modifié.`,
			"",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{ text: "OK", onPress: () => navigation.goBack() }
			],
			{ cancelable: false }
		)
	}

	editData(key, editTask).then(ActionOnEdit).catch(error => console.log(error))
}


export const EditTask = ({ route, navigation }) => {

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [statut, setStatut] = useState('')
	const [buttonTitle, setButtonTitle] = useState('')

	useEffect(() => {
		getData(route.params.key).then(response => {
			setTitle(response.taskTitle)
			setDescription(response.taskDescription)
			setStatut(response.taskStatut)
		}).catch(error => console.log(error))
	}, [])

	const ChangeStatut = () => {
		if (statut === 'todo') {
			return (
				<TouchableOpacity
					onPress={ () => setStatut('in-progress') }
					style={ [styles.button, styles.buttonSuccess, styles.shadow] }
				>
					<Text style={ styles.textButton }>IN PROGRESS</Text>
				</TouchableOpacity>
			)
		}
		else if (statut === 'in-progress') {
			return (
				<TouchableOpacity
					onPress={ () => setStatut('done') }
					style={ [styles.button, styles.buttonSuccess, styles.shadow] }
				>
					<Text style={ styles.textButton }>DONE</Text>
				</TouchableOpacity>
			)
		}
		else
			return (<View/>)
	}

	return (
		<View style={ styles.container }>
			<View style={ styles.container }>
				<Text style={ styles.title }>MODIFIER LA TÂCHE</Text>

				<Text>Titre</Text>
				<TextInput
					value={ title }
					onChangeText={ (text) => setTitle(text) }
					placeholder="Titre"
					style={ [styles.textInput] }
				/>

				<Text>Description</Text>
				<TextInput
					multiline
					numberOfLines={ 6 }
					value={ description }
					onChangeText={ (text) => setDescription(text) }
					placeholder="Description"
					style={ [styles.textInput, styles.textInputArea] }
				/>

				<Text>Statut : { statut }</Text>

				<ChangeStatut/>

				<TouchableOpacity
					onPress={ () => {
						actionEditTask(route.params.key, title, description, statut, navigation)
					} }
					style={ [styles.button, styles.buttonSuccess, styles.shadow] }
				>
					<Text style={ styles.textButton }>MODIFIER LA TÂCHE</Text>
				</TouchableOpacity>
			</View>
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

	textButton: {
		textAlign: 'center',
		fontWeight: 'bold',
	},

	button: {
		borderRadius: 5,
		padding: 15,
		marginTop: 10,
		marginBottom: 10,
	},

	buttonSuccess: {
		backgroundColor: '#c3e88d',
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

	textInput: {
		flex: 0.1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		borderColor: '#e6e6e6',
		borderWidth: 0.5,
		borderRadius: 5,

		minHeight: 40,

		backgroundColor: '#fafafa',

		marginBottom: 10,
		marginTop: 5,
		padding: 15
	},

	textInputArea: {
		textAlignVertical: 'top',

		minHeight: 100
	},
});
