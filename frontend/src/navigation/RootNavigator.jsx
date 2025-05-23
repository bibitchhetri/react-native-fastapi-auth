import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
	const { userToken } = useContext(AuthContext);

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{userToken ? (
				<Stack.Screen name="Home" component={HomeScreen} />
			) : (
				<Stack.Screen name="Auth" component={AuthNavigator} />
			)}
		</Stack.Navigator>
	);
}
