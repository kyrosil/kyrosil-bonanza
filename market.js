const rewards = [
    { id: 1, nameKey: 'reward1_name', price: 350000, img: 'scatter.png', descKey: 'reward1_desc', validityKey: 'reward1_validity' },
    { id: 2, nameKey: 'reward2_name', price: 500000, img: 'scatter.png', descKey: 'reward2_desc', validityKey: 'reward2_validity' },
    { id: 3, nameKey: 'reward3_name', price: 250000, img: 'scatter.png', descKey: 'reward3_desc', validityKey: 'reward3_validity' },
    { id: 4, nameKey: 'reward4_name', price: 150000, img: 'scatter.png', descKey: 'reward4_desc', validityKey: 'reward4_validity' },
    { id: 5, nameKey: 'reward5_name', price: 180000, img: 'scatter.png', descKey: 'reward5_desc', validityKey: 'reward5_validity' },
    { id: 6, nameKey: 'reward6_name', price: 120000, img: 'scatter.png', descKey: 'reward6_desc', validityKey: 'reward6_validity' },
    { id: 7, nameKey: 'reward7_name', price: 220000, img: 'scatter.png', descKey: 'reward7_desc', validityKey: 'reward7_validity' },
    { id: 8, nameKey: 'reward8_name', price: 140000, img: 'scatter.png', descKey: 'reward8_desc', validityKey: 'reward8_validity' },
    { id: 9, nameKey: 'reward9_name', price: 300000, img: 'scatter.png', descKey: 'reward9_desc', validityKey: 'reward9_validity' },
    { id: 10, nameKey: 'reward10_name', price: 200000, img: 'scatter.png', descKey: 'reward10_desc', validityKey: 'reward10_validity' },
    { id: 11, nameKey: 'reward11_name', price: 100000, img: 'scatter.png', descKey: 'reward11_desc', validityKey: 'reward11_validity' },
    { id: 12, nameKey: 'reward12_name', price: 125000, img: 'scatter.png', descKey: 'reward12_desc', validityKey: 'reward12_validity' },
    { id: 13, nameKey: 'reward13_name', price: 75000, img: 'scatter.png', descKey: 'reward13_desc', validityKey: 'reward13_validity' },
    { id: 14, nameKey: 'reward14_name', price: 500000, img: 'scatter.png', descKey: 'reward14_desc', validityKey: 'reward14_validity' },
    { id: 15, nameKey: 'reward15_name', price: 480000, img: 'scatter.png', descKey: 'reward15_desc', validityKey: 'reward15_validity' },
];

let playerData = {};
let languageStrings = {};
let currentLanguage = 'en';

window.addEventListener('load', () => {
    const marketContainer = document.getElementById('market-container');
    const usernameDisplay = document.getElementById('market-username');
    const balanceDisplay = document.getElementById('market-balance');
    
    // 1. Gerekli verileri al
    const params = new URLSearchParams(window.location.search);
    const username = params.get('user');
    currentLanguage = params.get('lang') || 'en';
    
    const storedStrings = localStorage.getItem('languageStrings');
    languageStrings = storedStrings ? JSON.parse(storedStrings) : {};

    if (!username) {
        alert('Player not found! Returning to game.');
        window.location.href = 'index.html';
        return;
    }
    
    const storedData = localStorage.getItem(username);
    if (!storedData) {
        alert('Player data not found! Returning to game.');
        window.location.href = 'index.html';
        return;
    }
    
    playerData = JSON.parse(storedData);
    
    // 2. Arayüzü dile göre güncelle
    updateUIText();
    renderMarket();

    // 3. Satın alma olayını dinle
    marketContainer.addEventListener('click', (event) => {
        if (!event.target.matches('.item-buy-button')) return;

        const button = event.target;
        const rewardId = parseInt(button.dataset.rewardId);
        const reward = rewards.find(r => r.id === rewardId);
        
        if (button.disabled || !reward) return;

        if (playerData.balance >= reward.price) {
            playerData.balance -= reward.price;
            
            if (!playerData.purchaseHistory) {
                playerData.purchaseHistory = [];
            }
            const rewardName = languageStrings[currentLanguage][reward.nameKey];
            playerData.purchaseHistory.push({
                item: rewardName,
                date: new Date().toISOString()
            });

            localStorage.setItem(playerData.username, JSON.stringify(playerData));

            updateUIText();
            renderMarket();

            const recipientEmail = 'kyrosilbonanza@kyrosil.eu'; // !!! KENDİ MAİLİNİ YAZ !!!
            const subject = `Kyrosil Bonanza Odul Talebi: ${rewardName}`;
            const body = `Merhaba,\n\nBen ${playerData.username} (e-posta: ${playerData.email}).\n\nMarketten "${rewardName}" odulunu satin aldim. Gereginin yapilmasini rica ederim.\n\nTesekkurler.`;
            
            window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        } else {
            alert(languageStrings[currentLanguage].insufficient_balance || 'Insufficient Balance!');
        }
    });

    function updateUIText() {
        usernameDisplay.textContent = playerData.username;
        balanceDisplay.textContent = Math.round(playerData.balance);
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.dataset.key;
            if (languageStrings[currentLanguage] && languageStrings[currentLanguage][key]) {
                element.textContent = languageStrings[currentLanguage][key];
            }
        });
    }

    function renderMarket() {
        marketContainer.innerHTML = '';
        const lang = currentLanguage;
        rewards.forEach(reward => {
            const item = document.createElement('div');
            item.classList.add('market-item');

            const name = languageStrings[lang][reward.nameKey] || reward.nameKey;
            const desc = languageStrings[lang][reward.descKey] || reward.descKey;
            const validity = languageStrings[lang][reward.validityKey] || reward.validityKey;

            item.innerHTML = `
                <img src="${reward.img}" alt="${name}">
                <h3>${name}</h3>
                <p class="item-desc">${desc}</p>
                <p class="item-validity">${validity}</p>
                <div class="item-price">${reward.price.toLocaleString()} Kyroslira</div>
                <button class="item-buy-button" data-reward-id="${reward.id}">${languageStrings[lang].buy_button || 'Buy'}</button>
            `;

            const buyButton = item.querySelector('.item-buy-button');
            if (playerData.balance < reward.price) {
                buyButton.disabled = true;
            }

            marketContainer.appendChild(item);
        });
    }
});
