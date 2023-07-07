import crypto from 'crypto';
import dayjs, { Dayjs } from 'dayjs';

export type Entry = {
  text: string;
  starred: boolean;
  uuid: string;
  tags: string[]; // [] if empty
  createdAt: string;
  modifiedAt: string;
};

export const newEntry = (props: {
  text: string;
  starred?: boolean;
  uuid?: string;
  tags?: string[];
  createdAt?: string | Date | Dayjs;
  modifiedAt?: string | Date | Dayjs;
}): Entry => {
  return {
    text: props.text,
    starred: props.starred ?? false,
    uuid: props.uuid ?? crypto.randomUUID().replace(/-/g, '').toUpperCase(),
    tags: props.tags ?? [],
    createdAt: dayjs(props.createdAt).format('YYYY-MM-DDTHH:mm:ss'),
    modifiedAt: dayjs(props.modifiedAt).format('YYYY-MM-DDTHH:mm:ss'),
  };
};

export const extractTagHistory = (posts: Entry[]): string[] => [
  ...new Set(posts.map((post) => post.tags).flat()),
]; // uniq

// 基準になる日時
const baseDate = dayjs('2023-06-23T02:25:00');

export const sampleEntries: Entry[] = [
  newEntry({
    text: 'しかしながら何か知らぬが或る、計画的に私をつねに欺く、この上なく有力な、この上なく老獪な欺瞞者が存している。しからば、彼が私を欺くのならば、疑いなく私はまた存するのである。そして、できる限り多く彼は私を欺くがよい、しかし、私は或るものであると私の考えるであろう間は、彼は決して私が何ものでもないようにすることはできないであろう。かようにして、一切のことを十分に考量した結果、最後にこの命題、すなわち、**私は有る、私は存在する**、という命題は、私がこれを言表するたびごとに、あるいはこれを精神によって把握するたびごとに、必然的に真である、として立てられねばならぬ（[デカルト 省察 三木清訳](https://www.aozora.gr.jp/cards/001029/files/43291_21543.html)）',
    tags: ['哲学', 'デカルト'],
    createdAt: dayjs(baseDate).subtract(1, 'minutes'),
    starred: true,
    uuid: 'FE5133A9B3824B4C9D0222A9BA07C0AA',
  }),
  newEntry({
    text: '吾輩は猫である。名前はまだ無い。\nどこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。（[夏目漱石 吾輩は猫である](https://www.aozora.gr.jp/cards/000148/files/789_14547.html)）',
    tags: ['文学', '夏目漱石'],
    createdAt: dayjs(baseDate).subtract(1, 'day'),
    uuid: 'DF69326D369C437DA5C6477CF65D7EED',
  }),
  newEntry({
    text: '## 第一部 観念、その起源、構成、結合、抽象などについて\n### 第一節 観念の起源について\n人間の心に現れる全ての知覚は二つの別個な種類に分けられ、本書ではそれらを「印象」と「観念」と名付ける。二つの違いは、それぞれが心に湧き出て思考や意識へ入り込むときの勢いと生気の程度にある。極めて勢いよく烈しく入ってくる知覚を、印象と名付ける。この印象という名称の下に、初めて心に出現した感覚・情緒・情感の全てを包括できる。また観念という名称によって、思考や推論におけるこれら（感覚・情緒・情感）の淡い映像を意味する。例えば、本論考によってかき立てられた全ての知覚のようなものである。ただし、単に見ること触ることから生じたものを除いて。あと直接の快不快があればそれも除く。印象と観念のこのような区別を説明するために多言を費やす必要は多くないだろう。誰でも各自自身で、感じると考えるとの相違を直ちに理解するだろう。普通の程度であれば、この二つは容易に区別できる。ただし特殊な場合には、印象と観念とが極めて近づき合うこともあり得なくはない。例えば、睡眠・高熱・狂気のとき、あるいは精神が何らかの激烈な情感の内にあるときには観念が印象に近づくこともある。また一方では、印象が観念と区別できないほど淡く微弱なことも時折は起る。しかし、これら少数の近い類似の例があるにもかかわらず、一般的には印象と観念とは大いに異なる。従って、誰でもためらいなく両者を別個に位置づけ、違いを明示する固有の名称をそれぞれに割り当てる。\n知覚にはもう一つの区分があり、この区分は観察するのに便利で、かつ、印象と観念の両方に当てはまる。その区分とは即ち「単純」と「複雑」である。単純知覚＝「単純印象」と「単純観念」は、区別または分離の余地を少しも与えないようなものである。複雑知覚（「複雑印象」と「複雑観念」）はその反対で、部分に区別できるのである。（リンゴを例にすると、）個々の色・味・香りは全てリンゴのうちに合一された性質であるけれども、それぞれは同じものではないし、少なくとも互いに区別できることが容易に認められる。（[デイヴィッド・ヒューム 井上基志訳 人間本性論](https://www.aozora.gr.jp/cards/002033/files/59405_66194.html)）',
    tags: ['哲学', 'ヒューム'],
    createdAt: dayjs(baseDate).subtract(3, 'day'),
    uuid: '111A9D2CEACA46538C8775772F21B0E4',
  }),
  newEntry({
    text: '日本国民は、正当に選挙された国会における代表者を通じて行動し、われらとわれらの子孫のために、諸国民との協和による成果と、わが国全土にわたつて自由のもたらす恵沢を確保し、政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来し、その権力は国民の代表者がこれを行使し、その福利は国民がこれを享受する。これは人類普遍の原理であり、この憲法は、かかる原理に基くものである。われらは、これに反する一切の憲法、法令及び詔勅を排除する。日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚するのであつて、平和を愛する諸国民の公正と信義に信頼して、われらの安全と生存を保持しようと決意した。われらは、平和を維持し、専制と隷従、圧迫と偏狭を地上から永遠に除去しようと努めてゐる国際社会において、名誉ある地位を占めたいと思ふ。われらは、全世界の国民が、ひとしく恐怖と欠乏から免かれ、平和のうちに生存する権利を有することを確認する。われらは、いづれの国家も、自国のことのみに専念して他国を無視してはならないのであつて、政治道徳の法則は、普遍的なものであり、この法則に従ふことは、自国の主権を維持し、他国と対等関係に立たうとする各国の責務であると信ずる。日本国民は、国家の名誉にかけ、全力をあげてこの崇高な理想と目的を達成することを誓ふ。日本国民は、正当に選挙された国会における代表者を通じて行動し、われらとわれらの子孫のために、諸国民との協和による成果と、わが国全土にわたつて自由のもたらす恵沢を確保し、政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。',
    tags: ['政治'],
    createdAt: dayjs(baseDate).subtract(7, 'day'),
    uuid: '512A9BA07C0A24E5133A9B3824B4C9E0',
  }),
  newEntry({
    text: '申し上げます。申し上げます。旦那さま。あの人は、酷い。酷い。はい。厭な奴です。悪い人です。ああ。我慢ならない。生かして置けねえ。\nはい、はい。落ちついて申し上げます。あの人を、生かして置いてはなりません。世の中の仇です。はい、何もかも、すっかり、全部、申し上げます。私は、あの人の居所を知っています。すぐに御案内申します。ずたずたに切りさいなんで、殺して下さい。あの人は、私の師です。主です。けれども私と同じ年です。三十四であります。私は、あの人よりたった二月おそく生れただけなのです。たいした違いが無い筈だ。人と人との間に、そんなにひどい差別は無い筈だ。それなのに私はきょう迄あの人に、どれほど意地悪くこき使われて来たことか。どんなに嘲弄されて来たことか。ああ、もう、いやだ。堪えられるところ迄は、堪えて来たのだ。怒る時に怒らなければ、人間の甲斐がありません。私は今まであの人を、どんなにこっそり庇ってあげたか。誰も、ご存じ無いのです。あの人ご自身だって、それに気がついていないのだ。いや、あの人は知っているのだ。ちゃんと知っています。知っているからこそ、尚更あの人は私を意地悪く軽蔑するのだ。（[太宰治 駈込み訴え](https://www.aozora.gr.jp/cards/000035/files/277_33098.html)）',
    tags: ['文学', '太宰治'],
    createdAt: dayjs(baseDate).subtract(14, 'days'),
    starred: true,
    uuid: 'CCCF4BBA55954C04891128458CF55007',
  }),
  newEntry({
    text: 'カント哲学以来、デカルト哲学は棄てられた。独断的、形而上学的と考えられた。哲学は批評的であり、認識論的でなければならないと考えられている。真の実在とは如何なるものかを究明して、そこからすべての問題を考えるという如きことは顧みられなくなった。今日、人は実践ということを出立点と考える。実践と離れた実在というものはない。単に考えられたものは実在ではない。しかしまた真の実践は真の実在界においてでなければならない。然らざれば、それは夢幻に過ぎない。存在の前に当為があるなどいって、いわゆる実践理性の立場から道徳の形式が明にせられたとしても、真の実践は単に形式的に定まるのではない。此にも内容なき形式は空虚である。人は真実在は不可知的というかも知らない。もし然らば、我々の生命も単に現象的、夢幻的と考えるのほかない。そこからは、死生を賭する如き真摯なる信念は出て来ないであろう。実在は我々の自己の存在を離れたものではない。然らばといって、たといそれが意識一般といっても主観の綜合統一によって成立すると考えられる世界は、何処までも自己によって考えられた世界、認識対象界たるに過ぎない。かかる対象的実在の世界からは、実践的当為の出て来ないのはいうまでもない。デカルトの如く、すべての実在を疑い得るであろう。しかし自己自身の存在を疑うことはできない。何となれば、疑うものはまた自己なるが故である。\n人は自己が自己を知ることはできないという。かかる場合、人は知るということを、対象認識の意味においていっているのである。かかる意味において、自己が自己を知るということのできないのはいうまでもない。自己は自己の対象となることはできない。自己の対象となるものは自己ではない。然らば自己は単に不可知的か。単に不可知的なるものは、無と択ぶ所はない。自己は単なる無か。自己を不可知的というものは、何物か。対象的に知ることのできない自己は、最も能く自己に知れたものでなければならない。一方に我々は自己が自己自身を知ると考える、かかる意味において知るとは、如何なることを意味するのであるか。かかる意味において知るということが、先ず問題とせられなければならない。対象認識もそこからであろう。対象認識の立場から出立する人は、自己そのものの存在ということも、時間空間の形式に当嵌めて対象的に考える。心理的自己としては、我々の自己も爾考えることができる。しかしそれは考えられた自己であって、考える自己ではない。何人の自己でもあり得る自己である。自覚的自己の自己存在形式ではない。（[西田幾多郎 デカルト哲学について](https://www.aozora.gr.jp/cards/000182/files/3216_16432.html)）',
    tags: ['哲学', '西田幾多郎'],
    createdAt: dayjs(baseDate).subtract(28, 'day'),
    uuid: '1A8C923C2E524117A6CE36D124155A6E',
  }),
  newEntry({
    text: '恥の多い生涯を送って来ました。\n自分には、人間の生活というものが、見当つかないのです。自分は東北の田舎に生れましたので、汽車をはじめて見たのは、よほど大きくなってからでした。自分は停車場のブリッジを、上って、降りて、そうしてそれが線路をまたぎ越えるために造られたものだという事には全然気づかず、ただそれは停車場の構内を外国の遊戯場みたいに、複雑に楽しく、ハイカラにするためにのみ、設備せられてあるものだとばかり思っていました。しかも、かなり永い間そう思っていたのです。ブリッジの上ったり降りたりは、自分にはむしろ、ずいぶん垢抜けのした遊戯で、それは鉄道のサーヴィスの中でも、最も気のきいたサーヴィスの一つだと思っていたのですが、のちにそれはただ旅客が線路をまたぎ越えるための頗る実利的な階段に過ぎないのを発見して、にわかに興が覚めました。また、自分は子供の頃、絵本で地下鉄道というものを見て、これもやはり、実利的な必要から案出せられたものではなく、地上の車に乗るよりは、地下の車に乗ったほうが風がわりで面白い遊びだから、とばかり思っていました。しかも、かなり永い間そう思っていたのです。ブリッジの上ったり降りたりは、自分にはむしろ、ずいぶん垢抜けのした遊戯で、それは鉄道のサーヴィスの中でも、最も気のきいたサーヴィスの一つだと思っていたのですが、のちにそれはただ旅客が線路をまたぎ越えるための頗る実利的な階段に過ぎないのを発見して、にわかに興が覚めました。（[太宰治 人間失格](https://www.aozora.gr.jp/cards/000035/files/301_14912.html)）',
    tags: ['文学', '太宰治'],
    createdAt: dayjs(baseDate).subtract(60, 'day'),
    uuid: '4B812BD3B9EB45ED9535FA5016EAFA51',
  }),
  newEntry({
    text: '## 夜明け前\nあるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。道路の位置も幾たびか改まったもので、古道はいつのまにか深い山間に埋もれた。名高い桟も、蔦のかずらを頼みにしたような危い場処ではなくなって、徳川時代の末にはすでに渡ることのできる橋であった。新規に新規にとできた道はだんだん谷の下の方の位置へと降って来た。道の狭いところには、木を伐って並べ、藤づるでからめ、それで街道の狭いのを補った。長い間にこの木曾路に起こって来た変化は、いくらかずつでも嶮岨な山坂の多いところを歩きよくした。そのかわり、大雨ごとにやって来る河水の氾濫が旅行を困難にする。そのたびに旅人は最寄り最寄りの宿場に逗留して、道路の開通を待つこともめずらしくない。この街道の変遷は幾世紀にわたる封建時代の発達をも、その制度組織の用心深さをも語っていた。鉄砲を改め女を改めるほど旅行者の取り締まりを厳重にした時代に、これほどよい要害の地勢もないからである。この谿谷の最も深いところには木曾福島の関所も隠れていた。（[島崎藤村 夜明け前 第一部上](https://www.aozora.gr.jp/cards/000158/files/1504_14585.html)）',
    tags: ['文学', '島崎藤村'],
    createdAt: dayjs(baseDate).subtract(120, 'day'),
    uuid: '99C4BB8026C14D2F8AEBA78C975005D9',
  }),
  newEntry({
    text: '## 私の個人主義\n私は今日初めてこの学習院というものの中に這入りました。もっとも以前から学習院は多分この見当だろうぐらいに考えていたには相違ありませんが、はっきりとは存じませんでした。中へ這入ったのは無論今日が初めてでございます。\nさきほど岡田さんが紹介かたがたちょっとお話になった通りこの春何か講演をというご注文でありましたが、その当時は何か差支があって、――岡田さんの方が当人の私よりよくご記憶と見えてあなたがたにご納得のできるようにただいまご説明がありましたが、とにかくひとまずお断りを致さなければならん事になりました。しかしただお断りを致すのもあまり失礼と存じまして、この次には参りますからという条件をつけ加えておきました。その時念のためこの次はいつごろになりますかと岡田さんに伺いましたら、此年の十月だというお返事であったので、心のうちに春から十月までの日数を大体繰ってみて、それだけの時間があればそのうちにどうにかできるだろうと思ったものですから、よろしゅうございますとはっきりお受合申したのであります。ところが幸か不幸か病気に罹りまして、九月いっぱい床についておりますうちにお約束の十月が参りました。十月にはもう臥せってはおりませんでしたけれども、何しろひょろひょろするので講演はちょっとむずかしかったのです。しかしお約束を忘れてはならないのですから、腹の中では、今に何か云って来られるだろう来られるだろうと思って、内々は怖がっていました。（[夏目漱石 私の個人主義](https://www.aozora.gr.jp/cards/000148/files/772_33100.html)）',
    tags: ['文学', '夏目漱石'],
    createdAt: dayjs(baseDate).subtract(240, 'day'),
    uuid: '4D955F0605854688AB1879BA5643A7B9',
  }),
  newEntry({
    text: '## 哲学入門\n哲学に入る門は到る処にある。諸君は、諸君が現実におかれている状況に従って、めいめいその門を見出すことができるであろう。ここに示されたのは哲学に入る多くの門の一つに過ぎぬ。しかし諸君がいかなる門から入るにしても、もし諸君が哲学について未知であるなら、諸君には案内が必要であろう。この書はその一つの案内であろうとするものである。\n哲学入門は哲学概論ではない。従ってそれは世に行われる概論書の如く哲学史上に現われた種々の説を分類し系統立てることを目的とするものでなく、或いはまた自己の哲学体系を要約して叙述することを目的とするものでもない。しかし哲学は学として、特に究極の原理に関する学として、統一のあるものでなければならぬ故に、この入門書にもまた或る統一、少くとも或る究極的なものに対する指示がなければならぬ。かようなものとしてここで予想されているのは、私の理解する限りの西田哲学であるということができる。もとより西田哲学の解説を直接の目的とするのでないこの書において、私が自由に語った言葉は、すべて私自身のものとして私の責任におけるものである。\nすべての学は真理に対する愛に発し、真理に基く勇気を喚よび起すものでなければならない。本書を通じて私が特に明かにしようとしたのは真理の行為的意味である。哲学は究極のものに関心するといっても、つねにただ究極のものが問題であるのではない。我々が日々に接触する現実を正しく見ることを教え得ないならば、いかに深遠に見える哲学もすべて空語に等しい。この書が現実についての諸君の考え方に何等かの示唆を与えることができるならば、幸である。\n本書の出版にあたって岩波書店小林勇、小林龍介両君並びに三秀舎島誠君に多大の世話になったことを記して、感謝の意を表する。（[三木清 哲学入門](https://www.aozora.gr.jp/cards/000218/files/43023_26592.html)）',
    tags: ['哲学', '三木清'],
    createdAt: dayjs(baseDate).subtract(360, 'day'),
    uuid: '5586B972A80C4EF39963E19D752C4179',
  }),
]
  .slice()
  .sort((a, b) => (dayjs(a.createdAt).isBefore(b.createdAt) ? 1 : -1));
