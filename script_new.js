// 랭킹 시스템 비활성화
// 1부터 40까지의 숫자와 형식 데이터 구조
const numbersData = [
    { value: 1, formats: ['1', 'one', '일'] },
    { value: 2, formats: ['2', 'two', '이'] },
    { value: 3, formats: ['3', 'three', '삼'] },
    { value: 4, formats: ['4', 'four', '사'] },
    { value: 5, formats: ['5', 'five', '오'] },
    { value: 6, formats: ['6', 'six', '육'] },
    { value: 7, formats: ['7', 'seven', '칠'] },
    { value: 8, formats: ['8', 'eight', '팔'] },
    { value: 9, formats: ['9', 'nine', '구'] },
    { value: 10, formats: ['10', 'ten', '십'] },
    { value: 11, formats: ['11', 'eleven', '십일'] },
    { value: 12, formats: ['12', 'twelve', '십이'] },
    { value: 13, formats: ['13', 'thirteen', '십삼'] },
    { value: 14, formats: ['14', 'fourteen', '십사'] },
    { value: 15, formats: ['15', 'fifteen', '십오'] },
    { value: 16, formats: ['16', 'sixteen', '십육'] },
    { value: 17, formats: ['17', 'seventeen', '십칠'] },
    { value: 18, formats: ['18', 'eighteen', '십팔'] },
    { value: 19, formats: ['19', 'nineteen', '십구'] },
    { value: 20, formats: ['20', 'twenty', '이십'] },
    { value: 21, formats: ['21', 'twenty-one', '이십일'] },
    { value: 22, formats: ['22', 'twenty-two', '이십이'] },
    { value: 23, formats: ['23', 'twenty-three', '이십삼'] },
    { value: 24, formats: ['24', 'twenty-four', '이십사'] },
    { value: 25, formats: ['25', 'twenty-five', '이십오'] },
    { value: 26, formats: ['26', 'twenty-six', '이십육'] },
    { value: 27, formats: ['27', 'twenty-seven', '이십칠'] },
    { value: 28, formats: ['28', 'twenty-eight', '이십팔'] },
    { value: 29, formats: ['29', 'twenty-nine', '이십구'] },
    { value: 30, formats: ['30', 'thirty', '삼십'] },
    { value: 31, formats: ['31', 'thirty-one', '삼십일'] },
    { value: 32, formats: ['32', 'thirty-two', '삼십이'] },
    { value: 33, formats: ['33', 'thirty-three', '삼십삼'] },
    { value: 34, formats: ['34', 'thirty-four', '삼십사'] },
    { value: 35, formats: ['35', 'thirty-five', '삼십오'] },
    { value: 36, formats: ['36', 'thirty-six', '삼십육'] },
    { value: 37, formats: ['37', 'thirty-seven', '삼십칠'] },
    { value: 38, formats: ['38', 'thirty-eight', '삼십팔'] },
    { value: 39, formats: ['39', 'thirty-nine', '삼십구'] },
    { value: 40, formats: ['40', 'forty', '사십'] }
];

// 게임 상태 변수
let gameActive = false;
let gamePaused = false;
let currentTarget = 1;
let startTime;
let pauseStartTime;
let totalPausedTime = 0;
let timerInterval;
let gameBoard;
let numberElements = [];
let mistakes = 0; // 실수 횟수 추적
let maxNumber = 30; // 기본 난이도(보통)

// DOM ?붿냼??
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

// ??궧 ?쒖뒪???붿냼??
const playerNameInput = document.getElementById('player-name');
const saveScoreButton = document.getElementById('save-score-button');
const showRankingButton = document.getElementById('show-ranking-button');
const rankingScreen = document.getElementById('ranking-screen');
const rankingTableBody = document.getElementById('ranking-table-body');
const closeRankingButton = document.getElementById('close-ranking-button');
const rankingDifficultySelect = document.getElementById('ranking-difficulty');

// ?명듃濡??붾㈃ ?붿냼??
const introScreen = document.getElementById('intro-screen');
const startGameButton = document.getElementById('start-game-button');
const easyButtonIntro = document.getElementById('easy-button-intro');
const normalButtonIntro = document.getElementById('normal-button-intro');
const hardButtonIntro = document.getElementById('hard-button-intro');

