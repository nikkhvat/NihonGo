const Italian = {
  common: {
    close: "Chiudi",               // Ad esempio, chiudere una finestra modale
    reset: "Resetta",              // Ad esempio, resettare i simboli selezionati
    next: "Avanti",                // Ad esempio, passare alla schermata successiva della lezione
    retry: "Riprova",              // Ad esempio, ripetere una lezione
    complete: "Completa",          // Ad esempio, completare l'ultima schermata di una lezione
    start: "Inizia",               // Ad esempio, iniziare una nuova lezione
    welcome: "Benvenuti"
  },

  tabs: {
    learning: "Apprendimento",     // Scheda con le lezioni
    practice: "Pratica",           // Scheda per praticare e ripassare le conoscenze
    kana: "Kana",                  // Scheda con gli alfabeti Hiragana e Katakana
    profile: "Impostazioni",       // Scheda delle impostazioni dove è possibile attivare/disattivare funzionalità
  },

  practice: {
    modeTitle: "Modalità",         // Ad esempio, la "modalità" di un gioco
    mode: {
      cards: "Carte",            // Modalità "Carte" in cui si sceglie la risposta tra quattro opzioni
      input: "Input",            // Modalità "Input" in cui si inserisce manualmente la risposta
      drawing: "Disegno",        // Modalità "Disegno" in cui si disegna un carattere
      words: "Parole",           // Modalità "Parole" in cui si selezionano o costruiscono parole
    },

    wordsMode: {
      choice: "Scelta",                  // Modalità di gioco in cui bisogna scegliere una parola
      wordBuilding: "Crea una parola",   // Modalità di gioco in cui si compone una parola con le lettere
      findThePair: "Trova la coppia",    // Modalità di gioco in cui si abbinano coppie di parole
    },

    additionally: "Aggiuntivo",           // Impostazioni aggiuntive per la pratica
    timeTest: "Timer",                   // Attivare il "timer" per rendere il gioco a tempo
    oneAttempt: "Un tentativo",          // Un tentativo: se si risponde in modo errato, si passa alla domanda successiva

    check: "Verifica",                   // Ad esempio, verificare la correttezza di un carattere
    question: "Domanda",                 // Ad esempio, "Domanda" n°10

    timer: {
      fast: "3 sec",                   // Velocità del timer: 3 secondi, abbreviato
      medium: "5 sec",                 // Velocità del timer: 5 secondi, abbreviato
      slow: "7 sec",                   // Velocità del timer: 7 secondi, abbreviato
    },

    selectCorrectTransliteration: "Seleziona la traslitterazione corretta.",

    selectHiraganaForWord: "Seleziona gli Hiragana nell'ordine corretto.",
    selectKatakanaForWord: "Seleziona i Katakana nell'ordine corretto.",

    tooltip: {
      syllablesSelectMoreThan5: "* Devono essere selezionate più di 5 sillabe",
      cardSelectAtLeastOne: "* Deve essere selezionato almeno un tipo di carta",
      wordsSelectMoreThan10: "* Devono essere disponibili più di 10 parole",
      modeSelectAtLeastOne: "* Deve essere selezionata almeno una modalità",
      leastTenLettersMustBeSelectedFromBasic: "* Devono essere selezionate più di 5 sillabe dall'alfabeto base",
    },
  },

  kana: {
    hiragana: "Hiragana",           // Sillabario giapponese
    katakana: "Katakana",           // Sillabario giapponese
    romanji: "Romaji",              // Sistemi di trascrizione per scrivere parole giapponesi con caratteri latini

    basic: "Base",                  // Parte di base del sillabario giapponese
    dakuon: "Dakuon",               // Sillabe con segno diacritico
    handakuon: "Handakuon",         // Suoni della riga 'h' contrassegnati da un piccolo cerchio
    yoon: "Yoon",                   // Suoni combinati ottenuti fondendo sillabe

    kana: "Sillaba"                 // L'alfabeto giapponese è sillabico; ad esempio, la sillaba KA è か
  },

  selectKana: {
    words: "Parole",                // Ad esempio, sono state selezionate 100 parole per l'apprendimento
    nothingSelected: "Nessuna selezione" // Quando non è stato selezionato nulla e bisogna indicarlo
  },

  settings: {
    displayStatistics: "Mostra statistiche",    // Interruttore per mostrare/nascondere le statistiche
    hapticFeedback: "Feedback aptico",          // Interruttore per il feedback aptico (vibrazione al tocco dei pulsanti)
    theme: {
      title: "Tema",                          // Tema dell'applicazione
      light: "Chiaro",                        // Tema chiaro
      dark: "Scuro",                          // Tema scuro
      auto: "Automatico",                     // Tema automatico/sistematico
    },
    language: "Lingua",                         // Lingua dell'interfaccia
    privacyPolicy: "Informativa sulla privacy", // Link all'informativa sulla privacy
    contactSupport: "Contatta il supporto",     // Contattare il supporto (tramite email)

    joinOurCommunity: {
      title: "Unisciti alla nostra community", // Pulsante nelle impostazioni che porta a un canale Telegram
    },

    eraseData: {
      button: "Cancella dati dell'app",        // Pulsante per cancellare i dati dell'app
      dataTakesUp: "I dati occupano",          // Ad esempio, "I dati occupano 10 KB"
      title: "Sei sicuro di voler cancellare i dati?", // Domanda per confermare la cancellazione dei dati
      subtitle: "Tutti i dati salvati, incluse le impostazioni e i progressi, saranno eliminati. Questa azione è irreversibile." // Avvertimento
    },

    sourceCode: {
      title: "Codice sorgente",               // Pulsante che porta a GitHub
      githubRepository: "Repository GitHub", // Sottotitolo del pulsante che porta a GitHub
    },
    version: "Versione",                        // Versione dell'applicazione, ad esempio Versione 2.24.3

    changeLanguageCaption: "Puoi cambiare la lingua dell'applicazione nelle impostazioni."
  },

  result: {
    title: "Pratica completata",               // Messaggio alla fine della pratica
    score: "Punteggio",                        // Risultato della pratica, ad esempio Punteggio 7/10 (7 risposte corrette su 10)

    wellDoneNoErrors: "Ottimo lavoro, nessun errore!", // Messaggio sulla schermata dei risultati

    sec: "sec",                                // Abbreviazione per secondi, ad esempio 12 sec
    min: "min",                                // Abbreviazione per minuti, ad esempio 12 min

    question: "domanda",                       // Ad esempio, domanda 10 su 12

    details: "Dettagli",                       // Intestazione della sezione con le statistiche dettagliate del test

    alphabet: "Alfabeto",                      // Alfabeto giapponese (Katakana o Hiragana)

    fastestAnswer: "Risposta più veloce",      // Nelle statistiche, risposta con il tempo più breve
    slowestAnswer: "Risposta più lenta",       // Nelle statistiche, risposta con il tempo più lungo

    incorrectAnswers: "Risposte errate",       // Risposte date in modo errato

    incorrectWordBuilding: "Risposte errate nella costruzione di parole", // Risposte errate nella modalità "Crea una parola"
    incorrectFindPair: "Risposte errate nel trovare coppie",              // Risposte errate nella modalità "Trova la coppia"
    incorrectChoice: "Risposte errate nella scelta delle parole",         // Risposte errate nella modalità "Scelta"

    done: "Fatto"
  },

  lessonsList: {
    chapter: "Capitolo",                      // Capitolo con lezioni, ad esempio Capitolo 1 - Hiragana
    completed: "completato",                 // Indica se la lezione è completata
    lesson: "Lezione",                       // Ad esempio, Lezione 1

    firstLessonInSectionTitle: "Impara a scrivere le prime {{count}} sillabe.",  // Descrizione di ciò che si imparerà nella lezione
    continuingLessonsTitle: "Impara a scrivere le successive {{count}} sillabe.", // Descrizione di ciò che si imparerà nella lezione
    finalLessonInSectionTitle: "Impara a scrivere le ultime {{count}} sillabe."  // Descrizione di ciò che si imparerà nella lezione
  },

  lesson: {
    rememberWritingAndSoundLetter:
      "Ricorda l'ordine dei tratti e la pronuncia di questa sillaba.",
    drawSyllable: "Disegna la sillaba '{{syllable}}' nell'ordine corretto.",
    matchHiraganaWithTransliteration: "Abbina Hiragana alla traslitterazione.",
    matchKatakanaWithTransliteration: "Abbina Katakana alla traslitterazione.",
    selectCorrectTransliteration:
      "Seleziona la traslitterazione corretta per la sillaba '{{syllable}}'.",
    chooseCorrectTransliterationSequence:
      "Scegli la sequenza corretta di traslitterazione.",
    arrangeSyllablesInCorrectOrder:
      "Disponi le sillabe nell'ordine corretto.",
    practiceEveryDay: "Pratica ogni giorno per consolidare le tue conoscenze.",
    learningComplete: "Lezione completata!",
  },

  transliterationSystems: {
    transliterationSystems: "Sistemi di traslitterazione",
    romajiLatin: "Romaji (latino)",
    transliterationInCyrillic: "Traslitterazione in cirillico",

    russianPhoneticTransliteration: "Fonetica russa",

    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
  },

  alert: {
    exitConformation: {
      title: "Sei sicuro di voler uscire?",
      subtitle: "I tuoi progressi non saranno salvati se esci ora."
    },

    cancel: "Annulla",
    ok: "OK",
    confirm: "Conferma",
  }
};

export default Italian;
