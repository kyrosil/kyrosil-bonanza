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
        win_text: "KAZANÇ",
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
        win_text: "WIN",
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

const payTable = {
    'banana':     { 8: 0.25,  10: 0.75,    12: 2 },
    'watermelon': { 8: 0.40,  10: 0.90,    12: 4 },
    'cucumber':   { 8: 0.50,  10: 1,       12: 5 },
    'apple':      { 8: 0.80,  10: 1.2,     12: 8 },
    'peach':      { 8: 1,     10: 1.5,     12: 10 },
    'cherry':     { 8: 1.5,   10: 2,       12: 12 },
    'gem_green':  { 8: 2,     10: 5,       12: 15 },
    'gem_purple': { 8: 2.5,   10: 10,      12: 25 },
    'heart_red':  { 8: 10,    10: 25,      12: 50 },
    'scatter':    { 4: 3,     5: 5,       6: 100 }
};

let currentLanguage = 'en';
let playerData = {};
let isSpinning = false;
let currentGridSymbols = []; // Izgaradaki sembol verilerini tutan global dizi

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
    const spinWinDisplay = document.getElementById('spin-win-display');
    const spinWinAmount = document.getElementById('spin-win-amount');

    const betLevels = [20, 50, 100, 200, 500, 1000];
    let currentBetIndex = 2;
    
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function createSymbolElement(symbolData) {
        const symbolDiv = document.createElement('div');
        symbolDiv.classList.add('symbol');
        const symbolImg = document.createElement('img');
        symbolImg.src = symbolData.file;
        symbolImg.alt = symbolData.name;
        symbolDiv.appendChild(symbolImg);
        return symbolDiv;
    }
    
    function populateInitialGrid() {
        gameGrid.innerHTML = '';
        currentGridSymbols = [];
        for (let i = 0; i < 30; i++) {
            const randomSymbolData = gameSymbols[Math.floor(Math.random() * 9)];
            currentGridSymbols.push(randomSymbolData);
            const symbolElement = createSymbolElement(randomSymbolData);
            symbolElement.style.animation = `dropIn 0.5s ease-out forwards`;
            symbolElement.style.animationDelay = `${(i * 0.02)}s`;
            gameGrid.appendChild(symbolElement);
        }
    }

    function calculateWinnings() {
        const counts = {};
        const winningIndices = new Set();
        currentGridSymbols.forEach((symbol, index) => {
            if (symbol) counts[symbol.name] = (counts[symbol.name] || 0) + 1;
        });
        let totalWin = 0;
        const winningCombinations = [];
        for (const symbolName in counts) {
            const count = counts[symbolName];
            if (payTable[symbolName]) {
                const payoutTiers = payTable[symbolName];
                let winMultiplier = 0;
                if (count >= 12 && payoutTiers[12]) winMultiplier = payoutTiers[12];
                else if (count >= 10 && payoutTiers[10]) winMultiplier = payoutTiers[10];
                else if (count >= 8 && payoutTiers[8]) winMultiplier = payoutTiers[8];
                else if (count >= 6 && payoutTiers[6]) winMultiplier = payoutTiers[6];
                else if (count >= 5 && payoutTiers[5]) winMultiplier = payoutTiers[5];
                else if (count >= 4 && payoutTiers[4]) winMultiplier = payoutTiers[4];
                if (winMultiplier > 0) {
                    totalWin += betLevels[currentBetIndex] * winMultiplier;
                    if(symbolName !== 'scatter') winningCombinations.push(symbolName);
                }
            }
        }
        if (totalWin > 0) {
            currentGridSymbols.forEach((symbol, index) => {
                if (symbol && winningCombinations.includes(symbol.name)) {
                    winningIndices.add(index);
                }
            });
        }
        return { totalWin, winningIndices };
    }

    async function handleTumbles(winningIndices) {
        const gridElements = Array.from(gameGrid.children);
        winningIndices.forEach(index => gridElements[index].classList.add('winning'));
        await wait(500);
        winningIndices.forEach(index => {
            gridElements[index].classList.remove('winning');
            gridElements[index].classList.add('disappearing');
        });
        await wait(300);

        const newGridSymbols = [...currentGridSymbols];
        winningIndices.forEach(index => newGridSymbols[index] = null);

        for (let col = 0; col < 6; col++) {
            let emptySlots = 0;
            for (let row = 4; row >= 0; row--) {
                const index = row * 6 + col;
                if (newGridSymbols[index] === null) {
                    emptySlots++;
                } else if (emptySlots > 0) {
                    const targetIndex = (row + emptySlots) * 6 + col;
                    newGridSymbols[targetIndex] = newGridSymbols[index];
                    newGridSymbols[index] = null;
                    const elementToMove = gridElements[index];
                    elementToMove.style.transform = `translateY(${emptySlots * 100}%)`;
                }
            }
            for (let i = 0; i < emptySlots; i++) {
                const newSymbolData = gameSymbols[Math.floor(Math.random() * 9)];
                const targetIndex = i * 6 + col;
                newGridSymbols[targetIndex] = newSymbolData;
                const newElement = createSymbolElement(newSymbolData);
                newElement.style.transform = `translateY(-${emptySlots * 100}%)`;
                gameGrid.appendChild(newElement);
                setTimeout(() => { newElement.style.transform = 'translateY(0)'; }, 50);
            }
        }
        
        await wait(400);
        currentGridSymbols = newGridSymbols;
        gameGrid.innerHTML = '';
        currentGridSymbols.forEach(symbolData => gameGrid.appendChild(createSymbolElement(symbolData)));
        return;
    }

    async function handleSpinLogic(isBonusBuy = false) {
        if (isSpinning) return;
        isSpinning = true;
        spinButton.disabled = true;
        buyBonusButton.disabled = true;
        betIncreaseButton.disabled = true;
        betDecreaseButton.disabled = true;

        const currentBet = betLevels[currentBetIndex];
        const cost = isBonusBuy ? currentBet * 100 : currentBet;
        if (playerData.balance < cost) {
            alert(currentLanguage === 'tr' ? 'Yetersiz bakiye!' : 'Insufficient balance!');
            isSpinning = false;
            return;
        }
        playerData.balance -= cost;
        balanceDisplay.textContent = Math.round(playerData.balance);
        spinWinAmount.textContent = 0;
        let totalSpinWin = 0;

        populateInitialGrid();
        await wait(500);

        while (true) {
            const { totalWin, winningIndices } = calculateWinnings();
            if (totalWin > 0) {
                totalSpinWin += totalWin;
                spinWinAmount.textContent = Math.round(totalSpinWin);
                await handleTumbles(winningIndices);
            } else {
                break;
            }
        }
        
        if (totalSpinWin > 0) {
            playerData.balance += totalSpinWin;
            balanceDisplay.textContent = Math.round(playerData.balance);
        }
        
        localStorage.setItem(playerData.username, JSON.stringify(playerData));
        isSpinning = false;
        spinButton.disabled = false;
        buyBonusButton.disabled = false;
        betIncreaseButton.disabled = false;
        betDecreaseButton.disabled = false;
    }

    // --- Başlangıç Kurulumu ---
    // ... (dil, login, bet butonları ve modal butonları için tüm olay dinleyicileri burada)
    
    // Login button logic - now populates grid on start
    loginButton.addEventListener('click', () => {
        // ... (validation logic is the same)
        loginScreen.classList.add('hidden');
        languageSelector.classList.add('hidden');
        loadingScreen.classList.remove('hidden');
        loadingScreen.style.display = 'flex';
        setTimeout(() => {
            // ... (player data logic is the same)
            playerData = storedPlayerData;
            playerUsernameDisplay.textContent = playerData.username;
            balanceDisplay.textContent = playerData.balance;
            populateInitialGrid(); // Grid'i dolu başlat
            loadingScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            gameScreen.style.display = 'flex';
        }, 2000);
    });
    
    // Diğer tüm olay dinleyicileri (setLanguage, bet, spin, bonus modal) öncekiyle aynı mantıkta çalışır,
    // Sadece spin ve confirm buy butonları artık handleSpinLogic'i çağırır.
    
    spinButton.addEventListener('click', () => handleSpinLogic(false));
    confirmBuyButton.addEventListener('click', () => {
        buyBonusModal.classList.add('hidden');
        handleSpinLogic(true);
    });

    // Geri kalan tüm dinleyiciler...
    // Bu kısım önceki kodla aynı, buraya tekrar ekliyorum
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
    updateBetDisplay();
    document.querySelectorAll('#language-selector button').forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    betIncreaseButton.addEventListener('click', () => {
        if (isSpinning) return;
        if (currentBetIndex < betLevels.length - 1) {
            currentBetIndex++;
            updateBetDisplay();
        }
    });
    betDecreaseButton.addEventListener('click', () => {
        if (isSpinning) return;
        if (currentBetIndex > 0) {
            currentBetIndex--;
            updateBetDisplay();
        }
    });
    buyBonusButton.addEventListener('click', () => {
        if (isSpinning) return;
        const currentBet = betLevels[currentBetIndex];
        const bonusCost = currentBet * 100;
        bonusCostDisplay.textContent = bonusCost;
        buyBonusModal.classList.remove('hidden');
        buyBonusModal.style.display = 'flex';
    });
    cancelBuyButton.addEventListener('click', () => {
        buyBonusModal.classList.add('hidden');
    });
});
