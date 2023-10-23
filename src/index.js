/* запись рефки в куки */
const params = new URLSearchParams(document.location.search);
const ref = params.get('ref');
if (ref) {
    const refRegExp = /^\d+$/;
    if (refRegExp.test(ref)) {
        let date = new Date(Date.now() + 31557600e3);
        document.cookie = `ref=${ref}; expires=${date}`;
    } else {
        console.log(`ref: ${ref} is not valid`);    
    }
}
/* запись рефки в куки */

const pageContainer = document.querySelector('#pageContainer');
const header = document.querySelector('#testHeader');
const navigation = header.querySelector('#navigation');
const burger = header.querySelector('#burger');
burger.setAttribute('data-state', 'close'); // initial state
const mobileMaxWidth = 768; //px
const burgerSuscribersFns = [];
burgerSuscribersFns.push(mobileNavigationHandler);
const contentElements = document.querySelectorAll('.content-block .content');
const pretestingForm = pageContainer.querySelector('#pretestingForm');
pretestingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(pretestingForm);
    let keysCount = 0;
    for(const key of formData.keys()) {
        keysCount++;
    }
    openModal('pretesting', { index: keysCount });
});
const programsResultBtn = pageContainer.querySelector('#programsResultBtn');
programsResultBtn.addEventListener('click', () => {
    const index = pageContainer.querySelector('#omegaIndex').value;
    openModal('correctionPrograms', { index });
})
const stagesWrp = pageContainer.querySelector('.stages-wrp');
const stages = Array.from(stagesWrp.querySelectorAll('.stage'));
stagesWrp.addEventListener('click', stagesClickHandler);

function stagesClickHandler(e) {    
    const { target } = e;
    const card = target?.dataset?.type === 'card' ? target : target.closest('[data-type="card"]');
    if (card) {
        const iconWrp = card.querySelector('.stage-icon-wrp'); 
        const title = card.querySelector('.stage-title');
        const description = card.querySelector('.stage-description');

        const currentSide = card.dataset.side;
        const cardContentHeight = currentSide === 'front' ? (iconWrp.getBoundingClientRect().height + title.getBoundingClientRect().height) : null;
        if (cardContentHeight) {
            description.style.height = cardContentHeight + 'px';
        }

        const isTurned = card.classList.contains('turned');
        isTurned ? card.classList.remove('turned') : '';
        
        const p1 = new Promise(function(resolve) {
            card.classList.add('clicked');
            setTimeout(() => {
                card.classList.remove('clicked');
                resolve('result');
            }, 175);
        });

        p1.then(() => {
            card.classList.add('turned');
            if (currentSide === 'front') {
                iconWrp.style.display = 'none';
                title.style.display = 'none';
                description.style.display ='flex';
                card.setAttribute('data-side', 'back');
            } else {
                iconWrp.style.display = 'flex';
                title.style.display = 'block';
                description.style.display = 'none';
                card.setAttribute('data-side', 'front');
            }
        });
    }
}


/* Чекбоксы предварительного тестирования */
const checkboxWrps = document.querySelectorAll('[data-type="checkbox-wrp"]');
checkboxWrps.forEach(ch => ch.addEventListener('click', checkboxClickHandler));

function checkboxClickHandler(e) {
    if (this?.dataset?.type === 'checkbox-wrp') {
        e.stopPropagation();
        const checkbox = this.querySelector('[data-type="checkboxInput"]');
        const annotation = this.querySelector('[data-type="annotation"]');
        const annState = annotation.dataset.state;
        if (checkbox) {
            if (e.target !== checkbox) checkbox.checked = !checkbox.checked;
            toggleAnnotaion(checkbox, annotation, annState);
        };
    }
}

function toggleAnnotaion(el, annotation, annotationState) {
    const paragraphs = annotation.querySelectorAll('p');
    annotationState === 'close' ? showAnnotation(annotation, paragraphs): hideAnnotation(annotation, paragraphs);
}

function showAnnotation(ann, paragraphs) {
    paragraphs.forEach(p => p.style.display = 'block');
    ann.style.padding = '.75rem 0';
    ann.style.opacity = '1';
    ann.style.height = 'auto';
    ann.dataset.state = 'expand';
}

function hideAnnotation(ann, paragraphs) {
    paragraphs.forEach(p => p.style.display = 'none');
    ann.style.padding = '0';
    ann.style.height = '0'; 
    ann.style.opacity = '0';
    ann.dataset.state = 'close';
}

