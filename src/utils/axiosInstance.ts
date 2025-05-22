import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';

// Defina a URL base da sua API
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Atualize para o seu endpoint de produção// Atualize para o seu endpoint de produção

// Crie a instância do axios
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar o token Bearer (caso o usuário esteja autenticado)
axiosInstance.interceptors.request.use(

    (config) => {
        const token = localStorage.getItem('token'); // Ou onde você armazena o token

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para lidar com erros globais (ex: 401 Unauthorized)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Lidar com token expirado ou não autorizado
            console.log('Sessão expirada. Faça login novamente.');
            // Aqui você pode redirecionar o usuário para a página de login ou realizar outra ação
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
