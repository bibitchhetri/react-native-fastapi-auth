import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './navigation/RootNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
	return (
		<AuthProvider>
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
			<Toast />
		</AuthProvider>
	);
};

export default App;
