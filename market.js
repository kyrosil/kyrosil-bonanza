const rewards = [
    { id: 1, name: 'THY Yurtiçi Uçuş Bileti', price: 350000, img: 'scatter.png', desc: 'Türk Hava Yolları ile tek yön YURTİÇİ uçuş bileti. İstanbul, Ankara, İzmir, Antalya gibi şehirlerde geçerlidir.' },
    { id: 2, name: 'Aegean Airlines Avrupa İçi Gidiş-Dönüş Bileti', price: 500000, img: 'scatter.png', desc: 'Aegean Airlines ile Yunanistan çıkışlı Schengen içi bir destinasyona gidiş-dönüş uçuş bileti.' },
    { id: 3, name: 'Starbucks €25 Dijital Hediye Kartı', price: 250000, img: 'scatter.png', desc: 'Avrupa\'daki Starbucks mağazalarında geçerli 25 Euro’luk dijital kod.' },
    { id: 4, name: 'Burger King 250₺ Tıkla Gelsin Bakiyesi', price: 150000, img: 'scatter.png', desc: 'Türkiye genelindeki Tıkla Gelsin uygulamasında geçerli 250 TL sipariş bakiyesi.' },
    { id: 5, name: 'Carrefour €20 Alışveriş Kartı', price: 180000, img: 'scatter.png', desc: 'Carrefour’un Avrupa şubelerinde geçerli 20 Euro’luk alışveriş kodu.' },
    { id: 6, name: 'Kyrosil Özel T-Shirt', price: 120000, img: 'scatter.png', desc: 'Kyrosil logosuyla özel üretilmiş pamuklu T-shirt. Siyah ve beyaz seçenekli.' },
    { id: 7, name: 'Kyrosil Hoodie (Kapüşonlu)', price: 220000, img: 'scatter.png', desc: 'Kalın kumaş, siyah renkte, Kyrosil logolu unisex hoodie.' },
    { id: 8, name: 'Mavi 200₺ Hediye Çeki', price: 140000, img: 'scatter.png', desc: 'Mavi mağazalarında veya online alışverişte geçerli 200 TL’lik dijital çeki.' },
    { id: 9, name: 'Yunandan Gelsin 1000₺ Alışveriş Hediye Çeki', price: 300000, img: 'scatter.png', desc: 'YunandanGelsin.com’da geçerli 1000 TL’lik alışveriş çeki.' },
    { id: 10, name: 'Spotify Premium – 6 Aylık Avrupa Lisansı', price: 200000, img: 'scatter.png', desc: 'Avrupa\'da geçerli 6 aylık bireysel Spotify Premium kodu.' },
    { id: 11, name: 'CarrefourSA 150₺ Dijital Alışveriş Kartı', price: 100000, img: 'scatter.png', desc: 'CarrefourSA mağaza ve online alışverişte geçerli 150 TL\'lik bakiye kartı.' },
    { id: 12, name: 'Starbucks Türkiye 200₺ Dijital Kod', price: 125000, img: 'scatter.png', desc: 'Starbucks Türkiye uygulamasında geçerli 200 TL’lik hediye kodu.' },
    { id: 13, name: 'Burger King 100₺ Tıkla Gelsin Bakiyesi', price: 75000, img: 'scatter.png', desc: 'Tıkla Gelsin siparişlerinde geçerli 100 TL’lik dijital bakiye.' },
    { id: 14, name: 'THY Avrupa Gidiş-Dönüş Uçuş Bileti', price: 500000, img: 'scatter.png', desc: 'Türk Hava Yolları ile Avrupa şehirlerinden birine gidiş-dönüş ekonomi sınıfı uçuş.' },
    { id: 15, name: 'Adidas 50 Euro (veya 3000₺) Hediye Çeki', price: 480000, img: 'scatter.png', desc: 'Adidas mağaza ve online alışverişlerde geçerli 50 Euro (Avrupa) veya 3000 TL (Türkiye) değerinde hediye çeki.' }
];

let playerData = {};

window.addEventListener('load', () => {
    const marketContainer = document.getElementById('market-container');
    const usernameDisplay = document.getElementById('market-username');
    const balanceDisplay = document.getElementById('market-balance');
    
    // 1. URL'den kullanıcı adını al
    const params = new URLSearchParams(window.location.search);
    const username = params.get('user');

    if (!username) {
        alert('Player not found! Returning to game.');
        window.location.href = 'index.html';
        return;
    }
    
    // 2. localStorage'dan oyuncu verisini çek
    const storedData = localStorage.getItem(username);
    if (!storedData) {
        alert('Player data not found! Returning to game.');
        window.location.href = 'index.html';
        return;
    }
    
    playerData = JSON.parse(storedData);
    
    // 3. Arayüzü güncelle
    usernameDisplay.textContent = playerData.username;
    updateBalanceDisplay();
    renderMarket();

    // 4. Satın alma olayını dinle
    marketContainer.addEventListener('click', (event) => {
        if (!event.target.matches('.item-buy-button')) return;

        const button = event.target;
        const rewardId = parseInt(button.dataset.rewardId);
        const reward = rewards.find(r => r.id === rewardId);
        
        if (button.disabled || !reward) return;

        if (playerData.balance >= reward.price) {
            playerData.balance -= reward.price;
            
            // Satın alma geçmişini ekle (opsiyonel ama güzel)
            if (!playerData.purchaseHistory) {
                playerData.purchaseHistory = [];
            }
            playerData.purchaseHistory.push({
                item: reward.name,
                date: new Date().toISOString()
            });

            localStorage.setItem(playerData.username, JSON.stringify(playerData));

            updateBalanceDisplay();
            renderMarket();

            // Mailto linkini oluştur ve yönlendir
            const recipientEmail = 'kyrosilbonanza@kyrosil.eu'; // !!! KENDİ MAİLİNİ YAZ !!!
            const subject = `Kyrosil Bonanza Odul Talebi: ${reward.name}`;
            const body = `Merhaba,\n\nBen ${playerData.username} (e-posta: ${playerData.email}).\n\nMarketten "${reward.name}" odulunu satin aldim. Gereginin yapilmasini rica ederim.\n\nTesekkurler.`;
            
            window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        } else {
            alert('Yetersiz Bakiye!');
        }
    });

    function updateBalanceDisplay() {
        balanceDisplay.textContent = Math.round(playerData.balance);
    }

    function renderMarket() {
        marketContainer.innerHTML = '';
        rewards.forEach(reward => {
            const item = document.createElement('div');
            item.classList.add('market-item');

            item.innerHTML = `
                <img src="${reward.img}" alt="${reward.name}">
                <h3>${reward.name}</h3>
                <p class="item-desc">${reward.desc}</p>
                <div class="item-price">${reward.price.toLocaleString()} Kyroslira</div>
                <button class="item-buy-button" data-reward-id="${reward.id}">Satın Al</button>
            `;

            const buyButton = item.querySelector('.item-buy-button');
            if (playerData.balance < reward.price) {
                buyButton.disabled = true;
            }

            marketContainer.appendChild(item);
        });
    }
});
