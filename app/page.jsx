"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  RotateCcw,
  Share2,
  Copy,
  ChevronRight,
  BrainCircuit,
  Stars,
  ScrollText,
  Heart,
  Crown,
  Palette,
  LineChart,
  MessageCircle,
  BriefcaseBusiness,
  ShieldAlert,
  Gift,
  Users,
  Compass,
  Flame,
  Waves,
} from "lucide-react";

const traitLabels = {
  leader: "統率力",
  empathy: "共感力",
  creativity: "創造力",
  intellect: "知性",
  courage: "勇気",
  strategy: "戦略性",
  freedom: "自由度",
  romance: "恋愛ロマン度",
};

const questions = [
  { text: "初対面の人と話すとき、あなたに近いのは？", options: [
    { label: "場の空気を見てから話す", scores: { empathy: 2, strategy: 1 } },
    { label: "自然に会話を広げる", scores: { freedom: 2, creativity: 1 } },
    { label: "必要なことを落ち着いて話す", scores: { intellect: 2, strategy: 1 } },
    { label: "少し緊張するが観察はしている", scores: { romance: 1, intellect: 1, empathy: 1 } },
  ]},
  { text: "周囲が迷っているとき、あなたはどう動く？", options: [
    { label: "自然と全体をまとめる", scores: { leader: 3, strategy: 1 } },
    { label: "まず相手の気持ちを聞く", scores: { empathy: 3, romance: 1 } },
    { label: "状況を分析して最善策を考える", scores: { intellect: 2, strategy: 2 } },
    { label: "自分らしい新しい方法を試す", scores: { creativity: 3, freedom: 1 } },
  ]},
  { text: "あなたが一番惹かれる言葉は？", options: [
    { label: "世界を変える", scores: { leader: 2, courage: 2 } },
    { label: "真実を見つける", scores: { intellect: 3, strategy: 1 } },
    { label: "美しく表現する", scores: { creativity: 3, romance: 1 } },
    { label: "人を救う", scores: { empathy: 3, courage: 1 } },
  ]},
  { text: "恋愛で出やすい傾向は？", options: [
    { label: "相手を守りたい気持ちが強い", scores: { empathy: 2, leader: 1, romance: 1 } },
    { label: "好きな人のことを深く考えすぎる", scores: { intellect: 1, romance: 3 } },
    { label: "自由を大事にしたい", scores: { freedom: 3, creativity: 1 } },
    { label: "駆け引きや距離感を読んでしまう", scores: { strategy: 3, intellect: 1 } },
  ]},
  { text: "あなたが得意そうな役割は？", options: [
    { label: "リーダー・責任者", scores: { leader: 3, courage: 1 } },
    { label: "研究者・分析者", scores: { intellect: 3, strategy: 1 } },
    { label: "芸術家・表現者", scores: { creativity: 3, freedom: 1 } },
    { label: "相談役・支援者", scores: { empathy: 3, romance: 1 } },
  ]},
  { text: "ピンチのときのあなたは？", options: [
    { label: "正面から立ち向かう", scores: { courage: 3, leader: 1 } },
    { label: "冷静に作戦を立てる", scores: { strategy: 3, intellect: 1 } },
    { label: "周囲を励まして支える", scores: { empathy: 3, courage: 1 } },
    { label: "発想を変えて突破する", scores: { creativity: 2, freedom: 2 } },
  ]},
  { text: "なぜか惹かれる世界観は？", options: [
    { label: "王宮・戦国・帝国の物語", scores: { leader: 2, strategy: 2 } },
    { label: "研究室・発明・科学の物語", scores: { intellect: 3, creativity: 1 } },
    { label: "芸術・音楽・文学の物語", scores: { creativity: 3, romance: 1 } },
    { label: "祈り・看護・平和の物語", scores: { empathy: 3, courage: 1 } },
  ]},
  { text: "人から言われやすいことは？", options: [
    { label: "芯が強い", scores: { courage: 2, leader: 2 } },
    { label: "考え方が深い", scores: { intellect: 2, strategy: 2 } },
    { label: "独特の感性がある", scores: { creativity: 3, freedom: 1 } },
    { label: "優しくて安心する", scores: { empathy: 3, romance: 1 } },
  ]},
  { text: "現世で大事にしたいものは？", options: [
    { label: "成功と影響力", scores: { leader: 3, strategy: 1 } },
    { label: "自由と自分らしさ", scores: { freedom: 3, creativity: 1 } },
    { label: "知識と成長", scores: { intellect: 3, strategy: 1 } },
    { label: "愛情と人とのつながり", scores: { empathy: 2, romance: 2 } },
  ]},
  { text: "何かを始めるとき、最初にすることは？", options: [
    { label: "ゴールを決めて計画する", scores: { strategy: 2, leader: 1 } },
    { label: "情報を集めて理解する", scores: { intellect: 3 } },
    { label: "とりあえず触って試す", scores: { freedom: 2, creativity: 1 } },
    { label: "誰かの意見や気持ちを確認する", scores: { empathy: 2, romance: 1 } },
  ]},
  { text: "あなたが苦手に感じやすい状況は？", options: [
    { label: "自分で決められない環境", scores: { freedom: 2, leader: 1 } },
    { label: "感情論だけで進む会話", scores: { intellect: 2, strategy: 1 } },
    { label: "冷たい空気や人間関係", scores: { empathy: 2, romance: 1 } },
    { label: "同じことの繰り返し", scores: { creativity: 2, freedom: 1 } },
  ]},
  { text: "褒められて一番うれしいのは？", options: [
    { label: "頼りになる", scores: { leader: 2, courage: 1 } },
    { label: "頭がいい・鋭い", scores: { intellect: 2, strategy: 1 } },
    { label: "センスがある", scores: { creativity: 3 } },
    { label: "優しい・安心する", scores: { empathy: 3 } },
  ]},
  { text: "休日に自然と選びがちな過ごし方は？", options: [
    { label: "予定を立てて有意義に過ごす", scores: { strategy: 2, leader: 1 } },
    { label: "本・動画・勉強で知識を増やす", scores: { intellect: 3 } },
    { label: "気分で出かける・新しい場所に行く", scores: { freedom: 3 } },
    { label: "好きな人や友人とゆっくり過ごす", scores: { empathy: 2, romance: 1 } },
  ]},
  { text: "集団の中でのあなたの立ち位置は？", options: [
    { label: "まとめ役になることが多い", scores: { leader: 3 } },
    { label: "静かに全体を見ている", scores: { strategy: 2, intellect: 1 } },
    { label: "場を和ませる・聞き役になる", scores: { empathy: 3 } },
    { label: "独自のアイデアを出す", scores: { creativity: 2, freedom: 1 } },
  ]},
  { text: "失敗したとき、あなたはどう考える？", options: [
    { label: "次は勝つために改善する", scores: { courage: 2, leader: 1 } },
    { label: "原因を分析して整理する", scores: { intellect: 2, strategy: 1 } },
    { label: "気持ちを整理する時間が必要", scores: { romance: 2, empathy: 1 } },
    { label: "別のやり方を探す", scores: { creativity: 2, freedom: 1 } },
  ]},
  { text: "あなたの理想の人間関係は？", options: [
    { label: "互いに高め合える関係", scores: { leader: 1, courage: 1, intellect: 1 } },
    { label: "干渉しすぎず自由な関係", scores: { freedom: 3 } },
    { label: "深く理解し合える関係", scores: { empathy: 2, romance: 2 } },
    { label: "刺激や発見がある関係", scores: { creativity: 2, intellect: 1 } },
  ]},
  { text: "大きなチャンスが来たら？", options: [
    { label: "覚悟を決めて飛び込む", scores: { courage: 3, leader: 1 } },
    { label: "成功確率を考えて判断する", scores: { strategy: 3, intellect: 1 } },
    { label: "自分らしくできるなら挑戦する", scores: { freedom: 2, creativity: 1 } },
    { label: "周囲への影響も考える", scores: { empathy: 2, leader: 1 } },
  ]},
  { text: "自分の長所を一言で言うなら？", options: [
    { label: "行動力", scores: { courage: 2, freedom: 1 } },
    { label: "分析力", scores: { intellect: 2, strategy: 1 } },
    { label: "表現力", scores: { creativity: 3 } },
    { label: "思いやり", scores: { empathy: 3 } },
  ]},
  { text: "恋愛で一番大切にしたいものは？", options: [
    { label: "安心感", scores: { empathy: 2, romance: 1 } },
    { label: "尊敬", scores: { intellect: 1, leader: 1, strategy: 1 } },
    { label: "刺激", scores: { creativity: 1, freedom: 2 } },
    { label: "一途さ", scores: { romance: 2, courage: 1 } },
  ]},
  { text: "最後に、あなたがなりたい自分は？", options: [
    { label: "周囲を導ける人", scores: { leader: 3, courage: 1 } },
    { label: "深く考え、専門性を持つ人", scores: { intellect: 3, strategy: 1 } },
    { label: "自分の世界観を表現できる人", scores: { creativity: 3, freedom: 1 } },
    { label: "人に安心や希望を与えられる人", scores: { empathy: 3, romance: 1 } },
  ]},
];

