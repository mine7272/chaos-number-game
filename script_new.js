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

// 랭킹 시스템 관련 변수
let isOnlineRankingEnabled = true; // 온라인 랭킹 기능 활성화 여부
let currentRankingMode = 'online'; // online 또는 local

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

// 랭킹 시스템 요소들
const playerNameInput = document.getElementById('player-name');
const saveScoreButton = document.getElementById('save-score-button');
const showRankingButton = document.getElementById('show-ranking-button');
const rankingScreen = document.getElementById('ranking-screen');
const rankingTableBody = document.getElementById('ranking-table-body');
const closeRankingButton = document.getElementById('close-ranking-button');
const rankingDifficultySelect = document.getElementById('ranking-difficulty');

// 인트로 화면 요소들
const introScreen = document.getElementById('intro-screen');
const startGameButton = document.getElementById('start-game-button');
const easyButtonIntro = document.getElementById('easy-button-intro');
const normalButtonIntro = document.getElementById('normal-button-intro');
const hardButtonIntro = document.getElementById('hard-button-intro');

// 마지막 윈도우 크기 저장
let lastWindowWidth = window.innerWidth;
let lastWindowHeight = window.innerHeight;
const RESIZE_THRESHOLD = 50; // 크기 변경 무시 임계값(px)

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    gameBoard = document.getElementById('game-board');
    
    // 초기화 함수 호출
    initGame();
    
    // 기본 난이도를 '쉬움'으로 설정
    setDifficultyIntro('easy');
    setDifficulty('easy'); // 게임 화면에서도 '쉬움' 난이도로 설정
    
    // 인트로 화면 이벤트 설정
    startGameButton.addEventListener('click', startFromIntro);
    easyButtonIntro.addEventListener('click', () => setDifficultyIntro('easy'));
    normalButtonIntro.addEventListener('click', () => setDifficultyIntro('normal'));
    hardButtonIntro.addEventListener('click', () => setDifficultyIntro('hard'));
    
    // 게임 컨트롤 버튼 이벤트 설정
    startButton.addEventListener('click', startGame);
    pauseButton.addEventListener('click', pauseGame);
    resumeButton.addEventListener('click', resumeGame);
    restartButton.addEventListener('click', confirmResetGame);
    playAgainButton.addEventListener('click', resetGame);
    
    // 난이도 버튼 이벤트 설정 (게임 화면에서)
    easyButton.addEventListener('click', () => setDifficulty('easy'));
    normalButton.addEventListener('click', () => setDifficulty('normal'));
    hardButton.addEventListener('click', () => setDifficulty('hard'));
    
    // 랭킹 시스템 이벤트 설정
    saveScoreButton.addEventListener('click', saveScore);
    showRankingButton.addEventListener('click', showRanking);
    closeRankingButton.addEventListener('click', hideRanking);
    rankingDifficultySelect.addEventListener('change', updateRankingDisplay);
    
    // 게임 보드에 이벤트 다임 설정
    gameBoard.addEventListener('click', handleNumberClick);
});

// 게임 초기화 함수
function initGame() {
    // 게임 기본 설정 - 기본 UI 설정
    hideGameElements();
    showIntroScreen();
    
    // 결과 화면 강제 초기화
    resultScreen.classList.add('hidden');
    resultScreen.style.display = 'none';
    
    // 게임 상태 초기화
    gameActive = false;
    gamePaused = false;
    currentTarget = 1;
    mistakes = 0;
    
    // 기본 난이도를 '쉬움'으로 설정
    maxNumber = 20;
    
    // 타이머 초기화
    resetTimer();
}

// 게임 화면에서 보이지 않는 요소들
function hideGameElements() {
    gameBoard.style.visibility = 'hidden';
    document.querySelector('.game-header').style.visibility = 'hidden';
    startButton.style.display = 'none';
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    difficultyContainer.style.display = 'none';
}

// 게임 화면에서 보이는 요소들
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

