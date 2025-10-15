'use client';

import { useState } from 'react';
import SurveyContainer from '@/components/SurveyContainer';
import LoginForm from '@/components/LoginForm';
import { surveyConfig } from '@/config/survey.config';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLoginSuccess = (email: string, password: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return <SurveyContainer survey={surveyConfig} userEmail={userEmail} />;
}
