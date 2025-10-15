import { Client } from '@notionhq/client';
import { SurveyResponse } from '@/types/survey';
import { surveyConfig } from '@/config/survey.config';

// Notion クライアントの初期化
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID || '';

/**
 * アンケート回答をNotionデータベースに保存
 */
export async function saveSurveyToNotion(
  response: SurveyResponse,
  userEmail?: string
) {
  try {
    // 回答を整形
    const properties: any = {
      '送信日時': {
        date: {
          start: response.submittedAt,
        },
      },
      'アンケートID': {
        rich_text: [
          {
            text: {
              content: response.surveyId,
            },
          },
        ],
      },
    };

    // ログインユーザーのメールアドレスを追加
    if (userEmail) {
      properties['ログインメールアドレス'] = {
        rich_text: [
          {
            text: {
              content: userEmail,
            },
          },
        ],
      };
    }

    // 各回答を追加
    response.answers.forEach((answer) => {
      // 質問情報を取得
      const question = surveyConfig.pages
        .flatMap((page) => page.questions)
        .find((q) => q.id === answer.questionId);

      if (!question) return;

      const questionText = question.question;

      // 回答の値を文字列に変換
      let valueText: string;
      if (Array.isArray(answer.value)) {
        valueText = answer.value.join(', ');
      } else {
        valueText = String(answer.value);
      }

      // Notionのプロパティとして追加
      properties[questionText] = {
        rich_text: [
          {
            text: {
              content: valueText.substring(0, 2000), // Notionの制限: 2000文字まで
            },
          },
        ],
      };
    });

    // Notionデータベースにページを作成
    await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties,
    });

    return { success: true };
  } catch (error) {
    console.error('Notion API error:', error);
    throw new Error('Notionへの保存に失敗しました');
  }
}

/**
 * Notionデータベースの構造を確認
 * (デバッグ用)
 */
export async function getDatabaseStructure() {
  try {
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });
    return database;
  } catch (error) {
    console.error('Database structure error:', error);
    throw error;
  }
}
