// Dil ve sembol gibi genel sabitler
const languageStrings = {
    tr: {
        loading_text: "Oyun Yükleniyor...",
        login_title: "Oyuna Giriş",
        login_desc: "Başlamak için bilgilerinizi girin.",
        username_placeholder: "Kullanıcı Adı",
        email_placeholder: "E-posta Adresi", // YENİ
        login_button: "Oyuna Başla",
        how_to_play_title: "Nasıl Oynanır", // YENİ
        how_to_play_desc: "Amaç, başlangıçtaki 5000 Kyroslira'yı çevirmeler yaparak veya bonus satın alarak katlamaktır. Kazanmak için 8 veya daha fazla aynı sembolü eşleştirin!", // YENİ
        rewards_title: "Ödüller", // YENİ
        rewards_desc: "Belirtilen bakiye hedeflerine ulaşın ve ödülünüzü almak için bizimle iletişime geçin! (Ödüller yakında açıklanacak).", // YENİ
        // ... (diğer metinler aynı)
    },
    en: {
        loading_text: "Game Loading...",
        login_title: "Game Login",
        login_desc: "Enter your details to start.",
        username_placeholder: "Username",
        email_placeholder: "Email Address", // NEW
        login_button: "Start Game",
        how_to_play_title: "How to Play", // NEW
        how_to_play_desc: "The goal is to increase your starting 5000 Kyroslira by spinning or buying bonuses. Match 8 or more symbols to win!", // NEW
        rewards_title: "Rewards", // NEW
        rewards_desc: "Reach the specified balance milestones and contact us to claim your prize! (Prizes to be announced soon).", // NEW
        // ... (other texts are the same)
    }
    // NOT: Diğer (legal_1 vb.) metin anahtarlarını kısalık için sildim ama sizinkinde duruyor olmalı.
};
// ... (languageStrings objesinin kalanı ve gameSymbols aynı)

// Sayfa tamamen yüklendiğinde tüm kodlar buradan başlasın
window.addEventListener('load', () => {

    // ---- Tüm HTML Elementlerini Güvenli Bir Şekilde Seç ----
    const loadingScreen = document.getElementById('loading-screen');
    const loginScreen = document.getElementById('login-screen');
    const gameScreen = document.getElementById('game-screen');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username-input');
    const emailInput = document.getElementById('email-input'); // YENİ
    // ... (diğer element seçimleri aynı)

    // ... (setLanguage ve populateGrid fonksiyonları aynı)

    // ---- İlk Kurulum ve Olay Dinleyicileri ----

    // Dil Ayarları (aynı)
    // ...

    // GİRİŞ YAPMA MANTIĞI (TAMAMEN YENİLENDİ)
    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();

        // Doğrulama
        if (username === "" || email === "") {
            alert(currentLanguage === 'tr' ? 'Lütfen tüm alanları doldurun.' : 'Please fill in all fields.');
            return;
        }
        if (!email.includes('@')) {
            alert(currentLanguage === 'tr' ? 'Lütfen geçerli bir e-posta adresi girin.' : 'Please enter a valid email address.');
            return;
        }

        // 1. Giriş ekranını gizle, YÜKLEME EKRANINI GÖSTER
        loginScreen.classList.add('hidden');
        loadingScreen.classList.remove('hidden');
        loadingScreen.style.display = 'flex';


        // 2. Yükleniyormuş gibi yap ve sonra oyunu başlat
        setTimeout(() => {
            let storedPlayerData = JSON.parse(localStorage.getItem(username));
            if (!storedPlayerData) {
                storedPlayerData = {
                    username: username,
                    email: email, // E-postayı kaydet
                    balance: 5000,
                    lastLogin: new Date().toISOString()
                };
                localStorage.setItem(username, JSON.stringify(storedPlayerData));
            }
            playerData = storedPlayerData;

            playerUsernameDisplay.textContent = playerData.username;
            balanceDisplay.textContent = playerData.balance;

            populateGrid();

            // 3. Yükleme ekranını gizle, OYUN EKRANINI GÖSTER
            loadingScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            gameScreen.style.display = 'flex';
        }, 2000); // 2 saniye bekleme süresi
    });

    // Çevirme (Spin) Mantığı (aynı)
    // ...
});
