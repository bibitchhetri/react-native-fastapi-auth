import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { resetPasswordWithOtp } from '../api/auth';

const ResetPasswordScreen = ({ navigation, route }) => {
	const { email } = route.params;

	const [otp, setOtp] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	const validatePassword = (text) => {
		setPassword(text);
		if (text.length < 8) {
			setPasswordError('Password must be at least 8 characters');
		} else {
			setPasswordError(null);
		}
	};

	const handleResetPassword = async () => {
		if (!otp) return setError('Please enter the OTP sent to your email');
		if (!password || !confirmPassword) return setError('Please enter and confirm your new password');
		if (password !== confirmPassword) return setError('Passwords do not match');
		if (passwordError) return;

		setLoading(true);
		setError(null);
		try {
			await resetPasswordWithOtp(email, otp, password);
			Toast.show({
				type: 'success',
				text1: 'Password Reset Successful',
				text2: 'You can now log in with your new password',
			});
			navigation.navigate('Login');
		} catch (err) {
			const msg = err.response?.data?.detail || 'Failed to reset password';
			setError(msg);
			Toast.show({ type: 'error', text1: 'Reset Failed', text2: msg });
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<View style={styles.innerContainer}>
				<Text style={styles.title}>Reset Password</Text>
				<Text style={styles.description}>Enter the OTP and create a new password for:</Text>
				<Text style={styles.email}>{email}</Text>

				<TextInput
					style={styles.input}
					placeholder="Enter OTP"
					placeholderTextColor="#aaa"
					value={otp}
					onChangeText={setOtp}
					keyboardType="numeric"
					autoCapitalize="none"
				/>

				<TextInput
					style={styles.input}
					placeholder="New Password"
					placeholderTextColor="#aaa"
					value={password}
					onChangeText={validatePassword}
					secureTextEntry
					autoCapitalize="none"
				/>

				<TextInput
					style={styles.input}
					placeholder="Confirm New Password"
					placeholderTextColor="#aaa"
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry
					autoCapitalize="none"
				/>

				{passwordError && <Text style={styles.warning}>{passwordError}</Text>}
				{error && <Text style={styles.warning}>{error}</Text>}

				<TouchableOpacity
					style={[
						styles.button,
						(loading || !otp || !password || !confirmPassword || passwordError) && styles.buttonDisabled,
					]}
					onPress={handleResetPassword}
					disabled={loading || !otp || !password || !confirmPassword || passwordError}
				>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.buttonText}>Reset Password</Text>
					)}
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8f9fb',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
	innerContainer: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 24,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		color: '#007AFF',
		textAlign: 'center',
		marginBottom: 8,
	},
	description: {
		textAlign: 'center',
		fontSize: 14,
		color: '#444',
	},
	email: {
		textAlign: 'center',
		color: '#555',
		marginBottom: 20,
		fontWeight: '500',
	},
	input: {
		height: 50,
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 16,
		backgroundColor: '#fefefe',
		marginBottom: 12,
		fontSize: 16,
	},
	warning: {
		color: 'red',
		marginBottom: 12,
		textAlign: 'center',
		fontSize: 14,
	},
	button: {
		backgroundColor: '#007AFF',
		paddingVertical: 14,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 8,
	},
	buttonDisabled: {
		backgroundColor: '#a3cfff',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
});

export default ResetPasswordScreen;

