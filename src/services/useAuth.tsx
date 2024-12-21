import { createStoreReturn } from 'react-auth-kit/createStore';
import { api } from './api';
import useSignIn from 'react-auth-kit/hooks/useSignIn';


export const useAuth = () => {
    const signIn = useSignIn();

    const login = async (username: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { username, password });
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
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            return false;
        }
    };

    const googleAuth = async (googleResponse: any) => {
        try {
            const response = await api.post('/auth/google', { token: googleResponse.credential });
            const { token, userId } = response.data;

            console.log(token, userId);

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