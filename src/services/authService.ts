import api from '../lib/api';

export const authService = {
    register: (name: string, email: string, password: string) => {
        return api.post('/auth/register', { name, email, password });
    },

    login: (email: string, password: string): Promise<{ token: string }> => {
        return api.post('/auth/login', { email, password, }).then(response => response.data);
    },

    logout: () => {
        return api.post('/auth/logout');
    }
}