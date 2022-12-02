const InsertBeforeLoad = async () => {
	const TEXT_DESCRIPTION   = document.querySelector('#description-extend > div > div.text').innerHTML;
	const BACKGROUND_AVATAR  = document.querySelector('.background-avatar')
	const SECTION_BACKGROUND = document.querySelector('.section-top-background')

	const INDEX_OF_BACKGROUND = TEXT_DESCRIPTION.toLowerCase().indexOf('Background:'.toLowerCase())
	const INDEX_OF_FILTER 	  = TEXT_DESCRIPTION.toLowerCase().indexOf('Filter:'.toLowerCase())

	if (INDEX_OF_BACKGROUND != -1 && INDEX_OF_FILTER != -1) {

		const TEXT 	  = TEXT_DESCRIPTION.slice(INDEX_OF_BACKGROUND, INDEX_OF_FILTER + 13).split(' ')
		const GAME_ID = TEXT[1].replace(',', '')
		const FILTER  = TEXT[3].replace(';', '').toLowerCase()
		const IMAGE   = (await (await fetch(`/game/published/?q=${GAME_ID}`)).json()).images.large.replace('cache', 'images').replace('_600x240.jpg', '.png')

		BACKGROUND_AVATAR.style.backgroundImage = `url(${IMAGE})`;

		switch (FILTER) {
			case 'blur':
				BACKGROUND_AVATAR.style.opacity = 'unset';
				SECTION_BACKGROUND.style.backgroundImage = 'none';
				break;
			case 'none':
				BACKGROUND_AVATAR.style.opacity = 'unset';
				BACKGROUND_AVATAR.style.filter = 'none';
				SECTION_BACKGROUND.style.backgroundImage = 'none';
				break;
			case 'dark':
				SECTION_BACKGROUND.style.backgroundImage = 'none';
				break;
		}

	}
};

document.addEventListener('DOMNodeInserted', InsertBeforeLoad);