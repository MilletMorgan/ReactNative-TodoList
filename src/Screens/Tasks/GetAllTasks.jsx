import React, { useEffect, useState } from "react";
import { getAllTasks, clearAll, removeValue } from "../../features/AsyncStorageTask";
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import { createStackNavigator } from '@react-navigation/stack';
import { GetTask } from "./GetTask";

const Stack = createStackNavigator()

const Item = ({ item }) => {
	return (
		<View style={ styles.item }>
			<View style={ styles.infos }>
				<Text style={ styles.taskTitle }>{ item.taskInfo.taskTitle }</Text>
				<Text style={ styles.taskDescription }>{ item.taskInfo.taskDescription }</Text>
			</View>
			<View style={ styles.actions }>
				<TouchableOpacity onPress={ () => removeValue(item.taskKey) }>
					<View>
						<FontAwesomeIcon icon={ faTrashAlt } style={ styles.buttonTrash }/>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const GetAllTasksScreen = ({ navigation }) => {
	const [allTasks, setAllTasks] = useState([])

	useEffect(() => {
		getAllTasks().then(response => setAllTasks(response)).catch(error => console.log(error))
	})

	const renderItem = ({ item }) => (
		<TouchableOpacity onPress={ () => navigation.navigate('GetTask', item.taskKey) }>
			<Item item={ item } style={ styles.shadow }/>
		</TouchableOpacity>
	)

	return (
		<View style={ styles.container }>
			<Text style={ styles.title }>LISTES DES TÂCHES</Text>
			<View style={ styles.info }>
				<View style={ { flex: 0.1 } }>
					<FontAwesomeIcon icon={ faInfoCircle } style={ styles.infoIcon }/>
				</View>
				<View style={ { flex: 0.9 } }>
					<Text style={ styles.infoText }>Cliquer sur une tâche pour plus de détails.</Text>
				</View>
			</View>
			<TouchableOpacity
				onPress={ () => clearAll() }
				style={ [styles.button, styles.buttonDelette, styles.shadow] }
			>
				<Text style={ styles.textButton }>SUPPRIMER TOUT</Text>
			</TouchableOpacity>
			<SafeAreaView style={ styles.list }>
				<FlatList
					data={ allTasks }
					renderItem={ renderItem }
					keyExtractor={ item => item.taskKey }
				/>
			</SafeAreaView>
		</View>
	)
}

export const GetAllTasks = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="GetAllTasksScreen"
						  component={ GetAllTasksScreen }
						  options={ { title: 'Liste des tâches' } }/>
			<Stack.Screen name="GetTask"
						  component={ GetTask }
						  options={ { title: 'Détail' } }/>
		</Stack.Navigator>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		flexDirection: 'column',

		textAlign: 'center',
		paddingHorizontal: 10,
	},
	list: {
		flex: 1,

		backgroundColor: '#eee',
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',


		padding: 20,
		marginVertical: 8,

		borderColor: '#e6e6e6',
		borderRadius: 5,
		borderWidth: 0.5,
		backgroundColor: '#fafafa',

	},
	taskTitle: {
		fontSize: 15,
		fontWeight: 'bold'
	},
	taskDescription: {
		backgroundColor: '#fafafa',
	},

	infos: {
		flex: 1,
	},

	info: {
		flex: 0.1,
		flexDirection: 'row',
		alignItems: 'center',

		padding: 15,

		backgroundColor: "#717CB4",
		borderRadius: 5,
	},

	infoText: {
		color: "#FFF"
	},

	infoIcon: {
		color: "#FFF"
	},

	actions: {
		flex: 0.1,
	},

	title: {
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 20,
	},

	button: {
		borderRadius: 5,
		padding: 15,
		marginTop: 10,
		marginBottom: 10,
	},

	buttonDelette: {
		backgroundColor: '#e88d8d',
	},

	buttonTrash: {
		color: '#e88d8d',
		alignSelf: 'center',
	},

	textButton: {
		textAlign: 'center',
		fontWeight: 'bold',
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
