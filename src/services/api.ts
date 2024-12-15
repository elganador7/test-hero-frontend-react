import axios from 'axios';
import { Question } from '../models/Question';
import { QuestionAnswer } from '../models/QuestionAnswer';
import { UserAnswer } from '../models/UserAnswer';
import { NewQuestionRequest } from '../models/NewQuestionRequest';
import { PerformanceSummary } from '../models/PerformanceSummary';
import { getRandomSubtopic } from './util';


export const api = axios.create({
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_REACT_APP_BASE_URL : import.meta.env.VITE_REACT_APP_BASE_URL_DEV,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Attach the token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('_auth');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Auth interfaces
interface AuthPayload {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  userId: string;
}


// Function for user registration
export const registerUser = async (data: AuthPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const fetchRandomQuestion = async (): Promise<Question> => {
  const response = await api.get<Question>('/questions/random', {});

  if (response.status !== 200) {
    throw new Error('Failed to fetch random question');
  }

  return response.data;
};

export const getQuestionAnswer = async (questionId: string): Promise<QuestionAnswer> => {
  return (await api.get<QuestionAnswer>(`/questionAnswers/${questionId}`)).data;
};

export const postUserAnswer = async (data: UserAnswer): Promise<UserAnswer> => {
  const response = await api.post<UserAnswer>(`/user_answers/submitUserAnswer`, {
      data: data,
    },  
  );

  return response.data;
};

export const generateNewQuestion  = async (): Promise<Question> => {
  const topicData = getRandomSubtopic();
  return (await api.post<Question>(`/oai_queries/generate/new`, topicData, {})).data;
};

export const getUserStats = async (userId: string): Promise<PerformanceSummary[]> => {
  const response = await api.post<PerformanceSummary[]>(`/user_answers/user/summary`, {
      userId: userId
  });
  return response.data;
}

export const generateSimilarQuestions = async (questionId: string): Promise<Question> => {
  const response = await api.get(`/oai_queries/generate/similar/${questionId}`, {});
  return response.data;
};
