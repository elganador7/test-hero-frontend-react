import axios from 'axios';
import { Question } from '../models/Question';
import { QuestionAnswer } from '../models/QuestionAnswer';
import { UserAnswer } from '../models/UserAnswer';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your backend's base URL
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
  console.log(response);
  localStorage.setItem("token", response.data.token)
  localStorage.setItem("userId", response.data.userId)
  return response.data;
};


export const fetchRandomQuestion = async (token: string): Promise<Question> => {
  const response = await api.get('/questions/random', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

export const getUserStats = async (userId: string, token: string): Promise<QuestionAnswer> => {
  const response = await api.get(`/user/${userId}/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postUserAnswer = async (data: UserAnswer, token: string): Promise<UserAnswer> => {
  const response = await api.post<UserAnswer>(`/user_answers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    },  
  );

  return response.data;
};

export const generateSimilarQuestions = async (questionId: string, token: string): Promise<Question> => {
  console.log(questionId);
  const response = await api.get(`/oai_queries/generate/similar/${questionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

