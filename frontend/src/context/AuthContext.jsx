import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userToken, setUserToken] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const login = async (token) => {
		setUserToken(token);
		await AsyncStorage.setItem('userToken', token);
		const userData = await getUser(token);
		setUser(userData);
	};

	const logout = () => {
		setUserToken(null);
		setUser(null);
		AsyncStorage.removeItem('userToken');
	};

	useEffect(() => {
		const loadToken = async () => {
			const token = await AsyncStorage.getItem('userToken');
			if (token) {
				setUserToken(token);
				try {
					const userData = await getUser(token);
					setUser(userData);
				} catch (error) {
					setUserToken(null);
					await AsyncStorage.removeItem('userToken');
				}
			}
			setLoading(false);
		};
		loadToken();
	}, []);

	return (
		<AuthContext.Provider value={{ userToken, user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
