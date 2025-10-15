'use client';

import { Question } from '@/types/survey';
import { ChangeEvent, useState } from 'react';

interface QuestionCardProps {
  question: Question;
  value: string | string[] | number | undefined;
  onChange: (questionId: string, value: string | string[] | number) => void;
}

export default function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const [error, setError] = useState<string>('');

  const handleChange = (newValue: string | string[] | number) => {
    setError('');
    onChange(question.id, newValue);
  };

  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder={question.placeholder}
            value={(value as string) || ''}
            onChange={(e) => handleChange(e.target.value)}
            required={question.required}
          />
        );

      case 'textarea':
        return (
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px]"
            placeholder={question.placeholder}
            value={(value as string) || ''}
            onChange={(e) => handleChange(e.target.value)}
            required={question.required}
            rows={5}
          />
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {question.choices?.map((choice) => (
              <label
                key={choice.id}
                className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer transition-all"
              >
                <input
                  type="radio"
                  name={question.id}
                  value={choice.value}
                  checked={value === choice.value}
                  onChange={(e) => handleChange(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  required={question.required}
                />
                <span className="ml-3 text-gray-700">{choice.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.choices?.map((choice) => {
              const isChecked = Array.isArray(value) && value.includes(choice.value);
              return (
                <label
                  key={choice.id}
                  className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer transition-all"
                >
                  <input
                    type="checkbox"
                    value={choice.value}
                    checked={isChecked}
                    onChange={(e) => {
                      const currentValues = (value as string[]) || [];
                      const newValues = e.target.checked
                        ? [...currentValues, choice.value]
                        : currentValues.filter((v) => v !== choice.value);
                      handleChange(newValues);
                    }}
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-3 text-gray-700">{choice.label}</span>
                </label>
              );
            })}
          </div>
        );

      case 'select':
        return (
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            value={(value as string) || ''}
            onChange={(e) => handleChange(e.target.value)}
            required={question.required}
          >
            {question.choices?.map((choice) => (
              <option key={choice.id} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        );

      case 'rating':
        const min = question.min || 1;
        const max = question.max || 5;
        return (
          <div className="flex justify-center gap-4 py-4">
            {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleChange(num)}
                className={`w-14 h-14 rounded-full font-semibold text-lg transition-all ${
                  value === num
                    ? 'bg-blue-600 text-white shadow-lg scale-110'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {question.question}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {question.description && (
          <p className="text-sm text-gray-600">{question.description}</p>
        )}
      </div>
      {renderInput()}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