// 인트로 화면에서 난이도 선택 처리
function setDifficultyIntro(level) {
    // 모든 난이도 버튼 비활성화
    easyButtonIntro.classList.remove('active');
    normalButtonIntro.classList.remove('active');
    hardButtonIntro.classList.remove('active');
    
    // 선택된 난이도에 따라 maxNumber 설정 및 활성화 버튼 설정
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
    
    // 게임 화면의 난이도 버튼 설정
    syncDifficultyButtons(level);
}

// 게임 화면의 난이도 버튼 설정
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

// 인트로 화면에서 게임 시작
function startFromIntro() {
    hideIntroScreen();
    
    // 게임 보드에서 보이지 않는 요소들 제거
    gameBoard.classList.remove('hidden');
    gameBoard.style.visibility = 'visible';
    gameBoard.style.display = 'block';
    
    showGameElements();
    
    // 빠른 게임 시작을 위한 임시 처리
    setTimeout(() => {
        startGame();
    }, 100);
}

// 난이도 설정 처리
function setDifficulty(level) {
    // 모든 난이도 버튼 비활성화
    easyButton.classList.remove('active');
    normalButton.classList.remove('active');
    hardButton.classList.remove('active');
    
    // 선택된 난이도에 따라 maxNumber 설정 및 활성화 버튼 설정
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

// 게임 일시정지 처리
function pauseGame() {
    if (!gameActive || gamePaused) return;
    
    gamePaused = true;
    pauseStartTime = new Date();
    stopTimer();
    
    // 버튼 비활성화
    pauseButton.classList.add('hidden');
    resumeButton.classList.remove('hidden');
    
    // 게임 보드에서 보이지 않는 요소들 추가
    const pauseOverlay = document.createElement('div');
    pauseOverlay.className = 'pause-overlay';
    pauseOverlay.innerHTML = '<div class="pause-message">게임이 일시정지 되었습니다</div>';
    gameBoard.appendChild(pauseOverlay);
}

// 게임 재시작 처리
function resumeGame() {
    if (!gameActive || !gamePaused) return;
    
    // 일시정지 시간 계산
    const now = new Date();
    totalPausedTime += now - pauseStartTime;
    
    gamePaused = false;
    
    // 버튼 비활성화
    resumeButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    
    // 게임 보드에서 보이지 않는 요소들 제거
    const pauseOverlay = document.querySelector('.pause-overlay');
    if (pauseOverlay) {
        pauseOverlay.remove();
    }
    
    // 타이머 재시작
    startTimer();
}

// 게임 재시작 확인
function confirmResetGame() {
    if (confirm('정말로 게임을 초기화하시겠습니까?')) {
        resetGame();
    }
}

// 게임 보드 초기화
function resetGame() {
    stopTimer();
    resultScreen.classList.add('hidden');
    gameActive = false;
    gamePaused = false;
    currentTarget = 1;
    currentNumberElement.textContent = currentTarget;
    
    // 게임 휼성화 클래스 제거
    document.body.classList.remove('game-active');
    
    // 게임 컨트롤 버튼 설정
    startButton.classList.remove('hidden');
    difficultyContainer.classList.remove('hidden');
    pauseButton.classList.add('hidden');
    resumeButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    
    // 랭킹 시스템 점수 초기화
    saveScoreButton.disabled = false;
    saveScoreButton.textContent = '점수 저장';
    rankingScreen.classList.add('hidden');
    
    // 게임 보드 초기화
    clearGameBoard();
}

// 게임 보드 초기화
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

// 배열 무작위 처리
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 게임 보드에서 숫자 처리
function handleNumberClick(event) {
    if (!gameActive || gamePaused) return;
    
    const element = event.target;
    
    // 그리드 확인
    if (element.classList.contains('number-item')) {
        const value = parseInt(element.dataset.value);
        
        // 목표 숫자와 비교하여 처리
        if (value === currentTarget) {
            // 정답 처리
            element.classList.add('correct');
            playCorrectSound();
            
            // 목표 숫자 다음으로 이동
            currentTarget++;
            currentNumberElement.textContent = currentTarget;
            
            // 모든 숫자 찾았는지 확인
            if (currentTarget > maxNumber) {
                gameComplete();
            }
        } else {
            // 오답 경우 오류 처리
            mistakes++;
            element.classList.add('wrong');
            playWrongSound();
            
            // 오류 처리 후 오답 제거
            setTimeout(() => {
                element.classList.remove('wrong');
            }, 300);
        }
    }
}

// 정답음 처리
function playCorrectSound() {
    // 간단한 정답음 처리 (간단한 오디오 API 사용)
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
    // 간단한 오답음 처리 (간단한 오디오 API 사용)
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

// 게임 종료 처리
function gameComplete() {
    gameActive = false;
    stopTimer();
    
    // 게임 활성화 클래스 제거
    document.body.classList.remove('game-active');
    
    // 종료 시간 표시
    finalTimeElement.textContent = timerElement.textContent;
    
    // 실수 횟수 표시
    const mistakesElement = document.getElementById('mistakes-count');
    if (mistakesElement) {
        mistakesElement.textContent = mistakes;
    }
    
    // 저장된 이름 표시
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
        playerNameInput.value = savedName;
    }
    
    // 종료 시간 표시 - 관련된 요소 추가
    resultScreen.classList.remove('hidden');
    resultScreen.style.display = 'flex';
}

// 타이머 처리
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

// 크기 변경 처리 (게임 활성화시 크기 변경 무시 처리)
window.addEventListener('resize', () => {
    // 게임 활성화시의 크기 변경 임계값 처리
    if (gameActive) {
        // 크기 변경 임계값 처리
        const widthChange = Math.abs(window.innerWidth - lastWindowWidth);
        const heightChange = Math.abs(window.innerHeight - lastWindowHeight);
        
        if (widthChange > RESIZE_THRESHOLD || heightChange > RESIZE_THRESHOLD) {
            // 게임 보드 크기 초기화
            lastWindowWidth = window.innerWidth;
            lastWindowHeight = window.innerHeight;
            
            // 게임 보드 초기화
            clearGameBoard();
            generateNumbers();
        }
    } else {
        // 게임 활성화되지 않은 크기 변경 없을 때 크기 초기화
        lastWindowWidth = window.innerWidth;
        lastWindowHeight = window.innerHeight;
    }
});

// 터치 이벤트 처리 (게임 활성화시 터치 무시 처리)
gameBoard.addEventListener('touchmove', function(e) {
    if (gameActive) {
        e.preventDefault();
    }
}, { passive: false });

// ===== 랭킹 시스템 처리 =====

// 랭킹 화면 처리 함수
function showRanking() {
    rankingScreen.classList.remove('hidden');
    rankingScreen.style.display = 'block';
    
    // 토스트 형태로 스타일링
    rankingScreen.style.position = 'fixed';
    rankingScreen.style.top = '50%';
    rankingScreen.style.left = '50%';
    rankingScreen.style.transform = 'translate(-50%, -50%)';
    rankingScreen.style.width = '80%';
    rankingScreen.style.maxWidth = '500px';
    rankingScreen.style.maxHeight = '80%';
    rankingScreen.style.zIndex = '1000';
    rankingScreen.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.7)';
    rankingScreen.style.borderRadius = '15px';
    rankingScreen.style.overflow = 'auto';
    rankingScreen.style.padding = '20px';
    rankingScreen.style.backgroundColor = '#fff';
    
    // 배경 어둡게 처리
    const overlay = document.createElement('div');
    overlay.id = 'ranking-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.zIndex = '999';
    document.body.appendChild(overlay);
    
    // 오버레이 클릭 시 랭킹 닫기
    overlay.addEventListener('click', hideRanking);
    
    updateRankingDisplay();
}

