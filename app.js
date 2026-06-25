const categories = [
  { id: "compute", label: "コンピューティング", tone: "compute" },
  { id: "storage", label: "ストレージ", tone: "storage" },
  { id: "database", label: "データベース", tone: "database" },
  { id: "network", label: "ネットワーク", tone: "network" },
  { id: "security", label: "セキュリティ", tone: "security" },
  { id: "integration", label: "アプリ統合", tone: "ops" },
  { id: "ops", label: "運用・管理", tone: "ops" },
  { id: "cost", label: "コスト管理", tone: "ops" },
  { id: "migration", label: "移行", tone: "ops" },
  { id: "analytics", label: "分析", tone: "database" }
];

const confidenceLevels = [
  { value: 1, label: "自信なし", detail: "短時間で再確認", failHours: 1 / 6, correctHours: 0.5 },
  { value: 2, label: "迷った", detail: "早めに復習", failHours: 0.5, correctHours: 3 },
  { value: 3, label: "ほぼ理解", detail: "当日〜翌日", failHours: 2, correctHours: 12 },
  { value: 4, label: "説明できる", detail: "間隔を伸ばす", failHours: 6, correctHours: 24 }
];

const defaultTimerSettings = {
  focus: 25,
  short: 5,
  long: 15
};

const timerModes = {
  focus: { label: "集中", seconds: 25 * 60, status: "25分集中して、5分休憩します。" },
  short: { label: "短い休憩", seconds: 5 * 60, status: "5分休憩して、次の問題に戻ります。" },
  long: { label: "長い休憩", seconds: 15 * 60, status: "15分休憩して、まとまった復習に備えます。" }
};

