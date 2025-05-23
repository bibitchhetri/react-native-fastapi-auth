import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const register = async (username, email, password) => {
	const response = await axios.post(`${BASE_URL}/register/`, {
		username,
		email,
		password,
	});
	return response.data;
};

export const login = async (username, password) => {
	const params = new URLSearchParams();
	params.append('grant_type', 'password');
	params.append('username', username);
	params.append('password', password);

	const response = await axios.post(`${BASE_URL}/token`, params.toString(), {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});
	return response.data;
};

export const getUser = async (token) => {
	const response = await axios.get(`${BASE_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const forgotPassword = async (email) => {
	const response = await axios.post(`${BASE_URL}/forgot-password/`, {
		email,
	});
	return response.data;
};

export const verifyOtp = async (email, otp) => {
	const response = await axios.post(`${BASE_URL}/verify-otp/`, {
		email,
		token: otp,  // ✅ Fix here
	});
	return response.data;
};

export const resetPasswordWithOtp = async (email, otp, newPassword) => {
	const response = await axios.post(`${BASE_URL}/reset-password/`, {
		email,
		token: otp,          // send the OTP here
		new_password: newPassword,
	});
	return response.data;
};

export const resetPassword = async (token, newPassword) => {
	const response = await axios.post(`${BASE_URL}/reset-password/${token}/`, {
		new_password: newPassword,
	});
	return response.data;
};
