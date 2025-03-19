const German = {
  common: {
    close: "Schließen",             // Zum Beispiel ein modales Fenster schließen
    reset: "Zurücksetzen",          // Zum Beispiel ausgewählte Symbole zurücksetzen
    next: "Weiter",                 // Zum Beispiel zum nächsten Bildschirm der Lektion wechseln
    retry: "Wiederholen",           // Zum Beispiel eine Lektion erneut starten
    complete: "Abschließen",        // Zum Beispiel den letzten Bildschirm einer Lektion abschließen
    start: "Starten",               // Zum Beispiel eine neue Lektion starten
    welcome: "Willkommen"
  },

  tabs: {
    learning: "Lernen",             // Tab mit den Lektionen
    practice: "Üben",               // Tab für Übungen und Wiederholung
    kana: "Kana",                   // Tab mit den Hiragana- und Katakana-Alphabeten
    profile: "Einstellungen",       // Tab mit Einstellungen, um Funktionen ein- oder auszuschalten
  },

  practice: {
    modeTitle: "Modus",             // Zum Beispiel der "Modus" eines Spiels
    mode: {
      cards: "Karten",            // Modus "Karten", bei dem aus vier Optionen ausgewählt wird
      input: "Eingabe",           // Modus "Eingabe", bei dem die Antwort manuell eingegeben wird
      drawing: "Zeichnen",        // Modus "Zeichnen", bei dem ein Zeichen gezeichnet wird
      words: "Wörter",            // Modus "Wörter", bei dem Wörter ausgewählt oder gebildet werden
    },

    wordsMode: {
      choice: "Auswahl",                  // Spielmodus, bei dem ein Wort ausgewählt werden muss
      wordBuilding: "Wort bilden",        // Spielmodus, bei dem ein Wort aus Buchstaben gebildet wird
      findThePair: "Paare finden",        // Spielmodus, bei dem Wortpaare zugeordnet werden
    },

    additionally: "Zusätzlich",            // Zusätzliche Einstellungen für Übungen
    timeTest: "Timer",                     // Aktivieren eines "Timers" für zeitgesteuerte Spiele
    oneAttempt: "Ein Versuch",             // Ein Versuch - bei falscher Antwort wird direkt zur nächsten Frage gewechselt

    check: "Überprüfen",                   // Zum Beispiel die richtige Schreibweise eines Zeichens überprüfen
    question: "Frage",                     // Zum Beispiel "Frage" Nr. 10

    timer: {
      fast: "3 Sek.",                    // Timer-Geschwindigkeit: 3 Sekunden, abgekürzt
      medium: "5 Sek.",                  // Timer-Geschwindigkeit: 5 Sekunden, abgekürzt
      slow: "7 Sek.",                    // Timer-Geschwindigkeit: 7 Sekunden, abgekürzt
    },

    selectCorrectTransliteration: "Wählen Sie die richtige Transliteration aus.",

    selectHiraganaForWord: "Wählen Sie die Hiragana in der richtigen Reihenfolge aus.",
    selectKatakanaForWord: "Wählen Sie die Katakana in der richtigen Reihenfolge aus.",

    tooltip: {
      syllablesSelectMoreThan5: "* Es müssen mehr als 5 Silben ausgewählt werden",
      cardSelectAtLeastOne: "* Es muss mindestens ein Kartentyp ausgewählt werden",
      wordsSelectMoreThan10: "* Es müssen mehr als 10 Wörter verfügbar sein",
      modeSelectAtLeastOne: "* Es muss mindestens ein Modus ausgewählt werden",
      leastTenLettersMustBeSelectedFromBasic: "* Es müssen mehr als 5 Silben aus dem Grundalphabet ausgewählt werden",
    },
  },

  kana: {
    hiragana: "Hiragana",           // Japanisches Silbenalphabet
    katakana: "Katakana",           // Japanisches Silbenalphabet
    romanji: "Romaji",              // Transkriptionssysteme zur Darstellung japanischer Wörter mit lateinischen Buchstaben

    basic: "Grundlegend",           // Grundlegender Teil des japanischen Silbenalphabets
    dakuon: "Dakuon",               // Silben mit diakritischen Zeichen
    handakuon: "Handakuon",         // Laute der 'h'-Reihe mit einem kleinen Kreis
    yoon: "Yoon",                   // Kombinierte Laute, die durch das Verschmelzen von Silben entstehen

    kana: "Silbe"                   // Das japanische Alphabet ist silbenbasiert; z. B. ist die Silbe KA か
  },

  selectKana: {
    words: "Wörter",                // Zum Beispiel wurden 100 Wörter zum Lernen ausgewählt
    nothingSelected: "Nichts ausgewählt" // Wenn nichts ausgewählt ist und dies angezeigt werden muss
  },

  settings: {
    displayStatistics: "Statistiken anzeigen",   // Umschalter, um Statistiken anzuzeigen oder auszublenden
    hapticFeedback: "Haptisches Feedback",       // Umschalter für haptisches Feedback (Vibration bei Tastendruck)
    theme: {
      title: "Thema",                           // App-Thema
      light: "Hell",                            // Helles Thema
      dark: "Dunkel",                           // Dunkles Thema
      auto: "Automatisch",                      // Automatisches/systemweites Thema
    },
    language: "Sprache",                         // Schnittstellensprache
    privacyPolicy: "Datenschutzrichtlinie",     // Link zur Datenschutzrichtlinie
    contactSupport: "Support kontaktieren",     // Support kontaktieren (per E-Mail)

    joinOurCommunity: {
      title: "Treten Sie unserer Community bei", // Schaltfläche in den Einstellungen, die zu einem Telegram-Kanal führt
    },

    eraseData: {
      button: "App-Daten löschen",              // Schaltfläche zum Löschen der App-Daten
      dataTakesUp: "Daten belegen",             // Zum Beispiel "Daten belegen 10 KB"
      title: "Sind Sie sicher, dass Sie die Daten löschen möchten?", // Frage zur Bestätigung des Datenlöschens
      subtitle: "Alle gespeicherten Daten, einschließlich Einstellungen und Fortschritt, werden gelöscht. Diese Aktion ist unwiderruflich." // Warnung
    },

    sourceCode: {
      title: "Quellcode",                       // Schaltfläche, die zu GitHub führt
      githubRepository: "GitHub-Repository",   // Untertitel der Schaltfläche, die zu GitHub führt
    },
    version: "Version",                          // App-Version, z. B. Version 2.24.3

    changeLanguageCaption: "Sie können die Sprache der Anwendung in den Einstellungen ändern."
  },

  result: {
    title: "Übung abgeschlossen",               // Nachricht auf dem letzten Bildschirm nach der Übung
    score: "Punkte",                            // Übungsergebnis, z. B. Punkte 7/10 (7 richtige Antworten von 10)

    wellDoneNoErrors: "Hervorragend, keine Fehler!", // Nachricht auf dem Ergebnisbildschirm

    sec: "Sek.",                                // Abkürzung für Sekunden, z. B. 12 Sek.
    min: "Min.",                                // Abkürzung für Minuten, z. B. 12 Min.

    question: "Frage",                          // Zum Beispiel Frage 10 von 12

    details: "Details",                         // Überschrift des Abschnitts mit detaillierten Testergebnissen

    alphabet: "Alphabet",                       // Japanisches Alphabet (Katakana oder Hiragana)

    fastestAnswer: "Schnellste Antwort",        // In den Statistiken die Antwort mit der kürzesten Zeit
    slowestAnswer: "Langsamste Antwort",        // In den Statistiken die Antwort mit der längsten Zeit

    incorrectAnswers: "Falsche Antworten",      // Antworten, die falsch waren

    incorrectWordBuilding: "Falsche Antworten beim Wörter bilden", // Falsche Antworten im Modus "Wort bilden"
    incorrectFindPair: "Falsche Antworten beim Paare finden",      // Falsche Antworten im Modus "Paare finden"
    incorrectChoice: "Falsche Antworten bei der Wörterauswahl",    // Falsche Antworten im Modus "Wörterauswahl"

    done: "Fertig"
  },

  lessonsList: {
    chapter: "Kapitel",                         // Kapitel mit Lektionen, z. B. Kapitel 1 - Hiragana
    completed: "abgeschlossen",                // Zeigt an, ob die Lektion abgeschlossen ist
    lesson: "Lektion",                          // Zum Beispiel Lektion 1

    firstLessonInSectionTitle: "Lernen Sie, die ersten {{count}} Silben zu schreiben.", // Beschreibung, was in der Lektion gelernt wird
    continuingLessonsTitle: "Lernen Sie, die nächsten {{count}} Silben zu schreiben.",  // Beschreibung, was in der Lektion gelernt wird
    finalLessonInSectionTitle: "Lernen Sie, die letzten {{count}} Silben zu schreiben." // Beschreibung, was in der Lektion gelernt wird
  },

  lesson: {
    rememberWritingAndSoundLetter:
      "Merken Sie sich die Strichreihenfolge und die Aussprache dieser Silbe.",
    drawSyllable: "Zeichnen Sie die Silbe „{{syllable}}“ in der richtigen Reihenfolge.",
    matchHiraganaWithTransliteration: "Ordnen Sie Hiragana der Transliteration zu.",
    matchKatakanaWithTransliteration: "Ordnen Sie Katakana der Transliteration zu.",
    selectCorrectTransliteration:
      "Wählen Sie die richtige Transliteration für die Silbe „{{syllable}}“ aus.",
    chooseCorrectTransliterationSequence:
      "Wählen Sie die richtige Reihenfolge der Transliteration aus.",
    arrangeSyllablesInCorrectOrder:
      "Ordnen Sie die Silben in der richtigen Reihenfolge an.",
    practiceEveryDay: "Üben Sie jeden Tag, um Ihr Wissen zu festigen.",
    learningComplete: "Lektion abgeschlossen!",
  },

  transliterationSystems: {
    transliterationSystems: "Transliterationssysteme",
    romajiLatin: "Romaji (Latein)",
    transliterationInCyrillic: "Transliteration in Kyrillisch",

    russianPhoneticTransliteration: "Russische Phonetische",

    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
  },

  alert: {
    exitConformation: {
      title: "Sind Sie sicher, dass Sie beenden möchten?",
      subtitle: "Ihr Fortschritt wird nicht gespeichert, wenn Sie jetzt beenden."
    },

    cancel: "Abbrechen",
    ok: "OK",
    confirm: "Bestätigen",
  }
};

export default German;
