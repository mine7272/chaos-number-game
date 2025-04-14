// 1ë¶??„° 40ê¹Œì???˜ ?ˆ«??— ????•œ ?°?´?„° êµ¬ì"
const numbersData = [
    { value: 1, formats: ['1', 'one', '?¼'] },
    { value: 2, formats: ['2', 'two', '?´'] },
    { value: 3, formats: ['3', 'three', '?‚¼'] },
    { value: 4, formats: ['4', 'four', '?‚¬'] },
    { value: 5, formats: ['5', 'five', '?˜¤'] },
    { value: 6, formats: ['6', 'six', '?œ¡'] },
    { value: 7, formats: ['7', 'seven', 'ì¹?'] },
    { value: 8, formats: ['8', 'eight', '?Œ”'] },
    { value: 9, formats: ['9', 'nine', 'êµ?'] },
    { value: 10, formats: ['10', 'ten', '?‹­'] },
    { value: 11, formats: ['11', 'eleven', '?‹­?¼'] },
    { value: 12, formats: ['12', 'twelve', '?‹­?´'] },
    { value: 13, formats: ['13', 'thirteen', '?‹­?‚¼'] },
    { value: 14, formats: ['14', 'fourteen', '?‹­?‚¬'] },
    { value: 15, formats: ['15', 'fifteen', '?‹­?˜¤'] },
    { value: 16, formats: ['16', 'sixteen', '?‹­?œ¡'] },
    { value: 17, formats: ['17', 'seventeen', '?‹­ì¹?'] },
    { value: 18, formats: ['18', 'eighteen', '?‹­?Œ”'] },
    { value: 19, formats: ['19', 'nineteen', '?‹­êµ?'] },
    { value: 20, formats: ['20', 'twenty', '?´?‹­'] },
    { value: 21, formats: ['21', 'twenty-one', '?´?‹­?¼'] },
    { value: 22, formats: ['22', 'twenty-two', '?´?‹­?´'] },
    { value: 23, formats: ['23', 'twenty-three', '?´?‹­?‚¼'] },
    { value: 24, formats: ['24', 'twenty-four', '?´?‹­?‚¬'] },
    { value: 25, formats: ['25', 'twenty-five', '?´?‹­?˜¤'] },
    { value: 26, formats: ['26', 'twenty-six', '?´?‹­?œ¡'] },
    { value: 27, formats: ['27', 'twenty-seven', '?´?‹­ì¹?'] },
    { value: 28, formats: ['28', 'twenty-eight', '?´?‹­?Œ”'] },
    { value: 29, formats: ['29', 'twenty-nine', '?´?‹­êµ?'] },
    { value: 30, formats: ['30', 'thirty', '?‚¼?‹­'] },
    { value: 31, formats: ['31', 'thirty-one', '?‚¼?‹­?¼'] },
    { value: 32, formats: ['32', 'thirty-two', '?‚¼?‹­?´'] },
    { value: 33, formats: ['33', 'thirty-three', '?‚¼?‹­?‚¼'] },
    { value: 34, formats: ['34', 'thirty-four', '?‚¼?‹­?‚¬'] },
    { value: 35, formats: ['35', 'thirty-five', '?‚¼?‹­?˜¤'] },
    { value: 36, formats: ['36', 'thirty-six', '?‚¼?‹­?œ¡'] },
    { value: 37, formats: ['37', 'thirty-seven', '?‚¼?‹­ì¹?'] },
    { value: 38, formats: ['38', 'thirty-eight', '?‚¼?‹­?Œ”'] },
    { value: 39, formats: ['39', 'thirty-nine', '?‚¼?‹­êµ?'] },
    { value: 40, formats: ['40', 'forty', '?‚¬?‹­'] }
];

// ê²Œì„ ?ƒ?ƒœ ë³??ˆ˜
let gameActive = false;
let gamePaused = false;
let currentTarget = 1;
let startTime;
let pauseStartTime;
let totalPausedTime = 0;
let timerInterval;
let gameBoard;
let numberElements = [];
let mistakes = 0; // ???ë¦? ?šŸ?ˆ˜ ì¶”ì 
let maxNumber = 30; // ê¸°ë³¸ ?‚œ?´?„ (ë³´í†µ)

