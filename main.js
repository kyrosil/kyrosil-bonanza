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
        buy_bonus_button: "BONUS SATIN AL (2000)"
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
        buy_bonus_button: "BUY BONUS (2000)"
    }
};

let currentLanguage = 'en'; // Varsayılan dil

// Sayfadaki metinleri dile göre güncelleyen fonksiyon
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang); // Dili hafızaya kaydet

    // Aktif dil butonunu stillendir
    document.querySelectorAll('#language-selector button').forEach(button => {
        button.classList.remove('active');
        if (button.dataset.lang === lang) {
            button.classList.add('active');
        }
    });

    // data-key olan tüm elementleri bul
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.dataset.key;
        if (languageStrings[lang][key]) {
            element.textContent = languageStrings[lang][key];
        }
    });

    // placeholder gibi özel durumlar için
    document.querySelectorAll('[data-key-placeholder]').forEach(element => {
        const key = element.dataset.keyPlaceholder;
        if (languageStrings[lang][key]) {
            element.placeholder = languageStrings[lang][key];
        }
    });
}


// Sayfa ilk yüklendiğinde çalışacak kodlar
window.addEventListener('load', () => {
    // Ekranları ve elementleri seçelim
    const loadingScreen = document.getElementById('loading-screen');
    const loginScreen = document.getElementById('login-screen');

    // Dil butonlarına tıklama olayını ekle
    document.querySelectorAll('#language-selector button').forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang);
        });
    });

    // Hafızadaki dili kontrol et, yoksa varsayılanı kullan
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

    // Sahte yükleme süresi
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        loginScreen.style.display = 'flex';
    }, 2000);
});
