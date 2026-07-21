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
  { id: "hadith-hayat-wafat", title: "Ne pas souhaiter la mort", repetitions: 1,
    arabic: "اللَّهُمَّ أَحْيِنِي مَا كَانَتِ الْحَيَاةُ خَيْرًا لِي، وَتَوَفَّنِي إِذَا كَانَتِ الْوَفَاةُ خَيْرًا لِي" },
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

// The user's own reference photos, used as-is (no color extraction, no filters).
// Split into 6 groups; one group is used per calendar day, cycling through it
// photo-per-adhkar within that day.
export const BACKGROUND_SETS: string[][] = [
  ["/backgrounds/bg-001.jpg", "/backgrounds/bg-002.jpg", "/backgrounds/bg-003.jpg", "/backgrounds/bg-004.jpg", "/backgrounds/bg-005.jpg", "/backgrounds/bg-006.jpg", "/backgrounds/bg-007.jpg", "/backgrounds/bg-008.jpg", "/backgrounds/bg-009.jpg", "/backgrounds/bg-010.jpg", "/backgrounds/bg-011.jpg", "/backgrounds/bg-012.jpg"],
  ["/backgrounds/bg-013.jpg", "/backgrounds/bg-014.jpg", "/backgrounds/bg-015.jpg", "/backgrounds/bg-016.jpg", "/backgrounds/bg-017.jpg", "/backgrounds/bg-018.jpg", "/backgrounds/bg-019.jpg", "/backgrounds/bg-020.jpg", "/backgrounds/bg-021.jpg", "/backgrounds/bg-022.jpg", "/backgrounds/bg-023.jpg", "/backgrounds/bg-024.jpg"],
  ["/backgrounds/bg-025.jpg", "/backgrounds/bg-026.jpg", "/backgrounds/bg-027.jpg", "/backgrounds/bg-028.jpg", "/backgrounds/bg-029.jpg", "/backgrounds/bg-030.jpg", "/backgrounds/bg-031.jpg", "/backgrounds/bg-032.jpg", "/backgrounds/bg-033.jpg", "/backgrounds/bg-034.jpg", "/backgrounds/bg-035.jpg", "/backgrounds/bg-036.jpg"],
  ["/backgrounds/bg-037.jpg", "/backgrounds/bg-038.jpg", "/backgrounds/bg-039.jpg", "/backgrounds/bg-040.jpg", "/backgrounds/bg-041.jpg", "/backgrounds/bg-042.jpg", "/backgrounds/bg-043.jpg", "/backgrounds/bg-044.jpg", "/backgrounds/bg-045.jpg", "/backgrounds/bg-046.jpg", "/backgrounds/bg-047.jpg", "/backgrounds/bg-048.jpg"],
  ["/backgrounds/bg-049.jpg", "/backgrounds/bg-050.jpg", "/backgrounds/bg-051.jpg", "/backgrounds/bg-052.jpg", "/backgrounds/bg-053.jpg", "/backgrounds/bg-054.jpg", "/backgrounds/bg-055.jpg", "/backgrounds/bg-056.jpg", "/backgrounds/bg-057.jpg", "/backgrounds/bg-058.jpg", "/backgrounds/bg-059.jpg", "/backgrounds/bg-060.jpg"],
  ["/backgrounds/bg-061.jpg", "/backgrounds/bg-062.jpg", "/backgrounds/bg-063.jpg", "/backgrounds/bg-064.jpg", "/backgrounds/bg-065.jpg", "/backgrounds/bg-066.jpg", "/backgrounds/bg-067.jpg", "/backgrounds/bg-068.jpg", "/backgrounds/bg-069.jpg", "/backgrounds/bg-070.jpg", "/backgrounds/bg-071.jpg"],
];

/** Which background-set is "today's" — stable all day, changes at local midnight. */
export function daySetIndexForToday(): number {
  const dayNumber = Math.floor(Date.now() / 86400000);
  return dayNumber % BACKGROUND_SETS.length;
}

export function backgroundFor(daySet: string[], index: number): string {
  return daySet[index % daySet.length];
}

export function levelForDays(n: number) {
  if (n >= 365) return "Sâlih";
  if (n >= 100) return "Mouhsin";
  if (n >= 30) return "Constant";
  if (n >= 7) return "Régulier";
  return "Débutant";
}
