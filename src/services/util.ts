const data = {
    Mathematics: {
      topics: {
        "Pre-Algebra": {
          subtopics: [
            "Integers and Rational Numbers",
            "Proportions, Ratios, and Percentages",
            "Properties of Numbers",
            "Linear Equations and Inequalities",
          ],
        },
        "Elementary Algebra": {
          subtopics: [
            "Solving Quadratic Equations",
            "Operations with Algebraic Expressions",
            "Factoring and Polynomials",
            "Functions and Graphing Basics",
          ],
        },
        "Intermediate Algebra": {
          subtopics: [
            "Logarithms and Exponents",
            "Systems of Equations",
            "Rational Expressions and Complex Numbers",
            "Matrices",
          ],
        },
        "Coordinate Geometry": {
          subtopics: [
            "Graphing Equations",
            "Slope and Distance",
            "Conics: Circles, Parabolas, Ellipses, and Hyperbolas",
            "Transformations and Symmetry",
          ],
        },
        "Plane Geometry": {
          subtopics: [
            "Properties of Shapes (Triangles, Circles, Polygons)",
            "Angle Relationships and Theorems",
            "Area and Volume Calculations",
            "Trigonometric Ratios",
          ],
        },
        Trigonometry: {
          subtopics: [
            "Trigonometric Identities and Equations",
            "Unit Circle and Radian Measure",
            "Graphing Trigonometric Functions",
            "Applications of Trigonometry",
          ],
        },
      },
    },
  };
  
  export function getRandomSubtopic() {
    const topics = data.Mathematics.topics;
    const topicKeys = Object.keys(topics);
  
    // Randomly select a topic
    const randomTopicKey = topicKeys[Math.floor(Math.random() * topicKeys.length)];
    const randomTopic = topics[randomTopicKey];
  
    // Randomly select a subtopic
    const subtopics = randomTopic.subtopics;
    const randomSubtopic =
      subtopics[Math.floor(Math.random() * subtopics.length)];
  
    return { 
        test_type: "SAT",
        subject: "Math",
        topic: randomTopicKey, 
        subtopic: randomSubtopic };
  }