'use client';

import { useState } from 'react';
import { Survey, SurveyResponse, Answer } from '@/types/survey';
import QuestionCard from './QuestionCard';

interface SurveyContainerProps {
  survey: Survey;
  userEmail: string;
}

export default function SurveyContainer({ survey, userEmail }: SurveyContainerProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string | string[] | number>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentPage = survey.pages[currentPageIndex];
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === survey.pages.length - 1;

  const handleAnswerChange = (questionId: string, value: string | string[] | number) => {
    setAnswers(new Map(answers.set(questionId, value)));
  };

  const validateCurrentPage = (): boolean => {
    for (const question of currentPage.questions) {
      if (question.required) {
        const answer = answers.get(question.id);
        if (answer === undefined || answer === '' || (Array.isArray(answer) && answer.length === 0)) {
          alert(`「${question.question}」は必須項目です。`);
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentPage()) {
      setCurrentPageIndex(currentPageIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentPageIndex(currentPageIndex - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateCurrentPage()) return;

    setIsSubmitting(true);

    const response: SurveyResponse = {
      surveyId: survey.id,
      answers: Array.from(answers.entries()).map(([questionId, value]) => ({
        questionId,
        value,
      })),
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...response,
          userEmail, // ログインユーザーのメールアドレスを含める
        }),
      });

      if (!res.ok) {
        throw new Error('送信に失敗しました');
      }

      setIsCompleted(true);
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">送信完了!</h2>
            <p className="text-gray-600">
              アンケートへのご協力ありがとうございました。
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{survey.title}</h1>
          {survey.description && (
            <p className="text-gray-600 mb-4">{survey.description}</p>
          )}

          {/* プログレスバー */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                ページ {currentPageIndex + 1} / {survey.pages.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(((currentPageIndex + 1) / survey.pages.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentPageIndex + 1) / survey.pages.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* 現在のページ */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentPage.title}</h2>
          {currentPage.description && (
            <p className="text-gray-600 mb-6">{currentPage.description}</p>
          )}

          {currentPage.questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              value={answers.get(question.id)}
              onChange={handleAnswerChange}
            />
          ))}
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={isFirstPage}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              isFirstPage
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 shadow-md'
            }`}
          >
            ← 前へ
          </button>

          {isLastPage ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 shadow-lg'
              } text-white`}
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
            >
              次へ →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
