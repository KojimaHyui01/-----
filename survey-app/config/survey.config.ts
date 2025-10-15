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
      description: 'まずは基本情報をお聞かせください',
      questions: [
        {
          id: 'name',
          type: 'text',
          question: 'お名前を教えてください',
          required: true,
          placeholder: '山田 太郎',
        },
        {
          id: 'email',
          type: 'text',
          question: 'メールアドレス',
          required: true,
          placeholder: 'example@email.com',
        },
        {
          id: 'age-group',
          type: 'radio',
          question: '年齢層を選択してください',
          required: true,
          choices: [
            { id: '1', label: '10代', value: '10s' },
            { id: '2', label: '20代', value: '20s' },
            { id: '3', label: '30代', value: '30s' },
            { id: '4', label: '40代', value: '40s' },
            { id: '5', label: '50代以上', value: '50s+' },
          ],
        },
      ],
    },

    // ========================================
    // ページ2: サービス評価
    // ========================================
    {
      id: 'page-2',
      title: 'サービス評価',
      description: '当サービスについてお聞かせください',
      questions: [
        {
          id: 'satisfaction',
          type: 'rating',
          question: 'サービスの満足度を教えてください',
          description: '1が最低、5が最高です',
          required: true,
          min: 1,
          max: 5,
        },
        {
          id: 'features-used',
          type: 'checkbox',
          question: '利用した機能を選択してください(複数選択可)',
          required: false,
          choices: [
            { id: '1', label: '機能A', value: 'feature-a' },
            { id: '2', label: '機能B', value: 'feature-b' },
            { id: '3', label: '機能C', value: 'feature-c' },
            { id: '4', label: '機能D', value: 'feature-d' },
          ],
        },
        {
          id: 'improvement-area',
          type: 'select',
          question: '最も改善が必要だと思う項目は?',
          required: true,
          choices: [
            { id: '1', label: '選択してください', value: '' },
            { id: '2', label: 'デザイン', value: 'design' },
            { id: '3', label: '機能性', value: 'functionality' },
            { id: '4', label: '使いやすさ', value: 'usability' },
            { id: '5', label: 'パフォーマンス', value: 'performance' },
          ],
        },
      ],
    },

    // ========================================
    // ページ3: フィードバック
    // ========================================
    {
      id: 'page-3',
      title: 'ご意見・ご要望',
      description: '最後に、ご意見やご要望をお聞かせください',
      questions: [
        {
          id: 'feedback',
          type: 'textarea',
          question: 'ご意見・ご要望がありましたらご記入ください',
          required: false,
          placeholder: 'ご自由にお書きください',
        },
        {
          id: 'recommend',
          type: 'radio',
          question: '他の人にこのサービスを勧めたいと思いますか?',
          required: true,
          choices: [
            { id: '1', label: '非常に勧めたい', value: 'highly-likely' },
            { id: '2', label: '勧めたい', value: 'likely' },
            { id: '3', label: 'どちらでもない', value: 'neutral' },
            { id: '4', label: '勧めない', value: 'unlikely' },
            { id: '5', label: '絶対に勧めない', value: 'highly-unlikely' },
          ],
        },
      ],
    },
  ],
};
