import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { storeData } from "../../features/AsyncStorageTask";

const createTask = (taskTitle, taskDescription, navigation) => {
	const newTask = { taskTitle: taskTitle, taskDescription: taskDescription }

	const ActionOnCreate = () => {
		Alert.alert(
			`La tâche "${ taskTitle }" à bien été créée.`,
			"",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{ text: "OK", onPress: () => navigation.navigate('GetAllTasks') }
			],
			{ cancelable: false }
		)
	}

	storeData(newTask).then(ActionOnCreate).catch(error => console.log(error))
}

export const CreateTask = ({ navigation }) => {
	const [state, setState] = useState({
		taskTitle: '',
		taskDescription: '',
	})

	const handleSetState = (key, value) => {
		setState({ ...state, [key]: value })
	}

	return (
		<View style={ styles.container }>
			<Text style={ styles.title }>NOUVELLE TÂCHE</Text>

			<Text>Titre</Text>
			<TextInput
				value={ state.taskTitle }
				onChangeText={ (text) => handleSetState('taskTitle', text) }
				placeholder="Titre"
				style={ [styles.textInput] }
			/>

			<Text>Description</Text>
			<TextInput
				multiline
				numberOfLines={ 6 }
				value={ state.taskDescription }
				onChangeText={ (text) => handleSetState('taskDescription', text) }
				placeholder="Description"
				style={ [styles.textInput, styles.textInputArea] }
			/>

			<TouchableOpacity
				onPress={ () => createTask(state.taskTitle, state.taskDescription, navigation) }
				style={ [styles.button, styles.buttonSuccess, styles.shadow] }
			>
				<Text style={ styles.textButton }>CREER LA TÂCHE</Text>
			</TouchableOpacity>
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
