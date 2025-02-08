import { TestTopic } from "./TestTopic";

export interface Question {
    id: string;
    question_text: string;
    options: string[];
    difficulty: number;
    test_topic: TestTopic
    estimated_time: number;
    paragraph: string;
  }
  