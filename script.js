// 1부터 40까지의 숫자에 대한 데이터 구조
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
let mistakes = 0; // 틀린 횟수 추적
let maxNumber = 30; // 기본 난이도 (보통)

// DOM 요소들
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

// 인트로 화면 요소들
const introScreen = document.getElementById('intro-screen');
const startGameButton = document.getElementById('start-game-button');
const easyButtonIntro = document.getElementById('easy-button-intro');
const normalButtonIntro = document.getElementById('normal-button-intro');
const hardButtonIntro = document.getElementById('hard-button-intro');

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    gameBoard = document.getElementById('game-board');
    
    // 초기화 함수 호출
    initGame();
    
    // 인트로 화면 이벤트 설정
    startGameButton.addEventListener('click', startFromIntro);
    easyButtonIntro.addEventListener('click', () => setDifficultyIntro('easy'));
    normalButtonIntro.addEventListener('click', () => setDifficultyIntro('normal'));
    hardButtonIntro.addEventListener('click', () => setDifficultyIntro('hard'));
    
    // 게임 플레이 중 이벤트 설정
    startButton.addEventListener('click', startGame);
    pauseButton.addEventListener('click', pauseGame);
    resumeButton.addEventListener('click', resumeGame);
    restartButton.addEventListener('click', confirmResetGame);
    playAgainButton.addEventListener('click', resetGame);
    
    // 난이도 버튼 이벤트 설정 (게임 플레이 중)
    easyButton.addEventListener('click', () => setDifficulty('easy'));
    normalButton.addEventListener('click', () => setDifficulty('normal'));
    hardButton.addEventListener('click', () => setDifficulty('hard'));
    
    // 게임 보드에 이벤트 위임 설정
    gameBoard.addEventListener('click', handleNumberClick);
});

// 게임 초기화 함수
function initGame() {
    // 게임 기본 설정 - 관련 UI 숨기기
    hideGameElements();
    showIntroScreen();
    
    // 결과 화면 강제로 숨기기
    resultScreen.classList.add('hidden');
    resultScreen.style.display = 'none';
    
    // 게임 상태 초기화
    gameActive = false;
    gamePaused = false;
    currentTarget = 1;
    mistakes = 0;
    
    // 타이머 초기화
    resetTimer();
}

// 게임 요소 숨기기 함수
function hideGameElements() {
    gameBoard.style.visibility = 'hidden';
    document.querySelector('.game-header').style.visibility = 'hidden';
    startButton.style.display = 'none';
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    difficultyContainer.style.display = 'none';
}

// 게임 요소 표시 함수
function showGameElements() {
    gameBoard.style.visibility = 'visible';
    gameBoard.classList.remove('hidden');
    document.querySelector('.game-header').style.visibility = 'visible';
    startButton.style.display = 'inline-block';
    difficultyContainer.style.display = 'block';
    difficultyContainer.classList.remove('hidden');
}

// 인트로 화면 표시 함수
function showIntroScreen() {
    introScreen.classList.remove('hidden');
}

// 인트로 화면 숨기기 함수
function hideIntroScreen() {
    introScreen.classList.add('hidden');
}

// 인트로 화면에서 난이도 설정
function setDifficultyIntro(level) {
    // 모든 난이도 버튼에서 active 클래스 제거
    easyButtonIntro.classList.remove('active');
    normalButtonIntro.classList.remove('active');
    hardButtonIntro.classList.remove('active');
    
    // 선택한 난이도에 따라 maxNumber 설정 및 버튼 활성화
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
    
    // 게임 화면의 난이도 버튼도 동기화
    syncDifficultyButtons(level);
}

// 게임 화면의 난이도 버튼 동기화
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

// 인트로에서 게임 시작
function startFromIntro() {
    hideIntroScreen();
    
    // 게임 보드 요소 확실히 표시
    gameBoard.classList.remove('hidden');
    gameBoard.style.visibility = 'visible';
    gameBoard.style.display = 'block';
    
    showGameElements();
    
    // 약간 지연시켜 UI가 업데이트된 후 게임 시작
    setTimeout(() => {
        startGame();
    }, 100);
}