const checkbox = checkboxWrps[0].querySelector('[data-type="checkboxInput"]');
const annotations = document.querySelectorAll('.test-item-annotation');
annotations.forEach(a => a.style.marginLeft = getComputedStyle(checkbox).width);
/* /Чекбоксы предварительного тестирования */

/* Модалка */
function createModalHtml(data) {
    if (data) {
        let modalBodyContent;
        if (data?.imgSrc) {
            modalBodyContent = `<image src="${data.imgSrc}" />`
        }
        if (data?.content) {
            modalBodyContent = data.content;
        }
        
        return `
            <div class="modal-container">
                <div class="close-btn-wrp">
                    <div id="modalCloseBtn" class="modal-close-btn">
                        X
                    </div>
                </div>
                <div class="modal-title">
                    <span class="modal-title-content">${data.title}</span>
                </div>
                <div class="modal-body">
                    ${modalBodyContent}
                </div>
                <div class="link-btn-wrp">
                    <a href="" class="link-btn">${data.buttonContent}</a>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="pretesting-modal" id="otest-modal" data-state="close"></div>
        `;
    }
    
}

let modalHTML = createModalHtml();
pageContainer.insertAdjacentHTML('afterend', modalHTML);
const modal = document.querySelector('#otest-modal');

function getModalState() { return modal.dataset.state; };
function setModalState(value) { modal.dataset.state = value; }

function toggleModalState() {
    getModalState() === 'open' ? setModalState('close') : setModalState('open');
}

const modalsData = {
    pretesting: {
        '2.0': {
            title: '0-2 признака:',
            content: `<p>Отмеченные признаки могут говорить о том, что у вас нет дефицита омега-3. Для того, чтобы продолжать поддерживать баланс полиненасыщенных кислот - принимайте Омега-3 NASH.</p>
            <p>А если вы хотите узнать точный показатель - пройдите тест омега-3 индекс и по его результатам вам будет подобрана программа коррекции.</p>`,
            buttonContent: 'Узнать омега-3 индекс'
        },
        '10.0': {
            title: '3-10 признаков:',
            content: `<p>Отмеченные признаки могут говорить о том, что у вас есть дефицит омега-3. Для того, чтобы узнать точный показатель пройдите тест омега-3 индекс и по его результатам вам будет подобрана программа коррекции.</p>`,
            buttonContent: 'Узнать омега-3 индекс'
        },
    },
    correctionPrograms: {
        '3.9': {
            title: 'Индекс меньше 4,0 % Высокий риск',
            imgSrc: './img/high-risk.jpg',
            buttonContent: 'Купить протокол коррекции'
        },
        '5.9': {
            title: 'Индекс 4-5,9% Риск выше среднего',
            imgSrc: './img/above-average-risk.jpg',
            buttonContent: 'Купить протокол коррекции'
        },
        '7.9': {
            title: 'Индекс от 6 до 7,9 % Средний риск',
            imgSrc: './img/average-risk.jpg',
            buttonContent: 'Купить протокол коррекции'
        },
        '8.0': {
            title: 'Индекс больше 8% Низкий риск',
            imgSrc: './img/low-risk.jpg',
            buttonContent: 'Купить протокол коррекции'
        }
    }
}

function selectModalData(name, options) {
    const dataGroup = modalsData[name];
    const dataGroupKeys = Object.keys(dataGroup);
    const key = dataGroupKeys.find((k, i) => {
        // console.log('options index: ', options.index)
        // console.log('key: ', k)
        if (name === 'correctionPrograms' && (i === dataGroupKeys.length - 1)) {
            return options.index >= parseFloat(k);
        }
        return options.index <= parseFloat(k);
    });
    return dataGroup[key];
}

function fillModal(modal, data) {
    modal.innerHtml = createModalHtml(data);
}

function openModal(name, options) {
    const data = selectModalData(name, options);
    modal.insertAdjacentHTML('beforeend', createModalHtml(data));
    const modalCloseBtn = modal.querySelector('#modalCloseBtn');
    modalCloseBtn.addEventListener('click', closeModal);
    
    toggleModalState();
    modal.style.display = 'flex';
    modalCloseBtn.style.transform = 'rotate(0)';
}

function closeModal(e) {
    toggleModalState();
    e.target.style.transform = 'rotate(90deg)';
    setTimeout(() => {
        modal.style.display = 'none';
        modal.innerHTML = '';
    }, 120);
}

