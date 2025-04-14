// 1�??�� 40까�???�� ?��?��?�� ????�� ?��?��?�� 구�"
const numbersData = [
    { value: 1, formats: ['1', 'one', '?��'] },
    { value: 2, formats: ['2', 'two', '?��'] },
    { value: 3, formats: ['3', 'three', '?��'] },
    { value: 4, formats: ['4', 'four', '?��'] },
    { value: 5, formats: ['5', 'five', '?��'] },
    { value: 6, formats: ['6', 'six', '?��'] },
    { value: 7, formats: ['7', 'seven', '�?'] },
    { value: 8, formats: ['8', 'eight', '?��'] },
    { value: 9, formats: ['9', 'nine', '�?'] },
    { value: 10, formats: ['10', 'ten', '?��'] },
    { value: 11, formats: ['11', 'eleven', '?��?��'] },
    { value: 12, formats: ['12', 'twelve', '?��?��'] },
    { value: 13, formats: ['13', 'thirteen', '?��?��'] },
    { value: 14, formats: ['14', 'fourteen', '?��?��'] },
    { value: 15, formats: ['15', 'fifteen', '?��?��'] },
    { value: 16, formats: ['16', 'sixteen', '?��?��'] },
    { value: 17, formats: ['17', 'seventeen', '?���?'] },
    { value: 18, formats: ['18', 'eighteen', '?��?��'] },
    { value: 19, formats: ['19', 'nineteen', '?���?'] },
    { value: 20, formats: ['20', 'twenty', '?��?��'] },
    { value: 21, formats: ['21', 'twenty-one', '?��?��?��'] },
    { value: 22, formats: ['22', 'twenty-two', '?��?��?��'] },
    { value: 23, formats: ['23', 'twenty-three', '?��?��?��'] },
    { value: 24, formats: ['24', 'twenty-four', '?��?��?��'] },
    { value: 25, formats: ['25', 'twenty-five', '?��?��?��'] },
    { value: 26, formats: ['26', 'twenty-six', '?��?��?��'] },
    { value: 27, formats: ['27', 'twenty-seven', '?��?���?'] },
    { value: 28, formats: ['28', 'twenty-eight', '?��?��?��'] },
    { value: 29, formats: ['29', 'twenty-nine', '?��?���?'] },
    { value: 30, formats: ['30', 'thirty', '?��?��'] },
    { value: 31, formats: ['31', 'thirty-one', '?��?��?��'] },
    { value: 32, formats: ['32', 'thirty-two', '?��?��?��'] },
    { value: 33, formats: ['33', 'thirty-three', '?��?��?��'] },
    { value: 34, formats: ['34', 'thirty-four', '?��?��?��'] },
    { value: 35, formats: ['35', 'thirty-five', '?��?��?��'] },
    { value: 36, formats: ['36', 'thirty-six', '?��?��?��'] },
    { value: 37, formats: ['37', 'thirty-seven', '?��?���?'] },
    { value: 38, formats: ['38', 'thirty-eight', '?��?��?��'] },
    { value: 39, formats: ['39', 'thirty-nine', '?��?���?'] },
    { value: 40, formats: ['40', 'forty', '?��?��'] }
];

// 게임 ?��?�� �??��
let gameActive = false;
let gamePaused = false;
let currentTarget = 1;
let startTime;
let pauseStartTime;
let totalPausedTime = 0;
let timerInterval;
let gameBoard;
let numberElements = [];
let mistakes = 0; // ???�? ?��?�� 추적
let maxNumber = 30; // 기본 ?��?��?�� (보통)

// DOM ?��?��?��
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

// ��ŷ �ý��� ��ҵ�
const playerNameInput = document.getElementById('player-name');
const saveScoreButton = document.getElementById('save-score-button');
const showRankingButton = document.getElementById('show-ranking-button');
const rankingScreen = document.getElementById('ranking-screen');
const rankingTableBody = document.getElementById('ranking-table-body');
const closeRankingButton = document.getElementById('close-ranking-button');
const rankingDifficultySelect = document.getElementById('ranking-difficulty');

