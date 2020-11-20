import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { getAllTasks, storeData } from "../../features/AsyncStorageTask";

const createTask = (taskTitle, taskDescription) => {
	const newTask = { taskTitle: taskTitle, tastDescription: taskDescription }

	storeData(newTask).then(() => console.log("La tâche à bien été créer.")).catch(error => console.log(error))

	// getAllTasks().then(response => console.log(response)).catch(error => console.log(error))
}

export const CreateTask = () => {
	const [state, setState] = useState({
		taskTitle: '',
		taskDescription: '',
	})

	const handleSetState = (key, value) => {
		setState({ ...state, [key]: value })
	}

	return (
		<View style={ styles.container }>

			<Text style={ styles.title }>Créer une nouvelle tâche</Text>

			<Text>Titre</Text>
			<TextInput
				value={ state.taskTitle }
				onChangeText={ (text) => handleSetState('taskTitle', text) }
				placeholder="Titre"
				style={ [styles.textInput] }
			/>

			<Text>Description</Text>
			<TextInput
				multiline={ true }
				numberOfLines={ 4 }
				value={ state.taskDescription }
				onChangeText={ (text) => handleSetState('taskDescription', text) }
				placeholder="Description"
				style={ [styles.textInput, styles.textInputArea] }
			/>


			<TouchableOpacity
				onPress={ () => createTask(state.taskTitle, state.taskDescription) }
				style={ [styles.button, styles.buttonSuccess, styles.shadow] }
			>
				<Text style={ styles.textButton }>Créer la tâche</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10
	},

	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
		textAlign: 'center'
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
		borderColor: '#e6e6e6',
		borderWidth: 0.5,
		backgroundColor: '#fafafa',
		width: 300,
		marginBottom: 10,
		marginTop: 5,
		padding: 15
	},

	textInputArea: {
		textAlignVertical: 'top',
	},
});
