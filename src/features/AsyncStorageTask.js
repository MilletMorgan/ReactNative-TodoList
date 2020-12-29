import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
	let key = await getAllKeys()

	key = `@task${ key.length++ }`
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (e) {
		console.log('Error : ', e)
	}

	console.log("La tâche à bien été créer. key : ", key)
}

const editData = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (e) {
		console.log('Error : ', e)
	}

	console.log("La tâche à bien été editer.")
}

const getData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key)
		console.log("La tâche avec la clé key : ", key, " à bien été retourner.")
		return jsonValue != null ? JSON.parse(jsonValue) : null
	} catch (e) {
		console.log('Error : ', e)
	}
}

const getMultiple = async (keys) => {
	let values

	try {
		values = await AsyncStorage.multiGet(keys)
	} catch (e) {
		console.log('Error : ', e)
	}
	console.log('Plusieurs tâches ont bien été retourner.')
	return values
}

const getAllTasks = async () => {
	try {
		const keys = await AsyncStorage.getAllKeys()
		const result = await AsyncStorage.multiGet(keys)

		let allTask = []

		result.map((result, i, store) => {
			let key = store[i][0]
			let value = store[i][1]
			allTask.push({
				taskKey: key,
				taskInfo: {
					taskTitle: JSON.parse(value).taskTitle,
					taskDescription: JSON.parse(value).taskDescription,
					taskStatut: JSON.parse(value).taskStatut,
					taskImportance: JSON.parse(value).taskImportance,
					taskUser: JSON.parse(value).taskUser,
				}
			})
		})
		return allTask
	} catch (error) {
		console.log(error, " Il n'y a aucune tâche.")
	}
}

const getAllKeys = async () => {
	let keys = []

	try {
		keys = await AsyncStorage.getAllKeys()
	} catch (e) {
		console.log('Error : ', e)
	}

	console.log("Toutes les 'keys' ont été retourner.")
	return keys
}

const clearAll = async () => {
	try {
		await AsyncStorage.clear()
	} catch (e) {
		console.log('ERROR : ', e)
	}

	console.log('Toutes les tâches ont été effacé.')
}

const removeValue = async (key) => {
	try {
		await AsyncStorage.removeItem(key)
	} catch (e) {
		console.log('Error : ', e)
	}

	console.log('La tâche à bien été supprimer.')
}

export { storeData, getData, getAllKeys, getMultiple, getAllTasks, clearAll, removeValue, editData }
