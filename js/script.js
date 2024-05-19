document.addEventListener('DOMContentLoaded', () => {
    const stagesWrapper = document.querySelector('.stages-wrapper');
    const stagesItems = stagesWrapper.querySelector('.stages-items');
    const stages = Array.from(stagesWrapper.querySelectorAll('.stages-item')).slice(0, 5);
    const arrowsLeft = stagesWrapper.querySelector('.stages-arrows-left');
    const arrowsRight = stagesWrapper.querySelector('.stages-arrows-right');
    const dotsContainer = stagesWrapper.querySelector('.stages-dots');
    
      //Отключение стрелок на крайних слайдах
    const updateArrows = () => {
        // Проверяем, находимся ли мы на первом слайде
        if (currentSlide === 0) {
            arrowsLeft.style.backgroundColor = 'rgba(214, 214, 214, 1)'; 
            arrowsLeft.style.cursor = 'default';
            arrowsLeft.disabled = true;
        } else {
            arrowsLeft.style.backgroundColor = '';
            arrowsLeft.style.cursor = 'pointer';
            arrowsLeft.disabled = false;
        }

        // Проверяем, находимся ли мы на последнем слайде
        if (currentSlide === 4) { 
            arrowsRight.style.backgroundColor = 'rgba(214, 214, 214, 1)';
            arrowsRight.style.cursor = 'default';
            arrowsRight.disabled = true;
        } else {
            arrowsRight.style.backgroundColor = '';
            arrowsRight.style.cursor = 'pointer';
            arrowsRight.disabled = false;
        }
    };

    let currentSlide = 0;

    // Инициализация точек-индикаторов
    stages.forEach((_, index) => {
        updateArrows(); // Обновляем стрелки
        const dot = document.createElement('button');
        dot.classList.add('dot', 'btn-reset');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const updateSlidePosition = () => {
        const additionalOffset = 20;
        const slideWidth = stagesWrapper.offsetWidth + additionalOffset;
        stagesItems.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        updateDots();
    };
    
    const updateDots = () => {
        dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
        });
    };

    const goToSlide = (index) => {
        currentSlide = index;
        updateSlidePosition();
        updateArrows(); // Обновляем стрелки
    }

    // Переключение слайдов с помощью стрелок
    arrowsLeft.addEventListener('click', () => {
        currentSlide = Math.max(currentSlide - 1, 0);
        updateSlidePosition();
        updateArrows(); // Обновляем стрелки
    });
    
    arrowsRight.addEventListener('click', () => {
        currentSlide = Math.min(currentSlide + 1, stages.length - 1);
        updateSlidePosition();
        updateArrows(); // Обновляем стрелки
    });

    // Начальное обновление позиции, чтобы первый слайд был виден
    updateSlidePosition();
    });
parseInt

    let currentSlide = 0;
    let totalSlides = document.querySelectorAll('.slide');
    let currentSlideElement = document.getElementById('current-slide');
    const totalSlidesElement = document.getElementById('total-slides');
    const prevButton = document.querySelector('.left');
    const nextButton = document.querySelector('.right');
    const member = document.getElementById('member');
    const memberwidth = member.offsetWidth;


    const checkwidth = () => {
        if (document.documentElement.clientWidth >= 768) { 
            totalSlides = document.querySelectorAll('.slide').length -=2;
            totalSlidesElement.textContent = '/'+ (totalSlides+2);
        } else {
            totalSlides = document.querySelectorAll('.slide').length;
            totalSlidesElement.textContent = '/'+ (totalSlides);
        }
    };
    checkwidth();

    function showSlide(index) {
        const slidesContainer = document.querySelector('.slides');
        const translateValue = -(index - 1) * memberwidth +'px';
        slidesContainer.style.transform = 'translateX(' + translateValue + ')';
        if (document.documentElement.clientWidth >= 768) { 
            currentSlideElement.textContent = index + 2;
        } else {
            currentSlideElement.textContent = index;
        }

        nextButton.style.backgroundColor = index === totalSlides ? 'rgba(214, 214, 214, 1)' : '';
        nextButton.disabled = index === totalSlides;

        prevButton.style.backgroundColor = index === 1 ? 'rgba(214, 214, 214, 1)' : '';
        prevButton.disabled = index === 1;
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides || totalSlides;
        showSlide(currentSlide);
    }

    function nextSlide() {
        currentSlide = currentSlide % totalSlides + 1;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 4000);