const figureRows = [
  ["cleopatra", "クレオパトラ", "魅了する女王の魂", "エジプシャンゴールド", "#E9B949", "#7DD3C7", "/characters/cleopatra.png", { leader: 8, empathy: 5, creativity: 7, intellect: 7, courage: 6, strategy: 8, freedom: 6, romance: 9 }, "人を惹きつける華やかさと、状況を読む冷静さをあわせ持つタイプです。表面的には明るく見えても、内面ではかなり戦略的に人間関係を見ています。", "恋愛では、相手を自然と惹きつける一方で、簡単には本音を見せません。追われるほど余裕が出ますが、心を許す相手には深く情熱的です。", "魅力を武器にするだけでなく、弱さを見せられる相手を大切にすると、関係が長続きします。"],
  ["caesar", "ユリウス・カエサル", "勝負に強い改革者の魂", "ローマンレッド", "#DC4A38", "#F7C66B", "/characters/caesar.png", { leader: 10, empathy: 4, creativity: 6, intellect: 8, courage: 9, strategy: 9, freedom: 7, romance: 5 }, "決断力と突破力が強く、停滞した状況を変える力を持つタイプです。周囲から頼られやすい反面、強引に見られることもあります。", "恋愛では主導権を握りやすく、好きになった相手にはストレートに向かいます。ただし、相手のペースを待つことも大切です。", "勝つことだけでなく、相手と一緒に進む感覚を持つと、あなたの魅力はさらに伝わります。"],
  ["joan", "ジャンヌ・ダルク", "信念で道を切り開く魂", "ホーリーシルバー", "#B9D9F2", "#FFF3B0", "/characters/joan-of-arc.png", { leader: 8, empathy: 7, creativity: 4, intellect: 6, courage: 10, strategy: 6, freedom: 5, romance: 6 }, "正しいと思ったことにまっすぐ進める、強い信念の持ち主です。周囲のために頑張れる一方で、自分を追い込みすぎる面があります。", "恋愛では一途で誠実です。相手を信じたい気持ちが強く、裏切りや曖昧さには敏感です。", "全部を背負わなくて大丈夫です。強さと同じくらい、休むこともあなたの武器になります。"],
  ["davinci", "レオナルド・ダ・ヴィンチ", "万能な創造者の魂", "ルネサンスブルー", "#3B82F6", "#F6D58D", "/characters/leonardo-da-vinci.png", { leader: 5, empathy: 5, creativity: 10, intellect: 10, courage: 5, strategy: 7, freedom: 9, romance: 4 }, "知的好奇心と創造力が非常に強いタイプです。ひとつのことだけでなく、複数の分野に興味が広がりやすいです。", "恋愛では、相手の内面や考え方に惹かれます。束縛されるより、刺激し合える関係が向いています。", "考えすぎて止まるより、小さく形にすることを意識すると才能が現実に変わります。"],
  ["newton", "アイザック・ニュートン", "真理を見抜く探究者の魂", "アップルグリーン", "#9BCB3C", "#F4E7B8", "/characters/isaac-newton.png", { leader: 4, empathy: 4, creativity: 7, intellect: 10, courage: 5, strategy: 8, freedom: 5, romance: 3 }, "物事を深く考え、仕組みを理解しようとするタイプです。周囲が感覚で動く場面でも、あなたは本質を探します。", "恋愛では慎重で、相手をよく観察してから距離を縮めます。気持ちを言葉にするのが少し苦手かもしれません。", "正解を探しすぎず、感情をそのまま伝える練習をすると人間関係が楽になります。"],
  ["napoleon", "ナポレオン・ボナパルト", "野心を燃やす指揮官の魂", "インペリアルネイビー", "#1D4ED8", "#F2C94C", "/characters/napoleon.png", { leader: 10, empathy: 3, creativity: 6, intellect: 7, courage: 9, strategy: 10, freedom: 7, romance: 4 }, "目標に向かって突き進む力があり、勝負どころで強いタイプです。自分の理想が明確で、負けず嫌いな一面があります。", "恋愛では主導権を握りたいタイプです。相手に尊敬できる部分があると、一気に惹かれます。", "成果だけでなく、過程でそばにいる人への気配りを忘れないことが大切です。"],
  ["nightingale", "フローレンス・ナイチンゲール", "誰かを照らす癒やしの魂", "ランタンアイボリー", "#FFF7D6", "#A7C7E7", "/characters/florence-nightingale.png", { leader: 6, empathy: 10, creativity: 5, intellect: 8, courage: 8, strategy: 6, freedom: 4, romance: 6 }, "人を支える力が強く、困っている人を放っておけないタイプです。優しさだけでなく、現実的に改善する力も持っています。", "恋愛では献身的で、相手を支えたい気持ちが強く出ます。ただし、尽くしすぎると疲れてしまいます。", "誰かを救う前に、自分の心と体も同じくらい大切にしてください。"],
  ["einstein", "アルベルト・アインシュタイン", "常識を超える天才の魂", "コズミックイエロー", "#F2C94C", "#7DD3FC", "/characters/einstein.png", { leader: 4, empathy: 6, creativity: 9, intellect: 10, courage: 6, strategy: 6, freedom: 9, romance: 4 }, "普通とは違う視点で世界を見るタイプです。周囲が当たり前だと思っていることにも、あなたは疑問を持てます。", "恋愛では少しマイペースです。感情表現は独特ですが、一緒にいて自由でいられる相手とは相性が良いです。", "変わっていることを隠さず、あなたの発想を面白がってくれる場所を選びましょう。"],
  ["gandhi", "マハトマ・ガンディー", "静かな強さを持つ平和の魂", "ピースホワイト", "#F8F7F1", "#B7D7A8", "/characters/gandhi.png", { leader: 7, empathy: 10, creativity: 5, intellect: 7, courage: 9, strategy: 7, freedom: 6, romance: 5 }, "穏やかに見えて、内側に強い信念を持つタイプです。怒りを力に変えるより、静かな継続力で周囲を動かします。", "恋愛では安心感を重視します。派手な駆け引きより、誠実で穏やかな関係を求めます。", "我慢しすぎず、自分の望みを言葉にすることも平和への一歩です。"],
  ["curie", "マリー・キュリー", "努力で光を見つける研究者の魂", "ラジウムグリーン", "#6EE7B7", "#ECFCCB", "/characters/marie-curie.png", { leader: 5, empathy: 6, creativity: 6, intellect: 10, courage: 8, strategy: 8, freedom: 5, romance: 4 }, "地道な努力と探究心で道を切り開くタイプです。派手さよりも、積み重ねた実力で評価されます。", "恋愛では慎重で誠実です。軽い言葉より、行動で信頼を示す相手に惹かれます。", "頑張れることは才能です。ただし、休む時間も研究や成長の一部だと考えてください。"],
  ["lincoln", "エイブラハム・リンカーン", "誠実に人を導く魂", "リーダーブラック", "#1F2937", "#F7D794", "/characters/abraham-lincoln.png", { leader: 9, empathy: 8, creativity: 5, intellect: 8, courage: 9, strategy: 7, freedom: 6, romance: 5 }, "誠実さと粘り強さで信頼を集めるタイプです。すぐに目立つより、時間をかけて周囲から認められていきます。", "恋愛では真面目で、相手に対して責任感を持ちます。軽い関係より、長く信頼を育てる関係が向いています。", "背負いすぎる前に、弱音を言える相手を持つことがあなたの支えになります。"],
  ["elizabeth", "エリザベス1世", "孤高に輝く女王の魂", "ロイヤルクリムゾン", "#B91C1C", "#FACC15", "/characters/elizabeth-i.png", { leader: 10, empathy: 5, creativity: 7, intellect: 8, courage: 8, strategy: 9, freedom: 7, romance: 6 }, "自分の価値を守りながら、華やかに存在感を放つタイプです。甘えよりも誇りを大切にします。", "恋愛では簡単に主導権を渡しません。尊敬でき、対等に向き合える相手にだけ心を開きます。", "強くあることと、誰かに頼ることは矛盾しません。信頼できる人には少しだけ隙を見せてみましょう。"],
  ["ieyasu", "徳川家康", "最後に勝つ戦略家の魂", "松葉ゴールド", "#14532D", "#EAB308", "/characters/tokugawa-ieyasu.png", { leader: 9, empathy: 5, creativity: 5, intellect: 8, courage: 7, strategy: 10, freedom: 4, romance: 3 }, "焦らず、長期的に勝ち筋を作るタイプです。派手な一発勝負より、安定した積み上げに強みがあります。", "恋愛では慎重で、すぐには心を開きません。信頼できると分かるまで時間をかけるタイプです。", "待つ力は強みですが、チャンスを見つけたときは一歩踏み出す勇気も必要です。"],
  ["suntzu", "孫子", "静かに勝ち筋を読む魂", "ストラテジーセージ", "#166534", "#D9F99D", "/characters/sun-tzu.png", { leader: 7, empathy: 4, creativity: 6, intellect: 9, courage: 6, strategy: 10, freedom: 5, romance: 3 }, "真正面からぶつかるより、状況を読んで最小の力で結果を出すタイプです。観察力と判断力が武器です。", "恋愛では相手の反応を深読みしやすいです。駆け引きが得意ですが、素直さを出すと関係が進みやすくなります。", "勝ち負けで考えすぎず、安心できる関係では計算を手放してみましょう。"],
  ["shakespeare", "ウィリアム・シェイクスピア", "感情を物語に変える魂", "シアターアンバー", "#B45309", "#FDA4AF", "/characters/shakespeare.png", { leader: 4, empathy: 8, creativity: 10, intellect: 8, courage: 5, strategy: 6, freedom: 7, romance: 9 }, "人の感情や矛盾を深く感じ取り、それを表現に変えられるタイプです。言葉の力が強く、人の心を動かせます。", "恋愛ではロマンチックで、相手との関係に物語性を求めます。少し考えすぎてドラマ化しやすい面もあります。", "頭の中で物語を作りすぎず、現実の相手の言葉もそのまま受け取ってみましょう。"],
  ["murasaki", "紫式部", "繊細な心を綴る魂", "平安パープル", "#7E22CE", "#F5D0FE", "/characters/murasaki-shikibu.png", { leader: 3, empathy: 9, creativity: 10, intellect: 8, courage: 4, strategy: 6, freedom: 5, romance: 10 }, "人の気持ちの揺れに敏感で、繊細な感受性を持つタイプです。表には出さなくても、内面では多くのことを感じ取っています。", "恋愛では奥深く、相手の小さな言葉や態度をよく覚えています。曖昧な関係には心を消耗しやすいです。", "感じすぎることは弱さではありません。言葉にして整理すると、心が軽くなります。"],
  ["genghis", "チンギス・ハン", "大地を駆ける征服者の魂", "ステップブラウン", "#92400E", "#FCD34D", "/characters/genghis-khan.png", { leader: 10, empathy: 3, creativity: 5, intellect: 6, courage: 10, strategy: 8, freedom: 9, romance: 3 }, "行動力とスケールの大きさがあるタイプです。小さくまとまるより、大きな目標に向かうほど力を発揮します。", "恋愛では独占欲や主導権の強さが出やすいです。自由を求める一方で、好きな相手には強い情熱を向けます。", "勢いは魅力ですが、相手のペースを尊重すると関係がより安定します。"],
  ["mozart", "ヴォルフガング・アマデウス・モーツァルト", "音で世界を彩る魂", "クラシックローズ", "#F43F5E", "#FDE68A", "/characters/mozart.png", { leader: 4, empathy: 6, creativity: 10, intellect: 8, courage: 5, strategy: 5, freedom: 9, romance: 8 }, "楽しいことや美しいものに敏感で、感性のままに人を惹きつけるタイプです。退屈な環境では力を出しにくいです。", "恋愛では明るくロマンチックです。感情表現が豊かで、相手と楽しい時間を共有することを大切にします。", "才能やノリだけでなく、継続する仕組みを作ると魅力が長く輝きます。"],
  ["tesla", "ニコラ・テスラ", "未来を発明する電撃の魂", "エレクトリックブルー", "#06B6D4", "#FDE047", "/characters/nikola-tesla.png", { leader: 5, empathy: 4, creativity: 10, intellect: 10, courage: 7, strategy: 7, freedom: 9, romance: 3 }, "未来の可能性を先に見てしまうタイプです。周囲に理解されにくくても、独自の発想を追求できます。", "恋愛ではかなり個性的で、心の距離感を大切にします。知的な刺激がある相手に惹かれやすいです。", "ひらめきを現実にするために、伝え方を少しだけ分かりやすくすると協力者が増えます。"],
  ["frida", "フリーダ・カーロ", "痛みを色彩に変える魂", "フローラルエメラルド", "#059669", "#FDA4AF", "/characters/frida-kahlo.png", { leader: 5, empathy: 9, creativity: 10, intellect: 6, courage: 8, strategy: 4, freedom: 9, romance: 9 }, "感情の深さと表現力が強いタイプです。傷ついた経験すら、自分らしさや美しさに変える力があります。", "恋愛では情熱的で、深く結びつくことを求めます。曖昧な愛情より、強く本音で向き合える関係を望みます。", "感情を抑え込むより、創作・言葉・行動で外に出すことであなたの魅力が増します。"],
];

