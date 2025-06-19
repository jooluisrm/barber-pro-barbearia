// Seu arquivo de configuração do axios (ex: src/services/api.ts)

import axios from 'axios';
import { parseCookies } from 'nookies'; // ✅ 1. IMPORTE O PARSECOOKIES

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar o token Bearer
axiosInstance.interceptors.request.use(
    (config) => {
        // ✅ 2. TROQUE LOCALSTORAGE POR PARSECOOKIES
        // Ele lê todos os cookies e retorna um objeto. Pegamos o 'token'.
        const { 'token': token } = parseCookies();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Seu interceptor de resposta para erros 401 pode continuar exatamente o mesmo.
// Ele é uma ótima adição para lidar com tokens expirados!
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log('Sessão expirada. Faça login novamente.');
            // Aqui você pode chamar uma função do seu AuthContext para deslogar o usuário
            // e redirecioná-lo para a página de login.
            // Ex: Auth.signOut();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;