const services = [
  {
    id: "ec2",
    name: "Amazon EC2",
    fullName: "Amazon Elastic Compute Cloud",
    category: "compute",
    summary: "AWS上で仮想サーバーを起動し、OS、サイズ、ネットワーク、ストレージを細かく選べるサービス。",
    chooseWhen: ["サーバー設定を自分で管理したい", "常時稼働するアプリやバッチ基盤が必要", "インスタンスタイプや購入オプションでコスト調整したい"],
    watchOut: "コードだけを実行したい場合はLambda、コンテナ単位で動かしたい場合はECS/EKSも候補になる。",
    tags: ["仮想サーバー", "Auto Scaling", "AMI"]
  },
  {
    id: "lambda",
    name: "AWS Lambda",
    fullName: "AWS Lambda",
    category: "compute",
    summary: "サーバーを管理せず、イベントに応じて関数コードを実行するサーバーレスコンピューティング。",
    chooseWhen: ["短時間の処理をイベント駆動で実行したい", "利用した分だけ課金される実行環境にしたい", "S3、API Gateway、EventBridgeなどをトリガーにしたい"],
    watchOut: "長時間処理やOSレベルの制御が必要ならEC2やコンテナの方が向く。",
    tags: ["サーバーレス", "イベント", "従量課金"]
  },
  {
    id: "ecs",
    name: "Amazon ECS",
    fullName: "Amazon Elastic Container Service",
    category: "compute",
    summary: "DockerコンテナをAWSネイティブに実行・管理するコンテナオーケストレーションサービス。",
    chooseWhen: ["Kubernetesを管理せずコンテナを運用したい", "Fargateでサーバー管理を減らしたい", "ALBやIAMと組み合わせたAWS標準構成にしたい"],
    watchOut: "Kubernetes APIや既存Kubernetes資産が前提ならEKSを選ぶ。",
    tags: ["コンテナ", "Fargate", "タスク"]
  },
  {
    id: "eks",
    name: "Amazon EKS",
    fullName: "Amazon Elastic Kubernetes Service",
    category: "compute",
    summary: "AWS上でKubernetesのコントロールプレーンをマネージドで利用するサービス。",
    chooseWhen: ["Kubernetes標準のワークロードをAWSで動かしたい", "既存のKubernetesツールやマニフェストを活用したい", "複数環境で移植性を重視したい"],
    watchOut: "Kubernetesを使う必然性が薄い場合、ECSの方が運用は軽い。",
    tags: ["Kubernetes", "コンテナ", "マネージド"]
  },
  {
    id: "s3",
    name: "Amazon S3",
    fullName: "Amazon Simple Storage Service",
    category: "storage",
    summary: "高耐久なオブジェクトストレージ。画像、ログ、バックアップ、データレイクなどのファイル保管に使う。",
    chooseWhen: ["容量を気にせずオブジェクトを保存したい", "静的Webコンテンツやログを保管したい", "ライフサイクルで低コスト階層へ移したい"],
    watchOut: "EC2にアタッチするブロックストレージはEBS、複数EC2で共有するファイルシステムはEFS。",
    tags: ["オブジェクト", "高耐久", "ライフサイクル"]
  },
  {
    id: "ebs",
    name: "Amazon EBS",
    fullName: "Amazon Elastic Block Store",
    category: "storage",
    summary: "EC2インスタンスにアタッチして使う永続的なブロックストレージ。",
    chooseWhen: ["EC2のOSディスクやデータディスクが必要", "低レイテンシなブロックI/Oが必要", "スナップショットでバックアップしたい"],
    watchOut: "リージョン全体から直接アクセスするファイル置き場ではなく、基本は1つのAZ内のEC2向け。",
    tags: ["ブロック", "EC2", "スナップショット"]
  },
  {
    id: "efs",
    name: "Amazon EFS",
    fullName: "Amazon Elastic File System",
    category: "storage",
    summary: "複数のLinux系EC2やコンテナから同時にマウントできるマネージドNFSファイルシステム。",
    chooseWhen: ["複数サーバーで同じファイルを共有したい", "容量を自動で伸縮させたい", "Linuxアプリの共有ディレクトリが必要"],
    watchOut: "単一EC2のディスクならEBS、オブジェクト保存ならS3を選ぶ。",
    tags: ["共有ファイル", "NFS", "伸縮"]
  },
  {
    id: "rds",
    name: "Amazon RDS",
    fullName: "Amazon Relational Database Service",
    category: "database",
    summary: "MySQL、PostgreSQL、MariaDB、Oracle、SQL Serverなどをマネージドで運用するリレーショナルDB。",
    chooseWhen: ["SQLとトランザクションが必要", "バックアップ、パッチ、Multi-AZを任せたい", "既存RDBMSとの互換性を重視したい"],
    watchOut: "キーバリューで超低レイテンシを狙うならDynamoDB、分析用の列指向DWHならRedshift。",
    tags: ["SQL", "Multi-AZ", "バックアップ"]
  },
  {
    id: "aurora",
    name: "Amazon Aurora",
    fullName: "Amazon Aurora",
    category: "database",
    summary: "MySQL/PostgreSQL互換のAWSクラウド向けリレーショナルDB。高可用性とスケールを重視する。",
    chooseWhen: ["RDS互換で高い性能と可用性が欲しい", "リードレプリカを増やして読み取りを拡張したい", "クラウドネイティブなDB構成にしたい"],
    watchOut: "標準エンジン互換やライセンス要件が強い場合はRDSの各エンジンを比較する。",
    tags: ["MySQL互換", "PostgreSQL互換", "高可用性"]
  },
  {
    id: "dynamodb",
    name: "Amazon DynamoDB",
    fullName: "Amazon DynamoDB",
    category: "database",
    summary: "フルマネージドのNoSQLキーバリュー/ドキュメントDB。大規模トラフィックと低レイテンシに強い。",
    chooseWhen: ["アクセスパターンが明確なNoSQLが必要", "サーバー管理なしで水平スケールしたい", "ミリ秒単位の応答を狙いたい"],
    watchOut: "複雑なJOINや柔軟なSQL分析が中心ならRDSやAthenaを検討する。",
    tags: ["NoSQL", "キーバリュー", "低レイテンシ"]
  },
  {
    id: "elasticache",
    name: "Amazon ElastiCache",
    fullName: "Amazon ElastiCache",
    category: "database",
    summary: "RedisまたはMemcached互換のインメモリキャッシュをマネージドで提供する。",
    chooseWhen: ["DBの読み取り負荷を下げたい", "セッションやランキングを高速に扱いたい", "ミリ秒未満級のキャッシュ応答が必要"],
    watchOut: "永続的な主データベースではなく、主にキャッシュや一時データ向け。",
    tags: ["Redis", "Memcached", "キャッシュ"]
  },
  {
    id: "vpc",
    name: "Amazon VPC",
    fullName: "Amazon Virtual Private Cloud",
    category: "network",
    summary: "AWS上に論理的に隔離されたネットワークを作り、サブネット、ルート、ゲートウェイを設計する基盤。",
    chooseWhen: ["パブリック/プライベートサブネットを分けたい", "IPアドレス範囲やルートを制御したい", "セキュリティグループやNACLで通信を絞りたい"],
    watchOut: "VPCはネットワークの器。DNS名管理はRoute 53、専用線接続はDirect Connect。",
    tags: ["サブネット", "ルート", "セキュリティグループ"]
  },
  {
    id: "route53",
    name: "Amazon Route 53",
    fullName: "Amazon Route 53",
    category: "network",
    summary: "DNS、ドメイン登録、ヘルスチェック、ルーティングポリシーを扱う高可用なDNSサービス。",
    chooseWhen: ["ドメイン名をAWSリソースへ向けたい", "地理、レイテンシ、重み付けでDNSルーティングしたい", "ヘルスチェックで障害時の切替をしたい"],
    watchOut: "コンテンツ配信の高速化はCloudFront、VPC内の通信制御はVPC関連機能。",
    tags: ["DNS", "ルーティング", "ヘルスチェック"]
  },
  {
    id: "cloudfront",
    name: "Amazon CloudFront",
    fullName: "Amazon CloudFront",
    category: "network",
    summary: "エッジロケーションからコンテンツを配信するCDN。静的/動的コンテンツの低レイテンシ配信に使う。",
    chooseWhen: ["世界中の利用者へ低遅延で配信したい", "S3やALBをオリジンにしてキャッシュしたい", "TLSやWAFと組み合わせたい"],
    watchOut: "DNS名の権威管理はRoute 53、アプリの負荷分散はElastic Load Balancing。",
    tags: ["CDN", "エッジ", "キャッシュ"]
  },
  {
    id: "directconnect",
    name: "AWS Direct Connect",
    fullName: "AWS Direct Connect",
    category: "network",
    summary: "オンプレミスとAWSを専用線で接続し、安定した帯域と一貫したネットワーク性能を得る。",
    chooseWhen: ["インターネットVPNより安定した接続が必要", "大容量データ転送の予測可能性が重要", "ハイブリッド構成で専用線を使いたい"],
    watchOut: "暗号化されたインターネット経由の接続ならSite-to-Site VPNも候補。",
    tags: ["専用線", "ハイブリッド", "帯域"]
  },
  {
    id: "iam",
    name: "AWS IAM",
    fullName: "AWS Identity and Access Management",
    category: "security",
    summary: "ユーザー、ロール、ポリシーでAWSリソースへの認証・認可を管理する中核サービス。",
    chooseWhen: ["最小権限を設計したい", "EC2やLambdaにロールで権限を渡したい", "誰が何にアクセスできるか制御したい"],
    watchOut: "複数アカウントの統制はOrganizations、鍵管理はKMS、監査ログはCloudTrail。",
    tags: ["認可", "ロール", "最小権限"]
  },
  {
    id: "organizations",
    name: "AWS Organizations",
    fullName: "AWS Organizations",
    category: "security",
    summary: "複数AWSアカウントを一元管理し、組織単位、請求、サービスコントロールポリシーを扱う。",
    chooseWhen: ["本番、開発、監査など複数アカウントを分けたい", "組織全体にガードレールを適用したい", "一括請求を使いたい"],
    watchOut: "アカウント内の細かい権限付与はIAM、脅威検出はGuardDuty。",
    tags: ["マルチアカウント", "SCP", "一括請求"]
  },
  {
    id: "kms",
    name: "AWS KMS",
    fullName: "AWS Key Management Service",
    category: "security",
    summary: "暗号化キーを作成・管理し、S3、EBS、RDSなど多くのAWSサービスと統合する。",
    chooseWhen: ["データ暗号化の鍵を集中管理したい", "キーの使用権限やローテーションを制御したい", "監査可能な暗号化基盤が必要"],
    watchOut: "パスワードやAPIキーの保管はSecrets Manager、証明書はACMやPrivate CAを検討する。",
    tags: ["暗号化", "キー", "監査"]
  },
  {
    id: "secretsmanager",
    name: "AWS Secrets Manager",
    fullName: "AWS Secrets Manager",
    category: "security",
    summary: "DBパスワード、APIキーなどの秘密情報を保管し、必要に応じてローテーションする。",
    chooseWhen: ["アプリから秘密情報を安全に取得したい", "DB認証情報を自動ローテーションしたい", "コードや環境変数に平文を置きたくない"],
    watchOut: "暗号化キーそのものの管理はKMS、設定値の保管はSystems Manager Parameter Storeも比較対象。",
    tags: ["秘密情報", "ローテーション", "認証情報"]
  },
  {
    id: "waf",
    name: "AWS WAF",
    fullName: "AWS Web Application Firewall",
    category: "security",
    summary: "Webアプリへの一般的な攻撃をルールで検査し、CloudFront、ALB、API Gatewayなどに適用できる。",
    chooseWhen: ["SQLインジェクションやXSSをブロックしたい", "IP、国、ヘッダーなどでWebリクエストを制御したい", "L7のWeb防御が必要"],
    watchOut: "DDoS緩和はShield、脅威検出はGuardDuty、ネットワーク境界の通信制御はSecurity Group/NACL。",
    tags: ["Web防御", "L7", "ルール"]
  },
  {
    id: "guardduty",
    name: "Amazon GuardDuty",
    fullName: "Amazon GuardDuty",
    category: "security",
    summary: "ログやイベントを分析して、不審なAPI操作、侵害の兆候、異常通信を検出する脅威検出サービス。",
    chooseWhen: ["脅威検出をマネージドで有効化したい", "複数アカウントの検出結果を集約したい", "CloudTrailやVPCフロー由来の異常を見つけたい"],
    watchOut: "設定準拠の評価はConfig、ログ記録そのものはCloudTrailやCloudWatch Logs。",
    tags: ["脅威検出", "異常", "セキュリティ運用"]
  },
  {
    id: "sqs",
    name: "Amazon SQS",
    fullName: "Amazon Simple Queue Service",
    category: "integration",
    summary: "メッセージキューでシステム間を疎結合にし、受信側が自分のペースで処理できるようにする。",
    chooseWhen: ["処理の山をキューにためて平準化したい", "送信側と処理側を切り離したい", "失敗時にリトライしやすくしたい"],
    watchOut: "複数購読者へ同報通知するならSNS、イベントルーティングならEventBridge。",
    tags: ["キュー", "疎結合", "非同期"]
  },
  {
    id: "sns",
    name: "Amazon SNS",
    fullName: "Amazon Simple Notification Service",
    category: "integration",
    summary: "トピックに発行したメッセージを複数の購読者へ配信するPub/Sub通知サービス。",
    chooseWhen: ["メール、SMS、HTTP、SQSなどへ同報したい", "1つのイベントを複数システムに広げたい", "ファンアウト構成を作りたい"],
    watchOut: "メッセージを処理待ちとして保持する主役はSQS。SNSは通知と配信が中心。",
    tags: ["Pub/Sub", "通知", "ファンアウト"]
  },
  {
    id: "eventbridge",
    name: "Amazon EventBridge",
    fullName: "Amazon EventBridge",
    category: "integration",
    summary: "イベントバスとルールで、AWSサービス、SaaS、独自アプリのイベントをルーティングする。",
    chooseWhen: ["イベント駆動アーキテクチャを組みたい", "イベント内容でターゲットを振り分けたい", "スケジュール実行やSaaS連携を使いたい"],
    watchOut: "単純なキューイングはSQS、同報通知はSNS、ワークフロー制御はStep Functions。",
    tags: ["イベントバス", "ルール", "SaaS連携"]
  },
  {
    id: "stepfunctions",
    name: "AWS Step Functions",
    fullName: "AWS Step Functions",
    category: "integration",
    summary: "複数の処理を状態遷移でつなぎ、分岐、待機、リトライを含むワークフローを作る。",
    chooseWhen: ["LambdaやECSタスクを順序立てて実行したい", "失敗時のリトライや分岐を明示したい", "業務処理の進行状態を可視化したい"],
    watchOut: "単発イベントの配送はEventBridge、メッセージ蓄積はSQS。",
    tags: ["ワークフロー", "状態管理", "リトライ"]
  },
  {
    id: "cloudtrail",
    name: "AWS CloudTrail",
    fullName: "AWS CloudTrail",
    category: "ops",
    summary: "AWSアカウント内のAPI呼び出しや管理イベントを記録し、監査や調査に使う。",
    chooseWhen: ["誰がいつ何を変更したか追跡したい", "セキュリティ監査の証跡が必要", "不審な操作を後から調査したい"],
    watchOut: "メトリクスやアラームはCloudWatch、設定準拠の履歴はConfig。",
    tags: ["監査", "APIログ", "証跡"]
  },
  {
    id: "cloudwatch",
    name: "Amazon CloudWatch",
    fullName: "Amazon CloudWatch",
    category: "ops",
    summary: "メトリクス、ログ、アラーム、ダッシュボードでAWSリソースやアプリを監視する。",
    chooseWhen: ["CPU使用率やエラー数でアラームを出したい", "ログを集約して検索したい", "運用ダッシュボードを作りたい"],
    watchOut: "API監査はCloudTrail、構成変更と準拠評価はConfig。",
    tags: ["監視", "ログ", "アラーム"]
  },
  {
    id: "config",
    name: "AWS Config",
    fullName: "AWS Config",
    category: "ops",
    summary: "AWSリソースの構成履歴を記録し、ルールに基づいて準拠状態を評価する。",
    chooseWhen: ["設定変更の履歴を追いたい", "暗号化必須などのルール違反を検出したい", "コンプライアンス評価が必要"],
    watchOut: "誰が操作したかはCloudTrail、稼働メトリクス監視はCloudWatch。",
    tags: ["構成管理", "準拠", "履歴"]
  },
  {
    id: "cloudformation",
    name: "AWS CloudFormation",
    fullName: "AWS CloudFormation",
    category: "ops",
    summary: "テンプレートでAWSリソースを定義し、インフラをコードとして作成・更新する。",
    chooseWhen: ["同じ構成を再現可能に作りたい", "変更をテンプレート管理したい", "複数リソースをまとめてデプロイしたい"],
    watchOut: "プログラミング言語で抽象化したい場合はAWS CDKも候補になる。",
    tags: ["IaC", "テンプレート", "スタック"]
  },
  {
    id: "systemsmanager",
    name: "AWS Systems Manager",
    fullName: "AWS Systems Manager",
    category: "ops",
    summary: "EC2やオンプレミスサーバーの運用、パッチ、コマンド実行、パラメータ管理などをまとめる。",
    chooseWhen: ["サーバーへ安全にコマンド実行したい", "パッチ適用や運用タスクを自動化したい", "Parameter Storeで設定値を管理したい"],
    watchOut: "監視メトリクスはCloudWatch、構成準拠の評価はConfigと役割が異なる。",
    tags: ["運用", "パッチ", "Parameter Store"]
  },
  {
    id: "athena",
    name: "Amazon Athena",
    fullName: "Amazon Athena",
    category: "analytics",
    summary: "S3上のデータに対して、サーバー管理なしでSQLクエリを実行する分析サービス。",
    chooseWhen: ["ログやCSV/ParquetをS3に置いたまま分析したい", "分析基盤をすぐ使いたい", "クエリ実行量に応じた課金にしたい"],
    watchOut: "継続的なDWHや複雑な分析ワークロードはRedshiftを検討する。",
    tags: ["SQL", "S3分析", "サーバーレス"]
  },
  {
    id: "redshift",
    name: "Amazon Redshift",
    fullName: "Amazon Redshift",
    category: "analytics",
    summary: "大量データを列指向で高速分析するクラウドデータウェアハウス。",
    chooseWhen: ["BIや集計用のDWHが必要", "大量データに対する複雑な分析クエリが多い", "データマートを運用したい"],
    watchOut: "S3上のデータをその場で少量分析するだけならAthenaが軽い。",
    tags: ["DWH", "BI", "列指向"]
  },
  {
    id: "apigateway",
    name: "Amazon API Gateway",
    fullName: "Amazon API Gateway",
    category: "network",
    summary: "REST、HTTP、WebSocket APIを作成・公開し、認証、スロットリング、Lambda連携を扱う。",
    chooseWhen: ["LambdaやバックエンドをAPIとして公開したい", "APIキーやレート制限を使いたい", "サーバーレスAPIを構築したい"],
    watchOut: "Webコンテンツ配信のCDNはCloudFront、DNSはRoute 53。",
    tags: ["API", "サーバーレス", "スロットリング"]
  },
  {
    id: "dms",
    name: "AWS DMS",
    fullName: "AWS Database Migration Service",
    category: "database",
    summary: "データベースをAWSへ移行したり、異種DB間で継続的にデータをレプリケーションする。",
    chooseWhen: ["オンプレミスDBをRDS/Auroraへ移したい", "移行中の停止時間を短くしたい", "同種または異種DB間でデータを移したい"],
    watchOut: "スキーマ変換が必要な場合はAWS SCTと組み合わせる。",
    tags: ["移行", "レプリケーション", "DB"]
  },
  {
    id: "elb",
    name: "Elastic Load Balancing",
    fullName: "Elastic Load Balancing",
    category: "network",
    summary: "複数のターゲットへトラフィックを分散し、アプリケーションの可用性とスケールを高める。",
    chooseWhen: ["複数AZのEC2やコンテナへ負荷分散したい", "ヘルスチェックで異常なターゲットを外したい", "ALB/NLBでL7またはL4の分散をしたい"],
    watchOut: "グローバルなコンテンツ配信はCloudFront、DNSルーティングはRoute 53。",
    tags: ["負荷分散", "ヘルスチェック", "高可用性"]
  },
  {
    id: "autoscaling",
    name: "AWS Auto Scaling",
    fullName: "AWS Auto Scaling",
    category: "ops",
    summary: "需要に応じてリソース数や容量を自動調整し、性能とコストのバランスを取る。",
    chooseWhen: ["負荷に合わせてEC2台数を増減したい", "需要変動に応じて容量を保ちたい", "過剰な常時稼働コストを避けたい"],
    watchOut: "トラフィック分散はElastic Load Balancing、監視とアラームはCloudWatch。",
    tags: ["自動拡張", "需要変動", "コスト最適化"]
  },
  {
    id: "costexplorer",
    name: "AWS Cost Explorer",
    fullName: "AWS Cost Explorer",
    category: "cost",
    summary: "AWSコストと使用量を可視化し、期間、サービス、アカウントなどで分析する。",
    chooseWhen: ["過去の利用料金の傾向を見たい", "サービス別やアカウント別のコストを分析したい", "コスト予測を確認したい"],
    watchOut: "予算超過の通知はAWS Budgets、詳細な明細データの出力はCost and Usage Reports。",
    tags: ["コスト分析", "予測", "可視化"]
  },
  {
    id: "budgets",
    name: "AWS Budgets",
    fullName: "AWS Budgets",
    category: "cost",
    summary: "コスト、使用量、RI/Savings Plansの利用状況に対して予算とアラートを設定する。",
    chooseWhen: ["月額費用がしきい値を超えそうな時に通知したい", "利用量ベースの予算を設定したい", "コスト管理の早期警告が必要"],
    watchOut: "費用の詳細分析はCost Explorer、最適化推奨はTrusted AdvisorやCompute Optimizer。",
    tags: ["予算", "アラート", "コスト管理"]
  },
  {
    id: "trustedadvisor",
    name: "AWS Trusted Advisor",
    fullName: "AWS Trusted Advisor",
    category: "ops",
    summary: "コスト最適化、セキュリティ、耐障害性、パフォーマンス、サービス制限に関する推奨を提供する。",
    chooseWhen: ["AWS環境のベストプラクティス確認をしたい", "未使用リソースや制限到達リスクを見つけたい", "運用改善の推奨を確認したい"],
    watchOut: "リソース構成の準拠評価はConfig、脅威検出はGuardDuty。",
    tags: ["推奨", "ベストプラクティス", "最適化"]
  },
  {
    id: "fargate",
    name: "AWS Fargate",
    fullName: "AWS Fargate",
    category: "compute",
    summary: "ECSやEKSのコンテナを、EC2インスタンスを管理せずに実行するサーバーレスコンピューティング。",
    chooseWhen: ["コンテナは使いたいがサーバー管理を避けたい", "タスク単位でリソースを指定したい", "ECS/EKSの実行基盤を簡素化したい"],
    watchOut: "コンテナの管理面はECS/EKS、短い関数実行はLambda。",
    tags: ["コンテナ", "サーバーレス", "ECS/EKS"]
  },
  {
    id: "transitgateway",
    name: "AWS Transit Gateway",
    fullName: "AWS Transit Gateway",
    category: "network",
    summary: "複数VPCやオンプレミス接続を集約するハブとして、ネットワーク接続を一元化する。",
    chooseWhen: ["多数のVPC間接続を簡素化したい", "オンプレミス接続を中央集約したい", "メッシュ状のピアリング管理を避けたい"],
    watchOut: "少数のVPC同士の単純接続ならVPCピアリング、専用線はDirect Connect。",
    tags: ["ハブ", "VPC接続", "ハイブリッド"]
  },
  {
    id: "vpn",
    name: "AWS Site-to-Site VPN",
    fullName: "AWS Site-to-Site VPN",
    category: "network",
    summary: "オンプレミスネットワークとAWS VPCを、インターネット経由の暗号化VPNで接続する。",
    chooseWhen: ["専用線なしでオンプレミスとAWSを接続したい", "暗号化されたハイブリッド接続が必要", "Direct Connectの補助回線にしたい"],
    watchOut: "専用線の安定帯域が必要ならDirect Connect、多数接続の集約はTransit Gateway。",
    tags: ["VPN", "暗号化", "ハイブリッド"]
  },
  {
    id: "acm",
    name: "AWS Certificate Manager",
    fullName: "AWS Certificate Manager",
    category: "security",
    summary: "TLS/SSL証明書をプロビジョニング、管理、更新し、CloudFrontやロードバランサーと統合する。",
    chooseWhen: ["HTTPS用の証明書を管理したい", "証明書更新の運用負荷を減らしたい", "ALBやCloudFrontに証明書を設定したい"],
    watchOut: "暗号化キー管理はKMS、プライベート認証局はAWS Private CA。",
    tags: ["証明書", "TLS", "HTTPS"]
  },
  {
    id: "shield",
    name: "AWS Shield",
    fullName: "AWS Shield",
    category: "security",
    summary: "AWS上のアプリケーションをDDoS攻撃から保護するマネージド保護サービス。",
    chooseWhen: ["DDoSへの基本保護または高度な保護が必要", "CloudFrontやRoute 53などをDDoSから守りたい", "大規模攻撃への耐性を高めたい"],
    watchOut: "Webリクエストのルール制御はAWS WAF、脅威検出はGuardDuty。",
    tags: ["DDoS", "保護", "エッジ"]
  },
  {
    id: "cognito",
    name: "Amazon Cognito",
    fullName: "Amazon Cognito",
    category: "security",
    summary: "Webアプリやモバイルアプリにユーザー登録、サインイン、認証連携を追加する。",
    chooseWhen: ["アプリ利用者のサインアップ/サインインを実装したい", "SNSや外部IDプロバイダーと連携したい", "ユーザープールで認証基盤を用意したい"],
    watchOut: "AWSリソースへの権限管理はIAM、組織ユーザーのSSOはIAM Identity Center。",
    tags: ["認証", "ユーザー管理", "ID連携"]
  },
  {
    id: "backup",
    name: "AWS Backup",
    fullName: "AWS Backup",
    category: "storage",
    summary: "EBS、RDS、EFSなど複数AWSサービスのバックアップを一元的に管理する。",
    chooseWhen: ["複数サービスのバックアップポリシーをまとめたい", "バックアップの保持期間を統制したい", "復旧ポイントを集中管理したい"],
    watchOut: "S3単体のオブジェクト世代管理はバージョニングやライフサイクルも検討する。",
    tags: ["バックアップ", "復旧", "ポリシー"]
  },
  {
    id: "storagegateway",
    name: "AWS Storage Gateway",
    fullName: "AWS Storage Gateway",
    category: "storage",
    summary: "オンプレミス環境からAWSクラウドストレージへ接続するハイブリッドストレージサービス。",
    chooseWhen: ["オンプレミスアプリからS3などを使いたい", "ファイル/ボリューム/テープ型のゲートウェイが必要", "段階的にクラウドストレージへ移行したい"],
    watchOut: "データ転送ジョブの移行はDataSync、専用線接続はDirect Connect。",
    tags: ["ハイブリッド", "ゲートウェイ", "ストレージ"]
  },
  {
    id: "fsx",
    name: "Amazon FSx",
    fullName: "Amazon FSx",
    category: "storage",
    summary: "Windows File Server、Lustre、NetApp ONTAP、OpenZFSなどのマネージドファイルシステムを提供する。",
    chooseWhen: ["Windows SMBファイル共有が必要", "高性能ファイルシステムをマネージドで使いたい", "既存アプリのファイルプロトコル互換性が重要"],
    watchOut: "Linux NFSのシンプルな共有はEFS、オブジェクト保管はS3。",
    tags: ["ファイル共有", "SMB", "マネージド"]
  },
  {
    id: "ram",
    name: "AWS RAM",
    fullName: "AWS Resource Access Manager",
    category: "security",
    summary: "AWSアカウント間やOrganizations内で、対応リソースを安全に共有する。",
    chooseWhen: ["サブネットなどを別アカウントと共有したい", "リソースを複製せず共同利用したい", "Organizations内で共有管理をしたい"],
    watchOut: "アカウント作成やSCP管理はOrganizations、アクセス権限はIAM。",
    tags: ["リソース共有", "マルチアカウント", "Organizations"]
  },
  {
    id: "privatelink",
    name: "AWS PrivateLink",
    fullName: "AWS PrivateLink",
    category: "network",
    summary: "VPCからAWSサービスや対応サービスへ、パブリックIPを使わずプライベート接続する。",
    chooseWhen: ["インターネットを経由せずサービスに接続したい", "VPCエンドポイントで閉域アクセスしたい", "サービス提供側と利用側を疎結合に接続したい"],
    watchOut: "VPC同士の大規模接続集約はTransit Gateway、専用線はDirect Connect。",
    tags: ["プライベート接続", "VPCエンドポイント", "閉域"]
  },
  {
    id: "controltower",
    name: "AWS Control Tower",
    fullName: "AWS Control Tower",
    category: "ops",
    summary: "複数アカウント環境のランディングゾーンをセットアップし、ガードレールを適用する。",
    chooseWhen: ["マルチアカウント環境を標準化して始めたい", "予防的/発見的ガードレールを使いたい", "Organizationsを前提に統制を強めたい"],
    watchOut: "アカウント階層やSCPの基盤はOrganizations、個別権限はIAM。",
    tags: ["ランディングゾーン", "ガードレール", "統制"]
  },
  {
    id: "health",
    name: "AWS Health Dashboard",
    fullName: "AWS Health Dashboard",
    category: "ops",
    summary: "AWSサービスイベントや、自分のアカウントに影響する運用イベントを確認する。",
    chooseWhen: ["AWS側イベントの影響を確認したい", "アカウント固有のメンテナンス通知を見たい", "サービス障害や予定変更を把握したい"],
    watchOut: "メトリクス監視やアラームはCloudWatch、API操作の監査はCloudTrail。",
    tags: ["サービス状態", "イベント", "運用通知"]
  },
  {
    id: "lightsail",
    name: "Amazon Lightsail",
    fullName: "Amazon Lightsail",
    category: "compute",
    summary: "簡単なWebサイトや小規模アプリ向けに、仮想サーバーや固定料金の構成を簡単に提供する。",
    chooseWhen: ["小規模Webサイトを素早く始めたい", "固定月額に近いシンプルな料金を重視したい", "EC2の細かい設計を避けたい"],
    watchOut: "細かなネットワークやスケール設計が必要ならEC2やELBを使う。",
    tags: ["小規模", "簡単", "固定料金"]
  },
  {
    id: "datasync",
    name: "AWS DataSync",
    fullName: "AWS DataSync",
    category: "migration",
    summary: "オンプレミスストレージとAWSストレージサービス間などで、データ転送を自動化・高速化する。",
    chooseWhen: ["オンプレミスのファイルをS3やEFSへ移行したい", "定期的なデータ同期が必要", "転送タスクを管理して移行したい"],
    watchOut: "アプリから継続利用するハイブリッドストレージはStorage Gateway、DB移行はDMS。",
    tags: ["データ転送", "移行", "同期"]
  }
];