const baseDetails = {
  leader: { life: "人や状況を動かし、大きな流れを作ることが人生のテーマです。責任を避けずに引き受けるほど、本来の力が発揮されます。", work: "リーダー職、企画、営業、マネジメント、プロジェクト推進など、判断力と責任感が求められる仕事に向いています。", caution: "自分で背負いすぎたり、相手にも同じ熱量を求めすぎたりしやすい点には注意が必要です。", luckyAction: "先延ばしにしていた決断を1つだけ実行する。" },
  empathy: { life: "人の心を受け止め、安心できる居場所を作ることが人生のテーマです。優しさを現実的な行動に変えるほど運が開きます。", work: "教育、医療、福祉、人事、接客、サポート職など、人に寄り添い信頼を積み上げる仕事に向いています。", caution: "相手を優先しすぎて、自分の本音や疲れを後回しにしやすいです。断ることも優しさの一部です。", luckyAction: "睡眠・食事・休憩のどれかを、今日は少しだけ丁寧にする。" },
  creativity: { life: "自分の感性や世界観を形にすることが人生のテーマです。未完成でも表に出すほど、評価や出会いが広がります。", work: "デザイン、文章、企画、動画、音楽、研究開発など、発想力や表現力を活かせる仕事に向いています。", caution: "完璧を求めすぎて、完成や公開が遅れやすいです。60点で出して改善する感覚が大切です。", luckyAction: "思いついたアイデアを3つメモして、そのうち1つを試す。" },
  intellect: { life: "物事の本質を理解し、自分なりの答えを見つけることが人生のテーマです。深く掘るほど信頼されます。", work: "研究、分析、設計、品質管理、データ活用、専門職など、知識を積み上げる仕事に向いています。", caution: "考えすぎて行動が遅れたり、感情の説明を省いたりしやすいです。大切な人には言葉で伝えましょう。", luckyAction: "気になっていた疑問を1つ調べ、誰かに短く説明する。" },
  courage: { life: "困難な場面で前に出ることが人生のテーマです。怖さがあっても進むことで、周囲からの信頼が集まります。", work: "現場職、リーダー職、営業、教育、医療、社会貢献など、覚悟と行動力が求められる仕事に向いています。", caution: "強くあろうとしすぎて、弱音を言えなくなることがあります。助けを求めることも強さです。", luckyAction: "少し怖くて避けていたことに、小さく一歩だけ近づく。" },
  strategy: { life: "状況を読み、勝ち筋を作ることが人生のテーマです。正面突破より、流れを見て動くことで結果を出せます。", work: "企画、戦略、マーケティング、交渉、管理、コンサル、リスク管理に向いています。", caution: "計算しすぎると、本音が伝わりにくくなります。安心できる関係ではシンプルに話す方が強いです。", luckyAction: "今抱えている問題について、正面突破以外の方法を3つ書き出す。" },
  freedom: { life: "自分らしい選択を重ね、行動範囲を広げることが人生のテーマです。新しい場所や人との出会いで運が動きます。", work: "企画、クリエイティブ、営業、旅行、海外、起業、フリーランスなど、裁量の大きい仕事に向いています。", caution: "自由を求めすぎて、継続や約束が負担になりやすいです。小さな仕組みを作ると安定します。", luckyAction: "行ったことのない場所に行く、または新しい人に連絡する。" },
  romance: { life: "感情の深さや美しさを大切にし、人とのつながりから人生を豊かにしていくタイプです。心が動くものを選ぶほど輝きます。", work: "文章、接客、表現、企画、美容、教育、相談、エンタメなど、人の心を動かす仕事に向いています。", caution: "想像が豊かすぎて、不安や期待を膨らませやすいです。事実と想像を分けると楽になります。", luckyAction: "今日感じたことを、短い文章やメモで残す。" },
};

