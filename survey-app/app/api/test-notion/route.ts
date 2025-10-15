import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET() {
  try {
    // 環境変数の確認
    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'NOTION_API_KEY が設定されていません' },
        { status: 500 }
      );
    }

    if (!databaseId) {
      return NextResponse.json(
        { error: 'NOTION_DATABASE_ID が設定されていません' },
        { status: 500 }
      );
    }

    // Notion クライアントの初期化
    const notion = new Client({ auth: apiKey });

    // データベース情報の取得
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    return NextResponse.json({
      success: true,
      message: 'Notion APIに正常に接続できました',
      database: {
        id: database.id,
        properties: Object.keys((database as any).properties || {}),
      },
    });
  } catch (error: any) {
    console.error('Notion test error:', error);
    return NextResponse.json(
      {
        error: 'Notion APIの接続に失敗しました',
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
