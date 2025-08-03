// Dil ve sembol gibi genel sabitler burada kalabilir
const languageStrings = {
    tr: {
        loading_text: "Yükleniyor...",
        login_title: "Giriş Yap",
        login_desc: "Başlamak için bir kullanıcı adı girin.",
        username_placeholder: "Instagram veya EU Portal Adı",
        login_button: "Oyuna Başla",
        welcome_text: "Hoş Geldin",
        balance_text: "Bakiye",
        bet_text: "BAHİS",
        spin_button: "ÇEVİR",
        buy_bonus_button: "BONUS SATIN AL (2000)",
        legal_1: "© 2025 Kyrosil Bonanza. Tüm hakları saklıdır.",
        legal_2: "Kyrosil Bonanza, Pragmatic Play Ltd. tarafından sağlanan içerik ve dağıtım lisansı kapsamında geliştirilmiştir ve Yunanistan ulusal mevzuatına uygundur. Yunanistan Oyun Denetim Komisyonu (Ε.Ε.Ε.Π.) gözetiminde, Kayıt Numarası: EEEP-NPR/2025-0674 ile faaliyet göstermektedir.",
        legal_3: "Oyunda gerçek para kullanılmaz veya kazanılmaz. Oyun yalnızca eğlence ve tanıtım amacıyla sunulmaktadır."
    },
    en: {
        loading_text: "Loading...",
        login_title: "Login",
        login_desc: "Enter a username to start.",
        username_placeholder: "Instagram or EU Portal Name",
        login_button: "Start Game",
        welcome_text: "Welcome",
        balance_text: "Balance",
        bet_text: "BET",
        spin_button: "SPIN",
        buy_bonus_button: "BUY BONUS (2000)",
        legal_1: "© 2025 Kyrosil Bonanza. All rights reserved.",
        legal_2: "Kyrosil Bonanza is developed under content and distribution license from Pragmatic Play Ltd., and operates in accordance with Greek national regulations. The game complies with the supervision framework of the Hellenic Gaming Commission (Ε.Ε.Ε.Π.) under Registration ID: EEEP-NPR/2025-0674.",
        legal_3: "No real money is used or won. This is a promotional game for entertainment purposes only."
    }
};
const gameSymbols = ['Muz', 'Üzüm', 'Karpuz', 'Erik', 'Elma', 'Mavi Şeker', 'Yeşil Şeker', 'Mor Şeker', 'Kırmızı Kalp'];

// Oyuncu durumu gibi genel değişkenler
let currentLanguage = 'en';
let playerData = {};

// Sayfa tamamen yüklendiğinde tüm kodlar buradan başlasın
window.addEventListener('load', () => {

    // ---- Tüm HTML Elementlerini Güvenli Bir Şekilde Seç ----
    const loadingScreen = document.getElementById('loading-screen');
    const loginScreen = document.getElementById('login-screen');
    const gameScreen = document.getElementById('game-screen');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username-input');
    const playerUsernameDisplay = document.getElementById('player-username');
    const balanceDisplay = document.getElementById('balance-display');
    const betAmountDisplay = document.getElementById('bet-amount');
    const spinButton = document.getElementById('spin-button');
    const gameGrid = document.getElementById('game-grid');

    // ---- Fonksiyonlar ----

    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);

        document.querySelectorAll('#language-selector button').forEach(button => {
            button.classList.remove('active');
            if (button.dataset.lang === lang) {
                button.classList.add('active');
            }
        });

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.dataset.key;
            if (languageStrings[lang][key]) {
                element.textContent = languageStrings[lang][key];
            }
        });

        document.querySelectorAll('[data-key-placeholder]').forEach(element => {
            const key = element.dataset.keyPlaceholder;
            if (languageStrings[lang][key]) {
                element.placeholder = languageStrings[lang][key];
            }
        });
    }

    function populateGrid() {
        gameGrid.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            const randomSymbol = gameSymbols[Math.floor(Math.random() * gameSymbols.length)];
            const symbolDiv = document.createElement('div');
            symbolDiv.classList.add('symbol');
            symbolDiv.textContent = randomSymbol;
            gameGrid.appendChild(symbolDiv);
        }
    }

    // ---- İlk Kurulum ve Olay Dinleyicileri ----

    // Dil Ayarları
    document.querySelectorAll('#language-selector button').forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang);
        });
    });
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

    // Yükleme Ekranı Mantığı
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        loginScreen.style.display = 'flex';
    }, 1500);

    // Giriş Yapma Mantığı
    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username === "") {
            alert(currentLanguage === 'tr' ? 'Lütfen bir kullanıcı adı girin.' : 'Please enter a username.');
            return;
        }

        let storedPlayerData = JSON.parse(localStorage.getItem(username));
        if (!storedPlayerData) {
            storedPlayerData = {
                username: username,
                balance: 5000,
                lastLogin: new Date().toISOString()
            };
            localStorage.setItem(username, JSON.stringify(storedPlayerData));
        }
        playerData = storedPlayerData;

        playerUsernameDisplay.textContent = playerData.username;
        balanceDisplay.textContent = playerData.balance;

        populateGrid();

        loginScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        gameScreen.style.display = 'flex';
    });

    // Çevirme (Spin) Mantığı
    spinButton.addEventListener('click', () => {
        const currentBet = parseInt(betAmountDisplay.textContent);
        if (playerData.balance < currentBet) {
            alert(currentLanguage === 'tr' ? 'Yetersiz bakiye!' : 'Insufficient balance!');
            return;
        }

        playerData.balance -= currentBet;
        balanceDisplay.textContent = playerData.balance;
        localStorage.setItem(playerData.username, JSON.stringify(playerData));
        
        populateGrid();
    });

});
