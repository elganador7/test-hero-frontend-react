export interface UserPerformanceSummary {
    user_id: string;       // Matches the UUID from your Go model
    test_type: string;     // The type of test (e.g., "Math", "Science")
    subject: string;      // The subject (e.g., "Algebra", "Biology")
    topic: string;        // The topic (e.g., "Linear Equations", "Cell Structure")
    subtopic: string;     // The subtopic or detailed focus area
    specific_topic: string; // The specific topic within the subtopic
    correct_rate: number;  // The average correct rate (e.g., 0.85 for 85%)
    total_points: number;  // The total number of points earned
    total_points_possible: number; // The total number of points possible
    question_count: number; // The total number of questions scored
  }