const English = {
  common: {
    close: "Close",                 // For example, closing a modal window
    reset: "Reset",                 // For example, resetting selected symbols
    next: "Next",                   // For example, moving to the next screen of a lesson
    retry: "Retry",                 // For example, retrying a lesson
    complete: "Complete",           // For example, completing the last screen of a lesson
    start: "Start",                 // For example, starting a new lesson
    welcome: "Welcome",
  },

  tabs: {
    learning: "Learning",           // Tab with lessons
    practice: "Practice",           // Tab for practicing and revising knowledge
    kana: "Kana",                   // Tab with the Hiragana and Katakana alphabets
    profile: "Settings",            // Tab for settings where users can enable/disable features
  },

  practice: {
    modeTitle: "Mode",              // For example, "Mode" of a game
    mode: {
      cards: "Cards",             // "Cards" mode where you choose the answer from four options
      input: "Input",             // "Input" mode where you manually type the answer
      drawing: "Drawing",         // "Drawing" mode where you draw a character
      words: "Words",             // "Words" mode where you select or build a word
    },

    wordsMode: {
      choice: "Choice",                    // Game mode to select the word
      wordBuilding: "Build a Word",        // Game mode to build a word from letters
      findThePair: "Match the Pair",       // Game mode to match word pairs
    },

    additionally: "Additional",            // Additional practice settings
    timeTest: "Timer",                     // Enable a "timer" to make the game timed
    oneAttempt: "One Attempt",             // One attempt - if the answer is wrong, it moves to the next question

    check: "Check",                        // For example, checking if a character is written correctly
    question: "Question",                  // For example, "Question" #10

    timer: {
      fast: "3 sec",                      // Timer speed: 3 seconds, abbreviated
      medium: "5 sec",                    // Timer speed: 5 seconds, abbreviated
      slow: "7 sec",                      // Timer speed: 7 seconds, abbreviated
    },

    selectCorrectTransliteration: "Select the correct transliteration.",

    selectHiraganaForWord: "Select Hiragana in the correct order.",
    selectKatakanaForWord: "Select Katakana in the correct order.",

    tooltip: {
      syllablesSelectMoreThan5: "* More than 5 syllables must be selected",
      cardSelectAtLeastOne: "* At least one card type must be selected",
      wordsSelectMoreThan10: "* More than 10 words must be available",
      modeSelectAtLeastOne: "* At least one mode must be selected",
      leastTenLettersMustBeSelectedFromBasic: "* More than 5 syllables from the basic alphabet must be selected",
    },
  },

  kana: {
    hiragana: "Hiragana",           // Japanese syllabary
    katakana: "Katakana",           // Japanese syllabary
    romanji: "Romaji",              // Transcription systems for writing Japanese words in Latin characters

    basic: "Basic",                 // Basic part of the Japanese syllabary
    dakuon: "Dakuon",               // Syllables with a diacritical mark
    handakuon: "Handakuon",         // Sounds in the 'h' row marked with a small circle
    yoon: "Yoon",                   // Combined sounds formed by merging syllables

    kana: "Syllable"                // Japanese is a syllabary; for instance, the syllable KA is か
  },

  selectKana: {
    words: "Words for practice",                 // For example, 100 words selected for learning
    nothingSelected: "Nothing selected" // When nothing is selected and this needs to be indicated
  },

  settings: {
    displayStatistics: "Display statistics",   // Toggle to show/hide statistics
    hapticFeedback: "Haptic feedback",         // Toggle for haptic feedback (vibration on button presses)
    theme: {
      title: "Theme",                        // Application theme
      light: "Light",                        // Light theme
      dark: "Dark",                          // Dark theme
      auto: "Automatic",                     // Automatic/system theme
    },
    language: "Language",                      // Interface language
    privacyPolicy: "Privacy Policy",          // Link to the privacy policy
    contactSupport: "Contact Support",        // Contact support (email us)

    joinOurCommunity: {
      title: "Join our community",          // Button in settings leading to a Telegram channel
    },

    eraseData: {
      button: "Clear app data",             // Button to erase app data
      dataTakesUp: "Data occupies",         // For example, "Data occupies 10KB"
      title: "Are you sure you want to clear the data?", // Question asking if the user is sure about deleting data
      subtitle: "All saved data, including settings and progress, will be deleted. This action is irreversible." // Warning
    },

    sourceCode: {
      title: "Source Code",                 // Button leading to GitHub
      githubRepository: "GitHub Repository", // Subtitle of the button leading to GitHub
    },
    version: "Version",                       // Application version, e.g., Version 2.24.3

    changeLanguageCaption: "You can change the application language in the settings."
  },

  result: {
    title: "Practice completed",             // Message on the last screen after practice
    score: "Score",                          // Practice result, e.g., Score 7/10 (7 correct answers out of 10)

    wellDoneNoErrors: "Excellent work, no errors!", // Message on the results screen

    sec: "sec",                              // Abbreviation for seconds, e.g., 12 sec
    min: "min",                              // Abbreviation for minutes, e.g., 12 min

    question: "question",                    // For example, question 10 out of 12

    details: "Details",                      // Header of the section with detailed test statistics

    alphabet: "Alphabet",                    // Japanese alphabet (Katakana or Hiragana)

    fastestAnswer: "Fastest answer",         // In statistics, the answer with the shortest response time
    slowestAnswer: "Slowest answer",         // In statistics, the answer with the longest response time

    incorrectAnswers: "Incorrect answers",   // Answers that were incorrect

    incorrectWordBuilding: "Incorrect answers in word building",  // Incorrect answers in the "Build a Word" sub-mode
    incorrectFindPair: "Incorrect answers in pair matching",      // Incorrect answers in the "Match the Pair" sub-mode
    incorrectChoice: "Incorrect answers in word choice",          // Incorrect answers in the "Word Choice" sub-mode

    done: "Done"
  },

  lessonsList: {
    chapter: "Chapter",                     // Chapter with lessons, e.g., Chapter 1 - Hiragana
    completed: "completed",                 // Indicates if the lesson is completed
    lesson: "Lesson",                       // For example, Lesson 1

    firstLessonInSectionTitle: "Learn to write the first {{count}} syllables.",   // Description of what you'll learn in the lesson
    continuingLessonsTitle: "Learn to write the next {{count}} syllables.",       // Description of what you'll learn in the lesson
    finalLessonInSectionTitle: "Learn to write the last {{count}} syllables."     // Description of what you'll learn in the lesson
  },

  lesson: {
    rememberWritingAndSoundLetter:
      "Remember the stroke order and pronunciation of this syllable.",
    drawSyllable: "Draw the syllable '{{syllable}}' in the correct order.",
    matchHiraganaWithTransliteration: "Match Hiragana with its transliteration.",
    matchKatakanaWithTransliteration: "Match Katakana with its transliteration.",
    selectCorrectTransliteration:
      "Select the correct transliteration for the syllable '{{syllable}}'.",
    chooseCorrectTransliterationSequence:
      "Choose the correct transliteration sequence.",
    arrangeSyllablesInCorrectOrder:
      "Arrange the syllables in the correct order.",
    practiceEveryDay: "Practice every day to reinforce your knowledge.",
    learningComplete: "Lesson completed!",
  },

  transliterationSystems: {
    transliterationSystems: "Transliteration systems",
    romajiLatin: "Romaji (Latin)",
    transliterationInCyrillic: "Transliteration in Cyrillic",

    russianPhoneticTransliteration: "Russian Phonetic",

    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
  },

  alert: {
    exitConformation: {
      title: "Are you sure you want to exit?",
      subtitle: "Your progress will not be saved if you exit now."
    },

    cancel: "Cancel",
    ok: "OK",
    confirm: "Confirm",
  }
};

export default English;