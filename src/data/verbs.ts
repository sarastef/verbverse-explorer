export type VerbGroup = "G1" | "G2" | "G3";

export interface Verb {
  id: string;
  japanese: string;
  romaji: string;
  meaning_en: string;
  meaning_fr: string;
  meaning_es: string;
  group: VerbGroup;
  rule: string;
  dictionary_form: string;
  masu_form: string;
  te_form: string;
  nai_form: string;
  verb_type_en: string;
  verb_type_fr: string;
  verb_type_es: string;
  example_sentence: string;
  example_en: string;
  example_fr: string;
  example_es: string;
  hint_en: string;
  hint_fr: string;
  hint_es: string;
}

const typeRegular = { en: "Regular verb", fr: "Verbe régulier", es: "Verbo regular" };
const typeIrregular = { en: "Irregular verb", fr: "Verbe irrégulier", es: "Verbo irregular" };
const t = (g: VerbGroup, irregular = false) =>
  irregular
    ? { verb_type_en: typeIrregular.en, verb_type_fr: typeIrregular.fr, verb_type_es: typeIrregular.es }
    : { verb_type_en: typeRegular.en, verb_type_fr: typeRegular.fr, verb_type_es: typeRegular.es };

export const verbs: Verb[] = [
  { id: "nomu", japanese: "飲む", romaji: "nomu", meaning_en: "to drink", meaning_fr: "boire", meaning_es: "beber", group: "G1", rule: "む → んで", dictionary_form: "のむ", masu_form: "のみます", te_form: "のんで", nai_form: "のまない", ...t("G1"), example_sentence: "水をのんで。", example_en: "Drink water.", example_fr: "Bois de l'eau.", example_es: "Bebe agua.", hint_en: "Group 1 verbs ending in む change to んで.", hint_fr: "Les verbes du groupe 1 en む deviennent んで.", hint_es: "Los verbos del grupo 1 en む cambian a んで." },
  { id: "taberu", japanese: "食べる", romaji: "taberu", meaning_en: "to eat", meaning_fr: "manger", meaning_es: "comer", group: "G2", rule: "る → て", dictionary_form: "たべる", masu_form: "たべます", te_form: "たべて", nai_form: "たべない", ...t("G2"), example_sentence: "すしをたべて。", example_en: "Eat sushi.", example_fr: "Mange des sushis.", example_es: "Come sushi.", hint_en: "Group 2 verbs drop る and add て.", hint_fr: "Les verbes du groupe 2 perdent る et prennent て.", hint_es: "Los verbos del grupo 2 quitan る y añaden て." },
  { id: "kiku", japanese: "聞く", romaji: "kiku", meaning_en: "to listen", meaning_fr: "écouter", meaning_es: "escuchar", group: "G1", rule: "く → いて", dictionary_form: "きく", masu_form: "ききます", te_form: "きいて", nai_form: "きかない", ...t("G1"), example_sentence: "音楽をきいて。", example_en: "Listen to music.", example_fr: "Écoute de la musique.", example_es: "Escucha música.", hint_en: "Verbs ending in く become いて.", hint_fr: "Les verbes en く deviennent いて.", hint_es: "Los verbos en く cambian a いて." },
  { id: "iku", japanese: "行く", romaji: "iku", meaning_en: "to go", meaning_fr: "aller", meaning_es: "ir", group: "G1", rule: "exception → いって", dictionary_form: "いく", masu_form: "いきます", te_form: "いって", nai_form: "いかない", ...t("G1", true), example_sentence: "学校にいって。", example_en: "Go to school.", example_fr: "Va à l'école.", example_es: "Ve a la escuela.", hint_en: "Irregular: iku becomes itte, not iite.", hint_fr: "Irrégulier : iku devient itte.", hint_es: "Irregular: iku se convierte en itte." },
  { id: "miru", japanese: "見る", romaji: "miru", meaning_en: "to see", meaning_fr: "voir", meaning_es: "ver", group: "G2", rule: "る → て", dictionary_form: "みる", masu_form: "みます", te_form: "みて", nai_form: "みない", ...t("G2"), example_sentence: "映画をみて。", example_en: "Watch the movie.", example_fr: "Regarde le film.", example_es: "Mira la película.", hint_en: "Group 2 pattern: drop る, add て.", hint_fr: "Groupe 2 : retirer る, ajouter て.", hint_es: "Grupo 2: quitar る, añadir て." },
  { id: "suru", japanese: "する", romaji: "suru", meaning_en: "to do", meaning_fr: "faire", meaning_es: "hacer", group: "G3", rule: "irregular → して", dictionary_form: "する", masu_form: "します", te_form: "して", nai_form: "しない", ...t("G3", true), example_sentence: "宿題をして。", example_en: "Do your homework.", example_fr: "Fais tes devoirs.", example_es: "Haz la tarea.", hint_en: "Irregular verb: suru → shite.", hint_fr: "Verbe irrégulier : suru → shite.", hint_es: "Verbo irregular: suru → shite." },
  { id: "kuru", japanese: "来る", romaji: "kuru", meaning_en: "to come", meaning_fr: "venir", meaning_es: "venir", group: "G3", rule: "irregular → きて", dictionary_form: "くる", masu_form: "きます", te_form: "きて", nai_form: "こない", ...t("G3", true), example_sentence: "こっちにきて。", example_en: "Come here.", example_fr: "Viens ici.", example_es: "Ven aquí.", hint_en: "Irregular verb: kuru → kite.", hint_fr: "Verbe irrégulier : kuru → kite.", hint_es: "Verbo irregular: kuru → kite." },
  { id: "kau", japanese: "買う", romaji: "kau", meaning_en: "to buy", meaning_fr: "acheter", meaning_es: "comprar", group: "G1", rule: "う → って", dictionary_form: "かう", masu_form: "かいます", te_form: "かって", nai_form: "かわない", ...t("G1"), example_sentence: "パンをかって。", example_en: "Buy bread.", example_fr: "Achète du pain.", example_es: "Compra pan.", hint_en: "う/つ/る verbs become って.", hint_fr: "Les verbes en う/つ/る deviennent って.", hint_es: "Los verbos en う/つ/る cambian a って." },
  { id: "yomu", japanese: "読む", romaji: "yomu", meaning_en: "to read", meaning_fr: "lire", meaning_es: "leer", group: "G1", rule: "む → んで", dictionary_form: "よむ", masu_form: "よみます", te_form: "よんで", nai_form: "よまない", ...t("G1"), example_sentence: "本をよんで。", example_en: "Read the book.", example_fr: "Lis le livre.", example_es: "Lee el libro.", hint_en: "む/ぶ/ぬ verbs become んで.", hint_fr: "Les verbes en む/ぶ/ぬ deviennent んで.", hint_es: "Los verbos en む/ぶ/ぬ cambian a んで." },
  { id: "hanasu", japanese: "話す", romaji: "hanasu", meaning_en: "to speak", meaning_fr: "parler", meaning_es: "hablar", group: "G1", rule: "す → して", dictionary_form: "はなす", masu_form: "はなします", te_form: "はなして", nai_form: "はなさない", ...t("G1"), example_sentence: "日本語ではなして。", example_en: "Speak in Japanese.", example_fr: "Parle en japonais.", example_es: "Habla en japonés.", hint_en: "す verbs become して.", hint_fr: "Les verbes en す deviennent して.", hint_es: "Los verbos en す cambian a して." },
  { id: "matsu", japanese: "待つ", romaji: "matsu", meaning_en: "to wait", meaning_fr: "attendre", meaning_es: "esperar", group: "G1", rule: "つ → って", dictionary_form: "まつ", masu_form: "まちます", te_form: "まって", nai_form: "またない", ...t("G1"), example_sentence: "ちょっとまって。", example_en: "Wait a moment.", example_fr: "Attends un instant.", example_es: "Espera un momento.", hint_en: "つ verbs become って.", hint_fr: "Les verbes en つ deviennent って.", hint_es: "Los verbos en つ cambian a って." },
  { id: "kaku", japanese: "書く", romaji: "kaku", meaning_en: "to write", meaning_fr: "écrire", meaning_es: "escribir", group: "G1", rule: "く → いて", dictionary_form: "かく", masu_form: "かきます", te_form: "かいて", nai_form: "かかない", ...t("G1"), example_sentence: "名前をかいて。", example_en: "Write your name.", example_fr: "Écris ton nom.", example_es: "Escribe tu nombre.", hint_en: "く verbs become いて.", hint_fr: "Les verbes en く deviennent いて.", hint_es: "Los verbos en く cambian a いて." },
  { id: "okiru", japanese: "起きる", romaji: "okiru", meaning_en: "to wake up", meaning_fr: "se lever", meaning_es: "levantarse", group: "G2", rule: "る → て", dictionary_form: "おきる", masu_form: "おきます", te_form: "おきて", nai_form: "おきない", ...t("G2"), example_sentence: "はやくおきて。", example_en: "Wake up early.", example_fr: "Lève-toi tôt.", example_es: "Levántate temprano.", hint_en: "Group 2: drop る, add て.", hint_fr: "Groupe 2 : retirer る, ajouter て.", hint_es: "Grupo 2: quitar る, añadir て." },
  { id: "neru", japanese: "寝る", romaji: "neru", meaning_en: "to sleep", meaning_fr: "dormir", meaning_es: "dormir", group: "G2", rule: "る → て", dictionary_form: "ねる", masu_form: "ねます", te_form: "ねて", nai_form: "ねない", ...t("G2"), example_sentence: "はやくねて。", example_en: "Go to sleep early.", example_fr: "Dors tôt.", example_es: "Duerme temprano.", hint_en: "Group 2: drop る, add て.", hint_fr: "Groupe 2 : retirer る, ajouter て.", hint_es: "Grupo 2: quitar る, añadir て." },
  { id: "asobu", japanese: "遊ぶ", romaji: "asobu", meaning_en: "to play", meaning_fr: "jouer", meaning_es: "jugar", group: "G1", rule: "ぶ → んで", dictionary_form: "あそぶ", masu_form: "あそびます", te_form: "あそんで", nai_form: "あそばない", ...t("G1"), example_sentence: "公園であそんで。", example_en: "Play at the park.", example_fr: "Joue au parc.", example_es: "Juega en el parque.", hint_en: "ぶ verbs become んで.", hint_fr: "Les verbes en ぶ deviennent んで.", hint_es: "Los verbos en ぶ cambian a んで." },
  { id: "oyogu", japanese: "泳ぐ", romaji: "oyogu", meaning_en: "to swim", meaning_fr: "nager", meaning_es: "nadar", group: "G1", rule: "ぐ → いで", dictionary_form: "およぐ", masu_form: "およぎます", te_form: "およいで", nai_form: "およがない", ...t("G1"), example_sentence: "海でおよいで。", example_en: "Swim in the sea.", example_fr: "Nage dans la mer.", example_es: "Nada en el mar.", hint_en: "ぐ verbs become いで.", hint_fr: "Les verbes en ぐ deviennent いで.", hint_es: "Los verbos en ぐ cambian a いで." },
];
