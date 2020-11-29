import { StyleSheet, } from "react-native";

export const MainStyles = StyleSheet.create({
	cancel: {
		color: 'red'
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
		backgroundColor: '#e88d8d',
	},

	buttonTrash: {
		color: '#e88d8d',
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

	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	modalView: {
		margin: 5,
		backgroundColor: "white",
		borderRadius: 5,
		padding: 15,

		height: 200,

		alignItems: "center",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},

	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},

	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},

	modalButton: {
		marginVertical: 15,
		padding: 20,
		backgroundColor: '#FFD866',
		borderRadius: 5,
	},

	modalTitle: {
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold',
	},

	modalText: {
		marginBottom: 15,
		textAlign: "center"
	}
})
