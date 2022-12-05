const InsertBeforeLoad = async () => {
	const DESCRIPTION_TEXT = document.querySelector('#description-extend > div > div.text').innerHTML;
	const BACKGROUND_AVATAR = document.querySelector('.background-avatar')
	const BACKGROUND_SECTION = document.querySelector('.section-top-background')
	const BACKGROUND_REGEXP = /background:\s*(\d+)(?:,\s*filter:\s*(light|dark|blur|none))?;/i
	const BACKGROUND_DETAILS = BACKGROUND_REGEXP.exec(DESCRIPTION_TEXT)

	if (typeof BACKGROUND_DETAILS == 'object') {
		const FETCH = (await (await fetch(`/game/published/?q=${BACKGROUND_DETAILS[1]}`)).json())
		const IMAGE = FETCH.images.large.replace('cache', 'images').replace('_600x240.jpg', '.png')

		BACKGROUND_AVATAR.style.backgroundImage = `url(${IMAGE})`;

		switch (BACKGROUND_DETAILS[2]) {
			case 'blur':
				BACKGROUND_AVATAR.style.opacity = 'unset';
				BACKGROUND_SECTION.style.backgroundImage = 'none';
				break;
			case 'none':
				BACKGROUND_AVATAR.style.opacity = 'unset';
				BACKGROUND_AVATAR.style.filter = 'none';
				BACKGROUND_SECTION.style.backgroundImage = 'none';
				break;
			case 'dark':
				BACKGROUND_SECTION.style.backgroundImage = 'none';
				break;
		}
	}
};

document.addEventListener('DOMNodeInserted', InsertBeforeLoad);