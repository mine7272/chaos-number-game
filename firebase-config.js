// Firebase ����
// ���� ��� �� �Ʒ� ������ Firebase �ֿܼ��� ���� ������ ��ü�ؾ� �մϴ�
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    databaseURL: "https://your-app.firebaseio.com",
    projectId: "your-app-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "your-messaging-id",
    appId: "your-app-id"
};

// Firebase �ʱ�ȭ
let firebaseInitialized = false;
let database;

// Firebase �ʱ�ȭ �Լ�
function initializeFirebase() {
    try {
        if (!firebaseInitialized) {
            firebase.initializeApp(firebaseConfig);
            database = firebase.database();
            firebaseInitialized = true;
            console.log("Firebase�� ���������� �ʱ�ȭ�Ǿ����ϴ�.");
        }
    } catch (error) {
        console.error("Firebase �ʱ�ȭ ����:", error);
        // Firebase �ʱ�ȭ ���� �� ���� ���� ��ȯ
        showLocalModeMessage();
    }
}

// ���� ��� �޽��� ǥ��
function showLocalModeMessage() {
    // ���� ��� ��� ������ �˸��� �佺Ʈ �޽���
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = '�¶��� ��ŷ�� ����� �� �����ϴ�. ���� ����Ҹ� ����մϴ�.';
    document.body.appendChild(toast);
    
    // 3�� �� �޽��� ����
    setTimeout(() => {
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// ������ �ε� �� Firebase �ʱ�ȭ �õ�
document.addEventListener('DOMContentLoaded', function() {
    initializeFirebase();
});

// �¶��� ��ŷ ���� �Լ�
function saveOnlineScore(scoreData) {
    if (!firebaseInitialized) {
        console.warn("Firebase�� �ʱ�ȭ���� �ʾҽ��ϴ�. ���ÿ��� �����մϴ�.");
        return Promise.reject("Firebase�� �ʱ�ȭ���� �ʾҽ��ϴ�.");
    }
    
    // ��ŷ�� ���� ����
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

// �¶��� ��ŷ �ε� �Լ�
function loadOnlineRankings(difficulty) {
    if (!firebaseInitialized) {
        console.warn("Firebase�� �ʱ�ȭ���� �ʾҽ��ϴ�. ���� ��ŷ�� ǥ���մϴ�.");
        return Promise.reject("Firebase�� �ʱ�ȭ���� �ʾҽ��ϴ�.");
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