const page_url = document.URL;

init();

function setElements() {
    const main = {
        hints_table: ''
    }
}

function stripPageFooter() {
    document.querySelector('.page-footer').innerHTML = '<p class="txt-center">b2b-center.ru &copy 2020</p>';
}

function getElements() {
   return {
       h1: document.querySelector('h1'),
       title: document.querySelector('title')
   }
}

function addStyles() {
    const path = chrome.runtime.getURL('content.css');
    const style = document.createElement('link');
    style.setAttribute('href', path);
    style.setAttribute('rel', 'stylesheet');
    document.querySelector('head').appendChild(style);
}

function stripSiteVersionLabel() {
    const ver = document.querySelector(`.site_version`);
    if (!ver) {
        return;
    }

    if (ver.classList.contains('site_version--local')) {
        ver.innerText = 'Локально';
    } else if (ver.classList.contains('site_version--beta')) {
        ver.innerText = 'Бета версия';
    }
}

function init() {
    if (/.*b2b-center.*help.*/.test(page_url)) {
        tidyUpHintsEditPage();
    }

    if (/.*b2b-center.*admin\/bulletins.*/.test(page_url)) {
        tidyBulletinsPage();
    }

	if (/.*b2b-center.*admin\/firms.*/.test(page_url)) {
		tidyFirmsPage();
	}

	if (/.*b2b-center.*edit_user.*/.test(page_url)) {
		tidyEditUserPage();
	}

	seoAndHeader();
    getRidOfAllBullshit();
    stripSiteVersionLabel();
    stripPageFooter();
    addStyles();
}

function tidyEditUserPage() {
	document.querySelector('#page').classList.add('edit_user');
}

function tidyFirmsPage() {
	document.querySelector('#page').classList.add('firms');
	document.querySelector('h1.h3').innerText = 'Список организаций';
	const div = document.createElement('div');
	const div2 = document.createElement('div');
	const link = document.createElement('a');
	link.classList.add('btn');
	link.innerText = 'Показать больше настроек';
	link.setAttribute('href', '#0');
	div2.setAttribute('class', 'firms-show_additional_search_settings_link');
	div2.appendChild(link);

	div.setAttribute('class', 'firms-additional_search_settings');

	const search_form = document.querySelector('#new_org_form');
	const fieldset = search_form.querySelector('fieldset');
	const fieldset_fields = fieldset.querySelectorAll(':scope > div');

	for (const el of fieldset_fields) {
		if (!el.classList.contains('find_field')) {
			div.appendChild(el);
		}
	}

	link.addEventListener('click', () => {
		div.classList.toggle('firms-additional_search_settings--active');
	});

	search_form.appendChild(div2);
	search_form.appendChild(div);
}

function seoAndHeader() {
    const title = getElements().title;
    const h1 = getElements().h1;
    if (title && h1) {
        title.innerText = `${h1.innerText} - B2B-Center`;
    }
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


	addUsefulLinksToUserMenuInHeader();

	/**
	 * добавить полезные ссылки в меню пользователя
	 */
	function addUsefulLinksToUserMenuInHeader() {
		const host = window.location.hostname;
		const menu = all_user_shit;
		const link_firms = document.createElement('a');
		const link_user_info = document.createElement('a');
		link_firms.setAttribute('href', `/admin/firms.html`);
		link_firms.innerText = 'Список организаций';
		link_user_info.setAttribute('href', `/personal/edit_user.html`);
		link_user_info.innerText = 'Данные пользователя';

		if (menu) {
			menu.appendChild(link_firms);
			menu.appendChild(link_user_info);
		}
	}
}