const questionBank = [
  {
    id: "q1",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "ストレージと配信",
    level: "Foundation",
    prompt: "世界中の利用者に画像とJavaScriptを低遅延で配信したい。オリジンは静的ファイルで、運用負荷はできるだけ下げたい。最も適切な組み合わせはどれか。",
    options: ["Amazon S3 と Amazon CloudFront", "Amazon EBS と AWS Direct Connect", "Amazon RDS と AWS WAF", "Amazon EFS と Amazon Route 53"],
    answer: 0,
    explanation: "静的ファイルの保管はS3、世界中への低遅延配信はCloudFrontが定番です。Route 53はDNSであり、コンテンツのキャッシュ配信そのものは行いません。",
    services: ["s3", "cloudfront", "route53"]
  },
  {
    id: "q2",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "データベース",
    level: "Foundation",
    prompt: "SQL、トランザクション、Multi-AZによる高可用性が必要な業務アプリを、パッチやバックアップの運用負荷を抑えて構築したい。選ぶべきサービスはどれか。",
    options: ["Amazon DynamoDB", "Amazon RDS", "Amazon S3", "Amazon ElastiCache"],
    answer: 1,
    explanation: "リレーショナルDBをマネージドで使い、バックアップやMulti-AZを利用したい場合はRDSが中心です。DynamoDBはNoSQL、ElastiCacheはキャッシュです。",
    services: ["rds", "dynamodb", "elasticache"]
  },
  {
    id: "q3",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "アプリ統合",
    level: "Associate",
    prompt: "注文受付システムと在庫処理システムを疎結合にしたい。処理側が一時的に遅くなっても注文メッセージを保持し、順次処理できる構成にしたい。最も適切なサービスはどれか。",
    options: ["Amazon SNS", "Amazon SQS", "Amazon CloudFront", "AWS Config"],
    answer: 1,
    explanation: "処理待ちメッセージをキューに保持して非同期処理するならSQSです。SNSは複数購読者への通知やファンアウトに向きます。",
    services: ["sqs", "sns", "eventbridge"]
  },
  {
    id: "q4",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "サーバーレス",
    level: "Foundation",
    prompt: "S3にアップロードされた画像をきっかけに、短い変換処理を実行したい。サーバーのプロビジョニングやOS管理は避けたい。どれを使うべきか。",
    options: ["AWS Lambda", "Amazon EC2", "AWS Direct Connect", "Amazon Redshift"],
    answer: 0,
    explanation: "イベントに応じて短時間のコードを実行する用途はLambdaが適しています。EC2は自由度が高い一方でサーバー管理が必要です。",
    services: ["lambda", "ec2", "s3"]
  },
  {
    id: "q5",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "セキュリティ",
    level: "Foundation",
    prompt: "Lambda関数からS3バケットを読み取れるようにしたい。アクセスキーをコードに埋め込まず、最小権限で許可したい。中心になるサービスはどれか。",
    options: ["AWS IAM", "Amazon CloudWatch", "AWS WAF", "Amazon Route 53"],
    answer: 0,
    explanation: "AWSリソースへの権限付与はIAMロールとポリシーで行います。コード内の長期アクセスキーを避け、必要な権限だけをロールに付与します。",
    services: ["iam", "lambda", "s3"]
  },
  {
    id: "q6",
    tracks: ["solutions-architect"],
    domain: "ネットワーク",
    level: "Associate",
    prompt: "Webサーバーはインターネットから到達可能にし、データベースは直接公開しない構成にしたい。サブネットとルートを設計する基盤はどれか。",
    options: ["Amazon VPC", "Amazon CloudFront", "AWS KMS", "Amazon Athena"],
    answer: 0,
    explanation: "パブリック/プライベートサブネット、ルートテーブル、インターネットゲートウェイなどを設計する基盤はVPCです。",
    services: ["vpc", "cloudfront", "rds"]
  },
  {
    id: "q7",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "監査と監視",
    level: "Foundation",
    prompt: "誰がいつセキュリティグループを変更したかを後から調査したい。API操作の証跡として確認すべきサービスはどれか。",
    options: ["Amazon CloudWatch", "AWS CloudTrail", "AWS Config", "Amazon GuardDuty"],
    answer: 1,
    explanation: "AWS API呼び出しの記録はCloudTrailです。CloudWatchはメトリクスやログ監視、Configは構成履歴と準拠評価に強みがあります。",
    services: ["cloudtrail", "cloudwatch", "config", "guardduty"]
  },
  {
    id: "q8",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "監視",
    level: "Foundation",
    prompt: "EC2のCPU使用率が一定値を超えたら通知したい。メトリクスとアラームを使うサービスはどれか。",
    options: ["AWS CloudTrail", "Amazon CloudWatch", "AWS Organizations", "AWS DMS"],
    answer: 1,
    explanation: "メトリクス監視、アラーム、ログ集約はCloudWatchの役割です。CloudTrailはAPI監査ログです。",
    services: ["cloudwatch", "cloudtrail", "sns"]
  },
  {
    id: "q9",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "ストレージ",
    level: "Associate",
    prompt: "複数のLinux EC2インスタンスから同じファイルシステムを同時にマウントしたい。容量は利用量に応じて伸縮させたい。選ぶべきサービスはどれか。",
    options: ["Amazon EBS", "Amazon EFS", "Amazon S3 Glacier", "Amazon DynamoDB"],
    answer: 1,
    explanation: "複数のLinux系インスタンスから共有マウントするマネージドNFSはEFSです。EBSは基本的にEC2へアタッチするブロックストレージです。",
    services: ["efs", "ebs", "s3"]
  },
  {
    id: "q10",
    tracks: ["solutions-architect"],
    domain: "セキュリティ",
    level: "Associate",
    prompt: "Webアプリに対するSQLインジェクションやXSSなどのリクエストを、CloudFrontの前段でルールによりブロックしたい。利用するサービスはどれか。",
    options: ["AWS WAF", "AWS KMS", "Amazon GuardDuty", "AWS Secrets Manager"],
    answer: 0,
    explanation: "Webリクエストをルールで検査し、L7の攻撃をブロックするのはAWS WAFです。GuardDutyは脅威検出、KMSは鍵管理です。",
    services: ["waf", "cloudfront", "guardduty", "kms"]
  },
  {
    id: "q11",
    tracks: ["solutions-architect"],
    domain: "ハイブリッド",
    level: "Associate",
    prompt: "オンプレミスのデータセンターとAWSを安定した専用線で接続し、大容量データ転送の性能を予測しやすくしたい。どれを選ぶべきか。",
    options: ["AWS Direct Connect", "Amazon Route 53", "Amazon API Gateway", "Amazon SQS"],
    answer: 0,
    explanation: "専用線接続で安定した帯域を確保するのはDirect Connectです。Route 53はDNS、API GatewayはAPI公開のサービスです。",
    services: ["directconnect", "route53", "vpc"]
  },
  {
    id: "q12",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "アカウント管理",
    level: "Foundation",
    prompt: "本番、開発、監査のAWSアカウントを分け、組織全体にサービス利用制限のガードレールを適用したい。中心になるサービスはどれか。",
    options: ["AWS Organizations", "AWS IAM", "Amazon CloudWatch", "AWS Step Functions"],
    answer: 0,
    explanation: "複数アカウントの一元管理とSCPによるガードレールはOrganizationsです。各アカウント内の細かい権限はIAMで管理します。",
    services: ["organizations", "iam"]
  },
  {
    id: "q13",
    tracks: ["solutions-architect"],
    domain: "ワークフロー",
    level: "Associate",
    prompt: "画像検査、承認待ち、変換、通知という複数ステップを、失敗時のリトライや分岐も含めて管理したい。最も適切なサービスはどれか。",
    options: ["AWS Step Functions", "Amazon SQS", "Amazon SNS", "Amazon EBS"],
    answer: 0,
    explanation: "複数処理の順序、分岐、待機、リトライを状態遷移として管理するならStep Functionsが適しています。",
    services: ["stepfunctions", "lambda", "sqs", "sns"]
  },
  {
    id: "q14",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "暗号化",
    level: "Foundation",
    prompt: "S3やEBSで使う暗号化キーを集中管理し、キーの利用権限やローテーションを制御したい。利用するサービスはどれか。",
    options: ["AWS KMS", "AWS WAF", "Amazon Route 53", "Amazon ElastiCache"],
    answer: 0,
    explanation: "暗号化キーの作成、管理、権限制御はKMSです。秘密情報の値そのものを保管する用途ではSecrets Managerも候補になります。",
    services: ["kms", "secretsmanager", "s3", "ebs"]
  },
  {
    id: "q15",
    tracks: ["solutions-architect"],
    domain: "API",
    level: "Associate",
    prompt: "Lambda関数をHTTPS APIとして公開し、レート制限や認証を設定したい。最も近いサービスはどれか。",
    options: ["Amazon API Gateway", "Amazon CloudFront", "Amazon EFS", "AWS DMS"],
    answer: 0,
    explanation: "LambdaなどのバックエンドをAPIとして公開し、スロットリングや認証を扱うのはAPI Gatewayです。",
    services: ["apigateway", "lambda", "cloudfront"]
  },
  {
    id: "q16",
    tracks: ["solutions-architect"],
    domain: "分析",
    level: "Associate",
    prompt: "S3に保存されたログファイルを、サーバーを準備せずSQLで必要な時だけ分析したい。選ぶべきサービスはどれか。",
    options: ["Amazon Athena", "Amazon Redshift", "Amazon RDS", "Amazon ElastiCache"],
    answer: 0,
    explanation: "S3上のデータをそのままSQLで分析するサーバーレスサービスはAthenaです。継続的なDWHにはRedshiftを検討します。",
    services: ["athena", "redshift", "s3"]
  },
  {
    id: "q17",
    tracks: ["solutions-architect"],
    domain: "移行",
    level: "Associate",
    prompt: "オンプレミスのデータベースをAWSへ移行し、移行中の停止時間を短くするため継続的なレプリケーションも使いたい。どれが適切か。",
    options: ["AWS DMS", "AWS Config", "Amazon GuardDuty", "AWS CloudFormation"],
    answer: 0,
    explanation: "データベース移行と継続的なレプリケーションにはDMSを使います。スキーマ変換が必要な場合はAWS SCTも組み合わせます。",
    services: ["dms", "rds", "aurora"]
  },
  {
    id: "q18",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "Infrastructure as Code",
    level: "Foundation",
    prompt: "VPC、サブネット、EC2、セキュリティグループをテンプレートで定義し、同じ構成を何度も再現したい。使うべきサービスはどれか。",
    options: ["AWS CloudFormation", "Amazon CloudWatch", "Amazon Route 53", "AWS Secrets Manager"],
    answer: 0,
    explanation: "インフラをテンプレートとして定義し、スタック単位で作成・更新するのはCloudFormationです。",
    services: ["cloudformation", "vpc", "ec2"]
  },
  {
    id: "q19",
    tracks: ["solutions-architect"],
    domain: "コンテナ",
    level: "Associate",
    prompt: "Kubernetesの既存マニフェストや周辺ツールを活かして、AWS上でコントロールプレーン管理を減らしたい。最も適切なサービスはどれか。",
    options: ["Amazon ECS", "Amazon EKS", "AWS Lambda", "Amazon EFS"],
    answer: 1,
    explanation: "Kubernetes前提のワークロードはEKSが適しています。Kubernetesが不要ならECSの方がシンプルな選択になりやすいです。",
    services: ["eks", "ecs", "lambda"]
  },
  {
    id: "q20",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "セキュリティ運用",
    level: "Foundation",
    prompt: "AWSアカウントで不審なAPI操作や異常な通信などの脅威をマネージドに検出したい。利用するサービスはどれか。",
    options: ["Amazon GuardDuty", "AWS Config", "Amazon CloudWatch", "AWS KMS"],
    answer: 0,
    explanation: "脅威検出にはGuardDutyを使います。Configは構成準拠、CloudWatchは監視、KMSは鍵管理です。",
    services: ["guardduty", "config", "cloudwatch", "kms"]
  },
  {
    id: "q21",
    tracks: ["solutions-architect"],
    domain: "高可用性",
    level: "Associate",
    prompt: "複数のアベイラビリティーゾーンに配置したEC2インスタンスへHTTPリクエストを分散し、異常なインスタンスには送信しないようにしたい。最も適切なサービスはどれか。",
    options: ["Elastic Load Balancing", "Amazon Route 53", "AWS Direct Connect", "AWS CloudFormation"],
    answer: 0,
    explanation: "複数ターゲットへの負荷分散とヘルスチェックによる振り分けにはElastic Load Balancingを使います。Route 53はDNSルーティング、Direct Connectは専用線です。",
    services: ["elb", "ec2", "route53"]
  },
  {
    id: "q22",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "スケーリング",
    level: "Foundation",
    prompt: "需要の増減に合わせてEC2インスタンス数を自動で増減し、性能を保ちつつ過剰な常時稼働コストを避けたい。中心になるサービスはどれか。",
    options: ["AWS Auto Scaling", "AWS Backup", "AWS CloudTrail", "Amazon Athena"],
    answer: 0,
    explanation: "需要に応じたリソースの自動拡張・縮小にはAWS Auto Scalingを使います。CloudTrailは監査、Backupはバックアップ、AthenaはS3上のデータ分析です。",
    services: ["autoscaling", "ec2", "cloudwatch"]
  },
  {
    id: "q23",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "コスト管理",
    level: "Foundation",
    prompt: "過去数か月のAWS利用料金をサービス別・アカウント別に可視化し、今後のコスト傾向も確認したい。どれを使うべきか。",
    options: ["AWS Cost Explorer", "AWS Budgets", "AWS Trusted Advisor", "AWS CloudTrail"],
    answer: 0,
    explanation: "コストと使用量の分析・可視化にはCost Explorerを使います。Budgetsは予算と通知、Trusted Advisorは推奨、CloudTrailはAPI操作履歴です。",
    services: ["costexplorer", "budgets", "trustedadvisor", "cloudtrail"]
  },
  {
    id: "q24",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "コスト管理",
    level: "Foundation",
    prompt: "月間AWS利用料金が設定した金額に近づいたら通知を受けたい。最も適切なサービスはどれか。",
    options: ["AWS Budgets", "Amazon CloudWatch", "AWS Cost Explorer", "AWS Organizations"],
    answer: 0,
    explanation: "予算しきい値に対する通知にはAWS Budgetsを使います。Cost Explorerは分析、CloudWatchはリソース監視、Organizationsは複数アカウント管理です。",
    services: ["budgets", "costexplorer", "cloudwatch", "organizations"]
  },
  {
    id: "q25",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "運用改善",
    level: "Foundation",
    prompt: "AWS環境について、コスト最適化、セキュリティ、耐障害性、パフォーマンス、サービス制限の観点から推奨事項を確認したい。利用するサービスはどれか。",
    options: ["AWS Trusted Advisor", "AWS Config", "Amazon GuardDuty", "AWS KMS"],
    answer: 0,
    explanation: "ベストプラクティス観点の推奨事項を確認するサービスはTrusted Advisorです。Configは構成準拠、GuardDutyは脅威検出、KMSは鍵管理です。",
    services: ["trustedadvisor", "config", "guardduty", "kms"]
  },
  {
    id: "q26",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "コンテナ",
    level: "Foundation",
    prompt: "ECSでコンテナを実行したいが、基盤となるEC2インスタンスのプロビジョニングや管理は避けたい。どれを選ぶべきか。",
    options: ["AWS Fargate", "Amazon EBS", "AWS Lambda", "AWS Direct Connect"],
    answer: 0,
    explanation: "ECS/EKSのコンテナをサーバー管理なしで実行するにはFargateを使います。Lambdaは関数実行、EBSはブロックストレージ、Direct Connectは専用線です。",
    services: ["fargate", "ecs", "lambda", "ec2"]
  },
  {
    id: "q27",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "ネットワーク",
    level: "Associate",
    prompt: "多数のVPCとオンプレミス接続を個別にメッシュ接続するのではなく、中央のハブに集約して管理したい。最も適切なサービスはどれか。",
    options: ["AWS Transit Gateway", "Amazon CloudFront", "Amazon Route 53", "AWS WAF"],
    answer: 0,
    explanation: "多数のVPCやオンプレミス接続を集約するハブにはTransit Gatewayを使います。CloudFrontはCDN、Route 53はDNS、WAFはWeb防御です。",
    services: ["transitgateway", "vpc", "directconnect", "vpn"]
  },
  {
    id: "q28",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "ハイブリッド接続",
    level: "Foundation",
    prompt: "オンプレミスネットワークとAWS VPCを、インターネット経由の暗号化トンネルで接続したい。どれを使うべきか。",
    options: ["AWS Site-to-Site VPN", "AWS Direct Connect", "AWS PrivateLink", "Amazon CloudFront"],
    answer: 0,
    explanation: "インターネット経由の暗号化VPN接続にはSite-to-Site VPNを使います。Direct Connectは専用線、PrivateLinkはVPCからサービスへのプライベート接続です。",
    services: ["vpn", "directconnect", "privatelink", "vpc"]
  },
  {
    id: "q29",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "証明書管理",
    level: "Foundation",
    prompt: "CloudFrontやApplication Load BalancerでHTTPSを使うため、TLS証明書の発行と更新管理を簡素化したい。利用するサービスはどれか。",
    options: ["AWS Certificate Manager", "AWS KMS", "AWS Secrets Manager", "Amazon Cognito"],
    answer: 0,
    explanation: "TLS/SSL証明書のプロビジョニングと管理にはAWS Certificate Managerを使います。KMSは暗号化キー、Secrets Managerは秘密情報、Cognitoはアプリ利用者の認証です。",
    services: ["acm", "cloudfront", "elb", "kms"]
  },
  {
    id: "q30",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "セキュリティ",
    level: "Foundation",
    prompt: "AWS上のアプリケーションをDDoS攻撃から保護したい。Webリクエストの細かいルール制御ではなく、DDoS保護が主目的である。どれを選ぶべきか。",
    options: ["AWS Shield", "AWS WAF", "Amazon GuardDuty", "AWS Config"],
    answer: 0,
    explanation: "DDoS保護の主役はAWS Shieldです。WAFはWebリクエストのルール制御、GuardDutyは脅威検出、Configは構成準拠評価です。",
    services: ["shield", "waf", "guardduty", "cloudfront"]
  },
  {
    id: "q31",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "認証",
    level: "Foundation",
    prompt: "Webアプリやモバイルアプリに、利用者のサインアップ、サインイン、外部IDプロバイダー連携を追加したい。適切なサービスはどれか。",
    options: ["Amazon Cognito", "AWS IAM", "AWS Organizations", "AWS RAM"],
    answer: 0,
    explanation: "アプリ利用者向けの認証・ユーザー管理にはCognitoを使います。IAMはAWSリソースへの権限管理、Organizationsは複数アカウント管理です。",
    services: ["cognito", "iam", "organizations"]
  },
  {
    id: "q32",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "バックアップ",
    level: "Foundation",
    prompt: "EBS、RDS、EFSなど複数のAWSサービスにまたがるバックアップポリシーを一元管理したい。どれを使うべきか。",
    options: ["AWS Backup", "Amazon S3 Glacier", "AWS Storage Gateway", "AWS CloudTrail"],
    answer: 0,
    explanation: "複数AWSサービスのバックアップを一元管理するにはAWS Backupを使います。S3 Glacierは低コストアーカイブ、Storage Gatewayはハイブリッドストレージ、CloudTrailは監査ログです。",
    services: ["backup", "ebs", "rds", "efs"]
  },
  {
    id: "q33",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "ハイブリッドストレージ",
    level: "Foundation",
    prompt: "オンプレミスの既存アプリケーションから、ファイルやボリュームのインターフェイスを使ってAWSクラウドストレージへ接続したい。適切なサービスはどれか。",
    options: ["AWS Storage Gateway", "AWS DataSync", "Amazon EFS", "AWS Direct Connect"],
    answer: 0,
    explanation: "オンプレミスアプリからクラウドストレージをゲートウェイ経由で利用するにはStorage Gatewayを使います。DataSyncはデータ転送・移行タスクに向きます。",
    services: ["storagegateway", "datasync", "s3"]
  },
  {
    id: "q34",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "ファイルストレージ",
    level: "Associate",
    prompt: "WindowsアプリケーションがSMBプロトコルの共有ファイルシステムを必要としている。マネージドなWindowsファイルサーバーを使いたい。どれを選ぶべきか。",
    options: ["Amazon FSx", "Amazon EFS", "Amazon EBS", "Amazon S3"],
    answer: 0,
    explanation: "Windows SMBファイル共有にはAmazon FSx for Windows File Serverが適しています。EFSはLinux向けNFS、EBSはブロックストレージ、S3はオブジェクトストレージです。",
    services: ["fsx", "efs", "ebs", "s3"]
  },
  {
    id: "q35",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "マルチアカウント",
    level: "Associate",
    prompt: "Organizations内の別AWSアカウントに、対応するAWSリソースを複製せず共有したい。最も適切なサービスはどれか。",
    options: ["AWS RAM", "AWS IAM", "AWS CloudFormation", "Amazon Cognito"],
    answer: 0,
    explanation: "対応リソースをアカウント間で共有するにはAWS Resource Access Managerを使います。IAMは権限管理、CloudFormationはIaC、Cognitoはアプリ利用者認証です。",
    services: ["ram", "organizations", "iam"]
  },
  {
    id: "q36",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "プライベート接続",
    level: "Associate",
    prompt: "VPC内のリソースからAWSサービスへ、パブリックIPやインターネット経由を使わずプライベートに接続したい。どれを使うべきか。",
    options: ["AWS PrivateLink", "Amazon CloudFront", "AWS Shield", "Amazon Route 53"],
    answer: 0,
    explanation: "VPCエンドポイントなどでサービスへプライベート接続するにはPrivateLinkを使います。CloudFrontはCDN、ShieldはDDoS保護、Route 53はDNSです。",
    services: ["privatelink", "vpc", "route53"]
  },
  {
    id: "q37",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "ガバナンス",
    level: "Foundation",
    prompt: "複数アカウントのランディングゾーンを標準化して作成し、ガードレールを適用したい。最も適切なサービスはどれか。",
    options: ["AWS Control Tower", "AWS CloudTrail", "AWS KMS", "AWS Systems Manager"],
    answer: 0,
    explanation: "マルチアカウントのランディングゾーンとガードレールにはControl Towerを使います。CloudTrailは監査ログ、KMSは鍵管理、Systems Managerは運用管理です。",
    services: ["controltower", "organizations", "cloudtrail"]
  },
  {
    id: "q38",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "運用通知",
    level: "Foundation",
    prompt: "AWSサービスイベントや、自分のアカウントに影響するメンテナンス・障害情報を確認したい。どれを使うべきか。",
    options: ["AWS Health Dashboard", "Amazon CloudWatch", "AWS Config", "AWS Trusted Advisor"],
    answer: 0,
    explanation: "AWS側のサービスイベントやアカウント固有の運用イベント確認にはAWS Health Dashboardを使います。CloudWatchはメトリクス監視、Configは構成履歴です。",
    services: ["health", "cloudwatch", "config", "trustedadvisor"]
  },
  {
    id: "q39",
    tracks: ["cloud-practitioner"],
    domain: "コンピューティング",
    level: "Foundation",
    prompt: "小規模なWebサイトを素早く公開したい。細かなVPCやEC2構成を設計するより、シンプルな仮想サーバーと分かりやすい料金を重視したい。どれを選ぶべきか。",
    options: ["Amazon Lightsail", "Amazon EKS", "AWS Direct Connect", "Amazon Redshift"],
    answer: 0,
    explanation: "小規模Webサイトを簡単に始める用途にはLightsailが適しています。EKSはKubernetes、Direct Connectは専用線、Redshiftはデータウェアハウスです。",
    services: ["lightsail", "ec2", "eks"]
  },
  {
    id: "q40",
    tracks: ["solutions-architect"],
    domain: "データ移行",
    level: "Associate",
    prompt: "オンプレミスのファイルサーバーからAmazon S3やAmazon EFSへ大量データを移行し、転送タスクとして管理したい。最も適切なサービスはどれか。",
    options: ["AWS DataSync", "AWS Storage Gateway", "AWS DMS", "Amazon SQS"],
    answer: 0,
    explanation: "オンプレミスストレージとAWSストレージ間のデータ転送・移行にはDataSyncを使います。Storage Gatewayはハイブリッド利用、DMSはデータベース移行です。",
    services: ["datasync", "storagegateway", "s3", "efs"]
  },
  {
    id: "q41",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "ストレージ",
    level: "Foundation",
    prompt: "写真、ログ、バックアップファイルのようなオブジェクトを大量に保存し、高い耐久性と容量の自動拡張を重視したい。選ぶべきサービスはどれか。",
    options: ["Amazon S3", "Amazon EBS", "Amazon EFS", "Amazon ElastiCache"],
    answer: 0,
    explanation: "オブジェクトストレージとして大量のファイルを高耐久に保存する中心はS3です。EBSはEC2向けブロックストレージ、EFSは共有ファイルシステムです。",
    services: ["s3", "ebs", "efs", "elasticache"]
  },
  {
    id: "q42",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "ストレージコスト",
    level: "Foundation",
    prompt: "Amazon S3に保存したログのうち、30日後はほぼ参照しないものを低コストなストレージクラスへ自動移行したい。最も適切な機能はどれか。",
    options: ["S3 ライフサイクルルール", "Amazon EBS スナップショット", "AWS Direct Connect", "Amazon Route 53 ヘルスチェック"],
    answer: 0,
    explanation: "S3ライフサイクルルールを使うと、経過日数に応じて低頻度アクセスやアーカイブ向けストレージクラスへ移行できます。",
    services: ["s3", "ebs", "directconnect", "route53"]
  },
  {
    id: "q43",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "バックアップ",
    level: "Foundation",
    prompt: "Amazon EC2にアタッチされたブロックストレージのポイントインタイムバックアップを作成したい。中心になる機能はどれか。",
    options: ["Amazon EFS マウントターゲット", "Amazon EBS スナップショット", "Amazon S3 静的Webホスティング", "Amazon CloudFront キャッシュ"],
    answer: 1,
    explanation: "EC2にアタッチするEBSボリュームのバックアップにはEBSスナップショットを使います。EFSやS3はストレージの種類が異なります。",
    services: ["ebs", "ec2", "efs", "s3"]
  },
  {
    id: "q44",
    tracks: ["solutions-architect"],
    domain: "NoSQL",
    level: "Associate",
    prompt: "アクセスパターンが明確なキーバリュー型データを、サーバー管理なしでミリ秒単位の低レイテンシに処理したい。最も適切なサービスはどれか。",
    options: ["Amazon RDS", "Amazon Redshift", "Amazon DynamoDB", "Amazon Athena"],
    answer: 2,
    explanation: "明確なキーアクセスで大規模にスケールするNoSQLにはDynamoDBが適しています。RDSはリレーショナルDB、RedshiftはDWH、AthenaはS3上の分析です。",
    services: ["dynamodb", "rds", "redshift", "athena"]
  },
  {
    id: "q45",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "パフォーマンス",
    level: "Foundation",
    prompt: "頻繁に読まれるランキングやセッション情報をインメモリで保持し、データベースへの読み取り負荷を下げたい。どれを使うべきか。",
    options: ["Amazon ElastiCache", "Amazon S3", "AWS CloudTrail", "AWS DMS"],
    answer: 0,
    explanation: "インメモリキャッシュで読み取り負荷を下げる用途はElastiCacheです。永続的な主データベースではなく、キャッシュ層として使います。",
    services: ["elasticache", "rds", "dynamodb"]
  },
  {
    id: "q46",
    tracks: ["solutions-architect"],
    domain: "データベース",
    level: "Associate",
    prompt: "MySQL互換のデータベースで、読み取りトラフィックが増えている。クラウド向けの高可用なDBでリードレプリカを増やして読み取りを拡張したい。どれが最も近いか。",
    options: ["Amazon DynamoDB", "Amazon Aurora", "Amazon EFS", "AWS Storage Gateway"],
    answer: 1,
    explanation: "MySQL/PostgreSQL互換で高可用性と読み取りスケールを重視するならAuroraが適しています。DynamoDBはNoSQL、EFSはファイルストレージです。",
    services: ["aurora", "rds", "dynamodb", "efs"]
  },
  {
    id: "q47",
    tracks: ["solutions-architect"],
    domain: "高可用性",
    level: "Associate",
    prompt: "Amazon RDSの単一AZ構成では障害時の停止が長くなる可能性がある。スタンバイを別AZに用意し、自動フェイルオーバーを使いたい。選ぶべき構成はどれか。",
    options: ["RDS Multi-AZ", "RDS リードレプリカのみ", "Amazon Athena", "Amazon CloudFront"],
    answer: 0,
    explanation: "RDS Multi-AZは高可用性と自動フェイルオーバーのための構成です。リードレプリカは主に読み取りスケールや災害対策に使います。",
    services: ["rds", "aurora", "cloudfront", "athena"]
  },
  {
    id: "q48",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "配信",
    level: "Foundation",
    prompt: "世界中のユーザーにWebコンテンツを低レイテンシで配信し、オリジンへの負荷も下げたい。中心になるサービスはどれか。",
    options: ["AWS Direct Connect", "Amazon Route 53", "Amazon CloudFront", "AWS Site-to-Site VPN"],
    answer: 2,
    explanation: "エッジロケーションからキャッシュ配信して低レイテンシ化するのはCloudFrontです。Route 53はDNS、Direct ConnectとVPNは接続サービスです。",
    services: ["cloudfront", "route53", "directconnect", "vpn"]
  },
  {
    id: "q49",
    tracks: ["solutions-architect"],
    domain: "DNS",
    level: "Associate",
    prompt: "example.comを複数リージョンのエンドポイントへ向け、ユーザーに近いリージョンへDNSで誘導したい。どのサービスのルーティング機能を使うか。",
    options: ["Amazon Route 53", "Amazon CloudWatch", "AWS Config", "AWS KMS"],
    answer: 0,
    explanation: "ドメインのDNS管理とレイテンシベースなどのルーティングにはRoute 53を使います。CloudWatchは監視、Configは構成評価です。",
    services: ["route53", "cloudwatch", "config", "kms"]
  },
  {
    id: "q50",
    tracks: ["solutions-architect"],
    domain: "ネットワークセキュリティ",
    level: "Associate",
    prompt: "Amazon VPC内のEC2インスタンスに対して、許可したポートだけをインスタンス単位で制御したい。状態を保持する仮想ファイアウォールとして使うものはどれか。",
    options: ["セキュリティグループ", "Amazon CloudFront", "AWS Organizations", "AWS Cost Explorer"],
    answer: 0,
    explanation: "VPC内のインスタンス単位の許可制御にはセキュリティグループを使います。セキュリティグループはステートフルに通信を扱います。",
    services: ["vpc", "ec2", "cloudfront", "organizations"]
  },
  {
    id: "q51",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "権限管理",
    level: "Foundation",
    prompt: "Amazon EC2上のアプリケーションからAmazon S3へアクセスしたい。長期アクセスキーをインスタンス内に保存せず、推奨される方法で権限を渡したい。どれを使うか。",
    options: ["IAMロール", "AWS Budgets", "Amazon Route 53", "AWS Shield"],
    answer: 0,
    explanation: "EC2などのAWSリソースにはIAMロールで権限を付与します。長期アクセスキーをコードやインスタンス内に置く設計は避けます。",
    services: ["iam", "ec2", "s3"]
  },
  {
    id: "q52",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "秘密情報管理",
    level: "Foundation",
    prompt: "データベースの認証情報をアプリケーションから安全に取得し、ローテーションも自動化したい。最も適切なサービスはどれか。",
    options: ["AWS Secrets Manager", "AWS KMS", "Amazon CloudWatch", "AWS WAF"],
    answer: 0,
    explanation: "DBパスワードなどの秘密情報の保管とローテーションにはSecrets Managerを使います。KMSは暗号化キーの管理が主な役割です。",
    services: ["secretsmanager", "kms", "rds"]
  },
  {
    id: "q53",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "暗号化",
    level: "Foundation",
    prompt: "Amazon S3、Amazon EBS、Amazon RDSなど複数サービスで使う暗号化キーを一元管理したい。選ぶべきサービスはどれか。",
    options: ["AWS KMS", "Amazon Cognito", "AWS Health Dashboard", "Amazon SQS"],
    answer: 0,
    explanation: "AWSサービスの暗号化キー管理にはKMSを使います。Cognitoはアプリ利用者認証、Health Dashboardはサービスイベント確認です。",
    services: ["kms", "s3", "ebs", "rds"]
  },
  {
    id: "q54",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "監査",
    level: "Foundation",
    prompt: "AWSアカウントで実行されたAPI操作を証跡として保存し、誰がいつ何をしたかを確認したい。利用するサービスはどれか。",
    options: ["AWS CloudTrail", "Amazon CloudWatch", "Amazon GuardDuty", "AWS Config"],
    answer: 0,
    explanation: "API操作の証跡はCloudTrailで確認します。CloudWatchはメトリクスやログ監視、GuardDutyは脅威検出、Configは構成履歴です。",
    services: ["cloudtrail", "cloudwatch", "guardduty", "config"]
  },
  {
    id: "q55",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "監視",
    level: "Foundation",
    prompt: "アプリケーションログを集約し、特定エラーの増加を検知してアラーム通知したい。中心になるサービスはどれか。",
    options: ["Amazon CloudWatch", "AWS DMS", "AWS RAM", "AWS Certificate Manager"],
    answer: 0,
    explanation: "ログ、メトリクス、アラームをまとめて扱う運用監視サービスはCloudWatchです。DMSはDB移行、RAMはリソース共有です。",
    services: ["cloudwatch", "sns", "dms", "ram"]
  },
  {
    id: "q56",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "コンプライアンス",
    level: "Foundation",
    prompt: "S3バケットが暗号化されているかなど、AWSリソースの設定がルールに準拠しているか継続的に評価したい。使うべきサービスはどれか。",
    options: ["AWS Config", "AWS CloudTrail", "Amazon Route 53", "AWS Fargate"],
    answer: 0,
    explanation: "リソース構成の記録とルールに基づく準拠評価にはConfigを使います。CloudTrailは誰が変更したかのAPI証跡です。",
    services: ["config", "cloudtrail", "s3", "fargate"]
  },
  {
    id: "q57",
    tracks: ["solutions-architect"],
    domain: "運用管理",
    level: "Associate",
    prompt: "多数のAmazon EC2インスタンスへパッチ適用やコマンド実行を行い、踏み台サーバーへの依存を減らしたい。どれを使うべきか。",
    options: ["AWS Systems Manager", "AWS Cost Explorer", "Amazon CloudFront", "AWS Shield"],
    answer: 0,
    explanation: "EC2のコマンド実行、パッチ管理、運用自動化にはSystems Managerを使います。Cost Explorerはコスト分析です。",
    services: ["systemsmanager", "ec2", "costexplorer"]
  },
  {
    id: "q58",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "IaC",
    level: "Foundation",
    prompt: "VPC、EC2、RDSなどの構成をテンプレートとして管理し、同じ環境を再現可能に作りたい。最も適切なサービスはどれか。",
    options: ["AWS CloudFormation", "Amazon CloudWatch", "Amazon Cognito", "AWS Backup"],
    answer: 0,
    explanation: "インフラ構成をテンプレートで定義し、スタックとして作成・更新するにはCloudFormationを使います。",
    services: ["cloudformation", "vpc", "ec2", "rds"]
  },
  {
    id: "q59",
    tracks: ["solutions-architect"],
    domain: "非同期処理",
    level: "Associate",
    prompt: "処理に失敗したメッセージを通常キューから分離し、後で原因調査できるようにしたい。Amazon SQSで使うべき機能はどれか。",
    options: ["デッドレターキュー", "Amazon Route 53 レイテンシルーティング", "AWS KMS キーローテーション", "Amazon CloudFront オリジンフェイルオーバー"],
    answer: 0,
    explanation: "SQSで失敗メッセージを隔離するにはデッドレターキューを使います。再処理や調査がしやすくなります。",
    services: ["sqs", "route53", "kms", "cloudfront"]
  },
  {
    id: "q60",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "通知",
    level: "Foundation",
    prompt: "1つのイベントをメール、HTTPエンドポイント、複数のAmazon SQSキューへ同時に配信したい。中心になるサービスはどれか。",
    options: ["Amazon SNS", "Amazon EBS", "AWS DMS", "AWS Config"],
    answer: 0,
    explanation: "複数購読者へのファンアウト通知にはSNSを使います。SQSは処理待ちメッセージを保持するキューです。",
    services: ["sns", "sqs", "dms", "config"]
  },
  {
    id: "q61",
    tracks: ["solutions-architect"],
    domain: "イベント駆動",
    level: "Associate",
    prompt: "SaaSやAWSサービスから発生するイベントを、条件に応じてLambdaやStep Functionsへルーティングしたい。最も適切なサービスはどれか。",
    options: ["Amazon EventBridge", "Amazon EFS", "AWS Backup", "Amazon Lightsail"],
    answer: 0,
    explanation: "イベントバスとルールでイベントをターゲットへ振り分けるにはEventBridgeを使います。Step Functionsはワークフロー制御のサービスです。",
    services: ["eventbridge", "lambda", "stepfunctions"]
  },
  {
    id: "q62",
    tracks: ["solutions-architect"],
    domain: "ワークフロー",
    level: "Associate",
    prompt: "複数のLambda処理を順番に実行し、分岐、待機、リトライ、失敗時の遷移を明示的に定義したい。どれを選ぶべきか。",
    options: ["AWS Step Functions", "Amazon SNS", "Amazon S3", "AWS Trusted Advisor"],
    answer: 0,
    explanation: "分岐やリトライを含む複数ステップのワークフロー管理にはStep Functionsが適しています。SNSは通知、S3はオブジェクトストレージです。",
    services: ["stepfunctions", "lambda", "sns", "s3"]
  },
  {
    id: "q63",
    tracks: ["solutions-architect"],
    domain: "API",
    level: "Associate",
    prompt: "バックエンドのLambda関数をHTTPS APIとして公開し、スロットリングや認証設定も管理したい。最も適切なサービスはどれか。",
    options: ["Amazon API Gateway", "Amazon Athena", "AWS Storage Gateway", "Amazon FSx"],
    answer: 0,
    explanation: "LambdaなどのバックエンドをAPIとして公開し、認証やレート制限を扱うにはAPI Gatewayを使います。",
    services: ["apigateway", "lambda", "athena", "storagegateway"]
  },
  {
    id: "q64",
    tracks: ["solutions-architect"],
    domain: "スケジュール実行",
    level: "Associate",
    prompt: "毎日深夜にLambda関数を起動して集計処理を行いたい。サーバーを常時起動せず、スケジュールイベントで実行したい。どれが適切か。",
    options: ["Amazon EventBridge", "Amazon EBS", "AWS Direct Connect", "AWS RAM"],
    answer: 0,
    explanation: "スケジュールルールでLambdaなどを定期実行するにはEventBridgeを使います。EBSはブロックストレージ、Direct Connectは専用線です。",
    services: ["eventbridge", "lambda", "ebs", "directconnect"]
  },
  {
    id: "q65",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "コンテナ",
    level: "Foundation",
    prompt: "Kubernetesを使わず、AWSネイティブなコンテナオーケストレーションでタスクやサービスを管理したい。どれを選ぶべきか。",
    options: ["Amazon ECS", "Amazon EKS", "Amazon RDS", "AWS KMS"],
    answer: 0,
    explanation: "AWSネイティブなコンテナ管理でKubernetesが不要ならECSがシンプルです。Kubernetes APIが前提ならEKSを選びます。",
    services: ["ecs", "eks", "fargate"]
  },
  {
    id: "q66",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "コンテナ実行基盤",
    level: "Foundation",
    prompt: "Amazon ECSでコンテナを動かすが、EC2インスタンスの容量管理やパッチ管理は行いたくない。どの起動タイプが適切か。",
    options: ["AWS Fargate", "Amazon EC2", "Amazon EBS", "AWS CloudTrail"],
    answer: 0,
    explanation: "ECS/EKSのコンテナをサーバー管理なしで実行するにはFargateを使います。EC2起動タイプではインスタンス管理が必要です。",
    services: ["fargate", "ecs", "ec2"]
  },
  {
    id: "q67",
    tracks: ["solutions-architect"],
    domain: "Kubernetes",
    level: "Associate",
    prompt: "既存のKubernetesマニフェスト、Helmチャート、周辺ツールを使い続けながらAWSで運用したい。最も適切なサービスはどれか。",
    options: ["Amazon EKS", "Amazon ECS", "AWS Lambda", "Amazon Lightsail"],
    answer: 0,
    explanation: "Kubernetes互換のワークロードをAWSでマネージドに運用するにはEKSを使います。Kubernetesが不要ならECSも候補です。",
    services: ["eks", "ecs", "lambda", "lightsail"]
  },
  {
    id: "q68",
    tracks: ["solutions-architect"],
    domain: "負荷分散",
    level: "Associate",
    prompt: "同じドメインで /api はAPIサーバー、/images は画像サーバーへ振り分けたい。HTTPパスに基づいてルーティングするElastic Load Balancingの種類はどれか。",
    options: ["Application Load Balancer", "Network Load Balancer", "AWS Direct Connect", "Amazon Route 53 Resolver"],
    answer: 0,
    explanation: "HTTP/HTTPSのパスベースルーティングにはApplication Load Balancerを使います。Network Load BalancerはL4の高性能な負荷分散向けです。",
    services: ["elb", "ec2", "route53", "directconnect"]
  },
  {
    id: "q69",
    tracks: ["solutions-architect"],
    domain: "スケーリング",
    level: "Associate",
    prompt: "CPU使用率を目標値に近づけるようにAmazon EC2の台数を自動調整し、負荷増加時だけ容量を増やしたい。使うべきサービスはどれか。",
    options: ["AWS Auto Scaling", "AWS Backup", "AWS CloudTrail", "AWS Certificate Manager"],
    answer: 0,
    explanation: "EC2台数をメトリクスに応じて増減させるにはAuto Scalingを使います。CloudWatchメトリクスやアラームと組み合わせます。",
    services: ["autoscaling", "ec2", "cloudwatch"]
  },
  {
    id: "q70",
    tracks: ["solutions-architect"],
    domain: "ハイブリッド接続",
    level: "Associate",
    prompt: "オンプレミスとAWS間で、インターネットVPNより一貫した帯域と低いジッターを重視した接続を用意したい。最も適切なサービスはどれか。",
    options: ["AWS Direct Connect", "AWS Site-to-Site VPN", "Amazon CloudFront", "AWS WAF"],
    answer: 0,
    explanation: "予測しやすい帯域と専用線接続を重視するならDirect Connectです。Site-to-Site VPNはインターネット経由の暗号化トンネルです。",
    services: ["directconnect", "vpn", "cloudfront", "waf"]
  },
  {
    id: "q71",
    tracks: ["solutions-architect"],
    domain: "ネットワーク集約",
    level: "Associate",
    prompt: "多数のVPCとオンプレミス拠点を接続している。VPCピアリングを個別に張る構成が複雑になったため、中央ハブに集約したい。何を使うか。",
    options: ["AWS Transit Gateway", "AWS PrivateLink", "Amazon CloudFront", "AWS Budgets"],
    answer: 0,
    explanation: "多数のVPCやオンプレミス接続をハブとして集約するにはTransit Gatewayを使います。PrivateLinkはサービスへのプライベート接続です。",
    services: ["transitgateway", "vpc", "privatelink", "directconnect"]
  },
  {
    id: "q72",
    tracks: ["solutions-architect"],
    domain: "閉域接続",
    level: "Associate",
    prompt: "VPC内のアプリケーションから対応するAWSサービスやSaaSへ、パブリックIPを使わずプライベートに接続したい。どれを使うべきか。",
    options: ["AWS PrivateLink", "Amazon Route 53", "AWS Shield", "Amazon S3 ライフサイクル"],
    answer: 0,
    explanation: "VPCエンドポイントなどを通じてサービスへプライベート接続するにはPrivateLinkを使います。Route 53はDNS、ShieldはDDoS保護です。",
    services: ["privatelink", "vpc", "route53", "shield"]
  },
  {
    id: "q73",
    tracks: ["solutions-architect"],
    domain: "証明書",
    level: "Associate",
    prompt: "Application Load BalancerでHTTPSを終端したい。TLS証明書を発行・管理し、ロードバランサーへ関連付けたい。使うべきサービスはどれか。",
    options: ["AWS Certificate Manager", "AWS KMS", "AWS Secrets Manager", "Amazon Cognito"],
    answer: 0,
    explanation: "ALBやCloudFrontで使うTLS証明書の発行・管理にはCertificate Managerを使います。KMSは暗号化キー、Secrets Managerは秘密情報です。",
    services: ["acm", "elb", "cloudfront", "kms"]
  },
  {
    id: "q74",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "DDoS対策",
    level: "Foundation",
    prompt: "AWS上のアプリケーションをDDoS攻撃から保護したい。Webリクエストのルール制御よりもDDoS保護が主目的である。選ぶべきサービスはどれか。",
    options: ["AWS Shield", "AWS WAF", "Amazon GuardDuty", "AWS Config"],
    answer: 0,
    explanation: "DDoS保護の中心はShieldです。WAFはWebリクエストのルール制御、GuardDutyは脅威検出、Configは構成準拠です。",
    services: ["shield", "waf", "guardduty", "config"]
  },
  {
    id: "q75",
    tracks: ["solutions-architect"],
    domain: "Web防御",
    level: "Associate",
    prompt: "CloudFrontに届くHTTPリクエストについて、特定の国やIP、SQLインジェクションに該当するパターンをブロックしたい。使うべきサービスはどれか。",
    options: ["AWS WAF", "AWS KMS", "AWS DataSync", "Amazon Athena"],
    answer: 0,
    explanation: "WebリクエストをL7ルールで検査してブロックするにはWAFを使います。KMSは鍵管理、DataSyncはデータ転送です。",
    services: ["waf", "cloudfront", "kms", "datasync"]
  },
  {
    id: "q76",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "脅威検出",
    level: "Foundation",
    prompt: "AWSアカウントで不審なAPI呼び出し、マルウェア通信の兆候、暗号通貨マイニングの疑いを検出したい。どれを有効化するか。",
    options: ["Amazon GuardDuty", "AWS CloudFormation", "AWS Budgets", "Amazon EFS"],
    answer: 0,
    explanation: "脅威検出にはGuardDutyを使います。CloudTrailやVPC関連ログなどを分析して不審な挙動を検出します。",
    services: ["guardduty", "cloudtrail", "vpc"]
  },
  {
    id: "q77",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "ユーザー認証",
    level: "Foundation",
    prompt: "一般利用者向けWebアプリにサインアップ、サインイン、外部IDプロバイダー連携を追加したい。AWSリソース操作の権限ではなく、アプリ利用者の認証が目的である。",
    options: ["Amazon Cognito", "AWS IAM", "AWS Organizations", "AWS RAM"],
    answer: 0,
    explanation: "アプリ利用者の認証・ユーザー管理にはCognitoを使います。IAMはAWSリソースへの認可、Organizationsは複数アカウント管理です。",
    services: ["cognito", "iam", "organizations", "ram"]
  },
  {
    id: "q78",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "請求とアカウント",
    level: "Foundation",
    prompt: "複数のAWSアカウントを一元管理し、一括請求を使いたい。組織単位でサービス利用制限も適用したい。中心になるサービスはどれか。",
    options: ["AWS Organizations", "AWS IAM", "Amazon CloudWatch", "Amazon Route 53"],
    answer: 0,
    explanation: "複数アカウントの管理、一括請求、SCPによるガードレールにはOrganizationsを使います。IAMはアカウント内の権限管理です。",
    services: ["organizations", "iam", "cloudwatch", "route53"]
  },
  {
    id: "q79",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "マルチアカウント統制",
    level: "Foundation",
    prompt: "新しいマルチアカウント環境を標準構成で作り、ランディングゾーンとガードレールを素早く整備したい。選ぶべきサービスはどれか。",
    options: ["AWS Control Tower", "AWS CloudTrail", "AWS Fargate", "Amazon Athena"],
    answer: 0,
    explanation: "マルチアカウントのランディングゾーン構築とガードレール適用にはControl Towerを使います。CloudTrailは監査ログです。",
    services: ["controltower", "organizations", "cloudtrail"]
  },
  {
    id: "q80",
    tracks: ["solutions-architect"],
    domain: "リソース共有",
    level: "Associate",
    prompt: "Organizations内の複数アカウントでサブネットなどの対応リソースを共有し、各アカウントにリソースを複製したくない。使うべきサービスはどれか。",
    options: ["AWS RAM", "Amazon Cognito", "AWS KMS", "AWS DMS"],
    answer: 0,
    explanation: "対応リソースをアカウント間で共有するにはResource Access Managerを使います。Cognitoはアプリ認証、KMSは鍵管理です。",
    services: ["ram", "organizations", "vpc", "cognito"]
  },
  {
    id: "q81",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "バックアップ",
    level: "Foundation",
    prompt: "Amazon EBS、Amazon RDS、Amazon EFSのバックアップをサービスごとに個別管理せず、ポリシーとして一元管理したい。どれを使うべきか。",
    options: ["AWS Backup", "Amazon SQS", "AWS WAF", "AWS Cost Explorer"],
    answer: 0,
    explanation: "複数AWSサービスにまたがるバックアップポリシーと復旧ポイントの管理にはBackupを使います。",
    services: ["backup", "ebs", "rds", "efs"]
  },
  {
    id: "q82",
    tracks: ["solutions-architect"],
    domain: "ハイブリッドストレージ",
    level: "Associate",
    prompt: "オンプレミスのアプリケーションからNFS/SMBのファイルインターフェイスでクラウドストレージを使いたい。既存アプリの変更は最小限にしたい。どれが適切か。",
    options: ["AWS Storage Gateway", "AWS DataSync", "Amazon Redshift", "AWS Shield"],
    answer: 0,
    explanation: "既存オンプレミスアプリからファイルやボリュームのインターフェイスでAWSストレージを使うにはStorage Gatewayが適しています。DataSyncは転送タスク向けです。",
    services: ["storagegateway", "datasync", "s3"]
  },
  {
    id: "q83",
    tracks: ["solutions-architect"],
    domain: "データ転送",
    level: "Associate",
    prompt: "オンプレミスのファイル群をAmazon S3へ移行する一時的な転送ジョブを管理し、転送の自動化と検証を行いたい。どれを使うべきか。",
    options: ["AWS DataSync", "AWS Storage Gateway", "Amazon Cognito", "AWS Config"],
    answer: 0,
    explanation: "オンプレミスとAWSストレージ間のデータ転送タスクにはDataSyncを使います。継続的なハイブリッドストレージ利用はStorage Gatewayが向きます。",
    services: ["datasync", "storagegateway", "s3", "config"]
  },
  {
    id: "q84",
    tracks: ["solutions-architect"],
    domain: "ファイルストレージ",
    level: "Associate",
    prompt: "HPCワークロードで高性能な共有ファイルシステムを使い、S3上のデータと連携したい。Amazon FSxのどの用途が最も近いか。",
    options: ["Amazon FSx for Lustre", "Amazon EBS gp3", "Amazon SQS FIFO", "AWS Budgets"],
    answer: 0,
    explanation: "高性能コンピューティングやS3データ連携のファイルシステムにはFSx for Lustreが適しています。EBSは単一インスタンス向けブロックストレージです。",
    services: ["fsx", "s3", "ebs", "sqs"]
  },
  {
    id: "q85",
    tracks: ["solutions-architect"],
    domain: "分析",
    level: "Associate",
    prompt: "Amazon S3に置いたCSVやParquetログを、分析クラスターを用意せずSQLでその場分析したい。最も適切なサービスはどれか。",
    options: ["Amazon Athena", "Amazon Redshift", "Amazon RDS", "Amazon ElastiCache"],
    answer: 0,
    explanation: "S3上のデータに対してサーバーレスにSQLクエリを実行するにはAthenaを使います。継続的なDWH用途ではRedshiftを検討します。",
    services: ["athena", "s3", "redshift", "rds"]
  },
  {
    id: "q86",
    tracks: ["solutions-architect"],
    domain: "データウェアハウス",
    level: "Associate",
    prompt: "BIツールから大量の構造化データに対して複雑な集計クエリを継続的に実行したい。クラウドDWHとして選ぶべきサービスはどれか。",
    options: ["Amazon Redshift", "Amazon SQS", "AWS Certificate Manager", "Amazon Route 53"],
    answer: 0,
    explanation: "大量データの分析とBI向けのクラウドデータウェアハウスにはRedshiftを使います。SQSはキュー、Route 53はDNSです。",
    services: ["redshift", "athena", "sqs", "route53"]
  },
  {
    id: "q87",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "コスト分析",
    level: "Foundation",
    prompt: "AWS利用料金をサービス別、アカウント別、期間別に可視化し、過去傾向から将来の費用も見たい。使うべきサービスはどれか。",
    options: ["AWS Cost Explorer", "AWS Budgets", "AWS CloudTrail", "AWS KMS"],
    answer: 0,
    explanation: "コストと使用量の可視化、フィルタリング、予測にはCost Explorerを使います。Budgetsは予算しきい値の通知が主な役割です。",
    services: ["costexplorer", "budgets", "cloudtrail", "kms"]
  },
  {
    id: "q88",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "予算管理",
    level: "Foundation",
    prompt: "月額費用が80%に達した時点で通知し、100%に達したら追加通知したい。最も適切なサービスはどれか。",
    options: ["AWS Budgets", "AWS Cost Explorer", "Amazon GuardDuty", "AWS DataSync"],
    answer: 0,
    explanation: "予算しきい値に基づく通知にはBudgetsを使います。Cost Explorerは費用分析、GuardDutyは脅威検出です。",
    services: ["budgets", "costexplorer", "guardduty", "datasync"]
  },
  {
    id: "q89",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "運用改善",
    level: "Foundation",
    prompt: "未使用リソース、サービス制限、セキュリティ設定、耐障害性などのベストプラクティス推奨を確認したい。使うべきサービスはどれか。",
    options: ["AWS Trusted Advisor", "AWS Config", "Amazon CloudWatch", "AWS CloudFormation"],
    answer: 0,
    explanation: "AWS環境のベストプラクティス推奨を確認するにはTrusted Advisorを使います。Configは準拠評価、CloudWatchは監視です。",
    services: ["trustedadvisor", "config", "cloudwatch", "cloudformation"]
  },
  {
    id: "q90",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "運用通知",
    level: "Foundation",
    prompt: "AWSサービス側のイベントや、自分のアカウントに影響する予定メンテナンスを確認したい。どれを使うべきか。",
    options: ["AWS Health Dashboard", "Amazon CloudWatch", "AWS CloudTrail", "AWS Secrets Manager"],
    answer: 0,
    explanation: "アカウントに影響するAWSイベントやサービス状態を確認するにはHealth Dashboardを使います。CloudWatchはメトリクス監視です。",
    services: ["health", "cloudwatch", "cloudtrail", "secretsmanager"]
  },
  {
    id: "q91",
    tracks: ["cloud-practitioner"],
    domain: "小規模コンピューティング",
    level: "Foundation",
    prompt: "小規模なWordPressサイトを短時間で立ち上げたい。細かなAWS設計よりも、シンプルな仮想サーバーと固定料金に近い体験を重視したい。どれが適切か。",
    options: ["Amazon Lightsail", "Amazon EKS", "AWS Transit Gateway", "Amazon Redshift"],
    answer: 0,
    explanation: "小規模Webサイトを簡単に始める用途にはLightsailが適しています。高度なネットワークやスケール設計が必要ならEC2などを検討します。",
    services: ["lightsail", "ec2", "eks", "transitgateway"]
  },
  {
    id: "q92",
    tracks: ["solutions-architect"],
    domain: "データベース移行",
    level: "Associate",
    prompt: "オンプレミスOracleデータベースからAmazon RDSへ移行し、移行中も変更データを継続的に反映して停止時間を短くしたい。どれを使うべきか。",
    options: ["AWS DMS", "AWS DataSync", "Amazon SQS", "AWS Shield"],
    answer: 0,
    explanation: "データベース移行と継続的な変更データレプリケーションにはDMSを使います。ファイル転送にはDataSyncを使います。",
    services: ["dms", "rds", "datasync"]
  },
  {
    id: "q93",
    tracks: ["solutions-architect"],
    domain: "マルチアカウントIaC",
    level: "Associate",
    prompt: "同じCloudFormationテンプレートを複数アカウント・複数リージョンへ展開し、標準構成をそろえたい。最も関連する機能はどれか。",
    options: ["CloudFormation StackSets", "Amazon Cognito ユーザープール", "Amazon ElastiCache Redis", "AWS Cost Explorer レポート"],
    answer: 0,
    explanation: "複数アカウント・複数リージョンへCloudFormationスタックを展開する用途にはStackSetsを使います。",
    services: ["cloudformation", "organizations", "cognito", "elasticache"]
  },
  {
    id: "q94",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "S3セキュリティ",
    level: "Foundation",
    prompt: "Amazon S3バケットが意図せずインターネット公開されることを防ぎたい。最初に確認すべきS3の保護機能はどれか。",
    options: ["S3 Block Public Access", "AWS Direct Connect", "Amazon Redshift Spectrum", "AWS DataSync タスク"],
    answer: 0,
    explanation: "S3の意図しない公開を防ぐ基本機能としてBlock Public Accessを確認します。権限はバケットポリシーやIAMとも合わせて管理します。",
    services: ["s3", "iam", "directconnect", "redshift"]
  },
  {
    id: "q95",
    tracks: ["solutions-architect"],
    domain: "配信セキュリティ",
    level: "Associate",
    prompt: "静的WebコンテンツをAmazon S3に保存し、ユーザーにはAmazon CloudFront経由だけで配信したい。S3を直接公開する設計は避けたい。中心になる組み合わせはどれか。",
    options: ["Amazon CloudFront と Amazon S3", "AWS Direct Connect と Amazon EBS", "Amazon RDS と AWS DMS", "Amazon Cognito と AWS Budgets"],
    answer: 0,
    explanation: "S3をオリジンとしてCloudFront経由で配信し、S3への直接公開を避ける構成が適しています。Direct ConnectやDMSはこの用途ではありません。",
    services: ["cloudfront", "s3", "directconnect", "dms"]
  },
  {
    id: "q96",
    tracks: ["solutions-architect"],
    domain: "共有ファイル",
    level: "Associate",
    prompt: "複数AZにあるLinuxベースのWebサーバーから同じコンテンツディレクトリを共有マウントしたい。管理負荷を抑え、容量は自動拡張したい。どれを選ぶか。",
    options: ["Amazon EFS", "Amazon EBS", "Amazon S3 Glacier", "AWS KMS"],
    answer: 0,
    explanation: "複数Linuxサーバーから共有マウントするマネージドNFSにはEFSが適しています。EBSは基本的に単一AZのEC2向けブロックストレージです。",
    services: ["efs", "ebs", "s3", "kms"]
  },
  {
    id: "q97",
    tracks: ["solutions-architect"],
    domain: "ブロックストレージ",
    level: "Associate",
    prompt: "EC2上のデータベースに低レイテンシなブロックストレージをアタッチし、IOPSやスループットを調整したい。選ぶべきサービスはどれか。",
    options: ["Amazon EBS", "Amazon EFS", "Amazon S3", "Amazon CloudFront"],
    answer: 0,
    explanation: "EC2にアタッチして使う低レイテンシなブロックストレージはEBSです。EFSは共有ファイル、S3はオブジェクトストレージです。",
    services: ["ebs", "ec2", "efs", "s3"]
  },
  {
    id: "q98",
    tracks: ["solutions-architect"],
    domain: "リレーショナルDB",
    level: "Associate",
    prompt: "PostgreSQL互換のアプリケーションで、標準的なRDSより高い可用性とクラウド向けのストレージ設計を活かしたい。最も近いサービスはどれか。",
    options: ["Amazon Aurora", "Amazon DynamoDB", "Amazon ElastiCache", "Amazon Athena"],
    answer: 0,
    explanation: "MySQL/PostgreSQL互換で高性能・高可用なクラウド向けリレーショナルDBにはAuroraが適しています。",
    services: ["aurora", "rds", "dynamodb", "elasticache"]
  },
  {
    id: "q99",
    tracks: ["solutions-architect"],
    domain: "NoSQL設計",
    level: "Associate",
    prompt: "ショッピングカートの項目を一定期間後に自動削除したい。Amazon DynamoDBで有効期限をもとに不要データを消す機能はどれか。",
    options: ["Time to Live", "Multi-AZ フェイルオーバー", "S3 Transfer Acceleration", "CloudFront オリジンシールド"],
    answer: 0,
    explanation: "DynamoDBではTTLを使って、有効期限を過ぎた項目を自動的に削除できます。Multi-AZはRDSなどの高可用性構成の文脈です。",
    services: ["dynamodb", "rds", "s3", "cloudfront"]
  },
  {
    id: "q100",
    tracks: ["cloud-practitioner", "solutions-architect"],
    domain: "ガードレール",
    level: "Foundation",
    prompt: "組織内のすべてのアカウントで、特定リージョンの利用を禁止するガードレールを適用したい。中心になる仕組みはどれか。",
    options: ["AWS Organizations のSCP", "Amazon Cognito ユーザープール", "Amazon CloudWatch アラーム", "AWS DataSync タスク"],
    answer: 0,
    explanation: "Organizationsのサービスコントロールポリシーを使うと、組織やOU単位でアカウントに対する最大権限のガードレールを設定できます。",
    services: ["organizations", "iam", "controltower", "cloudwatch"]
  }
];

