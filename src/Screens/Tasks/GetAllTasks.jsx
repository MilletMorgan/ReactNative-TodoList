import React, { useEffect, useState } from "react";
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faInfoCircle, faSortDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { clearAll, getAllTasks, removeValue } from "../../features/AsyncStorageTask";
import { GetTask } from "./GetTask";
import { EditTask } from "./EditTask";
import { Picker } from "@react-native-picker/picker";

const Item = ({ item, functionPropNameHere }) => {
	let styleByImportance = item.taskInfo.taskImportance
	let itemStyle

	if (styleByImportance === 'important')
		itemStyle = styles.important
	else if (styleByImportance === 'mineur')
		itemStyle = styles.mineur

	return (
		<View style={ [styles.item, itemStyle] }>
			<View style={ styles.infos }>
				<Text style={ styles.taskTitle }>{ item.taskInfo.taskTitle }</Text>
				<Text style={ styles.taskDescription }>{ item.taskInfo.taskDescription }</Text>
			</View>
			<View style={ styles.actions }>
				<TouchableOpacity onPress={ () => {
					removeValue(item.taskKey)
						.then(r => console.log("response : ", r))
						.catch(error => console.log("error : ", error))
					functionPropNameHere()
				}
				}>
					<View style={ {
						backgroundColor: '#FFF',
						padding: 5,
						borderRadius: 1000,
					} }>
						<FontAwesomeIcon icon={ faTrashAlt } style={ styles.buttonTrash }/>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export const GetAllTasks = ({ navigation }) => {
	const [tasksTodo, setTasksTodo] = useState([])
	const [tasksInProgress, setTasksInProgress] = useState([])
	const [tasksDone, setTasksDone] = useState([])
	const [user, setUser] = useState('all')

	useEffect(() => {
		return navigation.addListener('focus', () => {
			ReloadData()
		})
	}, [navigation])

	useEffect(() => {
		ReloadData()
	}, [user])

	const ReloadData = () => {
		getAllTasks().then(response => {
			setTasksTodo(response.filter(statut => statut.taskInfo.taskStatut === 'todo').filter(task => task.taskInfo.taskUser === user))
			setTasksInProgress(response.filter(statut => statut.taskInfo.taskStatut === 'in-progress').filter(task => task.taskInfo.taskUser === user))
			setTasksDone(response.filter(statut => statut.taskInfo.taskStatut === 'done').filter(task => task.taskInfo.taskUser === user))
		}).catch(error => console.log("ERROR : ", error))
	}

	const renderItem = ({ item }) => (
		<View>
			<TouchableOpacity onPress={ () => navigation.navigate('GetTask', item.taskKey) }
							  onLongPress={ () => navigation.navigate('EditTask', {
								  key: item.taskKey,
							  }) }
			>
				<Item functionPropNameHere={ ReloadData }
					  item={ item } style={ styles.shadow }
				/>
			</TouchableOpacity>
		</View>
	)

	const renderNoContent = ({ section }) => {
		if (section.data.length === 0) {
			return (
				<View>
					<Text>Aucune tâche ici pour l'instant</Text>
				</View>
			)
		}
		return null
	}

	return (
		<View style={ styles.container }>
			<View style={ styles.info }>
				<View style={ { flex: 0.1 } }>
					<FontAwesomeIcon icon={ faInfoCircle } style={ styles.infoIcon }/>
				</View>
				<View style={ { flex: 0.9 } }>
					<Text style={ styles.infoText }>Cliquer sur une tâche pour plus de détails.</Text>
					<Text style={ styles.infoText }>Laisser appuyer pour mettre à jour la tâche.</Text>
				</View>
			</View>
			<TouchableOpacity
				onPress={ () => {
				clearAll().then(r => console.log("response : ", r))
					ReloadData()
				} }
				style={ [styles.button, styles.buttonDelette, styles.shadow] }
			>
				<Text style={ [{ ...styles.textButton }] }>
					SUPPRIMER TOUTES LES TÂCHES
				</Text>
			</TouchableOpacity>

			<Text>Filtrer les tâches par utilisateur</Text>
			<View style={ styles.picker }>
				<View style={ styles.infos }>
					<Picker
						selectedValue={ user }
						style={ styles.textInput }
						onValueChange={ itemValue =>
							setUser(itemValue)
						}>
						<Picker.Item label="Toute l'équipe" value="all"/>
						<Picker.Item label="Dev Ops" value="devOps"/>
						<Picker.Item label="Dev mobile" value="devMobile"/>
						<Picker.Item label="Dev Web" value="devWeb"/>
					</Picker>
				</View>
				<View style={ styles.actions }>
					<View style={ {
						backgroundColor: '#FFF',
						padding: 5,
						borderRadius: 1000,
					} }>
						<FontAwesomeIcon icon={ faSortDown } style={ styles.buttonSortDown }/>
					</View>
				</View>
			</View>

			<SectionList
				renderSectionHeader={ ({ section: { title } }) => <Text style={ styles.listTitle }>{ title }</Text> }
				renderSectionFooter={ renderNoContent }
				sections={ [
					{ title: 'A faire', data: tasksTodo, renderItem: renderItem },
					{ title: 'In Progress', data: tasksInProgress, renderItem: renderItem },
					{ title: 'Done', data: tasksDone, renderItem: renderItem },
				] }
				keyExtractor={ item => item.taskKey }
			>
			</SectionList>
		</View>
	)
}

const styles = StyleSheet.create({
	listTitle: {
		fontWeight: 'bold',
		fontSize: 18,
	},

	mineur: {
		backgroundColor: "#717CB4",
	},

	important: {
		backgroundColor: '#e88d8d',
	},

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
		fontStyle: 'italic',
		color: '#8F93A2'
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
		marginVertical: 10,
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
		backgroundColor: '#EC464F',
	},

	buttonTrash: {
		color: '#EC464F',
		alignSelf: 'center',
	},

	buttonSortDown: {
		color: '#000',
		alignSelf: 'center',
	},

	textButton: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#fff',
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
		borderRadius: 5,
		backgroundColor: '#fafafa',
	},

	picker: {
		flex: 0.5,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		borderColor: '#e6e6e6',
		borderRadius: 5,
		borderWidth: 0.5,
		backgroundColor: '#fafafa',
	},
})
