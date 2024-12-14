const Russian = {
	common: {
		close: "Закрыть",
		reset: "Сбросить",
		next: "Дальше",
		retry: "Повторить",
		complete: "Закончить",
		start: "Начать",
		auto: "Авто",
	},

	tabs: {
		learning: "Обучение",
		practice: "Практика",
		kana: "Кана",
		profile: "Настройки",
	},

	learning: {
		testing: "Тестирование",
		wordGame: "Игра слов"
	},

	practice: {
		mode: {
			cards: "Карточки",
			input: "Ввод",
			drawing: "Рисование",
			words: "Слова",
		},

		additionally: "Дополнительно",

		start: "Начать обучение",
		check: "Проверить",

		question: "Вопрос",

		timer: {
			fast: "3 сек",
			medium: "5 сек",
			slow: "7 сек",
		},

		selectCorrectTransliteration: "Выберите правильную транслитерацию.",

		selectHiraganaForWord: "Выберите хиригану в правильном порядке.",
		selectKatakanaForWord: "Выберите катакана в правильном порядке.",
	},

	testing: {
		cardMode: "Карточки",
		testMode: "Режим",
	},

	difficultyLevel: {
		timeTest: "Таймер",
		oneAttempt: "Одна попытка",
	},

	wordGame: {
		mode: "Режим",

		choice: "Выбор",
		wordBuilding: "Составь слово",
		findThePair: "Сопоставь пару",
	},

	kana: {
		hiragana: "Хирагана",
		katakana: "Катакана",
		romanji: "Ромадзи",

		basic: "Основное",
		dakuon: "Дакуон",
		handakuon: "Хандакуон",
		yoon: "Юон",

		kana: "Слог"
	},

	selectKana: {
		words: "Слов",
		letters: "Слогов",
		nothingSelected: "Ничего не выбрано"
	},

	settings: {
		displayStatistics: 'Отображать статистику',
		hapticFeedback: 'Виброотклик',
		theme: {
			title: "Тема",
			light: "Светлая",
			dark: "Тёмная",
			auto: "Автоматически"
		},
		language: "Язык",
		privacyPolicy: 'Политика конфиденциальности',
		contactSupport: 'Связаться с поддержкой',

		joinOurCommunity: {
			title: "Вступайте в наше сообщество",
		},

		eraseData: {
			button: "Очистить данные приложения",
			dataTakesUp: "Данные занимают",
			title: "Вы уверены, что хотите стереть данные?",
			subtitle: "Все сохранённые данные, включая настройки и прогресс, будут удалены. Это действие необратимо."
		},
		
		sourceCode: {
			title: "Исходный код",
			githubRepository: "Репозиторий GitHub",
		},
		version: "Версия",
	},

	result: {
		title: "Практика окончена",
		score: "Счёт",

		wellDoneNoErrors: "Прекрасно справились, ошибок нет!",

		sec: "cек",
		min: "мин",

		question: "вопрос",

		details: "Подробнее",

		alphabet: "Алфавит",

		fastestAnswer: "Самый быстрый ответ",
		slowestAnswer: "Самый медленный ответ",

		incorrectAnswers: "Неверные ответы",

		incorrectWordBuilding: "Неверные ответы в составлении слов",
		incorrectFindPair: "Неверные ответы в выборе пары",
		incorrectChoice: "Неверные ответы в выборе слов",

		done: "Закончить"
	},

	tooltip: {
		syllablesSelectMoreThan5: "* Должно быть выбрано больше 5 слогов",
		cardSelectAtLeastOne: "* Должен быть выбран хотя бы один тип карточки",
		wordsSelectMoreThan10: "* Должно быть доступно больше 10 слов",
		modeSelectAtLeastOne: "* Должен быть выбран хотя бы один режим",
		leastTenLettersMustBeSelectedFromBasic: "* Должно быть выбрано больше 5 слогов из основой азбуки",
	},

	lessonsList: {
		chapter: "Раздел",
		completed: "пройдено",
		lesson: "Урок",

		grammar: "Грамматика",

		firstLessonInSectionTitle: "Научитесь писать первые {{count}} слогов.",
		continuingLessonsTitle: "Научитесь писать следующие {{count}} слогов.",
		finalLessonInSectionTitle: "Научитесь писать последние {{count}} слогов."
	},

	lesson: {
		rememberWritingAndSoundLetter: "Запомните порядок написания и произношение этого слога.",
		drawSyllable: "Нарисуйте слог «{{syllable}}» в правильном порядке.",
		matchHiraganaWithTransliteration: "Сопоставьте Хиригану с транслитерацией.",
		matchKatakanaWithTransliteration: "Сопоставьте Катакану с транслитерацией.",
		selectCorrectTransliteration: "Выберите правильную транслитерацию слога «{{syllable}}».",
		chooseCorrectTransliterationSequence: "Выберите правильную последовательность транслитерации.",
		arrangeSyllablesInCorrectOrder: "Установите слоги в правильном порядке.",
		practiceEveryDay: "Практикуйтесь каждый день, чтобы закрепить свои знания.",
		learningComplete: "Урок пройден!",
	},

	transliterationSystems: {
		transliterationSystems: "Системы транслитерации",
		romajiLatin: "Ромадзи (латиница)",
		transliterationInCyrillic: "Транслитерация на кириллицу",

		russianPhoneticTransliteration: "Русская фонетическая",

		hepburn: "Hepburn (Хепбёрн)",
		kunreiShiki: "Kunrei-shiki (Кунрей-сики)",
		nihonShiki: "Nihon-shiki (Нихон-сики)",
	},

	alert: {
		exitConformation: {
			title: "Вы уверены, что хотите выйти?",
			subtitle: "Ваш прогресс не будет сохранён, если вы выйдете сейчас."
		},

		cancel: "Отмена",
		ok: "Ок",
		confirm: "Подтверждаю",
	}
};

export default Russian;