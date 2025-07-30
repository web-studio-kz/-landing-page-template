// Файл: js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Мобильное меню ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('main-nav-mobile'); // Предполагаем, что вы добавили этот ID в HTML

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const isExpanded = mobileNav.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            // INFO: Анимация иконок гамбургера (крестик)
            // Добавьте классы для изменения вида span внутри кнопки
        });
    }

    // --- Переключение темы (если есть кнопка #theme-toggle) ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Проверка сохраненной темы
        const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'theme-dark' : 'theme-light');
        document.body.classList.add(currentTheme);
        if (currentTheme === 'theme-dark') {
            // themeToggle.textContent = '☀️'; // Или иконка
        } else {
            // themeToggle.textContent = '🌙';
        }


        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('theme-dark');
            document.body.classList.toggle('theme-light');

            let theme = 'theme-light';
            if (document.body.classList.contains('theme-dark')) {
                theme = 'theme-dark';
                // themeToggle.textContent = '☀️';
            } else {
                // themeToggle.textContent = '🌙';
            }
            localStorage.setItem('theme', theme);
        });
    }

    // --- Плавный скролл к якорям ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Исключаем пустые якоря или якоря, не предназначенные для скролла
            if (href === '#' || href.startsWith('#!') || !document.querySelector(href)) return;
            
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
            // Закрыть мобильное меню, если оно открыто и ссылка из него
            if (mobileNav && mobileNav.classList.contains('active') && this.closest('.mobile-nav')) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- Обновление года в футере ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Анимация при скролле (Intersection Observer API) ---
    // INFO: Добавьте класс .reveal-on-scroll к элементам, которые должны появляться
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // observer.unobserve(entry.target); // Раскомментируйте, если анимация должна сработать один раз
            } else {
                // entry.target.classList.remove('revealed'); // Если нужно, чтобы при уходе с экрана элемент снова скрывался
            }
        });
    }, { threshold: 0.1 /* Срабатывает, когда 10% элемента видно */ });

    revealElements.forEach(el => revealObserver.observe(el));
    /*
    // CSS для .reveal-on-scroll:
    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .reveal-on-scroll.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    */


    // --- Валидация формы (базовый пример) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Предотвращаем стандартную отправку
            // INFO: Здесь ваша логика валидации полей
            // Пример:
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                alert('Пожалуйста, введите ваше имя.');
                nameInput.focus();
                return false;
            }
            // ...другие проверки...

            // INFO: Если валидация прошла, можно отправить данные через fetch/XMLHttpRequest
            // или просто имитировать отправку
            alert('Форма отправлена (имитация)!');
            this.reset(); // Сбросить форму
        });
    }

    // INFO: Добавьте активный класс для текущего пункта меню при скролле (опционально)
    // Это более сложная задача, требующая отслеживания положения секций
});