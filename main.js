const languageStrings = {
    tr: {
        loading_text: "Oyun Yükleniyor...",
        login_title: "Oyuna Giriş",
        login_desc: "Başlamak için bilgilerinizi girin.",
        username_placeholder: "Instagram veya EU Portal Adı",
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
        ante_bet_title: "Şans 2x",
        ante_bet_desc: "Bonus kazanma şansını ikiye katla",
        buy_bonus_button: "★ BONUS SATIN AL",
        bonus_modal_title: "Satın Alımı Onayla",
        bonus_modal_text_1: "Bonus Özelliğini",
        bonus_modal_confirm: "Evet, Satın Al",
        bonus_modal_cancel: "Vazgeç",
        info_p1_title: "Sembol Ödemeleri",
        info_p2_title: "Oyun Özellikleri",
        info_p3_title: "Çarpan Sembolleri",
        info_scatter_pays: "Herhangi bir yerde öder",
        info_tumble_feature: "Tumble Özelliği",
        info_tumble_desc: "Her spinden sonra, kazanan kombinasyonlar ödenir ve kazanan semboller kaybolur. Kalan semboller ekranın altına düşer ve boş pozisyonlar yukarıdan gelen yeni sembollerle doldurulur.",
        info_freespins_feature: "Bonus Turu",
        info_freespins_desc: "Ekranda 4 veya daha fazla SCATTER sembolü belirdiğinde Bonus Turu özelliği tetiklenir. Tur 10 bedava çevirme ile başlar. Tur sırasında 3 veya daha fazla SCATTER gelirse, 5 ekstra bedava çevirme verilir.",
        bonus_won_title: "ÖZELLİK TETİKLENDİ",
        bonus_won_desc: "10 Bedava Çevirme Kazandın!",
        bonus_start_button: "Başlat",
        total_win: "TOPLAM KAZANÇ",
        free_spins_remaining: "BEDAVA ÇEVİRME",
        bonus_end_title: "TEBRİKLER",
        bonus_end_desc: "Toplam kazancın",
        bonus_end_close: "Devam Et",
        extra_spins_toast: "+5 Bedava Çevirme"
    },
    en: {
        loading_text: "Game Loading...",
        login_title: "Game Login",
        login_desc: "Enter your details to start.",
        username_placeholder: "Instagram or EU Portal Name",
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
        ante_bet_title: "Double Chance",
        ante_bet_desc: "to win feature",
        buy_bonus_button: "★ BUY BONUS",
        bonus_modal_title: "Confirm Purchase",
        bonus_modal_text_1: "Do you want to buy the Bonus Feature for",
        bonus_modal_confirm: "Yes, Buy",
        bonus_modal_cancel: "Cancel",
        info_p1_title: "Symbol Payouts",
        info_p2_title: "Game Features",
        info_p3_title: "Multiplier Symbols",
        info_scatter_pays: "Pays on any position",
        info_tumble_feature: "Tumble Feature",
        info_tumble_desc: "After every spin, winning combinations are paid and winning symbols disappear. The remaining symbols fall to the bottom of the screen and the empty positions are replaced with new symbols coming from above.",
        info_freespins_feature: "Bonus Round Feature",
        info_freespins_desc: "The Bonus Round feature is triggered when 4 or more SCATTER symbols hit anywhere on the screen. The round starts with 10 free spins. Hitting 3 or more SCATTER symbols during the round awards 5 extra free spins.",
        bonus_won_title: "FEATURE TRIGGERED",
        bonus_won_desc: "You won 10 Free Spins!",
        bonus_start_button: "Start",
        total_win: "TOTAL WIN",
        free_spins_remaining: "FREE SPINS",
        bonus_end_title: "CONGRATULATIONS",
        bonus_end_desc: "You won a total of",
        bonus_end_close: "Continue",
        extra_spins_toast: "+5 Free Spins"
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
    { name: 'multiplier_bomb', file: 'multiplier_bomb.png', type: 'multiplier', value: 2 },
    { name: 'multiplier_bomb', file: 'multiplier_bomb.png', type: 'multiplier', value: 3 },
    { name: 'multiplier_bomb', file: 'multiplier_bomb.png', type: 'multiplier', value: 4 },
    { name: 'multiplier_bomb', file: 'multiplier_bomb.png', type: 'multiplier', value: 5 },
    { name: 'multiplier_bomb', file: 'multiplier_bomb.png', type: 'multiplier', value: 6 },
    { name: 'multiplier_bomb', file: 'multiplier_bomb.png', type: 'multiplier', value: 8 },
    { name: 'multiplier_bomb', file: 'multiplier_bomb.png', type: 'multiplier', value: 10 },
    { name: 'multiplier_bomb', file: 'multiplier_bomb.png', type: 'multiplier', value: 12 },
    { name: 'multiplier_bomb', file: 'multiplier_bomb.png', type: 'multiplier', value: 15 },
    { name: 'multiplier_bomb', file: 'multiplier_bomb.png', type: 'multiplier', value: 20 },
    { name: 'multiplier_50x', file: 'multiplier_50x.png', type: 'multiplier', value: 50 },
    { name: 'multiplier_100x', file: 'multiplier_100x.png', type: 'multiplier', value: 100 },
    { name: 'multiplier_250x', file: 'multiplier_250x.png', type: 'multiplier', value: 250 },
    { name: 'multiplier_500x', file: 'multiplier_500x.png', type: 'multiplier', value: 500 },
    { name: 'multiplier_1000x', file: 'multiplier_1000x.png', type: 'multiplier', value: 1000 }
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

function createReel(isAnte) {
    const reel = [];
    const weights = {
        'banana': 20, 'watermelon': 18, 'cucumber': 16, 'apple': 14,
        'peach': 12, 'cherry': 10, 'gem_green': 8, 'gem_purple': 6, 'heart_red': 4,
        'scatter': isAnte ? 6 : 3
    };
    for (const symbolName in weights) {
        const symbolData = gameSymbols.find(s => s.name === symbolName);
        for (let i = 0; i < weights[symbolName]; i++) {
            reel.push(symbolData);
        }
    }
    return reel;
}

function createMultiplierReel() {
    const reel = [];
    const weights = { 2: 20, 3: 20, 4: 15, 5: 15, 6: 10, 8: 10, 10: 8, 12: 8, 15: 6, 20: 6, 50: 4, 100: 2, 250: 1, 500: 1, 1000: 1 };
    for (const value in weights) {
        const symbolData = gameSymbols.find(s => s.type === 'multiplier' && s.value == value);
        for (let i = 0; i < weights[value]; i++) {
            reel.push(symbolData);
        }
    }
    return reel;
}

const virtualReels = {
    normal: createReel(false),
    ante: createReel(true),
    multiplier: createMultiplierReel()
};

let currentLanguage = 'en';
let playerData = {};
let isSpinning = false;
let isAnteBetActive = false;
let currentGridSymbols = [];
let gameState = 'normal';
let freeSpinsRemaining = 0;
let totalBonusWin = 0;

window.addEventListener('load', () => {

    const allElements = {
        languageSelector: document.getElementById('language-selector'),
        loadingScreen: document.getElementById('loading-screen'),
        loginScreen: document.getElementById('login-screen'),
        gameScreen: document.getElementById('game-screen'),
        loginButton: document.getElementById('login-button'),
        usernameInput: document.getElementById('username-input'),
        emailInput: document.getElementById('email-input'),
        playerUsernameDisplay: document.getElementById('player-username'),
        balanceDisplay: document.getElementById('balance-display'),
        betAmountDisplay: document.getElementById('bet-amount'),
        betIncreaseButton: document.getElementById('bet-increase'),
        betDecreaseButton: document.getElementById('bet-decrease'),
        spinButton: document.getElementById('spin-button'),
        buyBonusButton: document.getElementById('buy-bonus-button'),
        gameGrid: document.getElementById('game-grid'),
        buyBonusModal: document.getElementById('buy-bonus-modal'),
        bonusCostDisplay: document.getElementById('bonus-cost-display'),
        confirmBuyButton: document.getElementById('confirm-buy-button'),
        cancelBuyButton: document.getElementById('cancel-buy-button'),
        spinWinDisplay: document.getElementById('spin-win-display'),
        spinWinAmount: document.getElementById('spin-win-amount'),
        infoButton: document.getElementById('info-button'),
        infoModal: document.getElementById('info-modal'),
        closeInfoModalButton: document.getElementById('close-info-modal'),
        infoPagesContainer: document.getElementById('info-pages-container'),
        infoPrevButton: document.getElementById('info-prev-button'),
        infoNextButton: document.getElementById('info-next-button'),
        infoPageIndicator: document.getElementById('info-page-indicator'),
        anteBetCheckbox: document.getElementById('ante-bet-checkbox'),
        bonusOverlay: document.getElementById('bonus-overlay'),
        freeSpinsCountDisplay: document.getElementById('free-spins-count'),
        totalBonusWinDisplay: document.getElementById('total-bonus-win-amount'),
        bonusTriggerModal: document.getElementById('bonus-trigger-modal'),
        startBonusButton: document.getElementById('start-bonus-button'),
        bonusEndModal: document.getElementById('bonus-end-modal'),
        finalBonusWinAmount: document.getElementById('final-bonus-win-amount'),
        closeBonusEndButton: document.getElementById('close-bonus-end-button'),
        progressBar: document.getElementById('progress-bar'),
        loadingPercentage: document.getElementById('loading-percentage'),
        extraSpinsToast: document.getElementById('extra-spins-toast'),
    };

    const betLevels = [20, 50, 100, 200, 500, 1000];
    let currentBetIndex = 2;
    let infoCurrentPage = 1;
    const infoTotalPages = 3;
    
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

    function createSymbolElement(symbolData) {
        const symbolDiv = document.createElement('div');
        symbolDiv.classList.add('symbol');
        const symbolImg = document.createElement('img');
        symbolImg.src = symbolData.file;
        symbolImg.alt = symbolData.name;
        symbolDiv.appendChild(symbolImg);
        if (symbolData.type === 'multiplier') {
            const valueSpan = document.createElement('span');
            valueSpan.classList.add('multiplier-value');
            valueSpan.textContent = `${symbolData.value}x`;
            symbolDiv.appendChild(valueSpan);
        }
        return symbolDiv;
    }

    function getRandomSymbol() {
        if (gameState === 'bonus' && Math.random() < 0.25) {
            const reel = virtualReels.multiplier;
            return reel[Math.floor(Math.random() * reel.length)];
        }
        const reel = isAnteBetActive ? virtualReels.ante : virtualReels.normal;
        return reel[Math.floor(Math.random() * reel.length)];
    }
    
    function populateGrid() {
        allElements.gameGrid.innerHTML = '';
        currentGridSymbols = [];
        for (let i = 0; i < 30; i++) {
            const randomSymbolData = getRandomSymbol();
            currentGridSymbols.push(randomSymbolData);
            const symbolElement = createSymbolElement(randomSymbolData);
            symbolElement.style.animation = `dropIn 0.5s ease-out forwards`;
            symbolElement.style.animationDelay = `${(i * 0.02)}s`;
            allElements.gameGrid.appendChild(symbolElement);
        }
    }

    function calculateWinnings(ignoreScatters = false) {
        const counts = {};
        const winningIndices = new Set();
        currentGridSymbols.forEach((symbol) => {
            if (symbol && symbol.type !== 'multiplier') counts[symbol.name] = (counts[symbol.name] || 0) + 1;
        });
        let totalWin = 0;
        const winningCombinations = [];
        for (const symbolName in counts) {
            const count = counts[symbolName];
            if (payTable[symbolName]) {
                if (ignoreScatters && symbolName === 'scatter') continue;
                const payoutTiers = payTable[symbolName];
                let winMultiplier = 0;
                if (count >= 12 && payoutTiers[12]) winMultiplier = payoutTiers[12];
                else if (count >= 10 && payoutTiers[10]) winMultiplier = payoutTiers[10];
                else if (count >= 8 && payoutTiers[8]) winMultiplier = payoutTiers[8];
                if (winMultiplier > 0) {
                    totalWin += betLevels[currentBetIndex] * winMultiplier;
                    if (symbolName !== 'scatter') winningCombinations.push(symbolName);
                }
            }
        }
        if (winningCombinations.length > 0) {
            currentGridSymbols.forEach((symbol, index) => {
                if (symbol && winningCombinations.includes(symbol.name)) {
                    winningIndices.add(index);
                }
            });
        }
        return { totalWin, winningIndices };
    }

    async function handleTumbles(winningIndices) {
        const gridElements = Array.from(allElements.gameGrid.children);
        winningIndices.forEach(index => gridElements[index].classList.add('winning'));
        await wait(500);
        
        const promises = [];
        winningIndices.forEach(index => {
            gridElements[index].classList.remove('winning');
            gridElements[index].classList.add('disappearing');
            promises.push(wait(300));
        });
        await Promise.all(promises);

        winningIndices.forEach(index => {
            currentGridSymbols[index] = null;
        });
        
        for (let col = 0; col < 6; col++) {
            let emptySlots = 0;
            for (let row = 4; row >= 0; row--) {
                const index = row * 6 + col;
                if (currentGridSymbols[index] === null) {
                    emptySlots++;
                } else if (emptySlots > 0) {
                    const targetIndex = (row + emptySlots) * 6 + col;
                    currentGridSymbols[targetIndex] = currentGridSymbols[index];
                    currentGridSymbols[index] = null;
                }
            }
            for (let i = 0; i < emptySlots; i++) {
                currentGridSymbols[i * 6 + col] = getRandomSymbol();
            }
        }

        allElements.gameGrid.innerHTML = '';
        currentGridSymbols.forEach((symbolData) => {
            const symbolElement = createSymbolElement(symbolData);
            symbolElement.style.animation = `dropIn 0.5s ease-out forwards`;
            allElements.gameGrid.appendChild(symbolElement);
        });
        
        await wait(500);
    }

    async function runSpinSequence() {
        populateGrid();
        await wait(500);

        let totalWinThisSequence = 0;

        while (true) {
            const { totalWin, winningIndices } = calculateWinnings(true); // Ignore scatters during tumbles
            if (totalWin > 0) {
                totalWinThisSequence += totalWin;
                allElements.spinWinAmount.textContent = Math.round(totalWinThisSequence);
                await handleTumbles(winningIndices);
            } else {
                break;
            }
        }

        if (gameState === 'bonus' && totalWinThisSequence > 0) {
            let totalMultiplier = 0;
            currentGridSymbols.forEach(symbol => {
                if (symbol && symbol.type === 'multiplier') {
                    totalMultiplier += symbol.value;
                }
            });
            if (totalMultiplier > 0) {
                totalWinThisSequence *= totalMultiplier;
            }
        }
        
        return totalWinThisSequence;
    }

    async function handleNormalSpin() {
        if (isSpinning) return;
        isSpinning = true;
        setButtonsState(false);

        const baseBet = betLevels[currentBetIndex];
        const cost = isAnteBetActive ? baseBet * 1.25 : baseBet;

        if (playerData.balance < cost) {
            alert(currentLanguage === 'tr' ? 'Yetersiz bakiye!' : 'Insufficient balance!');
            setButtonsState(true);
            isSpinning = false;
            return;
        }

        playerData.balance -= cost;
        allElements.balanceDisplay.textContent = Math.round(playerData.balance);
        allElements.spinWinAmount.textContent = 0;
        
        let totalSpinWin = await runSpinSequence();

        const scatterCount = currentGridSymbols.filter(s => s && s.name === 'scatter').length;
        if (scatterCount >= 4) {
            const scatterPayTiers = payTable.scatter;
            const multiplier = scatterPayTiers[scatterCount] || scatterPayTiers[6];
            totalSpinWin += baseBet * multiplier;
        }
        
        if (totalSpinWin > 0) {
            playerData.balance += totalSpinWin;
            allElements.balanceDisplay.textContent = Math.round(playerData.balance);
            allElements.spinWinAmount.textContent = Math.round(totalSpinWin);
        }
        
        localStorage.setItem(playerData.username, JSON.stringify(playerData));
        
        if (scatterCount >= 4) {
            await wait(500);
            allElements.bonusTriggerModal.classList.remove('hidden');
        } else {
            isSpinning = false;
            setButtonsState(true);
        }
    }
    
    async function startBonusRound(isBought = false) {
        if (isSpinning && !isBought) {
             setButtonsState(true);
             isSpinning = false;
             return;
        }
        
        isSpinning = true;
        setButtonsState(false);

        if(isBought) {
            const baseBet = betLevels[currentBetIndex];
            const cost = baseBet * 100;
            if (playerData.balance < cost) {
                alert(currentLanguage === 'tr' ? 'Yetersiz bakiye!': 'Insufficient balance!');
                isSpinning = false;
                setButtonsState(true);
                return;
            }
            playerData.balance -= cost;
            allElements.balanceDisplay.textContent = Math.round(playerData.balance);
        }

        gameState = 'bonus';
        freeSpinsRemaining = 10;
        totalBonusWin = 0;
        allElements.freeSpinsCountDisplay.textContent = freeSpinsRemaining;
        allElements.totalBonusWinDisplay.textContent = 0;
        allElements.bonusOverlay.classList.remove('hidden');
        
        while (freeSpinsRemaining > 0) {
            freeSpinsRemaining--;
            allElements.freeSpinsCountDisplay.textContent = freeSpinsRemaining;
            allElements.spinWinAmount.textContent = 0;
            
            let totalWinThisSpin = await runSpinSequence();
            
            if (totalWinThisSpin > 0) {
                totalBonusWin += totalWinThisSpin;
                allElements.totalBonusWinDisplay.textContent = Math.round(totalBonusWin);
                allElements.spinWinAmount.textContent = Math.round(totalWinThisSpin);
            }

            const scatterCount = currentGridSymbols.filter(s => s && s.name === 'scatter').length;
            if (scatterCount >= 3) {
                freeSpinsRemaining += 5;
                allElements.freeSpinsCountDisplay.textContent = freeSpinsRemaining;
                await showExtraSpinsToast();
            }
            await wait(1000);
        }

        playerData.balance += totalBonusWin;
        allElements.balanceDisplay.textContent = Math.round(playerData.balance);
        localStorage.setItem(playerData.username, JSON.stringify(playerData));
        
        allElements.finalBonusWinAmount.textContent = Math.round(totalBonusWin);
        allElements.bonusEndModal.classList.remove('hidden');
        
        gameState = 'normal';
        allElements.bonusOverlay.classList.add('hidden');
    }

    function updateBetDisplay() {
        const baseBet = betLevels[currentBetIndex];
        const displayBet = isAnteBetActive ? baseBet * 1.25 : baseBet;
        allElements.betAmountDisplay.textContent = displayBet;
    }
    
    function populateInfoModal() {
        let page1HTML = `<div class="info-page active-page" data-page="1"><h2 data-key="info_p1_title">Symbol Payouts</h2><div class="payout-table">`;
        const symbolsToDisplay = gameSymbols.filter(s => s.type === 'normal' || s.type === 'scatter');
        symbolsToDisplay.forEach(symbol => {
            page1HTML += `<div class="payout-item"><img src="${symbol.file}" alt="${symbol.name}"><ul>`;
            const tiers = payTable[symbol.name];
            if (symbol.name === 'scatter') {
                page1HTML += `<li>6 &rarr; ${tiers[6]}x</li><li>5 &rarr; ${tiers[5]}x</li><li>4 &rarr; ${tiers[4]}x</li><li data-key="info_scatter_pays">Pays on any position</li>`;
            } else {
                 page1HTML += `<li>12+ &rarr; ${tiers[12]}x</li><li>10-11 &rarr; ${tiers[10]}x</li><li>8-9 &rarr; ${tiers[8]}x</li>`;
            }
            page1HTML += `</ul></div>`;
        });
        page1HTML += `</div></div>`;
        let page2HTML = `<div class="info-page" data-page="2"><h2 data-key="info_p2_title">Game Features</h2><div class="feature-explanation"><h3 data-key="info_tumble_feature">Tumble Feature</h3><p data-key="info_tumble_desc">After every spin, winning combinations are paid and winning symbols disappear. The remaining symbols fall to the bottom of the screen and the empty positions are replaced with new symbols coming from above.</p><h3 data-key="info_freespins_feature">Bonus Round Feature</h3><p data-key="info_freespins_desc">The Bonus Round feature is triggered when 4 or more SCATTER symbols hit anywhere on the screen. The round starts with 10 free spins.</p></div></div>`;
        let page3HTML = `<div class="info-page" data-page="3"><h2 data-key="info_p3_title">Multiplier Symbols</h2></div>`;
        allElements.infoPagesContainer.innerHTML = page1HTML + page2HTML + page3HTML;
    }

    function showInfoPage(pageNumber) {
        infoCurrentPage = pageNumber;
        document.querySelectorAll('.info-page').forEach(page => page.classList.remove('active-page'));
        document.querySelector(`.info-page[data-page="${pageNumber}"]`).classList.add('active-page');
        allElements.infoPageIndicator.textContent = `${pageNumber} / ${infoTotalPages}`;
    }

    function setButtonsState(enabled) {
        allElements.spinButton.disabled = !enabled;
        allElements.buyBonusButton.disabled = isAnteBetActive ? true : !enabled;
        allElements.betIncreaseButton.disabled = !enabled;
        allElements.betDecreaseButton.disabled = !enabled;
    }
    
    async function showExtraSpinsToast() {
        allElements.extraSpinsToast.textContent = languageStrings[currentLanguage].extra_spins_toast;
        allElements.extraSpinsToast.classList.remove('hidden');
        await wait(2000);
        allElements.extraSpinsToast.classList.add('hidden');
    }
    
    function attachEventListeners() {
        document.querySelectorAll('#language-selector button').forEach(button => {
            button.addEventListener('click', () => setLanguage(button.dataset.lang));
        });

        allElements.loginButton.addEventListener('click', () => {
            const username = allElements.usernameInput.value.trim();
            const email = allElements.emailInput.value.trim();
            if (username === "" || email === "") {
                alert(currentLanguage === 'tr' ? 'Lütfen tüm alanları doldurun.' : 'Please fill in all fields.');
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                alert(currentLanguage === 'tr' ? 'Lütfen geçerli bir e-posta adresi girin.' : 'Please enter a valid email address.');
                return;
            }
            allElements.loginScreen.classList.add('hidden');
            allElements.languageSelector.classList.add('hidden');
            allElements.loadingScreen.classList.remove('hidden');
            allElements.loadingScreen.style.display = 'flex';
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                allElements.progressBar.style.width = `${progress}%`;
                allElements.loadingPercentage.textContent = `${progress}%`;
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        let storedPlayerData = JSON.parse(localStorage.getItem(username));
                        if (!storedPlayerData) {
                            storedPlayerData = { username, email, balance: 5000, lastLogin: new Date().toISOString() };
                            localStorage.setItem(username, JSON.stringify(storedPlayerData));
                        }
                        playerData = storedPlayerData;
                        allElements.playerUsernameDisplay.textContent = playerData.username;
                        allElements.balanceDisplay.textContent = playerData.balance;
                        populateGrid(); 
                        allElements.loadingScreen.classList.add('hidden');
                        allElements.gameScreen.classList.remove('hidden');
                        allElements.gameScreen.style.display = 'flex';
                    }, 500);
                }
            }, 80);
        });

        allElements.betIncreaseButton.addEventListener('click', () => {
            if (isSpinning) return;
            if (currentBetIndex < betLevels.length - 1) {
                currentBetIndex++;
                updateBetDisplay();
            }
        });

        allElements.betDecreaseButton.addEventListener('click', () => {
            if (isSpinning) return;
            if (currentBetIndex > 0) {
                currentBetIndex--;
                updateBetDisplay();
            }
        });

        allElements.spinButton.addEventListener('click', handleNormalSpin);
        
        allElements.buyBonusButton.addEventListener('click', () => {
            if (isSpinning) return;
            const currentBet = betLevels[currentBetIndex];
            const bonusCost = currentBet * 100;
            allElements.bonusCostDisplay.textContent = bonusCost;
            allElements.buyBonusModal.classList.remove('hidden');
            allElements.buyBonusModal.style.display = 'flex';
        });

        allElements.cancelBuyButton.addEventListener('click', () => allElements.buyBonusModal.classList.add('hidden'));
        
        allElements.confirmBuyButton.addEventListener('click', () => {
            allElements.buyBonusModal.classList.add('hidden');
            startBonusRound(true);
        });
        
        allElements.infoButton.addEventListener('click', () => {
            allElements.infoModal.classList.remove('hidden');
            allElements.infoModal.style.display = 'flex';
        });
        
        allElements.closeInfoModalButton.addEventListener('click', () => allElements.infoModal.classList.add('hidden'));
        
        allElements.infoNextButton.addEventListener('click', () => {
            if (infoCurrentPage < infoTotalPages) showInfoPage(infoCurrentPage + 1);
        });
        
        allElements.infoPrevButton.addEventListener('click', () => {
            if (infoCurrentPage > 1) showInfoPage(infoCurrentPage - 1);
        });

        allElements.anteBetCheckbox.addEventListener('change', () => {
            isAnteBetActive = allElements.anteBetCheckbox.checked;
            allElements.buyBonusButton.disabled = isAnteBetActive;
            updateBetDisplay();
        });

        allElements.startBonusButton.addEventListener('click', () => {
            allElements.bonusTriggerModal.classList.add('hidden');
            startBonusRound(false);
        });

        allElements.closeBonusEndButton.addEventListener('click', () => {
            allElements.bonusEndModal.classList.add('hidden');
            setButtonsState(true);
            isSpinning = false;
        });
    }

    // --- BAŞLANGIÇ AYARLARI ---
    attachEventListeners();
    setLanguage(localStorage.getItem('language') || 'en');
    updateBetDisplay();
    populateInfoModal();
});
