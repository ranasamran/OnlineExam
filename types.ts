export enum QuestionType {
  SingleChoice = 'single',
  MultipleSelect = 'multiple',
  ShortAnswer = 'text',
  Essay = 'essay'
}

export interface Question {
  id: number;
  sectionId: number;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string | string[]; // Used for result simulation
}

export interface Section {
  id: number;
  title: string;
}

export interface Exam {
  id: string;
  title: string;
  courseCode: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  status: 'live' | 'upcoming' | 'locked';
  startDate?: string;
  sections: Section[];
  questions: Question[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export type AnswerMap = Record<number, string | string[]>;
export type FlaggedSet = Set<number>;