// ����� ���? ?��?��?��
const introScreen = document.getElementById('intro-screen');
const startGameButton = document.getElementById('start-game-button');
const easyButtonIntro = document.getElementById('easy-button-intro');
const normalButtonIntro = document.getElementById('normal-button-intro');
const hardButtonIntro = document.getElementById('hard-button-intro');

// ������ ������ ũ�� ����
let lastWindowWidth = window.innerWidth;
let lastWindowHeight = window.innerHeight;
const RESIZE_THRESHOLD = 50; // ũ�� ��ȭ ���� �Ӱ谪 (px)

// ?��벤트 리스?�� ?��?��
document.addEventListener('DOMContentLoaded', () => {
    gameBoard = document.getElementById('game-board');
    
    // 초기?�� ?��?�� ?���?
    initGame();
    
    // ?��?���? ?���? ?��벤트 ?��?��
    startGameButton.addEventListener('click', startFromIntro);
    easyButtonIntro.addEventListener('click', () => setDifficultyIntro('easy'));
    normalButtonIntro.addEventListener('click', () => setDifficultyIntro('normal'));
    hardButtonIntro.addEventListener('click', () => setDifficultyIntro('hard'));
    
    // 게임 ?��?��?�� �? ?��벤트 ?��?��
    startButton.addEventListener('click', startGame);
    pauseButton.addEventListener('click', pauseGame);
    resumeButton.addEventListener('click', resumeGame);
    restartButton.addEventListener('click', confirmResetGame);
    playAgainButton.addEventListener('click', resetGame);
    
    // ?��?��?�� 버튼 ?��벤트 ?��?�� (게임 ?��?��?�� �?)
    easyButton.addEventListener('click', () => setDifficulty('easy'));
    normalButton.addEventListener('click', () => setDifficulty('normal'));
    hardButton.addEventListener('click', () => setDifficulty('hard'));
    
    // ��ŷ �ý��� �̺�Ʈ ����
    saveScoreButton.addEventListener('click', saveScore);
    showRankingButton.addEventListener('click', showRanking);
    closeRankingButton.addEventListener('click', hideRanking);
    rankingDifficultySelect.addEventListener('change', updateRankingDisplay);
    
    // 게임 보드�� ?��벤트 ?��?�� ?��?��
    gameBoard.addEventListener('click', handleNumberClick);
});

// 게임 초기?�� ?��?��
function initGame() {
    // 게임 기본 ?��?�� - �??�� UI ?��기기
    hideGameElements();
    showIntroScreen();
    
    // 결과 ?���? 강제�? ?��기기
    resultScreen.classList.add('hidden');
    resultScreen.style.display = 'none';
    
    // 게임 ?��?�� 초기?��
    gameActive = false;
    gamePaused = false;
    currentTarget = 1;
    mistakes = 0;
    
    // ????���? 초기?��
    resetTimer();
}

// 게임 ?��?�� ?��기기 ?��?��
function hideGameElements() {
    gameBoard.style.visibility = 'hidden';
    document.querySelector('.game-header').style.visibility = 'hidden';
    startButton.style.display = 'none';
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    difficultyContainer.style.display = 'none';
}

// 게임 ?��?�� ?��?�� ?��?��
function showGameElements() {
    gameBoard.style.visibility = 'visible';
    gameBoard.classList.remove('hidden');
    document.querySelector('.game-header').style.visibility = 'visible';
    startButton.style.display = 'inline-block';
    difficultyContainer.style.display = 'block';
    difficultyContainer.classList.remove('hidden');
}

// ?��?���? ?���? ?��?�� ?��?��
function showIntroScreen() {
    introScreen.classList.remove('hidden');
}

// ?��?���? ?���? ?��기기 ?��?��
function hideIntroScreen() {
    introScreen.classList.add('hidden');
}

