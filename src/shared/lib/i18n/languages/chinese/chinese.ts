const Chinese = {
	common: {
		close: "关闭",
		reset: "重置", 
		next: "下一步",
		retry: "重试",
		complete: "完成",
		start: "开始", 
		welcome: "欢迎"
	},

	tabs: {
		learning: "学习",
		practice: "练习",
		kana: "假名",    
		profile: "设置", 
	},

	practice: {
		modeTitle: "模式",
		mode: {
			cards: "卡片",
			input: "输入",
			drawing: "绘画",
			words: "单词",
		},

		wordsMode: {
			choice: "选择",
			wordBuilding: "构建单词",
			findThePair: "匹配对",
		},

		additionally: "附加选项",
		timeTest: "计时器",
		oneAttempt: "一次尝试",

		check: "检查",
		question: "问题",

		timer: {
			fast: "3秒",
			medium: "5秒",
			slow: "7秒",
		},

		selectCorrectTransliteration: "选择正确的音译。",

		selectHiraganaForWord: "按正确顺序选择平假名。",
		selectKatakanaForWord: "按正确顺序选择片假名。",

		tooltip: {
			syllablesSelectMoreThan5: "* 必须选择超过5个音节",
			cardSelectAtLeastOne: "* 必须选择至少一种卡片类型",
			wordsSelectMoreThan10: "* 必须有超过10个单词可供选择",
			modeSelectAtLeastOne: "* 必须选择至少一种模式",
			leastTenLettersMustBe: "* 最少需要十个字母..."
		}
	},

	kana: {
		hiragana: "平假名",
		katakana: "片假名",
		romanji: "罗马字",

		basic: "基础",
		dakuon: "浊音",
		handakuon: "半浊音",
		yoon: "拗音",

		kana: "音节"
	},

	selectKana: {
		words: "单词",
		letters: "音节",
		nothingSelected: "未选择任何内容"
	},

	settings: {
		displayStatistics: "显示统计数据",
		hapticFeedback: "震动反馈",
		theme: {
			title: "主题",
			light: "浅色",
			dark: "深色",
			auto: "自动"
		},
		language: "语言",
		privacyPolicy: "隐私政策",
		contactSupport: "联系客服",

		joinOurCommunity: {
			title: "加入我们的社区",
		},

		eraseData: {
			button: "清除应用数据",
			dataTakesUp: "数据占用",
			title: "您确定要删除数据吗?",
			subtitle: "所有保存的数据，包括设置和进度，将被删除。此操作不可逆。"
		},

		sourceCode: {
			title: "源代码",
			githubRepository: "GitHub 仓库",
		},
		version: "版本",

		changeLanguageCaption: "您可以在设置中更改应用程序的语言。"
	},

  result: {
    title: "实践结束",
    score: "分数",
    
    wellDoneNoErrors: "做得很好，没有错误！",
    
    sec: "秒",
    min: "分钟",
    
    question: "问题",
    
    details: "详细信息",
    
    alphabet: "字母表",
    
    fastestAnswer: "最快的回答",
    slowestAnswer: "最慢的回答",
    
    incorrectAnswers: "错误的回答",
    
    incorrectWordBuilding: "单词构建中的错误回答",
    incorrectFindPair: "配对选择中的错误回答",
    incorrectChoice: "选择单词中的错误回答",
    
    done: "完成"
  },

	lessonsList: {
		chapter: "章节",
		completed: "已完成",
		lesson: "课程",

		firstLessonInSectionTitle: "学习写下 {{count}} 个音节。",
		continuingLessonsTitle: "学习写下接下来的 {{count}} 个音节。",
		finalLessonInSectionTitle: "学习写下最后 {{count}} 个音节。"
	},

	lesson: {
		rememberWritingAndSoundLetter: "记住这个音节的书写顺序和发音。",
		drawSyllable: "按照正确的顺序画出音节「{{syllable}}」。",
		matchHiraganaWithTransliteration: "将平假名与转写对照。",
		matchKatakanaWithTransliteration: "将片假名与转写对照。",
		selectCorrectTransliteration: "选择正确的音节「{{syllable}}」转写。",
		chooseCorrectTransliterationSequence: "选择正确的转写顺序。",
		arrangeSyllablesInCorrectOrder: "将音节按正确的顺序排列。",
		practiceEveryDay: "每天练习，巩固所学知识。",
		learningComplete: "课程完成！"
	},
	
	transliterationSystems: {
		transliterationSystems: "转写系统",
		romajiLatin: "罗马字（拉丁字母）",
		transliterationInCyrillic: "西里尔字母转写",
		russianPhoneticTransliteration: "俄语语音转写",
		hepburn: "赫本式（Hepburn）",
		kunreiShiki: "昆礼式（Kunrei-shiki）",
		nihonShiki: "日本式（Nihon-shiki）"
	},

	alert: {
		exitConformation: {
			title: "您确定要退出吗？",
			subtitle: "如果您现在退出，您的进度将不会被保存。"
		},
		cancel: "取消",
		ok: "确定",
		confirm: "确认"
	}
};

export default Chinese;