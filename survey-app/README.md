# アンケートサイト

Next.js + Notion API を使用したカード形式のアンケートサイトです。

## 機能

- ログイン機能(メールアドレス・パスワード)
- カード形式のアンケートUI
- 複数ページにわたるアンケート
- Notion APIを通じた回答の保存
- レスポンシブデザイン
- プログレスバー表示
- バリデーション機能

## セットアップ

### 1. プロジェクトのクローン/ダウンロード

```bash
cd survey-app
npm install
```

### 2. Notion インテグレーションの作成

1. [Notion Integrations](https://www.notion.com/my-integrations) にアクセス
2. 「+ New integration」をクリック
3. インテグレーション名を入力(例: Survey App)
4. 「Submit」をクリック
5. 表示される「Internal Integration Token」をコピー

### 3. Notion データベースの作成

1. Notionで新しいページを作成
2. 「データベース - フルページ」を選択
3. 以下のプロパティ(カラム)を追加:

| プロパティ名 | タイプ |
|------------|--------|
| 送信日時 | Date |
| アンケートID | Text |
| メールアドレス | Text |
| パスワード | Text |
| ログインメールアドレス | Text |
| お名前を教えてください | Text |
| 年齢層を選択してください | Text |
| サービスの満足度を教えてください | Text |
| 利用した機能を選択してください(複数選択可) | Text |
| 最も改善が必要だと思う項目は? | Text |
| ご意見・ご要望がありましたらご記入ください | Text |
| 他の人にこのサービスを勧めたいと思いますか? | Text |

**注意:**
- 「メールアドレス」と「パスワード」はログイン時にのみ保存されます(アンケートID = "LOGIN")
- 「ログインメールアドレス」はアンケート回答時に、ログインしたユーザーのメールアドレスが保存されます

**重要:** アンケート内容を変更した場合は、Notionのデータベースにも対応するプロパティを追加してください。

4. データベースの右上「...」→「接続を追加」→ 先ほど作成したインテグレーションを選択
5. データベースURLからIDを取得
   - URL: `https://www.notion.so/your-database-id?v=...`
   - `your-database-id` の部分をコピー

### 4. 環境変数の設定

`.env.example` をコピーして `.env` ファイルを作成:

```bash
cp .env.example .env
```

`.env` ファイルを編集:

```
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアクセスできます。

## 使い方

### ログインフロー

1. サイトにアクセスすると、まずログインページが表示されます
2. メールアドレスとパスワードを入力して「ログインしてアンケートを開始」をクリック
3. ログイン情報がNotionに保存されます(アンケートID = "LOGIN")
4. アンケートページが表示されます
5. アンケートを完了して送信すると、回答と一緒にログインメールアドレスが保存されます

### Notionでのデータ確認

Notionデータベースには以下のように保存されます:

**ログインデータ(アンケートID = "LOGIN")**
- 送信日時: ログイン日時
- アンケートID: "LOGIN"
- メールアドレス: ログイン時に入力されたメールアドレス
- パスワード: ログイン時に入力されたパスワード

**アンケート回答データ**
- 送信日時: アンケート送信日時
- アンケートID: アンケートのID(例: "sample-survey-2025")
- ログインメールアドレス: ログインしたユーザーのメールアドレス
- その他: 各質問への回答

## アンケートの編集方法

### アンケートの追加・編集・削除

`config/survey.config.ts` ファイルを編集します。

#### 新しいページを追加

```typescript
{
  id: 'page-4',
  title: '新しいページ',
  description: 'ページの説明',
  questions: [
    // 質問を追加
  ],
}
```

#### 質問タイプ

1. **テキスト入力** (`text`)
```typescript
{
  id: 'question-id',
  type: 'text',
  question: '質問文',
  required: true,
  placeholder: 'プレースホルダー',
}
```

2. **複数行テキスト** (`textarea`)
```typescript
{
  id: 'question-id',
  type: 'textarea',
  question: '質問文',
  required: false,
  placeholder: 'プレースホルダー',
}
```

3. **ラジオボタン** (`radio`)
```typescript
{
  id: 'question-id',
  type: 'radio',
  question: '質問文',
  required: true,
  choices: [
    { id: '1', label: '選択肢1', value: 'option1' },
    { id: '2', label: '選択肢2', value: 'option2' },
  ],
}
```

4. **チェックボックス** (`checkbox`)
```typescript
{
  id: 'question-id',
  type: 'checkbox',
  question: '質問文',
  required: false,
  choices: [
    { id: '1', label: '選択肢1', value: 'option1' },
    { id: '2', label: '選択肢2', value: 'option2' },
  ],
}
```

5. **セレクトボックス** (`select`)
```typescript
{
  id: 'question-id',
  type: 'select',
  question: '質問文',
  required: true,
  choices: [
    { id: '1', label: '選択してください', value: '' },
    { id: '2', label: '選択肢1', value: 'option1' },
    { id: '3', label: '選択肢2', value: 'option2' },
  ],
}
```

6. **評価(レーティング)** (`rating`)
```typescript
{
  id: 'question-id',
  type: 'rating',
  question: '質問文',
  description: '1が最低、5が最高です',
  required: true,
  min: 1,
  max: 5,
}
```

## Vercelへのデプロイ

### 1. Vercelアカウントの作成

[Vercel](https://vercel.com) でアカウントを作成します。

### 2. GitHubにプッシュ

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 3. Vercelでプロジェクトをインポート

1. Vercelダッシュボードで「Add New...」→「Project」
2. GitHubリポジトリを選択
3. 「Import」をクリック
4. Environment Variables を追加:
   - `NOTION_API_KEY`: Notionインテグレーショントークン
   - `NOTION_DATABASE_ID`: NotionデータベースID
5. 「Deploy」をクリック

## カスタマイズ

### デザインの変更

- `app/globals.css`: グローバルスタイル
- `components/QuestionCard.tsx`: 質問カードのデザイン
- `components/SurveyContainer.tsx`: ページ全体のレイアウト

### Tailwind CSS

このプロジェクトはTailwind CSSを使用しています。スタイルの変更は各コンポーネントのclassNameで行えます。

## トラブルシューティング

### Notion APIエラー

- インテグレーショントークンが正しいか確認
- データベースにインテグレーションを共有しているか確認
- データベースのプロパティ名が質問文と一致しているか確認

### ビルドエラー

```bash
rm -rf node_modules .next
npm install
npm run build
```

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **API**: Notion API (@notionhq/client)
- **デプロイ**: Vercel

## ライセンス

ISC
