import { NextRequest, NextResponse } from 'next/server';
import { SurveyResponse } from '@/types/survey';
import { saveSurveyToNotion } from '@/lib/notion';

export async function POST(request: NextRequest) {
  try {
    const body: SurveyResponse & { userEmail?: string } = await request.json();

    // バリデーション
    if (!body.surveyId || !body.answers || !Array.isArray(body.answers)) {
      return NextResponse.json(
        { error: '無効なリクエストです' },
        { status: 400 }
      );
    }

    // Notionに保存（ログインユーザーのメールアドレスも含める）
    await saveSurveyToNotion(body, body.userEmail);

    return NextResponse.json(
      { success: true, message: '回答を保存しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: '送信に失敗しました' },
      { status: 500 }
    );
  }
}
