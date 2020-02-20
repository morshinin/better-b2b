const page_url = document.URL;

init();

function addStyles() {
    const path = chrome.runtime.getURL('content.css');
    const style = document.createElement('link');
    style.setAttribute('href', path);
    style.setAttribute('rel', 'stylesheet');
    document.querySelector('head').appendChild(style);
}

function stripSiteVersionLabel() {
    const strip = document.querySelector('.site_version--local');
    if (strip) {
        strip.innerText = 'Локально';
    }
}

function init() {
    seoAndHeader();
    getRidOfAllBullshit();
    stripSiteVersionLabel();
    addStyles();
}

function seoAndHeader() {
    document.querySelector('title').innerText = `${document.querySelector('h1').innerText} - Локально - B2B-Center`;
    document.querySelector('.slide_down-content .inner .afake').after(document.querySelector('.header-nav-links'));
    document.querySelector('.header-title-platform').remove();
    document.querySelector('.header-logo').remove();
    document.querySelector('.header-services-link > span').innerHTML = '';

    for (const el of document.querySelectorAll('.header-services a')) {
        const ico = el.querySelector('.header-services-ico');
        if (ico) {
            ico.remove();
        }
    }
}

function getRidOfAllBullshit() {
    const user_ico = document.createElement('div');
    const all_user_shit = document.createElement('div');

    user_ico.setAttribute('class', 'header-user_ico');
    all_user_shit.setAttribute('class', 'header-all_user_shit');

    const main_row = document.querySelector('.header-main-left');
    all_user_shit.appendChild(document.querySelector('#ph-user-name-panel'));
    all_user_shit.appendChild(document.querySelector('#ph-user-panel'));
    all_user_shit.appendChild(document.querySelector('#ph-header-bottom-panel'));

    main_row.before(all_user_shit);
    main_row.before(user_ico);

    user_ico.addEventListener('click', () => {
        all_user_shit.classList.toggle('all_user_shit--active');
    });
}


