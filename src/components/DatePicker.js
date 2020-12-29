import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

export const DatePicker = ({ setDateLimite, dateLimite }) => {
	const [jours, setJours] = useState([
		1, 2, 3, 4, 5, 6,
		7, 8, 9, 10, 11, 12,
		13, 14, 15, 16, 17, 18,
		19, 20, 21, 22, 23, 24,
		25, 26, 27, 28, 29, 30,
		31
	])

	const [mois, setMois] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
	])

	const [annee, setAnnee] = useState([
		2020, 2021, 2022, 2023, 2024, 2025
	])

	let pickerJours = jours.map((s, i) => {
		return <Picker.Item key={ i } value={ s.toString() } label={ s.toString() }/>
	})

	let pickerMois = mois.map((s, i) => {
		return <Picker.Item key={ i } value={ s.toString() } label={ s.toString() }/>
	})

	let pickerAnnee = annee.map((s, i) => {
		return <Picker.Item key={ i } value={ s.toString() } label={ s.toString() }/>
	})

	return (
		<View>
			<Text>Choisir une date limite</Text>
			<View style={ { flex: 1, flexDirection: 'row' } }>
				<View style={ styles.picker }>
					<Picker
						selectedValue={ dateLimite.jours }
						onValueChange={ itemValue => setDateLimite({ ...dateLimite, ['jours']: itemValue
						}) }
					>
						{ pickerJours }
					</Picker>
				</View>

				<View style={ styles.picker }>
					<Picker
						selectedValue={ dateLimite.mois }
						onValueChange={ itemValue => setDateLimite({ ...dateLimite, ['mois']: itemValue }) }
					>
						{ pickerMois }
					</Picker>
				</View>

				<View style={ styles.picker }>
					<Picker
						selectedValue={ dateLimite.annee }
						onValueChange={ itemValue => setDateLimite({ ...dateLimite, ['annee']: itemValue }) }
					>
						{ pickerAnnee }
					</Picker>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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
})
