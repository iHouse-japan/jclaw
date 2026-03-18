import type {AppLocale} from '@/i18n/routing';

type Card = {
  title: string;
  body: string;
};

type BulletSection = {
  title: string;
  intro: string;
  bullets: string[];
};

type Seo = {
  title: string;
  description: string;
};

type Metric = {
  label: string;
  value: string;
};

type StatusItem = {
  name: string;
  state: string;
};

type SignalCard = Card & {
  tone?: 'brand' | 'indigo' | 'neutral';
};

type Hero = {
  eyebrow: string;
  title: string;
  intro: string;
  note: string;
  roadmapNote: string;
  points: string[];
  proofBadges: string[];
  preview: {
    eyebrow: string;
    title: string;
    body: string;
    metrics: Metric[];
    workflowLabel: string;
    workflowSteps: string[];
    statusLabel: string;
    statusItems: StatusItem[];
    signalCards: SignalCard[];
  };
};

type CTA = {
  title: string;
  body: string;
  footnote?: string;
};

type HomePageContent = {
  seo: Seo;
  hero: Hero;
  labels: {
    trust: string;
    trustTitle: string;
    whyJapan: string;
    whyJapanTitle: string;
    routes: string;
    routesTitle: string;
    productOverview: string;
    productOverviewTitle: string;
    useCases: string;
    useCasesTitle: string;
    openSourceTag: string;
    roadmapTag: string;
  };
  trustIntro: string;
  trustStrip: Card[];
  whyJapanIntro: string;
  whyJapanCards: Card[];
  routesIntro: string;
  routes: {
    selfHosted: BulletSection;
    cloud: BulletSection;
  };
  productOverviewIntro: string;
  productOverviewCards: Card[];
  useCases: Card[];
  cta: CTA;
};

type DetailPageContent = {
  seo: Seo;
  eyebrow: string;
  title: string;
  intro: string;
  note?: string;
  sections: Array<{
    title: string;
    intro?: string;
    cards?: Card[];
    bullets?: string[];
  }>;
  cta: CTA;
};

type SiteContent = {
  home: HomePageContent;
  selfHosted: DetailPageContent;
  cloud: DetailPageContent;
  security: DetailPageContent;
  contact: DetailPageContent;
};