const figures = figureRows.map(([id, name, title, colorName, colorA, colorB, image, traits, summary, love, advice]) => {
  const topTrait = Object.entries(traits).sort((a, b) => b[1] - a[1])[0][0];
  return { id, name, title, colorName, colorA, colorB, image, traits, summary, love, advice, ...baseDetails[topTrait] };
});

const compatibilityMap = {
  cleopatra: ["caesar", "shakespeare", "elizabeth"], caesar: ["cleopatra", "napoleon", "lincoln"], joan: ["lincoln", "nightingale", "gandhi"], davinci: ["einstein", "tesla", "mozart"], newton: ["curie", "einstein", "suntzu"], napoleon: ["caesar", "elizabeth", "genghis"], nightingale: ["gandhi", "joan", "curie"], einstein: ["davinci", "newton", "tesla"], gandhi: ["nightingale", "joan", "lincoln"], curie: ["newton", "nightingale", "tesla"], lincoln: ["joan", "gandhi", "caesar"], elizabeth: ["cleopatra", "napoleon", "ieyasu"], ieyasu: ["suntzu", "elizabeth", "lincoln"], suntzu: ["ieyasu", "newton", "tesla"], shakespeare: ["murasaki", "cleopatra", "mozart"], murasaki: ["shakespeare", "frida", "nightingale"], genghis: ["napoleon", "caesar", "frida"], mozart: ["davinci", "shakespeare", "frida"], tesla: ["davinci", "einstein", "curie"], frida: ["murasaki", "mozart", "cleopatra"],
};