// function toggleModal(e) {
//     toggleModalState();
//     const state = getModalState();
//     state === 'open' ? openModal(e) : closeModal(e);
// }
/* /Модалка */

/* FAQ */
const faqList = pageContainer.querySelector('#faq');
const faqItems = faqList.querySelectorAll('[data-type="faq-list-item"]');
faqItems.forEach(item => item.addEventListener('click', faqItemClickHandler));

const rotateElementToBack = (el) => {
    el.style.transform = 'rotate(0)';
}

const rotateElement90Deg = (el) => {
    el.style.transform = 'rotate(90deg)';
}

const showFAQAnswer = (answer, paragraphs) => {
    paragraphs.forEach(p => p.style.display = 'block');
    answer.style.padding = '2rem 0';
    answer.style.opacity = '1';
    answer.style.height = 'auto';
}

const hideFAQAnswer = (answer, paragraphs) => {
    paragraphs.forEach(p => p.style.display = 'none');
    answer.style.padding = '0';
    answer.style.height = '0';
    answer.style.opacity = '0';
}

const expandFAQItem = (roatableEl, answer, paragraphs) => {
    rotateElement90Deg(roatableEl);
    showFAQAnswer(answer, paragraphs);
}

const collapseFAQItem = (roatableEl, answer, paragraphs) => {
    rotateElementToBack(roatableEl);
    hideFAQAnswer(answer, paragraphs);
}

function toggleFAQItem(newState, faqItem) {
    const rotatableLine = faqItem.querySelector('[data-type="rotatable"]');
    const answer = faqItem.querySelector('[data-type="answer"]');
    const paragraphs = answer.querySelectorAll('p');
    newState === 'expand' ? expandFAQItem(rotatableLine, answer, paragraphs) : collapseFAQItem(rotatableLine, answer, paragraphs);
}

function faqItemClickHandler(e) {
    if (this?.dataset?.type === 'faq-list-item') {
        e.stopPropagation();
        this.dataset.state = this.dataset.state === 'collapse' ? 'expand' : 'collapse';
        toggleFAQItem(this.dataset.state, this);
    }
}
/* /FAQ */

/* Видео */
const createPlayBtnEl = () => {
    const btnWrp = document.createElement('div');
    btnWrp.classList.add('play-btn-wrp');
    btnWrp.setAttribute('data-type', 'playBtnWrp');
    const btn = document.createElement('img');
    btn.classList.add('play-btn');
    btn.setAttribute('src', './img/play.svg');
    btnWrp.insertAdjacentElement('beforeend', btn);

    return btnWrp;
}

const addPlayBtnToVideo = (videoWrp, video) => {
    const btn = createPlayBtnEl();
    videoWrp.style.position = 'relative';
    videoWrp.insertAdjacentElement('beforeend', btn);
    btn.addEventListener('click', () => {
        video.play();
    });
}

const videoBlocks = pageContainer.querySelectorAll('[data-type="video"]');

function videoPlayHandler(e) {
    const { target } = e;
    const btnWrp = target.parentNode.querySelector('[data-type="playBtnWrp"]');
    btnWrp.style.display = 'none';
}

function videoPauseHandler(e) {
    const { target } = e;
    showPlayBtn(target.parentNode.querySelector('[data-type="playBtnWrp"]'));
}

videoBlocks.forEach(v => {
    const videoWrp = v.closest('[data-type="videoWrp"]');
    addPlayBtnToVideo(videoWrp, v);
    v.addEventListener('pause', videoPauseHandler);
    v.addEventListener('play', videoPlayHandler);
});

function showPlayBtn(btnWrp) {
    btnWrp.style.display = 'block';
}
/* /Видео */

