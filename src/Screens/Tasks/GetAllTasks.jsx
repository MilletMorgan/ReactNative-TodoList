import React, { useEffect, useState } from "react";
import { getAllTasks, clearAll } from "../../features/AsyncStorageTask";
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";

const Item = ({ title, description }) => {
	return (
		<View style={ styles.item }>
			<Text style={ styles.taskTitle }>{ title }</Text>
			<Text style={ styles.taskDescription }>{ description }</Text>
		</View>
	)
}

export const GetAllTasks = () => {
	const [allTasks, setAllTasks] = useState([])

	useEffect(() => {
		getAllTasks().then(response => setAllTasks(response)).catch(error => console.log(error))
	}, [])

	const renderItem = ({ item }) => (
		<Item title={ item.taskInfo.taskTitle } description={ item.taskInfo.taskDescription }/>
	)

	return (
		<View style={ styles.container }>
			<Text styles={ styles.title }>Listes des taches</Text>
			<TouchableOpacity
				onPress={ () => clearAll() }
				style={ [styles.button, styles.buttonSuccess, styles.shadow] }
			>
				<Text style={ styles.textButton }>Supprimer toutes les tâches</Text>
			</TouchableOpacity>
			<SafeAreaView style={styles.list}>
				<FlatList
					data={ allTasks }
					renderItem={ renderItem }
					keyExtractor={ item => item.taskKey }
				/>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee',
		flexDirection: 'column',

		textAlign: 'center',
	},
	list: {
		flex: 1,


		backgroundColor: '#eee',

	},
	item: {
		flex: 0.5,


		padding: 20,
		marginVertical: 8,

		borderColor: '#e6e6e6',
		borderRadius: 5,
		borderWidth: 0.5,
		backgroundColor: '#fafafa',

	},
	title: {
		fontSize: 25,
		fontWeight: 'bold'
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
});