const pdfServiceMatchers = [
  [/cloudformation/i, ["cloudformation"]],
  [/cloudtrail/i, ["cloudtrail"]],
  [/cloudwatch/i, ["cloudwatch"]],
  [/aws config/i, ["config"]],
  [/systems manager/i, ["systemsmanager"]],
  [/cost explorer/i, ["costexplorer"]],
  [/aws budgets/i, ["budgets"]],
  [/aws health/i, ["health"]],
  [/certificate manager/i, ["acm"]],
  [/\biam\b/i, ["iam"]],
  [/organizations/i, ["organizations"]],
  [/control tower/i, ["controltower"]],
  [/\bkms\b/i, ["kms"]],
  [/secrets manager/i, ["secretsmanager"]],
  [/guardduty/i, ["guardduty"]],
  [/\bwaf\b/i, ["waf"]],
  [/shield/i, ["shield"]],
  [/cognito/i, ["cognito"]],
  [/storage gateway/i, ["storagegateway"]],
  [/aws backup/i, ["backup"]],
  [/\bs3\b/i, ["s3"]],
  [/\bebs\b/i, ["ebs"]],
  [/\befs\b/i, ["efs"]],
  [/\bec2\b.*auto scaling|amazon ec2 auto scaling/i, ["autoscaling", "ec2"]],
  [/aws auto scaling/i, ["autoscaling"]],
  [/\bec2\b|machine image|セキュリティグループ/i, ["ec2"]],
  [/\blambda\b/i, ["lambda"]],
  [/\becs\b/i, ["ecs"]],
  [/\beks\b/i, ["eks"]],
  [/lightsail/i, ["lightsail"]],
  [/direct connect/i, ["directconnect"]],
  [/cloudfront/i, ["cloudfront"]],
  [/route 53/i, ["route53"]],
  [/\bvpc\b|nat gateway|インターネットゲートウェイ|サブネット|ネットワークacl/i, ["vpc"]],
  [/application load balancer|network load balancer|elastic load balancing/i, ["elb"]],
  [/aws vpn/i, ["vpn"]],
  [/aurora/i, ["aurora"]],
  [/dynamodb/i, ["dynamodb"]],
  [/elasticache/i, ["elasticache"]],
  [/\brds\b|multi-az|リードレプリカ/i, ["rds"]],
  [/step functions/i, ["stepfunctions"]],
  [/api gateway/i, ["apigateway"]],
  [/\bsns\b/i, ["sns"]],
  [/\bsqs\b|dead letter queue|delay queue|visibility timeout/i, ["sqs"]],
  [/athena/i, ["athena"]],
  [/redshift/i, ["redshift"]],
  [/database migration service/i, ["dms"]]
];

