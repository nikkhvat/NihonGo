const Korean = {
	common: {
		close: "닫기",
		reset: "리셋",
		next: "다음",
		retry: "재시도",
		complete: "완료",
		start: "시작",
		welcome: "환영합니다"
	},

	tabs: {
		learning: "학습",
		practice: "연습",
		kana: "가나",
		profile: "설정",
	},

	practice: {
		modeTitle: "모드",
		mode: {
			cards: "카드",
			input: "입력",
			drawing: "그리기",
			words: "단어",
		},

		wordsMode: {
			choice: "선택",
			wordBuilding: "단어 구성하기",
			findThePair: "짝 맞추기",
		},

		additionally: "추가적으로",
		timeTest: "타이머",
		oneAttempt: "한 번의 시도",

		check: "확인",
		question: "질문",

		timer: {
			fast: "3초",
			medium: "5초",
			slow: "7초",
		},

		selectCorrectTransliteration: "올바른 음역을 선택하세요.",

		selectHiraganaForWord: "올바른 순서로 히라가나를 선택하세요.",
		selectKatakanaForWord: "올바른 순서로 가타카나를 선택하세요.",

		tooltip: {
			syllablesSelectMoreThan5: "* 5개 이상의 음절을 선택해야 합니다",
			cardSelectAtLeastOne: "* 최소 하나의 카드 유형을 선택해야 합니다",
			wordsSelectMoreThan10: "* 10개 이상의 단어가 제공되어야 합니다",
			modeSelectAtLeastOne: "* 최소 하나의 모드를 선택해야 합니다",
			leastTenLettersMustBeSelectedFromBasic: "* 기본 문자에서 5개 이상의 음절을 선택해야 합니다",
		},
	},

	kana: {
		hiragana: "히라가나",
		katakana: "가타카나",
		romanji: "로마지",

		basic: "기본",
		dakuon: "탁음",
		handakuon: "반탁음",
		yoon: "요음",

		kana: "음절"
	},

	selectKana: {
		words: "단어",
		letters: "음절",
		nothingSelected: "선택되지 않음"
	},

	settings: {
		displayStatistics: '통계 표시',
		hapticFeedback: '진동 피드백',
		theme: {
			title: "테마",
			light: "라이트",
			dark: "다크",
			auto: "자동"
		},
		language: "언어",
		privacyPolicy: '개인정보 보호정책',
		contactSupport: '지원 연락',

		joinOurCommunity: {
			title: "우리 커뮤니티에 가입하세요",
		},

		eraseData: {
			button: "앱 데이터 지우기",
			dataTakesUp: "데이터 사용량",
			title: "데이터를 삭제하시겠습니까?",
			subtitle: "모든 저장된 데이터, 설정 및 진행 상황이 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
		},

		sourceCode: {
			title: "소스 코드",
			githubRepository: "GitHub 저장소",
		},
		version: "버전",

		changeLanguageCaption: "설정에서 애플리케이션 언어를 변경할 수 있습니다."
	},

	result: {
		title: "연습이 완료되었습니다",
		score: "점수",

		wellDoneNoErrors: "훌륭하게 해내셨습니다. 오류가 없습니다!",

		sec: "초",
		min: "분",

		question: "질문",

		details: "자세히",

		alphabet: "알파벳",

		fastestAnswer: "가장 빠른 답변",
		slowestAnswer: "가장 느린 답변",

		incorrectAnswers: "잘못된 답변",

		incorrectWordBuilding: "단어 구성에서 잘못된 답변",
		incorrectFindPair: "짝 찾기에서 잘못된 답변",
		incorrectChoice: "단어 선택에서 잘못된 답변",

		done: "완료"
	},

	lessonsList: {
		chapter: "장",
		completed: "완료됨",
		lesson: "수업",

		firstLessonInSectionTitle: "처음 {{count}}개의 음절을 쓰는 법을 배워보세요.",
		continuingLessonsTitle: "다음 {{count}}개의 음절을 쓰는 법을 배워보세요.",
		finalLessonInSectionTitle: "마지막 {{count}}개의 음절을 쓰는 법을 배워보세요."
	},

	lesson: {
		rememberWritingAndSoundLetter:
			"이 음절의 쓰기와 발음을 기억하세요.",
		drawSyllable: "올바른 순서로 ‘{{syllable}}’ 음절을 그리세요.",
		matchHiraganaWithTransliteration: "히라가나와 음역을 맞추세요.",
		matchKatakanaWithTransliteration: "가타카나와 음역을 맞추세요.",
		selectCorrectTransliteration:
			"‘{{syllable}}’ 음절의 올바른 음역을 선택하세요.",
		chooseCorrectTransliterationSequence:
			"올바른 음역 순서를 선택하세요.",
		arrangeSyllablesInCorrectOrder:
			"음절을 올바른 순서로 배열하세요.",
		practiceEveryDay: "매일 연습하여 지식을 강화하세요.",
		learningComplete: "레슨 완료!",
	},

	transliterationSystems: {
		transliterationSystems: "음역 시스템",
		romajiLatin: "로마지 (라틴어)",
		transliterationInCyrillic: "키릴 음역",

		russianPhoneticTransliteration: "러시아어 발음",

		hepburn: "Hepburn (헵번)",
		kunreiShiki: "Kunrei-shiki (쿤레이시키)",
		nihonShiki: "Nihon-shiki (니혼시키)",
	},

	alert: {
		exitConformation: {
			title: "정말 나가시겠습니까?",
			subtitle: "지금 나가시면 진행 사항이 저장되지 않습니다."
		},

		cancel: "취소",
		ok: "확인",
		confirm: "확인합니다",
	}
};

export default Korean;