// DOM ?š”?†Œ?“¤
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resumeButton = document.getElementById('resume-button');
const restartButton = document.getElementById('restart-button');
const playAgainButton = document.getElementById('play-again-button');
const timerElement = document.querySelector('.timer');
const currentNumberElement = document.getElementById('current-number');
const resultScreen = document.getElementById('result-screen');
const finalTimeElement = document.getElementById('final-time');
const easyButton = document.getElementById('easy-button');
const normalButton = document.getElementById('normal-button');
const hardButton = document.getElementById('hard-button');
const difficultyContainer = document.getElementById('difficulty-container');

// ·©Å· ½Ã½ºÅÛ ¿ä¼Òµé
const playerNameInput = document.getElementById('player-name');
const saveScoreButton = document.getElementById('save-score-button');
const showRankingButton = document.getElementById('show-ranking-button');
const rankingScreen = document.getElementById('ranking-screen');
const rankingTableBody = document.getElementById('ranking-table-body');
const closeRankingButton = document.getElementById('close-ranking-button');
const rankingDifficultySelect = document.getElementById('ranking-difficulty');

// ¸Š¸ë¡ ™”ë©? ?š”?†Œ?“¤
const introScreen = document.getElementById('intro-screen');
const startGameButton = document.getElementById('start-game-button');
const easyButtonIntro = document.getElementById('easy-button-intro');
const normalButtonIntro = document.getElementById('normal-button-intro');
const hardButtonIntro = document.getElementById('hard-button-intro');

// ¸¶Áö¸· À©µµ¿ì Å©±â ÀúÀå
let lastWindowWidth = window.innerWidth;
let lastWindowHeight = window.innerHeight;
const RESIZE_THRESHOLD = 50; // Å©±â º¯È­ ¹«½Ã ÀÓ°è°ª (px)

// ?´ë²¤íŠ¸ ë¦¬ìŠ¤?„ˆ ?„¤? •
document.addEventListener('DOMContentLoaded', () => {
    gameBoard = document.getElementById('game-board');
    
    // ì´ˆê¸°?™” ?•¨?ˆ˜ ?˜¸ì¶?
    initGame();
    
    // ?¸?Š¸ë¡? ?™”ë©? ?´ë²¤íŠ¸ ?„¤? •
    startGameButton.addEventListener('click', startFromIntro);
    easyButtonIntro.addEventListener('click', () => setDifficultyIntro('easy'));
    normalButtonIntro.addEventListener('click', () => setDifficultyIntro('normal'));
    hardButtonIntro.addEventListener('click', () => setDifficultyIntro('hard'));
    
    // ê²Œì„ ?”Œ? ˆ?´ ì¤? ?´ë²¤íŠ¸ ?„¤? •
    startButton.addEventListener('click', startGame);
    pauseButton.addEventListener('click', pauseGame);
    resumeButton.addEventListener('click', resumeGame);
    restartButton.addEventListener('click', confirmResetGame);
    playAgainButton.addEventListener('click', resetGame);
    
    // ?‚œ?´?„ ë²„íŠ¼ ?´ë²¤íŠ¸ ?„¤? • (ê²Œì„ ?”Œ? ˆ?´ ì¤?)
    easyButton.addEventListener('click', () => setDifficulty('easy'));
    normalButton.addEventListener('click', () => setDifficulty('normal'));
    hardButton.addEventListener('click', () => setDifficulty('hard'));
    
    // ·©Å· ½Ã½ºÅÛ ÀÌº¥Æ® ¼³Á¤
    saveScoreButton.addEventListener('click', saveScore);
    showRankingButton.addEventListener('click', showRanking);
    closeRankingButton.addEventListener('click', hideRanking);
    rankingDifficultySelect.addEventListener('change', updateRankingDisplay);
    
    // ê²Œì„ ë³´ë“œ— ?´ë²¤íŠ¸ ?œ„?„ ?„¤? •
    gameBoard.addEventListener('click', handleNumberClick);
});

// ê²Œì„ ì´ˆê¸°?™” ?•¨?ˆ˜
function initGame() {
    // ê²Œì„ ê¸°ë³¸ ?„¤? • - ê´?? ¨ UI ?ˆ¨ê¸°ê¸°
    hideGameElements();
    showIntroScreen();
    
    // ê²°ê³¼ ?™”ë©? ê°•ì œë¡? ?ˆ¨ê¸°ê¸°
    resultScreen.classList.add('hidden');
    resultScreen.style.display = 'none';
    
    // ê²Œì„ ?ƒ?ƒœ ì´ˆê¸°?™”
    gameActive = false;
    gamePaused = false;
    currentTarget = 1;
    mistakes = 0;
    
    // ????´ë¨? ì´ˆê¸°?™”
    resetTimer();
}

