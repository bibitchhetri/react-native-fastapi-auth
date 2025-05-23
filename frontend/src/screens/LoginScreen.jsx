import React, { useState, useContext } from 'react';
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
import Toast from 'react-native-toast-message';
import { login as loginApi } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { login } = useContext(AuthContext);

	const handleLogin = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await loginApi(username.trim(), password);
			login(response.access_token);
			Toast.show({
				type: 'success',
				text1: 'Welcome Back!',
				text2: `Hello ${username.trim()} 👋`,
				visibilityTime: 2500,
			});
		} catch (err) {
			setError('Invalid username or password');
			Toast.show({
				type: 'error',
				text1: 'Login Failed',
				text2: 'Please check your credentials and try again.',
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
			<Text style={styles.header}>TriNetra</Text>

			<TextInput
				style={styles.input}
				placeholder="Username"
				placeholderTextColor="#999"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
			/>

			<TextInput
				style={styles.input}
				placeholder="Password"
				placeholderTextColor="#999"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>

			{error && <Text style={styles.errorText}>{error}</Text>}

			<TouchableOpacity
				style={[styles.button, loading && styles.buttonDisabled]}
				onPress={handleLogin}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Log In</Text>
				)}
			</TouchableOpacity>

			<TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
				<Text style={styles.registerText}>Don't have an account? <Text style={styles.link}>Register here</Text></Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => navigation.navigate('ForgotPassword')}
				style={{ marginTop: 12, alignItems: 'center' }}
			>
				<Text style={{ color: '#007aff', fontWeight: '600' }}>Forgot Password?</Text>
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
	header: {
		fontSize: 40,
		fontWeight: '800',
		color: '#4A90E2',
		textAlign: 'center',
		marginBottom: 48,
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
	registerLink: {
		marginTop: 28,
		alignItems: 'center',
	},
	registerText: {
		fontSize: 15,
		color: '#666',
	},
	link: {
		color: '#50E3C2',
		fontWeight: '600',
	},
});

export default LoginScreen;

