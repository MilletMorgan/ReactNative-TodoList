import React, { useEffect, useState } from "react";
import {
	Alert,
	Modal,
	SectionList,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View
} from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faInfoCircle, faTimesCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { clearAll, getAllTasks, removeValue } from "../../features/AsyncStorageTask";
import { GetTask } from "./GetTask";
import { EditTask } from "./EditTask";

import { MainStyles } from "../../styles/MainStyles";

const Item = ({ item, functionPropNameHere }) => {
	let styleByImportance = item.taskInfo.taskImportance
	let itemStyle

	if (styleByImportance === 'important')
		itemStyle = styles.important
	else if (styleByImportance === 'mineur')
		itemStyle = styles.mineur
	else
		itemStyle = styles.defaut

	return (
		<View style={ [MainStyles.item, itemStyle] }>
			<View style={ MainStyles.infos }>
				<Text style={ MainStyles.taskTitle }>{ item.taskInfo.taskTitle }</Text>
				<Text style={ MainStyles.taskDescription }>{ item.taskInfo.taskDescription }</Text>
				<Text style={ MainStyles.taskDescription }>{ item.taskInfo.taskImportance}</Text>
			</View>
			<View style={ MainStyles.actions }>
				<TouchableOpacity onPress={ () => {
					removeValue(item.taskKey)
						.then(r => console.log("response : ", r))
						.catch(error => console.log("error : ", error))
					functionPropNameHere()
				}
				}>
					<View>
						<FontAwesomeIcon icon={ faTrashAlt } style={ MainStyles.buttonTrash }/>
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
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		return navigation.addListener('focus', () => {
			ReloadData()
		})

	}, [navigation])

	const ReloadData = () => {
		getAllTasks().then(response => {
			setTasksTodo(response.filter(statut => statut.taskInfo.taskStatut === 'todo'))
			setTasksInProgress(response.filter(statut => statut.taskInfo.taskStatut === 'in-progress'))
			setTasksDone(response.filter(statut => statut.taskInfo.taskStatut === 'done'))
		}).catch(error => console.log("ERROR : ", error))
	}

	const renderItem = ({ item }) => (
		<View>
			<Modal
				animationType="slide"
				transparent={ true }
				visible={ modalVisible }
				onRequestClose={ () => {
					Alert.alert("Modal has been closed")
				} }
			>
				<View style={ MainStyles.centeredView }>
					<View style={ MainStyles.modalView }>
						<Text style={ MainStyles.modalTitle }>
							Mettre à jour la tâche { item.taskInfo.taskTitle }
						</Text>

						<TouchableOpacity
							style={ [MainStyles.modalButton, MainStyles.shadow] }
							onPress={ () => {
								setModalVisible(!modalVisible)
								navigation.navigate('EditTask', {
									key: item.taskKey,
								})
							} }
						>
							<Text style={ [MainStyles.textButton] }>MODIFIER LA TÂCHE</Text>
						</TouchableOpacity>


						<TouchableHighlight
							style={ { flex: 1, flexDirection: 'column-reverse', alignSelf: 'center' } }
							onPress={ () => setModalVisible(!modalVisible) }
						>
							<FontAwesomeIcon icon={ faTimesCircle } size={ 30 } style={ { color: '#e88d8d' } }/>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>

			<TouchableOpacity onPress={ () => navigation.navigate('GetTask', item.taskKey) }
							  onLongPress={ () => navigation.navigate('EditTask', {
								  key: item.taskKey,
							  }) }
			>
				<Item
					functionPropNameHere={ ReloadData }
					item={ item } style={ MainStyles.shadow }/>
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
		<View style={ MainStyles.container }>
			<View style={ MainStyles.info }>
				<View style={ { flex: 0.1 } }>
					<FontAwesomeIcon icon={ faInfoCircle } style={ MainStyles.infoIcon }/>
				</View>
				<View style={ { flex: 0.9 } }>
					<Text style={ MainStyles.infoText }>Cliquer sur une tâche pour plus de détails.</Text>
					<Text style={ MainStyles.infoText }>Laisser appuyer pour mettre à jour la tâche.</Text>
				</View>
			</View>
			<TouchableOpacity
				onPress={ () => {
					clearAll().then(r => console.log("response : ", r))
					ReloadData()
				} }
				style={ [MainStyles.button, MainStyles.buttonDelette, MainStyles.shadow] }
			>
				<Text style={ [{ ...MainStyles.textButton }] }>SUPPRIMER TOUT</Text>

			</TouchableOpacity>

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

	defaut: {

	},

	mineur: {
		backgroundColor: "#717CB4",
	},

	important: {
		backgroundColor: '#e88d8d',
	},
})
