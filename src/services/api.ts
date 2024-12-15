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

// Function for user login
export const loginUser = async (data: AuthPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  localStorage.setItem("token", response.data.token)
  localStorage.setItem("userId", response.data.userId)
  return response.data;
};


export const fetchRandomQuestion = async (): Promise<Question> => {
  const response = await api.get('/questions/random', {});

  if (response.status !== 200) {
    throw new Error('Failed to fetch random question');
  }

  const data = response.data;

  // Ensure the data aligns with the Question model
  const question: Question = {
    id: data.id,
    question_text: data.question_text,
    options: data.options,
    test_type: data.test_type,
    difficulty: data.difficulty,
    subject: data.subject,
    topic: data.topic,
    estimated_time: data.estimated_time,
    paragraph: data.paragraph,
  };

  return question;
};

export const getQuestionAnswer = async (questionId: string, token: string): Promise<QuestionAnswer> => {
  const response = await api.get(`/questionAnswers/${questionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postUserAnswer = async (data: UserAnswer): Promise<UserAnswer> => {
  const response = await api.post<UserAnswer>(`/user_answers/submitUserAnswer`, {
      data: data,
    },  
  );

  return response.data;
};

export const generateNewQuestion  = async (data: NewQuestionRequest): Promise<Question> => {
  const topicData = getRandomSubtopic();

  data.topic = topicData.topic;
  data.subtopic = topicData.subtopic;

  const response = await api.post<Question>(`/oai_queries/generate/new`, data, {});

  return response.data;
};

export const getUserStats = async (userId: string): Promise<UserAnswer[]> => {
  const response = await api.post<UserAnswer[]>(`/user_answers/user/summary`, {
      userId: userId
  });
  return response.data;
}

export const generateSimilarQuestions = async (questionId: string): Promise<Question> => {
  const response = await api.get(`/oai_queries/generate/similar/${questionId}`, {});
  return response.data;
};

export const handleGoogleAuth = async (response: any) => {
  // Send the token to the backend for verification
  const authResponse = await api.post<AuthResponse>('/auth/google', { token: response.credential })
  localStorage.setItem("token", authResponse.data.token)
  localStorage.setItem("userId", authResponse.data.userId)
}

