// Generated from aws_clf_service_flashcards_with_answers_v5.pdf.
// Run scripts/extract_pdf_flashcards.py to regenerate this file.
const pdfFlashcards = Object.freeze([
  {
    "number": 1,
    "sectionNumber": 1,
    "sectionTitle": "操作ツール・初期設定",
    "prompt": "TypeScriptやPythonなどの一般的なプログラミング言語でインフラをコードとして定義し、内部的にCloudFormationと連携してAWSリソースを作成・管理する開発フレームワーク。",
    "answer": "AWS CDK"
  },
  {
    "number": 2,
    "sectionNumber": 1,
    "sectionTitle": "操作ツール・初期設定",
    "prompt": "ターミナルやコマンドプロンプトからAWSリソースを操作するためのコマンドラインツール。アクセスキーとシークレットアクセスキーで認証し、スクリプト化や自動化にも利用できる。",
    "answer": "AWS CLI"
  },
  {
    "number": 3,
    "sectionNumber": 1,
    "sectionTitle": "操作ツール・初期設定",
    "prompt": "ブラウザだけでCLIを実行できるAWS管理用のシェル環境。ローカルPCにCLIをインストールしなくても、マネジメントコンソール上からコマンド操作を試せる。",
    "answer": "AWS CloudShell"
  },
  {
    "number": 4,
    "sectionNumber": 1,
    "sectionTitle": "操作ツール・初期設定",
    "prompt": "AWSの各種リソースをブラウザ上のGUIから作成・変更・削除・確認できる管理画面。IAMユーザーやルートユーザーの認証情報でサインインし、検索バーやサービス一覧から目的のサービスを開いて操作する。",
    "answer": "AWS Management Console"
  },
  {
    "number": 5,
    "sectionNumber": 1,
    "sectionTitle": "操作ツール・初期設定",
    "prompt": "Python、Java、JavaScriptなどのプログラミング言語からAWS APIを呼び出すための開発キット。アプリケーションの中からS3へのアップロードやDynamoDBへの書き込みなどを実装できる。",
    "answer": "AWS SDK"
  },
  {
    "number": 6,
    "sectionNumber": 1,
    "sectionTitle": "操作ツール・初期設定",
    "prompt": "Visual Studio CodeなどのIDEに追加して、AWSリソースの確認、Lambdaの開発、デバッグ、デプロイなどを効率化する開発者向け拡張機能。",
    "answer": "AWS Toolkit"
  },
  {
    "number": 7,
    "sectionNumber": 1,
    "sectionTitle": "操作ツール・初期設定",
    "prompt": "クラウド上のアカウント作成後、最初に強く推奨されるセキュリティ対策。パスワードだけでなく、スマートフォンアプリなどのワンタイムコードを追加して不正ログインを防ぐ仕組み。",
    "answer": "MFA"
  },
  {
    "number": 8,
    "sectionNumber": 2,
    "sectionTitle": "アカウント管理・ガバナンス",
    "prompt": "AWS Organizations、IAM Identity Center、Service Catalogなどを組み合わせ、ランディングゾーンと呼ばれる標準化されたマルチアカウント環境を短時間で構築するサービス。",
    "answer": "AWS Control Tower"
  },
  {
    "number": 9,
    "sectionNumber": 2,
    "sectionTitle": "アカウント管理・ガバナンス",
    "prompt": "複数のAWSアカウントを組織としてまとめ、OUでグループ化し、一括請求やサービスコントロールポリシーによるガードレール設定を行える管理サービス。",
    "answer": "AWS Organizations"
  },
  {
    "number": 10,
    "sectionNumber": 2,
    "sectionTitle": "アカウント管理・ガバナンス",
    "prompt": "組織で承認済みのAWSリソース構成をカタログ化し、ユーザーが決められた製品だけをセルフサービスでデプロイできるようにするサービス。製品はCloudFormationテンプレートで定義される。",
    "answer": "AWS Service Catalog"
  },
  {
    "number": 11,
    "sectionNumber": 2,
    "sectionTitle": "アカウント管理・ガバナンス",
    "prompt": "AWS Organizationsで使う、ルート、OU、アカウントにアタッチできるポリシー。IAMで許可されていても、このポリシーで拒否されていれば操作できない最大権限のガードレール。",
    "answer": "Service Control Policy (SCP)"
  },
  {
    "number": 12,
    "sectionNumber": 2,
    "sectionTitle": "アカウント管理・ガバナンス",
    "prompt": "複数アカウントの利用料金を組織単位でまとめて支払える仕組み。アカウントごとの請求を統合し、割引プランの適用や利用状況の把握をしやすくする。",
    "answer": "一括請求 (Consolidated Billing)"
  },
  {
    "number": 13,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "AWS利用料が予算額や使用量のしきい値を超えそうな場合に通知できるコスト管理サービス。月額費用、使用量、RIやSavings Plansの利用率などを監視する。",
    "answer": "AWS Budgets"
  },
  {
    "number": 14,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "JSONまたはYAMLのテンプレートでAWSリソースを定義し、スタックとしてまとめて作成・更新・削除するInfrastructure as Codeサービス。",
    "answer": "AWS CloudFormation"
  },
  {
    "number": 15,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "ユーザーアクティビティやAWS API操作を証跡として記録するサービス。誰が、いつ、どのサービスに対して、どのAPIを実行したかを確認でき、監査やトラブル調査に使う。",
    "answer": "AWS CloudTrail"
  },
  {
    "number": 16,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "S3のバケットやEC2の起動など、AWS上で実行されたAPI操作を時系列で記録し、監査ログとしてS3やCloudWatch Logsに保存できるサービス。",
    "answer": "AWS CloudTrail"
  },
  {
    "number": 17,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "AWSリソースの設定変更履歴を記録し、現在の構成がルールに準拠しているかを評価するサービス。構成変更の追跡やコンプライアンス確認に利用される。",
    "answer": "AWS Config"
  },
  {
    "number": 18,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "設定変更が起きたAWSリソースについて、過去の構成と現在の構成を比較し、ルール違反がないかを継続的に評価するサービス。",
    "answer": "AWS Config"
  },
  {
    "number": 19,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "AWSの過去・現在・将来予測のコストをグラフやフィルターで分析するサービス。サービス別、アカウント別、タグ別などで利用料金を確認できる。",
    "answer": "AWS Cost Explorer"
  },
  {
    "number": 20,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "AWSの利用量とコストに関する最も詳細な請求データをS3に出力するレポート。AthenaやQuickSightと組み合わせて細かなコスト分析に使える。",
    "answer": "AWS Cost and Usage Report"
  },
  {
    "number": 21,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "AWS側のサービスイベント、障害、メンテナンス予定、アカウントに影響する通知を確認できるサービス。自分の利用環境に関連するヘルス情報を把握する。",
    "answer": "AWS Health"
  },
  {
    "number": 22,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "サーバーやソフトウェアのライセンス使用状況を追跡し、ライセンスルールに基づいて使用量を管理するサービス。Windows ServerやSQL ServerなどのBYOL管理に使われる。",
    "answer": "AWS License Manager"
  },
  {
    "number": 23,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "EC2やオンプレミスサーバーなどを一元的に運用管理するサービス群。パッチ適用、コマンド実行、インベントリ収集、パラメータ管理などをまとめて扱える。",
    "answer": "AWS Systems Manager"
  },
  {
    "number": 24,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "分散アプリケーションのリクエスト処理をトレースし、どのサービスで遅延やエラーが発生しているかを可視化するサービス。マイクロサービスのボトルネック調査に役立つ。",
    "answer": "AWS X-Ray"
  },
  {
    "number": 25,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "統合的な運用監視サービス。AWSリソースやアプリケーションのメトリクス、ログ、イベントを収集し、しきい値に基づくアラームやSNS通知、アクション実行に利用できる。",
    "answer": "Amazon CloudWatch"
  },
  {
    "number": 26,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "EC2やRDSなどのCPU使用率・メモリ・ディスク・ログを監視し、異常時にメール通知やLambda実行につなげる、運用監視の中心となるサービス。",
    "answer": "Amazon CloudWatch"
  },
  {
    "number": 27,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "AWSリソース、オンプレミス、他クラウドなどから出力されるログを集約し、ロググループ・ログストリーム・ログイベントとして管理、検索、保持期間設定ができる機能。",
    "answer": "Amazon CloudWatch Logs"
  },
  {
    "number": 28,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "メトリクスが設定したしきい値を超えた場合や、異常検知に該当した場合に状態をOK、ALARM、INSUFFICIENT_DATAなどで判定し、通知やアクション実行につなげる機能。",
    "answer": "CloudWatch Alarm"
  },
  {
    "number": 29,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "CloudWatch Logsに保存されたログを、SQLに似たクエリ言語で対話的に検索・分析できる機能。VPC Flow Logsなどから特定IPや時間帯の通信を調べる用途にも使われる。",
    "answer": "CloudWatch Logs Insights"
  },
  {
    "number": 30,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "CPU使用率、リクエスト数、ディスク使用率など、一定期間に取得された測定値を扱うCloudWatchの監視データ。標準メトリクスとカスタムメトリクスがある。",
    "answer": "CloudWatch メトリクス"
  },
  {
    "number": 31,
    "sectionNumber": 3,
    "sectionTitle": "監視・運用・IaC・コスト管理",
    "prompt": "ログイベントの中から特定パターンに一致するものを検出し、出現回数や数値をカスタムメトリクスとして発行できるCloudWatchの機能。",
    "answer": "CloudWatch メトリクスフィルター"
  },
  {
    "number": 32,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "AWSのセキュリティ、コンプライアンス、契約関連ドキュメントや監査レポートを取得できるポータル。SOCレポートやISO認証資料の確認に使う。",
    "answer": "AWS Artifact"
  },
  {
    "number": 33,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "AWS環境の監査証跡を継続的に収集し、監査レポート作成を支援するサービス。コンプライアンス評価や証跡の整理に使われる。",
    "answer": "AWS Audit Manager"
  },
  {
    "number": 34,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "SSL/TLS証明書をプロビジョニング、管理、更新するサービス。Elastic Load Balancing、CloudFront、API Gatewayなどに証明書を関連付け、HTTPS通信を実現する。",
    "answer": "AWS Certificate Manager"
  },
  {
    "number": 35,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "Microsoft Active DirectoryをAWS上で利用したり、オンプレミスADと連携したりするためのディレクトリサービス。WorkSpacesやIAM Identity Centerとの連携にも使われる。",
    "answer": "AWS Directory Service"
  },
  {
    "number": 36,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "複数アカウントにまたがるWAFルール、Shield Advanced、セキュリティグループ、Network Firewallなどのポリシーを一元的に適用・管理するサービス。",
    "answer": "AWS Firewall Manager"
  },
  {
    "number": 37,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "AWSアカウント内のユーザー、グループ、ロール、ポリシーを管理し、誰がどのリソースに何をできるかを制御する認証・認可サービス。最小権限の原則に基づくアクセス管理に使う。",
    "answer": "AWS IAM"
  },
  {
    "number": 38,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "複数のAWSアカウントやクラウドアプリケーションへのシングルサインオンを提供するサービス。ユーザーは一度の認証で許可されたアカウントやアプリにアクセスできる。",
    "answer": "AWS IAM Identity Center"
  },
  {
    "number": 39,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "暗号鍵を作成・管理し、S3、EBS、RDSなど多くのAWSサービスのデータ暗号化に利用するマネージドサービス。鍵のローテーションやアクセス制御にも対応する。",
    "answer": "AWS KMS"
  },
  {
    "number": 40,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "VPC内のトラフィックに対してステートフル/ステートレスなネットワークファイアウォールを提供するマネージドサービス。サブネット間やインターネット境界の通信制御に使う。",
    "answer": "AWS Network Firewall"
  },
  {
    "number": 41,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "データベース認証情報、APIキー、OAuthトークンなどの機密情報を安全に保存し、必要に応じて取得・ローテーションできるサービス。",
    "answer": "AWS Secrets Manager"
  },
  {
    "number": 42,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "GuardDuty、Inspector、Macie、Firewall Managerなどのセキュリティ検出結果を集約し、優先度付けや標準への準拠状況確認を行うサービス。",
    "answer": "AWS Security Hub"
  },
  {
    "number": 43,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "DDoS攻撃からAWSリソースを保護するサービス。標準で自動適用されるStandardと、より高度な保護やコスト保護を提供するAdvancedがある。",
    "answer": "AWS Shield"
  },
  {
    "number": 44,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "WebアプリケーションをSQLインジェクションやクロスサイトスクリプティングなどの一般的な攻撃から保護するWebアプリケーションファイアウォール。CloudFrontやALB、API Gatewayに適用できる。",
    "answer": "AWS WAF"
  },
  {
    "number": 45,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "Webアプリやモバイルアプリにユーザー登録、サインイン、認証、ユーザープール、IDプールなどの機能を提供するサービス。SNSログインやJWT認証にも利用される。",
    "answer": "Amazon Cognito"
  },
  {
    "number": 46,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "GuardDutyなどの検出結果を起点に、IPアドレス、IAMユーザー、EC2、S3などの関連性を動作グラフで分析し、セキュリティ調査を支援するサービス。",
    "answer": "Amazon Detective"
  },
  {
    "number": 47,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "CloudTrail、VPC Flow Logs、DNSログなどを分析し、不正なAPI呼び出し、暗号資産マイニング、侵害されたインスタンスなどの脅威を検出するサービス。",
    "answer": "Amazon GuardDuty"
  },
  {
    "number": 48,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "EC2インスタンス、コンテナイメージ、Lambda関数などの脆弱性やネットワーク露出を自動的に評価し、セキュリティ上の問題を検出するサービス。",
    "answer": "Amazon Inspector"
  },
  {
    "number": 49,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "S3に保存されたデータを機械学習で検出し、個人情報や機密データが含まれていないかを確認するデータセキュリティサービス。",
    "answer": "Amazon Macie"
  },
  {
    "number": 50,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "IAMで使う、AWSリソースへの権限をJSON形式で定義するもの。AllowやDeny、Action、Resource、Conditionなどを指定してアクセス許可を表現する。",
    "answer": "IAMポリシー"
  },
  {
    "number": 51,
    "sectionNumber": 4,
    "sectionTitle": "セキュリティ・ID・コンプライアンス",
    "prompt": "AWSサービス、アプリケーション、外部IDプロバイダーなどに一時的な権限を付与するためのIAMの仕組み。長期的なアクセスキーを持たせずに権限委任できる。",
    "answer": "IAMロール"
  },
  {
    "number": 52,
    "sectionNumber": 5,
    "sectionTitle": "ストレージ",
    "prompt": "AWSサービスやオンプレミス環境にまたがるバックアップを一元的に設定、スケジュール、保持、復元できるマネージドバックアップサービス。",
    "answer": "AWS Backup"
  },
  {
    "number": 53,
    "sectionNumber": 5,
    "sectionTitle": "ストレージ",
    "prompt": "オンプレミス環境とAWSストレージを接続し、ファイル、ボリューム、テープなどの形式でクラウドストレージを利用できるハイブリッドクラウド向けサービス。",
    "answer": "AWS Storage Gateway"
  },
  {
    "number": 54,
    "sectionNumber": 5,
    "sectionTitle": "ストレージ",
    "prompt": "EC2インスタンスにアタッチして使うブロックストレージ。OSやデータベースのディスクとして利用され、スナップショットによるバックアップや復元にも対応する。",
    "answer": "Amazon EBS"
  },
  {
    "number": 55,
    "sectionNumber": 5,
    "sectionTitle": "ストレージ",
    "prompt": "複数のEC2インスタンスから同時にマウントできるフルマネージドなNFSファイルストレージ。自動的に容量が伸縮し、Linux系ワークロードで共有ファイル領域として使う。",
    "answer": "Amazon EFS"
  },
  {
    "number": 56,
    "sectionNumber": 5,
    "sectionTitle": "ストレージ",
    "prompt": "高い耐久性を持つオブジェクトストレージサービス。データをバケットに保存し、画像、動画、ログ、バックアップ、静的Webサイトなど幅広い用途で利用できる。",
    "answer": "Amazon S3"
  },
  {
    "number": 57,
    "sectionNumber": 5,
    "sectionTitle": "ストレージ",
    "prompt": "データをオブジェクトとして保存し、キーで取り出すストレージ。ファイルシステムのような階層ではなく、バケットとオブジェクトで管理する。",
    "answer": "Amazon S3"
  },
  {
    "number": 58,
    "sectionNumber": 5,
    "sectionTitle": "ストレージ",
    "prompt": "S3で使用頻度の低いデータを低コストで長期保存するためのストレージクラス群。取り出し時間や料金の違いに応じて、アーカイブ用途に使い分ける。",
    "answer": "Amazon S3 Glacier"
  },
  {
    "number": 59,
    "sectionNumber": 5,
    "sectionTitle": "ストレージ",
    "prompt": "S3でオブジェクトの世代を保持する機能。誤って上書き・削除した場合でも過去バージョンを復元でき、データ保護に役立つ。",
    "answer": "S3 バージョニング"
  },
  {
    "number": 60,
    "sectionNumber": 5,
    "sectionTitle": "ストレージ",
    "prompt": "S3に保存したオブジェクトを、一定期間後に別のストレージクラスへ移動したり削除したりするルール。コスト最適化や保持期間管理に使う。",
    "answer": "S3 ライフサイクルポリシー"
  },
  {
    "number": 61,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "EC2以外も含め、複数のAWSサービスのリソースを需要に応じて自動的にスケーリングするためのサービス。スケーリング計画を一元的に管理できる。",
    "answer": "AWS Auto Scaling"
  },
  {
    "number": 62,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "大量のバッチ処理やジョブを効率よく実行するためのサービス。ジョブキュー、コンピューティング環境、ジョブ定義を使い、必要なリソースを自動で確保する。",
    "answer": "AWS Batch"
  },
  {
    "number": 63,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "アプリケーションコードをアップロードするだけで、EC2、ロードバランサー、Auto Scalingなど必要な環境を自動的に構築・管理してくれるPaaS型サービス。",
    "answer": "AWS Elastic Beanstalk"
  },
  {
    "number": 64,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "サーバーを管理せずにコードを実行できるサーバーレスコンピューティングサービス。イベント発生時に関数を実行し、実行時間とリクエスト数に基づいて課金される。",
    "answer": "AWS Lambda"
  },
  {
    "number": 65,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "サーバーを用意せず、イベントに応じて短い処理コードを実行する。API Gateway、S3、EventBridgeなどをトリガーにして処理を起動できる。",
    "answer": "AWS Lambda"
  },
  {
    "number": 66,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "クラウド上で仮想サーバーを起動できるコンピューティングサービス。インスタンスタイプ、AMI、ストレージ、セキュリティグループなどを選択して利用する。",
    "answer": "Amazon EC2"
  },
  {
    "number": 67,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "EC2インスタンスの需要に応じて台数を自動的に増減させる機能。ターゲット追跡、スケジュール、メトリクスに基づいてスケールアウト/インする。",
    "answer": "Amazon EC2 Auto Scaling"
  },
  {
    "number": 68,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "トラフィックが増えたときにEC2の台数を増やし、減ったときに減らすことで、可用性とコスト最適化を両立する機能。",
    "answer": "Amazon EC2 Auto Scaling"
  },
  {
    "number": 69,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "DockerコンテナをAWS上で実行・管理するフルマネージドなコンテナオーケストレーションサービス。FargateやEC2起動タイプを選択できる。",
    "answer": "Amazon ECS"
  },
  {
    "number": 70,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "KubernetesをAWS上で実行するためのマネージドサービス。Kubernetesコントロールプレーンの運用負荷を軽減し、コンテナ化アプリケーションを管理する。",
    "answer": "Amazon EKS"
  },
  {
    "number": 71,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "仮想サーバー、ストレージ、データベース、ネットワークなどをシンプルな画面と固定料金に近い形で利用できる、初心者や小規模用途向けサービス。",
    "answer": "Amazon Lightsail"
  },
  {
    "number": 72,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "EC2でインスタンスを起動する元になるテンプレート。OS、アプリケーション、設定を含んだマシンイメージで、同じ構成のサーバーを再作成できる。",
    "answer": "Amazon Machine Image (AMI)"
  },
  {
    "number": 73,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "クラウド上でWindowsやLinuxの仮想デスクトップを提供するサービス。ユーザーは場所を問わず安全にデスクトップ環境へアクセスできる。",
    "answer": "Amazon WorkSpaces"
  },
  {
    "number": 74,
    "sectionNumber": 6,
    "sectionTitle": "コンピューティング・コンテナ・サーバーレス",
    "prompt": "EC2インスタンスへのインバウンド/アウトバウンド通信を制御する仮想ファイアウォール。許可ルールのみを設定し、インスタンス単位で関連付ける。",
    "answer": "セキュリティグループ"
  },
  {
    "number": 75,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "オンプレミス環境とAWSを専用線で接続するサービス。インターネットを経由せず、安定した帯域や低遅延が必要な接続に使う。",
    "answer": "AWS Direct Connect"
  },
  {
    "number": 76,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "AWSのグローバルネットワークを利用して、ユーザーからアプリケーションへの経路を最適化し、固定エニーキャストIPで低遅延・高可用なアクセスを提供するサービス。",
    "answer": "AWS Global Accelerator"
  },
  {
    "number": 77,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "オンプレミスネットワークとAWS VPCをインターネット経由の暗号化トンネルで接続するサービス。比較的短期間でハイブリッド接続を構成できる。",
    "answer": "AWS VPN"
  },
  {
    "number": 78,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "世界中のエッジロケーションにコンテンツをキャッシュし、ユーザーに近い場所から配信するCDNサービス。静的/動的コンテンツ配信、HTTPS、WAF連携に使う。",
    "answer": "Amazon CloudFront"
  },
  {
    "number": 79,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "世界中の利用者へ静的ファイルや動画、APIレスポンスを低遅延で配信するため、エッジロケーションにキャッシュするサービス。",
    "answer": "Amazon CloudFront"
  },
  {
    "number": 80,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "AWSが提供するDNSサービス。ドメイン登録、DNSルーティング、ヘルスチェック、フェイルオーバー、加重・レイテンシー・位置情報ルーティングなどに対応する。",
    "answer": "Amazon Route 53"
  },
  {
    "number": 81,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "AWS内に論理的に分離された仮想ネットワークを作成するサービス。CIDR、サブネット、ルートテーブル、インターネットゲートウェイ、NATゲートウェイなどを設計する。",
    "answer": "Amazon VPC"
  },
  {
    "number": 82,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "仮想ネットワークを作り、パブリック/プライベートサブネット、ルート、ゲートウェイ、セキュリティ境界を設計するAWSネットワークの土台。",
    "answer": "Amazon VPC"
  },
  {
    "number": 83,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "HTTP/HTTPSトラフィックをレイヤー7で分散し、パスベースルーティングやホストベースルーティングに対応するロードバランサー。",
    "answer": "Application Load Balancer"
  },
  {
    "number": 84,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "複数のEC2やコンテナなどにトラフィックを分散するロードバランサーサービス。ヘルスチェックにより正常なターゲットへリクエストを振り分ける。",
    "answer": "Elastic Load Balancing"
  },
  {
    "number": 85,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "プライベートサブネット内のリソースがインターネットへアウトバウンド通信するために使う。外部からのインバウンド接続は直接受け付けない。",
    "answer": "NAT Gateway"
  },
  {
    "number": 86,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "TCP/UDP/TLSなどをレイヤー4で高速に処理し、非常に高いパフォーマンスや静的IPが必要なワークロードに向くロードバランサー。",
    "answer": "Network Load Balancer"
  },
  {
    "number": 87,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "VPCとインターネットを接続するためのゲートウェイ。パブリックサブネット上のリソースがグローバルIPを持ってインターネットと通信する際に利用する。",
    "answer": "インターネットゲートウェイ"
  },
  {
    "number": 88,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "VPC内のIPアドレス範囲を分割したネットワーク区画。アベイラビリティゾーン単位で作成し、パブリックサブネットやプライベートサブネットとして使い分ける。",
    "answer": "サブネット"
  },
  {
    "number": 89,
    "sectionNumber": 7,
    "sectionTitle": "ネットワーク・配信",
    "prompt": "サブネット単位で適用されるステートレスなネットワークACL。インバウンドとアウトバウンドの許可・拒否ルールを番号順に評価する。",
    "answer": "ネットワークACL"
  },
  {
    "number": 90,
    "sectionNumber": 8,
    "sectionTitle": "データベース",
    "prompt": "MySQL/PostgreSQL互換のAWS独自リレーショナルデータベース。高性能、高可用性、自動ストレージ拡張を特徴とし、RDSの一種として利用される。",
    "answer": "Amazon Aurora"
  },
  {
    "number": 91,
    "sectionNumber": 8,
    "sectionTitle": "データベース",
    "prompt": "MongoDB互換のドキュメントデータベースサービス。JSON形式に近いドキュメントデータを扱うアプリケーションの移行や運用に利用される。",
    "answer": "Amazon DocumentDB"
  },
  {
    "number": 92,
    "sectionNumber": 8,
    "sectionTitle": "データベース",
    "prompt": "キーと値、ドキュメントデータを扱えるフルマネージドなNoSQLデータベース。低レイテンシ、高スケーラビリティが特徴で、サーバーレス的に利用できる。",
    "answer": "Amazon DynamoDB"
  },
  {
    "number": 93,
    "sectionNumber": 8,
    "sectionTitle": "データベース",
    "prompt": "NoSQLでミリ秒単位の低レイテンシを狙い、アクセス量に応じてスケールしやすいキー・バリュー/ドキュメント型のデータベース。",
    "answer": "Amazon DynamoDB"
  },
  {
    "number": 94,
    "sectionNumber": 8,
    "sectionTitle": "データベース",
    "prompt": "RedisやMemcached互換のインメモリデータストアを提供するサービス。キャッシュ、セッション管理、ランキング、リアルタイム処理に使われる。",
    "answer": "Amazon ElastiCache"
  },
  {
    "number": 95,
    "sectionNumber": 8,
    "sectionTitle": "データベース",
    "prompt": "グラフ構造のデータを保存・検索するためのマネージドデータベース。人間関係、レコメンド、不正検知、ネットワーク関係の分析に向いている。",
    "answer": "Amazon Neptune"
  },
  {
    "number": 96,
    "sectionNumber": 8,
    "sectionTitle": "データベース",
    "prompt": "MySQL、PostgreSQL、MariaDB、Oracle、SQL Serverなどに対応するフルマネージドなリレーショナルデータベースサービス。バックアップ、パッチ適用、フェイルオーバーの運用負荷を軽減する。",
    "answer": "Amazon RDS"
  },
  {
    "number": 97,
    "sectionNumber": 8,
    "sectionTitle": "データベース",
    "prompt": "リレーショナルDBの作成、バックアップ、パッチ、監視、フェイルオーバーなどをAWS側に任せ、利用者はDBエンジンやサイズを選んで使うサービス。",
    "answer": "Amazon RDS"
  },
  {
    "number": 98,
    "sectionNumber": 8,
    "sectionTitle": "データベース",
    "prompt": "DynamoDBテーブルの変更履歴を時系列で取り出せる機能。Lambdaと連携して、データ変更をトリガーにした処理を実行できる。",
    "answer": "DynamoDB Streams"
  },
  {
    "number": 99,
    "sectionNumber": 8,
    "sectionTitle": "データベース",
    "prompt": "RDSでスタンバイDBを別AZに配置し、障害時に自動フェイルオーバーする高可用性構成。読み取り性能向上ではなく可用性向上が主目的。",
    "answer": "Multi-AZ 配置"
  },
  {
    "number": 100,
    "sectionNumber": 8,
    "sectionTitle": "データベース",
    "prompt": "RDSやAuroraで読み取り専用のコピーを作成し、参照クエリを分散して読み取り性能を向上させる仕組み。災害対策や分析用途にも使われる。",
    "answer": "リードレプリカ"
  },
  {
    "number": 101,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "分散アプリケーションやマイクロサービスの処理手順を、ステートマシンとして定義・実行・可視化するワークフローサービス。Lambda、SQS、DynamoDBなどと連携する。",
    "answer": "AWS Step Functions"
  },
  {
    "number": 102,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "APIの作成、公開、保護、モニタリングを行うフルマネージドサービス。HTTP API、REST API、WebSocket APIをサポートし、LambdaやDynamoDBなどのバックエンドと連携する。",
    "answer": "Amazon API Gateway"
  },
  {
    "number": 103,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "イベントドリブン型のメッセージ通知サービス。トピックに発行したメッセージを、Eメール、SMS、HTTP/S、SQS、Lambdaなど複数の購読先へプッシュできる。",
    "answer": "Amazon SNS"
  },
  {
    "number": 104,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "イベント発生をきっかけに、Eメール、SMS、SQS、Lambdaなどへ同じ通知を配信するプッシュ型のメッセージングサービス。",
    "answer": "Amazon SNS"
  },
  {
    "number": 105,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "分散システムやマイクロサービス間を疎結合にするフルマネージドなメッセージキューサービス。送信側と受信側の処理タイミングを分離し、負荷を平準化する。",
    "answer": "Amazon SQS"
  },
  {
    "number": 106,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "アプリケーションからのリクエストをキューにため、処理側が自分のペースで取り出すことで、急な負荷増加や障害の影響を和らげるサービス。",
    "answer": "Amazon SQS"
  },
  {
    "number": 107,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "Step Functionsで状態遷移を定義するJSONベースの言語。Wait、Choice、Parallel、Map、Failなどの状態を記述できる。",
    "answer": "Amazon States Language (ASL)"
  },
  {
    "number": 108,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "SQSで処理に失敗し続けたメッセージを隔離するためのキュー。問題メッセージの調査や再処理に利用する。",
    "answer": "Dead Letter Queue"
  },
  {
    "number": 109,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "SQSで、メッセージがキューに送信されてからコンシューマーに初めて見えるまでの時間を遅らせる機能。最大15分の遅延を設定できる。",
    "answer": "Delay Queue"
  },
  {
    "number": 110,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "SNSで1つのメッセージを複数のサブスクライバーへ同時に配信し、並列・非同期処理を実現する設計パターン。",
    "answer": "SNS ファンアウト"
  },
  {
    "number": 111,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "SQSで先入れ先出しの順序保証と重複排除を提供するキュータイプ。順序が重要な処理で利用するが、Standardよりスループットは制約される。",
    "answer": "SQS FIFO キュー"
  },
  {
    "number": 112,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "SQSで高いスループットを重視し、メッセージ順序や重複排除を厳密には保証しないキュータイプ。大量のメッセージ処理に向く。",
    "answer": "SQS Standard キュー"
  },
  {
    "number": 113,
    "sectionNumber": 9,
    "sectionTitle": "アプリケーション統合",
    "prompt": "SQSで、コンシューマーがメッセージを受け取った後、一定時間そのメッセージを他のコンシューマーから見えなくする仕組み。処理中の重複受信を防ぐ。",
    "answer": "Visibility Timeout"
  },
  {
    "number": 114,
    "sectionNumber": 10,
    "sectionTitle": "分析・データ基盤",
    "prompt": "データの抽出、変換、ロードを行うサーバーレスなETLサービス。データカタログ、クローラー、ジョブを使って分析用データを準備する。",
    "answer": "AWS Glue"
  },
  {
    "number": 115,
    "sectionNumber": 10,
    "sectionTitle": "分析・データ基盤",
    "prompt": "Glueでデータソースを自動的にスキャンし、スキーマ情報を推測してデータカタログにテーブル定義を作成する機能。",
    "answer": "AWS Glue クローラー"
  },
  {
    "number": 116,
    "sectionNumber": 10,
    "sectionTitle": "分析・データ基盤",
    "prompt": "S3上のデータに対して、サーバーを管理せずSQLで直接クエリできる分析サービス。ログ分析やCSV/Parquetデータの検索に利用される。",
    "answer": "Amazon Athena"
  },
  {
    "number": 117,
    "sectionNumber": 10,
    "sectionTitle": "分析・データ基盤",
    "prompt": "Hadoop、Spark、Hiveなどのビッグデータフレームワークをマネージドクラスタとして実行するサービス。大規模データ処理や分散分析に使う。",
    "answer": "Amazon EMR"
  },
  {
    "number": 118,
    "sectionNumber": 10,
    "sectionTitle": "分析・データ基盤",
    "prompt": "ストリーミングデータをリアルタイムに収集・処理するためのサービス群。ログ、クリックストリーム、IoTデータなどを継続的に取り込む用途で使う。",
    "answer": "Amazon Kinesis"
  },
  {
    "number": 119,
    "sectionNumber": 10,
    "sectionTitle": "分析・データ基盤",
    "prompt": "検索、ログ分析、可視化のためのマネージドサービス。OpenSearch/Elasticsearch系の機能を利用し、アプリケーションログや全文検索に使う。",
    "answer": "Amazon OpenSearch Service"
  },
  {
    "number": 120,
    "sectionNumber": 10,
    "sectionTitle": "分析・データ基盤",
    "prompt": "BIダッシュボードやデータ可視化を作成するサービス。Athena、Redshift、S3、RDSなどのデータソースと連携し、グラフやレポートを共有できる。",
    "answer": "Amazon QuickSight"
  },
  {
    "number": 121,
    "sectionNumber": 10,
    "sectionTitle": "分析・データ基盤",
    "prompt": "データウェアハウスとして大量の構造化データを高速に分析するサービス。列指向ストレージとMPPにより、SQLで大規模分析を行う。",
    "answer": "Amazon Redshift"
  },
  {
    "number": 122,
    "sectionNumber": 10,
    "sectionTitle": "分析・データ基盤",
    "prompt": "S3を中心に構築する、構造化・半構造化・非構造化データをそのまま大量に蓄積する分析基盤の考え方。用途に応じてAthenaやGlueなどで処理する。",
    "answer": "データレイク"
  },
  {
    "number": 123,
    "sectionNumber": 11,
    "sectionTitle": "開発者ツール・移行",
    "prompt": "オンプレミスサーバーの設定情報やパフォーマンス情報を収集し、AWS移行計画の作成を支援するサービス。エージェント型とエージェントレス型がある。",
    "answer": "AWS Application Discovery Service"
  },
  {
    "number": 124,
    "sectionNumber": 11,
    "sectionTitle": "開発者ツール・移行",
    "prompt": "オンプレミスの物理/仮想サーバーをAWSへ移行するため、ブロックレベルの継続的レプリケーションを行い、ダウンタイムを最小化するサービス。",
    "answer": "AWS Application Migration Service"
  },
  {
    "number": 125,
    "sectionNumber": 11,
    "sectionTitle": "開発者ツール・移行",
    "prompt": "ソースコードをコンパイル、テスト、パッケージングするフルマネージドなビルドサービス。ビルド環境を自前で管理せず、buildspecに従って処理を実行する。",
    "answer": "AWS CodeBuild"
  },
  {
    "number": 126,
    "sectionNumber": 11,
    "sectionTitle": "開発者ツール・移行",
    "prompt": "EC2、オンプレミスサーバー、Lambda、ECSなどへアプリケーションを自動デプロイするサービス。ローリングやブルー/グリーンなどのデプロイ方式に対応する。",
    "answer": "AWS CodeDeploy"
  },
  {
    "number": 127,
    "sectionNumber": 11,
    "sectionTitle": "開発者ツール・移行",
    "prompt": "ソース、ビルド、テスト、承認、デプロイといったステージをつなぎ、リリースプロセスを自動化するCI/CDパイプラインサービス。",
    "answer": "AWS CodePipeline"
  },
  {
    "number": 128,
    "sectionNumber": 11,
    "sectionTitle": "開発者ツール・移行",
    "prompt": "オンプレミスや他クラウドのデータベースをAWSへ移行するサービス。一括移行だけでなく、CDCによる継続的な差分移行にも対応する。",
    "answer": "AWS Database Migration Service"
  },
  {
    "number": 129,
    "sectionNumber": 11,
    "sectionTitle": "開発者ツール・移行",
    "prompt": "AWSやパートナーの複数移行ツールをまたいで、アプリケーション移行の進捗を1つのダッシュボードで追跡できるサービス。",
    "answer": "AWS Migration Hub"
  },
  {
    "number": 130,
    "sectionNumber": 11,
    "sectionTitle": "開発者ツール・移行",
    "prompt": "異なるデータベースエンジン間で、スキーマ、ビュー、ストアドプロシージャなどを変換するためのツール。DMSと組み合わせて異種DB移行を支援する。",
    "answer": "AWS Schema Conversion Tool"
  },
  {
    "number": 131,
    "sectionNumber": 11,
    "sectionTitle": "開発者ツール・移行",
    "prompt": "物理デバイスを使って大容量データをAWSへ転送するサービス群。ネットワーク帯域が限られる環境やPB級データ移行で利用される。",
    "answer": "AWS Snow Family"
  },
  {
    "number": 132,
    "sectionNumber": 11,
    "sectionTitle": "開発者ツール・移行",
    "prompt": "SFTP、FTPS、FTPプロトコルでS3やEFSへファイル転送を行うマネージドサービス。既存のファイル転送ワークフローをAWSストレージに接続できる。",
    "answer": "AWS Transfer Family"
  },
  {
    "number": 133,
    "sectionNumber": 12,
    "sectionTitle": "AI・機械学習",
    "prompt": "テキストから感情、キーフレーズ、エンティティ、言語などを抽出する自然言語処理サービス。問い合わせ分析やレビュー分析に利用される。",
    "answer": "Amazon Comprehend"
  },
  {
    "number": 134,
    "sectionNumber": 12,
    "sectionTitle": "AI・機械学習",
    "prompt": "企業内文書、FAQ、S3、SharePointなどを横断して検索できるエンタープライズ検索サービス。自然言語の質問に関連文書を返す。",
    "answer": "Amazon Kendra"
  },
  {
    "number": 135,
    "sectionNumber": 12,
    "sectionTitle": "AI・機械学習",
    "prompt": "音声やテキストによる対話型インターフェイスを構築するサービス。チャットボットや音声ボットで意図やスロットを扱う。",
    "answer": "Amazon Lex"
  },
  {
    "number": 136,
    "sectionNumber": 12,
    "sectionTitle": "AI・機械学習",
    "prompt": "テキストを自然な音声に変換するサービス。読み上げ、音声ガイド、アクセシビリティ対応などに利用される。",
    "answer": "Amazon Polly"
  },
  {
    "number": 137,
    "sectionNumber": 12,
    "sectionTitle": "AI・機械学習",
    "prompt": "画像や動画から顔、物体、シーン、テキスト、不適切コンテンツなどを検出する画像・動画分析サービス。",
    "answer": "Amazon Rekognition"
  },
  {
    "number": 138,
    "sectionNumber": 12,
    "sectionTitle": "AI・機械学習",
    "prompt": "機械学習モデルの構築、学習、チューニング、デプロイ、運用を一貫して支援するマネージドなML開発環境。",
    "answer": "Amazon SageMaker"
  },
  {
    "number": 139,
    "sectionNumber": 12,
    "sectionTitle": "AI・機械学習",
    "prompt": "音声をテキストに変換する自動音声認識サービス。録音、通話、動画音声の文字起こしに利用される。",
    "answer": "Amazon Transcribe"
  },
  {
    "number": 140,
    "sectionNumber": 12,
    "sectionTitle": "AI・機械学習",
    "prompt": "テキストを複数言語間で自動翻訳する機械学習サービス。多言語対応アプリやドキュメント翻訳に利用される。",
    "answer": "Amazon Translate"
  },
  {
    "number": 141,
    "sectionNumber": 13,
    "sectionTitle": "料金・サポート・設計思想",
    "prompt": "AWSの請求、支払い、コスト、使用状況を確認・管理するコンソール。請求書、支払い方法、無料利用枠の状況などを確認できる。",
    "answer": "AWS Billing and Cost Management"
  },
  {
    "number": 142,
    "sectionNumber": 13,
    "sectionTitle": "料金・サポート・設計思想",
    "prompt": "クラウド導入に必要な視点を、ビジネス、人材、ガバナンス、プラットフォーム、セキュリティ、オペレーションなどに整理するフレームワーク。",
    "answer": "AWS Cloud Adoption Framework"
  },
  {
    "number": 143,
    "sectionNumber": 13,
    "sectionTitle": "料金・サポート・設計思想",
    "prompt": "AWSの利用料を事前に見積もるためのツール。リージョン、インスタンスタイプ、ストレージ量、転送量などを入力して月額費用を試算できる。",
    "answer": "AWS Pricing Calculator"
  },
  {
    "number": 144,
    "sectionNumber": 13,
    "sectionTitle": "料金・サポート・設計思想",
    "prompt": "AWSのベストプラクティスに沿って、運用上の優秀性、セキュリティ、信頼性、パフォーマンス効率、コスト最適化、持続可能性の観点から設計を評価するフレームワーク。",
    "answer": "AWS Well-Architected Framework"
  },
  {
    "number": 145,
    "sectionNumber": 13,
    "sectionTitle": "料金・サポート・設計思想",
    "prompt": "AWSの技術的な質問や知識共有を行うコミュニティ型サービス。無料で質問・回答を検索でき、ナレッジセンターとあわせて自己解決に使う。",
    "answer": "AWS re:Post"
  },
  {
    "number": 146,
    "sectionNumber": 13,
    "sectionTitle": "料金・サポート・設計思想",
    "prompt": "AWSサービスの現在の単価、無料利用枠、料金体系を確認できる公式ページ。従量課金、リクエスト数、データ転送料などの課金要素を調べる。",
    "answer": "AWS料金ページ"
  },
  {
    "number": 147,
    "sectionNumber": 13,
    "sectionTitle": "料金・サポート・設計思想",
    "prompt": "AWSサポートプランのうち、本番利用の基本的な技術サポートやTrusted Advisorの一部チェックを利用できるプラン。開発用途よりも本番環境向け。",
    "answer": "Business Support"
  },
  {
    "number": 148,
    "sectionNumber": 13,
    "sectionTitle": "料金・サポート・設計思想",
    "prompt": "AWSサポートプランのうち、ミッションクリティカルな本番環境向けにTAMなどの支援を受けられる最上位クラスのプラン。",
    "answer": "Enterprise Support"
  },
  {
    "number": 149,
    "sectionNumber": 13,
    "sectionTitle": "料金・サポート・設計思想",
    "prompt": "AWS利用において、初期投資ではなく使った分だけ支払う料金体系。需要変動に合わせてリソースを増減でき、過剰なサーバー購入を避けられる。",
    "answer": "従量課金制"
  },
  {
    "number": 150,
    "sectionNumber": 13,
    "sectionTitle": "料金・サポート・設計思想",
    "prompt": "AWSがクラウド自体のセキュリティを担当し、利用者がクラウド内で構築する設定やデータ保護を担当するという責任分担の考え方。",
    "answer": "責任共有モデル"
  }
]);
