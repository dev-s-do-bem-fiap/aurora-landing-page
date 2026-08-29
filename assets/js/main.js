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

const comoResolvemosSection = document.querySelector('#como-resolvemos');

if (comoResolvemosSection) {
    const comoResolvemosCarousel = comoResolvemosSection.querySelector('.como-resolvemos__carousel');
    const previousButton = comoResolvemosSection.querySelector('.como-resolvemos__arrow--previous');
    const nextButton = comoResolvemosSection.querySelector('.como-resolvemos__arrow--next');
    const counterCurrent = comoResolvemosSection.querySelector('.como-resolvemos__counter-current');
    const fallbackInstructions = comoResolvemosSection.querySelector('#como-resolvemos-fallback-instructions');
    const slideCount = comoResolvemosCarousel?.querySelectorAll('.como-resolvemos__slide').length ?? 0;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    const disableCarouselButtons = () => {
        if (previousButton) previousButton.disabled = true;
        if (nextButton) nextButton.disabled = true;
    };

    const enableCarouselFallback = () => {
        if (!comoResolvemosCarousel) return;
        comoResolvemosCarousel.setAttribute('role', 'region');
        comoResolvemosCarousel.setAttribute('tabindex', '0');
        comoResolvemosCarousel.setAttribute('aria-describedby', 'como-resolvemos-fallback-instructions');
        if (fallbackInstructions) fallbackInstructions.hidden = false;
        comoResolvemosCarousel.querySelectorAll('.slick-instructions').forEach((instructions) => instructions.remove());
        disableCarouselButtons();
    };

    disableCarouselButtons();

    if (comoResolvemosCarousel && window.jQuery && typeof window.jQuery.fn.slick === 'function' && previousButton && nextButton && counterCurrent) {
        const $carousel = window.jQuery(comoResolvemosCarousel);

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
                comoResolvemosCarousel.removeAttribute('tabindex');
                comoResolvemosCarousel.removeAttribute('aria-describedby');
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
                    instructionsText: 'Use os botões Solução anterior e Próxima solução ou deslize para explorar as cinco soluções.',
                    regionLabel: 'Como a Aurora transforma sinais em decisões',
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

const leadForm = document.querySelector('#lead-form');

if (leadForm) {
    const phoneInput = leadForm.querySelector('#lead-phone');
    const companySizeSelect = leadForm.querySelector('#lead-company-size');
    const formStatus = leadForm.querySelector('.lead-form__status');

    const fieldRules = [
        {
            field: leadForm.querySelector('#lead-name'),
            error: leadForm.querySelector('#lead-name-error'),
            validate: (field) => field.value.trim() ? '' : 'Informe seu nome completo.'
        },
        {
            field: leadForm.querySelector('#lead-role'),
            error: leadForm.querySelector('#lead-role-error'),
            validate: (field) => field.value.trim() ? '' : 'Informe seu cargo.'
        },
        {
            field: leadForm.querySelector('#lead-area'),
            error: leadForm.querySelector('#lead-area-error'),
            validate: (field) => field.value.trim() ? '' : 'Informe sua área de atuação.'
        },
        {
            field: leadForm.querySelector('#lead-email'),
            error: leadForm.querySelector('#lead-email-error'),
            validate: (field) => {
                if (!field.value.trim()) return 'Informe seu e-mail profissional.';
                return field.validity.typeMismatch ? 'Digite um e-mail válido, como nome@empresa.com.' : '';
            }
        },
        {
            field: phoneInput,
            error: leadForm.querySelector('#lead-phone-error'),
            validate: (field) => {
                const digitCount = field.value.replace(/\D/g,'').length;
                return digitCount === 0 || digitCount === 10 || digitCount === 11
                    ? ''
                    : 'Digite um telefone com DDD e 10 ou 11 números.';
            }
        },
        {
            field: leadForm.querySelector('#lead-consent'),
            error: leadForm.querySelector('#lead-consent-error'),
            validate: (field) => field.checked ? '' : 'Confirme o consentimento para prosseguir.'
        }
    ];

    const formatBrazilianPhone = (value) => {
        const digits = value.replace(/\D/g,'').slice(0,11);

        if (!digits) return '';
        if (digits.length <= 2) return `(${digits}`;

        const areaCode = digits.slice(0,2);
        const subscriberNumber = digits.slice(2);

        if (subscriberNumber.length <= 4) return `(${areaCode}) ${subscriberNumber}`;

        const prefixLength = digits.length === 11 ? 5 : 4;
        const prefix = subscriberNumber.slice(0,prefixLength);
        const suffix = subscriberNumber.slice(prefixLength);
        return `(${areaCode}) ${prefix}${suffix ? `-${suffix}` : ''}`;
    };

    const setFieldError = ({ field,error },message) => {
        if (message) {
            error.textContent = message;
            error.hidden = false;
            field.setAttribute('aria-invalid','true');
            field.setAttribute('aria-describedby',error.id);
            return false;
        }

        error.textContent = '';
        error.hidden = true;
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        return true;
    };

    const validateField = (rule) => setFieldError(rule,rule.validate(rule.field));

    const collectLeadData = () => ({
        nome: leadForm.elements.nome.value.trim(),
        cargo: leadForm.elements.cargo.value.trim(),
        area: leadForm.elements.area.value.trim(),
        email: leadForm.elements.email.value.trim(),
        telefone: leadForm.elements.telefone.value,
        numeroColaboradores: leadForm.elements.numero_colaboradores.value,
        consentimentoLgpd: leadForm.elements.consentimento_lgpd.checked
    });

    const handleValidatedLead = (_leadData) => {
        formStatus.dataset.state = 'validated';
        formStatus.textContent = 'Dados validados. O envio será habilitado após a integração do formulário.';
    };

    phoneInput.addEventListener('input',() => {
        phoneInput.value = formatBrazilianPhone(phoneInput.value);
    });

    companySizeSelect.addEventListener('change',() => {
        companySizeSelect.classList.toggle('has-value',Boolean(companySizeSelect.value));
    });

    fieldRules.forEach((rule) => {
        const eventName = rule.field.type === 'checkbox' ? 'change' : 'input';

        rule.field.addEventListener(eventName,() => {
            if (rule.field.hasAttribute('aria-invalid')) validateField(rule);
            if (formStatus.textContent) {
                formStatus.textContent = '';
                formStatus.removeAttribute('data-state');
            }
        });
    });

    leadForm.addEventListener('submit',(event) => {
        event.preventDefault();
        let firstInvalidField = null;

        fieldRules.forEach((rule) => {
            const isValid = validateField(rule);
            if (!isValid && !firstInvalidField) firstInvalidField = rule.field;
        });

        if (firstInvalidField) {
            formStatus.dataset.state = 'error';
            formStatus.textContent = 'Revise os campos indicados antes de continuar.';
            firstInvalidField.focus();
            return;
        }

        handleValidatedLead(collectLeadData());
    });
}

const faqItems = Array.from(document.querySelectorAll('.faq-item'));

faqItems.forEach((item) => {
    item.addEventListener('toggle',() => {
        if (!item.open) return;

        faqItems.forEach((otherItem) => {
            if (otherItem !== item) otherItem.open = false;
        });
    });
});
