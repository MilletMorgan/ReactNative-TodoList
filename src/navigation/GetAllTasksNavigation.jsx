import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { GetTask } from "../Screens/Tasks/GetTask";
import { EditTask } from "../Screens/Tasks/EditTask";
import { GetAllTasks } from "../Screens/Tasks/GetAllTasks";

const Stack = createStackNavigator()

export const GetAllTasksNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="GetAllTasksScreen"
						  component={ GetAllTasks }
						  options={ { title: 'Liste des tâches' } }/>
			<Stack.Screen name="GetTask"
						  component={ GetTask }
						  options={ { title: 'Détail' } }/>
			<Stack.Screen name="EditTask"
						  component={ EditTask }
						  options={ { title: 'Editer une tâche' } }/>
		</Stack.Navigator>
	)
}