/* Скругленные углы */
function addRoudedCornersForElement(el, corners, offset = 0) {
    if (el) {
        if (el instanceof HTMLElement) {
            el.style.position = 'relative';
            corners = {tLeft: false, bLeft: false, tRight: false, bRight: false, ...corners};
            const keys = Object.keys(corners);
            if (keys.length > 0) {
                keys.forEach(k => {
                    if (corners[k] === true) {
                        const img = document.createElement('img');
                        let pathToImg = './img/{name}-rounded-corner.svg';
                        switch (k) {
                            case 'tLeft':
                                pathToImg = pathToImg.replace('{name}', 'top-left'); 
                                img.style.cssText = offset !== 0 
                                    ? `position: absolute; left: ${offset}px; top: ${offset}px; width: unset;` 
                                    : "position: absolute; left: 0; top: 0; width: unset;";
                                break;
                            case 'bLeft':
                                pathToImg = pathToImg.replace('{name}', 'bottom-left');
                                img.style.cssText = offset !== 0 
                                    ? `position: absolute; left: ${offset}px; bottom: ${offset}px; width: unset;`
                                    : "position: absolute; left: 0; bottom: 0; width: unset;";
                                break;
                            case 'tRight':
                                pathToImg = pathToImg.replace('{name}', 'top-right');
                                img.style.cssText = offset !== 0 
                                    ? `position: absolute; right: ${offset}px; top: ${offset}px; width: unset;`
                                    : "position: absolute; right: 0; top: 0; width: unset;";
                                break;
                            default:
                                pathToImg = pathToImg.replace('{name}', 'bottom-right');
                                img.style.cssText = offset !== 0 
                                    ? `position: absolute; right: ${offset}px; bottom: ${offset}px; width: unset;`
                                    : "position: absolute; right: 0; bottom: 0; width: unset;";
                                break;
                        }

                        img.setAttribute('src', pathToImg);
                        el.insertAdjacentElement('beforeend', img);
                    }
                });
            }
        } else {
            console.error(`The element - "${el}" is not HTML element. Function name is addRoudedCornersForElement.`);
        }
    } else {
        console.error(`The element - "${el}" is not exist. Function name is addRoudedCornersForElement.`);
    }
}

contentElements.forEach(el => addRoudedCornersForElement(el, { tLeft: true, bRight: true }));
const interestingFact = pageContainer.querySelector('[data-style="four-corners"]');
addRoudedCornersForElement(interestingFact, { tLeft: true, tRight: true, bLeft: true, bRight: true });
/* /Скругленные углы */

/* Бургер */
function emitBurgerState() { burgerSuscribersFns.forEach(fn => fn()); }

function getScreenWidth() { return window.screen.availWidth; }

function isMobile() { return getScreenWidth() <= mobileMaxWidth; }

function getBurgerState() { return burger.getAttribute('data-state'); }

function toggleBurgerState() { (burger.setAttribute('data-state', getBurgerState() === 'close' ? 'open' : 'close'), emitBurgerState()); }

function mobileNavigationHandler() { getBurgerState() === 'open' ? showNavigation() : hideNavigation(); }

function moveMobileNavigationListUnderHeader() {
    if (isMobile()) {
        const { bottom: headerBottom } = header.getBoundingClientRect();
        navigation.style.top = headerBottom + 'px';
    }
}

const showNavigation = () => {
    navigation.classList.remove('hide');
    moveMobileNavigationListUnderHeader();
    navigation.classList.add('show');
};

const hideNavigation = () => {
    navigation.classList.remove('show');
    navigation.classList.add('hide');
};

burger.addEventListener('click', () => {
    if (isMobile()) {
        burger.classList.toggle('open');
        toggleBurgerState();
    }
});

const showBurger = () => {
    burger.classList.remove('hide');
    burger.classList.add('show');
};

const hideBurger = () => {
    burger.classList.remove('show');
    burger.classList.add('hide');
};

const renderMobieNavigation = () => {
    hideNavigation();
    showBurger();
    emitBurgerState();
}

const renderDesktopNavigation = () => {
    hideBurger();
    showNavigation();
}

const renderActualNavigation = () => {
    isMobile() ? renderMobieNavigation() : renderDesktopNavigation();
}

/* utils */
function debounce(func, timeout) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), timeout);
    };
}

// function getPromiseFromEvent(item, event) {
//     return new Promise((resolve) => {
//         const listener = () => {
//             item.removeEventListener(event, listener);
//             resolve();
//         }
//         item.addEventListener(event, listener);
//     })
// }

// async function waitForButtonClick() {
//     const div = document.querySelector("div")
//     const button = document.querySelector("button")
//     div.innerText = "Waiting for you to press the button"
//     await getPromiseFromEvent(button, "click")
//     div.innerText = "The button was pressed!"
//   }
/* /utils */

const resizeHandler = () => {
    renderActualNavigation();
};

function start() {
    renderActualNavigation();
    addEventListener('resize', debounce(resizeHandler, 50));
}

start();