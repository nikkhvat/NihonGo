const Portuguese = {
  common: {
    close: "Fechar",               // Por exemplo, fechar uma janela modal
    reset: "Redefinir",            // Por exemplo, redefinir os símbolos selecionados
    next: "Próximo",               // Por exemplo, passar para a próxima tela da lição
    retry: "Repetir",              // Por exemplo, repetir uma lição
    complete: "Concluir",          // Por exemplo, concluir a última tela de uma lição
    start: "Iniciar",              // Por exemplo, iniciar uma nova lição
    welcome: "Bem-vindos"
  },

  tabs: {
    learning: "Aprendizado",       // Aba com as lições
    practice: "Prática",           // Aba para praticar e revisar conhecimentos
    kana: "Kana",                  // Aba com os alfabetos Hiragana e Katakana
    profile: "Configurações",      // Aba de configurações onde é possível ativar/desativar funcionalidades
  },

  practice: {
    modeTitle: "Modo",             // Por exemplo, o "modo" de um jogo
    mode: {
      cards: "Cartões",          // Modo "Cartões" onde se escolhe a resposta entre quatro opções
      input: "Entrada",          // Modo "Entrada" onde a resposta é digitada manualmente
      drawing: "Desenho",        // Modo "Desenho" onde se desenha um caractere
      words: "Palavras",         // Modo "Palavras" onde se selecionam ou formam palavras
    },

    wordsMode: {
      choice: "Escolha",                   // Modo de jogo onde se escolhe uma palavra
      wordBuilding: "Formar palavra",      // Modo de jogo onde se forma uma palavra a partir de letras
      findThePair: "Encontrar o par",      // Modo de jogo onde se associa pares de palavras
    },

    additionally: "Adicional",             // Configurações adicionais para prática
    timeTest: "Cronômetro",                // Ativar o "cronômetro" para tornar o jogo cronometrado
    oneAttempt: "Uma tentativa",           // Uma tentativa - se a resposta estiver errada, passa diretamente para a próxima pergunta

    check: "Verificar",                    // Por exemplo, verificar a escrita correta de um caractere
    question: "Pergunta",                  // Por exemplo, "Pergunta" nº 10

    timer: {
      fast: "3 seg",                     // Velocidade do cronômetro: 3 segundos, abreviado
      medium: "5 seg",                   // Velocidade do cronômetro: 5 segundos, abreviado
      slow: "7 seg",                     // Velocidade do cronômetro: 7 segundos, abreviado
    },

    selectCorrectTransliteration: "Selecione a transliteração correta.",

    selectHiraganaForWord: "Selecione os Hiragana na ordem correta.",
    selectKatakanaForWord: "Selecione os Katakana na ordem correta.",

    tooltip: {
      syllablesSelectMoreThan5: "* Mais de 5 sílabas devem ser selecionadas",
      cardSelectAtLeastOne: "* Pelo menos um tipo de cartão deve ser selecionado",
      wordsSelectMoreThan10: "* Devem estar disponíveis mais de 10 palavras",
      modeSelectAtLeastOne: "* Pelo menos um modo deve ser selecionado",
      leastTenLettersMustBeSelectedFromBasic: "* Mais de 5 sílabas do alfabeto básico devem ser selecionadas",
    },
  },

  kana: {
    hiragana: "Hiragana",           // Silabário japonês
    katakana: "Katakana",           // Silabário japonês
    romanji: "Romaji",              // Sistemas de transcrição para escrever palavras japonesas com caracteres latinos

    basic: "Básico",                // Parte básica do silabário japonês
    dakuon: "Dakuon",               // Sílabas com sinal diacrítico
    handakuon: "Handakuon",         // Sons da fileira 'h' marcados por um pequeno círculo
    yoon: "Yoon",                   // Sons combinados formados pela fusão de sílabas

    kana: "Sílaba"                  // O alfabeto japonês é silábico; por exemplo, a sílaba KA é か
  },

  selectKana: {
    words: "Palavras",              // Por exemplo, 100 palavras selecionadas para aprendizado
    letters: "Sílabas",             // Por exemplo, 5 sílabas selecionadas (か き く け こ)
    nothingSelected: "Nada selecionado" // Quando nada foi selecionado e isso precisa ser indicado
  },

  settings: {
    displayStatistics: "Exibir estatísticas",    // Alternar para exibir/ocultar estatísticas
    hapticFeedback: "Feedback tátil",            // Alternar para feedback tátil (vibração ao pressionar botões)
    theme: {
      title: "Tema",                           // Tema do aplicativo
      light: "Claro",                          // Tema claro
      dark: "Escuro",                          // Tema escuro
      auto: "Automático",                      // Tema automático/sistema
    },
    language: "Idioma",                          // Idioma da interface
    privacyPolicy: "Política de Privacidade",    // Link para a política de privacidade
    contactSupport: "Entrar em contato com o suporte", // Entrar em contato com o suporte (por email)

    joinOurCommunity: {
      title: "Junte-se à nossa comunidade",    // Botão nas configurações que leva a um canal no Telegram
    },

    eraseData: {
      button: "Limpar dados do aplicativo",    // Botão para apagar os dados do aplicativo
      dataTakesUp: "Os dados ocupam",          // Por exemplo, "Os dados ocupam 10 KB"
      title: "Tem certeza de que deseja apagar os dados?", // Pergunta para confirmar a exclusão dos dados
      subtitle: "Todos os dados salvos, incluindo configurações e progresso, serão apagados. Esta ação é irreversível." // Aviso
    },

    sourceCode: {
      title: "Código-fonte",                  // Botão que leva ao GitHub
      githubRepository: "Repositório GitHub", // Subtítulo do botão que leva ao GitHub
    },
    version: "Versão",                          // Versão do aplicativo, por exemplo Versão 2.24.3

    changeLanguageCaption: "Você pode alterar o idioma do aplicativo nas configurações."
  },

  result: {
    title: "Prática concluída",                // Mensagem na última tela após a prática
    score: "Pontuação",                        // Resultado da prática, por exemplo Pontuação 7/10 (7 respostas corretas de 10)

    wellDoneNoErrors: "Ótimo trabalho, sem erros!", // Mensagem na tela de resultados

    sec: "seg",                                // Abreviação de segundos, por exemplo 12 seg
    min: "min",                                // Abreviação de minutos, por exemplo 12 min

    question: "pergunta",                      // Por exemplo, pergunta 10 de 12

    details: "Detalhes",                       // Cabeçalho da seção com estatísticas detalhadas do teste

    alphabet: "Alfabeto",                      // Alfabeto japonês (Katakana ou Hiragana)

    fastestAnswer: "Resposta mais rápida",     // Nas estatísticas, resposta com o menor tempo
    slowestAnswer: "Resposta mais lenta",      // Nas estatísticas, resposta com o maior tempo

    incorrectAnswers: "Respostas incorretas",  // Respostas que foram erradas

    incorrectWordBuilding: "Respostas incorretas na formação de palavras", // Respostas incorretas no modo "Formar palavra"
    incorrectFindPair: "Respostas incorretas ao encontrar pares",          // Respostas incorretas no modo "Encontrar o par"
    incorrectChoice: "Respostas incorretas na escolha de palavras",        // Respostas incorretas no modo "Escolha"

    done: "Concluído"
  },

  lessonsList: {
    chapter: "Capítulo",                      // Capítulo com lições, por exemplo Capítulo 1 - Hiragana
    completed: "concluído",                   // Indica se a lição foi concluída
    lesson: "Lição",                          // Por exemplo, Lição 1

    firstLessonInSectionTitle: "Aprenda a escrever as primeiras {{count}} sílabas.",  // Descrição do que será aprendido na lição
    continuingLessonsTitle: "Aprenda a escrever as próximas {{count}} sílabas.",     // Descrição do que será aprendido na lição
    finalLessonInSectionTitle: "Aprenda a escrever as últimas {{count}} sílabas."    // Descrição do que será aprendido na lição
  },

  lesson: {
    rememberWritingAndSoundLetter:
      "Lembre-se da ordem dos traços e da pronúncia desta sílaba.",
    drawSyllable: "Desenhe a sílaba '{{syllable}}' na ordem correta.",
    matchHiraganaWithTransliteration: "Associe Hiragana à transliteração.",
    matchKatakanaWithTransliteration: "Associe Katakana à transliteração.",
    selectCorrectTransliteration:
      "Selecione a transliteração correta para a sílaba '{{syllable}}'.",
    chooseCorrectTransliterationSequence:
      "Escolha a sequência correta de transliteração.",
    arrangeSyllablesInCorrectOrder:
      "Organize as sílabas na ordem correta.",
    practiceEveryDay: "Pratique todos os dias para reforçar seus conhecimentos.",
    learningComplete: "Lição concluída!",
  },

  transliterationSystems: {
    transliterationSystems: "Sistemas de transliteração",
    romajiLatin: "Romaji (latim)",
    transliterationInCyrillic: "Transliteração em cirílico",

    russianPhoneticTransliteration: "Fonética russa",

    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
  },

  alert: {
    exitConformation: {
      title: "Tem certeza de que deseja sair?",
      subtitle: "Seu progresso não será salvo se você sair agora."
    },

    cancel: "Cancelar",
    ok: "OK",
    confirm: "Confirmar",
  }
};

export default Portuguese;