// ê²Œì„ ?š”?†Œ ?ˆ¨ê¸°ê¸° ?•¨?ˆ˜
function hideGameElements() {
    gameBoard.style.visibility = 'hidden';
    document.querySelector('.game-header').style.visibility = 'hidden';
    startButton.style.display = 'none';
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    difficultyContainer.style.display = 'none';
}

// ê²Œì„ ?š”?†Œ ?‘œ?‹œ ?•¨?ˆ˜
function showGameElements() {
    gameBoard.style.visibility = 'visible';
    gameBoard.classList.remove('hidden');
    document.querySelector('.game-header').style.visibility = 'visible';
    startButton.style.display = 'inline-block';
    difficultyContainer.style.display = 'block';
    difficultyContainer.classList.remove('hidden');
}

// ?¸?Š¸ë¡? ?™”ë©? ?‘œ?‹œ ?•¨?ˆ˜
function showIntroScreen() {
    introScreen.classList.remove('hidden');
}

// ?¸?Š¸ë¡? ?™”ë©? ?ˆ¨ê¸°ê¸° ?•¨?ˆ˜
function hideIntroScreen() {
    introScreen.classList.add('hidden');
}

// ?¸?Š¸ë¡? ?™”ë©´ì—?„œ ?‚œ?´?„ ?„¤? •
function setDifficultyIntro(level) {
    // ëª¨ë“  ?‚œ?´?„ ë²„íŠ¼?—?„œ active ?´?˜?Š¤ ? œê±?
    easyButtonIntro.classList.remove('active');
    normalButtonIntro.classList.remove('active');
    hardButtonIntro.classList.remove('active');
    
    // ?„ ?ƒ?•œ ?‚œ?´?„?— ?”°?¼ maxNumber ?„¤? • ë°? ë²„íŠ¼ ?™œ?„±?™”
    switch(level) {
        case 'easy':
            maxNumber = 20;
            easyButtonIntro.classList.add('active');
            break;
        case 'normal':
            maxNumber = 30;
            normalButtonIntro.classList.add('active');
            break;
        case 'hard':
            maxNumber = 40;
            hardButtonIntro.classList.add('active');
            break;
        default:
            maxNumber = 30;
            normalButtonIntro.classList.add('active');
    }
    
    // ê²Œì„ ?™”ë©´ì˜ ?‚œ?´?„ ë²„íŠ¼?„ ?™ê¸°í™”
    syncDifficultyButtons(level);
}

// ê²Œì„ ?™”ë©´ì˜ ?‚œ?´?„ ë²„íŠ¼ ?™ê¸°í™”
function syncDifficultyButtons(level) {
    easyButton.classList.remove('active');
    normalButton.classList.remove('active');
    hardButton.classList.remove('active');
    
    switch(level) {
        case 'easy':
            easyButton.classList.add('active');
            break;
        case 'normal':
            normalButton.classList.add('active');
            break;
        case 'hard':
            hardButton.classList.add('active');
            break;
    }
}

// ?¸?Š¸ë¡œì—?„œ ê²Œì„ ?‹œ?‘
function startFromIntro() {
    hideIntroScreen();
    
    // ê²Œì„ ë³´ë“œ ?š”?†Œ ?™•?‹¤?ˆ ?‘œ?‹œ
    gameBoard.classList.remove('hidden');
    gameBoard.style.visibility = 'visible';
    gameBoard.style.display = 'block';
    
    showGameElements();
    
    // ?•½ê°? ì§??—°?‹œì¼? UIê°? ?—…?°?´?Š¸?œ ?›„ ê²Œì„ ?‹œ?‘
    setTimeout(() => {
        startGame();
    }, 100);
}