// 留덉?留??덈룄???ш린 ???
let lastWindowWidth = window.innerWidth;
let lastWindowHeight = window.innerHeight;
const RESIZE_THRESHOLD = 50; // ?ш린 蹂??臾댁떆 ?꾧퀎媛?(px)

// ?대깽??由ъ뒪???ㅼ젙
document.addEventListener('DOMContentLoaded', () => {
    gameBoard = document.getElementById('game-board');
    
    // 珥덇린???⑥닔 ?몄텧
    initGame();
    
    // ?명듃濡??붾㈃ ?대깽???ㅼ젙
    startGameButton.addEventListener('click', startFromIntro);
    easyButtonIntro.addEventListener('click', () => setDifficultyIntro('easy'));
    normalButtonIntro.addEventListener('click', () => setDifficultyIntro('normal'));
    hardButtonIntro.addEventListener('click', () => setDifficultyIntro('hard'));
    
    // 寃뚯엫 而⑦듃濡?踰꾪듉 ?대깽???ㅼ젙
    startButton.addEventListener('click', startGame);
    pauseButton.addEventListener('click', pauseGame);
    resumeButton.addEventListener('click', resumeGame);
    restartButton.addEventListener('click', confirmResetGame);
    playAgainButton.addEventListener('click', resetGame);
    
    // ?쒖씠??踰꾪듉 ?대깽???ㅼ젙 (寃뚯엫 ?붾㈃?먯꽌)
    easyButton.addEventListener('click', () => setDifficulty('easy'));
    normalButton.addEventListener('click', () => setDifficulty('normal'));
    hardButton.addEventListener('click', () => setDifficulty('hard'));
    
    // ??궧 ?쒖뒪???대깽???ㅼ젙
    saveScoreButton.addEventListener('click', saveScore);
    showRankingButton.addEventListener('click', showRanking);
    closeRankingButton.addEventListener('click', hideRanking);
    rankingDifficultySelect.addEventListener('change', updateRankingDisplay);
    
    // 寃뚯엫 蹂대뱶???대깽???꾩엫 ?ㅼ젙
    gameBoard.addEventListener('click', handleNumberClick);
});

// 寃뚯엫 珥덇린???⑥닔
function initGame() {
    // 寃뚯엫 湲곕낯 ?ㅼ젙 - 湲곕낯 UI ?ㅼ젙
    hideGameElements();
    showIntroScreen();
    
    // 寃곌낵 ?붾㈃ 媛뺤젣 珥덇린??
    resultScreen.classList.add('hidden');
    resultScreen.style.display = 'none';
    
    // 寃뚯엫 ?곹깭 珥덇린??
    gameActive = false;
    gamePaused = false;
    currentTarget = 1;
    mistakes = 0;
    
    // ??대㉧ 珥덇린??
    resetTimer();
}

// 寃뚯엫 ?붾㈃?먯꽌 蹂댁씠吏 ?딅뒗 ?붿냼??
function hideGameElements() {
    gameBoard.style.visibility = 'hidden';
    document.querySelector('.game-header').style.visibility = 'hidden';
    startButton.style.display = 'none';
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    difficultyContainer.style.display = 'none';
}

// 寃뚯엫 ?붾㈃?먯꽌 蹂댁씠???붿냼??
function showGameElements() {
    gameBoard.style.visibility = 'visible';
    gameBoard.classList.remove('hidden');
    document.querySelector('.game-header').style.visibility = 'visible';
    startButton.style.display = 'inline-block';
    difficultyContainer.style.display = 'block';
    difficultyContainer.classList.remove('hidden');
}

// 인트로 화면 보이기
function showIntroScreen() {
    introScreen.classList.remove('hidden');
}

// 인트로 화면 숨기기
function hideIntroScreen() {
    introScreen.classList.add('hidden');
}

