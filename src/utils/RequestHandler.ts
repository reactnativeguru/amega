import axios, {AxiosError} from 'axios';

interface ApiResponse<T> {
  data: T;
}

interface ApiError {
  message: string;
}

const axiosApi = axios.create({
  baseURL: 'https://ipwho.is/', // Replace with your API base URL
});

const handleApiError = (error: AxiosError<ApiError>): void => {
  if (error.response) {
    console.error('Server error:', error.response.data.message);
  } else if (error.request) {
    console.error('Network error:', error.request);
  } else {
    console.error('Request error:', error.message);
  }
};

export const getIPDetail = async (): Promise<object> => {
  try {
    const response = await axiosApi.get<ApiResponse<string[]>>('');
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};