// ?‚œ?´?„ ?„¤? • ?•¨?ˆ˜
function setDifficulty(level) {
    // ëª¨ë“  ?‚œ?´?„ ë²„íŠ¼?—?„œ active ?´?˜?Š¤ ? œê±?
    easyButton.classList.remove('active');
    normalButton.classList.remove('active');
    hardButton.classList.remove('active');
    
    // ?„ ?ƒ?•œ ?‚œ?´?„?— ?”°?¼ maxNumber ?„¤? • ë°? ë²„íŠ¼ ?™œ?„±?™”
    switch(level) {
        case 'easy':
            maxNumber = 20;
            easyButton.classList.add('active');
            break;
        case 'normal':
            maxNumber = 30;
            normalButton.classList.add('active');
            break;
        case 'hard':
            maxNumber = 40;
            hardButton.classList.add('active');
            break;
        default:
            maxNumber = 30;
            normalButton.classList.add('active');
    }
}

// ê²Œì„ ?‹œ?‘ ?•¨?ˆ˜
function startGame() {
    gameActive = true;
    gamePaused = false;
    currentTarget = 1;
    mistakes = 0; // ½Ç¼ö Ä«¿îÅÍ ÃÊ±âÈ­
    totalPausedTime = 0;
    currentNumberElement.textContent = currentTarget;
    
    // ¸ğ¹ÙÀÏ¿¡¼­ ½ºÅ©·Ñ ¹æÁö
    document.body.classList.add('game-active');
    
    // °ÔÀÓ º¸µå°¡ È®½ÇÈ÷ Ç¥½ÃµÇµµ·Ï ÇÔ
    gameBoard.classList.remove('hidden');
    gameBoard.style.visibility = 'visible';
    gameBoard.style.display = 'block';
    
    // ½ÃÀÛ/ÁßÁö ¹öÆ° »óÅÂ º¯°æ
    startButton.classList.add('hidden');
    difficultyContainer.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    
    // Å¸ÀÌ¸Ó ÃÊ±âÈ­ ¹× ½ÃÀÛ
    resetTimer();
    startTimer();
    
    // °ÔÀÓ º¸µå ÃÊ±âÈ­ ¹× ¼ıÀÚ »ı¼º
    clearGameBoard();
    generateNumbers();
    
    // ÃÖÃÊ Å©±â ÀúÀå
    lastWindowWidth = window.innerWidth;
    lastWindowHeight = window.innerHeight;
}

// ê²Œì„ ?¼?‹œ? •ì§? ?•¨?ˆ˜
function pauseGame() {
    if (!gameActive || gamePaused) return;
    
    gamePaused = true;
    pauseStartTime = new Date();
    stopTimer();
    
    // ë²„íŠ¼ ?ƒ?ƒœ ë³?ê²?
    pauseButton.classList.add('hidden');
    resumeButton.classList.remove('hidden');
    
    // ê²Œì„ ë³´ë“œ?— ?¼?‹œ? •ì§? ?˜¤ë²„ë ˆ?´ ì¶”ê??
    const pauseOverlay = document.createElement('div');
    pauseOverlay.className = 'pause-overlay';
    pauseOverlay.innerHTML = '<div class="pause-message">?¼?‹œ? •ì§??¨</div>';
    gameBoard.appendChild(pauseOverlay);
}

// ê²Œì„ ?¬ê°? ?•¨?ˆ˜
function resumeGame() {
    if (!gameActive || !gamePaused) return;
    
    // ?¼?‹œ? •ì§??œ ?‹œê°? ê³„ì‚°
    const now = new Date();
    totalPausedTime += now - pauseStartTime;
    
    gamePaused = false;
    
    // ë²„íŠ¼ ?ƒ?ƒœ ë³?ê²?
    resumeButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    
    // ?¼?‹œ? •ì§? ?˜¤ë²„ë ˆ?´ ? œê±?
    const pauseOverlay = document.querySelector('.pause-overlay');
    if (pauseOverlay) {
        pauseOverlay.remove();
    }
    
    // ????´ë¨? ?¬?‹œ?‘
    startTimer();
}

// ê²Œì„ ?¬?„¤? • ?™•?¸ ?•¨?ˆ˜
function confirmResetGame() {
    if (confirm('? •ë§ë¡œ ê²Œì„?„ ?¬ê¸°í•˜?‹œê² ìŠµ?‹ˆê¹??')) {
        resetGame();
    }
}