function serviceIdsForPdfAnswer(answer) {
  const match = pdfServiceMatchers.find(([pattern]) => pattern.test(answer));
  return match ? match[1] : [];
}

function stableHash(value) {
  return [...value].reduce((hash, character) => {
    return ((hash << 5) - hash + character.charCodeAt(0)) | 0;
  }, 0);
}

function pdfOptionsFor(card, cards) {
  const candidates = [
    ...new Set(
      cards
        .filter((candidate) => candidate.sectionNumber === card.sectionNumber && candidate.answer !== card.answer)
        .map((candidate) => candidate.answer)
    )
  ];
  const options = [card.answer];
  let cursor = Math.abs(stableHash(`${card.number}:${card.answer}`));

  while (options.length < 4 && candidates.length) {
    const index = cursor % candidates.length;
    options.push(candidates.splice(index, 1)[0]);
    cursor = Math.floor(cursor / 7) + 17;
  }

  return options;
}

function createPdfQuestionBank(cards) {
  return cards.map((card) => ({
    id: `pdf-q${String(card.number).padStart(3, "0")}`,
    tracks: ["pdf-flashcards"],
    domain: `${String(card.sectionNumber).padStart(2, "0")}. ${card.sectionTitle}`,
    level: `PDF #${card.number}`,
    prompt: card.prompt,
    options: pdfOptionsFor(card, cards),
    answer: 0,
    explanation: `PDF記載の回答は「${card.answer}」です。`,
    services: serviceIdsForPdfAnswer(card.answer)
  }));
}

