import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Alert, View } from "react-native";
import { editData, getData } from "../../features/AsyncStorageTask";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "@react-native-community/checkbox";
import { DatePicker } from "../../components/DatePicker";

const actionEditTask = (key, taskTitle, taskDescription, taskStatut, taskImportanceChoice, user, dateLimite, navigation) => {
	const editTask = {
		taskTitle: taskTitle,
		taskDescription: taskDescription,
		taskStatut: taskStatut,
		taskImportance: taskImportanceChoice,
		taskUser: user,
		taskDateLimite: dateLimite
	}

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
	const [title, setTitle] = useState()
	const [description, setDescription] = useState()
	const [statut, setStatut] = useState()
	const [user, setUser] = useState()

	const [taskImportanceChoice, setTaskImportanceChoice] = useState('defaut')

	const [dateLimite, setDateLimite] = useState({
		jours: 0,
		mois: 0,
		annee: 0
	})

	const [showDatePicker, setShowDatePicker] = useState()

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

	useEffect(() => {
		getData(route.params.key).then(response => {
			setTitle(response.taskTitle)
			setDescription(response.taskDescription)
			setStatut(response.taskStatut)
			setTaskImportanceChoice(response.taskImportance)
			setUser(response.taskUser)
			if (response.taskDateLimite.jours !== 0)
				setShowDatePicker(true)
			setDateLimite(response.taskDateLimite)
		}).catch(error => console.log(error))
	}, [])

	return (
		<SafeAreaView style={ styles.container }>
			<ScrollView>
				<Text style={ styles.title }>MODIFIER LA TÂCHE</Text>

				<View style={ styles.formGroup }>
					<Text>Titre</Text>
					<TextInput
						value={ title }
						onChangeText={ (text) => setTitle(text) }
						placeholder="Titre"
						style={ [styles.textInput] }
					/>
				</View>

				<View style={ styles.formGroup }>
					<Text>Description</Text>
					<TextInput
						multiline
						numberOfLines={ 6 }
						value={ description }
						onChangeText={ (text) => setDescription(text) }
						placeholder="Description"
						style={ [styles.textInput, styles.textInputArea] }
					/>
				</View>

				<View style={ styles.formGroup }>

					<Text>Statut</Text>
					<View style={ styles.picker }>
						<Picker
							selectedValue={ statut }
							onValueChange={ itemValue =>
								setStatut(itemValue)
							}>
							<Picker.Item label="En cours" value="todo"/>
							<Picker.Item label="A faire" value="in-progress"/>
							<Picker.Item label="Fait" value="done"/>
						</Picker>
					</View>
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
							<Picker.Item label="Toute l'équipe" value="all"/>
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
						<DatePicker setDateLimite={ setDateLimite.bind(this) } dateLimite={ dateLimite }/>
					</View>
				</View>

				<TouchableOpacity
					onPress={ () => {
						actionEditTask(route.params.key, title, description, statut, taskImportanceChoice, user, dateLimite, navigation)
					} }
					style={ [styles.button, styles.buttonSuccess, styles.shadow] }
				>
					<Text style={ styles.textButton }>MODIFIER LA TÂCHE</Text>
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
		backgroundColor: '#82aaff',
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

		minHeight: 50,

		backgroundColor: '#fafafa',

		marginBottom: 10,
		marginTop: 5,
		padding: 15
	},

	textInputArea: {
		textAlignVertical: 'top',

		minHeight: 100
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