function scoreAnswers(answers) {
  const base = Object.keys(traitLabels).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  answers.forEach((answerIndex, questionIndex) => {
    const selected = questions[questionIndex]?.options?.[answerIndex];
    if (!selected) return;
    Object.entries(selected.scores).forEach(([key, value]) => { base[key] += value; });
  });
  return base;
}
function similarity(userScores, figureTraits) { return Object.keys(traitLabels).reduce((sum, key) => sum + userScores[key] * figureTraits[key], 0); }
function computeResult(answers) { const userScores = scoreAnswers(answers); const ranked = [...figures].sort((a, b) => similarity(userScores, b.traits) - similarity(userScores, a.traits)); return { result: ranked[0], ranked, userScores }; }
function normalizeUserScores(userScores) { const max = Math.max(...Object.values(userScores), 1); return Object.fromEntries(Object.entries(userScores).map(([key, value]) => [key, Math.round((value / max) * 100)])); }
function getById(id) { return figures.find((fig) => fig.id === id) || figures[0]; }
function getCompatibility(result) { const best = (compatibilityMap[result.id] || []).map(getById); const contrast = [...figures].filter((fig) => fig.id !== result.id && !best.some((b) => b.id === fig.id)).sort((a, b) => similarity(result.traits, a.traits) - similarity(result.traits, b.traits)).slice(0, 3); return { best, contrast }; }