// 난이도 설정 함수
function setDifficulty(level) {
    // 모든 난이도 버튼에서 active 클래스 제거
    easyButton.classList.remove('active');
    normalButton.classList.remove('active');
    hardButton.classList.remove('active');
    
    // 선택한 난이도에 따라 maxNumber 설정 및 버튼 활성화
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
    gameActive = true;
    gamePaused = false;
    currentTarget = 1;
    mistakes = 0; // 실수 카운터 초기화
    totalPausedTime = 0;
    currentNumberElement.textContent = currentTarget;
    
    // 게임 보드가 확실히 표시되도록 함
    gameBoard.classList.remove('hidden');
    gameBoard.style.visibility = 'visible';
    gameBoard.style.display = 'block';
    
    // 시작/중지 버튼 상태 변경
    startButton.classList.add('hidden');
    difficultyContainer.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    
    // 타이머 초기화 및 시작
    resetTimer();
    startTimer();
    
    // 게임 보드 초기화 및 숫자 생성
    clearGameBoard();
    generateNumbers();
}

// 게임 일시정지 함수
function pauseGame() {
    if (!gameActive || gamePaused) return;
    
    gamePaused = true;
    pauseStartTime = new Date();
    stopTimer();
    
    // 버튼 상태 변경
    pauseButton.classList.add('hidden');
    resumeButton.classList.remove('hidden');
    
    // 게임 보드에 일시정지 오버레이 추가
    const pauseOverlay = document.createElement('div');
    pauseOverlay.className = 'pause-overlay';
    pauseOverlay.innerHTML = '<div class="pause-message">일시정지됨</div>';
    gameBoard.appendChild(pauseOverlay);
}

// 게임 재개 함수
function resumeGame() {
    if (!gameActive || !gamePaused) return;
    
    // 일시정지된 시간 계산
    const now = new Date();
    totalPausedTime += now - pauseStartTime;
    
    gamePaused = false;
    
    // 버튼 상태 변경
    resumeButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    
    // 일시정지 오버레이 제거
    const pauseOverlay = document.querySelector('.pause-overlay');
    if (pauseOverlay) {
        pauseOverlay.remove();
    }
    
    // 타이머 재시작
    startTimer();
}

// 게임 재설정 확인 함수
function confirmResetGame() {
    if (confirm('정말로 게임을 포기하시겠습니까?')) {
        resetGame();
    }
}

// 게임 재설정 함수
function resetGame() {
    stopTimer();
    resultScreen.classList.add('hidden');
    gameActive = false;
    gamePaused = false;
    currentTarget = 1;
    currentNumberElement.textContent = currentTarget;
    
    // 버튼 상태 변경
    pauseButton.classList.add('hidden');
    resumeButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    difficultyContainer.classList.remove('hidden');
    
    // 게임 보드 초기화
    clearGameBoard();
}

// 게임 보드 초기화 함수
function clearGameBoard() {
    gameBoard.innerHTML = '';
    numberElements = [];
}