// ?명듃濡??붾㈃?먯꽌 ?쒖씠???좏깮 泥섎━
function setDifficultyIntro(level) {
    // 紐⑤뱺 ?쒖씠??踰꾪듉 鍮꾪솢?깊솕
    easyButtonIntro.classList.remove('active');
    normalButtonIntro.classList.remove('active');
    hardButtonIntro.classList.remove('active');
    
    // ?좏깮???쒖씠?꾩뿉 ?곕씪 maxNumber ?ㅼ젙 諛??쒖꽦??踰꾪듉 ?ㅼ젙
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
    
    // 寃뚯엫 ?붾㈃???쒖씠??踰꾪듉 ?ㅼ젙
    syncDifficultyButtons(level);
}

// 寃뚯엫 ?붾㈃???쒖씠??踰꾪듉 ?ㅼ젙
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

// ?명듃濡??붾㈃?먯꽌 寃뚯엫 ?쒖옉
function startFromIntro() {
    hideIntroScreen();
    
    // 寃뚯엫 蹂대뱶?먯꽌 蹂댁씠吏 ?딅뒗 ?붿냼???쒓굅
    gameBoard.classList.remove('hidden');
    gameBoard.style.visibility = 'visible';
    gameBoard.style.display = 'block';
    
    showGameElements();
    
    // 鍮좊Ⅸ 寃뚯엫 ?쒖옉???꾪븳 ?꾩떆 泥섎━
    setTimeout(() => {
        startGame();
    }, 100);
}