// °ÔÀÓ Àç¼³Á¤ ÇÔ¼ö
function resetGame() {
    stopTimer();
    resultScreen.classList.add('hidden');
    gameActive = false;
    gamePaused = false;
    currentTarget = 1;
    currentNumberElement.textContent = currentTarget;
    
    // ½ºÅ©·Ñ ¹æÁö ÇØÁ¦
    document.body.classList.remove('game-active');
    
    // ¹öÆ° »óÅÂ º¯°æ
    pauseButton.classList.add('hidden');
    resumeButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    difficultyContainer.classList.remove('hidden');
    
    // ·©Å· °ü·Ã ¿ä¼Ò ÃÊ±âÈ­
    saveScoreButton.disabled = false;
    saveScoreButton.textContent = '±â·Ï ÀúÀå';
    rankingScreen.classList.add('hidden');
    
    // °ÔÀÓ º¸µå ÃÊ±âÈ­
    clearGameBoard();
}

// ê²Œì„ ë³´ë“œ ì´ˆê¸°?™” ?•¨?ˆ˜
function clearGameBoard() {
    gameBoard.innerHTML = '';
    numberElements = [];
}

// ?ˆ«? ?ƒ?„± ë°? ê·¸ë¦¬?“œ ë°°ì¹˜ ?•¨?ˆ˜
function generateNumbers() {
    const boardRect = gameBoard.getBoundingClientRect();
    const boardWidth = boardRect.width;
    const boardHeight = boardRect.height;
    
    console.log("ê²Œì„ ë³´ë“œ ?¬ê¸?:", boardWidth, "x", boardHeight);
    
    // ê²Œì„ ë³´ë“œê°? ?„ˆë¬? ?‘?œ¼ë©? ì¡°ì •
    if (boardWidth < 100 || boardHeight < 100) {
        gameBoard.style.minHeight = "60vh";
        gameBoard.style.height = "60vh";
        gameBoard.getBoundingClientRect();
    }
    
    // ê·¸ë¦¬?“œ ?¬ê¸? ê³„ì‚° (?‚œ?´?„ë³? ìµœì ?™”)
    const numElements = maxNumber;
    let gridSize;
    
    // ?‚œ?´?„ë³? ê·¸ë¦¬?“œ ?¬ê¸? ìµœì ?™”
    if (numElements <= 20) { // ?‰¬???
        gridSize = 5; // 5x5 ê·¸ë¦¬?“œ (20ê°? ?š”?†Œ?— ìµœì )
    } else if (numElements <= 30) { // ë³´í†µ
        gridSize = 6; // 6x6 ê·¸ë¦¬?“œ (30ê°? ?š”?†Œ?— ìµœì )
    } else { // ?–´? ¤???
        gridSize = 7; // 7x7 ê·¸ë¦¬?“œ (40ê°? ?š”?†Œ?— ìµœì )
    }
    
    console.log("ê·¸ë¦¬?“œ ?¬ê¸?:", gridSize, "x", gridSize);
    
    // ëª¨ë°”?¼ ê¸°ê¸°?¸ì§? ?™•?¸
    const isMobile = window.innerWidth <= 480;
    
    // ?š”?†Œ ?¬ê¸? ê³„ì‚° (?—¬ë°? ?¬?•¨)
    const cellSize = Math.min(
        Math.floor(boardWidth / gridSize) * 0.95,
        Math.floor(boardHeight / gridSize) * 0.95
    );
    
    // ?š”?†Œ ?‹¤? œ ?¬ê¸? (ëª¨ë°”?¼?—?„œ?Š” ?” ?‘ê²?)
    const elementSize = isMobile ? 
        Math.floor(cellSize * 0.75) : 
        Math.floor(cellSize * 0.85);
    const margin = Math.floor((cellSize - elementSize) / 2);
    
    // ê·¸ë¦¬?“œ ?‹œ?‘ ?œ„ì¹? ê³„ì‚° (ì¤‘ì•™ ? •? ¬)
    const startX = Math.floor((boardWidth - cellSize * gridSize) / 2) + margin;
    const startY = Math.floor((boardHeight - cellSize * gridSize) / 2) + margin;
    
    console.log("??? ?¬ê¸?:", cellSize, "?š”?†Œ ?¬ê¸?:", elementSize, "?—¬ë°?:", margin);
    
    // ?ˆ«? ?°?´?„° ë²”ìœ„ ì¶”ì¶œ ë°? ?…”?”Œ
    const shuffledNumbers = shuffleArray(numbersData.slice(0, maxNumber));
    
    // ê·¸ë¦¬?“œ?— ?š”?†Œ ë°°ì¹˜
    shuffledNumbers.forEach((numberData, index) => {
        // ?–‰ê³? ?—´ ?œ„ì¹? ê³„ì‚°
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        
        // ?œ?¤?•˜ê²? ?ˆ«? ?‘œ?˜„ ?˜•?‹ ?„ ?ƒ (?•„?¼ë¹„ì•„, ?˜?–´, ?•œêµ??–´)
        const formatIndex = Math.floor(Math.random() * 3);
        const format = numberData.formats[formatIndex];
        
        // ?ˆ«? ?š”?†Œ ?ƒ?„±
        const element = document.createElement('div');
        element.className = 'number-item';
        element.dataset.value = numberData.value;
        element.textContent = format;
        
        // ?˜•?‹?— ?”°ë¥? ?Š¤????¼ ?´?˜?Š¤ ì¶”ê??
        if (formatIndex === 0) element.classList.add('number-arabic');
        else if (formatIndex === 1) element.classList.add('number-english');
        else element.classList.add('number-korean');
        
        // ?ˆ«? ?¬ê¸°ì— ?”°ë¥? ?Š¤????¼ ?´?˜?Š¤ ì¶”ê??
        if (numberData.value <= 9) element.classList.add('small-number');
        else if (numberData.value <= 19) element.classList.add('medium-number');
        else element.classList.add('large-number');
        
        // ëª¨ë°”?¼ ?™”ë©´ì—?„œ?Š” ?°?Š¸ ?¬ê¸? ì¡°ì •
        if (isMobile) {
            element.classList.add('mobile-item');
        }
        
        // ?š”?†Œ ?¬ê¸? ë°? ?œ„ì¹? ?„¤? •
        element.style.width = `${elementSize}px`;
        element.style.height = `${elementSize}px`;
        element.style.left = `${startX + col * cellSize}px`;
        element.style.top = `${startY + row * cellSize}px`;
        
        // ê²Œì„ ë³´ë“œ?— ?š”?†Œ ì¶”ê??
        gameBoard.appendChild(element);
        numberElements.push(element);
        
        console.log(`?ˆ«? ${numberData.value} (${format}) ?ƒ?„±: ?œ„ì¹? (${row}, ${col})`);
    });
}

