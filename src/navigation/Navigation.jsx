import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { CreateTask } from "../Screens/Tasks/CreateTask";
import { GetAllTasks } from "../Screens/Tasks/GetAllTasks";

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();

export const Navigation = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				activeColor="#f0edf6"
				inactiveColor="#c792ea"
				barStyle={{ backgroundColor: '#0F111A' }}
				screenOptions={ ({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'CreateTask') {
							iconName = focused
								? 'ios-add-circle'
								: 'ios-add-circle-outline'
						} else if (route.name === 'GetAllTasks') {
							iconName = focused
								? 'ios-list-box'
								: 'ios-list'
						}

						return <Ionicons name={ iconName } size={ 20 } color={ color }/>
					}
				}) }
			>
				<Tab.Screen name="CreateTask" component={ CreateTask } options={ { title: 'Nouvelle tâche' } }/>
				<Tab.Screen name="GetAllTasks" component={ GetAllTasks } options={ { title: 'Liste des tâches' } }/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
