/* запись рефки в куки */
const params = new URLSearchParams(document.location.search);
const ref = params.get('ref');
if (ref) {
    const refRegExp = /^\d+$/;
    if (refRegExp.test(ref)) {
        let date = new Date(Date.now() + 31557600e3);
        document.cookie = `ref=${ref}; expires=${date}`;
    }
}
/* запись рефки в куки */
// const oneRem =  Number((body.style.fontSize).replace('px', ''));
const pageContainer = document.querySelector('#pageContainer');
const videoWrp = pageContainer.querySelector('#videoWrp');
const video1 = videoWrp.querySelector('#video1');
resizeVideoFrame();
const header = document.querySelector('#testHeader');
const navigation = header.querySelector('#navigation');
const burger = header.querySelector('#burger');
burger.setAttribute('data-state', 'close'); // initial state
const mobileMaxWidth = 768; //px
const burgerSubscribersFns = [];
burgerSubscribersFns.push(mobileNavigationHandler);
const contentElements = document.querySelectorAll('.content-block .content');
const roundedCornersItem = pageContainer.querySelector('#rounded-corners-item');
addRoudedCornersForElement(roundedCornersItem, { tLeft: true, bRight: true });
const pretestingForm = pageContainer.querySelector('#pretestingForm');
pretestingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(pretestingForm);
    let values = [];
    for (const [key, value] of formData) {
        if (key !== 'age' && key !== 'gender') {
            values.push(value);
        }
    }
    openModal('pretesting', { age: formData.get('age'), gender: formData.get('gender'), problemsListKeys: values });
});
const programsResultBtn = pageContainer.querySelector('#programsResultBtn');
programsResultBtn.addEventListener('click', () => {
    const index = pageContainer.querySelector('#omegaIndex').value;
    if (index) {
        openModal('correctionPrograms', { index });
    }
})
const stagesWrp = pageContainer.querySelector('.stages-wrp');
const stages = Array.from(stagesWrp.querySelectorAll('.stage'));
stagesWrp.addEventListener('click', stagesClickHandler);