// ë°°ì—´?„ ë¬´ì‘?œ„ë¡? ?„?Š” ?•¨?ˆ˜
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ?ˆ«? ?´ë¦? ì²˜ë¦¬ ?•¨?ˆ˜
function handleNumberClick(event) {
    if (!gameActive || gamePaused) return;
    
    const element = event.target;
    
    // ?ˆ«? ?š”?†Œ?¸ì§? ?™•?¸
    if (element.classList.contains('number-item')) {
        const value = parseInt(element.dataset.value);
        
        // ?˜„?¬ ëª©í‘œ ?ˆ«???? ?¼ì¹˜í•˜?Š”ì§? ?™•?¸
        if (value === currentTarget) {
            // ?‹œê°ì  ?”¼?“œë°?
            element.classList.add('correct');
            playCorrectSound();
            
            // ?‹¤?Œ ëª©í‘œ ?ˆ«?ë¡? ?—…?°?´?Š¸
            currentTarget++;
            currentNumberElement.textContent = currentTarget;
            
            // ëª¨ë“  ?ˆ«?ë¥? ì°¾ì•˜?Š”ì§? ?™•?¸
            if (currentTarget > maxNumber) {
                gameComplete();
            }
        } else {
            // ???ë¦? ê²½ìš° ?‹œê°ì  ?”¼?“œë°?
            mistakes++;
            element.classList.add('wrong');
            playWrongSound();
            
            // ? ?‹œ ?›„ ?‹œê°ì  ?”¼?“œë°? ? œê±?
            setTimeout(() => {
                element.classList.remove('wrong');
            }, 300);
        }
    }
}