// ?쒖씠???ㅼ젙 泥섎━
function setDifficulty(level) {
    // 紐⑤뱺 ?쒖씠??踰꾪듉 鍮꾪솢?깊솕
    easyButton.classList.remove('active');
    normalButton.classList.remove('active');
    hardButton.classList.remove('active');
    
    // ?좏깮???쒖씠?꾩뿉 ?곕씪 maxNumber ?ㅼ젙 諛??쒖꽦??踰꾪듉 ?ㅼ젙
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

// 게임 시작 함수
function startGame() {
    if (gameActive) return;
    
    // 게임 상태 초기화
    gameActive = true;
    gamePaused = false;
    currentTarget = 1;
    mistakes = 0;
    currentNumberElement.textContent = currentTarget;
    
    // 게임 보드 초기화
    clearGameBoard();
    
    // 게임 화면 설정
    difficultyContainer.classList.add('hidden');
    startButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    
    // 결과 화면 초기화
    resultScreen.classList.add('hidden');
    resultScreen.style.display = 'none';
    
    // 스크롤 방지를 위한 클래스 추가
    document.body.classList.add('game-active');
    
    // 게임 보드가 보이도록 설정
    gameBoard.style.visibility = 'visible';
    gameBoard.style.display = 'grid';
    
    // 숫자 생성 및 배치
    generateNumbers();
    
    // 타이머 시작
    resetTimer();
    startTimer();
    
    console.log("게임 시작됨, 난이도:", maxNumber);
}

// 寃뚯엫 ?쇱떆?뺤? 泥섎━
function pauseGame() {
    if (!gameActive || gamePaused) return;
    
    gamePaused = true;
    pauseStartTime = new Date();
    stopTimer();
    
    // 踰꾪듉 鍮꾪솢?깊솕
    pauseButton.classList.add('hidden');
    resumeButton.classList.remove('hidden');
    
    // 寃뚯엫 蹂대뱶?먯꽌 蹂댁씠吏 ?딅뒗 ?붿냼??異붽?
    const pauseOverlay = document.createElement('div');
    pauseOverlay.className = 'pause-overlay';
    pauseOverlay.innerHTML = '<div class="pause-message">寃뚯엫???쇱떆?뺤??섏떆寃좎뒿?덇퉴?</div>';
    gameBoard.appendChild(pauseOverlay);
}

// 寃뚯엫 ?ъ떆??泥섎━
function resumeGame() {
    if (!gameActive || !gamePaused) return;
    
    // ?쇱떆?뺤? ?쒓컙 怨꾩궛
    const now = new Date();
    totalPausedTime += now - pauseStartTime;
    
    gamePaused = false;
    
    // 踰꾪듉 鍮꾪솢?깊솕
    resumeButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    
    // 寃뚯엫 蹂대뱶?먯꽌 蹂댁씠吏 ?딅뒗 ?붿냼???쒓굅
    const pauseOverlay = document.querySelector('.pause-overlay');
    if (pauseOverlay) {
        pauseOverlay.remove();
    }
    
    // ??대㉧ ?ъ떆??
    startTimer();
}

// 寃뚯엫 ?ъ떆???뺤씤
function confirmResetGame() {
    if (confirm('留먮줈 寃뚯엫??珥덇린?뷀븯?쒓쿋?듬땲源?')) {
        resetGame();
    }
}

// 寃뚯엫 蹂대뱶 珥덇린??
function resetGame() {
    stopTimer();
    resultScreen.classList.add('hidden');
    gameActive = false;
    gamePaused = false;
    currentTarget = 1;
    currentNumberElement.textContent = currentTarget;
    
    // 寃뚯엫 ?쒖꽦???대옒???쒓굅
    document.body.classList.remove('game-active');
    
    // 寃뚯엫 而⑦듃濡?踰꾪듉 ?ㅼ젙
    startButton.classList.remove('hidden');
    difficultyContainer.classList.remove('hidden');
    pauseButton.classList.add('hidden');
    resumeButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    
    // ??궧 ?쒖뒪???먯닔 珥덇린??
    saveScoreButton.disabled = false;
    saveScoreButton.textContent = '?먯닔 ???;
    rankingScreen.classList.add('hidden');
    
    // 寃뚯엫 蹂대뱶 珥덇린??
    clearGameBoard();
}

// 寃뚯엫 蹂대뱶 珥덇린??
function clearGameBoard() {
    gameBoard.innerHTML = '';
    numberElements = [];
}

// 게임 보드에서 숫자 그리기/배치 처리
function generateNumbers() {
    // 게임 보드 초기화
    gameBoard.innerHTML = '';
    numberElements = [];
    
    const boardRect = gameBoard.getBoundingClientRect();
    const boardWidth = boardRect.width;
    const boardHeight = boardRect.height;
    
    console.log("게임 보드 크기:", boardWidth, "x", boardHeight);
    
    // 게임 보드가 보이지 않는 경우 조정
    if (boardWidth < 100 || boardHeight < 100) {
        gameBoard.style.minHeight = "60vh";
        gameBoard.style.height = "60vh";
        // 레이아웃 재계산 강제
        void gameBoard.offsetHeight;
        // 보드 크기 다시 측정
        const newRect = gameBoard.getBoundingClientRect();
        console.log("게임 보드 크기 조정 후:", newRect.width, "x", newRect.height);
    }
    
    // 그리드 계산 (최적화를 위한 조정)
    const numElements = maxNumber;
    let gridSize;
    
    // 그리드 계산 (최적화를 위한 조정)
    if (numElements <= 20) { // 쉬움
        gridSize = 5; // 5x5 그리드(20개 이상의 숫자를 위한 최적값)
    } else if (numElements <= 30) { // 보통
        gridSize = 6; // 6x6 그리드(30개 이상의 숫자를 위한 최적값)
    } else { // 어려움
        gridSize = 7; // 7x7 그리드(40개 이상의 숫자를 위한 최적값)
    }
    
    console.log("그리드 크기:", gridSize, "x", gridSize);
    
    // 모바일 기기 확인
    const isMobile = window.innerWidth <= 480;
    
    // CSS 클래스 사용
    gameBoard.style.display = 'grid';
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gameBoard.style.gap = '10px';
    
    // 그리드 범위 추출 및 조정
    const shuffledNumbers = shuffleArray(numbersData.slice(0, maxNumber));
    
    // 그리드 배치
    shuffledNumbers.forEach((numberData, index) => {
        // 그리드 형식 추출
        const formatIndex = Math.floor(Math.random() * 3);
        const format = numberData.formats[formatIndex];
        
        // 그리드 요소 생성
        const element = document.createElement('div');
        element.className = 'number-item';
        element.dataset.value = numberData.value;
        element.textContent = format;
        
        // 그리드 형식에 따른 클래스 추가
        if (formatIndex === 0) element.dataset.format = 'arabic';
        else if (formatIndex === 1) element.dataset.format = 'english';
        else element.dataset.format = 'korean';
        
        // 게임 보드에 추가
        gameBoard.appendChild(element);
        numberElements.push(element);
        
        console.log(`숫자 ${numberData.value} (${format}) 생성됨`);
    });
}

// 諛곗뿴 臾댁옉??泥섎━
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 寃뚯엫 蹂대뱶?먯꽌 ?レ옄 泥섎━
function handleNumberClick(event) {
    if (!gameActive || gamePaused) return;
    
    const element = event.target;
    
    // 洹몃━湲??뺤씤
    if (element.classList.contains('number-item')) {
        const value = parseInt(element.dataset.value);
        
        // 紐⑺몴 ?レ옄? 鍮꾧탳?섏뿬 泥섎━
        if (value === currentTarget) {
            // ?뺣떟 泥섎━
            element.classList.add('correct');
            playCorrectSound();
            
            // 紐⑺몴 ?レ옄 ?ㅼ쓬?쇰줈 ?대룞
            currentTarget++;
            currentNumberElement.textContent = currentTarget;
            
            // 紐⑤뱺 ?レ옄 李얠븯?붿? ?뺤씤
            if (currentTarget > maxNumber) {
                gameComplete();
            }
        } else {
            // ?ㅻ떟 寃쎌슦 ?뺣떟 泥섎━
            mistakes++;
            element.classList.add('wrong');
            playWrongSound();
            
            // ?뺣떟 泥섎━ ???ㅻ떟 ?쒓굅
            setTimeout(() => {
                element.classList.remove('wrong');
            }, 300);
        }
    }
}

// ?뺣떟??泥섎━
function playCorrectSound() {
    // 媛꾨떒???뺣떟??泥섎━ (媛꾨떒???ㅻ뵒??API ?ъ슜)
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
    // 媛꾨떒???ㅻ떟??泥섎━ (媛꾨떒???ㅻ뵒??API ?ъ슜)
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

// 寃뚯엫 醫낅즺 泥섎━
function gameComplete() {
    gameActive = false;
    stopTimer();
    
    // 寃뚯엫 ?쒖꽦???대옒???쒓굅
    document.body.classList.remove('game-active');
    
    // 醫낅즺 ?쒓컙 ?쒖떆
    finalTimeElement.textContent = timerElement.textContent;
    
    // ?ㅼ닔 ?잛닔 ?쒖떆
    const mistakesElement = document.getElementById('mistakes-count');
    if (mistakesElement) {
        mistakesElement.textContent = mistakes;
    }
    
    // ??λ맂 ?대쫫 ?쒖떆
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
        playerNameInput.value = savedName;
    }
    
    // 醫낅즺 ?쒓컙 ?쒖떆 - ?④꺼吏??붿냼 異붽?
    resultScreen.classList.remove('hidden');
    resultScreen.style.display = 'flex';
}

// ??대㉧ 泥섎━
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

// ?ш린 蹂??泥섎━ (寃뚯엫 ?쒖꽦?????ш린 蹂??臾댁떆 泥섎━)
window.addEventListener('resize', () => {
    // 寃뚯엫 ?쒖꽦?????ш린 蹂???꾧퀎媛?泥섎━
    if (gameActive) {
        // ?ш린 蹂???꾧퀎媛?泥섎━
        const widthChange = Math.abs(window.innerWidth - lastWindowWidth);
        const heightChange = Math.abs(window.innerHeight - lastWindowHeight);
        
        if (widthChange > RESIZE_THRESHOLD || heightChange > RESIZE_THRESHOLD) {
            // 寃뚯엫 蹂대뱶 ?ш린 珥덇린??
            lastWindowWidth = window.innerWidth;
            lastWindowHeight = window.innerHeight;
            
            // 寃뚯엫 蹂대뱶 珥덇린??
            clearGameBoard();
            generateNumbers();
        }
    } else {
        // 寃뚯엫 ?쒖꽦?????ш린 蹂???놁쓣 ???ш린 珥덇린??
        lastWindowWidth = window.innerWidth;
        lastWindowHeight = window.innerHeight;
    }
});

// ?곗튂 ?대깽??泥섎━ (寃뚯엫 ?쒖꽦?????곗튂 臾댁떆 泥섎━)
gameBoard.addEventListener('touchmove', function(e) {
    if (gameActive) {
        e.preventDefault();
    }
}, { passive: false });

// ===== ??궧 ?쒖뒪??泥섎━ =====

// ?먯닔 ????⑥닔
function saveScore() {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('?대쫫???낅젰?섏꽭??');
        return;
    }
    
    // ??λ맂 ?대쫫 ???
    localStorage.setItem('playerName', playerName);
    
    // ?쒖씠?꾩뿉 ?곕Ⅸ ?먯닔 ???
    const difficultyKey = getDifficultyKey();
    
    // ?덈줈???먯닔 ?앹꽦
    const newScore = {
        name: playerName,
        time: timerElement.textContent,
        timeValue: getTimeValueInMilliseconds(timerElement.textContent),
        mistakes: mistakes,
        date: new Date().toLocaleDateString(),
        difficulty: maxNumber
    };
    
    // ?쒖씠?꾩뿉 ?곕Ⅸ ?먯닔 ???
    let rankings = JSON.parse(localStorage.getItem(difficultyKey)) || [];
    
    // ?덈줈???먯닔 異붽?
    rankings.push(newScore);
    
    // ?먯닔 ?뺣젹
    rankings.sort((a, b) => a.timeValue - b.timeValue);
    
    // ?곸쐞 10媛??먯닔 ?좏깮
    rankings = rankings.slice(0, 10);
    
    // ?먯닔 ???
    localStorage.setItem(difficultyKey, JSON.stringify(rankings));
    
    // ??궧 ?붾㈃ 珥덇린??
    saveScoreButton.disabled = true;
    saveScoreButton.textContent = '??λ릺?덉뒿?덈떎!';
    
    // ??궧 ?쒖뒪???대깽??泥섎━ (??궧 ?붾㈃?먯꽌 ?먯닔 ?쒖떆)
    if (!rankingScreen.classList.contains('hidden')) {
        updateRankingDisplay();
    }
}

