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
import { verifyOtp } from '../api/auth';

const OtpVerificationScreen = ({ navigation, route }) => {
	const { email } = route.params;
	const [otp, setOtp] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleVerifyOtp = async () => {
		if (!otp.trim() || otp.trim().length !== 6) {
			setError('Please enter a valid 6-digit OTP');
			return;
		}

		setLoading(true);
		setError(null);

		try {
			await verifyOtp(email, otp.trim());
			Toast.show({
				type: 'success',
				text1: 'OTP Verified',
				text2: 'You can now reset your password.',
			});
			navigation.navigate('ResetPassword', { email });
		} catch (err) {
			setError('Invalid OTP. Please try again.');
			Toast.show({
				type: 'error',
				text1: 'Verification Failed',
				text2: err.response?.data?.message || 'Please enter the correct OTP.',
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
			<Text style={styles.header}>Verify OTP</Text>
			<Text style={styles.subHeader}>Enter the 6-digit OTP sent to {email}</Text>

			<TextInput
				style={styles.input}
				placeholder="Enter OTP"
				placeholderTextColor="#999"
				value={otp}
				onChangeText={setOtp}
				keyboardType="numeric"
				maxLength={6}
				autoCapitalize="none"
				autoFocus
			/>

			{error && <Text style={styles.errorText}>{error}</Text>}

			<TouchableOpacity
				style={[styles.button, (loading || otp.length !== 6) && styles.buttonDisabled]}
				onPress={handleVerifyOtp}
				disabled={loading || otp.length !== 6}
			>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Verify OTP</Text>
				)}
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.resendLink}
				onPress={() => navigation.navigate('ForgotPassword')}
			>
				<Text style={styles.resendText}>Didn't receive OTP? <Text style={styles.link}>Resend</Text></Text>
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
		fontSize: 28,
		fontWeight: '700',
		color: '#007aff',
		textAlign: 'center',
		marginBottom: 8,
	},
	subHeader: {
		fontSize: 14,
		color: '#555',
		textAlign: 'center',
		marginBottom: 24,
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
		textAlign: 'center',
		letterSpacing: 8,
	},
	button: {
		backgroundColor: '#007aff',
		paddingVertical: 14,
		paddingHorizontal: 24,
		borderRadius: 12,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	buttonDisabled: {
		backgroundColor: '#aacdfc',
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
		textAlign: 'center',
	},
	resendLink: {
		marginTop: 20,
		alignItems: 'center',
	},
	resendText: {
		color: '#666',
	},
	link: {
		color: '#007aff',
		fontWeight: '600',
	},
});

export default OtpVerificationScreen;
