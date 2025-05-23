import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { register as registerApi } from '../api/auth';
import Toast from 'react-native-toast-message';

const RegisterScreen = ({ navigation }) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleRegister = async () => {
		setLoading(true);
		setError(null);
		try {
			await registerApi(username.trim(), email.trim(), password);
			Toast.show({
				type: 'success',
				text1: 'Registration Successful',
				text2: 'You can now log in with your credentials.',
				visibilityTime: 2500,
			});
			navigation.navigate('Login');
		} catch (e) {
			setError('Registration failed. Please check your inputs and try again.');
			Toast.show({
				type: 'error',
				text1: 'Registration Failed',
				text2: 'Please check your details and try again.',
				visibilityTime: 2500,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<Text style={styles.title}>Create Account</Text>

			<TextInput
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
				style={styles.input}
				autoCapitalize="none"
				autoCorrect={false}
				placeholderTextColor="#999"
			/>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				style={styles.input}
				autoCapitalize="none"
				autoCorrect={false}
				placeholderTextColor="#999"
			/>
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				style={styles.input}
				placeholderTextColor="#999"
			/>

			{error && <Text style={styles.errorText}>{error}</Text>}

			<TouchableOpacity
				style={[styles.button, loading && styles.buttonDisabled]}
				onPress={handleRegister}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Register</Text>
				)}
			</TouchableOpacity>

			<TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
				<Text style={styles.loginText}>Already have an account? <Text style={styles.link}>Login here</Text></Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F7FAFC',
		paddingHorizontal: 32,
		justifyContent: 'center',
	},
	title: {
		fontSize: 36,
		fontWeight: '800',
		color: '#4A90E2',
		textAlign: 'center',
		marginBottom: 40,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
	},
	input: {
		backgroundColor: '#fff',
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 18,
		paddingVertical: 14,
		fontSize: 16,
		color: '#333',
		marginBottom: 16,
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
	},
	button: {
		backgroundColor: '#4A90E2',
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: 'center',
		shadowColor: '#4A90E2',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 4,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
	},
	errorText: {
		color: '#D32F2F',
		textAlign: 'center',
		marginBottom: 12,
		fontSize: 14,
	},
	loginLink: {
		marginTop: 28,
		alignItems: 'center',
	},
	loginText: {
		fontSize: 15,
		color: '#666',
	},
	link: {
		color: '#50E3C2',
		fontWeight: '600',
	},
});

export default RegisterScreen;