function buildLongDiagnosis(result, topThree, freeText) {
  const friendNames = topThree.map((f) => f.name).join("、");
  const inputNote = freeText?.trim()
    ? `また、あなたが自由記述で書いた「${freeText.slice(0, 60)}${freeText.length > 60 ? "..." : ""}」という言葉には、今のあなたが大切にしている感情や、まだ整理しきれていないテーマが表れています。診断結果は固定的な性格の決めつけではなく、今のあなたがどの方向に心を向けているかを映す鏡として読んでください。`
    : "自由記述を入力していない場合でも、選択肢の傾向から、あなたが今どのような価値観を大切にしやすいかを読み取っています。さらに精度を上げたい場合は、今悩んでいることや最近気になっていることを一言入れると、より自分専用の診断に近づきます。";
  return `あなたの前世偉人タイプは「${result.name}」。このタイプは、${result.summary} ただ明るい・真面目・個性的といった一言では片づけられず、内側には「どう見られるか」よりも「自分が何を大切にしたいか」を探し続ける複雑さがあります。人との関わりでは、相手の反応や場の空気を感じ取りながらも、最後には自分の美学や信念を守ろうとする傾向があります。\n\nMBTI風に言えば、あなたは単なる外向型・内向型というより、場面によって顔を使い分けるタイプです。安心できる相手には深く関わりますが、信頼できない相手には必要以上に自分を見せません。得意なのは、自分の中にある直感・知識・経験を組み合わせて、独自の判断を下すことです。反対に苦手なのは、自分のペースを乱されることや、納得できないまま周囲に合わせ続けることです。\n\n恋愛面では、${result.love} 好きになると相手の言葉や態度を細かく覚えている一方で、自分の本音は意外と後回しにしがちです。相手に合わせすぎると疲れ、逆に強がりすぎると距離ができます。大切なのは、駆け引きよりも「自分はどう感じているか」を短く伝えることです。長く続く相手は、あなたの個性を面白がり、無理に変えようとしない人です。\n\n人生全体では、${result.life} 仕事や学びでは、${result.work} ただし、${result.caution} この弱点は欠点というより、強みが強く出すぎたときの副作用です。だからこそ、無理に性格を変える必要はありません。自分の力が出やすい場所を選び、苦手な部分は仕組みや周囲の助けで補えばよいです。\n\n相性面では、${friendNames} のようなタイプと関わると、あなたの長所が引き出されやすくなります。似た価値観を持つ相手とは安心感があり、違う価値観を持つ相手とは新しい視点が得られます。相性が良いとは、いつも意見が合うことではありません。あなたが自然体でいられ、かつ少しだけ成長できる関係こそ、最も大切にすべき相性です。\n\n${inputNote}\n\n前世からのアドバイスは、${result.advice} 今日からのラッキーアクションは「${result.luckyAction}」です。大きく変わろうとしなくても、小さな行動をひとつ変えるだけで、あなたの流れは少しずつ変わります。`;
}

function runSelfTests() {
  console.assert(figures.length === 20, "figures must include 20 types");
  console.assert(questions.length === 20, "question count should be 20");
  console.assert(!figures.some((fig) => !fig.image || !fig.traits || !fig.summary), "each figure needs image, traits, and summary");
  const sample = computeResult([0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]);
  console.assert(Boolean(sample.result && sample.ranked.length === 20), "ranking should work for complete answers");
  console.assert(buildLongDiagnosis(sample.result, sample.ranked.slice(0, 3), "").length > 900, "long diagnosis should be close to 1000 Japanese characters");
}
runSelfTests();

function SoftCard({ children, className = "", style = {} }) { return <div className={`rounded-[34px] border-2 border-[#123C69]/10 bg-white shadow-[0_16px_50px_rgba(46,91,135,0.12)] ${className}`} style={style}>{children}</div>; }
function Pill({ children }) { return <span className="inline-flex items-center rounded-full border border-[#123C69]/15 bg-white/75 px-3 py-1 text-xs font-bold tracking-wide text-[#123C69]">{children}</span>; }
function StatBar({ label, value, color = "#1D6FB8" }) { return <div><div className="mb-1 flex items-center justify-between text-sm text-[#123C69]"><span>{label}</span><span>{value}%</span></div><div className="h-3 overflow-hidden rounded-full bg-[#DDF0FF]"><div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} /></div></div>; }
function MiniFigureCard({ fig, label }) { return <div className="rounded-[28px] border-2 border-[#123C69]/10 bg-white p-3 shadow-sm"><div className="rounded-[22px] p-3" style={{ background: `linear-gradient(135deg, ${fig.colorA}, ${fig.colorB})` }}>{label && <div className="mb-2 text-xs font-bold text-white/85">{label}</div>}<img src={fig.image} alt={fig.name} className="h-36 w-full rounded-2xl bg-white/60 object-cover" /></div><div className="mt-3 font-black text-[#123C69]">{fig.name}</div><div className="mt-1 text-xs leading-5 text-[#446985]">{fig.title}</div></div>; }

