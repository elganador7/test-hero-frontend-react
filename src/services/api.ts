import axios from "axios";
import {
  Question,
  QuestionAnswer,
  TestTopic,
  UserAnswer,
  UserPerformanceSummary,
} from "../models/index";
import { getRandomSubtopic } from "./util";
import { config } from "../config/env";

export const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("_auth");
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
export const registerUser = async (
  data: AuthPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);
  return response.data;
};

export const fetchRelevantQuestion = async (): Promise<Question> => {
  const response = await api.get<Question>("/questions/random", {});

  if (response.status !== 200) {
    throw new Error("Failed to fetch random question");
  }

  return response.data;
};

export const getQuestionAnswer = async (
  questionId: string
): Promise<QuestionAnswer> => {
  return (await api.get<QuestionAnswer>(`/questionAnswers/${questionId}`)).data;
};

export const postUserAnswer = async (data: UserAnswer): Promise<UserAnswer> => {
  return (
    await api.post<UserAnswer>(`/user_answers/submitUserAnswer`, data, {})
  ).data;
};

export const generateNewQuestion = async (): Promise<Question> => {
  const topicData = getRandomSubtopic();
  return (await api.post<Question>(`/oai_queries/generate/new`, topicData, {}))
    .data;
};

export const generateRelevantQuestion = async (
  user_id: string,
  test_type: string,
  subject: string
): Promise<Question> => {
  const topicData = {
    user_id: user_id,
    test_type: test_type,
    subject: subject,
  };

  return (
    await api.post<Question>(`/oai_queries/generate/relevant`, topicData, {})
  ).data;
};

export const getUserStats = async (
  userId: string
): Promise<UserPerformanceSummary[]> => {
  const response = await api.post<UserPerformanceSummary[]>(
    `/user_answers/user/summary`,
    {
      userId: userId,
    }
  );
  return response.data;
};

export const generateSimilarQuestions = async (
  questionId: string
): Promise<Question> => {
  const response = await api.get(
    `/oai_queries/generate/similar/${questionId}`,
    {}
  );
  return response.data;
};

interface PaymentReposonse {
  clientSecret: string;
}

export const submitPayment = async (
  amount: number,
  currency: string
): Promise<PaymentReposonse> => {
  const response = await api.post<PaymentReposonse>(
    `/stripe/payment`,
    {
      amount: amount,
      currency: currency,
    }
  );

  return response.data;
};

export const fetchTestTopicData = async (endpoint: string, param: string | null): Promise<TestTopic[]> => {
  try {
    const response: any = await api.get(`/test-topic-data/${endpoint ? (endpoint + "/") : ""}${param}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};

export const getTestTopics = async (): Promise<TestTopic[]> => {
  return (await api.get<TestTopic[]>("/test_topics/")).data;
};
