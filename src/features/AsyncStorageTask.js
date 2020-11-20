import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
	let key = await getAllKeys()

	key = `@task${ key.length++ }`

	console.log("key : ", key)

	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (e) {
		console.log(e)
	}
}

const getData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key)
		return jsonValue != null ? JSON.parse(jsonValue) : null
	} catch (e) {
		console.log(e)
	}
}

const getMultiple = async (keys) => {
	let values

	try {
		values = await AsyncStorage.multiGet(keys)
	} catch (e) {
		console.log(e)
	}

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
					taskDescription: JSON.parse(value).taskDescription
				}
			})
		})

		return allTask
	} catch (error) {
		console.log(error, "problemo")
	}
}

const getAllKeys = async () => {
	let keys = []

	try {
		keys = await AsyncStorage.getAllKeys()
	} catch (e) {
		console.log(e)
	}

	return keys
}

const clearAll = async () => {
	try {
		await AsyncStorage.clear()
	} catch (e) {
		// clear error
	}

	console.log('Done.')
}

export { storeData, getData, getAllKeys, getMultiple, getAllTasks, clearAll }
