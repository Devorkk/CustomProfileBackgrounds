const InsertBeforeLoad = async () => {
	const TEXT_DESCRIPTION = document.querySelector('#description-extend > div > div.text').innerHTML;
	const BACKGROUND_AVATAR = document.querySelector('.background-avatar')
	const SECTION_BACKGROUND = document.querySelector('.section-top-background')

	const INDEX_OF_BACKGROUND = TEXT_DESCRIPTION.indexOf('Background:')
	const INDEX_OF_FILTER = TEXT_DESCRIPTION.indexOf('filter:')

	if (INDEX_OF_BACKGROUND != -1 && INDEX_OF_FILTER != -1) {

		const TEXT = TEXT_DESCRIPTION.slice(INDEX_OF_BACKGROUND, INDEX_OF_FILTER + 13).split(' ')
		const GAME_ID = TEXT[1].replace(',', '')
		const FILTER = TEXT[3].replace(';', '')
		const IMAGE = (await(await fetch(`/game/published/?q=${GAME_ID}`)).json()).images.large.replace('cache', 'images').replace('_600x240.jpg', '.png')
		
		BACKGROUND_AVATAR.style.backgroundImage = `url(${IMAGE})`;

		if (FILTER == 'blur') {
			BACKGROUND_AVATAR.style.opacity = 'unset';
			SECTION_BACKGROUND.style.backgroundImage = 'none';

		} else if (FILTER == 'none') {
			BACKGROUND_AVATAR.style.opacity = 'unset';
			BACKGROUND_AVATAR.style.filter = 'none';
			SECTION_BACKGROUND.style.backgroundImage = 'none';

		} else if (FILTER == 'dark')
			SECTION_BACKGROUND.style.backgroundImage = 'none';

	}
};

document.addEventListener('DOMNodeInserted', InsertBeforeLoad);
