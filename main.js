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
        buy_bonus_button: "★ BONUS SATIN AL",
        bonus_modal_title: "Satın Alımı Onayla",
        bonus_modal_text_1: "Bonus Özelliğini",
        bonus_modal_confirm: "Evet, Satın Al",
        bonus_modal_cancel: "Vazgeç"
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
        buy_bonus_button: "★ BUY BONUS",
        bonus_modal_title: "Confirm Purchase",
        bonus_modal_text_1: "Do you want to buy the Bonus Feature for",
        bonus_modal_confirm: "Yes, Buy",
        bonus_modal_cancel: "Cancel"
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

// YENİ: ÖDEME TABLOSU (Bahis Miktarı Çarpanı Olarak)
const payTable = {
    // 8-9 Adet | 10-11 Adet | 12+ Adet
    'banana':     { 8: 0.25,  10: 0.75,    12: 2 },
    'watermelon': { 8: 0.40,  10: 0.90,    12: 4 },
    'cucumber':   { 8: 0.50,  10: 1,       12: 5 },
    'apple':      { 8: 0.80,  10: 1.2,     12: 8 },
    'peach':      { 8: 1,     10: 1.5,     12: 10 },
    'cherry':     { 8: 1.5,   10: 2,       12: 12 },
    'gem_green':  { 8: 2,     10: 5,       12: 15 },
    'gem_purple': { 8: 2.5,   10: 10,      12: 25 },
    'heart_red':  { 8: 10,    10: 25,      12: 50 },
    // 4 Adet | 5 Adet | 6 Adet
    'scatter':    { 4: 3,     5: 5,       6: 100 }
};

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
    const buyBonusModal = document.getElementById('buy-bonus-modal');
    const bonusCostDisplay = document.getElementById('bonus-cost-display');
    const confirmBuyButton = document.getElementById('confirm-buy-button');
    const cancelBuyButton = document.getElementById('cancel-buy-button');

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
        const currentSymbols = []; // Ekrana gelen sembolleri tutacak dizi
        for (let i = 0; i < 30; i++) {
            const randomSymbolData = gameSymbols[Math.floor(Math.random() * 9)];
            currentSymbols.push(randomSymbolData); // Sembolü listeye ekle

            const symbolDiv = document.createElement('div');
            symbolDiv.classList.add('symbol');
            const symbolImg = document.createElement('img');
            symbolImg.src = randomSymbolData.file; 
            symbolImg.alt = randomSymbolData.name;
    
            symbolDiv.style.animationDelay = `${(i * 0.02)}s`;
            symbolDiv.appendChild(symbolImg);
            gameGrid.appendChild(symbolDiv);
        }
        return currentSymbols; // Ekrondaki sembollerin listesini döndür
    }

    // YENİ: KAZANÇ HESAPLAMA FONKSİYONU
    function calculateWinnings(symbolsOnGrid, currentBet) {
        const counts = {};
        // 1. Ekrondaki her sembolü say
        for (const symbol of symbolsOnGrid) {
            counts[symbol.name] = (counts[symbol.name] || 0) + 1;
        }

        let totalWin = 0;

        // 2. Sayım sonuçlarını ödeme tablosuyla karşılaştır
        for (const symbolName in counts) {
            const count = counts[symbolName];
            if (payTable[symbolName]) {
                const payoutTiers = payTable[symbolName];
                let winMultiplier = 0;
                
                // Gelen sayının hangi ödeme dilimine girdiğini bul
                if (count >= 12 && payoutTiers[12]) {
                    winMultiplier = payoutTiers[12];
                } else if (count >= 10 && payoutTiers[10]) {
                    winMultiplier = payoutTiers[10];
                } else if (count >= 8 && payoutTiers[8]) {
                    winMultiplier = payoutTiers[8];
                } else if (count >= 6 && payoutTiers[6]) { // Scatter için
                    winMultiplier = payoutTiers[6];
                } else if (count >= 5 && payoutTiers[5]) { // Scatter için
                    winMultiplier = payoutTiers[5];
                } else if (count >= 4 && payoutTiers[4]) { // Scatter için
                    winMultiplier = payoutTiers[4];
                }

                if (winMultiplier > 0) {
                    totalWin += currentBet * winMultiplier;
                }
            }
        }
        return totalWin;
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
        
        const symbolsOnGrid = populateGrid();
        const winnings = calculateWinnings(symbolsOnGrid, currentBet);

        if (winnings > 0) {
            playerData.balance += winnings;
            balanceDisplay.textContent = Math.round(playerData.balance); // Küsuratları yuvarla
            setTimeout(() => { // Uyarıyı küçük bir gecikmeyle göster, daha doğal durur
                alert(currentLanguage === 'tr' ? `Tebrikler, ${Math.round(winnings)} Kyroslira kazandınız!` : `Congratulations, you won ${Math.round(winnings)} Kyroslira!`);
            }, 500); // 0.5 saniye sonra
        }
        
        localStorage.setItem(playerData.username, JSON.stringify(playerData));
    });

    buyBonusButton.addEventListener('click', () => {
        const currentBet = betLevels[currentBetIndex];
        const bonusCost = currentBet * 100;
        bonusCostDisplay.textContent = bonusCost;
        buyBonusModal.classList.remove('hidden');
        buyBonusModal.style.display = 'flex';
    });

    cancelBuyButton.addEventListener('click', () => {
        buyBonusModal.classList.add('hidden');
    });

    confirmBuyButton.addEventListener('click', () => {
        const currentBet = betLevels[currentBetIndex];
        const bonusCost = currentBet * 100;
        if (playerData.balance < bonusCost) {
            alert(currentLanguage === 'tr' ? `Yetersiz bakiye! Bonus için ${bonusCost} Kyroslira gerekli.` : `Insufficient balance! Bonus requires ${bonusCost} Kyroslira.`);
            return;
        }
        playerData.balance -= bonusCost;
        balanceDisplay.textContent = playerData.balance;
        localStorage.setItem(playerData.username, JSON.stringify(playerData));
        buyBonusModal.classList.add('hidden');
        alert(currentLanguage === 'tr' ? 'Bonus Turu Başlıyor!' : 'Bonus Round Starting!');
        
        const symbolsOnGrid = populateGrid();
        const winnings = calculateWinnings(symbolsOnGrid, currentBet);

        if (winnings > 0) {
            playerData.balance += winnings;
            balanceDisplay.textContent = Math.round(playerData.balance);
            setTimeout(() => {
                alert(currentLanguage === 'tr' ? `Tebrikler, ${Math.round(winnings)} Kyroslira kazandınız!` : `Congratulations, you won ${Math.round(winnings)} Kyroslira!`);
            }, 500);
        }
        
        localStorage.setItem(playerData.username, JSON.stringify(playerData));
    });

});
