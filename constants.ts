import { Exam, QuestionType, User } from './types';

export const CURRENT_USER: User = {
  id: '12345',
  name: 'Alex Doe',
  email: 'alex.doe@university.edu',
  avatar: 'https://picsum.photos/seed/alex/200'
};

const questionsList = [];

// Section 1: Multiple Choice (IDs 1-20)
// We'll keep some specific realistic questions and fill the rest
const mcqSpecific = [
  {
    id: 12,
    sectionId: 1,
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
    sectionId: 1,
    type: QuestionType.SingleChoice,
    text: "Which of the following is an example of classical conditioning?",
    options: [
      "A dog learning to sit on command to receive a treat.",
      "A cat running to its food bowl upon hearing the sound of a can opener.",
      "A child cleaning their room to avoid being grounded.",
      "A student studying hard to get good grades."
    ],
    correctAnswer: "A cat running to its food bowl upon hearing the sound of a can opener."
  }
];

for (let i = 1; i <= 20; i++) {
  const existing = mcqSpecific.find(q => q.id === i);
  if (existing) {
    questionsList.push(existing);
  } else {
    questionsList.push({
      id: i,
      sectionId: 1,
      type: QuestionType.SingleChoice,
      text: `Question ${i}: This is a multiple choice question testing fundamental concepts.`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A"
    });
  }
}

// Section 2: Multiple Select (IDs 21-30)
const multiSpecific = [
  {
    id: 23,
    sectionId: 2,
    type: QuestionType.MultipleSelect,
    text: "Which of the following are considered primary colors in the additive color model (RGB)?",
    options: ["Red", "Yellow", "Green", "Blue"],
    correctAnswer: ["Red", "Green", "Blue"]
  }
];

for (let i = 21; i <= 30; i++) {
  const existing = multiSpecific.find(q => q.id === i);
  if (existing) {
    questionsList.push(existing);
  } else {
    questionsList.push({
      id: i,
      sectionId: 2,
      type: QuestionType.MultipleSelect,
      text: `Question ${i}: Select all the correct options for this scenario.`,
      options: ["Choice 1", "Choice 2", "Choice 3", "Choice 4", "Choice 5"],
      correctAnswer: ["Choice 1", "Choice 3"]
    });
  }
}

// Section 3: Short Answer (IDs 31-45)
const shortSpecific = [
  {
    id: 35,
    sectionId: 3,
    type: QuestionType.ShortAnswer,
    text: "Who is considered the 'father of psychoanalysis'?",
    correctAnswer: "Sigmund Freud"
  }
];

for (let i = 31; i <= 45; i++) {
  const existing = shortSpecific.find(q => q.id === i);
  if (existing) {
    questionsList.push(existing);
  } else {
    questionsList.push({
      id: i,
      sectionId: 3,
      type: QuestionType.ShortAnswer,
      text: `Question ${i}: Provide a concise term or phrase that defines the described phenomenon.`,
      correctAnswer: "Answer"
    });
  }
}

// Section 4: Essay (IDs 46-50)
const essaySpecific = [
  {
    id: 48,
    sectionId: 4,
    type: QuestionType.Essay,
    text: "Compare and contrast the theories of Sigmund Freud and Carl Jung regarding the unconscious mind.",
    correctAnswer: "Answers may vary."
  }
];

for (let i = 46; i <= 50; i++) {
  const existing = essaySpecific.find(q => q.id === i);
  if (existing) {
    questionsList.push(existing);
  } else {
    questionsList.push({
      id: i,
      sectionId: 4,
      type: QuestionType.Essay,
      text: `Question ${i}: Write a detailed response explaining your reasoning on this essay topic.`,
      correctAnswer: "Essay response"
    });
  }
}

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
    { id: 1, title: 'Multiple Choice' },
    { id: 2, title: 'Multiple Select' },
    { id: 3, title: 'Short Answer' },
    { id: 4, title: 'Essay' }
  ],
  questions: questionsList.sort((a, b) => a.id - b.id)
};