// ?š¨ê³¼ìŒ ?¬?ƒ ?•¨?ˆ˜
function playCorrectSound() {
    // ê°„ë‹¨?•œ ?š¨ê³¼ìŒ ?¬?ƒ (?›¹ ?˜¤?””?˜¤ API ?‚¬?š©)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.1;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

function playWrongSound() {
    // ê°„ë‹¨?•œ ?š¨ê³¼ìŒ ?¬?ƒ (?›¹ ?˜¤?””?˜¤ API ?‚¬?š©)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 200;
    gainNode.gain.value = 0.1;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
}

// ê²Œì„ ?™„ë£? ?•¨?ˆ˜
function gameComplete() {
    gameActive = false;
    stopTimer();
    
    // ½ºÅ©·Ñ ¹æÁö ÇØÁ¦
    document.body.classList.remove('game-active');
    
    // °á°ú È­¸é Ç¥½Ã
    finalTimeElement.textContent = timerElement.textContent;
    
    // Æ²¸° È½¼ö Ç¥½Ã ¿ä¼Ò Ãß°¡
    const mistakesElement = document.getElementById('mistakes-count');
    if (mistakesElement) {
        mistakesElement.textContent = mistakes;
    }
    
    // ÀÌÀü¿¡ ÀúÀåµÈ ÀÌ¸§ÀÌ ÀÖÀ¸¸é Ç¥½Ã
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
        playerNameInput.value = savedName;
    }
    
    // °á°ú È­¸é Ç¥½Ã - ¸ğµç hidden ¼Ó¼º Á¦°Å
    resultScreen.classList.remove('hidden');
    resultScreen.style.display = 'flex';
}