// ?��?���? ?��면에?�� ?��?��?�� ?��?��
function setDifficultyIntro(level) {
    // 모든 ?��?��?�� 버튼?��?�� active ?��?��?�� ?���?
    easyButtonIntro.classList.remove('active');
    normalButtonIntro.classList.remove('active');
    hardButtonIntro.classList.remove('active');
    
    // ?��?��?�� ?��?��?��?�� ?��?�� maxNumber ?��?�� �? 버튼 ?��?��?��
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
    
    // 게임 ?��면의 ?��?��?�� 버튼?�� ?��기화
    syncDifficultyButtons(level);
}

// 게임 ?��면의 ?��?��?�� 버튼 ?��기화
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

// ?��?��로에?�� 게임 ?��?��
function startFromIntro() {
    hideIntroScreen();
    
    // 게임 보드 ?��?�� ?��?��?�� ?��?��
    gameBoard.classList.remove('hidden');
    gameBoard.style.visibility = 'visible';
    gameBoard.style.display = 'block';
    
    showGameElements();
    
    // ?���? �??��?���? UI�? ?��?��?��?��?�� ?�� 게임 ?��?��
    setTimeout(() => {
        startGame();
    }, 100);
}

// ?��?��?�� ?��?�� ?��?��
function setDifficulty(level) {
    // 모든 ?��?��?�� 버튼?��?�� active ?��?��?�� ?���?
    easyButton.classList.remove('active');
    normalButton.classList.remove('active');
    hardButton.classList.remove('active');
    
    // ?��?��?�� ?��?��?��?�� ?��?�� maxNumber ?��?�� �? 버튼 ?��?��?��
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

// 게임 ?��?�� ?��?��
function startGame() {
    gameActive = true;
    gamePaused = false;
    currentTarget = 1;
    mistakes = 0; // �Ǽ� ī���� �ʱ�ȭ
    totalPausedTime = 0;
    currentNumberElement.textContent = currentTarget;
    
    // ����Ͽ��� ��ũ�� ����
    document.body.classList.add('game-active');
    
    // ���� ���尡 Ȯ���� ǥ�õǵ��� ��
    gameBoard.classList.remove('hidden');
    gameBoard.style.visibility = 'visible';
    gameBoard.style.display = 'block';
    
    // ����/���� ��ư ���� ����
    startButton.classList.add('hidden');
    difficultyContainer.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    
    // Ÿ�̸� �ʱ�ȭ �� ����
    resetTimer();
    startTimer();
    
    // ���� ���� �ʱ�ȭ �� ���� ����
    clearGameBoard();
    generateNumbers();
    
    // ���� ũ�� ����
    lastWindowWidth = window.innerWidth;
    lastWindowHeight = window.innerHeight;
}

// 게임 ?��?��?���? ?��?��
function pauseGame() {
    if (!gameActive || gamePaused) return;
    
    gamePaused = true;
    pauseStartTime = new Date();
    stopTimer();
    
    // 버튼 ?��?�� �?�?
    pauseButton.classList.add('hidden');
    resumeButton.classList.remove('hidden');
    
    // 게임 보드?�� ?��?��?���? ?��버레?�� 추�??
    const pauseOverlay = document.createElement('div');
    pauseOverlay.className = 'pause-overlay';
    pauseOverlay.innerHTML = '<div class="pause-message">?��?��?���??��</div>';
    gameBoard.appendChild(pauseOverlay);
}

// 게임 ?���? ?��?��
function resumeGame() {
    if (!gameActive || !gamePaused) return;
    
    // ?��?��?���??�� ?���? 계산
    const now = new Date();
    totalPausedTime += now - pauseStartTime;
    
    gamePaused = false;
    
    // 버튼 ?��?�� �?�?
    resumeButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    
    // ?��?��?���? ?��버레?�� ?���?
    const pauseOverlay = document.querySelector('.pause-overlay');
    if (pauseOverlay) {
        pauseOverlay.remove();
    }
    
    // ????���? ?��?��?��
    startTimer();
}

// 게임 ?��?��?�� ?��?�� ?��?��
function confirmResetGame() {
    if (confirm('?��말로 게임?�� ?��기하?��겠습?���??')) {
        resetGame();
    }
}

// ���� �缳�� �Լ�
function resetGame() {
    stopTimer();
    resultScreen.classList.add('hidden');
    gameActive = false;
    gamePaused = false;
    currentTarget = 1;
    currentNumberElement.textContent = currentTarget;
    
    // ��ũ�� ���� ����
    document.body.classList.remove('game-active');
    
    // ��ư ���� ����
    pauseButton.classList.add('hidden');
    resumeButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    difficultyContainer.classList.remove('hidden');
    
    // ��ŷ ���� ��� �ʱ�ȭ
    saveScoreButton.disabled = false;
    saveScoreButton.textContent = '��� ����';
    rankingScreen.classList.add('hidden');
    
    // ���� ���� �ʱ�ȭ
    clearGameBoard();
}

// 게임 보드 초기?�� ?��?��
function clearGameBoard() {
    gameBoard.innerHTML = '';
    numberElements = [];
}

// ?��?�� ?��?�� �? 그리?�� 배치 ?��?��
function generateNumbers() {
    const boardRect = gameBoard.getBoundingClientRect();
    const boardWidth = boardRect.width;
    const boardHeight = boardRect.height;
    
    console.log("게임 보드 ?���?:", boardWidth, "x", boardHeight);
    
    // 게임 보드�? ?���? ?��?���? 조정
    if (boardWidth < 100 || boardHeight < 100) {
        gameBoard.style.minHeight = "60vh";
        gameBoard.style.height = "60vh";
        gameBoard.getBoundingClientRect();
    }
    
    // 그리?�� ?���? 계산 (?��?��?���? 최적?��)
    const numElements = maxNumber;
    let gridSize;
    
    // ?��?��?���? 그리?�� ?���? 최적?��
    if (numElements <= 20) { // ?��???
        gridSize = 5; // 5x5 그리?�� (20�? ?��?��?�� 최적)
    } else if (numElements <= 30) { // 보통
        gridSize = 6; // 6x6 그리?�� (30�? ?��?��?�� 최적)
    } else { // ?��?��???
        gridSize = 7; // 7x7 그리?�� (40�? ?��?��?�� 최적)
    }
    
    console.log("그리?�� ?���?:", gridSize, "x", gridSize);
    
    // 모바?�� 기기?���? ?��?��
    const isMobile = window.innerWidth <= 480;
    
    // ?��?�� ?���? 계산 (?���? ?��?��)
    const cellSize = Math.min(
        Math.floor(boardWidth / gridSize) * 0.95,
        Math.floor(boardHeight / gridSize) * 0.95
    );
    
    // ?��?�� ?��?�� ?���? (모바?��?��?��?�� ?�� ?���?)
    const elementSize = isMobile ? 
        Math.floor(cellSize * 0.75) : 
        Math.floor(cellSize * 0.85);
    const margin = Math.floor((cellSize - elementSize) / 2);
    
    // 그리?�� ?��?�� ?���? 계산 (중앙 ?��?��)
    const startX = Math.floor((boardWidth - cellSize * gridSize) / 2) + margin;
    const startY = Math.floor((boardHeight - cellSize * gridSize) / 2) + margin;
    
    console.log("??? ?���?:", cellSize, "?��?�� ?���?:", elementSize, "?���?:", margin);
    
    // ?��?�� ?��?��?�� 범위 추출 �? ?��?��
    const shuffledNumbers = shuffleArray(numbersData.slice(0, maxNumber));
    
    // 그리?��?�� ?��?�� 배치
    shuffledNumbers.forEach((numberData, index) => {
        // ?���? ?�� ?���? 계산
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        
        // ?��?��?���? ?��?�� ?��?�� ?��?�� ?��?�� (?��?��비아, ?��?��, ?���??��)
        const formatIndex = Math.floor(Math.random() * 3);
        const format = numberData.formats[formatIndex];
        
        // ?��?�� ?��?�� ?��?��
        const element = document.createElement('div');
        element.className = 'number-item';
        element.dataset.value = numberData.value;
        element.textContent = format;
        
        // ?��?��?�� ?���? ?��????�� ?��?��?�� 추�??
        if (formatIndex === 0) element.classList.add('number-arabic');
        else if (formatIndex === 1) element.classList.add('number-english');
        else element.classList.add('number-korean');
        
        // ?��?�� ?��기에 ?���? ?��????�� ?��?��?�� 추�??
        if (numberData.value <= 9) element.classList.add('small-number');
        else if (numberData.value <= 19) element.classList.add('medium-number');
        else element.classList.add('large-number');
        
        // 모바?�� ?��면에?��?�� ?��?�� ?���? 조정
        if (isMobile) {
            element.classList.add('mobile-item');
        }
        
        // ?��?�� ?���? �? ?���? ?��?��
        element.style.width = `${elementSize}px`;
        element.style.height = `${elementSize}px`;
        element.style.left = `${startX + col * cellSize}px`;
        element.style.top = `${startY + row * cellSize}px`;
        
        // 게임 보드?�� ?��?�� 추�??
        gameBoard.appendChild(element);
        numberElements.push(element);
        
        console.log(`?��?�� ${numberData.value} (${format}) ?��?��: ?���? (${row}, ${col})`);
    });
}

// 배열?�� 무작?���? ?��?�� ?��?��
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ?��?�� ?���? 처리 ?��?��
function handleNumberClick(event) {
    if (!gameActive || gamePaused) return;
    
    const element = event.target;
    
    // ?��?�� ?��?��?���? ?��?��
    if (element.classList.contains('number-item')) {
        const value = parseInt(element.dataset.value);
        
        // ?��?�� 목표 ?��?��??? ?��치하?���? ?��?��
        if (value === currentTarget) {
            // ?��각적 ?��?���?
            element.classList.add('correct');
            playCorrectSound();
            
            // ?��?�� 목표 ?��?���? ?��?��?��?��
            currentTarget++;
            currentNumberElement.textContent = currentTarget;
            
            // 모든 ?��?���? 찾았?���? ?��?��
            if (currentTarget > maxNumber) {
                gameComplete();
            }
        } else {
            // ???�? 경우 ?��각적 ?��?���?
            mistakes++;
            element.classList.add('wrong');
            playWrongSound();
            
            // ?��?�� ?�� ?��각적 ?��?���? ?���?
            setTimeout(() => {
                element.classList.remove('wrong');
            }, 300);
        }
    }
}

// ?��과음 ?��?�� ?��?��
function playCorrectSound() {
    // 간단?�� ?��과음 ?��?�� (?�� ?��?��?�� API ?��?��)
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
    // 간단?�� ?��과음 ?��?�� (?�� ?��?��?�� API ?��?��)
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

// 게임 ?���? ?��?��
function gameComplete() {
    gameActive = false;
    stopTimer();
    
    // ��ũ�� ���� ����
    document.body.classList.remove('game-active');
    
    // ��� ȭ�� ǥ��
    finalTimeElement.textContent = timerElement.textContent;
    
    // Ʋ�� Ƚ�� ǥ�� ��� �߰�
    const mistakesElement = document.getElementById('mistakes-count');
    if (mistakesElement) {
        mistakesElement.textContent = mistakes;
    }
    
    // ������ ����� �̸��� ������ ǥ��
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
        playerNameInput.value = savedName;
    }
    
    // ��� ȭ�� ǥ�� - ��� hidden �Ӽ� ����
    resultScreen.classList.remove('hidden');
    resultScreen.style.display = 'flex';
}

// ????���? �??�� ?��?��?��
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

// ȭ�� ũ�� ���� �� ��� ���ġ
window.addEventListener('resize', () => {
    // ������ Ȱ��ȭ�Ǿ� ���� ���� ó��
    if (gameActive) {
        // ũ�� ��ȭ�� �Ӱ谪 �̻��� ���� ���ġ
        const widthChange = Math.abs(window.innerWidth - lastWindowWidth);
        const heightChange = Math.abs(window.innerHeight - lastWindowHeight);
        
        if (widthChange > RESIZE_THRESHOLD || heightChange > RESIZE_THRESHOLD) {
            // ���� ũ�� ����
            lastWindowWidth = window.innerWidth;
            lastWindowHeight = window.innerHeight;
            
            // ���� ���� �����
            clearGameBoard();
            generateNumbers();
        }
    } else {
        // ������ Ȱ��ȭ���� ���� ��� ���� ũ�� ����
        lastWindowWidth = window.innerWidth;
        lastWindowHeight = window.innerHeight;
    }
});

// ��ġ �̺�Ʈ ó�� (����Ͽ��� ��ũ�� ����)
gameBoard.addEventListener('touchmove', function(e) {
    if (gameActive) {
        e.preventDefault();
    }
}, { passive: false });

// ===== ��ŷ �ý��� ��� =====

// ���� ���� �Լ�
function saveScore() {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('�̸��� �Է����ּ���!');
        return;
    }
    
    // �÷��̾� �̸� ����
    localStorage.setItem('playerName', playerName);
    
    // ���̵��� ��ŷ Ű
    const difficultyKey = getDifficultyKey();
    
    // ���ο� ���� ������
    const newScore = {
        name: playerName,
        time: timerElement.textContent,
        timeValue: getTimeValueInMilliseconds(timerElement.textContent),
        mistakes: mistakes,
        date: new Date().toLocaleDateString(),
        difficulty: maxNumber
    };
    
    // ���� ��ŷ ������ ��������
    let rankings = JSON.parse(localStorage.getItem(difficultyKey)) || [];
    
    // �� ���� �߰�
    rankings.push(newScore);
    
    // �ð� �������� ���� (��������)
    rankings.sort((a, b) => a.timeValue - b.timeValue);
    
    // ���� 10���� ����
    rankings = rankings.slice(0, 10);
    
    // ����
    localStorage.setItem(difficultyKey, JSON.stringify(rankings));
    
    // ���� ��ư ��Ȱ��ȭ �� �޽��� ǥ��
    saveScoreButton.disabled = true;
    saveScoreButton.textContent = '�����!';
    
    // ��ŷ ǥ�� ������Ʈ (�̹� ��ŷ ȭ���� ǥ�õǾ� ���� ���)
    if (!rankingScreen.classList.contains('hidden')) {
        updateRankingDisplay();
    }
}

