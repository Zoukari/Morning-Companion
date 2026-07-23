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

// Azkar du soir — facultatif, même mécanique que le matin mais contenu propre au soir.
export const EVENING_ADHKAR: AdhkarItem[] = [
  { id: "ev-kursi", title: "Ayat al-Kursi", repetitions: 1,
    arabic: "اللّٰهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ" },
  { id: "ev-ikhlas", title: "Sourate Al-Ikhlas", repetitions: 3,
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ" },
  { id: "ev-falaq", title: "Sourate Al-Falaq", repetitions: 3,
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ" },
  { id: "ev-nas", title: "Sourate An-Nas", repetitions: 3,
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ" },
  { id: "ev-amsayna", title: "Amsayna wa amsal-mulku lillah", repetitions: 1,
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ" },
  { id: "ev-sayyid", title: "Sayyid al-Istighfar (soir)", repetitions: 1,
    arabic: "اللهم أنت ربي لا إله إلا أنت خلقتني وأنا عبدك وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت" },
  { id: "ev-amsayna-bika", title: "Allahumma bika amsayna", repetitions: 1,
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ" },
  { id: "ev-kalimat", title: "Protection par les paroles d'Allah", repetitions: 3,
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ" },
  { id: "ev-hamm-hazan", title: "Protection contre soucis et tristesse", repetitions: 3,
    arabic: "اللهم إني أعوذ بك من الهم والحزن وأعوذ بك من العجز والكسل وأعوذ بك من الجبن والبخل وأعوذ بك من غلبة الدين وقهر الرجال" },
  { id: "ev-afiya", title: "Demande de bien-être", repetitions: 1,
    arabic: "اللهم إني أسألك العافية في الدنيا والآخرة" },
  { id: "ev-tasbih-100", title: "Subhanallahi wa bihamdih", repetitions: 100, isCounter: true,
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ" },
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

export type Quote = { text: string; arabic?: string; source: string };

// A curated set of well-known ayat, hadith and scholarly quotes, FR + AR where
// the Arabic wording is well-established. This is intentionally not padded
// out to an arbitrary count with anything unverified — better a shorter list
// Claude is confident in than a long one with shaky attributions. Easy to
// extend later: just add more objects in the same shape.
export const QUOTES: Quote[] = [
  { text: "Et quiconque place sa confiance en Allah, Il lui suffit.", arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", source: "Sourate At-Talaq, 65:3" },
  { text: "C'est par le rappel d'Allah que les cœurs s'apaisent.", arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", source: "Sourate Ar-Ra'd, 13:28" },
  { text: "Allah n'impose à une âme que ce qu'elle peut supporter.", arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", source: "Sourate Al-Baqara, 2:286" },
  { text: "Avec la difficulté vient certainement la facilité.", arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", source: "Sourate Ash-Sharh, 94:6" },
  { text: "Invoquez-Moi, Je vous répondrai.", arabic: "ادْعُونِي أَسْتَجِبْ لَكُمْ", source: "Sourate Ghafir, 40:60" },
  { text: "Allah aime ceux qui reviennent sans cesse à Lui et ceux qui se purifient.", arabic: "إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ", source: "Sourate Al-Baqara, 2:222" },
  { text: "Ne perdez pas espoir de la miséricorde d'Allah.", arabic: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", source: "Sourate Az-Zumar, 39:53" },
  { text: "Si vous êtes reconnaissants, très certainement Je vous accorderai davantage.", arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ", source: "Sourate Ibrahim, 14:7" },
  { text: "Certes, la prière préserve de la turpitude et de ce qui est blâmable.", arabic: "إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ", source: "Sourate Al-'Ankabut, 29:45" },
  { text: "Ton Seigneur n'a pas pris congé de toi, et Il ne te méprise pas.", arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", source: "Sourate Ad-Duha, 93:3" },
  { text: "Rien ne nous atteint que ce qu'Allah a prescrit pour nous.", arabic: "قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا", source: "Sourate At-Tawba, 9:51" },
  { text: "En vérité, la prière est prescrite aux croyants à des moments déterminés.", arabic: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا", source: "Sourate An-Nisa, 4:103" },
  { text: "Ceux qui craignent Allah, quand un mal les touche du fait du Diable, se rappellent, et alors ils voient clair.", arabic: "إِنَّ الَّذِينَ اتَّقَوْا إِذَا مَسَّهُمْ طَائِفٌ مِّنَ الشَّيْطَانِ تَذَكَّرُوا فَإِذَا هُم مُّبْصِرُونَ", source: "Sourate Al-A'raf, 7:201" },
  { text: "Les actes ne valent que par les intentions.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne.", source: "Hadith rapporté par Al-Bukhari" },
  { text: "Celui qui ne remercie pas les gens ne remercie pas Allah.", source: "Hadith rapporté par At-Tirmidhi" },
  { text: "Aucun de vous n'aura la foi complète avant d'aimer pour son frère ce qu'il aime pour lui-même.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Le sourire adressé à ton frère est une aumône.", source: "Hadith rapporté par At-Tirmidhi" },
  { text: "Allah est doux et aime la douceur en toute chose.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "La force véritable n'est pas de vaincre autrui, mais de maîtriser sa colère.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Le croyant fort n'est pas celui qui triomphe des hommes, mais celui qui maîtrise ses passions.", source: "Hadith rapporté par Muslim" },
  { text: "Facilitez, ne compliquez pas ; annoncez la bonne nouvelle, ne rebutez pas.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Ta prière pour ton frère en son absence est exaucée.", source: "Hadith rapporté par Muslim" },
  { text: "Celui qui guide vers le bien a la même récompense que celui qui l'accomplit.", source: "Hadith rapporté par Muslim" },
  { text: "Deux bienfaits dont beaucoup de gens sont négligents : la santé et le temps libre.", source: "Hadith rapporté par Al-Bukhari" },
  { text: "L'homme le plus proche de moi le jour du Jugement sera celui dont le caractère est le meilleur.", source: "Hadith rapporté par At-Tirmidhi" },
  { text: "Sois dans ce bas monde comme un voyageur, ou comme quelqu'un qui passe.", source: "Hadith rapporté par Al-Bukhari" },
  { text: "Quand tu ne ressens plus de honte à mal agir, alors fais ce que tu veux.", source: "Hadith rapporté par Al-Bukhari" },
  { text: "Le cœur ne trouve le repos qu'en se rappelant d'Allah.", source: "Ibn Al-Qayyim" },
  { text: "La patience est une lumière qui n'a pas de fin.", source: "Ibn Taymiyyah" },
  { text: "Quand le cœur s'attache à autre chose qu'Allah, il devient l'esclave de ce à quoi il s'attache.", source: "Ibn Al-Qayyim" },
  { text: "Le repentir n'est jamais en retard tant que le dernier souffle n'est pas rendu.", source: "Ibn Al-Qayyim" },
  { text: "Si tu ne peux pas pleurer, essaie au moins de faire semblant, car le cœur dur ne s'attendrit qu'en se rappelant d'Allah.", source: "Ibn Al-Qayyim" },
  { text: "Ce qu'Allah t'a destiné viendra à toi, même si tu es faible ; ce qu'Il n'a pas destiné pour toi ne viendra pas, même si tu es fort.", source: "Ibn Taymiyyah" },
  { text: "Le Paradis d'ici-bas est la tranquillité du cœur.", source: "Ibn Taymiyyah" },
  { text: "Rien n'est plus utile au cœur que de rester seul avec Allah, à un moment donné, pour L'invoquer, réciter Son Livre et faire son introspection.", source: "Ibn Al-Qayyim" },
  { text: "Celui qui connaît vraiment Allah ne cesse jamais d'espérer en Lui.", source: "Ibn Ata'Illah" },
  { text: "Ne quitte pas ta place tant qu'Il ne t'a pas mis en mouvement, et n'agis pas tant qu'Il ne t'a pas assisté.", source: "Ibn Ata'Illah" },
  { text: "Il se peut qu'un péché soit la cause d'une bénédiction, s'il te conduit ensuite à te tenir devant ton Seigneur, brisé et humble.", source: "Ibn Ata'Illah" },
  { text: "La science sans action est comme un arbre sans fruit.", source: "Ibn Al-Qayyim" },
  { text: "Prends garde de vivre confiné à l'intérieur de toi-même, tu passerais à côté de nombreuses bontés cachées d'Allah.", source: "Ibn Ata'Illah" },
  { text: "Ton Seigneur t'a apporté ce qui te suffit ; c'est toi qui n'as pas apporté l'acceptation qui suffit.", source: "Ibn Ata'Illah" },
  { text: "La vraie richesse n'est pas d'avoir beaucoup de biens, mais la richesse est celle de l'âme.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Quiconque emprunte un chemin cherchant la science, Allah lui facilite un chemin vers le Paradis.", source: "Hadith rapporté par Muslim" },
  { text: "Aucune fatigue, maladie, souci, tristesse, tort ou chagrin n'atteint le musulman, pas même une épine qui le pique, sans qu'Allah n'en fasse une expiation pour ses péchés.", source: "Hadith rapporté par Al-Bukhari" },
  { text: "N'éprouve de la colère contre rien : si une chose te convient, remercie Allah ; sinon, patiente.", source: "Ibn Taymiyyah" },
  { text: "Réjouis-toi de trois choses : qu'Il t'ait fait connaître Sa religion, qu'Il ne t'ait pas fait dépendre d'un autre que Lui, et qu'Il ait accepté de toi une once de bonté.", source: "Ibn Ata'Illah" },
  { text: "Le plus grand bienfait sur toi est celui que tu ne remarques même pas, tant il est constant.", source: "Ibn Al-Qayyim" },
  { text: "Ô toi qui recherches la station des gens de bien, sache que la voie y menant passe par le sacrifice de tes envies.", source: "Ibn Al-Qayyim" },
  { text: "Toute chose a une sécheresse, et la sécheresse de la science est l'oubli.", source: "Ibn Al-Qayyim" },
  { text: "La gratitude est le fait de voir la faveur venir d'Allah, et non de la personne à travers qui elle est arrivée.", source: "Ibn Al-Qayyim" },

  // Davantage de hadiths authentiques
  { text: "Celui qui délivre un croyant d'une difficulté de ce bas monde, Allah le délivrera d'une difficulté du Jour dernier.", source: "Hadith rapporté par Muslim" },
  { text: "Allah dit : Je suis avec Mon serviteur tant qu'il se souvient de Moi.", arabic: "أَنَا مَعَ عَبْدِي إِذَا ذَكَرَنِي", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Le mensonge conduit à l'immoralité, et l'immoralité conduit au Feu.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "La sincérité conduit à la piété, et la piété conduit au Paradis.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Quiconque emprunte le chemin de la science, Allah lui facilite un chemin vers le Paradis.", source: "Hadith rapporté par Muslim" },
  { text: "Les gens les plus aimés d'Allah sont ceux qui sont les plus utiles à autrui.", source: "Hadith rapporté par Ad-Daraqutni, largement cité" },
  { text: "Rendez les choses faciles, ne les rendez pas difficiles.", arabic: "يَسِّرُوا وَلَا تُعَسِّرُوا", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Le meilleur d'entre vous avant l'Islam est le meilleur d'entre vous après l'Islam, s'il comprend.", source: "Hadith rapporté par Al-Bukhari" },
  { text: "Aucun serviteur ne pardonne à autrui sans qu'Allah n'élève son rang.", source: "Hadith rapporté par Muslim" },
  { text: "Ce qui est licite est clair, ce qui est illicite est clair, et entre les deux il y a des choses douteuses.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Quand le fils d'Adam meurt, ses œuvres s'arrêtent sauf trois : une aumône continue, une science utile, ou un enfant pieux qui prie pour lui.", source: "Hadith rapporté par Muslim" },
  { text: "Il n'est pas permis à un musulman de garder rancune contre son frère plus de trois jours.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Quiconque fait preuve de miséricorde, même envers un animal, Allah lui fera miséricorde.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "La meilleure des œuvres est la prière accomplie à son heure, puis la bonté envers les parents.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Quiconque maintient les liens de parenté, Allah maintient son lien avec lui.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Craignez l'invocation de l'opprimé, car il n'y a pas de voile entre elle et Allah.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Le meilleur de la charité est celle donnée alors qu'on en a encore besoin soi-même.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Quand tu invoques Allah, invoque-Le avec certitude qu'Il répondra.", source: "Hadith rapporté par At-Tirmidhi" },
  { text: "Allah accepte le repentir de Son serviteur tant que son dernier souffle n'est pas rendu.", source: "Hadith rapporté par At-Tirmidhi" },
  { text: "Deux paroles légères sur la langue, lourdes dans la balance, aimées d'Allah : Gloire et louange à Allah.", arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", source: "Hadith rapporté par Al-Bukhari et Muslim" },

  // Paroles du Prophète ﷺ
  { text: "Dis la vérité même si elle est amère.", source: "Hadith rapporté par Ahmad" },
  { text: "Le meilleur d'entre vous dans l'Islam est celui dont le caractère est le meilleur.", source: "Hadith rapporté par Al-Bukhari" },
  { text: "Celui qui ne fait pas preuve de miséricorde ne recevra pas de miséricorde.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Ce bas monde est une prison pour le croyant, et le Paradis pour le mécréant.", source: "Hadith rapporté par Muslim" },
  { text: "Profite de cinq choses avant cinq autres : ta jeunesse avant ta vieillesse, ta santé avant ta maladie...", source: "Hadith rapporté par Al-Hakim" },
  { text: "Le musulman est le frère du musulman ; il ne lui fait pas de tort et ne l'abandonne pas.", arabic: "الْمُسْلِمُ أَخُو الْمُسْلِمِ لَا يَظْلِمُهُ وَلَا يَخْذُلُهُ", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Quiconque croit en Allah et au Jour dernier, qu'il dise du bien ou qu'il se taise.", source: "Hadith rapporté par Al-Bukhari et Muslim" },
  { text: "Les gens sont comme des dents de peigne, égaux entre eux.", source: "Hadith rapporté par At-Tirmidhi" },
  { text: "Allah est beau et Il aime la beauté.", arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ", source: "Hadith rapporté par Muslim" },
  { text: "L'aumône éteint le péché comme l'eau éteint le feu.", source: "Hadith rapporté par At-Tirmidhi" },
  { text: "Ne te fâche pas.", source: "Hadith rapporté par Al-Bukhari" },
  { text: "Le meilleur d'entre vous est celui qui est le plus utile aux autres.", source: "Tradition prophétique largement citée" },
  { text: "Personne ne mange de meilleure nourriture que celle gagnée par le travail de ses propres mains.", source: "Hadith rapporté par Al-Bukhari" },
  { text: "Craignez Allah où que vous soyez.", source: "Hadith rapporté par At-Tirmidhi" },

  // Compagnons et califes
  { text: "Comptez vos actions avant qu'elles ne soient comptées pour vous.", source: "Omar ibn Al-Khattab" },
  { text: "Celui qui connaît sa propre faiblesse ne se laisse pas tromper par sa force.", source: "Omar ibn Al-Khattab" },
  { text: "Ne fais pas de tes propres yeux le seul témoin de la valeur d'un homme.", source: "Ali ibn Abi Talib" },
  { text: "La valeur d'un homme se mesure par ce qu'il fait de bien, non par ce qu'il possède.", source: "Ali ibn Abi Talib" },
  { text: "Celui qui se connaît lui-même connaît son Seigneur.", source: "Attribué à Ali ibn Abi Talib" },
  { text: "Ne t'attriste pas pour ce que tu as perdu, s'il devait rester, il ne se serait pas perdu.", source: "Ali ibn Abi Talib" },
  { text: "L'ignorant a deux caractéristiques : soit il parle sans savoir, soit il se met en colère sans raison.", source: "Ali ibn Abi Talib" },
  { text: "Le monde ici-bas passe et l'au-delà s'approche ; chacun d'eux a des enfants, alors soyez les enfants de l'au-delà.", source: "Abou Bakr As-Siddiq" },

  // Savants et sages de la tradition islamique
  { text: "Si tu ne peux pas être un savant, sois au moins celui qui aime la science.", source: "Al-Hasan Al-Basri" },
  { text: "Le fils d'Adam n'a que trois jours : celui qui est passé, tu n'y reviendras pas ; celui d'aujourd'hui, tu y es ; et celui de demain, tu ne sais pas si tu le verras.", source: "Al-Hasan Al-Basri" },
  { text: "Cherche la douceur du cœur en trois lieux : la récitation du Coran, les assemblées de rappel, et les moments de solitude.", source: "Al-Fudayl ibn Iyad" },
  { text: "Aime pour les autres ce que tu aimes pour toi-même, et cela suffit à ta religion.", source: "Al-Fudayl ibn Iyad" },
  { text: "Quiconque cherche la science pour elle-même se contente de peu.", source: "Sufyan Ath-Thawri" },
  { text: "Le savoir sans la piété est comme un corps sans âme.", source: "Attribué à l'Imam Ash-Shafi'i" },
  { text: "Ma patience face à mon ennemi est plus dure pour lui que sa propre inimitié.", source: "Imam Ash-Shafi'i" },
  { text: "Je n'ai jamais discuté avec quelqu'un dans l'espoir qu'il ait tort.", source: "Imam Ash-Shafi'i" },
  { text: "Celui qui n'a pas goûté à l'amertume de l'apprentissage ne connaîtra jamais la douceur de la connaissance.", source: "Attribué à l'Imam Malik" },
  { text: "On ne parvient à la science qu'en abandonnant le confort.", source: "Imam Malik ibn Anas" },
  { text: "Le cœur qui n'est pas attaché à Allah cherche sans fin ce qui ne le remplira jamais.", source: "Al-Ghazali" },
  { text: "La connaissance sans la pratique est une folie, et la pratique sans la connaissance est vaine.", source: "Al-Ghazali" },
  { text: "L'homme le plus sage est celui qui reconnaît son ignorance.", source: "Al-Ghazali" },
  { text: "Ne méprise jamais un péché, si petit soit-il, car ce que tu regardes comme petit peut être immense auprès d'Allah.", source: "Ibn Al-Jawzi" },
  { text: "La jeunesse passée sans science ni bonnes œuvres est une perte que ni les regrets ni les larmes ne peuvent réparer.", source: "Ibn Al-Jawzi" },
  { text: "Le temps est plus précieux que l'or, car l'or peut être retrouvé, le temps jamais.", source: "Ibn Al-Jawzi" },
  { text: "Il n'y a pas de plus grande richesse que la raison, ni de plus grande pauvreté que l'ignorance.", source: "Ibn Hazm" },
  { text: "Le silence sur ce qui ne te concerne pas est une sagesse, même si peu la pratiquent.", source: "Ibn Hazm" },
  { text: "Tout ce qui doit arriver est proche.", arabic: "كُلُّ مَا هُوَ آتٍ قَرِيبٌ", source: "Proverbe arabe" },
  { text: "Celui qui plante la patience récolte la réussite.", source: "Proverbe arabe" },
  { text: "La main qui donne est au-dessus de la main qui reçoit.", source: "Sagesse arabe" },
  { text: "Ce qui vient d'Allah, si tu patientes, arrive toujours au bon moment.", source: "Sagesse populaire" },
];

export const BADGES = [7, 30, 100, 365];

// Personalized reminders shown on Home, right after the greeting. {name} is
// replaced with the user's first name. Each one nudges toward a different
// everyday good deed — dhikr, sadaqa, salat, kindness, etc. — kept as gentle
// encouragement rather than exact hadith wording, to avoid misattribution.
export const ENCOURAGEMENTS = [
  "Ya {name}, aucune journée n'est meilleure que celle où l'on invoque Allah.",
  "Ya {name}, un sourire offert à quelqu'un aujourd'hui compte comme une aumône.",
  "Ya {name}, même une petite sadaqa donnée avec sincérité a une grande valeur auprès d'Allah.",
  "Ya {name}, n'oublie pas l'istighfar aujourd'hui — demander pardon adoucit le cœur.",
  "Ya {name}, prends un instant pour appeler tes parents ou prendre de leurs nouvelles.",
  "Ya {name}, garder la langue douce aujourd'hui est une forme de piété.",
  "Ya {name}, une prière accomplie à son heure vaut mieux qu'une prière retardée.",
  "Ya {name}, lire quelques versets du Coran aujourd'hui illuminera ta journée.",
  "Ya {name}, la patience face à une contrariété aujourd'hui sera comptée pour toi.",
  "Ya {name}, pense à remercier Allah pour ce que tu as déjà, avant de demander plus.",
  "Ya {name}, une bonne parole envers quelqu'un aujourd'hui ne coûte rien et rapporte beaucoup.",
  "Ya {name}, garder le lien avec un proche que tu as délaissé est une œuvre qui rapproche d'Allah.",
  "Ya {name}, place ta confiance en Allah pour ce que tu ne contrôles pas aujourd'hui.",
  "Ya {name}, essaie de ne pas dire un mot que tu regretterais ce soir.",
  "Ya {name}, aide quelqu'un aujourd'hui sans qu'il ait besoin de le demander.",
  "Ya {name}, chaque pas vers la mosquée ou vers le bien est enregistré.",
  "Ya {name}, ce n'est jamais trop tard dans la journée pour se rappeler d'Allah.",
  "Ya {name}, la sincérité dans les petites choses vaut plus que l'apparence dans les grandes.",
];

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