if (typeof pdfFlashcards !== "undefined") {
  questionBank.push(...createPdfQuestionBank(pdfFlashcards));
}

const elements = {
  trackSelect: document.querySelector("#trackSelect"),
  resetProgress: document.querySelector("#resetProgress"),
  serviceSearch: document.querySelector("#serviceSearch"),
  categoryFilter: document.querySelector("#categoryFilter"),
  examDate: document.querySelector("#examDate"),
  examCountdown: document.querySelector("#examCountdown"),
  focusServices: document.querySelector("#focusServices"),
  serviceCount: document.querySelector("#serviceCount"),
  answeredCount: document.querySelector("#answeredCount"),
  accuracyRate: document.querySelector("#accuracyRate"),
  weakServiceCount: document.querySelector("#weakServiceCount"),
  questionDomain: document.querySelector("#questionDomain"),
  questionCounter: document.querySelector("#questionCounter"),
  questionLevel: document.querySelector("#questionLevel"),
  questionCert: document.querySelector("#questionCert"),
  questionText: document.querySelector("#questionText"),
  answerList: document.querySelector("#answerList"),
  submitAnswer: document.querySelector("#submitAnswer"),
  showHint: document.querySelector("#showHint"),
  explanationBox: document.querySelector("#explanationBox"),
  confidencePanel: document.querySelector("#confidencePanel"),
  confidenceHint: document.querySelector("#confidenceHint"),
  confidenceOptions: document.querySelector("#confidenceOptions"),
  prevQuestion: document.querySelector("#prevQuestion"),
  nextQuestion: document.querySelector("#nextQuestion"),
  relatedServices: document.querySelector("#relatedServices"),
  relatedCount: document.querySelector("#relatedCount"),
  serviceDetail: document.querySelector("#serviceDetail"),
  favoriteService: document.querySelector("#favoriteService"),
  serviceLibrary: document.querySelector("#serviceLibrary"),
  categoryMap: document.querySelector("#categoryMap"),
  reviewList: document.querySelector("#reviewList"),
  clearMistakes: document.querySelector("#clearMistakes"),
  shuffleService: document.querySelector("#shuffleService"),
  pomodoroCount: document.querySelector("#pomodoroCount"),
  timerModeLabel: document.querySelector("#timerModeLabel"),
  timerDisplay: document.querySelector("#timerDisplay"),
  timerStatus: document.querySelector("#timerStatus"),
  focusMinutes: document.querySelector("#focusMinutes"),
  shortMinutes: document.querySelector("#shortMinutes"),
  longMinutes: document.querySelector("#longMinutes"),
  timerStart: document.querySelector("#timerStart"),
  timerPause: document.querySelector("#timerPause"),
  timerReset: document.querySelector("#timerReset")
};

const progressKey = "aws-cert-workbench-progress-v4";
const favoritesKey = "aws-cert-workbench-favorites-v4";
const timerKey = "aws-cert-workbench-timer-v1";
const timerSettingsKey = "aws-cert-workbench-timer-settings-v1";
const examDateKey = "aws-cert-workbench-exam-date-v1";
const savedTimerSettings = loadTimerSettings();
applyTimerSettings(savedTimerSettings);

const state = {
  view: "practice",
  track: "all",
  category: "all",
  query: "",
  questionIndex: 0,
  selectedAnswer: null,
  answered: false,
  selectedServiceId: "s3",
  progress: loadJson(progressKey, {}),
  favorites: new Set(loadJson(favoritesKey, ["s3", "iam", "vpc", "lambda"])),
  examDate: localStorage.getItem(examDateKey) || "",
  timerSettings: savedTimerSettings,
  questionOrders: {},
  optionOrders: {},
  timer: loadTimerState()
};

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function clampMinutes(value, fallback, min = 1, max = 180) {
  const minutes = Number(value);
  if (!Number.isFinite(minutes)) return fallback;
  return Math.max(min, Math.min(max, Math.round(minutes)));
}

function loadTimerSettings() {
  const saved = loadJson(timerSettingsKey, defaultTimerSettings);
  return {
    focus: clampMinutes(saved.focus, defaultTimerSettings.focus, 1, 180),
    short: clampMinutes(saved.short, defaultTimerSettings.short, 1, 60),
    long: clampMinutes(saved.long, defaultTimerSettings.long, 1, 120)
  };
}