export default function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [freeText, setFreeText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const { result, ranked, userScores } = useMemo(() => computeResult(answers), [answers]);
  const normalizedScores = useMemo(() => normalizeUserScores(userScores), [userScores]);
  const compatibility = useMemo(() => getCompatibility(result), [result]);
  const topThree = ranked.slice(0, 3);
  const longDiagnosis = useMemo(() => buildLongDiagnosis(result, topThree, freeText), [result, topThree, freeText]);
  const progress = Math.round((answers.length / questions.length) * 100);
  const shareText = showResult ? `私の前世タイプは「${result.name}」でした。${result.title} #AI前世偉人診断` : "AI前世偉人診断";
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?text=${encodeURIComponent(shareText)}`;

  const selectOption = (index) => {
    const next = [...answers];
    next[step] = index;
    setAnswers(next);
  };

  const goNext = () => {
    if (answers[step] === undefined) return;
    if (step === questions.length - 1) setShowResult(true);
    else setStep((prev) => prev + 1);
  };

  const goBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };
  const copyShare = async () => { try { await navigator.clipboard.writeText(shareText); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); } };
  const reset = () => { setStarted(false); setStep(0); setAnswers([]); setFreeText(""); setShowResult(false); setCopied(false); };

  return (
    <div className="min-h-screen overflow-hidden bg-[#EAF7FF] text-[#123C69]">
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute left-[-120px] top-[-80px] h-80 w-80 rounded-full bg-[#BFE6FF] blur-3xl" />
        <div className="absolute right-[-100px] top-28 h-96 w-96 rounded-full bg-[#D6F5FF] blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-[#CDEBFF] blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <button onClick={reset} className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-sm"><Waves className="h-6 w-6 text-[#1D6FB8]" /></div>
          <div className="text-left"><div className="text-xs font-black tracking-[0.28em] text-[#6EA7CE]">PAST LIFE GALLERY</div><div className="text-xl font-black">前世偉人タイプ診断</div></div>
        </button>
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border-2 border-[#123C69]/10 bg-white px-5 py-3 text-sm font-bold text-[#123C69] shadow-sm transition hover:-translate-y-0.5"><RotateCcw className="h-4 w-4" /> 最初から</button>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-16">
        <AnimatePresence mode="wait">
          {!started && !showResult && (
            <motion.section key="hero" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -22 }} transition={{ duration: 0.45 }} className="grid min-h-[82vh] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[#1D6FB8]/10 bg-white px-5 py-3 text-sm font-bold text-[#1D6FB8] shadow-sm"><BrainCircuit className="h-4 w-4" /> AIがあなたの魂に近い偉人を解析</div>
                <h1 className="text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">あなたの前世は、<span className="block text-[#1D6FB8]">どの偉人キャラ？</span></h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#446985] md:text-lg">青くやわらかいギャラリー風デザインで、20人の偉人キャラクターからあなたのタイプを診断します。結果画面では、MBTI診断のように詳しい性格解説・相性・人生戦略・恋愛傾向・仕事向きまで読めます。</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row"><button onClick={() => setStarted(true)} className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#123C69] px-8 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-1">診断をはじめる <ChevronRight className="h-5 w-5 transition group-hover:translate-x-0.5" /></button><div className="inline-flex items-center justify-center rounded-full border-2 border-[#123C69]/10 bg-white px-6 py-4 text-sm font-bold text-[#446985] shadow-sm">20タイプ / 約1分 / 1000字級結果</div></div>
                <div className="mt-10 flex gap-4 overflow-x-auto pb-3">{figures.slice(0, 8).map((fig) => <div key={fig.id} className="min-w-[130px] rounded-[28px] bg-white p-3 shadow-sm"><img src={fig.image} alt={fig.name} className="h-24 w-full rounded-2xl object-cover" /><div className="mt-2 text-xs font-black">{fig.name}</div></div>)}</div>
              </div>
              <SoftCard className="p-5"><div className="rounded-[30px] p-5" style={{ background: `linear-gradient(135deg, ${figures[17].colorA}, ${figures[17].colorB})` }}><Pill>RESULT PREVIEW</Pill><img src={figures[17].image} alt={figures[17].name} className="mt-5 h-80 w-full rounded-[28px] bg-white/50 object-cover" /><div className="mt-5 rounded-[24px] bg-white/85 p-5"><div className="text-sm font-bold text-[#6EA7CE]">サンプル結果</div><div className="mt-1 text-3xl font-black text-[#123C69]">{figures[17].name}</div><div className="mt-2 font-bold text-[#446985]">{figures[17].title}</div></div></div></SoftCard>
            </motion.section>
          )}

          {started && !showResult && (
            <motion.section key="quiz" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }} className="mx-auto max-w-4xl pt-10">
              <div className="mb-6"><div className="mb-3 flex items-center justify-between text-sm font-bold text-[#6EA7CE]"><span>質問 {step + 1} / {questions.length}</span><span>{progress}%</span></div><div className="h-4 overflow-hidden rounded-full bg-white"><motion.div className="h-full rounded-full bg-[#1D6FB8]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} /></div></div>
              <SoftCard className="p-6 md:p-8">
                <div className="mb-3 text-sm font-black tracking-[0.2em] text-[#6EA7CE]">QUESTION</div>
                <h2 className="text-2xl font-black leading-relaxed md:text-3xl">{questions[step].text}</h2>
                <div className="mt-8 grid gap-3">
                  {questions[step].options.map((option, index) => {
                    const isSelected = answers[step] === index;
                    return (
                      <button
                        key={option.label}
                        onClick={() => selectOption(index)}
                        className={`rounded-[24px] border-2 p-5 text-left font-bold transition hover:-translate-y-0.5 ${isSelected ? "border-[#1D6FB8] bg-[#DDF0FF] text-[#123C69] shadow-sm" : "border-[#123C69]/10 bg-[#F8FCFF] text-[#123C69] hover:bg-white"}`}
                      >
                        <span className={`mr-3 inline-grid h-8 w-8 place-items-center rounded-full text-sm ${isSelected ? "bg-[#123C69] text-white" : "bg-[#1D6FB8] text-white"}`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
                {step === questions.length - 1 && (
                  <div className="mt-8 rounded-[24px] bg-[#F8FCFF] p-4">
                    <label className="mb-2 block text-sm font-bold text-[#446985]">任意：最近、心に残っていること</label>
                    <textarea
                      value={freeText}
                      onChange={(e) => setFreeText(e.target.value)}
                      placeholder="例：将来が不安、もっと自分らしくいたい、好きな人に素直になれない など"
                      className="min-h-[120px] w-full resize-none rounded-[20px] border-2 border-[#123C69]/10 bg-white p-4 text-sm outline-none"
                    />
                    <div className="mt-2 text-xs text-[#6EA7CE]">入力すると、結果画面の詳細文に一部反映されます。</div>
                  </div>
                )}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={goBack}
                    disabled={step === 0}
                    className="rounded-full border-2 border-[#123C69]/10 bg-white px-6 py-3 font-black text-[#123C69] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    前のページへ
                  </button>
                  <button
                    onClick={goNext}
                    disabled={answers[step] === undefined}
                    className="rounded-full bg-[#123C69] px-8 py-3 font-black text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-[#A8C6DC] disabled:shadow-none"
                  >
                    {step === questions.length - 1 ? "診断結果を見る" : "次のページへ"}
                  </button>
                </div>
              </SoftCard>
            </motion.section>
          )}

          {showResult && (
            <motion.section key="result" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }} className="grid gap-6 pt-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="lg:sticky lg:top-6 lg:self-start"><SoftCard className="overflow-hidden p-4"><div className="rounded-[30px] p-5" style={{ background: `linear-gradient(135deg, ${result.colorA}, ${result.colorB})` }}><div className="rounded-[26px] bg-white/90 p-6"><div className="mb-4 flex items-center justify-between"><Pill>RESULT CARD</Pill><Sparkles className="h-5 w-5 text-[#1D6FB8]" /></div><div className="text-sm font-bold text-[#6EA7CE]">あなたの前世偉人タイプは</div><h2 className="mt-2 text-4xl font-black leading-tight text-[#123C69] md:text-5xl">{result.name}</h2><p className="mt-3 text-xl font-black text-[#446985]">{result.title}</p><p className="mt-2 text-sm font-bold text-[#6EA7CE]">イメージカラー：{result.colorName}</p><img src={result.image} alt={result.name} className="mt-5 h-[420px] w-full rounded-[28px] bg-white object-cover" /><div className="mt-6 space-y-3">{Object.entries(normalizedScores).map(([key, value]) => <StatBar key={key} label={traitLabels[key]} value={value} color={result.colorA} />)}</div></div></div></SoftCard><div className="mt-4 grid grid-cols-2 gap-3"><button onClick={copyShare} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#123C69] px-4 py-3 font-black text-white"><Copy className="h-4 w-4" /> {copied ? "コピー済み" : "結果コピー"}</button><a href={tweetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-black text-[#123C69]"><Share2 className="h-4 w-4" /> Xで共有</a><a href={lineUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-black text-[#123C69]"><MessageCircle className="h-4 w-4" /> LINE共有</a><button onClick={copyShare} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-black text-[#123C69]"><span className="grid h-5 w-5 place-items-center rounded bg-[#1D6FB8] text-[10px] text-white">IG</span> Instagram用</button></div></div>
              <div className="space-y-5">
                <SoftCard className="p-6 md:p-8"><div className="mb-4 flex items-center gap-3"><ScrollText className="h-6 w-6 text-[#1D6FB8]" /><h3 className="text-2xl font-black">詳しい診断結果</h3></div><div className="whitespace-pre-line text-[15px] leading-9 text-[#294F6F]">{longDiagnosis}</div></SoftCard>
                <SoftCard className="p-6 md:p-8"><div className="mb-4 flex items-center gap-3"><Heart className="h-6 w-6 text-[#1D6FB8]" /><h3 className="text-2xl font-black">恋愛傾向</h3></div><p className="leading-8 text-[#446985]">{result.love}</p></SoftCard>
                <SoftCard className="p-6 md:p-8"><div className="mb-4 flex items-center gap-3"><Compass className="h-6 w-6 text-[#1D6FB8]" /><h3 className="text-2xl font-black">人生のテーマ</h3></div><p className="leading-8 text-[#446985]">{result.life}</p></SoftCard>
                <SoftCard className="p-6 md:p-8"><div className="mb-4 flex items-center gap-3"><BriefcaseBusiness className="h-6 w-6 text-[#1D6FB8]" /><h3 className="text-2xl font-black">向いている仕事・環境</h3></div><p className="leading-8 text-[#446985]">{result.work}</p></SoftCard>
                <SoftCard className="p-6 md:p-8"><div className="mb-4 flex items-center gap-3"><ShieldAlert className="h-6 w-6 text-[#1D6FB8]" /><h3 className="text-2xl font-black">注意すべき弱点</h3></div><p className="leading-8 text-[#446985]">{result.caution}</p></SoftCard>
                <SoftCard className="p-6 md:p-8"><div className="mb-4 flex items-center gap-3"><Gift className="h-6 w-6 text-[#1D6FB8]" /><h3 className="text-2xl font-black">ラッキーアクション</h3></div><p className="leading-8 text-[#446985]">{result.luckyAction}</p></SoftCard>
                <SoftCard className="p-6 md:p-8"><div className="mb-4 flex items-center gap-3"><Users className="h-6 w-6 text-[#1D6FB8]" /><h3 className="text-2xl font-black">相性の良い偉人タイプ</h3></div><div className="grid gap-4 md:grid-cols-3">{compatibility.best.map((fig) => <MiniFigureCard key={fig.id} fig={fig} />)}</div></SoftCard>
                <SoftCard className="p-6 md:p-8"><div className="mb-4 flex items-center gap-3"><Flame className="h-6 w-6 text-[#1D6FB8]" /><h3 className="text-2xl font-black">刺激をくれる偉人タイプ</h3></div><div className="grid gap-4 md:grid-cols-3">{compatibility.contrast.map((fig) => <MiniFigureCard key={fig.id} fig={fig} />)}</div></SoftCard>
                <SoftCard className="p-6 md:p-8"><div className="mb-4 flex items-center gap-3"><LineChart className="h-6 w-6 text-[#1D6FB8]" /><h3 className="text-2xl font-black">近い偉人タイプ TOP3</h3></div><div className="grid gap-4 md:grid-cols-3">{topThree.map((fig, index) => <MiniFigureCard key={fig.id} fig={fig} label={`No.${index + 1}`} />)}</div></SoftCard>
                <SoftCard className="p-6 md:p-8"><div className="mb-4 flex items-center gap-3"><Palette className="h-6 w-6 text-[#1D6FB8]" /><h3 className="text-2xl font-black">画像ファイルの配置仕様</h3></div><p className="text-sm leading-7 text-[#446985]">生成した20枚の画像は、Next.jsなら <code className="rounded bg-[#EAF7FF] px-2 py-1">public/characters/</code> に配置し、データの <code className="rounded bg-[#EAF7FF] px-2 py-1">image</code> パスとファイル名を一致させてください。</p></SoftCard>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      <footer className="relative z-10 mx-auto max-w-7xl px-5 pb-8 text-center text-xs leading-6 text-[#6EA7CE]">この診断はエンタメ目的です。結果は人格・運命・歴史上の人物との実際の一致を断定するものではありません。</footer>
    </div>
  );
}
