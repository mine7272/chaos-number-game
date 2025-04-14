// 1ë¶??° 40ê¹ì??? ?«?? ???? ?°?´?° êµ¬ì"
const numbersData = [
    { value: 1, formats: ['1', 'one', '?¼'] },
    { value: 2, formats: ['2', 'two', '?´'] },
    { value: 3, formats: ['3', 'three', '?¼'] },
    { value: 4, formats: ['4', 'four', '?¬'] },
    { value: 5, formats: ['5', 'five', '?¤'] },
    { value: 6, formats: ['6', 'six', '?¡'] },
    { value: 7, formats: ['7', 'seven', 'ì¹?'] },
    { value: 8, formats: ['8', 'eight', '?'] },
    { value: 9, formats: ['9', 'nine', 'êµ?'] },
    { value: 10, formats: ['10', 'ten', '?­'] },
    { value: 11, formats: ['11', 'eleven', '?­?¼'] },
    { value: 12, formats: ['12', 'twelve', '?­?´'] },
    { value: 13, formats: ['13', 'thirteen', '?­?¼'] },
    { value: 14, formats: ['14', 'fourteen', '?­?¬'] },
    { value: 15, formats: ['15', 'fifteen', '?­?¤'] },
    { value: 16, formats: ['16', 'sixteen', '?­?¡'] },
    { value: 17, formats: ['17', 'seventeen', '?­ì¹?'] },
    { value: 18, formats: ['18', 'eighteen', '?­?'] },
    { value: 19, formats: ['19', 'nineteen', '?­êµ?'] },
    { value: 20, formats: ['20', 'twenty', '?´?­'] },
    { value: 21, formats: ['21', 'twenty-one', '?´?­?¼'] },
    { value: 22, formats: ['22', 'twenty-two', '?´?­?´'] },
    { value: 23, formats: ['23', 'twenty-three', '?´?­?¼'] },
    { value: 24, formats: ['24', 'twenty-four', '?´?­?¬'] },
    { value: 25, formats: ['25', 'twenty-five', '?´?­?¤'] },
    { value: 26, formats: ['26', 'twenty-six', '?´?­?¡'] },
    { value: 27, formats: ['27', 'twenty-seven', '?´?­ì¹?'] },
    { value: 28, formats: ['28', 'twenty-eight', '?´?­?'] },
    { value: 29, formats: ['29', 'twenty-nine', '?´?­êµ?'] },
    { value: 30, formats: ['30', 'thirty', '?¼?­'] },
    { value: 31, formats: ['31', 'thirty-one', '?¼?­?¼'] },
    { value: 32, formats: ['32', 'thirty-two', '?¼?­?´'] },
    { value: 33, formats: ['33', 'thirty-three', '?¼?­?¼'] },
    { value: 34, formats: ['34', 'thirty-four', '?¼?­?¬'] },
    { value: 35, formats: ['35', 'thirty-five', '?¼?­?¤'] },
    { value: 36, formats: ['36', 'thirty-six', '?¼?­?¡'] },
    { value: 37, formats: ['37', 'thirty-seven', '?¼?­ì¹?'] },
    { value: 38, formats: ['38', 'thirty-eight', '?¼?­?'] },
    { value: 39, formats: ['39', 'thirty-nine', '?¼?­êµ?'] },
    { value: 40, formats: ['40', 'forty', '?¬?­'] }
];

// ê²ì ?? ë³??
let gameActive = false;
let gamePaused = false;
let currentTarget = 1;
let startTime;
let pauseStartTime;
let totalPausedTime = 0;
let timerInterval;
let gameBoard;
let numberElements = [];
let mistakes = 0; // ???ë¦? ?? ì¶ì 
let maxNumber = 30; // ê¸°ë³¸ ??´? (ë³´íµ)

// DOM ???¤
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

// ¸¸ë¡ ë©? ???¤
const introScreen = document.getElementById('intro-screen');
const startGameButton = document.getElementById('start-game-button');
const easyButtonIntro = document.getElementById('easy-button-intro');
const normalButtonIntro = document.getElementById('normal-button-intro');
const hardButtonIntro = document.getElementById('hard-button-intro');

