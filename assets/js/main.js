const menuButton = document.querySelector('.site-header__menu-button');
const navigation = document.querySelector('.site-header__nav');

if (menuButton && navigation) {
    const closeMenu = ({ returnFocus = false } = {}) => {
        menuButton.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
        if (returnFocus) menuButton.focus();
    };

    menuButton.addEventListener('click', () => {
        const willOpen = menuButton.getAttribute('aria-expanded') === 'false';
        menuButton.setAttribute('aria-expanded', String(willOpen));
        navigation.classList.toggle('is-open', willOpen);
    });

    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu({ returnFocus: true });
    });

    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 769px)').matches) closeMenu();
    });
}
