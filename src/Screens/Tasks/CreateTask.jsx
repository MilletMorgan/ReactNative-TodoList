import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { storeData } from "../../features/AsyncStorageTask";

import { Picker } from '@react-native-picker/picker';

import { DatePicker } from "../../components/DatePicker";

import CheckBox from '@react-native-community/checkbox';

const actionCreateTask = (taskTitle, taskDescription, taskImportanceChoice, user, dateLimite, navigation) => {
	const newTask = {
		taskTitle: taskTitle,
		taskDescription: taskDescription,
		taskStatut: 'todo',
		taskImportance: taskImportanceChoice,
		taskUser: user,
		taskDateLimite: dateLimite
	}

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
	const [task, setTask] = useState({
		taskTitle: '',
		taskDescription: '',
		taskImportance: 'defaut'
	})

	const [user, setUser] = useState('all')

	const [taskImportanceChoice, setTaskImportanceChoice] = useState('defaut')

	const [dateLimite, setDateLimite] = useState({
		jours: 0,
		mois: 0,
		annee: 0
	})

	const [showDatePicker, setShowDatePicker] = useState(false)

	const hideDate = () => {
		if (showDatePicker)
			return { display: 'flex' }
		else {

			return { display: 'none' }
		}
	}

	useEffect(() => {
		hideDate()
		if (!showDatePicker)
			setDateLimite({
				...dateLimite,
				['jours']: 0,
				['mois']: 0,
				['annee']: 0
			})
	}, [showDatePicker])

	const handleSetState = (key, value) => {
		setTask({ ...task, [key]: value })
	}

	return (
		<SafeAreaView style={ styles.container }>
			<ScrollView>
				<Text style={ styles.title }>NOUVELLE TÂCHE</Text>

				<View style={ styles.formGroup }>
					<Text>Titre</Text>
					<TextInput
						value={ task.taskTitle }
						onChangeText={ (text) => handleSetState('taskTitle', text) }
						placeholder="Titre"
						style={ [styles.textInput] }
					/>
				</View>

				<View style={ styles.formGroup }>
					<Text>Description</Text>
					<TextInput
						multiline
						numberOfLines={ 6 }
						value={ task.taskDescription }
						onChangeText={ (text) => handleSetState('taskDescription', text) }
						placeholder="Description"
						style={ [styles.textInput, styles.textInputArea] }
					/>
				</View>

				<View style={ styles.formGroup }>
					<Text>Ordre d'importance</Text>
					<View style={ styles.picker }>
						<Picker
							selectedValue={ taskImportanceChoice }
							onValueChange={ itemValue =>
								setTaskImportanceChoice(itemValue)
							}>
							<Picker.Item label="Defaut" value="defaut"/>
							<Picker.Item label="Mineur" value="mineur"/>
							<Picker.Item label="Important" value="important"/>
						</Picker>
					</View>
				</View>

				<View style={ styles.formGroup }>
					<Text>Attribuer la tâche à un utilisateur</Text>
					<View style={ styles.picker }>
						<Picker
							selectedValue={ user }
							onValueChange={ itemValue =>
								setUser(itemValue)
							}>
							<Picker.Item label="Toute l'équipe" value="all" key={ user.length }/>
							<Picker.Item label="Dev Ops" value="devOps"/>
							<Picker.Item label="Dev mobile" value="devMobile"/>
							<Picker.Item label="Dev Web" value="devWeb"/>
						</Picker>
					</View>
				</View>

				<View style={ styles.formGroup }>
					<View style={ { flex: 1, flexDirection: 'row' } }>
						<Text style={ { flex: 1 } }>
							Ajouter une date limite ?
						</Text>
						<CheckBox
							style={ { flex: 1 } }
							disabled={ false }
							value={ showDatePicker }
							onValueChange={ (newValue) => setShowDatePicker(newValue) }
						/>
					</View>

					<View style={ hideDate() }>
						<DatePicker setDateLimite={setDateLimite.bind(this)} dateLimite={dateLimite}/>
					</View>
				</View>

				<TouchableOpacity
					onPress={ () => {
						setTask({ ...task, ['taskDescription']: '', ['taskTitle']: '' })

						actionCreateTask(task.taskTitle, task.taskDescription, taskImportanceChoice, user, dateLimite, navigation)
					} }
					style={ [styles.button, styles.buttonSuccess, styles.shadow] }
				>
					<Text style={ styles.textButton }>CREER LA TÂCHE</Text>
				</TouchableOpacity>

			</ScrollView>
		</SafeAreaView>
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


		marginBottom: 10,
		marginTop: 5,
		padding: 15
	},

	textInputArea: {
		textAlignVertical: 'top',

		minHeight: 100
	},

	datePicker: {
		flex: 1
	},

	picker: {
		flex: 1,
		borderWidth: 0.5,
		borderColor: 'lightgrey',
		borderRadius: 5,
	},

	formGroup: {
		borderWidth: 0.5,
		borderColor: 'lightgrey',
		borderRadius: 5,
		padding: 5,
		marginBottom: 5,
		backgroundColor: '#FFF'
	},
});
