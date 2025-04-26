//読み込み確認用
console.log("main.js読み込んだよ！");

// セクションごとの背景画像配列
// 実際の実装では、画像フォルダから画像を読み込むようにします
const heroImages = [
    "images/hero/hero1.png",
    "images/hero/hero2.png"
];

const registrationImages = [
    "images/registration/registration1.png",
    "images/registration/registration2.png"
];

// 各セクションに背景画像を設定する関数
function setupBackgroundSlideshow(sectionId, images) {
    const section = document.getElementById(sectionId);
    let activeBackground = null;
    let lastIndex = -1; // 前回表示した画像のインデックス

    function getRandomIndex() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * images.length);
        } while (randomIndex === lastIndex);
        return randomIndex;
    }

    function createNewBackground() {
        const randomIndex = getRandomIndex();
        const imgUrl = images[randomIndex];

        const newBg = document.createElement('div');
        newBg.className = 'section-bg';
        newBg.style.backgroundImage = `url(${imgUrl})`;
        section.appendChild(newBg);

        // 古い背景を削除
        if (activeBackground) {
            section.removeChild(activeBackground);
        }

        // 新しい背景をアクティブにする
        setTimeout(() => {
            newBg.classList.add('active');
        }, 50);

        activeBackground = newBg;
        lastIndex = randomIndex; // 表示した画像のインデックスを記録
    }

    // 最初の背景を設定
    createNewBackground();

    // 定期的に背景を切り替える
    setInterval(() => {
        createNewBackground();
    }, 5000);
}

// カウントダウンタイマーの設定
function setupCountdownTimer() {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 30); // 30日後に設定
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "公開しました！";
        }
    }
    
    // 1秒ごとにカウントダウンを更新
    updateCountdown();
    const x = setInterval(updateCountdown, 1000);
}

// フォーム送信処理のセットアップ
function setupRegistrationForm() {
    document.getElementById("registrationForm").addEventListener("submit", function(e) {
        e.preventDefault();
        // 実際の登録処理はここに実装します
        // ...
        
        // 成功メッセージを表示
        document.getElementById("successMessage").style.display = "block";
        
        // フォームをリセット
        this.reset();
        
        // 3秒後にメッセージを非表示に
        setTimeout(() => {
            document.getElementById("successMessage").style.display = "none";
        }, 3000);
    });
}

// 実際の実装では、以下のようなコードでフォルダから画像を読み込むことができます
async function loadImagesFromFolder(folderPath) {
    try {
        const response = await fetch(`/api/get-images?folder=${folderPath}`);
        const data = await response.json();
        return data.images; // 画像のパスの配列
    } catch (error) {
        console.error('画像の読み込みに失敗しました:', error);
        return []; // エラー時は空の配列を返す
    }
}

// ページ読み込み時に全体の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 背景スライドショーの設定
    setupBackgroundSlideshow('hero-section', heroImages);
    setupBackgroundSlideshow('registration-section', registrationImages);
    
    // カウントダウンタイマーの設定
    setupCountdownTimer();
    
    // フォーム処理の設定
    setupRegistrationForm();
    
    // 実際の実装では、以下のように画像を動的に読み込むことも可能
    /*
    async function initializeApp() {
        const heroImages = await loadImagesFromFolder('images/hero');
        const registrationImages = await loadImagesFromFolder('images/registration');
        
        if (heroImages.length > 0) {
            setupBackgroundSlideshow('hero-section', heroImages);
        }
        
        if (registrationImages.length > 0) {
            setupBackgroundSlideshow('registration-section', registrationImages);
        }
    }
    
    initializeApp();
    */
});