// ????´ë¨? ê´?? ¨ ?•¨?ˆ˜?“¤
function startTimer() {
    if (!startTime) {
        startTime = new Date();
    }
    timerInterval = setInterval(updateTimer, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    startTime = null;
    pauseStartTime = null;
    totalPausedTime = 0;
    timerElement.textContent = '00:00:00';
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = new Date(currentTime - startTime - totalPausedTime);
    
    const minutes = String(elapsedTime.getMinutes()).padStart(2, '0');
    const seconds = String(elapsedTime.getSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(elapsedTime.getMilliseconds() / 10)).padStart(2, '0');
    
    timerElement.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

// È­¸é Å©±â º¯°æ ½Ã ¿ä¼Ò Àç¹èÄ¡
window.addEventListener('resize', () => {
    // °ÔÀÓÀÌ È°¼ºÈ­µÇ¾î ÀÖÀ» ¶§¸¸ Ã³¸®
    if (gameActive) {
        // Å©±â º¯È­°¡ ÀÓ°è°ª ÀÌ»óÀÏ ¶§¸¸ Àç¹èÄ¡
        const widthChange = Math.abs(window.innerWidth - lastWindowWidth);
        const heightChange = Math.abs(window.innerHeight - lastWindowHeight);
        
        if (widthChange > RESIZE_THRESHOLD || heightChange > RESIZE_THRESHOLD) {
            // ÇöÀç Å©±â ÀúÀå
            lastWindowWidth = window.innerWidth;
            lastWindowHeight = window.innerHeight;
            
            // °ÔÀÓ º¸µå Àç»ı¼º
            clearGameBoard();
            generateNumbers();
        }
    } else {
        // °ÔÀÓÀÌ È°¼ºÈ­µÇÁö ¾ÊÀº °æ¿ì ÇöÀç Å©±â ÀúÀå
        lastWindowWidth = window.innerWidth;
        lastWindowHeight = window.innerHeight;
    }
});

// ÅÍÄ¡ ÀÌº¥Æ® Ã³¸® (¸ğ¹ÙÀÏ¿¡¼­ ½ºÅ©·Ñ ¹æÁö)
gameBoard.addEventListener('touchmove', function(e) {
    if (gameActive) {
        e.preventDefault();
    }
}, { passive: false });

// ===== ·©Å· ½Ã½ºÅÛ ±â´É =====

// Á¡¼ö ÀúÀå ÇÔ¼ö
function saveScore() {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('ÀÌ¸§À» ÀÔ·ÂÇØÁÖ¼¼¿ä!');
        return;
    }
    
    // ÇÃ·¹ÀÌ¾î ÀÌ¸§ ÀúÀå
    localStorage.setItem('playerName', playerName);
    
    // ³­ÀÌµµº° ·©Å· Å°
    const difficultyKey = getDifficultyKey();
    
    // »õ·Î¿î Á¡¼ö µ¥ÀÌÅÍ
    const newScore = {
        name: playerName,
        time: timerElement.textContent,
        timeValue: getTimeValueInMilliseconds(timerElement.textContent),
        mistakes: mistakes,
        date: new Date().toLocaleDateString(),
        difficulty: maxNumber
    };
    
    // ±âÁ¸ ·©Å· µ¥ÀÌÅÍ °¡Á®¿À±â
    let rankings = JSON.parse(localStorage.getItem(difficultyKey)) || [];
    
    // »õ Á¡¼ö Ãß°¡
    rankings.push(newScore);
    
    // ½Ã°£ ±âÁØÀ¸·Î Á¤·Ä (¿À¸§Â÷¼ø)
    rankings.sort((a, b) => a.timeValue - b.timeValue);
    
    // »óÀ§ 10°³¸¸ À¯Áö
    rankings = rankings.slice(0, 10);
    
    // ÀúÀå
    localStorage.setItem(difficultyKey, JSON.stringify(rankings));
    
    // ÀúÀå ¹öÆ° ºñÈ°¼ºÈ­ ¹× ¸Ş½ÃÁö Ç¥½Ã
    saveScoreButton.disabled = true;
    saveScoreButton.textContent = 'ÀúÀåµÊ!';
    
    // ·©Å· Ç¥½Ã ¾÷µ¥ÀÌÆ® (ÀÌ¹Ì ·©Å· È­¸éÀÌ Ç¥½ÃµÇ¾î ÀÖÀ» °æ¿ì)
    if (!rankingScreen.classList.contains('hidden')) {
        updateRankingDisplay();
    }
}

// ·©Å· È­¸é Ç¥½Ã ÇÔ¼ö
function showRanking() {
    // ÇöÀç ³­ÀÌµµ¿¡ ¸Â´Â ¿É¼Ç ¼±ÅÃ
    const difficultyKey = getDifficultyKey();
    rankingDifficultySelect.value = difficultyKey.split('_')[1];
    
    // ·©Å· Å×ÀÌºí ¾÷µ¥ÀÌÆ®
    updateRankingDisplay();
    
    // ·©Å· È­¸é Ç¥½Ã
    rankingScreen.classList.remove('hidden');
}

// ·©Å· È­¸é ¼û±â±â ÇÔ¼ö
function hideRanking() {
    rankingScreen.classList.add('hidden');
}

// ·©Å· Ç¥½Ã ¾÷µ¥ÀÌÆ® ÇÔ¼ö
function updateRankingDisplay() {
    // ÇöÀç ¼±ÅÃµÈ ³­ÀÌµµ¿¡ µû¸¥ Å° °¡Á®¿À±â
    const difficultyValue = rankingDifficultySelect.value;
    const difficultyKey = `rankings_${difficultyValue}`;
    
    // ·©Å· µ¥ÀÌÅÍ °¡Á®¿À±â
    const rankings = JSON.parse(localStorage.getItem(difficultyKey)) || [];
    
    // Å×ÀÌºí ÃÊ±âÈ­
    rankingTableBody.innerHTML = '';
    
    // µ¥ÀÌÅÍ°¡ ¾øÀ» °æ¿ì
    if (rankings.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5">±â·ÏÀÌ ¾ø½À´Ï´Ù.</td>';
        rankingTableBody.appendChild(row);
        return;
    }
    
    // ·©Å· µ¥ÀÌÅÍ Ç¥½Ã
    rankings.forEach((score, index) => {
        const row = document.createElement('tr');
        
        // ÇöÀç ÇÃ·¹ÀÌ¾î °­Á¶
        const isCurrentPlayer = score.name === playerNameInput.value && 
                              score.time === finalTimeElement.textContent;
        if (isCurrentPlayer) {
            row.className = 'highlight';
        }
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.name}</td>
            <td>${score.time}</td>
            <td>${score.mistakes}</td>
            <td>${score.date}</td>
        `;
        
        rankingTableBody.appendChild(row);
    });
}

// ³­ÀÌµµ¿¡ µû¸¥ ·©Å· Å° ¹İÈ¯ ÇÔ¼ö
function getDifficultyKey() {
    let difficultyKey;
    
    if (maxNumber <= 20) {
        difficultyKey = 'rankings_easy';
    } else if (maxNumber <= 30) {
        difficultyKey = 'rankings_normal';
    } else {
        difficultyKey = 'rankings_hard';
    }
    
    return difficultyKey;
}

// ½Ã°£ ¹®ÀÚ¿­À» ¹Ğ¸®ÃÊ·Î º¯È¯ÇÏ´Â ÇÔ¼ö
function getTimeValueInMilliseconds(timeString) {
    const [minutes, seconds, milliseconds] = timeString.split(':').map(Number);
    return (minutes * 60 * 1000) + (seconds * 1000) + (milliseconds * 10);
} 