export interface Question {
    id: string;
    question_text: string;
    options: Record<string, string>;
    test_type: string;
    difficulty: number;
    subject: string;
    topic: string;
    subtopic: string;
    estimated_time: number;
    paragraph: string;
  }
  