function tidyUpHintsEditPage() {
    /* Найти элементы */
    /* Форма с хинтами */
    const all_hints = document.querySelectorAll('.hint_list_form tbody tr');
    const hints_content = document.querySelectorAll('.table-filled tbody tr td:last-child');

    /* Перенести индикатор количества найденных подсказок */
    function moveIndicator() {
        const indicator = document.querySelector('.nav-pills ~ p');
        indicator.classList.add('hint_list-indicator');
        const th = document.querySelector('.table-filled thead tr');
        const new_th = document.createElement('th');
        new_th.classList.add('hint_list-indicator_wrapper');
        new_th.appendChild(indicator);
        th.appendChild(new_th);
    }

    moveIndicator();

    /* Для каждой карточки перенести чекбокс в зону контента */
    function moveCardCheckbox() {
        const card = document.querySelector('.card');
        const date = card.innerText.match(/(\d{2}\.){2}\d{4} \d{2}:\d{2}/);
        console.log(date[0]);
        const header = document.createElement('header');
        const footer = document.createElement('footer');
        const content = document.createElement('div');
        const checkbox = document.querySelector(`.card .hint_export_checkbox`);
        document.querySelector('.card td:first-child').remove();
        const body = document.querySelector(`.card .card-body`);
        const title = body.querySelector('a:first-child');
        const btn_export_boi = document.querySelector('.card .hint_export_to_production');
        const btn_export = document.querySelectorAll('.card a')[1];
        const br = document.querySelectorAll('.card br');
        const real_title = document.querySelector('.card-body b');
        footer.classList.add('card-footer');
        header.classList.add('card-header');
        content.classList.add('card-content');
        br.forEach(el => {
            el.remove();
        });
        footer.appendChild(btn_export);
        footer.appendChild(btn_export_boi);
        header.appendChild(checkbox);
        header.appendChild(title);
        content.appendChild(real_title);
        body.prepend(header);
        body.appendChild(content);
        body.appendChild(footer);
    }

    /* Добавить класс контенту каждой карточки хинта*/
    hints_content.forEach(el => {
        el.classList.add('card-body');
        el.querySelectorAll('a')[0].classList.add('card-title');
    });

	document.querySelector('h1.h3').innerText = 'Хинты';
	document.querySelector('#xtbody tr:first-child .fname').innerText = 'Искать по тексту';
	document.querySelector('#xtbody tr:nth-child(3) .fname').innerText = 'Искать по имени хинта';
	document.querySelector('title').innerText = 'Редактирование хинтов - Локально - B2B-Center';
	document.querySelector('#page').classList.add('hint_edit');
	document.querySelector('.hint_edit .form_thead_title').remove();

	function makeThingsSticky() {
	    const table = document.querySelector('.hint_edit .table-filled');
	    const selectAll = document.querySelector('.hint_edit .table-filled ~ p');
	    const action = document.querySelector('.hint_edit .table-filled ~ p + p');
	    let newDiv = document.createElement('div');
	    newDiv.setAttribute('class', 'sticky_things');
	    newDiv.appendChild(selectAll);
	    newDiv.appendChild(action);
	    table.appendChild(newDiv);
    }

    makeThingsSticky();

    const hint_export_boi = document.querySelectorAll('.hint_export_to_production');
    hint_export_boi.forEach(el => {
        if (el.classList.contains('hint_edit-span-lang')) {
            el.classList.remove('hint_edit-span-lang');
        }
        el.classList.add('btn', 'card-btn');
    });

    all_hints.forEach(hint => {
        hint.classList.add('card');
        const hint_export_btn = hint.querySelectorAll('a');

        // const hint_content = hint.innerText;
        // const date = hint_content.match(/(\d{2}\.){2}\d{4} \d{2}:\d{2}/);
        // hint_content.replace(/(\d{2}\.){2}\d{4} \d{2}:\d{2}/g, '');
        // const date_container = document.createElement('span');
        // hint.appendChild(date_container);
        // date_container.innerText = date[0];
        hint_export_btn[1].classList.add('btn', 'card-btn');
    });

	// Найти все элементы с красным инлайновым стилем
	const spans = document.querySelectorAll('.hint_edit .hint_list_form td span');
	spans.forEach(span => {
		if (span.hasAttribute('style')) {
			span.classList.add('hint_edit-span-lang');
		}
	});

	const find_btn = document.querySelector('.hint_edit [value="Найти >>"]');

	if (find_btn) {
		find_btn.classList.add('btn-primary');
		find_btn.value = 'Найти';
	}

	const form_label_create_hint = document.querySelectorAll('.hint_edit .form-horizontal .label-ctrl');

	form_label_create_hint.forEach(label => {
		if (label.innerText === 'Введите ключевое слово для новой подсказки:') {
			label.style.display = 'none';
		}
	});

	const new_window_disclaimer_hint_edit = document.querySelectorAll('.form-desc');

	new_window_disclaimer_hint_edit.forEach(disclaimer => {
		if (disclaimer.innerText === '(в новом окне)') {
			disclaimer.style.display = 'none';
		}
	});

	for (const el of document.querySelectorAll('.card-body')) {
		if (!el.hasAttribute('style')) {
			el.innerHTML = el.innerHTML.replace(/ \/ /g,'');
		}
	}

    moveCardCheckbox();
}

function tidyBulletinsPage() {
    document.querySelector('h1.h3').innerText = 'Рассылка бюллетеней';
    document.querySelector('#page').classList.add('bulletins');
}