function resizeVideoFrame() {
    const { width } = videoWrp.getBoundingClientRect();
    video1.setAttribute('width', width);
    video1.setAttribute('height', (width) * 0.5625);
}

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

        const p1 = new Promise(function (resolve) {
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
                description.style.display = 'flex';
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
// const checkboxWrps = document.querySelectorAll('[data-type="checkbox-wrp"]');
// checkboxWrps.forEach(ch => ch.addEventListener('click', checkboxClickHandler));

// function checkboxClickHandler(e) {
//     if (this?.dataset?.type === 'checkbox-wrp') {
//         e.stopPropagation();
//         const checkbox = this.querySelector('[data-type="checkboxInput"]');
//         const annotation = this.querySelector('[data-type="annotation"]');
//         const annState = annotation?.dataset?.state;
//         if (checkbox) {
//             if (e.target !== checkbox) checkbox.checked = !checkbox.checked;
//             toggleAnnotaion(checkbox, annotation, annState);
//         };
//     }
// }

// function toggleAnnotaion(el, annotation, annotationState) {
//     const paragraphs = annotation.querySelectorAll('p');
//     annotationState === 'close' ? showAnnotation(annotation, paragraphs): hideAnnotation(annotation, paragraphs);
// }

// function showAnnotation(ann, paragraphs) {
//     paragraphs.forEach(p => p.style.display = 'block');
//     ann.style.padding = '.75rem 0';
//     ann.style.opacity = '1';
//     ann.style.height = 'auto';
//     ann.dataset.state = 'expand';
// }

// function hideAnnotation(ann, paragraphs) {
//     paragraphs.forEach(p => p.style.display = 'none');
//     ann.style.padding = '0';
//     ann.style.height = '0'; 
//     ann.style.opacity = '0';
//     ann.dataset.state = 'close';
// }

// const checkbox = checkboxWrps[0].querySelector('[data-type="checkboxInput"]');
// const annotations = document.querySelectorAll('.test-item-annotation');
// annotations.forEach(a => a.style.marginLeft = getComputedStyle(checkbox).width);
/* /Чекбоксы предварительного тестирования */

/* Модалка */
function createModalHtml(data) {
    if (data) {
        // if (data?.age) {
        //     const ageData = data.age[options.age];
        //     const ageDataKeys = Object.keys(ageData);
        //     const ageDataRange = ageDataKeys.find(k => Number(k) === )
        //     result = result + ageData[options.gender];

        //     const problemsListKeys = options.problemsListKeys;
        //     problemsListKeys.forEach(k => {
        //         result = result + data.deficiencySigns[k];
        //     });

        //     return result;
        // }


        if (data?.imgSrc) {
            const modalBodyContent = `<image src="${data.imgSrc}" />`
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
                    <a href="https://shop.vilavi.com/Item/${data.programId}" target="_blank" class="link-btn">${data.buttonContent}</a>
                </div>
            </div>
        `;
        }
        // if (data?.content) {
        //     modalBodyContent = data.content;
        // }

        return `
        <div class="modal-container">
            <div class="close-btn-wrp">
                <div id="modalCloseBtn" class="modal-close-btn">
                    X
                </div>
            </div>
            <div class="modal-body">
                ${data}
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
        age: {
            '18': {
                'male': `<p>Хороший рацион с достаточным количеством Омега-3 жирных кислот укрепляет иммунитет и нервную систему, поддерживает здоровье кожи в подростковом периоде. Омега-3 оказывает благоприятное воздействие на умственную деятельность, концентрацию внимания и память, что облегчит обучение. Кроме того, Омега-3 помогает преодолеть тревожность и беспокойство, улучшает психоэмоциональный фон.</p>`,
                'female': `<p>Хороший рацион с достаточным количеством Омега-3 жирных кислот укрепляет иммунитет и нервную систему, поддерживает здоровье кожи в подростковом периоде. Омега-3 оказывает благоприятное воздействие на умственную деятельность, концентрацию внимания и память, что облегчит обучение. Кроме того, Омега-3 помогает преодолеть тревожность и беспокойство, улучшает психоэмоциональный фон.</p>`
            },
            '40': {
                'male': `<p>Для мужчин Омега-3 жирные кислоты необходимы для профилактики сердечно сосудистых заболеваний, которые могут появиться при повышенных физических, психологических нагрузках и стрессе. Прием Омега-3 для мужчин повышают сексуальную активность и фертильность, регулирует производство множества гормонов, в том числе и тестостерона.</p>`,
                'female': `<p>Рацион, обогащенный омега-3 способствует нормализации гормонального фона, нормализации веса, красоте кожи, ногтей и волос. Омега-3 облегчают симптомы предменструального синдрома, а также жирные кислоты важны в период подготовки (увеличение возможности зачатия) и во время беременности (снижают риск рождения недоношенных детей, способствуют нормальному внутриутробному развитию).</p>`
            },
            '100': {
                'male': `<p>Для мужчин Омега-3 жирные кислоты необходимы для профилактики сердечно сосудистых заболеваний, ишемической болезни сердца. Жирные кислоты повышают эластичность сосудов, уменьшают риск развития тромбоза. А также прием Омега-3 для мужчин улучшает состояние мочеполовой системы.Доказано, что употребление омега-3 жирных кислот уменьшает риск инсульта и деменции.</p>`,
                'female': `<p>Жирные кислоты помогают продлить молодость кожи, снизить уровень "плохого" холестерина, они оказывают поддержку суставам, уменьшают риск проблем с сердцем, защищают от остеопороза, облегчают симптомы менопаузы. Доказано, что употребление омега-3 жирных кислот уменьшает риск инсульта и деменции.</p>`
            }
        },
        deficiencySigns: {
            hormonalImbalances: `<p>Правильный рацион, обогащенный омега-3 способствует нормализации гормонального фона</p>`,
            weightProblems: `<p>Омега-3 способствует восстановлению правильного метаболизма и нормализации веса</p>`,
            jointPain: `<p>Омега-3 обладает определенными свойствами, которые могут помочь при воспалении и сохранить наши суставы здоровыми. Утренняя скованность в суставах может быть показателем более низкого уровня омега-3. Получение достаточного количества омега-3 может помочь остановить воспалительные процессы, которые способствуют разрушению суставной ткани и воспалительной реакции, вызывающей боль.</p>`,
            nervousBreakdowns: `<p>Омега-3 играют значительную роль в функциях нервной системы на протяжении всей жизни человека. Недостаток этих жирных кислот ученые связали с развитием у детей синдрома дефицита внимания и гиперактивности, а у взрослых – даже с возможностью возникновения депрессии.</p>`,
            sleepProblems: `<p>Прием Омега-3 при бессоннице помогает наладить засыпание ночью. Полиненасыщенные жирные кислоты, а именно докозагексаеновая кислота (ДГК), способствуют выработке и поддержанию в крови уровня мелатонина — гормона сна.</p>`,
            concentrationProblems: `<p>Если регулярно употреблять Омега-3, улучшается внимательность, память, концентрация, повышаются умственные способности. Омега-3 жизненно важны для здоровья и функционирования мозга, поэтому, если вы обнаружите, что не можете сосредоточиться или выполнить задачи, которые вы обычно могли бы выполнить без проблем, это может быть еще одним признаком дефицита омега-3.</p>`,
            chronicFatigue: `<p>Жирные кислоты омега-3 улучшают способности к концентрации и могут уменьшить усталость</p>`,
            bloodPressureProblems: `<p>Омега-3 жирные кислоты обладают антитромботическим эффектом, поэтому особенно важны при повышенном давлении. Они способствуют разжижению крови, борются с вредным холестерином, очищают стенки сосудов, благотворно влияют на работу сердца и способствуют нормализации давления.</p>`,
            heartAttack: `<p>Прием омега-3 может помочь поддерживать здоровье сердца и мозга  и снизить риск развития сердечно-сосудистых заболеваний, а также профилактирует нарушения кровоснабжений головного мозга.</p>`,
            reproductiveProblems: `<p>Омега-3 повышает шанс зачать и родить доношенного ребёнка. У женщин полиненасыщенные жирные кислоты снижают риски невынашивания и повышают шансы рождения здорового ребёнка. У мужчин улучшается качество спермы — подвижность, количество и концентрация сперматозоидов</p>`,
            problematicHair: `<p>Жирные кислоты Омега-3 помогают в борьбе против сухости, дряблости, закрытых комедонов и других распространенных проблем дермы. Жирные кислоты омега-3 также укрепляют волосы, повышают их упругость, волосы становятся мягче и меньше ломаются. Наконец, омега-3 придает волосам блеск, ведь здоровые волосы выглядят сияющими. Также Омега-3 оказывает положительное влияние на состояние ногтей, повышая их прочность. В результате они менее склонны к расслоению и меньше ломаются.</p>`
        },
    },
    correctionPrograms: {
        '3.9': {
            title: 'Индекс меньше 4,0 % Высокий риск',
            imgSrc: './img/high-risk.jpg',
            buttonContent: 'Купить протокол коррекции',
            programId: 67636
        },
        '5.9': {
            title: 'Индекс 4-5,9% Риск выше среднего',
            imgSrc: './img/above-average-risk.jpg',
            buttonContent: 'Купить протокол коррекции',
            programId: 67616
        },
        '7.9': {
            title: 'Индекс от 6 до 7,9 % Средний риск',
            imgSrc: './img/average-risk.jpg',
            buttonContent: 'Купить протокол коррекции',
            programId: 67596
        },
        '8.0': {
            title: 'Индекс больше 8% Низкий риск',
            imgSrc: './img/low-risk.jpg',
            buttonContent: 'Купить протокол коррекции',
            programId: 67576
        }
    }
}

function selectModalData(name, options) {
    const dataGroup = modalsData[name];
    const dataGroupKeys = Object.keys(dataGroup);

    if (name === 'pretesting') {
        let htmlData = '';
        const ageData = dataGroup.age;
        const ageDataKeys = Object.keys(ageData);
        const ageDataRangeKey = ageDataKeys.find(k => Number(options.age) < Number(k));
        const ageDataRange = ageData[ageDataRangeKey];
        htmlData = htmlData + ageDataRange[options.gender];

        if (options?.problemsListKeys.length > 0) {
            const problemsListKeys = options?.problemsListKeys;
            const deficiencySigns = dataGroup.deficiencySigns;
            problemsListKeys.forEach(key => {
                htmlData = htmlData + (deficiencySigns[key]);
            });
            htmlData = htmlData + `
            <p>Отмеченные признаки могут говорить о том, что у вас есть риск дефицита омега-3. Для того, чтобы узнать точный показатель пройдите тест омега-3 индекс и по его результатам вам будет подобрана персональная программа коррекции.</p>`;
        }

        return htmlData;
    }

    let key;
    if (options) {
        key = dataGroupKeys.find((k, i) => {
            if (name === 'correctionPrograms' && (i === dataGroupKeys.length - 1)) {
                return options.index >= parseFloat(k);
            }
            return options.index <= parseFloat(k);
        });
    }

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
            corners = { tLeft: false, bLeft: false, tRight: false, bRight: false, ...corners };
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
//const interestingFact = pageContainer.querySelector('[data-style="four-corners"]');
// addRoudedCornersForElement(interestingFact, { tLeft: true, tRight: true, bLeft: true, bRight: true });
/* /Скругленные углы */

/* Бургер */
function emitBurgerState() { burgerSubscribersFns.forEach(fn => fn()); }

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
    resizeVideoFrame();
};

function start() {
    renderActualNavigation();
    addEventListener('resize', debounce(resizeHandler, 50));
}

start();

const modalContainer = document.querySelector('.modal-container');
const modalClose = document.querySelector('.modal-close');
const btnTrue = document.querySelector('.modal-button__true');
const btnChange = document.querySelector('.modal-button__change');