const French = {
  common: {
    close: "Fermer",                 // Par exemple, fermer une fenêtre modale
    reset: "Réinitialiser",          // Par exemple, réinitialiser les symboles sélectionnés
    next: "Suivant",                 // Par exemple, passer à l'écran suivant de la leçon
    retry: "Réessayer",              // Par exemple, recommencer une leçon
    complete: "Terminer",            // Par exemple, terminer l'écran final d'une leçon
    start: "Commencer",              // Par exemple, commencer une nouvelle leçon
    welcome: "Bienvenue"
  },

  tabs: {
    learning: "Apprentissage",       // Onglet avec les leçons
    practice: "Pratique",            // Onglet pour pratiquer et réviser les connaissances
    kana: "Kana",                    // Onglet avec les alphabets Hiragana et Katakana
    profile: "Paramètres",           // Onglet des paramètres où l'utilisateur peut activer/désactiver des fonctionnalités
  },

  practice: {
    modeTitle: "Mode",               // Par exemple, le "mode" du jeu
    mode: {
      cards: "Cartes",             // Mode "Cartes" où l'on choisit la réponse parmi quatre options
      input: "Saisie",             // Mode "Saisie" où l'on saisit manuellement la réponse
      drawing: "Dessin",           // Mode "Dessin" où l'on dessine un caractère
      words: "Mots",               // Mode "Mots" où l'on sélectionne ou compose un mot
    },

    wordsMode: {
      choice: "Choix",                     // Mode de jeu où il faut choisir un mot
      wordBuilding: "Composer un mot",     // Mode de jeu où il faut composer un mot à partir de lettres
      findThePair: "Associer les paires",  // Mode de jeu où il faut associer des paires de mots
    },

    additionally: "Supplémentaire",         // Paramètres supplémentaires pour la pratique
    timeTest: "Chronomètre",               // Activer le "chronomètre" pour une partie chronométrée
    oneAttempt: "Un essai",                // Un essai - en cas de mauvaise réponse, la question suivante s'affiche directement

    check: "Vérifier",                     // Par exemple, vérifier si un caractère est bien écrit
    question: "Question",                  // Par exemple, "Question" n°10

    timer: {
      fast: "3 sec",                      // Vitesse du chronomètre : 3 secondes, abrégé
      medium: "5 sec",                    // Vitesse du chronomètre : 5 secondes, abrégé
      slow: "7 sec",                      // Vitesse du chronomètre : 7 secondes, abrégé
    },

    selectCorrectTransliteration: "Sélectionnez la translittération correcte.",

    selectHiraganaForWord: "Sélectionnez les Hiragana dans le bon ordre.",
    selectKatakanaForWord: "Sélectionnez les Katakana dans le bon ordre.",

    tooltip: {
      syllablesSelectMoreThan5: "* Plus de 5 syllabes doivent être sélectionnées",
      cardSelectAtLeastOne: "* Au moins un type de carte doit être sélectionné",
      wordsSelectMoreThan10: "* Plus de 10 mots doivent être disponibles",
      modeSelectAtLeastOne: "* Au moins un mode doit être sélectionné",
      leastTenLettersMustBeSelectedFromBasic: "* Plus de 5 syllabes de l'alphabet de base doivent être sélectionnées",
    },
  },

  kana: {
    hiragana: "Hiragana",           // Syllabaire japonais
    katakana: "Katakana",           // Syllabaire japonais
    romanji: "Romaji",              // Systèmes de transcription pour écrire des mots japonais avec des caractères latins

    basic: "De base",               // Partie de base du syllabaire japonais
    dakuon: "Dakuon",               // Syllabes avec un signe diacritique
    handakuon: "Handakuon",         // Sons de la rangée 'h' marqués par un petit cercle
    yoon: "Yoon",                   // Sons combinés formés par la fusion de syllabes

    kana: "Syllabe"                 // En japonais, l'alphabet est syllabique; par exemple, la syllabe KA est か
  },

  selectKana: {
    words: "Mots",                  // Par exemple, 100 mots sélectionnés pour l'apprentissage
    letters: "Syllabes",            // Par exemple, 5 syllabes sélectionnées (か き く け こ)
    nothingSelected: "Rien n'est sélectionné" // Lorsque rien n'est sélectionné et qu'il faut l'indiquer
  },

  settings: {
    displayStatistics: "Afficher les statistiques",  // Activer/désactiver l'affichage des statistiques
    hapticFeedback: "Retour haptique",               // Activer/désactiver le retour haptique (vibration au toucher)
    theme: {
      title: "Thème",                              // Thème de l'application
      light: "Clair",                              // Thème clair
      dark: "Sombre",                              // Thème sombre
      auto: "Automatique",                         // Thème automatique/système
    },
    language: "Langue",                              // Langue de l'interface
    privacyPolicy: "Politique de confidentialité",  // Lien vers la politique de confidentialité
    contactSupport: "Contacter le support",         // Contacter le support (par email)

    joinOurCommunity: {
      title: "Rejoignez notre communauté",        // Bouton dans les paramètres menant à un canal Telegram
    },

    eraseData: {
      button: "Effacer les données de l'application", // Bouton pour effacer les données de l'application
      dataTakesUp: "Les données occupent",           // Par exemple, "Les données occupent 10 Ko"
      title: "Êtes-vous sûr de vouloir effacer les données ?", // Question demandant confirmation pour effacer les données
      subtitle: "Toutes les données enregistrées, y compris les paramètres et la progression, seront supprimées. Cette action est irréversible." // Avertissement
    },

    sourceCode: {
      title: "Code source",                        // Bouton menant à GitHub
      githubRepository: "Dépôt GitHub",           // Sous-titre du bouton menant à GitHub
    },
    version: "Version",                             // Version de l'application, par exemple Version 2.24.3

    changeLanguageCaption: "Vous pouvez changer la langue de l'application dans les paramètres."
  },

  result: {
    title: "Pratique terminée",                    // Message affiché à la fin de la pratique
    score: "Score",                                // Résultat de la pratique, par exemple Score 7/10 (7 réponses correctes sur 10)

    wellDoneNoErrors: "Excellent travail, aucune erreur !", // Message à l'écran des résultats

    sec: "sec",                                    // Abréviation pour secondes, par exemple 12 sec
    min: "min",                                    // Abréviation pour minutes, par exemple 12 min

    question: "question",                          // Par exemple, question 10 sur 12

    details: "Détails",                            // Titre de la section détaillant les statistiques du test

    alphabet: "Alphabet",                          // Alphabet japonais (Katakana ou Hiragana)

    fastestAnswer: "Réponse la plus rapide",       // Dans les statistiques, réponse avec le temps le plus court
    slowestAnswer: "Réponse la plus lente",        // Dans les statistiques, réponse avec le temps le plus long

    incorrectAnswers: "Réponses incorrectes",      // Réponses données incorrectement

    incorrectWordBuilding: "Réponses incorrectes dans la composition de mots",  // Réponses incorrectes dans le sous-mode "Composer un mot"
    incorrectFindPair: "Réponses incorrectes dans l'association de paires",     // Réponses incorrectes dans le sous-mode "Associer les paires"
    incorrectChoice: "Réponses incorrectes dans le choix de mots",              // Réponses incorrectes dans le sous-mode "Choix de mots"

    done: "Terminé"
  },

  lessonsList: {
    chapter: "Chapitre",                          // Chapitre avec les leçons, par exemple Chapitre 1 - Hiragana
    completed: "terminé",                         // Indique si la leçon est terminée
    lesson: "Leçon",                              // Par exemple, Leçon 1

    firstLessonInSectionTitle: "Apprenez à écrire les {{count}} premières syllabes.",   // Description de ce que vous apprendrez dans la leçon
    continuingLessonsTitle: "Apprenez à écrire les {{count}} syllabes suivantes.",     // Description de ce que vous apprendrez dans la leçon
    finalLessonInSectionTitle: "Apprenez à écrire les {{count}} dernières syllabes."   // Description de ce que vous apprendrez dans la leçon
  },

  lesson: {
    rememberWritingAndSoundLetter:
      "Retenez l'ordre des traits et la prononciation de cette syllabe.",
    drawSyllable: "Dessinez la syllabe « {{syllable}} » dans le bon ordre.",
    matchHiraganaWithTransliteration: "Associez l'Hiragana à sa translittération.",
    matchKatakanaWithTransliteration: "Associez le Katakana à sa translittération.",
    selectCorrectTransliteration:
      "Sélectionnez la translittération correcte pour la syllabe « {{syllable}} ».",
    chooseCorrectTransliterationSequence:
      "Choisissez la séquence correcte de translittération.",
    arrangeSyllablesInCorrectOrder:
      "Disposez les syllabes dans le bon ordre.",
    practiceEveryDay: "Pratiquez chaque jour pour consolider vos connaissances.",
    learningComplete: "Leçon terminée !",
  },

  transliterationSystems: {
    transliterationSystems: "Systèmes de translittération",
    romajiLatin: "Romaji (latin)",
    transliterationInCyrillic: "Translittération en cyrillique",

    russianPhoneticTransliteration: "Phonétique russe",

    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
  },

  alert: {
    exitConformation: {
      title: "Êtes-vous sûr de vouloir quitter ?",
      subtitle: "Votre progression ne sera pas sauvegardée si vous quittez maintenant."
    },

    cancel: "Annuler",
    ok: "OK",
    confirm: "Confirmer",
  }
};

export default French;
