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

const doresCarousel = document.querySelector('.dores__carousel');

if (doresCarousel) {
    const previousButton = document.querySelector('.dores__arrow--previous');
    const nextButton = document.querySelector('.dores__arrow--next');
    const counterCurrent = document.querySelector('.dores__counter-current');
    const fallbackInstructions = document.querySelector('#dores-fallback-instructions');
    const slideCount = doresCarousel.querySelectorAll('.dores__slide').length;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    const disableCarouselButtons = () => {
        if (previousButton) previousButton.disabled = true;
        if (nextButton) nextButton.disabled = true;
    };

    const enableCarouselFallback = () => {
        doresCarousel.setAttribute('role', 'region');
        doresCarousel.setAttribute('tabindex', '0');
        doresCarousel.setAttribute('aria-describedby', 'dores-fallback-instructions');
        if (fallbackInstructions) fallbackInstructions.hidden = false;
        doresCarousel.querySelectorAll('.slick-instructions').forEach((instructions) => instructions.remove());
        disableCarouselButtons();
    };

    disableCarouselButtons();

    if (window.jQuery && typeof window.jQuery.fn.slick === 'function' && previousButton && nextButton && counterCurrent) {
        const $carousel = window.jQuery(doresCarousel);

        if (!$carousel.hasClass('slick-initialized')) {
            let carouselReady = false;

            const updateCarouselStatus = (currentIndex = 0) => {
                const safeIndex = Math.min(Math.max(currentIndex, 0), slideCount - 1);
                const currentLabel = String(safeIndex + 1).padStart(2, '0');

                if (counterCurrent.textContent !== currentLabel) counterCurrent.textContent = currentLabel;
                previousButton.disabled = safeIndex === 0;
                nextButton.disabled = safeIndex === slideCount - 1;
            };

            $carousel.on('init', (_event, slick) => {
                carouselReady = true;
                doresCarousel.removeAttribute('tabindex');
                doresCarousel.removeAttribute('aria-describedby');
                if (fallbackInstructions) fallbackInstructions.hidden = true;
                updateCarouselStatus(slick.currentSlide);
            });

            $carousel.on('afterChange', (_event, _slick, currentSlide) => {
                updateCarouselStatus(currentSlide);
            });

            previousButton.addEventListener('click', () => {
                if (carouselReady) $carousel.slick('slickPrev');
            });

            nextButton.addEventListener('click', () => {
                if (carouselReady) $carousel.slick('slickNext');
            });

            try {
                $carousel.slick({
                    arrows: false,
                    autoplay: false,
                    dots: false,
                    draggable: true,
                    infinite: false,
                    instructionsText: 'Use os botões Desafio anterior e Próximo desafio ou deslize para explorar os cinco desafios.',
                    regionLabel: 'Desafios que atrasam decisões',
                    rows: 0,
                    slidesToScroll: 1,
                    speed: motionPreference.matches ? 0 : 400,
                    swipe: true,
                    touchMove: true,
                    variableWidth: true
                });

                const updateMotionSpeed = (event) => {
                    if ($carousel.hasClass('slick-initialized')) {
                        $carousel.slick('slickSetOption', 'speed', event.matches ? 0 : 400, false);
                    }
                };

                if (typeof motionPreference.addEventListener === 'function') {
                    motionPreference.addEventListener('change', updateMotionSpeed);
                } else if (typeof motionPreference.addListener === 'function') {
                    motionPreference.addListener(updateMotionSpeed);
                }
            } catch (_error) {
                carouselReady = false;
                if ($carousel.hasClass('slick-initialized')) $carousel.slick('unslick');
                enableCarouselFallback();
            }
        }
    }
}