// ?´ë²¤í¸ ë¦¬ì¤? ?¤? 
document.addEventListener('DOMContentLoaded', () => {
    gameBoard = document.getElementById('game-board');
    
    // ì´ê¸°? ?¨? ?¸ì¶?
    initGame();
    
    // ?¸?¸ë¡? ?ë©? ?´ë²¤í¸ ?¤? 
    startGameButton.addEventListener('click', startFromIntro);
    easyButtonIntro.addEventListener('click', () => setDifficultyIntro('easy'));
    normalButtonIntro.addEventListener('click', () => setDifficultyIntro('normal'));
    hardButtonIntro.addEventListener('click', () => setDifficultyIntro('hard'));
    
    // ê²ì ?? ?´ ì¤? ?´ë²¤í¸ ?¤? 
    startButton.addEventListener('click', startGame);
    pauseButton.addEventListener('click', pauseGame);
    resumeButton.addEventListener('click', resumeGame);
    restartButton.addEventListener('click', confirmResetGame);
    playAgainButton.addEventListener('click', resetGame);
    
    // ??´? ë²í¼ ?´ë²¤í¸ ?¤?  (ê²ì ?? ?´ ì¤?)
    easyButton.addEventListener('click', () => setDifficulty('easy'));
    normalButton.addEventListener('click', () => setDifficulty('normal'));
    hardButton.addEventListener('click', () => setDifficulty('hard'));
    
    // ·©Å· ½Ã½ºÅÛ ÀÌº¥Æ® ¼³Á¤
    saveScoreButton.addEventListener('click', saveScore);
    showRankingButton.addEventListener('click', showRanking);
    closeRankingButton.addEventListener('click', hideRanking);
    rankingDifficultySelect.addEventListener('change', updateRankingDisplay);
    
    // ê²ì ë³´ë ?´ë²¤í¸ ?? ?¤? 
    gameBoard.addEventListener('click', handleNumberClick);
});

// ê²ì ì´ê¸°? ?¨?
function initGame() {
    // ê²ì ê¸°ë³¸ ?¤?  - ê´?? ¨ UI ?¨ê¸°ê¸°
    hideGameElements();
    showIntroScreen();
    
    // ê²°ê³¼ ?ë©? ê°ì ë¡? ?¨ê¸°ê¸°
    resultScreen.classList.add('hidden');
    resultScreen.style.display = 'none';
    
    // ê²ì ?? ì´ê¸°?
    gameActive = false;
    gamePaused = false;
    currentTarget = 1;
    mistakes = 0;
    
    // ????´ë¨? ì´ê¸°?
    resetTimer();
}

// ê²ì ?? ?¨ê¸°ê¸° ?¨?
function hideGameElements() {
    gameBoard.style.visibility = 'hidden';
    document.querySelector('.game-header').style.visibility = 'hidden';
    startButton.style.display = 'none';
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    difficultyContainer.style.display = 'none';
}

// ê²ì ?? ?? ?¨?
function showGameElements() {
    gameBoard.style.visibility = 'visible';
    gameBoard.classList.remove('hidden');
    document.querySelector('.game-header').style.visibility = 'visible';
    startButton.style.display = 'inline-block';
    difficultyContainer.style.display = 'block';
    difficultyContainer.classList.remove('hidden');
}

// ?¸?¸ë¡? ?ë©? ?? ?¨?
function showIntroScreen() {
    introScreen.classList.remove('hidden');
}

// ?¸?¸ë¡? ?ë©? ?¨ê¸°ê¸° ?¨?
function hideIntroScreen() {
    introScreen.classList.add('hidden');
}

// ?¸?¸ë¡? ?ë©´ì? ??´? ?¤? 
function setDifficultyIntro(level) {
    // ëª¨ë  ??´? ë²í¼?? active ?´??¤ ? ê±?
    easyButtonIntro.classList.remove('active');
    normalButtonIntro.classList.remove('active');
    hardButtonIntro.classList.remove('active');
    
    // ? ?? ??´?? ?°?¼ maxNumber ?¤?  ë°? ë²í¼ ??±?
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
    
    // ê²ì ?ë©´ì ??´? ë²í¼? ?ê¸°í
    syncDifficultyButtons(level);
}

