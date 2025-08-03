// Dil metinlerini burada saklayacağız
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
        // GÜNCELLENDİ
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
        // GÜNCELLENDİ
        legal_1: "© 2025 Kyrosil Bonanza. All rights reserved.",
        legal_2: "Kyrosil Bonanza is developed under content and distribution license from Pragmatic Play Ltd., and operates in accordance with Greek national regulations. The game complies with the supervision framework of the Hellenic Gaming Commission (Ε.Ε.Ε.Π.) under Registration ID: EEEP-NPR/2025-0674.",
        legal_3: "No real money is used or won. This is a promotional game for entertainment purposes only."
    }
};

let currentLanguage = 'en'; // Varsayılan dil
let playerData = {}; // Mevcut oyuncu verisini saklamak için

// OYUN SABİTLERİ (YENİ)
const gameGrid = document.getElementById('game-grid');
const gameSymbols = ['Muz', 'Üzüm', 'Karpuz', 'Erik', 'Elma', 'Mavi Şeker', 'Yeşil Şeker', 'Mor Şeker', 'Kırmızı Kalp']; // Örnek semboller

// Sayfadaki metinleri dile göre güncelleyen fonksiyon (Değişiklik yok)
function setLanguage(lang) {
    // ... (Bu fonksiyonun içi aynı)
}

// YENİ: Oyun alanını rastgele sembollerle dolduran fonksiyon
function populateGrid() {
    gameGrid.innerHTML = ''; // Önceki sembolleri temizle
    for (let i = 0; i < 30; i++) { // 6x5 grid için 30 sembol
        const randomSymbol = gameSymbols[Math.floor(Math.random() * gameSymbols.length)];
        const symbolDiv = document.createElement('div');
        symbolDiv.classList.add('symbol');
        symbolDiv.textContent = randomSymbol; // Şimdilik metin olarak ekliyoruz
        // symbolDiv.style.backgroundImage = `url('images/${randomSymbol}.png')`; // Gelecekte böyle olacak
        gameGrid.appendChild(symbolDiv);
    }
}


// Sayfa ilk yüklendiğinde çalışacak kodlar
window.addEventListener('load', () => {
    // ---- Değişkenleri Seçme ----
    const loginScreen = document.getElementById('login-screen');
    const gameScreen = document.getElementById('game-screen');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username-input');
    const playerUsernameDisplay = document.getElementById('player-username');
    const balanceDisplay = document.getElementById('balance-display');
    const betAmountDisplay = document.getElementById('bet-amount'); // Yeni eklendi
    const spinButton = document.getElementById('spin-button'); // Yeni eklendi

    // ---- Dil Ayarları ve Yükleme Ekranı (Değişiklik yok) ----
    // ... (Bu kısımlar aynı)

    // ---- GİRİŞ YAPMA MANTIĞI ----
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
        playerData = storedPlayerData; // Oyuncu verisini global değişkene ata
        
        playerUsernameDisplay.textContent = playerData.username;
        balanceDisplay.textContent = playerData.balance;

        // YENİ: Oyuna başlarken grid'i bir kere doldur
        populateGrid();

        loginScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        gameScreen.style.display = 'flex';
    });

    // ---- YENİ: ÇEVİRME (SPIN) MANTIĞI ----
    spinButton.addEventListener('click', () => {
        const currentBet = parseInt(betAmountDisplay.textContent);

        // Bakiye kontrolü
        if (playerData.balance < currentBet) {
            alert(currentLanguage === 'tr' ? 'Yetersiz bakiye!' : 'Insufficient balance!');
            return;
        }

        // Bahsi düş ve bakiyeyi güncelle
        playerData.balance -= currentBet;
        balanceDisplay.textContent = playerData.balance;
        
        // Oyuncu verisini tarayıcı hafızasında da güncelle
        localStorage.setItem(playerData.username, JSON.stringify(playerData));

        // TODO: Patlama ve kazanç animasyonları buraya gelecek
        
        // Izgarayı yeni sembollerle doldur
        populateGrid();
    });
});