function timerStatusFor(mode, minutes) {
  const labels = {
    focus: `${minutes}分集中して、休憩に進みます。`,
    short: `${minutes}分休憩して、次の問題に戻ります。`,
    long: `${minutes}分休憩して、まとまった復習に備えます。`
  };
  return labels[mode];
}

function applyTimerSettings(settings) {
  Object.entries(settings).forEach(([mode, minutes]) => {
    if (!timerModes[mode]) return;
    timerModes[mode].seconds = minutes * 60;
    timerModes[mode].status = timerStatusFor(mode, minutes);
  });
}

function loadTimerState() {
  const saved = loadJson(timerKey, null);
  if (!saved || !timerModes[saved.mode]) {
    return {
      mode: "focus",
      remaining: timerModes.focus.seconds,
      running: false,
      targetEnd: null,
      completed: 0,
      message: timerModes.focus.status
    };
  }
  const mode = saved.mode;
  return {
    mode,
    remaining: clampSeconds(saved.remaining, timerModes[mode].seconds),
    running: false,
    targetEnd: null,
    completed: Number.isFinite(saved.completed) ? saved.completed : 0,
    message: saved.message || timerModes[mode].status
  };
}

function clampSeconds(value, fallback) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds)) return fallback;
  return Math.max(0, Math.min(seconds, fallback));
}

function saveProgress() {
  localStorage.setItem(progressKey, JSON.stringify(state.progress));
  localStorage.setItem(favoritesKey, JSON.stringify([...state.favorites]));
}

function saveTimer() {
  localStorage.setItem(
    timerKey,
    JSON.stringify({
      mode: state.timer.mode,
      remaining: state.timer.remaining,
      completed: state.timer.completed,
      message: state.timer.message
    })
  );
}

function saveTimerSettings() {
  localStorage.setItem(timerSettingsKey, JSON.stringify(state.timerSettings));
}

function getService(id) {
  return services.find((service) => service.id === id);
}

function getCategory(id) {
  return categories.find((category) => category.id === id);
}

function trackLabel(track) {
  const labels = {
    "cloud-practitioner": "CLF-C02",
    "solutions-architect": "SAA-C03",
    "pdf-flashcards": "PDF暗記150問"
  };
  return labels[track] || "CLF + SAA";
}

function filteredServices() {
  const query = state.query.trim().toLowerCase();
  return services.filter((service) => {
    const inCategory = state.category === "all" || service.category === state.category;
    const text = `${service.name} ${service.fullName} ${service.summary} ${service.tags.join(" ")}`.toLowerCase();
    return inCategory && (!query || text.includes(query));
  });
}

