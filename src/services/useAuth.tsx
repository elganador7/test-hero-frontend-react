import { createStoreReturn } from 'react-auth-kit/createStore';
import { api } from './api';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

export const useAuth = () => {
    const signIn = useSignIn();

    const login = async (username: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            console.log('User logged in:', response.data);
            const { token, userId } = response.data;

            // Store the token and update Auth state
            return signIn({
                auth: {
                    token,
                    type: 'Bearer',
                },
                refresh: token,
                userState: { userId },
            });
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const register = async (username: string, password: string) => {
        try {
            const response = await api.post('/auth/register', { username, password });
            console.log('User registered:', response.data);
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            return false;
        }
    };

    const googleAuth = async (googleToken: string) => {
        try {
            const response = await api.post('/auth/google', { token: googleToken });
            const { token, expTime, userId } = response.data;

            // Store the token and update Auth state
            return signIn({
                auth: {
                    token,
                    type: 'Bearer',
                },
                refresh: token,
                userState: { userId },
            });
        } catch (error) {
            console.error('Google authentication failed:', error);
            return false;
        }
    };

    return { login, register, googleAuth };
};