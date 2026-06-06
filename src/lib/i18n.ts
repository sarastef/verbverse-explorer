export type Lang = "en" | "fr" | "es";

export interface Dict {
  tagline: string;
  searchPlaceholder: string;
  filters: string;
  allVerbs: string;
  group1: string;
  group2: string;
  group3: string;
  teForm: string;
  saved: string;
  note: string;
  stats: { verbs: string; mastered: string; review: string; today: string };
  allVerbsTitle: string;
  allVerbsSub: string;
  startPractice: string;
  dictionary: string;
  masu: string;
  te: string;
  practice: string;
  save: string;
  practiceArea: string;
  practiceSub: string;
  sessionProgress: string;
  prompt: string;
  check: string;
  correct: string;
  incorrect: string;
  quickSession: string;
  teFormDrill: string;
  mixed: string;
  continuePractice: string;
  next: string;
  typeAnswer: string;
  noResults: string;
  resultsFor: string;
}

export const translations: Record<Lang, Dict> = {
  en: {
    tagline: "Practice Japanese verbs with calm, focused cards.",
    searchPlaceholder: "Search any verb in English, French, Spanish, romaji, kana, or kanji",
    filters: "Filters",
    allVerbs: "All verbs",
    group1: "Group 1",
    group2: "Group 2",
    group3: "Group 3",
    teForm: "Te-form",
    saved: "Saved",
    note: "Browse every verb first, then narrow down and jump into practice.",
    stats: { verbs: "Verbs", mastered: "Mastered", review: "Review", today: "Today" },
    allVerbsTitle: "All Verbs",
    allVerbsSub: "Scrollable verb cards with clean hierarchy",
    startPractice: "Start Practice",
    dictionary: "Dictionary",
    masu: "Masu",
    te: "Te",
    practice: "Practice",
    save: "Save",
    practiceArea: "Practice Area",
    practiceSub: "Open from any card or continue from the home screen",
    sessionProgress: "Session progress",
    prompt: "Prompt",
    check: "Check",
    correct: "Correct!",
    incorrect: "Not quite — answer:",
    quickSession: "Quick session options",
    teFormDrill: "Te-form",
    mixed: "Mixed",
    continuePractice: "Continue Practice",
    next: "Next",
    typeAnswer: "Type the te-form…",
    noResults: "No verbs match your search.",
    resultsFor: "Results for",
  },
  fr: {
    tagline: "Pratique les verbes japonais avec des cartes claires et apaisées.",
    searchPlaceholder: "Cherche un verbe en anglais, français, espagnol, romaji, kana ou kanji",
    filters: "Filtres",
    allVerbs: "Tous les verbes",
    group1: "Groupe 1",
    group2: "Groupe 2",
    group3: "Groupe 3",
    teForm: "Forme en Te",
    saved: "Favoris",
    note: "Explore tous les verbes, puis affine et lance la pratique.",
    stats: { verbs: "Verbes", mastered: "Maîtrisés", review: "À revoir", today: "Aujourd'hui" },
    allVerbsTitle: "Tous les verbes",
    allVerbsSub: "Cartes défilantes avec une hiérarchie claire",
    startPractice: "Lancer la pratique",
    dictionary: "Dictionnaire",
    masu: "Masu",
    te: "Te",
    practice: "Pratiquer",
    save: "Garder",
    practiceArea: "Zone de pratique",
    practiceSub: "Ouvre depuis n'importe quelle carte ou continue ici",
    sessionProgress: "Progression",
    prompt: "Énoncé",
    check: "Vérifier",
    correct: "Correct !",
    incorrect: "Presque — réponse :",
    quickSession: "Options rapides",
    teFormDrill: "Forme en Te",
    mixed: "Mixte",
    continuePractice: "Continuer",
    next: "Suivant",
    typeAnswer: "Tape la forme en te…",
    noResults: "Aucun verbe ne correspond.",
    resultsFor: "Résultats pour",
  },
  es: {
    tagline: "Practica verbos japoneses con tarjetas claras y enfocadas.",
    searchPlaceholder: "Busca un verbo en inglés, francés, español, romaji, kana o kanji",
    filters: "Filtros",
    allVerbs: "Todos los verbos",
    group1: "Grupo 1",
    group2: "Grupo 2",
    group3: "Grupo 3",
    teForm: "Forma Te",
    saved: "Guardados",
    note: "Explora todos los verbos, luego filtra y empieza a practicar.",
    stats: { verbs: "Verbos", mastered: "Dominados", review: "Repasar", today: "Hoy" },
    allVerbsTitle: "Todos los verbos",
    allVerbsSub: "Tarjetas desplazables con jerarquía clara",
    startPractice: "Empezar práctica",
    dictionary: "Diccionario",
    masu: "Masu",
    te: "Te",
    practice: "Practicar",
    save: "Guardar",
    practiceArea: "Área de práctica",
    practiceSub: "Abre desde cualquier tarjeta o continúa aquí",
    sessionProgress: "Progreso",
    prompt: "Enunciado",
    check: "Comprobar",
    correct: "¡Correcto!",
    incorrect: "Casi — respuesta:",
    quickSession: "Opciones rápidas",
    teFormDrill: "Forma Te",
    mixed: "Mixto",
    continuePractice: "Continuar",
    next: "Siguiente",
    typeAnswer: "Escribe la forma te…",
    noResults: "Ningún verbo coincide.",
    resultsFor: "Resultados para",
  },
};