// ??궧 ?붾㈃ 泥섎━ ?⑥닔
function showRanking() {
    // ??궧 ?쒖뒪???먯닔 ?쒖떆
    const difficultyKey = getDifficultyKey();
    rankingDifficultySelect.value = difficultyKey.split('_')[1];
    
    // ??궧 ?쒖뒪???대깽??泥섎━
    updateRankingDisplay();
    
    // ??궧 ?붾㈃ 蹂댁씠湲?
    rankingScreen.classList.remove('hidden');
}

// ??궧 ?붾㈃?먯꽌 蹂댁씠吏 ?딄린
function hideRanking() {
    rankingScreen.classList.add('hidden');
}

// ??궧 ?쒖뒪???대깽??泥섎━
function updateRankingDisplay() {
    // ??궧 ?쒖뒪???먯닔 ?쒖떆
    const difficultyValue = rankingDifficultySelect.value;
    const difficultyKey = `rankings_${difficultyValue}`;
    
    // ?쒖씠?꾩뿉 ?곕Ⅸ ?먯닔 ???
    const rankings = JSON.parse(localStorage.getItem(difficultyKey)) || [];
    
    // ??궧 ?뚯씠釉?珥덇린??
    rankingTableBody.innerHTML = '';
    
    // ?먯닔 ?놁쓣 ??泥섎━
    if (rankings.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5">?먯닔媛 ?놁뒿?덈떎.</td>';
        rankingTableBody.appendChild(row);
        return;
    }
    
    // ??궧 ?쒖뒪???먯닔 ?쒖떆
    rankings.forEach((score, index) => {
        const row = document.createElement('tr');
        
        // ?꾩옱 ?뚮젅?댁뼱 ?뺤씤
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

// ?쒖씠?꾩뿉 ?곕Ⅸ ?먯닔 ?????諛섑솚 ?⑥닔
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

// ?쒓컙 臾몄옄?댁뿉??諛由ъ큹 媛?諛섑솚 ?⑥닔
function getTimeValueInMilliseconds(timeString) {
    const [minutes, seconds, milliseconds] = timeString.split(':').map(Number);
    return (minutes * 60 * 1000) + (seconds * 1000) + (milliseconds * 10);
} 
