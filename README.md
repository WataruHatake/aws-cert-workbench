# AWS資格対策ワークベンチ

個人用のAWS資格対策アプリです。CLF-C02とSAA-C03に絞り、問題演習をしながら出題に関係するAWSサービスの概要、選びどころ、混同しやすいサービスを確認できます。

`aws_clf_service_flashcards_with_answers_v5.pdf`から抽出した150問だけを解く「PDF暗記 150問」モードも利用できます。PDFは一問一答形式のため、同じ章の回答候補から4択を構成しています。

## 開き方

ブラウザで次のファイルを開きます。

`/Users/wataru/Documents/AWS 資格/index.html`

サーバーやパッケージインストールは不要です。

## 入っている内容

- CLF-C02、SAA-C03向けの絞り込み
- AWS主要54サービスの日本語概要
- オリジナルの演習問題100問
- PDF「AWS CLF サービス名暗記 一問一答 v5」の150問専用モード
- 関連サービスの即時表示
- 問題文、選択肢、解説内のサービス名からサービス概要へジャンプ
- サービス辞書、カテゴリマップ、復習リスト
- 回答回数、正答率、自信度を使った短めの忘却曲線ベース復習
- 問題順と選択肢順のランダム化
- 解答選択で即採点、1〜4キーで回答/自信度入力
- カスタム可能なポモドーロタイマー
- 試験日と残り日数の保存
- 回答履歴、重要サービス、タイマー回数のブラウザ保存

## PDF問題データの再生成

元PDFを更新した場合は次のコマンドで問題データを再生成できます。

```sh
python3 scripts/extract_pdf_flashcards.py \
  /path/to/aws_clf_service_flashcards_with_answers_v5.pdf \
  pdf-flashcards.js
```

## 参照

- https://aws.amazon.com/certification/certified-cloud-practitioner/
- https://aws.amazon.com/certification/certified-solutions-architect-associate/
- https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html
- https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/clf-02-in-scope-services.html
- https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html
- https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-in-scope-services.html
- https://aws.amazon.com/certification/policies/general-information/
- https://aws.amazon.com/products/