const siteContent: Record<AppLocale, SiteContent> = {
  ja: {
    home: {
      seo: {
        title: 'JClaw | 日本市場に最適化した Japan-first AI Agent',
        description: 'JClaw は LINE を起点に、自己ホストと将来の公式クラウド托管を両立させる Japan-first AI Agent プラットフォームです。'
      },
      labels: {
        trust: '信頼と安全性',
        trustTitle: '導入判断に必要な信頼情報を先に見せる',
        whyJapan: 'なぜ日本市場か',
        whyJapanTitle: '日本市場を前提にした理由',
        routes: '導入ルート',
        routesTitle: 'Self-Hosted と公式クラウド計画を役割で分けて示す',
        productOverview: 'プロダクト概観',
        productOverviewTitle: '運用者が理解しやすいプロダクト構造を見せる',
        useCases: '利用シーン',
        useCasesTitle: 'まず見せるべきは利用シーン',
        openSourceTag: '公開版',
        roadmapTag: '計画中'
      },
      hero: {
        eyebrow: 'LINE-native AI for Japan',
        title: 'LINE 起点で導入できる、日本市場向け AI Agent。',
        intro:
          'JClaw は Self-Hosted と将来の公式クラウド計画を見据えながら、日本企業の運用条件に合わせて設計する Japan-first AI Agent です。',
        note:
          '派手な約束ではなく、導入判断に必要な情報を先に見せることを優先します。データ処理、人的確認、責任分界、日本語支援を公式サイト上で明示します。',
        roadmapNote:
          'JClaw Cloud は公式クラウド計画として案内中です。現時点で試せる導入ルートは Self-Hosted を前提にします。',
        points: [
          '日本語 UX と日本企業の導入文脈を優先',
          'LINE を主要導線に据えた運用設計',
          'Self-Hosted から始めてクラウド計画へ接続できる'
        ],
        proofBadges: [
          'Self-Hosted 提供中',
          'Cloud は計画表示のみ',
          '人的確認を前提化',
          '日本市場向けサポート設計'
        ],
        preview: {
          eyebrow: '運用イメージ',
          title: '問い合わせ受付からレビュー判断までを、一つの運用画面で見せる。',
          body:
            '静的なプレビューで製品像を見せつつ、現時点で重要なのは管理感・説明責任・日本語運用の見通しであることを伝える。',
          metrics: [
            {label: '入口', value: 'LINE-native'},
            {label: '現在ルート', value: 'Self-Hosted'},
            {label: 'Cloud', value: '計画中'}
          ],
          workflowLabel: '運用フロー',
          workflowSteps: [
            'LINE から問い合わせを受ける',
            'Agent が候補回答を生成する',
            '担当者が内容を確認して返答する',
            '運用判断は自社側で管理する'
          ],
          statusLabel: '現在の前提',
          statusItems: [
            {name: 'データ処理', state: '明示'},
            {name: '人的確認', state: '必須'},
            {name: 'Cloud', state: '計画中'}
          ],
          signalCards: [
            {
              title: '入力データの扱いを曖昧にしない',
              body: 'どこに送られるか、誰が管理するかを説明可能にする。',
              tone: 'brand'
            },
            {
              title: '運用上の確認者を外さない',
              body: 'AI の候補回答と人の判断を同じ導線で見せる。',
              tone: 'indigo'
            },
            {
              title: 'Cloud は roadmap として明記する',
              body: '未提供の運用機能は将来計画としてのみ扱う。',
              tone: 'neutral'
            }
          ]
        }
      },
      trustIntro:
        '日本企業では、AI の便利さだけでなく、データの扱い、誤情報への備え、責任分界、稟議で説明できるかまで同時に見られます。',
      trustStrip: [
        {
          title: 'データ処理',
          body: '入力データの送信先、管理主体、学習利用の扱いを曖昧にしない。'
        },
        {
          title: '人的確認',
          body: 'AI 出力をそのまま使わず、人が確認できる運用前提を置く。'
        },
        {
          title: '責任分界',
          body: 'Self-Hosted と Cloud で誰が何を担うかを先に分けて示す。'
        },
        {
          title: '日本語支援',
          body: '日本語で相談・導入説明・運用支援を受けられる前提を作る。'
        },
        {
          title: '稟議準備',
          body: '安全説明、プライバシー方針、導入形態を稟議前に確認しやすくする。'
        }
      ],
      whyJapanIntro:
        '日本企業では AI 活用の優先度が高い一方で、誤情報、透明性不足、法的責任、個人情報の扱い、稟議負荷への不安が強く残ります。',
      whyJapanCards: [
        {
          title: 'LINE が入口になる',
          body: '海外では Slack や web chat が先でも、日本では LINE が顧客接点・社内運用の入口として自然です。'
        },
        {
          title: '日本語運用の温度感が違う',
          body: '敬語、確認フロー、代理店販売、現場導入支援まで含めて、日本語ネイティブ前提で設計する必要があります。'
        },
        {
          title: 'データ管理の説明が重い',
          body: '自社環境で動かせるか、どこにデータが送られるか、誰が責任を持つかを早い段階で示す必要があります。'
        }
      ],
      routesIntro:
        '公開版はすぐに試せる導入経路として、Cloud は将来の運用集約先として整理し、役割を混ぜずに見せます。',
      routes: {
        selfHosted: {
          title: 'JClaw Self-Hosted',
          intro: '現時点で実在する導入形態。自社サーバー、閉域環境、PoC に向く公開版です。',
          bullets: [
            'LINE webhook とローカル LLM を接続',
            '社内要件に合わせて自社管理で運用',
            'PoC や現場検証を早く始めやすい'
          ]
        },
        cloud: {
          title: 'JClaw Cloud',
          intro: '公式が提供予定の托管版。現時点では roadmap として案内し、既成事実のようには見せない。',
          bullets: [
            'ログ、権限、運用監視の管理面を集約',
            '複数チーム運用や商用導入を支援',
            '日本語サポートと導入支援を前提に設計'
          ]
        }
      },
      productOverviewIntro:
        '主流のオープンソース製品サイトは理念だけでなく、運用にどう入るかも素早く示します。JClaw も導入と運用の理解枠を先に見せます。',
      productOverviewCards: [
        {
          title: 'LINE を入口に据える',
          body: 'LINE を後付けの chat 手段ではなく、実運用の入口として扱う。'
        },
        {
          title: 'Self-Hosted で主導権を持つ',
          body: 'まず自社で制御できる導入ルートを提示し、その上でクラウド化を検討できるようにする。'
        },
        {
          title: '人が確認する運用を前提にする',
          body: 'AI が候補を出し、人が確認して返すという運用前提を最初から見せる。'
        },
        {
          title: '日本語で導入できる状態を作る',
          body: '導入説明、相談導線、稟議準備を日本語で自然に進められる設計にする。'
        }
      ],
      useCases: [
        {
          title: '店舗・接客支援',
          body: '予約、問い合わせ、店頭 QA を LINE 導線で一本化し、現場対応のばらつきを減らす。'
        },
        {
          title: '社内問い合わせ対応',
          body: '総務・人事・営業 FAQ をローカル構成で提供し、社内ナレッジアクセスを軽くする。'
        },
        {
          title: '代理店向け提案パッケージ',
          body: '“日本向け公式 AI Agent” として、説明しやすく売りやすい枠組みに整える。'
        }
      ],
      cta: {
        title: 'まずは展示と相談から始める。',
        body: '初期段階では、価格よりも「安全に試せる」「日本語で相談できる」「将来の運用形態が選べる」を明確に伝える。',
        footnote: 'Cloud の表現はすべて roadmap 前提。未提供機能は将来計画としてのみ記載します。'
      }
    },
    selfHosted: {
      seo: {
        title: 'JClaw Self-Hosted | 日本企業向け自己ホスト AI Agent',
        description: 'JClaw Self-Hosted は LINE とローカル LLM を組み合わせ、自社環境で運用できる公開版です。'
      },
      eyebrow: 'セルフホスト',
      title: '自社環境で始める、Japan-first AI Agent。',
      intro:
        'JClaw Self-Hosted は、現在もっとも現実的に試せる導入形態です。PoC、閉域環境、社内検証に向けて、運用の主導権を自社に残せます。',
      note:
        '現在の runtime リポジトリはこのルートを支える土台です。公式サイトとは分離し、将来的には専用サイトリポジトリに移行する前提で進めます。',
      sections: [
        {
          title: '向いているケース',
          cards: [
            {
              title: '個人情報の扱いを厳密に見たい',
              body: '入力データの送信先や保持範囲を自社で把握しやすい構成にしたいケース。'
            },
            {
              title: 'PoC を素早く回したい',
              body: 'まず現場で動かして価値を見たいが、いきなり托管型に寄せたくないケース。'
            },
            {
              title: '社内情シスと相談しながら進めたい',
              body: '導入前にネットワーク、権限、サーバー要件を自社基準で確認したいケース。'
            }
          ]
        },
        {
          title: '現在の実装で担えること',
          bullets: [
            'LINE webhook と Ollama ベースのローカル LLM 連携',
            '会話メモリを持つシンプルな AI アシスタント体験',
            '社内検証向けの軽量な自己ホスト構成'
          ]
        },
        {
          title: '最初に説明すべき制約',
          bullets: [
            '現状は runtime 中心で、管理画面や監査機能はまだ含まれない',
            '本番運用にはログ、永続化、権限、監視など追加設計が必要',
            'Cloud のような運用代行価値は、このルートでは提供しない'
          ]
        }
      ],
      cta: {
        title: 'まずは Self-Hosted の適合性を確認する。',
        body: 'どのデータを扱うか、どこで動かすか、誰が運用するかが見えれば、導入可否の判断が早くなります。'
      }
    },
    cloud: {
      seo: {
        title: 'JClaw Cloud | 公式托管 AI Agent roadmap',
        description: 'JClaw Cloud は、ログ、権限、運用監視、日本語サポートをまとめる予定の公式托管版 roadmap です。'
      },
      eyebrow: '公式クラウド計画',
      title: '日本向けに運用しやすい、公式托管版を構想する。',
      intro:
        'JClaw Cloud は、運用の手離れを良くしながら、日本企業が必要とする説明責任と管理性を両立させるための将来像です。',
      note: 'このページは roadmap 表示です。未提供機能を既存機能のようには扱いません。',
      sections: [
        {
          title: 'Cloud で提供したい価値',
          cards: [
            {
              title: '運用管理を軽くする',
              body: 'ログ、権限、チーム利用、問い合わせ対応を一元化し、社内運用の負担を減らす。'
            },
            {
              title: '日本語で導入支援する',
              body: '仕様だけでなく、導入相談、PoC の進め方、運用フローの設計まで日本語で支える。'
            },
            {
              title: '信頼情報を揃える',
              body: 'サイト、提案資料、調達確認で必要になる安全性・責任分界・運用体制の説明を整える。'
            }
          ]
        },
        {
          title: '計画中の提供範囲',
          bullets: [
            '組織・権限・利用状況の管理',
            '会話ログや運用イベントの可視化',
            '日本語サポートと導入支援窓口'
          ]
        },
        {
          title: '今は約束しないこと',
          bullets: [
            'SLA、監査認証、法務条項など未確定事項は記載しない',
            '未実装の機能を販促文で誇張しない',
            'Self-Hosted と Cloud の責任範囲を混ぜて説明しない'
          ]
        }
      ],
      cta: {
        title: 'Cloud に興味がある企業から先に話を聞く。',
        body: 'どの管理機能が必要か、何を公式側に任せたいかを先に把握し、roadmap の優先順位に反映する。'
      }
    },
    security: {
      seo: {
        title: 'JClaw Security | データ・責任・透明性の考え方',
        description: 'JClaw の安全性ページ。データ処理、人的確認、責任分界、日本語支援、稟議準備の考え方を整理しています。'
      },
      eyebrow: '信頼と安全性',
      title: '安全性は、説明できることから始まる。',
      intro:
        '日本の導入現場では、AI の精度だけでなく、データの扱い、誤情報の前提、責任分界、説明責任が同時に問われます。JClaw はそこを公式サイト上で先に示します。',
      sections: [
        {
          title: '重要視する5つの軸',
          cards: [
            {
              title: 'データ処理',
              body: 'どこにデータが送られるか、誰が管理するか、学習利用の扱いはどうかを曖昧にしない。'
            },
            {
              title: '人的確認',
              body: 'AI 出力の誤情報リスクを前提にし、人が確認・修正できる運用設計を置く。'
            },
            {
              title: '責任分界',
              body: 'Self-Hosted と Cloud で責任の所在が変わることを、提案段階から明確に説明する。'
            },
            {
              title: '日本語支援',
              body: '導入説明、相談、問い合わせ導線を日本語で整え、現場が理解しやすい状態をつくる。'
            },
            {
              title: '稟議準備',
              body: '稟議や調達で必要になる情報を早く揃え、検討が止まる原因を減らす。'
            }
          ]
        },
        {
          title: '現時点の表現方針',
          bullets: [
            '現在の提供範囲を越える主張はしない',
            'Cloud の表現は roadmap または planned に限定する',
            '認証・契約・SLA など確定していない項目は載せない'
          ]
        }
      ],
      cta: {
        title: '安全性の説明を先に見たい企業向けの導線を残す。',
        body: '営業資料や提案資料を作る前でも、サイト上で最低限の考え方が見える状態を作る。'
      }
    },
    contact: {
      seo: {
        title: 'JClaw | デモ相談と初期導入の相談',
        description: 'JClaw のデモ相談ページ。Self-Hosted 検討、クラウド計画の相談、導入シーンの整理を受け付けます。'
      },
      eyebrow: '相談',
      title: 'まずは、どの導入形態が合うかを整理する。',
      intro:
        '初期段階では、価格表よりも前に「どのデータを扱うか」「誰が運用するか」「自己ホストか托管か」を整理する方が価値があります。',
      sections: [
        {
          title: '相談できる内容',
          cards: [
            {
              title: 'Self-Hosted の適合性確認',
              body: '自社サーバー運用、PoC、閉域環境前提の検討に向いているかを整理する。'
            },
            {
              title: 'Cloud roadmap 相談',
              body: '将来の托管版に何を期待するか、何を公式に任せたいかをヒアリングする。'
            },
            {
              title: '利用シーンの整理',
              body: '店舗、社内ヘルプ、代理店提案など、どのシーンから始めるかを一緒に絞る。'
            }
          ]
        },
        {
          title: '事前にあると良い情報',
          bullets: [
            '想定ユーザーと利用シーン',
            '取り扱う予定のデータの種類',
            'Self-Hosted と Cloud のどちらを優先したいか',
            '社内の確認者や稟議フローの有無'
          ]
        }
      ],
      cta: {
        title: 'デモ相談は日本語で進める。',
        body: '現時点ではメールベースの軽い相談導線に留め、フォーム用の処理系は現在の実行基盤に混ぜない。'
      }
    }
  },
  en: {
    home: {
      seo: {
        title: 'JClaw | A Japan-first AI Agent platform',
        description: 'JClaw is a Japan-first AI Agent platform built around LINE, local AI deployment and a future official cloud route.'
      },
      labels: {
        trust: 'Trust & Safety',
        trustTitle: 'Show the trust layer before feature claims',
        whyJapan: 'Why Japan',
        whyJapanTitle: 'Why the product starts with Japan',
        routes: 'Deployment Routes',
        routesTitle: 'Present self-hosted and cloud as separate operating paths',
        productOverview: 'Product Overview',
        productOverviewTitle: 'Explain the operating model like a real product site',
        useCases: 'Use Cases',
        useCasesTitle: 'Lead with scenarios, not raw features',
        openSourceTag: 'Open Source',
        roadmapTag: 'Roadmap'
      },
      hero: {
        eyebrow: 'LINE-native AI for Japan',
        title: 'A Japan-first AI Agent built for real operating environments.',
        intro:
          'JClaw combines LINE-native workflows, self-hosted control and a future official cloud route into one product story designed for Japanese teams.',
        note:
          'The homepage should not feel like a concept note. It should show how the product fits rollout, review and governance questions from the first screen.',
        roadmapNote:
          'JClaw Cloud is presented as an official roadmap only. The route that exists today is JClaw Self-Hosted.',
        points: [
          'Built around Japanese workflows and communication norms',
          'Designed with LINE as a primary operational entry point',
          'Open source today, official cloud route described carefully'
        ],
        proofBadges: [
          'Self-hosted today',
          'Cloud roadmap only',
          'Human review visible',
          'Japan-first support'
        ],
        preview: {
          eyebrow: 'Operational preview',
          title: 'Show the operator workflow, not just the brand story.',
          body:
            'The preview is intentionally static. Its job is to communicate control, review and deployment shape before a managed product exists.',
          metrics: [
            {label: 'Entry', value: 'LINE-native'},
            {label: 'Control', value: 'Self-Hosted'},
            {label: 'Future', value: 'Cloud roadmap'}
          ],
          workflowLabel: 'Operator flow',
          workflowSteps: [
            'Receive requests from LINE',
            'Generate an agent draft response',
            'Keep a human reviewer in the loop',
            'Operate with explicit ownership of data and policy'
          ],
          statusLabel: 'Current posture',
          statusItems: [
            {name: 'Data Handling', state: 'Explicit'},
            {name: 'Human Review', state: 'Required'},
            {name: 'Cloud', state: 'Planned'}
          ],
          signalCards: [
            {
              title: 'Explain data handling up front',
              body: 'Say where inputs go, who manages them and what is not yet provided.',
              tone: 'brand'
            },
            {
              title: 'Make human review part of the product story',
              body: 'Show that operational control does not disappear behind AI automation.',
              tone: 'indigo'
            },
            {
              title: 'Keep roadmap language precise',
              body: 'Use cloud language to describe direction, not current delivery.',
              tone: 'neutral'
            }
          ]
        }
      },
      trustIntro:
        'Japanese teams need answers about data, review responsibility and procurement fit before they believe a product can move beyond a demo.',
      trustStrip: [
        {
          title: 'Data Handling',
          body: 'Explain where input data goes, who manages it and how training use is treated.'
        },
        {
          title: 'Human Review',
          body: 'Assume model output can be wrong and keep a reviewer in the operating path.'
        },
        {
          title: 'Responsibility Boundary',
          body: 'Separate what the customer owns in self-hosted mode from what a future cloud offer would own.'
        },
        {
          title: 'Japanese Support',
          body: 'Make rollout, consultation and explanation possible in Japanese from the start.'
        },
        {
          title: 'Procurement Readiness',
          body: 'Make privacy, support and deployment shape easy to take into internal review.'
        }
      ],
      whyJapanIntro:
        'Japanese teams often see strong AI potential, but remain cautious about hallucinations, transparency, legal accountability, personal data handling and internal approval friction.',
      whyJapanCards: [
        {
          title: 'LINE matters as the front door',
          body: 'Where many global products start with Slack or generic web chat, Japan often starts with LINE for both customer and operational touchpoints.'
        },
        {
          title: 'Operational tone matters',
          body: 'Japanese support, review flows, partner sales motions and on-site enablement all affect trust and adoption.'
        },
        {
          title: 'Data control must be explainable',
          body: 'Teams need a clear answer to where data goes, who manages it and what deployment model fits internal policy.'
        }
      ],
      routesIntro:
        'The public route should feel actionable now, while the future cloud route should stay clearly marked as planned.',
      routes: {
        selfHosted: {
          title: 'JClaw Self-Hosted',
          intro: 'The route that can be trialed now. It fits internal pilots, private environments and teams that want direct operational control.',
          bullets: [
            'Connect LINE workflows to local LLMs',
            'Operate inside your own environment',
            'Start pilots and internal validation quickly'
          ]
        },
        cloud: {
          title: 'JClaw Cloud',
          intro: 'A planned official managed route. It is described as roadmap only, not as a currently shipped product.',
          bullets: [
            'Centralize logs, permissions and operational visibility',
            'Support multi-team rollout and commercial deployment',
            'Provide Japanese onboarding and support as part of the offer'
          ]
        }
      },
      productOverviewIntro:
        'A stronger open source product site quickly explains how the product will be operated, governed and introduced inside a team. JClaw should do the same.',
      productOverviewCards: [
        {
          title: 'LINE-native entry',
          body: 'Position LINE as a first-class entry point for customer-facing and internal workflows in Japan.'
        },
        {
          title: 'Self-hosted control',
          body: 'Give teams a deployment path they can control now instead of overselling a future managed offer.'
        },
        {
          title: 'Human-in-the-loop review',
          body: 'Make review and approval part of the operator story instead of hiding it behind automation language.'
        },
        {
          title: 'Japanese support onboarding',
          body: 'Show that support, rollout language and internal explanation are designed for Japanese stakeholders.'
        }
      ],
      useCases: [
        {
          title: 'Retail and customer support',
          body: 'Unify reservations, inquiries and frontline Q&A through a LINE-native customer path.'
        },
        {
          title: 'Internal help desks',
          body: 'Provide HR, admin and sales FAQ access in a locally controlled environment.'
        },
        {
          title: 'Partner-ready packaging',
          body: 'Position the product as an official Japan-oriented AI Agent offer that partners can explain and sell.'
        }
      ],
      cta: {
        title: 'Start with a conversation, not a pricing page.',
        body: 'At this stage, the job of the site is to show that the product can be trialed safely, discussed in Japanese and extended into the right operating model later.',
        footnote: 'All cloud language on this prototype is roadmap language only.'
      }
    },
    selfHosted: {
      seo: {
        title: 'JClaw Self-Hosted | A controllable route for Japanese teams',
        description: 'JClaw Self-Hosted connects LINE-native workflows and local LLMs inside your own environment.'
      },
      eyebrow: 'Self-Hosted',
      title: 'A practical route for teams that need control first.',
      intro:
        'JClaw Self-Hosted is the most realistic way to start today. It keeps deployment and operational control with the team while enabling pilots and internal validation.',
      note:
        'The current runtime repository supports this route. The website prototype is intentionally being separated so product messaging does not stay coupled to bot runtime code.',
      sections: [
        {
          title: 'Best fit',
          cards: [
            {
              title: 'Sensitive data review',
              body: 'For teams that need to clearly understand where data goes before they can proceed.'
            },
            {
              title: 'Fast internal pilots',
              body: 'For teams that want to validate value quickly without waiting for a managed service.'
            },
            {
              title: 'IT-led evaluation',
              body: 'For organizations that want infrastructure and security review to happen inside their own standards.'
            }
          ]
        },
        {
          title: 'What it covers now',
          bullets: [
            'LINE webhook integration with local LLMs through Ollama',
            'A simple AI assistant experience with conversational memory',
            'A lightweight self-hosted path for internal testing'
          ]
        },
        {
          title: 'What it does not claim yet',
          bullets: [
            'No mature admin console or audit surface yet',
            'Production use still needs logging, persistence, permission and monitoring design',
            'Managed-service benefits belong to the cloud roadmap, not this route'
          ]
        }
      ],
      cta: {
        title: 'Check whether self-hosted fits first.',
        body: 'Once data type, runtime location and operator ownership are clear, the deployment decision gets much easier.'
      }
    },
    cloud: {
      seo: {
        title: 'JClaw Cloud | Official managed route roadmap',
        description: 'JClaw Cloud is the planned managed route for logs, permissions, operational visibility and Japanese support.'
      },
      eyebrow: 'Official cloud roadmap',
      title: 'A managed route designed for Japanese operational reality.',
      intro:
        'JClaw Cloud is the future managed offering for teams that want less operational overhead without losing clarity around trust and responsibility.',
      note: 'This page describes roadmap intent only. It does not present unshipped features as available today.',
      sections: [
        {
          title: 'Why a managed route matters',
          cards: [
            {
              title: 'Reduce operational load',
              body: 'Centralize logs, permissions and usage visibility so adoption does not depend on internal heroics.'
            },
            {
              title: 'Support rollout in Japanese',
              body: 'Help teams plan pilots, onboarding and operational setup in language that local stakeholders can act on.'
            },
            {
              title: 'Make trust easier to communicate',
              body: 'Provide a clearer managed-service story for internal reviewers, partners and commercial buyers.'
            }
          ]
        },
        {
          title: 'planned capabilities',
          bullets: [
            'Organization and permission management',
            'Conversation and operations visibility',
            'Japanese support and deployment guidance'
          ]
        },
        {
          title: 'What stays out of copy for now',
          bullets: [
            'No SLA or certification language until it is real',
            'No inflated descriptions of unbuilt management features',
            'No mixing of self-hosted and cloud responsibility models'
          ]
        }
      ],
      cta: {
        title: 'Use the roadmap page to gather early demand.',
        body: 'The right question now is what companies want the official service to own, not how many features can be listed.'
      }
    },
    security: {
      seo: {
        title: 'JClaw Security | Data handling, review and responsibility',
        description: 'Review JClaw’s approach to data handling, human review, responsibility boundaries, Japanese support and procurement readiness.'
      },
      eyebrow: 'Security & Trust',
      title: 'Safety starts with being explainable.',
      intro:
        'For Japanese teams, evaluation is not only about model quality. It is also about data handling, hallucination risk, operational responsibility and whether the offer can survive internal review.',
      sections: [
        {
          title: 'Five trust pillars',
          cards: [
            {
              title: 'Data Handling',
              body: 'Clarify where data goes, who manages it and whether training use is involved.'
            },
            {
              title: 'Human Review',
              body: 'Treat model error as a normal possibility and design workflows that keep a human in control.'
            },
            {
              title: 'Responsibility Boundary',
              body: 'Explain clearly how responsibility differs between self-hosted and managed deployment models.'
            },
            {
              title: 'Japanese Support',
              body: 'Make rollout and support understandable for local operators and approvers.'
            },
            {
              title: 'Procurement Readiness',
              body: 'Make it easier for teams to gather the materials needed for security and procurement review.'
            }
          ]
        },
        {
          title: 'Current copy policy',
          bullets: [
            'Do not claim more than what is presently supported',
            'Use roadmap-only language for cloud capabilities',
            'Avoid legal, certification or SLA statements that do not exist yet'
          ]
        }
      ],
      cta: {
        title: 'Give buyers a trust page before a sales deck.',
        body: 'Even at prototype stage, clear language about risk and scope reduces unnecessary friction.'
      }
    },
    contact: {
      seo: {
        title: 'JClaw Contact | Demo and fit discussion',
        description: 'Contact JClaw to discuss self-hosted fit, cloud roadmap interest and the right use case to start with.'
      },
      eyebrow: 'Contact',
      title: 'Start by clarifying the operating model.',
      intro:
        'Early conversations are most useful when they sort out deployment shape, data type and ownership instead of jumping straight to pricing.',
      sections: [
        {
          title: 'Good topics for an initial call',
          cards: [
            {
              title: 'Self-hosted fit',
              body: 'Check whether internal hosting and local model deployment match the use case and data profile.'
            },
            {
              title: 'Cloud roadmap interest',
              body: 'Understand what teams want the official managed route to handle in the future.'
            },
            {
              title: 'Use case framing',
              body: 'Narrow the first deployment down to a concrete scenario such as retail support or internal help desk use.'
            }
          ]
        },
        {
          title: 'Helpful context to bring',
          bullets: [
            'Target users and operating scenario',
            'The kinds of data expected in prompts and replies',
            'Whether self-hosted or cloud is the initial priority',
            'Who must sign off internally'
          ]
        }
      ],
      cta: {
        title: 'Keep the contact path simple.',
        body: 'For the prototype stage, email is enough. Do not bolt a custom form backend onto the current runtime repository.'
      }
    }
  },
  'zh-cn': {
    home: {
      seo: {
        title: 'JClaw | 面向日本市场的 Japan-first AI Agent',
        description: 'JClaw 是一个以 LINE 为入口、兼顾本地部署与未来官方云托管路线的 Japan-first AI Agent 平台。'
      },
      labels: {
        trust: '信任与安全',
        trustTitle: '把导入判断真正关心的信任信息先讲清楚',
        whyJapan: '为什么先做日本市场',
        whyJapanTitle: '为什么产品要先从日本市场出发',
        routes: '部署路线',
        routesTitle: '把 Self-Hosted 与官方云路线图分成两条职责清楚的路线',
        productOverview: '产品概览',
        productOverviewTitle: '像真正的产品官网一样解释运营结构',
        useCases: '使用场景',
        useCasesTitle: '先讲使用场景，而不是先堆功能',
        openSourceTag: '开源版',
        roadmapTag: '规划中'
      },
      hero: {
        eyebrow: 'LINE-native AI for Japan',
        title: '适合日本团队落地运营的 Japan-first AI Agent。',
        intro:
          'JClaw 以 LINE 为入口，把 Self-Hosted 控制权与未来官方云路线图放进同一套产品叙事，服务日本团队的真实导入场景。',
        note:
          '这一版首页不再只讲概念，而是先把数据处理、人工复核、责任边界和日本语支持这些真正影响导入的点放到第一屏。',
        roadmapNote:
          'JClaw Cloud 当前只按官方路线图展示。眼下可以实际试跑的路线，仍然是 JClaw Self-Hosted。',
        points: [
          '优先围绕日本团队的工作流程与沟通习惯设计',
          '把 LINE 作为主要的业务入口',
          '先给出可落地的 Self-Hosted 路线，再连接到云路线图'
        ],
        proofBadges: [
          'Self-hosted 可试用',
          'Cloud 仅作路线图展示',
          '人工复核可见',
          '日本市场优先'
        ],
        preview: {
          eyebrow: '运营预览',
          title: '把运营者真正关心的流程和边界，直接放进产品预览里。',
          body:
            '这里用静态预览展示产品感，重点不是假装功能已经上线，而是把入口、审核、控制权和路线图边界讲清楚。',
          metrics: [
            {label: '入口', value: 'LINE-native'},
            {label: '当前路线', value: 'Self-Hosted'},
            {label: '后续方向', value: '云路线图'}
          ],
          workflowLabel: '运营流程',
          workflowSteps: [
            '从 LINE 接收咨询或请求',
            'Agent 生成候选回复',
            '由人工确认后再发送',
            '数据与运营责任保持可解释'
          ],
          statusLabel: '当前姿态',
          statusItems: [
            {name: '数据处理', state: '明确'},
            {name: '人工复核', state: '必须'},
            {name: 'Cloud', state: '规划中'}
          ],
          signalCards: [
            {
              title: '数据如何处理必须说清楚',
              body: '尽早回答数据去向、管理主体和未提供能力的边界。',
              tone: 'brand'
            },
            {
              title: '把人工判断留在流程里',
              body: '不是把 AI 包装成全自动，而是把审核责任保留下来。',
              tone: 'indigo'
            },
            {
              title: 'Cloud 文案保持克制',
              body: '所有云相关表述继续按 roadmap 语义呈现。',
              tone: 'neutral'
            }
          ]
        }
      },
      trustIntro:
        '日本企业在导入 AI 时，通常会同时追问数据处理、输出风险、责任归属和采购可解释性。首页应该先回答这些问题。',
      trustStrip: [
        {
          title: '数据处理',
          body: '明确输入数据会去哪里、由谁管理，以及是否涉及训练使用。'
        },
        {
          title: '人工复核',
          body: '默认 AI 输出可能出错，把人工确认设计进流程本身。'
        },
        {
          title: '责任边界',
          body: '把 Self-Hosted 与 Cloud 的责任边界从一开始就分清。'
        },
        {
          title: '日语支持',
          body: '让咨询、导入说明和支持路径都能以日语自然进行。'
        },
        {
          title: '采购准备度',
          body: '让安全说明、隐私方针和部署形态更容易进入内部评审。'
        }
      ],
      whyJapanIntro:
        '日本企业普遍看好 AI 的价值，但对幻觉、透明度、法律责任、个人信息处理和内部稟議负担仍然十分敏感。',
      whyJapanCards: [
        {
          title: 'LINE 是天然入口',
          body: '很多全球产品先从 Slack 或网页聊天开始，而在日本，LINE 往往更适合成为客户触点和运营入口。'
        },
        {
          title: '日语运营语境不同',
          body: '敬语、确认流程、代理销售以及现场导入支持，都会影响产品是否能被真正接受。'
        },
        {
          title: '数据控制必须讲清楚',
          body: '企业需要很早就知道数据会去哪里、谁来管理、哪种部署方式更适合内部要求。'
        }
      ],
      routesIntro:
        '官网应该把“现在能怎么开始”和“未来会往哪里走”拆开表达，而不是把公开版和托管路线混成一句营销口号。',
      routes: {
        selfHosted: {
          title: 'JClaw Self-Hosted',
          intro: '目前最现实、最可落地的路线，适合 PoC、私有环境和需要自己掌控运行方式的团队。',
          bullets: [
            '把 LINE 工作流接到本地 LLM 上',
            '在自有环境中运行和管理',
            '更快启动内部验证和试点'
          ]
        },
        cloud: {
          title: 'JClaw Cloud',
          intro: '计划中的官方托管路线。当前只按 roadmap 展示，不把未上线功能包装成已提供能力。',
          bullets: [
            '集中管理日志、权限和运营可视化',
            '支持多团队导入与商业化落地',
            '把日语导入支援和支持作为正式能力的一部分'
          ]
        }
      },
      productOverviewIntro:
        '更成熟的开源产品官网不会只讲愿景，也会把产品如何进入团队、如何运营、如何被解释给审批方看清楚。JClaw 首页也应该这样。',
      productOverviewCards: [
        {
          title: '让 LINE 成为真实入口',
          body: '把 LINE 当成真正的业务入口，而不是一个附属聊天接口。'
        },
        {
          title: '先给出可控的自部署路线',
          body: '先提供可控、可解释的落地方式，而不是急着把一切包装成托管产品。'
        },
        {
          title: '把人工复核写进产品流程',
          body: '让“AI 生成候选、人类确认发送”的运营现实直接进入产品叙事。'
        },
        {
          title: '让日语导入支持可感知',
          body: '让日语说明、导入沟通和内部解释路径都更自然可落地。'
        }
      ],
      useCases: [
        {
          title: '门店与客户接待',
          body: '把预约、咨询和一线问答整合到 LINE 路径里，减少现场响应的不一致。'
        },
        {
          title: '企业内部问答',
          body: '在本地受控环境中提供行政、人事、销售 FAQ 的访问入口。'
        },
        {
          title: '面向代理商的产品包装',
          body: '把产品塑造成“面向日本市场的官方 AI Agent”方案，方便合作伙伴讲清楚并销售。'
        }
      ],
      cta: {
        title: '先从对话与演示开始，而不是先上价格页。',
        body: '这个阶段官网最重要的任务，是证明产品可以被安全试用、可以用日语沟通，也能在未来延展到合适的运营模式。',
        footnote: '当前原型中所有 Cloud 文案都严格按 roadmap 表达。'
      }
    },
    selfHosted: {
      seo: {
        title: 'JClaw Self-Hosted | 面向日本团队的自部署路线',
        description: 'JClaw Self-Hosted 让团队在自己的环境中，把 LINE 工作流与本地 LLM 连接起来。'
      },
      eyebrow: '私有部署',
      title: '先把控制权掌握在自己手里的现实路线。',
      intro:
        'JClaw Self-Hosted 是当前最适合先落地的方式。它让团队可以在自有环境中完成试点、验证和早期运营，而不必先依赖托管服务。',
      note:
        '当前 runtime 仓库服务的是这条路线。官网原型刻意与 runtime 分离，以免产品表达继续和 bot 运行代码耦合在一起。',
      sections: [
        {
          title: '适合什么情况',
          cards: [
            {
              title: '需要先看清数据去向',
              body: '适合必须先明确数据流向和管理责任，才能继续推进的团队。'
            },
            {
              title: '希望快速做内部试点',
              body: '适合想尽快验证业务价值，但还不想直接押注托管服务的团队。'
            },
            {
              title: '由情报系统主导评估',
              body: '适合希望按照自家 IT 与安全标准进行导入审查的组织。'
            }
          ]
        },
        {
          title: '当前能覆盖的范围',
          bullets: [
            '通过 Ollama 将 LINE webhook 接入本地 LLM',
            '提供带有会话记忆的基础 AI 助手体验',
            '作为轻量的自部署验证路径使用'
          ]
        },
        {
          title: '当前不会承诺的内容',
          bullets: [
            '尚未包含成熟的管理后台或审计界面',
            '真正生产落地仍需补充日志、持久化、权限和监控设计',
            '托管服务的运维价值不属于这条路线'
          ]
        }
      ],
      cta: {
        title: '先确认 Self-Hosted 是否适合。',
        body: '只要数据类型、运行位置和谁来运维这三个问题说清楚，部署路线就会容易判断得多。'
      }
    },
    cloud: {
      seo: {
        title: 'JClaw Cloud | 官方云托管路线 roadmap',
        description: 'JClaw Cloud 是计划中的官方托管路线，目标是集中日志、权限、运营可视化和日语支持。'
      },
      eyebrow: '官方云路线图',
      title: '面向日本运营现实而设计的官方托管路线。',
      intro:
        'JClaw Cloud 是未来面向不希望自行承担全部运维成本的团队所设计的官方托管方案，同时保留对信任和责任边界的清晰说明。',
      note: '本页只描述 roadmap 意图，不把未交付功能当成现有能力。 ',
      sections: [
        {
          title: '为什么需要托管路线',
          cards: [
            {
              title: '降低运维负担',
              body: '集中处理日志、权限和使用可视化，避免所有推广都依赖内部少数关键人员。'
            },
            {
              title: '用日语支持导入',
              body: '不仅解释功能，还帮助团队规划试点、上线和运营方式。'
            },
            {
              title: '让信任更容易被内部理解',
              body: '把托管服务的责任范围、管理方式和支持体系讲清楚，方便对内说明。'
            }
          ]
        },
        {
          title: '计划中的提供范围',
          bullets: [
            '组织与权限管理',
            '会话与运营事件的可视化',
            '日语支持与导入支援'
          ]
        },
        {
          title: '现在不写进官网的内容',
          bullets: [
            '没有确认前，不写 SLA 或认证相关文案',
            '不夸大尚未开发完成的管理能力',
            '不混淆 Self-Hosted 与 Cloud 的责任模型'
          ]
        }
      ],
      cta: {
        title: '先用 roadmap 页面收集真实需求。',
        body: '当前更重要的问题不是堆多少功能，而是弄清楚企业真正希望官方托管承担什么。'
      }
    },
    security: {
      seo: {
        title: 'JClaw Security | 数据处理、人工审核与责任边界',
        description: '查看 JClaw 对数据处理、人工复核、责任边界、日语支持和采购准备度的思路。'
      },
      eyebrow: '信任与安全',
      title: '安全，首先要能说清楚。',
      intro:
        '对日本团队来说，评估 AI 不只是看模型能力，还要看数据如何处理、错误输出如何应对、责任谁来承担，以及是否能顺利通过内部评审。',
      sections: [
        {
          title: '五个关键支柱',
          cards: [
            {
              title: '数据处理',
              body: '明确数据会去哪里、由谁管理，以及是否涉及训练使用。'
            },
            {
              title: '人工复核',
              body: '把模型错误视为正常可能性，并在流程中保留人工判断和修正的位置。'
            },
            {
              title: '责任边界',
              body: '清楚说明 Self-Hosted 和托管模式下责任归属的不同。'
            },
            {
              title: '日语支持',
              body: '让现场运营者和审批者都能用日语理解导入与支持方式。'
            },
            {
              title: '采购准备度',
              body: '帮助团队更快准备安全审查和采购所需资料。'
            }
          ]
        },
        {
          title: '当前文案原则',
          bullets: [
            '不宣称超出当前支持范围的能力',
            'Cloud 能力只用 roadmap 语言表达',
            '不写尚未真实存在的法务、认证或 SLA 承诺'
          ]
        }
      ],
      cta: {
        title: '在销售资料之前，先给出可信的安全页面。',
        body: '哪怕还是原型阶段，只要风险与边界说清楚，就能减少很多不必要的阻力。'
      }
    },
    contact: {
      seo: {
        title: 'JClaw | 演示咨询与适配度讨论',
        description: '联系 JClaw，讨论 Self-Hosted 适配度、Cloud 路线图兴趣以及第一批落地场景。'
      },
      eyebrow: '联系咨询',
      title: '先把运营形态理清楚，再谈下一步。',
      intro:
        '在产品早期，最有价值的沟通不是立刻谈价格，而是先弄清楚部署方式、数据类型和运维责任由谁承担。',
      sections: [
        {
          title: '适合在初次沟通中讨论的话题',
          cards: [
            {
              title: 'Self-Hosted 是否适合',
              body: '判断自部署和本地模型方案是否符合当前业务场景与数据类型。'
            },
            {
              title: 'Cloud roadmap 兴趣',
              body: '了解企业未来希望官方托管承担哪些部分。'
            },
            {
              title: '第一批场景该从哪里开始',
              body: '把最初的落地方向收敛到门店接待、内部问答等具体场景。'
            }
          ]
        },
        {
          title: '提前准备这些信息会更高效',
          bullets: [
            '目标用户和运营场景',
            '计划处理的数据类型',
            '当前优先考虑 Self-Hosted 还是 Cloud',
            '内部需要谁审批'
          ]
        }
      ],
      cta: {
        title: '联系方式保持简单。',
        body: '在原型阶段，邮箱咨询已经足够，不要把自定义表单后端硬塞进当前 runtime 仓库。'
      }
    }
  }
};

export function getSiteContent(locale: AppLocale) {
  return siteContent[locale];
}