function shuffleArray(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function baseQuestionsForTrack(track = state.track) {
  return questionBank.filter((question) => {
    if (track === "all") {
      return question.tracks.some((questionTrack) => {
        return ["cloud-practitioner", "solutions-architect"].includes(questionTrack);
      });
    }
    return question.tracks.includes(track);
  });
}

function ensureQuestionOrder() {
  const key = state.track;
  const pool = baseQuestionsForTrack(key);
  const ids = pool.map((question) => question.id);
  const currentOrder = state.questionOrders[key] || [];
  const isValid = ids.length === currentOrder.length && ids.every((id) => currentOrder.includes(id));

  if (!isValid) {
    state.questionOrders[key] = shuffleArray(ids);
  }

  return state.questionOrders[key];
}

function questionsForCurrentTrack() {
  const pool = baseQuestionsForTrack();
  const byId = new Map(pool.map((question) => [question.id, question]));
  const ordered = ensureQuestionOrder().map((id) => byId.get(id)).filter(Boolean);
  return ordered.length ? ordered : pool;
}

function filteredQuestions() {
  const filtered = questionsForCurrentTrack();
  return filtered.length ? filtered : questionBank;
}

function ensureOptionOrder(question) {
  const currentOrder = state.optionOrders[question.id] || [];
  const expected = question.options.map((_, index) => index);
  const isValid = expected.length === currentOrder.length && expected.every((index) => currentOrder.includes(index));

  if (!isValid) {
    state.optionOrders[question.id] = shuffleArray(expected);
  }

  return state.optionOrders[question.id];
}

function currentQuestion() {
  const questions = filteredQuestions();
  if (state.questionIndex >= questions.length) state.questionIndex = 0;
  return questions[state.questionIndex];
}

function addHours(date, hours) {
  const next = new Date(date);
  next.setTime(next.getTime() + hours * 3600000);
  return next;
}

function addDays(date, days) {
  return addHours(date, days * 24);
}

function nextReviewDate(attempt, confidenceValue, answeredAt = new Date()) {
  const confidence = confidenceLevels.find((level) => level.value === Number(confidenceValue));
  if (!confidence) return new Date(answeredAt);
  const attempts = Math.max(1, Number(attempt?.attempts) || 1);
  const correctAttempts = Math.max(0, Number(attempt?.correctAttempts) || (attempt?.correct ? 1 : 0));
  const correctRate = attempts ? correctAttempts / attempts : 0;
  const baseHours = attempt?.correct ? confidence.correctHours : confidence.failHours;
  const stability = Math.max(0, attempts - 1) * 0.45 + correctRate * 0.9;
  const multiplier = attempt?.correct ? Math.pow(1.7, stability) : 0.45 + correctRate * 0.35;
  const maxHours = examMaxReviewHours(answeredAt);
  const intervalHours = Math.max(1 / 12, Math.min(baseHours * multiplier, maxHours));
  return addHours(answeredAt, intervalHours);
}

function examMaxReviewHours(fromDate = new Date()) {
  if (!state?.examDate) return 14 * 24;
  const exam = new Date(`${state.examDate}T00:00:00`);
  if (Number.isNaN(exam.getTime())) return 14 * 24;
  const days = Math.ceil((exam - fromDate) / 86400000);
  if (days <= 1) return 6;
  if (days <= 7) return 24;
  return Math.min(14 * 24, Math.max(24, Math.floor((days * 24) / 2)));
}

function isDue(attempt, now = new Date()) {
  if (!attempt) return false;
  if (!attempt.confidence) return true;
  const nextReviewAt = attempt.nextReviewAt ? new Date(attempt.nextReviewAt) : new Date(attempt.answeredAt);
  return nextReviewAt <= now;
}

function reviewPriority(attempt) {
  if (!attempt) return 0;
  const confidence = attempt.confidence || 0;
  return (attempt.correct ? 0 : 10) + (5 - confidence);
}

function reviewItems(includeUpcoming = false) {
  const now = new Date();
  return questionsForCurrentTrack()
    .map((question) => ({ question, attempt: state.progress[question.id] }))
    .filter(({ attempt }) => {
      if (!attempt) return false;
      return includeUpcoming || isDue(attempt, now);
    })
    .sort((left, right) => {
      const leftDue = left.attempt.nextReviewAt || left.attempt.answeredAt;
      const rightDue = right.attempt.nextReviewAt || right.attempt.answeredAt;
      return reviewPriority(right.attempt) - reviewPriority(left.attempt) || new Date(leftDue) - new Date(rightDue);
    });
}

function formatReviewDate(value) {
  if (!value) return "今すぐ";
  const date = new Date(value);
  const diffMs = date - new Date();
  if (diffMs <= 0) return "今すぐ";
  const diffMinutes = Math.ceil(diffMs / 60000);
  if (diffMinutes < 60) return `${diffMinutes}分後`;
  const diffHours = Math.ceil(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}時間後`;
  const diffDays = Math.ceil(diffHours / 24);
  if (diffDays === 1) return "明日";
  return `${diffDays}日後`;
}

function confidenceLabel(value) {
  return confidenceLevels.find((level) => level.value === Number(value))?.label || "未評価";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[char];
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

let serviceTermPattern = null;
let serviceTermMap = null;

function buildServiceTermIndex() {
  if (serviceTermPattern && serviceTermMap) return;

  serviceTermMap = new Map();
  const aliases = {
    ec2: ["EC2", "Amazon EC2"],
    lambda: ["Lambda", "AWS Lambda"],
    ecs: ["ECS", "Amazon ECS"],
    eks: ["EKS", "Amazon EKS", "Kubernetes"],
    s3: ["S3", "Amazon S3"],
    ebs: ["EBS", "Amazon EBS"],
    efs: ["EFS", "Amazon EFS"],
    rds: ["RDS", "Amazon RDS"],
    aurora: ["Aurora", "Amazon Aurora"],
    dynamodb: ["DynamoDB", "Amazon DynamoDB"],
    elasticache: ["ElastiCache", "Amazon ElastiCache", "Redis"],
    vpc: ["VPC", "Amazon VPC"],
    route53: ["Route 53", "Amazon Route 53"],
    cloudfront: ["CloudFront", "Amazon CloudFront"],
    directconnect: ["Direct Connect", "AWS Direct Connect"],
    iam: ["IAM", "AWS IAM"],
    organizations: ["Organizations", "AWS Organizations"],
    kms: ["KMS", "AWS KMS"],
    secretsmanager: ["Secrets Manager", "AWS Secrets Manager"],
    waf: ["WAF", "AWS WAF"],
    guardduty: ["GuardDuty", "Amazon GuardDuty"],
    sqs: ["SQS", "Amazon SQS"],
    sns: ["SNS", "Amazon SNS"],
    eventbridge: ["EventBridge", "Amazon EventBridge"],
    stepfunctions: ["Step Functions", "AWS Step Functions"],
    cloudtrail: ["CloudTrail", "AWS CloudTrail"],
    cloudwatch: ["CloudWatch", "Amazon CloudWatch"],
    config: ["Config", "AWS Config"],
    cloudformation: ["CloudFormation", "AWS CloudFormation"],
    systemsmanager: ["Systems Manager", "AWS Systems Manager", "Parameter Store"],
    athena: ["Athena", "Amazon Athena"],
    redshift: ["Redshift", "Amazon Redshift"],
    apigateway: ["API Gateway", "Amazon API Gateway"],
    dms: ["DMS", "AWS DMS", "Database Migration Service"],
    elb: ["Elastic Load Balancing", "ELB", "ALB", "NLB", "Application Load Balancer"],
    autoscaling: ["Auto Scaling", "AWS Auto Scaling"],
    costexplorer: ["Cost Explorer", "AWS Cost Explorer"],
    budgets: ["Budgets", "AWS Budgets"],
    trustedadvisor: ["Trusted Advisor", "AWS Trusted Advisor"],
    fargate: ["Fargate", "AWS Fargate"],
    transitgateway: ["Transit Gateway", "AWS Transit Gateway"],
    vpn: ["Site-to-Site VPN", "AWS Site-to-Site VPN"],
    acm: ["Certificate Manager", "AWS Certificate Manager", "ACM"],
    shield: ["Shield", "AWS Shield"],
    cognito: ["Cognito", "Amazon Cognito"],
    backup: ["Backup", "AWS Backup"],
    storagegateway: ["Storage Gateway", "AWS Storage Gateway"],
    fsx: ["FSx", "Amazon FSx"],
    ram: ["RAM", "AWS RAM", "Resource Access Manager"],
    privatelink: ["PrivateLink", "AWS PrivateLink", "VPCエンドポイント"],
    controltower: ["Control Tower", "AWS Control Tower"],
    health: ["Health Dashboard", "AWS Health Dashboard"],
    lightsail: ["Lightsail", "Amazon Lightsail"],
    datasync: ["DataSync", "AWS DataSync"]
  };

  services.forEach((service) => {
    [service.name, service.fullName, ...(aliases[service.id] || [])]
      .filter(Boolean)
      .forEach((term) => serviceTermMap.set(term.toLowerCase(), service.id));
  });

  const terms = [...serviceTermMap.keys()].sort((left, right) => right.length - left.length);
  serviceTermPattern = new RegExp(terms.map(escapeRegExp).join("|"), "gi");
}

function linkServiceTerms(text) {
  buildServiceTermIndex();
  let html = "";
  let lastIndex = 0;

  String(text).replace(serviceTermPattern, (match, offset) => {
    const serviceId = serviceTermMap.get(match.toLowerCase());
    html += escapeHtml(String(text).slice(lastIndex, offset));
    html += `<button class="service-term" type="button" data-service-id="${serviceId}" title="サービス概要へ移動">${escapeHtml(match)}</button>`;
    lastIndex = offset + match.length;
    return match;
  });

  html += escapeHtml(String(text).slice(lastIndex));
  return html;
}

function render() {
  elements.trackSelect.value = state.track;
  elements.categoryFilter.value = state.category;
  elements.serviceSearch.value = state.query;
  renderStats();
  renderView();
  renderExamDate();
  renderTimer();
  renderFocusServices();
  renderQuestion();
  renderServiceDetail();
  renderLibrary();
  renderReview();
}

function renderStats() {
  const questions = questionsForCurrentTrack();
  const attempts = questions.map((question) => state.progress[question.id]).filter(Boolean);
  const answered = attempts.reduce((total, attempt) => total + (Number(attempt.attempts) || 1), 0);
  const correct = attempts.reduce((total, attempt) => total + (Number(attempt.correctAttempts) || (attempt.correct ? 1 : 0)), 0);
  const dueCount = reviewItems(false).length;

  elements.answeredCount.textContent = answered;
  elements.accuracyRate.textContent = answered ? `${Math.round((correct / answered) * 100)}%` : "0%";
  elements.weakServiceCount.textContent = dueCount;
}

function renderExamDate() {
  elements.examDate.value = state.examDate;
  if (!state.examDate) {
    elements.examCountdown.textContent = "未設定";
    return;
  }
  const exam = new Date(`${state.examDate}T00:00:00`);
  if (Number.isNaN(exam.getTime())) {
    elements.examCountdown.textContent = "日付を確認";
    return;
  }
  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffDays = Math.ceil((exam - startToday) / 86400000);
  if (diffDays < 0) {
    elements.examCountdown.textContent = `${Math.abs(diffDays)}日前`;
  } else if (diffDays === 0) {
    elements.examCountdown.textContent = "試験日";
  } else {
    elements.examCountdown.textContent = `あと${diffDays}日`;
  }
}

function renderView() {
  document.querySelectorAll("[data-view]").forEach((view) => {
    view.classList.toggle("is-visible", view.dataset.view === state.view);
  });
  document.querySelectorAll("[data-view-button]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.viewButton === state.view);
  });
}

function renderTimer() {
  const mode = timerModes[state.timer.mode];
  const minutes = Math.floor(state.timer.remaining / 60);
  const seconds = state.timer.remaining % 60;
  elements.timerModeLabel.textContent = mode.label;
  elements.timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  elements.timerStatus.textContent = state.timer.message || mode.status;
  elements.pomodoroCount.textContent = `${state.timer.completed}回`;
  elements.timerStart.textContent = state.timer.running ? "進行中" : "開始";
  elements.timerStart.disabled = state.timer.running;
  elements.timerPause.disabled = !state.timer.running;
  syncInputValue(elements.focusMinutes, state.timerSettings.focus);
  syncInputValue(elements.shortMinutes, state.timerSettings.short);
  syncInputValue(elements.longMinutes, state.timerSettings.long);

  document.querySelectorAll("[data-timer-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.timerMode === state.timer.mode);
    button.textContent = state.timerSettings[button.dataset.timerMode];
  });
}

function syncInputValue(input, value) {
  if (document.activeElement !== input) {
    input.value = value;
  }
}

function renderFocusServices() {
  const weak = new Set();
  questionsForCurrentTrack().forEach((question) => {
    const attempt = state.progress[question.id];
    if (attempt && (!attempt.correct || !attempt.confidence || attempt.confidence <= 2 || isDue(attempt))) {
      question?.services.forEach((serviceId) => weak.add(serviceId));
    }
  });

  const focusIds = [...new Set([...weak, ...state.favorites])].slice(0, 12);
  const focusServices = focusIds.map(getService).filter(Boolean);
  elements.serviceCount.textContent = services.length;

  if (!focusServices.length) {
    elements.focusServices.innerHTML = `<p class="empty-state">重点サービスはまだありません。</p>`;
    return;
  }

  elements.focusServices.innerHTML = focusServices
    .map((service) => {
      const category = getCategory(service.category);
      return `
        <button class="focus-item ${service.id === state.selectedServiceId ? "is-selected" : ""}" type="button" data-service-id="${service.id}">
          <span class="item-name">${service.name}</span>
          <span class="item-meta">${category.label} / ${service.tags.slice(0, 2).join("・")}</span>
        </button>
      `;
    })
    .join("");
}

function renderQuestion() {
  const questions = filteredQuestions();
  const question = currentQuestion();
  const prior = state.progress[question.id];
  const optionOrder = ensureOptionOrder(question);
  const relatedServices = question.services.map(getService).filter(Boolean);

  elements.questionDomain.textContent = question.domain;
  elements.questionCounter.textContent = `${state.questionIndex + 1} / ${questions.length}`;
  elements.questionLevel.textContent = question.level;
  elements.questionCert.textContent = question.tracks.map(trackLabel).join(" / ");
  elements.questionText.innerHTML = linkServiceTerms(question.prompt);
  elements.submitAnswer.disabled = true;
  elements.showHint.disabled = relatedServices.length === 0;
  elements.showHint.textContent = relatedServices.length ? "関連サービスを見る" : "関連サービスなし";
  elements.explanationBox.hidden = !state.answered && !prior;
  elements.confidencePanel.hidden = !state.answered;

  elements.answerList.innerHTML = question.options
    .map((_, displayIndex) => {
      const index = optionOrder[displayIndex];
      const option = question.options[index];
      const classes = ["answer-option"];
      if (state.selectedAnswer === index) classes.push("is-selected");
      if (state.answered && index === question.answer) classes.push("is-correct");
      if (state.answered && state.selectedAnswer === index && index !== question.answer) classes.push("is-wrong");
      return `
        <div class="${classes.join(" ")}" role="button" tabindex="${state.answered ? "-1" : "0"}" data-answer-index="${index}" aria-disabled="${state.answered ? "true" : "false"}">
          <span class="answer-letter">${String.fromCharCode(65 + displayIndex)}</span>
          <span class="answer-copy">${linkServiceTerms(option)}</span>
        </div>
      `;
    })
    .join("");

  if (state.answered) {
    const correct = state.selectedAnswer === question.answer;
    elements.explanationBox.innerHTML = `
      <strong>${correct ? "正解" : "不正解"}: ${linkServiceTerms(question.options[question.answer])}</strong>
      <span>${linkServiceTerms(question.explanation)}</span>
    `;
  } else if (prior) {
    elements.explanationBox.hidden = false;
    const attempts = Number(prior.attempts) || 1;
    const correctAttempts = Number(prior.correctAttempts) || (prior.correct ? 1 : 0);
    const accuracy = Math.round((correctAttempts / attempts) * 100);
    elements.explanationBox.innerHTML = `
      <strong>前回: ${prior.correct ? "正解" : "不正解"} / 自信度: ${confidenceLabel(prior.confidence)}</strong>
      <span>回答回数: ${attempts}回 / この問題の正答率: ${accuracy}% / 次回復習: ${formatReviewDate(prior.nextReviewAt)}</span>
    `;
  } else {
    elements.explanationBox.innerHTML = "";
  }

  renderConfidenceOptions(question, prior);

  elements.relatedCount.textContent = relatedServices.length;
  elements.relatedServices.innerHTML = relatedServices
    .map((service) => {
      const category = getCategory(service.category);
      return `
        <button class="related-card" type="button" data-service-id="${service.id}">
          <span class="item-name">${service.name}</span>
          <span class="item-meta">${category.label}</span>
          <p>${service.summary}</p>
        </button>
      `;
    })
    .join("");
}

function renderConfidenceOptions(question, attempt) {
  if (!state.answered && !attempt) {
    elements.confidenceOptions.innerHTML = "";
    return;
  }

  const activeAttempt = state.progress[question.id] || attempt;
  const nextReviewAt = activeAttempt?.nextReviewAt ? formatReviewDate(activeAttempt.nextReviewAt) : "今すぐ";
  elements.confidenceHint.textContent = activeAttempt?.confidence
    ? `現在の自信度は「${confidenceLabel(activeAttempt.confidence)}」。次回復習は ${nextReviewAt} です。`
    : "自信度を選ぶまで、この問題は復習待ちに残ります。";

  elements.confidenceOptions.innerHTML = confidenceLevels
    .map((level) => {
      const selected = activeAttempt?.confidence === level.value;
      const reviewAt = activeAttempt ? formatReviewDate(nextReviewDate(activeAttempt, level.value, new Date())) : level.detail;
      return `
        <button class="confidence-option ${selected ? "is-selected" : ""}" type="button" data-confidence="${level.value}">
          <span class="confidence-score">${level.value}. ${level.label}</span>
          <span class="confidence-label">${reviewAt}</span>
        </button>
      `;
    })
    .join("");
}

function renderServiceDetail() {
  const service = getService(state.selectedServiceId) || services[0];
  const category = getCategory(service.category);
  const favorite = state.favorites.has(service.id);
  elements.favoriteService.textContent = favorite ? "★" : "☆";
  elements.favoriteService.setAttribute("aria-label", favorite ? "重要サービスから外す" : "重要サービスに追加");

  elements.serviceDetail.innerHTML = `
    <h2 class="service-title">${service.name}</h2>
    <p class="service-full">${service.fullName}</p>
    <div class="tag-row">
      <span class="tag">${category.label}</span>
      ${service.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <section class="brief-section">
      <h3>概要</h3>
      <p>${service.summary}</p>
    </section>
    <section class="brief-section">
      <h3>選びどころ</h3>
      <ul>${service.chooseWhen.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
    <section class="brief-section">
      <h3>混同ポイント</h3>
      <p>${service.watchOut}</p>
    </section>
  `;
}

function renderLibrary() {
  const currentServices = filteredServices();

  elements.categoryMap.innerHTML = categories
    .map((category) => {
      const count = services.filter((service) => service.category === category.id).length;
      const examples = services
        .filter((service) => service.category === category.id)
        .slice(0, 3)
        .map((service) => service.name.replace("Amazon ", "").replace("AWS ", ""))
        .join(" / ");
      return `
        <button class="map-node" data-tone="${category.tone}" data-category-id="${category.id}" type="button">
          <strong>${category.label}</strong>
          <span>${count}サービス: ${examples}</span>
        </button>
      `;
    })
    .join("");

  if (!currentServices.length) {
    elements.serviceLibrary.innerHTML = `<p class="empty-state">条件に合うサービスがありません。</p>`;
    return;
  }

  elements.serviceLibrary.innerHTML = currentServices
    .map((service) => {
      const category = getCategory(service.category);
      return `
        <button class="service-card" type="button" data-service-id="${service.id}">
          <span class="item-name">${service.name}</span>
          <span class="item-meta">${category.label} / ${service.fullName}</span>
          <p>${service.summary}</p>
          <span class="tag-row">${service.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</span>
        </button>
      `;
    })
    .join("");
}

function renderReview() {
  const dueItems = reviewItems(false);
  const items = dueItems.length ? dueItems : reviewItems(true).slice(0, 6);

  if (!items.length) {
    elements.reviewList.innerHTML = `<p class="empty-state">まだ回答履歴がありません。演習で回答し、自信度を選ぶと復習予定が作られます。</p>`;
    return;
  }

  elements.reviewList.innerHTML = items
    .map(({ question, attempt }) => {
      const names = question.services.map(getService).filter(Boolean).map((service) => service.name).join(" / ");
      const due = isDue(attempt);
      const status = due ? "復習待ち" : `次回: ${formatReviewDate(attempt.nextReviewAt)}`;
      const attempts = Number(attempt.attempts) || 1;
      const correctAttempts = Number(attempt.correctAttempts) || (attempt.correct ? 1 : 0);
      const accuracy = Math.round((correctAttempts / attempts) * 100);
      return `
        <button class="review-item" type="button" data-question-id="${question.id}">
          <span class="item-name">${question.domain}</span>
          <span class="item-meta">${trackLabel(question.tracks[0])} / ${names}</span>
          <p>${question.prompt}</p>
          <span class="review-status ${due ? "" : "is-later"}">${status} / ${attempt.correct ? "正解" : "不正解"} / ${accuracy}% / ${attempts}回 / 自信度: ${confidenceLabel(attempt.confidence)}</span>
        </button>
      `;
    })
    .join("");
}

function selectService(serviceId, view = state.view) {
  if (!getService(serviceId)) return;
  state.selectedServiceId = serviceId;
  state.view = view;
  render();
}

function goToQuestion(index) {
  const questions = filteredQuestions();
  state.questionIndex = (index + questions.length) % questions.length;
  const question = currentQuestion();
  state.selectedAnswer = null;
  state.answered = false;
  if (question.services[0]) {
    state.selectedServiceId = question.services[0];
  }
  render();
}

function submitCurrentAnswer(answerIndex) {
  const question = currentQuestion();
  if (state.answered || !Number.isInteger(answerIndex)) return;
  const answeredAt = new Date();
  const prior = state.progress[question.id] || {};
  const correct = answerIndex === question.answer;
  const attempts = (Number(prior.attempts) || 0) + 1;
  const correctAttempts = (Number(prior.correctAttempts) || (prior.correct ? 1 : 0)) + (correct ? 1 : 0);

  state.selectedAnswer = answerIndex;
  state.answered = true;
  state.progress[question.id] = {
    questionId: question.id,
    selectedAnswer: answerIndex,
    correct,
    confidence: null,
    nextReviewAt: answeredAt.toISOString(),
    attempts,
    correctAttempts,
    answeredAt: answeredAt.toISOString()
  };
  if (!correct) {
    question.services.forEach((serviceId) => state.favorites.add(serviceId));
  }
  saveProgress();
  render();
}

function setConfidence(confidenceValue) {
  const question = currentQuestion();
  const attempt = state.progress[question.id];
  if (!attempt) return;
  const confidence = Number(confidenceValue);
  const nextReviewAt = nextReviewDate(attempt, confidence, new Date()).toISOString();
  state.progress[question.id] = {
    ...attempt,
    confidence,
    nextReviewAt
  };
  if (confidence <= 2 || !attempt.correct) {
    question.services.forEach((serviceId) => state.favorites.add(serviceId));
  }
  saveProgress();
  render();
}

function setTimerMode(mode) {
  if (!timerModes[mode]) return;
  state.timer.mode = mode;
  state.timer.remaining = timerModes[mode].seconds;
  state.timer.running = false;
  state.timer.targetEnd = null;
  state.timer.message = timerModes[mode].status;
  saveTimer();
  renderTimer();
}

function updateTimerSetting(mode, value) {
  if (!timerModes[mode]) return;
  const limits = {
    focus: [1, 180],
    short: [1, 60],
    long: [1, 120]
  };
  const [min, max] = limits[mode];
  const minutes = clampMinutes(value, state.timerSettings[mode], min, max);
  state.timerSettings[mode] = minutes;
  applyTimerSettings(state.timerSettings);
  if (!state.timer.running && state.timer.mode === mode) {
    state.timer.remaining = timerModes[mode].seconds;
    state.timer.message = timerModes[mode].status;
  }
  saveTimerSettings();
  saveTimer();
  renderTimer();
}

function startTimer() {
  if (state.timer.running || state.timer.remaining <= 0) return;
  state.timer.running = true;
  state.timer.targetEnd = Date.now() + state.timer.remaining * 1000;
  state.timer.message = `${timerModes[state.timer.mode].label}中です。`;
  renderTimer();
}

function pauseTimer() {
  if (!state.timer.running) return;
  state.timer.remaining = Math.max(0, Math.ceil((state.timer.targetEnd - Date.now()) / 1000));
  state.timer.running = false;
  state.timer.targetEnd = null;
  state.timer.message = "一時停止中です。";
  saveTimer();
  renderTimer();
}

function resetTimer() {
  const mode = timerModes[state.timer.mode];
  state.timer.remaining = mode.seconds;
  state.timer.running = false;
  state.timer.targetEnd = null;
  state.timer.message = mode.status;
  saveTimer();
  renderTimer();
}

function tickTimer() {
  if (!state.timer.running) return;
  state.timer.remaining = Math.max(0, Math.ceil((state.timer.targetEnd - Date.now()) / 1000));
  if (state.timer.remaining > 0) {
    renderTimer();
    return;
  }

  const finishedMode = state.timer.mode;
  state.timer.running = false;
  state.timer.targetEnd = null;
  if (finishedMode === "focus") {
    state.timer.completed += 1;
    state.timer.mode = state.timer.completed % 4 === 0 ? "long" : "short";
    state.timer.remaining = timerModes[state.timer.mode].seconds;
    state.timer.message = "集中完了。休憩を開始できます。";
  } else {
    state.timer.mode = "focus";
    state.timer.remaining = timerModes.focus.seconds;
    state.timer.message = "休憩完了。次の集中を開始できます。";
  }
  saveTimer();
  renderTimer();
}

function handlePracticeShortcuts(event) {
  const target = event.target;
  if (target?.closest?.("input, select, textarea, button, [contenteditable='true']")) return;
  if (state.view !== "practice") return;

  const letterIndex = ["a", "b", "c", "d"].indexOf(event.key.toLowerCase());
  const number = Number(event.key);
  const choiceNumber = Number.isInteger(number) && number >= 1 && number <= 4 ? number : letterIndex + 1;
  if (choiceNumber >= 1 && choiceNumber <= 4) {
    event.preventDefault();
    if (state.answered) {
      setConfidence(choiceNumber);
      return;
    }
    const question = currentQuestion();
    const optionIndex = ensureOptionOrder(question)[choiceNumber - 1];
    submitCurrentAnswer(optionIndex);
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    goToQuestion(state.questionIndex + 1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    goToQuestion(state.questionIndex - 1);
  }
}

function initControls() {
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.label;
    elements.categoryFilter.append(option);
  });

  document.querySelectorAll("[data-view-button]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.viewButton;
      render();
    });
  });

  document.querySelectorAll("[data-timer-mode]").forEach((button) => {
    button.addEventListener("click", () => setTimerMode(button.dataset.timerMode));
  });

  elements.timerStart.addEventListener("click", startTimer);
  elements.timerPause.addEventListener("click", pauseTimer);
  elements.timerReset.addEventListener("click", resetTimer);
  elements.focusMinutes.addEventListener("change", (event) => updateTimerSetting("focus", event.target.value));
  elements.shortMinutes.addEventListener("change", (event) => updateTimerSetting("short", event.target.value));
  elements.longMinutes.addEventListener("change", (event) => updateTimerSetting("long", event.target.value));

  elements.trackSelect.addEventListener("change", (event) => {
    state.track = event.target.value;
    goToQuestion(0);
  });

  elements.examDate.addEventListener("change", (event) => {
    state.examDate = event.target.value;
    localStorage.setItem(examDateKey, state.examDate);
    renderExamDate();
    renderConfidenceOptions(currentQuestion(), state.progress[currentQuestion().id]);
    renderReview();
  });

  elements.serviceSearch.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderFocusServices();
    renderLibrary();
  });

  elements.categoryFilter.addEventListener("change", (event) => {
    state.category = event.target.value;
    renderLibrary();
  });

  elements.answerList.addEventListener("click", (event) => {
    if (event.target.closest("[data-service-id]")) return;
    const button = event.target.closest("[data-answer-index]");
    if (!button || state.answered) return;
    submitCurrentAnswer(Number(button.dataset.answerIndex));
  });

  elements.answerList.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key) || state.answered) return;
    const option = event.target.closest("[data-answer-index]");
    if (!option) return;
    event.preventDefault();
    submitCurrentAnswer(Number(option.dataset.answerIndex));
  });

  elements.submitAnswer.addEventListener("click", () => {
    if (state.selectedAnswer === null) return;
    submitCurrentAnswer(state.selectedAnswer);
  });

  elements.confidenceOptions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-confidence]");
    if (!button) return;
    setConfidence(Number(button.dataset.confidence));
  });

  document.addEventListener("keydown", handlePracticeShortcuts);

  elements.prevQuestion.addEventListener("click", () => goToQuestion(state.questionIndex - 1));
  elements.nextQuestion.addEventListener("click", () => goToQuestion(state.questionIndex + 1));

  elements.showHint.addEventListener("click", () => {
    const question = currentQuestion();
    if (!question.services[0]) return;
    selectService(question.services[0], "practice");
    document.querySelector(".service-drawer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.body.addEventListener("click", (event) => {
    const serviceButton = event.target.closest("[data-service-id]");
    if (serviceButton) {
      selectService(serviceButton.dataset.serviceId, state.view);
      if (serviceButton.classList.contains("service-term")) {
        document.querySelector(".service-drawer")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    const categoryButton = event.target.closest("[data-category-id]");
    if (categoryButton) {
      state.category = categoryButton.dataset.categoryId;
      elements.categoryFilter.value = state.category;
      renderLibrary();
    }

    const reviewButton = event.target.closest("[data-question-id]");
    if (reviewButton) {
      const questions = filteredQuestions();
      const index = questions.findIndex((question) => question.id === reviewButton.dataset.questionId);
      state.view = "practice";
      goToQuestion(index >= 0 ? index : 0);
    }
  });

  elements.favoriteService.addEventListener("click", () => {
    if (state.favorites.has(state.selectedServiceId)) {
      state.favorites.delete(state.selectedServiceId);
    } else {
      state.favorites.add(state.selectedServiceId);
    }
    saveProgress();
    render();
  });

  elements.shuffleService.addEventListener("click", () => {
    const currentServices = filteredServices();
    const pool = currentServices.length ? currentServices : services;
    const random = pool[Math.floor(Math.random() * pool.length)];
    selectService(random.id, "library");
  });

  elements.clearMistakes.addEventListener("click", () => {
    const later = addHours(new Date(), 1).toISOString();
    reviewItems(false).forEach(({ question, attempt }) => {
      state.progress[question.id] = {
        ...attempt,
        confidence: attempt.confidence || 2,
        nextReviewAt: later
      };
    });
    saveProgress();
    render();
  });

  elements.resetProgress.addEventListener("click", () => {
    const confirmed = window.confirm("回答履歴と重要サービスをリセットしますか？");
    if (!confirmed) return;
    state.progress = {};
    state.favorites = new Set(["s3", "iam", "vpc", "lambda"]);
    saveProgress();
    goToQuestion(0);
  });
}

initControls();
setInterval(tickTimer, 1000);
goToQuestion(0);