// ê²ì ?ë©´ì ??´? ë²í¼ ?ê¸°í
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

// ?¸?¸ë¡ì? ê²ì ??
function startFromIntro() {
    hideIntroScreen();
    
    // ê²ì ë³´ë ?? ??¤? ??
    gameBoard.classList.remove('hidden');
    gameBoard.style.visibility = 'visible';
    gameBoard.style.display = 'block';
    
    showGameElements();
    
    // ?½ê°? ì§??°?ì¼? UIê°? ??°?´?¸? ? ê²ì ??
    setTimeout(() => {
        startGame();
    }, 100);
}

// ??´? ?¤?  ?¨?
function setDifficulty(level) {
    // ëª¨ë  ??´? ë²í¼?? active ?´??¤ ? ê±?
    easyButton.classList.remove('active');
    normalButton.classList.remove('active');
    hardButton.classList.remove('active');
    
    // ? ?? ??´?? ?°?¼ maxNumber ?¤?  ë°? ë²í¼ ??±?
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

// ê²ì ?? ?¨?
function startGame() {
    gameActive = true;
    gamePaused = false;
    currentTarget = 1;
    mistakes = 0; // ?¤? ì¹´ì´?° ì´ê¸°?
    totalPausedTime = 0;
    currentNumberElement.textContent = currentTarget;
    
    // ê²ì ë³´ëê°? ??¤? ????ë¡? ?¨
    gameBoard.classList.remove('hidden');
    gameBoard.style.visibility = 'visible';
    gameBoard.style.display = 'block';
    
    // ??/ì¤ì?? ë²í¼ ?? ë³?ê²?
    startButton.classList.add('hidden');
    difficultyContainer.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    
    // ????´ë¨? ì´ê¸°? ë°? ??
    resetTimer();
    startTimer();
    
    // ê²ì ë³´ë ì´ê¸°? ë°? ?«? ??±
    clearGameBoard();
    generateNumbers();
}

// ê²ì ?¼?? ì§? ?¨?
function pauseGame() {
    if (!gameActive || gamePaused) return;
    
    gamePaused = true;
    pauseStartTime = new Date();
    stopTimer();
    
    // ë²í¼ ?? ë³?ê²?
    pauseButton.classList.add('hidden');
    resumeButton.classList.remove('hidden');
    
    // ê²ì ë³´ë? ?¼?? ì§? ?¤ë²ë ?´ ì¶ê??
    const pauseOverlay = document.createElement('div');
    pauseOverlay.className = 'pause-overlay';
    pauseOverlay.innerHTML = '<div class="pause-message">?¼?? ì§??¨</div>';
    gameBoard.appendChild(pauseOverlay);
}

// ê²ì ?¬ê°? ?¨?
function resumeGame() {
    if (!gameActive || !gamePaused) return;
    
    // ?¼?? ì§?? ?ê°? ê³ì°
    const now = new Date();
    totalPausedTime += now - pauseStartTime;
    
    gamePaused = false;
    
    // ë²í¼ ?? ë³?ê²?
    resumeButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    
    // ?¼?? ì§? ?¤ë²ë ?´ ? ê±?
    const pauseOverlay = document.querySelector('.pause-overlay');
    if (pauseOverlay) {
        pauseOverlay.remove();
    }
    
    // ????´ë¨? ?¬??
    startTimer();
}

// ê²ì ?¬?¤?  ??¸ ?¨?
function confirmResetGame() {
    if (confirm('? ë§ë¡ ê²ì? ?¬ê¸°í?ê² ìµ?ê¹??')) {
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

// ê²ì ë³´ë ì´ê¸°? ?¨?
function clearGameBoard() {
    gameBoard.innerHTML = '';
    numberElements = [];
}

// ?«? ??± ë°? ê·¸ë¦¬? ë°°ì¹ ?¨?
function generateNumbers() {
    const boardRect = gameBoard.getBoundingClientRect();
    const boardWidth = boardRect.width;
    const boardHeight = boardRect.height;
    
    console.log("ê²ì ë³´ë ?¬ê¸?:", boardWidth, "x", boardHeight);
    
    // ê²ì ë³´ëê°? ?ë¬? ??¼ë©? ì¡°ì 
    if (boardWidth < 100 || boardHeight < 100) {
        gameBoard.style.minHeight = "60vh";
        gameBoard.style.height = "60vh";
        gameBoard.getBoundingClientRect();
    }
    
    // ê·¸ë¦¬? ?¬ê¸? ê³ì° (??´?ë³? ìµì ?)
    const numElements = maxNumber;
    let gridSize;
    
    // ??´?ë³? ê·¸ë¦¬? ?¬ê¸? ìµì ?
    if (numElements <= 20) { // ?¬???
        gridSize = 5; // 5x5 ê·¸ë¦¬? (20ê°? ??? ìµì )
    } else if (numElements <= 30) { // ë³´íµ
        gridSize = 6; // 6x6 ê·¸ë¦¬? (30ê°? ??? ìµì )
    } else { // ?´? ¤???
        gridSize = 7; // 7x7 ê·¸ë¦¬? (40ê°? ??? ìµì )
    }
    
    console.log("ê·¸ë¦¬? ?¬ê¸?:", gridSize, "x", gridSize);
    
    // ëª¨ë°?¼ ê¸°ê¸°?¸ì§? ??¸
    const isMobile = window.innerWidth <= 480;
    
    // ?? ?¬ê¸? ê³ì° (?¬ë°? ?¬?¨)
    const cellSize = Math.min(
        Math.floor(boardWidth / gridSize) * 0.95,
        Math.floor(boardHeight / gridSize) * 0.95
    );
    
    // ?? ?¤?  ?¬ê¸? (ëª¨ë°?¼??? ? ?ê²?)
    const elementSize = isMobile ? 
        Math.floor(cellSize * 0.75) : 
        Math.floor(cellSize * 0.85);
    const margin = Math.floor((cellSize - elementSize) / 2);
    
    // ê·¸ë¦¬? ?? ?ì¹? ê³ì° (ì¤ì ? ? ¬)
    const startX = Math.floor((boardWidth - cellSize * gridSize) / 2) + margin;
    const startY = Math.floor((boardHeight - cellSize * gridSize) / 2) + margin;
    
    console.log("??? ?¬ê¸?:", cellSize, "?? ?¬ê¸?:", elementSize, "?¬ë°?:", margin);
    
    // ?«? ?°?´?° ë²ì ì¶ì¶ ë°? ??
    const shuffledNumbers = shuffleArray(numbersData.slice(0, maxNumber));
    
    // ê·¸ë¦¬?? ?? ë°°ì¹
    shuffledNumbers.forEach((numberData, index) => {
        // ?ê³? ?´ ?ì¹? ê³ì°
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        
        // ??¤?ê²? ?«? ?? ?? ? ? (??¼ë¹ì, ??´, ?êµ??´)
        const formatIndex = Math.floor(Math.random() * 3);
        const format = numberData.formats[formatIndex];
        
        // ?«? ?? ??±
        const element = document.createElement('div');
        element.className = 'number-item';
        element.dataset.value = numberData.value;
        element.textContent = format;
        
        // ??? ?°ë¥? ?¤????¼ ?´??¤ ì¶ê??
        if (formatIndex === 0) element.classList.add('number-arabic');
        else if (formatIndex === 1) element.classList.add('number-english');
        else element.classList.add('number-korean');
        
        // ?«? ?¬ê¸°ì ?°ë¥? ?¤????¼ ?´??¤ ì¶ê??
        if (numberData.value <= 9) element.classList.add('small-number');
        else if (numberData.value <= 19) element.classList.add('medium-number');
        else element.classList.add('large-number');
        
        // ëª¨ë°?¼ ?ë©´ì?? ?°?¸ ?¬ê¸? ì¡°ì 
        if (isMobile) {
            element.classList.add('mobile-item');
        }
        
        // ?? ?¬ê¸? ë°? ?ì¹? ?¤? 
        element.style.width = `${elementSize}px`;
        element.style.height = `${elementSize}px`;
        element.style.left = `${startX + col * cellSize}px`;
        element.style.top = `${startY + row * cellSize}px`;
        
        // ê²ì ë³´ë? ?? ì¶ê??
        gameBoard.appendChild(element);
        numberElements.push(element);
        
        console.log(`?«? ${numberData.value} (${format}) ??±: ?ì¹? (${row}, ${col})`);
    });
}

// ë°°ì´? ë¬´ì?ë¡? ?? ?¨?
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ?«? ?´ë¦? ì²ë¦¬ ?¨?
function handleNumberClick(event) {
    if (!gameActive || gamePaused) return;
    
    const element = event.target;
    
    // ?«? ???¸ì§? ??¸
    if (element.classList.contains('number-item')) {
        const value = parseInt(element.dataset.value);
        
        // ??¬ ëª©í ?«???? ?¼ì¹í?ì§? ??¸
        if (value === currentTarget) {
            // ?ê°ì  ?¼?ë°?
            element.classList.add('correct');
            playCorrectSound();
            
            // ?¤? ëª©í ?«?ë¡? ??°?´?¸
            currentTarget++;
            currentNumberElement.textContent = currentTarget;
            
            // ëª¨ë  ?«?ë¥? ì°¾ì?ì§? ??¸
            if (currentTarget > maxNumber) {
                gameComplete();
            }
        } else {
            // ???ë¦? ê²½ì° ?ê°ì  ?¼?ë°?
            mistakes++;
            element.classList.add('wrong');
            playWrongSound();
            
            // ? ? ? ?ê°ì  ?¼?ë°? ? ê±?
            setTimeout(() => {
                element.classList.remove('wrong');
            }, 300);
        }
    }
}

// ?¨ê³¼ì ?¬? ?¨?
function playCorrectSound() {
    // ê°ë¨? ?¨ê³¼ì ?¬? (?¹ ?¤??¤ API ?¬?©)
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
    // ê°ë¨? ?¨ê³¼ì ?¬? (?¹ ?¤??¤ API ?¬?©)
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

// ê²ì ?ë£? ?¨?
function gameComplete() {
    gameActive = false;
    stopTimer();
    
    // ê²°ê³¼ ?ë©? ??
    finalTimeElement.textContent = timerElement.textContent;
    
    // ???ë¦? ?? ?? ?? ì¶ê??
    const mistakesElement = document.getElementById('mistakes-count');
    if (mistakesElement) {
        mistakesElement.textContent = mistakes;
    }
    
    // ÀÌÀü¿¡ ÀúÀåµÈ ÀÌ¸§ÀÌ ÀÖÀ¸¸é Ç¥½Ã
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
        playerNameInput.value = savedName;
    }
    
    // ê²°ê³¼ ?ë©? ?? - ëª¨ë  hidden ??± ? ê±?
    resultScreen.classList.remove('hidden');
    resultScreen.style.display = 'flex';
}

// ????´ë¨? ê´?? ¨ ?¨??¤
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

// ?ë©? ?¬ê¸? ë³?ê²? ? ?? ?¬ë°°ì¹
window.addEventListener('resize', () => {
    if (gameActive) {
        clearGameBoard();
        generateNumbers();
    }
});

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
    
    // ÀúÀå ¹öÆ° ºñÈ°¼ºÈ­ ¹× ¸Þ½ÃÁö Ç¥½Ã
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

// ³­ÀÌµµ¿¡ µû¸¥ ·©Å· Å° ¹ÝÈ¯ ÇÔ¼ö
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

// ½Ã°£ ¹®ÀÚ¿­À» ¹Ð¸®ÃÊ·Î º¯È¯ÇÏ´Â ÇÔ¼ö
function getTimeValueInMilliseconds(timeString) {
    const [minutes, seconds, milliseconds] = timeString.split(':').map(Number);
    return (minutes * 60 * 1000) + (seconds * 1000) + (milliseconds * 10);
} 