import { Survey } from '@/types/survey';

/**
 * アンケート設定
 *
 * このファイルでアンケートの内容を管理します。
 * 質問の追加・更新・削除は、このファイルを編集するだけで反映されます。
 *
 * 使い方:
 * 1. pages配列に新しいページを追加
 * 2. 各ページのquestions配列に質問を追加
 * 3. 質問のtypeに応じて、必要なプロパティを設定
 */

export const surveyConfig: Survey = {
  id: 'sample-survey-2025',
  title: 'サンプルアンケート',
  description: 'これはサンプルアンケートです。以下の質問にお答えください。',

  pages: [
    // ========================================
    // ページ1: 基本情報
    // ========================================
    {
      id: 'page-1',
      title: '基本情報',
      description: '基本情報が保存されることはありません',
      questions: [
        {
          id: 'name',
          type: 'text',
          question: '氏名',
          required: true,
          placeholder: '山田 太郎',
        },
        {
          id: 'age',
          type: 'text',
          question: '年齢',
          required: true,
          placeholder: '30',
        },
        {
          id: 'gender',
          type: 'radio',
          question: '性別',
          required: true,
          choices: [
            { id: '1', label: '男性', value: '男性' },
            { id: '2', label: '女性', value: '女性' },
            { id: '3', label: 'その他', value: 'その他' },
          ],
        },
        {
          id: 'address',
          type: 'text',
          question: '住所（市町村まで）',
          required: true,
          placeholder: '東京都',
        },
      ],
    },

    // ========================================
    // ページ2: サービス評価
    // ========================================
    {
      id: 'page-2',
      title: '好きなもの',
      description: '以下の質問にお答えください',
      questions: [
        {
          id: 'favorite-color',
          type: 'text',
          question: '好きな色は何ですか？',
          required: true,
          placeholder: '青',
        },
        {
          id: 'favorite-food',
          type: 'text',
          question: '好きな食べ物は何ですか？',
          required: true,
          placeholder: '',
        },
        {
          id: 'favorite-animal',
          type: 'text',
          question: '好きな動物は何ですか？',
          required: true,
          placeholder: '',
        },
      ],
    },

    // ========================================
    // ページ3: フィードバック
    // ========================================
    {
      id: 'page-3',
      title: '恋愛経験',
      description: '恋愛経験について自由に教えてください。',
      questions: [
        {
          id: 'relationship-experience',
          type: 'radio',
          question: 'これまでに彼氏彼女ができたことはありますか？',
          required: true,
          choices: [
            { id: '1', label: 'はい', value: 'はい' },
            { id: '2', label: 'いいえ', value: 'いいえ' },
          ],
        },
        {
          id: 'number-of-partners',
          type: 'text',
          question: '今までにできた恋人の人数を教えてください。',
          required: true,
          placeholder: '',
        },
        {
          id: 'number-of-partners',
          type: 'textarea',
          question: '好きな人のタイプを教えてください。',
          required: true,
          placeholder: '',
        },
        {
          id: 'first-experience-age',
          type: 'text',
          question: '初体験の年齢を教えてください。',
          required: true,
          placeholder: '',
        },
        {
          id: 'love-experience',
          type: 'textarea',
          question: 'もっとも記憶に残っている恋愛経験について教えてください。',
          required: false,
          placeholder: 'ご自由にお書きください',
        },
        {
          id: 'sexual-experience',
          type: 'textarea',
          question: 'もっとも記憶に残っている性的な行為について教えてください。',
          required: false,
          placeholder: 'ご自由にお書きください',
        },
      ],
    },
  ],
};
