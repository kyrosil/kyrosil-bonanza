// Dil ve sembol gibi genel sabitler
const languageStrings = {
    tr: {
        loading_text: "Oyun Yükleniyor...",
        login_title: "Oyuna Giriş",
        login_desc: "Başlamak için bilgilerinizi girin.",
        username_placeholder: "Kullanıcı Adı",
        email_placeholder: "E-posta Adresi",
        login_button: "Oyuna Başla",
        how_to_play_title: "Nasıl Oynanır",
        how_to_play_desc: "Amaç, başlangıçtaki 5000 Kyroslira'yı çevirmeler yaparak veya bonus satın alarak katlamaktır. Kazanmak için 8 veya daha fazla aynı sembolü eşleştirin!",
        rewards_title: "Ödüller",
        rewards_desc: "Belirtilen bakiye hedeflerine ulaşın ve ödülünüzü almak için bizimle iletişime geçin! (Ödüller yakında açıklanacak).",
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
        loading_text: "Game Loading...",
        login_title: "Game Login",
        login_desc: "Enter your details to start.",
        username_placeholder: "Username",
        email_placeholder: "Email Address",
        login_button: "Start Game",
        how_to_play_title: "How to Play",
        how_to_play_desc: "The goal is to increase your starting 5000 Kyroslira by spinning or buying bonuses. Match 8 or more symbols to win!",
        rewards_title: "Rewards",
        rewards_desc: "Reach the specified balance milestones and contact us to claim your prize! (Prizes to be announced soon).",
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
    const emailInput = document.getElementById('email-input');
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
            if (languageStrings[lang] && languageStrings[lang][key]) {
                element.textContent = languageStrings[lang][key];
            }
        });

        document.querySelectorAll('[data-key-placeholder]').forEach(element => {
            const key = element.dataset.keyPlaceholder;
            if (languageStrings[lang] && languageStrings[lang][key]) {
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

    // Giriş Yapma Mantığı
    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();

        if (username === "" || email === "") {
            alert(currentLanguage === 'tr' ? 'Lütfen tüm alanları doldurun.' : 'Please fill in all fields.');
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            alert(currentLanguage === 'tr' ? 'Lütfen geçerli bir e-posta adresi girin.' : 'Please enter a valid email address.');
            return;
        }

        loginScreen.classList.add('hidden');
        loadingScreen.classList.remove('hidden');
        loadingScreen.style.display = 'flex';

        setTimeout(() => {
            let storedPlayerData = JSON.parse(localStorage.getItem(username));
            if (!storedPlayerData) {
                storedPlayerData = {
                    username: username,
                    email: email,
                    balance: 5000,
                    lastLogin: new Date().toISOString()
                };
                localStorage.setItem(username, JSON.stringify(storedPlayerData));
            }
            playerData = storedPlayerData;

            playerUsernameDisplay.textContent = playerData.username;
            balanceDisplay.textContent = playerData.balance;

            populateGrid();

            loadingScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            gameScreen.style.display = 'flex';
        }, 2000);
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
