import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
	const { logout, user } = useContext(AuthContext);
	const [greeting, setGreeting] = useState('');
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const hour = new Date().getHours();
		if (hour < 12) setGreeting('Good Morning');
		else if (hour < 18) setGreeting('Good Afternoon');
		else setGreeting('Good Evening');

		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1500,
			useNativeDriver: true,
		}).start();
	}, [fadeAnim]);

	return (
		<View style={styles.container}>
			<Animated.Text style={[styles.greeting, { opacity: fadeAnim }]}>
				{greeting}{user?.username ? `, ${user.username}` : ''}!
			</Animated.Text>

			<Text style={styles.quote}>
				Your Code Sucks
			</Text>

			<TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.7}>
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f8ff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 24,
	},
	greeting: {
		fontSize: 28,
		fontWeight: '700',
		color: '#007aff',
		marginBottom: 12,
	},
	quote: {
		fontSize: 16,
		fontStyle: 'italic',
		color: '#555',
		marginBottom: 36,
		textAlign: 'center',
		paddingHorizontal: 20,
	},
	logoutButton: {
		backgroundColor: '#ff4d4d',
		paddingVertical: 14,
		paddingHorizontal: 60,
		borderRadius: 30,
		elevation: 3,
		shadowColor: '#ff4d4d',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 3,
	},
	logoutText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 18,
	},
});

export default HomeScreen;
