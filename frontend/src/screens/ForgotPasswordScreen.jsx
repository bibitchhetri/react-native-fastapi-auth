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
import Toast from 'react-native-toast-message';
import { forgotPassword } from '../api/auth';

const ForgotPasswordScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handlePasswordReset = async () => {
		if (!email.trim()) {
			setError('Please enter your email.');
			return;
		}
		setLoading(true);
		setError(null);

		try {
			await forgotPassword(email.trim());
			Toast.show({
				type: 'success',
				text1: 'Email Sent',
				text2: 'Check your inbox for the OTP.',
			});
			navigation.navigate('OtpVerification', { email: email.trim() });
		} catch (err) {
			setError('Failed to send email. Please try again.');
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Could not send OTP email.',
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
			<Text style={styles.header}>Forgot Password</Text>

			<TextInput
				style={styles.input}
				placeholder="Enter your email"
				placeholderTextColor="#999"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
				autoCorrect={false}
			/>

			{error && <Text style={styles.errorText}>{error}</Text>}

			<TouchableOpacity
				style={[styles.button, loading && styles.buttonDisabled]}
				onPress={handlePasswordReset}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Send OTP</Text>
				)}
			</TouchableOpacity>

			<TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Login')}>
				<Text style={styles.registerText}>
					Remember your password? <Text style={styles.link}>Login</Text>
				</Text>
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

export default ForgotPasswordScreen;

