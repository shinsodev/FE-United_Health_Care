import queryString from 'query-string';
import { Specialty, SpecialtyFormData } from '../types/specialty';

const API_URL = "https://appointment-service-e6za.onrender.com";

// Validate API URL
if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in environment variables');
}

interface IRequest {
  url: string;
  method: string;
  body?: any;
  queryParams?: Record<string, any>;
  useCredentials?: boolean;
  headers?: Record<string, string>;
  nextOption?: any;
}

export const sendRequest = async <T>(props: IRequest): Promise<T> => {
  let { url, method, body, queryParams = {}, useCredentials = false, headers = {}, nextOption = {} } = props;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

  const options: RequestInit = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    }),
    body: body ? JSON.stringify(body) : null,
    mode: 'cors', // Explicitly set CORS mode
    signal: controller.signal, // Add timeout signal
    ...nextOption,
  };

  if (useCredentials) options.credentials = 'include';

  if (queryParams && Object.keys(queryParams).length > 0) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  try {
    const response = await fetch(url, options);
    clearTimeout(timeoutId); // Clear timeout on success

    if (response.status === 204) {
      return {} as T; // Handle No Content responses
    }

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage += `: ${errorData?.message || errorData?.error || 'Unknown error'}`;
      } catch {
        errorMessage += ': Failed to read response';
      }
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return (await response.json()) as T;
    }

    return {} as T;
  } catch (error) {
    clearTimeout(timeoutId);
    let errorMessage = `Fetch error on ${url}: `;
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      errorMessage += `Network error or CORS issue. Ensure the backend server is running at ${API_URL} and CORS is properly configured.`;
    } else if (error instanceof DOMException && error.name === 'AbortError') {
      errorMessage += 'Request timed out after 10 seconds.';
    } else {
      errorMessage += error instanceof Error ? error.message : 'Unknown error';
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const specialtyService = {
  getAll: async (): Promise<Specialty[]> => {
    return await sendRequest<Specialty[]>({
      url: `${API_URL}/specialties`,
      method: 'GET',
    });
  },

  getById: async (id: number): Promise<Specialty> => {
    return await sendRequest<Specialty>({
      url: `${API_URL}/specialties/${id}`,
      method: 'GET',
    });
  },

  create: async (data: SpecialtyFormData): Promise<Specialty> => {
    return await sendRequest<Specialty>({
      url: `${API_URL}/specialties`,
      method: 'POST',
      body: data,
    });
  },

  update: async (id: number, data: SpecialtyFormData): Promise<Specialty> => {
    return await sendRequest<Specialty>({
      url: `${API_URL}/specialties/${id}`,
      method: 'PUT',
      body: data,
    });
  },

  delete: async (id: number): Promise<void> => {
    return await sendRequest<void>({
      url: `${API_URL}/specialties/${id}`,
      method: 'DELETE',
    });
  },
};