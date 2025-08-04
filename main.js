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
        buy_bonus_button: "★ BONUS SATIN AL"
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
        buy_bonus_button: "★ BUY BONUS"
    }
};
const gameSymbols = [
    { name: 'banana', file: 'symbol_banana.png', type: 'normal' },
    { name: 'watermelon', file: 'symbol_watermelon.png', type: 'normal' },
    { name: 'cucumber', file: 'symbol_cucumber.png', type: 'normal' },
    { name: 'apple', file: 'symbol_apple.png', type: 'normal' },
    { name: 'peach', file: 'symbol_peach.png', type: 'normal' },
    { name: 'cherry', file: 'symbol_cherry.png', type: 'normal' },
    { name: 'gem_green', file: 'symbol_gem_green.png', type: 'normal' },
    { name: 'gem_purple', file: 'symbol_gem_purple.png', type: 'normal' },
    { name: 'heart_red', file: 'symbol_heart_red.png', type: 'normal' },
    { name: 'scatter', file: 'scatter.png', type: 'scatter' },
    { name: 'multiplier', file: 'multiplier_bomb.png', type: 'multiplier' }
];

let currentLanguage = 'en';
let playerData = {};

window.addEventListener('load', () => {

    const languageSelector = document.getElementById('language-selector');
    const loadingScreen = document.getElementById('loading-screen');
    const loginScreen = document.getElementById('login-screen');
    const gameScreen = document.getElementById('game-screen');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username-input');
    const emailInput = document.getElementById('email-input');
    const playerUsernameDisplay = document.getElementById('player-username');
    const balanceDisplay = document.getElementById('balance-display');
    const betAmountDisplay = document.getElementById('bet-amount');
    const betIncreaseButton = document.getElementById('bet-increase');
    const betDecreaseButton = document.getElementById('bet-decrease');
    const spinButton = document.getElementById('spin-button');
    const buyBonusButton = document.getElementById('buy-bonus-button');
    const gameGrid = document.getElementById('game-grid');

    const betLevels = [20, 50, 100, 200, 500, 1000];
    let currentBetIndex = 2;

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
            const randomSymbolData = gameSymbols[Math.floor(Math.random() * 9)];
            const symbolDiv = document.createElement('div');
            symbolDiv.classList.add('symbol');
            const symbolImg = document.createElement('img');
            symbolImg.src = randomSymbolData.file; 
            symbolImg.alt = randomSymbolData.name;
            symbolDiv.style.animationDelay = `${(i * 0.02)}s`;
            symbolDiv.appendChild(symbolImg);
            gameGrid.appendChild(symbolDiv);
        }
    }

    function updateBetDisplay() {
        betAmountDisplay.textContent = betLevels[currentBetIndex];
    }
    
    updateBetDisplay();

    document.querySelectorAll('#language-selector button').forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang);
        });
    });
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

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
        languageSelector.classList.add('hidden');
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

    betIncreaseButton.addEventListener('click', () => {
        if (currentBetIndex < betLevels.length - 1) {
            currentBetIndex++;
            updateBetDisplay();
        }
    });

    betDecreaseButton.addEventListener('click', () => {
        if (currentBetIndex > 0) {
            currentBetIndex--;
            updateBetDisplay();
        }
    });

    spinButton.addEventListener('click', () => {
        const currentBet = betLevels[currentBetIndex];
        if (playerData.balance < currentBet) {
            alert(currentLanguage === 'tr' ? 'Yetersiz bakiye!' : 'Insufficient balance!');
            return;
        }
        playerData.balance -= currentBet;
        balanceDisplay.textContent = playerData.balance;
        localStorage.setItem(playerData.username, JSON.stringify(playerData));
        populateGrid();
    });

    buyBonusButton.addEventListener('click', () => {
        const currentBet = betLevels[currentBetIndex];
        const bonusCost = currentBet * 100;
        if (playerData.balance < bonusCost) {
            alert(currentLanguage === 'tr' ? `Yetersiz bakiye! Bonus için ${bonusCost} Kyroslira gerekli.` : `Insufficient balance! Bonus requires ${bonusCost} Kyroslira.`);
            return;
        }
        playerData.balance -= bonusCost;
        balanceDisplay.textContent = playerData.balance;
        localStorage.setItem(playerData.username, JSON.stringify(playerData));
        alert(currentLanguage === 'tr' ? 'Bonus Turu Başlıyor!' : 'Bonus Round Starting!');
        populateGrid();
    });

});
