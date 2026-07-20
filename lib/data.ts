export type AdhkarItem = {
  id: string;
  title: string;
  arabic: string;
  repetitions: number;
  isCounter?: boolean;
};

// Edit this array to add / modify invocations — no other code needs to change.
export const ADHKAR: AdhkarItem[] = [
  { id: "kursi", title: "Ayat al-Kursi", repetitions: 1,
    arabic: "اللّٰهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ" },
  { id: "ikhlas", title: "Sourate Al-Ikhlas", repetitions: 3,
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ" },
  { id: "falaq", title: "Sourate Al-Falaq", repetitions: 3,
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ" },
  { id: "nas", title: "Sourate An-Nas", repetitions: 3,
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ" },
  { id: "sayyid", title: "Sayyid al-Istighfar", repetitions: 1,
    arabic: "اللهم أنت ربي لا إله إلا أنت خلقتني وأنا عبدك وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت" },
  { id: "hamm-hazan", title: "Protection contre soucis et tristesse", repetitions: 3,
    arabic: "اللهم إني أعوذ بك من الهم والحزن وأعوذ بك من العجز والكسل وأعوذ بك من الجبن والبخل وأعوذ بك من غلبة الدين وقهر الرجال" },
  { id: "afiya", title: "Demande de bien-être", repetitions: 1,
    arabic: "اللهم إني أسألك العافية في الدنيا والآخرة" },
  { id: "hayyu-qayyum", title: "Ya Hayyu Ya Qayyum", repetitions: 1,
    arabic: "يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين" },
  { id: "malikal-mulk", title: "Allahumma Malikal Mulk", repetitions: 1,
    arabic: "اللهم مالك الملك تؤتي الملك من تشاء وتنزع الملك ممن تشاء وتعز من تشاء وتذل من تشاء بيدك الخير إنك على كل شيء قدير. رحمن الدنيا والآخرة ورحيمهما، تعطيهما من تشاء وتمنع منهما من تشاء، ارحمني رحمة تغنيني بها عمن سواك." },
  { id: "khayr-kullihi", title: "Demande de tout le bien", repetitions: 1,
    arabic: "اللهم إني أسألك من الخير كله عاجله وآجله ما علمت منه وما لم أعلم. وأعوذ بك من الشر كله عاجله وآجله ما علمت منه وما لم أعلم. اللهم إني أسألك الجنة وما قرب إليها من قول أو عمل. وأعوذ بك من النار وما قرب إليها من قول أو عمل. وأسألك أن تجعل كل قضاء قضيته لي خيرًا." },
  { id: "tawakkul-1", title: "Tawakkul (1/5)", repetitions: 3,
    arabic: "بسم الله توكلت على الله ولا حول ولا قوة إلا بالله" },
  { id: "tawakkul-2", title: "Tawakkul (2/5)", repetitions: 3,
    arabic: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم" },
  { id: "tawakkul-3", title: "Tawakkul (3/5)", repetitions: 1,
    arabic: "اللهم ارزقني الزوجة الصالحة التي تعينني على أمري ديني ودنياي ومعاشي وعاقبة أمري" },
  { id: "tawakkul-4", title: "Tawakkul (4/5)", repetitions: 1,
    arabic: "اللهم إن كان رزقي في السماء فأنزله وإن كان في الأرض فأخرجه وإن كان قليلاً فكثره وإن كان كثيراً فبارك لي فيه وإن كان بعيداً فقربه وإن كان قريباً فيسره" },
  { id: "tawakkul-5", title: "Tawakkul (5/5)", repetitions: 1,
    arabic: "اللهم سخر لي ملائكة السماء وجنود الأرض واجعل أمري كله يسيراً وتوكلت عليك" },
  { id: "tahlil-100", title: "Tahlil", repetitions: 100, isCounter: true,
    arabic: "لا إله إلا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيء قدير" },
];

export type RoutineTask = { id: string; label: string };

export const ROUTINE_TASKS: RoutineTask[] = [
  { id: "toilet", label: "Aller aux toilettes" },
  { id: "brush", label: "Se brosser les dents" },
  { id: "wash", label: "Se laver le visage" },
  { id: "weigh", label: "Se peser" },
  { id: "water", label: "Boire un verre d'eau" },
  { id: "bed", label: "Faire le lit" },
  { id: "sunnan", label: "Prier les sunnan si nécessaire" },
];

export const QUOTES = [
  { text: "Et quiconque place sa confiance en Allah, Il lui suffit.", source: "Sourate At-Talaq, 65:3" },
  { text: "La meilleure des invocations est celle faite à l'aube.", source: "Tradition prophétique" },
  { text: "Celui qui emprunte un chemin cherchant la science, Allah lui facilite un chemin vers le Paradis.", source: "Hadith rapporté par Muslim" },
  { text: "Le cœur ne trouve le repos qu'en se rappelant d'Allah.", source: "Ibn Al-Qayyim" },
  { text: "La patience est une lumière qui n'a pas de fin.", source: "Ibn Taymiyyah" },
];

export const BADGES = [7, 30, 100, 365];

// One mood per adhkar screen — cycles through, transitions smoothly between
// screens. Inspired by dawn / dusk gradients (teal, amber, indigo, moss).
export type Mood = { from: string; to: string; accent: string };
export const ADHKAR_MOODS: Mood[] = [
  { from: "#1e5c40", to: "#0a0a0b", accent: "#2fe08a" }, // emerald
  { from: "#6b4a14", to: "#0a0a0b", accent: "#f0b64a" }, // amber dusk
  { from: "#134f6e", to: "#0a0a0b", accent: "#4fc3e8" }, // dawn teal
  { from: "#5a2264", to: "#0a0a0b", accent: "#d688f0" }, // soft plum
  { from: "#6e3208", to: "#0a0a0b", accent: "#f2925a" }, // ember
  { from: "#1c6b3a", to: "#0a0a0b", accent: "#6fe0a0" }, // moss
  { from: "#2b2470", to: "#0a0a0b", accent: "#8f9bf5" }, // indigo
];

export function moodFor(index: number): Mood {
  return ADHKAR_MOODS[index % ADHKAR_MOODS.length];
}

export function levelForDays(n: number) {
  if (n >= 365) return "Sâlih";
  if (n >= 100) return "Mouhsin";
  if (n >= 30) return "Constant";
  if (n >= 7) return "Régulier";
  return "Débutant";
}
