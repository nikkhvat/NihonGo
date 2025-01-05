const Spanish = {
  common: {
    close: "Cerrar",               // Por ejemplo, cerrar una ventana modal
    reset: "Restablecer",          // Por ejemplo, restablecer los símbolos seleccionados
    next: "Siguiente",             // Por ejemplo, pasar a la siguiente pantalla de la lección
    retry: "Reintentar",           // Por ejemplo, repetir una lección
    complete: "Completar",         // Por ejemplo, completar la última pantalla de una lección
    start: "Iniciar",              // Por ejemplo, iniciar una nueva lección
    welcome: "Bienvenidos"
  },

  tabs: {
    learning: "Aprendizaje",       // Pestaña con las lecciones
    practice: "Práctica",          // Pestaña para practicar y revisar conocimientos
    kana: "Kana",                  // Pestaña con los alfabetos Hiragana y Katakana
    profile: "Configuración",      // Pestaña de configuración donde se pueden activar/desactivar funciones
  },

  practice: {
    modeTitle: "Modo",             // Por ejemplo, el "modo" de un juego
    mode: {
      cards: "Tarjetas",         // Modo "Tarjetas" donde se elige la respuesta entre cuatro opciones
      input: "Entrada",          // Modo "Entrada" donde se escribe la respuesta manualmente
      drawing: "Dibujo",         // Modo "Dibujo" donde se dibuja un carácter
      words: "Palabras",         // Modo "Palabras" donde se seleccionan o construyen palabras
    },

    wordsMode: {
      choice: "Elección",                 // Modo de juego donde se elige una palabra
      wordBuilding: "Construir palabra", // Modo de juego donde se construye una palabra con letras
      findThePair: "Emparejar",          // Modo de juego donde se emparejan palabras
    },

    additionally: "Adicional",             // Configuración adicional para la práctica
    timeTest: "Temporizador",              // Activar el "temporizador" para que el juego sea cronometrado
    oneAttempt: "Un intento",              // Un intento: si la respuesta es incorrecta, se pasa directamente a la siguiente pregunta

    check: "Verificar",                    // Por ejemplo, verificar la escritura correcta de un carácter
    question: "Pregunta",                  // Por ejemplo, "Pregunta" nº 10

    timer: {
      fast: "3 seg",                     // Velocidad del temporizador: 3 segundos, abreviado
      medium: "5 seg",                   // Velocidad del temporizador: 5 segundos, abreviado
      slow: "7 seg",                     // Velocidad del temporizador: 7 segundos, abreviado
    },

    selectCorrectTransliteration: "Seleccione la transliteración correcta.",

    selectHiraganaForWord: "Seleccione los Hiragana en el orden correcto.",
    selectKatakanaForWord: "Seleccione los Katakana en el orden correcto.",

    tooltip: {
      syllablesSelectMoreThan5: "* Deben seleccionarse más de 5 sílabas",
      cardSelectAtLeastOne: "* Debe seleccionarse al menos un tipo de tarjeta",
      wordsSelectMoreThan10: "* Deben estar disponibles más de 10 palabras",
      modeSelectAtLeastOne: "* Debe seleccionarse al menos un modo",
      leastTenLettersMustBeSelectedFromBasic: "* Deben seleccionarse más de 5 sílabas del alfabeto básico",
    },
  },

  kana: {
    hiragana: "Hiragana",           // Silabario japonés
    katakana: "Katakana",           // Silabario japonés
    romanji: "Romaji",              // Sistemas de transcripción para escribir palabras japonesas con caracteres latinos

    basic: "Básico",                // Parte básica del silabario japonés
    dakuon: "Dakuon",               // Sílabas con signos diacríticos
    handakuon: "Handakuon",         // Sonidos de la fila 'h' marcados con un pequeño círculo
    yoon: "Yoon",                   // Sonidos combinados formados por la fusión de sílabas

    kana: "Sílaba"                  // El alfabeto japonés es silábico; por ejemplo, la sílaba KA es か
  },

  selectKana: {
    words: "Palabras",              // Por ejemplo, 100 palabras seleccionadas para aprender
    letters: "Sílabas",             // Por ejemplo, 5 sílabas seleccionadas (か き く け こ)
    nothingSelected: "Nada seleccionado" // Cuando no se ha seleccionado nada y esto debe indicarse
  },

  settings: {
    displayStatistics: "Mostrar estadísticas",    // Alternar para mostrar/ocultar estadísticas
    hapticFeedback: "Retroalimentación háptica",  // Alternar para la retroalimentación háptica (vibración al presionar botones)
    theme: {
      title: "Tema",                             // Tema de la aplicación
      light: "Claro",                            // Tema claro
      dark: "Oscuro",                            // Tema oscuro
      auto: "Automático",                        // Tema automático/sistema
    },
    language: "Idioma",                            // Idioma de la interfaz
    privacyPolicy: "Política de privacidad",       // Enlace a la política de privacidad
    contactSupport: "Contactar soporte",          // Contactar soporte (por email)

    joinOurCommunity: {
      title: "Únase a nuestra comunidad",        // Botón en configuración que lleva a un canal de Telegram
    },

    eraseData: {
      button: "Borrar datos de la aplicación",   // Botón para borrar los datos de la aplicación
      dataTakesUp: "Los datos ocupan",           // Por ejemplo, "Los datos ocupan 10 KB"
      title: "¿Está seguro de que desea borrar los datos?", // Pregunta para confirmar la eliminación de los datos
      subtitle: "Todos los datos guardados, incluidas configuraciones y progreso, serán eliminados. Esta acción es irreversible." // Advertencia
    },

    sourceCode: {
      title: "Código fuente",                   // Botón que lleva a GitHub
      githubRepository: "Repositorio de GitHub", // Subtítulo del botón que lleva a GitHub
    },
    version: "Versión",                            // Versión de la aplicación, por ejemplo Versión 2.24.3

    changeLanguageCaption: "Puede cambiar el idioma de la aplicación en la configuración."
  },

  result: {
    title: "Práctica completada",                 // Mensaje en la última pantalla después de la práctica
    score: "Puntuación",                          // Resultado de la práctica, por ejemplo Puntuación 7/10 (7 respuestas correctas de 10)

    wellDoneNoErrors: "¡Excelente trabajo, sin errores!", // Mensaje en la pantalla de resultados

    sec: "seg",                                   // Abreviación para segundos, por ejemplo 12 seg
    min: "min",                                   // Abreviación para minutos, por ejemplo 12 min

    question: "pregunta",                         // Por ejemplo, pregunta 10 de 12

    details: "Detalles",                          // Encabezado de la sección con estadísticas detalladas del test

    alphabet: "Alfabeto",                         // Alfabeto japonés (Katakana o Hiragana)

    fastestAnswer: "Respuesta más rápida",        // En las estadísticas, respuesta con el tiempo más corto
    slowestAnswer: "Respuesta más lenta",         // En las estadísticas, respuesta con el tiempo más largo

    incorrectAnswers: "Respuestas incorrectas",   // Respuestas que fueron incorrectas

    incorrectWordBuilding: "Respuestas incorrectas en la construcción de palabras", // Respuestas incorrectas en el modo "Construir palabra"
    incorrectFindPair: "Respuestas incorrectas al emparejar",                        // Respuestas incorrectas en el modo "Emparejar"
    incorrectChoice: "Respuestas incorrectas en la elección de palabras",            // Respuestas incorrectas en el modo "Elección"

    done: "Hecho"
  },

  lessonsList: {
    chapter: "Capítulo",                          // Capítulo con lecciones, por ejemplo Capítulo 1 - Hiragana
    completed: "completado",                     // Indica si la lección fue completada
    lesson: "Lección",                            // Por ejemplo, Lección 1

    firstLessonInSectionTitle: "Aprenda a escribir las primeras {{count}} sílabas.",  // Descripción de lo que se aprenderá en la lección
    continuingLessonsTitle: "Aprenda a escribir las siguientes {{count}} sílabas.",  // Descripción de lo que se aprenderá en la lección
    finalLessonInSectionTitle: "Aprenda a escribir las últimas {{count}} sílabas."   // Descripción de lo que se aprenderá en la lección
  },

  lesson: {
    rememberWritingAndSoundLetter:
      "Recuerde el orden de los trazos y la pronunciación de esta sílaba.",
    drawSyllable: "Dibuje la sílaba '{{syllable}}' en el orden correcto.",
    matchHiraganaWithTransliteration: "Empareje Hiragana con su transliteración.",
    matchKatakanaWithTransliteration: "Empareje Katakana con su transliteración.",
    selectCorrectTransliteration:
      "Seleccione la transliteración correcta para la sílaba '{{syllable}}'.",
    chooseCorrectTransliterationSequence:
      "Seleccione la secuencia correcta de transliteración.",
    arrangeSyllablesInCorrectOrder:
      "Ordene las sílabas en el orden correcto.",
    practiceEveryDay: "Practique todos los días para reforzar sus conocimientos.",
    learningComplete: "¡Lección completada!",
  },

  transliterationSystems: {
    transliterationSystems: "Sistemas de transliteración",
    romajiLatin: "Romaji (latín)",
    transliterationInCyrillic: "Transliteración en cirílico",

    russianPhoneticTransliteration: "Fonética rusa",

    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
  },

  alert: {
    exitConformation: {
      title: "¿Está seguro de que desea salir?",
      subtitle: "Su progreso no se guardará si sale ahora."
    },

    cancel: "Cancelar",
    ok: "OK",
    confirm: "Confirmar",
  }
};

export default Spanish;
