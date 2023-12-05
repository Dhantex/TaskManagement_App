//useApi.ts
import { useState, useCallback } from 'react';
import { API_BASE_URL } from '../../config';

interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: BodyInit | null;
    headers?: HeadersInit;
}

export const useApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendRequest = useCallback(async (endpoint: string, options: ApiOptions = {}) => {
        setIsLoading(true);
        setError(null);
        try {
            const { method = 'GET', body = null, headers = {} } = options;
            const response = await fetch(`${API_BASE_URL}${endpoint}`, { method, body, headers });

            if (!response.ok) {
                throw new Error('Request failed!');
            }
            const data = await response.json();
            setIsLoading(false);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong!');
            setIsLoading(false);
            throw err;
        }
    }, []);

    return { isLoading, error, sendRequest };
};