// 숫자 생성 및 그리드 배치 함수
function generateNumbers() {
    const boardRect = gameBoard.getBoundingClientRect();
    const boardWidth = boardRect.width;
    const boardHeight = boardRect.height;
    
    console.log("게임 보드 크기:", boardWidth, "x", boardHeight);
    
    // 게임 보드가 너무 작으면 조정
    if (boardWidth < 100 || boardHeight < 100) {
        gameBoard.style.minHeight = "60vh";
        gameBoard.style.height = "60vh";
        gameBoard.getBoundingClientRect();
    }
    
    // 그리드 크기 계산 (난이도별 최적화)
    const numElements = maxNumber;
    let gridSize;
    
    // 난이도별 그리드 크기 최적화
    if (numElements <= 20) { // 쉬움
        gridSize = 5; // 5x5 그리드 (20개 요소에 최적)
    } else if (numElements <= 30) { // 보통
        gridSize = 6; // 6x6 그리드 (30개 요소에 최적)
    } else { // 어려움
        gridSize = 7; // 7x7 그리드 (40개 요소에 최적)
    }
    
    console.log("그리드 크기:", gridSize, "x", gridSize);
    
    // 모바일 기기인지 확인
    const isMobile = window.innerWidth <= 480;
    
    // 요소 크기 계산 (여백 포함)
    const cellSize = Math.min(
        Math.floor(boardWidth / gridSize) * 0.95,
        Math.floor(boardHeight / gridSize) * 0.95
    );
    
    // 요소 실제 크기 (모바일에서는 더 작게)
    const elementSize = isMobile ? 
        Math.floor(cellSize * 0.75) : 
        Math.floor(cellSize * 0.85);
    const margin = Math.floor((cellSize - elementSize) / 2);
    
    // 그리드 시작 위치 계산 (중앙 정렬)
    const startX = Math.floor((boardWidth - cellSize * gridSize) / 2) + margin;
    const startY = Math.floor((boardHeight - cellSize * gridSize) / 2) + margin;
    
    console.log("셀 크기:", cellSize, "요소 크기:", elementSize, "여백:", margin);
    
    // 숫자 데이터 범위 추출 및 셔플
    const shuffledNumbers = shuffleArray(numbersData.slice(0, maxNumber));
    
    // 그리드에 요소 배치
    shuffledNumbers.forEach((numberData, index) => {
        // 행과 열 위치 계산
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        
        // 랜덤하게 숫자 표현 형식 선택 (아라비아, 영어, 한국어)
        const formatIndex = Math.floor(Math.random() * 3);
        const format = numberData.formats[formatIndex];
        
        // 숫자 요소 생성
        const element = document.createElement('div');
        element.className = 'number-item';
        element.dataset.value = numberData.value;
        element.textContent = format;
        
        // 형식에 따른 스타일 클래스 추가
        if (formatIndex === 0) element.classList.add('number-arabic');
        else if (formatIndex === 1) element.classList.add('number-english');
        else element.classList.add('number-korean');
        
        // 숫자 크기에 따른 스타일 클래스 추가
        if (numberData.value <= 9) element.classList.add('small-number');
        else if (numberData.value <= 19) element.classList.add('medium-number');
        else element.classList.add('large-number');
        
        // 모바일 화면에서는 폰트 크기 조정
        if (isMobile) {
            element.classList.add('mobile-item');
        }
        
        // 요소 크기 및 위치 설정
        element.style.width = `${elementSize}px`;
        element.style.height = `${elementSize}px`;
        element.style.left = `${startX + col * cellSize}px`;
        element.style.top = `${startY + row * cellSize}px`;
        
        // 게임 보드에 요소 추가
        gameBoard.appendChild(element);
        numberElements.push(element);
        
        console.log(`숫자 ${numberData.value} (${format}) 생성: 위치 (${row}, ${col})`);
    });
}

// 배열을 무작위로 섞는 함수
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 숫자 클릭 처리 함수
function handleNumberClick(event) {
    if (!gameActive || gamePaused) return;
    
    const element = event.target;
    
    // 숫자 요소인지 확인
    if (element.classList.contains('number-item')) {
        const value = parseInt(element.dataset.value);
        
        // 현재 목표 숫자와 일치하는지 확인
        if (value === currentTarget) {
            // 시각적 피드백
            element.classList.add('correct');
            playCorrectSound();
            
            // 다음 목표 숫자로 업데이트
            currentTarget++;
            currentNumberElement.textContent = currentTarget;
            
            // 모든 숫자를 찾았는지 확인
            if (currentTarget > maxNumber) {
                gameComplete();
            }
        } else {
            // 틀린 경우 시각적 피드백
            mistakes++;
            element.classList.add('wrong');
            playWrongSound();
            
            // 잠시 후 시각적 피드백 제거
            setTimeout(() => {
                element.classList.remove('wrong');
            }, 300);
        }
    }
}

// 효과음 재생 함수
function playCorrectSound() {
    // 간단한 효과음 재생 (웹 오디오 API 사용)
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
    // 간단한 효과음 재생 (웹 오디오 API 사용)
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

// 게임 완료 함수
function gameComplete() {
    gameActive = false;
    stopTimer();
    
    // 결과 화면 표시
    finalTimeElement.textContent = timerElement.textContent;
    
    // 틀린 횟수 표시 요소 추가
    const mistakesElement = document.getElementById('mistakes-count');
    if (mistakesElement) {
        mistakesElement.textContent = mistakes;
    }
    
    // 결과 화면 표시 - 모든 hidden 속성 제거
    resultScreen.classList.remove('hidden');
    resultScreen.style.display = 'flex';
}

// 타이머 관련 함수들
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

// 화면 크기 변경 시 요소 재배치
window.addEventListener('resize', () => {
    if (gameActive) {
        clearGameBoard();
        generateNumbers();
    }
}); 