// ��ŷ ȭ�� ǥ�� �Լ�
function showRanking() {
    // ���� ���̵��� �´� �ɼ� ����
    const difficultyKey = getDifficultyKey();
    rankingDifficultySelect.value = difficultyKey.split('_')[1];
    
    // ��ŷ ���̺� ������Ʈ
    updateRankingDisplay();
    
    // ��ŷ ȭ�� ǥ��
    rankingScreen.classList.remove('hidden');
}

// ��ŷ ȭ�� ����� �Լ�
function hideRanking() {
    rankingScreen.classList.add('hidden');
}

// ��ŷ ǥ�� ������Ʈ �Լ�
function updateRankingDisplay() {
    // ���� ���õ� ���̵��� ���� Ű ��������
    const difficultyValue = rankingDifficultySelect.value;
    const difficultyKey = `rankings_${difficultyValue}`;
    
    // ��ŷ ������ ��������
    const rankings = JSON.parse(localStorage.getItem(difficultyKey)) || [];
    
    // ���̺� �ʱ�ȭ
    rankingTableBody.innerHTML = '';
    
    // �����Ͱ� ���� ���
    if (rankings.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5">����� �����ϴ�.</td>';
        rankingTableBody.appendChild(row);
        return;
    }
    
    // ��ŷ ������ ǥ��
    rankings.forEach((score, index) => {
        const row = document.createElement('tr');
        
        // ���� �÷��̾� ����
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

// ���̵��� ���� ��ŷ Ű ��ȯ �Լ�
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

// �ð� ���ڿ��� �и��ʷ� ��ȯ�ϴ� �Լ�
function getTimeValueInMilliseconds(timeString) {
    const [minutes, seconds, milliseconds] = timeString.split(':').map(Number);
    return (minutes * 60 * 1000) + (seconds * 1000) + (milliseconds * 10);
} 