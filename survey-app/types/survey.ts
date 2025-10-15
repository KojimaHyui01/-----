// アンケートの質問タイプ
export type QuestionType = 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'rating';

// 選択肢の定義
export interface Choice {
  id: string;
  label: string;
  value: string;
}

// 質問の定義
export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  description?: string;
  required?: boolean;
  choices?: Choice[]; // radio, checkbox, select用
  min?: number; // rating用
  max?: number; // rating用
  placeholder?: string; // text, textarea用
}

// ページの定義
export interface SurveyPage {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

// アンケート全体の定義
export interface Survey {
  id: string;
  title: string;
  description?: string;
  pages: SurveyPage[];
}

// 回答の定義
export interface Answer {
  questionId: string;
  value: string | string[] | number;
}

export interface SurveyResponse {
  surveyId: string;
  answers: Answer[];
  submittedAt: string;
}
