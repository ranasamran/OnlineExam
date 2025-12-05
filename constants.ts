import { Exam, QuestionType, User } from './types';

export const CURRENT_USER: User = {
  id: '12345',
  name: 'Alex Doe',
  email: 'alex.doe@university.edu',
  avatar: 'https://picsum.photos/seed/alex/200'
};

export const MOCK_EXAM: Exam = {
  id: 'exam-1',
  title: 'Introduction to Psychology - Final Exam',
  courseCode: 'PSY101',
  durationMinutes: 90,
  totalQuestions: 50,
  totalMarks: 100,
  status: 'live',
  startDate: '24 July, 2024',
  sections: [
    { id: 1, title: 'Foundations' },
    { id: 2, title: 'Cognitive Psychology' },
    { id: 3, title: 'Clinical Applications' }
  ],
  questions: [
    // Section 1 - Specific mocked questions
    {
      id: 12,
      sectionId: 2,
      type: QuestionType.SingleChoice,
      text: "According to cognitive dissonance theory, humans are motivated to do what?",
      options: [
        "Maintain consistency between their beliefs and actions.",
        "Seek out information that confirms their existing beliefs.",
        "Engage in rewarding behaviors regardless of their beliefs.",
        "Change their beliefs to match the majority opinion."
      ],
      correctAnswer: "Maintain consistency between their beliefs and actions."
    },
    {
      id: 13,
      sectionId: 2,
      type: QuestionType.SingleChoice,
      text: "Which of the following is an example of classical conditioning?",
      options: [
        "A dog learning to sit on command to receive a treat.",
        "A cat running to its food bowl upon hearing the sound of a can opener.",
        "A child cleaning their room to avoid being grounded.",
        "A student studying hard to get good grades."
      ],
      correctAnswer: "A cat running to its food bowl upon hearing the sound of a can opener."
    },
    {
      id: 23,
      sectionId: 1,
      type: QuestionType.MultipleSelect,
      text: "Which of the following are considered primary colors in the additive color model (RGB)? (Select all that apply)",
      options: ["Red", "Yellow", "Green", "Blue"],
      correctAnswer: ["Red", "Green", "Blue"]
    },
    {
      id: 35,
      sectionId: 1,
      type: QuestionType.ShortAnswer,
      text: "Who is considered the 'father of psychoanalysis'?",
      correctAnswer: "Sigmund Freud"
    },
    {
      id: 48,
      sectionId: 3,
      type: QuestionType.Essay,
      text: "Compare and contrast the theories of Sigmund Freud and Carl Jung regarding the unconscious mind.",
      correctAnswer: "Answers may vary."
    }
  ]
};

// Generate filler questions to reach 50 total for UI visualization
for (let i = 1; i <= 50; i++) {
  if (!MOCK_EXAM.questions.find(q => q.id === i)) {
    const seed = i % 4;
    let type = QuestionType.SingleChoice;
    let text = `Question ${i}: This is a sample multiple choice question to demonstrate the interface.`;
    let options: string[] | undefined = ["Option A", "Option B", "Option C", "Option D"];
    let correctAnswer: string | string[] = "Option A";

    if (seed === 1) {
      type = QuestionType.MultipleSelect;
      text = `Question ${i}: Select all the correct options for this multiple-select question.`;
      options = ["Choice 1", "Choice 2", "Choice 3", "Choice 4", "Choice 5"];
      correctAnswer = ["Choice 1", "Choice 3"];
    } else if (seed === 2) {
      type = QuestionType.ShortAnswer;
      text = `Question ${i}: Please provide a concise answer to this short-answer question.`;
      options = undefined;
      correctAnswer = "Answer";
    } else if (seed === 3) {
      type = QuestionType.Essay;
      text = `Question ${i}: Write a detailed response explaining your reasoning on this essay topic.`;
      options = undefined;
      correctAnswer = "Essay response";
    }

    MOCK_EXAM.questions.push({
      id: i,
      sectionId: i < 20 ? 1 : i < 40 ? 2 : 3,
      type,
      text,
      options,
      correctAnswer
    });
  }
}
MOCK_EXAM.questions.sort((a, b) => a.id - b.id);