// 랭킹 화면 숨기기
function hideRanking() {
    rankingScreen.classList.add('hidden');
    rankingScreen.style.display = 'none';
    
    // 배경 오버레이 제거
    const overlay = document.getElementById('ranking-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// 랭킹 시스템 이벤트 처리
function updateRankingDisplay() {
    // 난이도 선택 값 가져오기
    const difficultyValue = rankingDifficultySelect.value;
    const difficultyKey = `rankings_${difficultyValue}`;
    
    // 로딩 인디케이터 표시
    rankingTableBody.innerHTML = '<tr><td colspan="5">랭킹 로딩 중...</td></tr>';
    
    if (currentRankingMode === 'online' && isOnlineRankingEnabled) {
        // 온라인 랭킹 표시
        loadOnlineRankings(difficultyValue)
            .then(rankings => {
                displayRankings(rankings);
            })
            .catch(error => {
                console.error("온라인 랭킹 로드 오류:", error);
                // 온라인 랭킹 로드 실패 시 로컬 랭킹으로 폴백
                currentRankingMode = 'local';
                document.getElementById('ranking-mode-toggle').textContent = '온라인 랭킹 보기';
                updateRankingDisplay();
            });
    } else {
        // 로컬 랭킹 표시
        const localRankings = JSON.parse(localStorage.getItem(difficultyKey)) || [];
        displayRankings(localRankings);
    }
}

// 랭킹 데이터 표시
function displayRankings(rankings) {
    // 랭킹 테이블 초기화
    rankingTableBody.innerHTML = '';
    
    // 점수 없을 때 처리
    if (rankings.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5">점수가 없습니다.</td>';
        rankingTableBody.appendChild(row);
        return;
    }
    
    // 랭킹 시스템 점수 표시
    rankings.forEach((score, index) => {
        const row = document.createElement('tr');
        
        // 현재 플레이어 확인
        const isCurrentPlayer = currentRankingMode === 'local' && 
                              score.name === playerNameInput.value && 
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

// 점수 저장 함수
function saveScore() {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('이름을 입력하세요');
        return;
    }
    
    // 저장된 이름 저장
    localStorage.setItem('playerName', playerName);
    
    // 난이도에 따른 점수 저장
    const difficultyKey = getDifficultyKey();
    
    // 새로운 점수 생성
    const newScore = {
        name: playerName,
        time: finalTimeElement.textContent,
        timeValue: getTimeValueInMilliseconds(finalTimeElement.textContent),
        mistakes: mistakes,
        date: new Date().toLocaleDateString(),
        difficulty: getDifficultyValue()
    };
    
    // 로컬 저장소에 점수 저장
    let localRankings = JSON.parse(localStorage.getItem(difficultyKey)) || [];
    localRankings.push(newScore);
    localRankings.sort((a, b) => a.timeValue - b.timeValue);
    localRankings = localRankings.slice(0, 10);
    localStorage.setItem(difficultyKey, JSON.stringify(localRankings));
    
    // 온라인 랭킹에 점수 저장
    if (isOnlineRankingEnabled) {
        saveOnlineScore(newScore)
            .then(() => {
                console.log("온라인 랭킹에 점수가 저장되었습니다.");
                showSaveSuccessMessage("온라인 랭킹에 점수가 저장되었습니다!");
            })
            .catch(error => {
                console.error("온라인 랭킹 저장 오류:", error);
                showSaveSuccessMessage("로컬에만 점수가 저장되었습니다.");
            });
    } else {
        showSaveSuccessMessage("로컬에 점수가 저장되었습니다!");
    }
    
    // 랭킹 화면 초기화
    saveScoreButton.disabled = true;
    saveScoreButton.textContent = '저장되었습니다!';
    
    // 랭킹 시스템 이벤트 처리 (랭킹 화면에서 점수 표시)
    if (!rankingScreen.classList.contains('hidden')) {
        updateRankingDisplay();
    }
}

// 저장 성공 메시지 표시
function showSaveSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message toast-success';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 3초 후 메시지 제거
    setTimeout(() => {
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// 난이도 값 반환 함수
function getDifficultyValue() {
    if (maxNumber <= 20) {
        return 'easy';
    } else if (maxNumber <= 30) {
        return 'normal';
    } else {
        return 'hard';
    }
}

// 난이도에 따른 점수 저장 키 반환 함수
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

// 시간 문자열에서 밀리초 값 반환 함수
function getTimeValueInMilliseconds(timeString) {
    const [minutes, seconds, milliseconds] = timeString.split(':').map(Number);
    return (minutes * 60 * 1000) + (seconds * 1000) + (milliseconds * 10);
} 
