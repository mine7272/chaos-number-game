// Firebase 구성
// 실제 사용 시 아래 설정을 Firebase 콘솔에서 얻은 정보로 교체해야 합니다
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    databaseURL: "https://your-app.firebaseio.com",
    projectId: "your-app-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "your-messaging-id",
    appId: "your-app-id"
};

// Firebase 초기화
let firebaseInitialized = false;
let database;

// Firebase 초기화 함수
function initializeFirebase() {
    try {
        if (!firebaseInitialized) {
            firebase.initializeApp(firebaseConfig);
            database = firebase.database();
            firebaseInitialized = true;
            console.log("Firebase가 성공적으로 초기화되었습니다.");
        }
    } catch (error) {
        console.error("Firebase 초기화 오류:", error);
        // Firebase 초기화 실패 시 로컬 모드로 전환
        showLocalModeMessage();
    }
}

// 로컬 모드 메시지 표시
function showLocalModeMessage() {
    // 로컬 모드 사용 중임을 알리는 토스트 메시지
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = '온라인 랭킹을 사용할 수 없습니다. 로컬 저장소만 사용합니다.';
    document.body.appendChild(toast);
    
    // 3초 후 메시지 제거
    setTimeout(() => {
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// 페이지 로드 시 Firebase 초기화 시도
document.addEventListener('DOMContentLoaded', function() {
    initializeFirebase();
});

// 온라인 랭킹 저장 함수
function saveOnlineScore(scoreData) {
    if (!firebaseInitialized) {
        console.warn("Firebase가 초기화되지 않았습니다. 로컬에만 저장합니다.");
        return Promise.reject("Firebase가 초기화되지 않았습니다.");
    }
    
    // 랭킹에 점수 저장
    const difficultyRef = database.ref(`rankings/${scoreData.difficulty}`);
    const newScoreRef = difficultyRef.push();
    
    return newScoreRef.set({
        name: scoreData.name,
        time: scoreData.time,
        timeValue: scoreData.timeValue,
        mistakes: scoreData.mistakes,
        date: scoreData.date
    });
}

// 온라인 랭킹 로드 함수
function loadOnlineRankings(difficulty) {
    if (!firebaseInitialized) {
        console.warn("Firebase가 초기화되지 않았습니다. 로컬 랭킹만 표시합니다.");
        return Promise.reject("Firebase가 초기화되지 않았습니다.");
    }
    
    const difficultyRef = database.ref(`rankings/${difficulty}`);
    
    return difficultyRef.orderByChild('timeValue').limitToFirst(20).once('value')
        .then(snapshot => {
            const rankings = [];
            snapshot.forEach(childSnapshot => {
                rankings.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            return rankings;
        });
} 