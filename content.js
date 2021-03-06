(function() {

	var componentsList,
	    interval = setInterval(domIsReady, 300),
	    ids = [];


	function domIsReady () {
		if (document.readyState === 'complete') {
			clearInterval(interval);
			setTimeout(function() {
				toggleComponents(true);
			}, 1000)
		}
	}


	function toggleComponents(state) {

		componentsList = Array.prototype.slice.call(document.querySelectorAll('.js-mb-component'));

		chrome.runtime.sendMessage('refresh');

		chrome.extension.onMessage.addListener(function (message) {

			if (message === 'giveMeComponentsId') {
				// шлем id-шники компонентов devtools
				componentsList.forEach(function(component) {
					ids.push(component.getAttribute('id'));
					if (ids.length === componentsList.length) {
		    			chrome.extension.sendMessage({ids: ids, subj: 'componentsList'});
					}
				});
			}

			if (message.subj === 'urlsList') {
				componentsList.forEach(function(component, i) {
					activateComponent(component, i, message);
				});
			}


			if (message === 'deactivate') {
				componentsList.forEach(function(component) {
					desactivateComponent(component);
				});
			}

			if (message === 'activate') {
				componentsList.forEach(function(component) {
					showComponent(component);
				});
			}

		});
	}

	function activateComponent (cmp, i, message) {

		var htmlOfCmpUrl = document.createDocumentFragment(),
			spanEl = document.createElement('span');

		cmp.classList.add('component-active');

		spanEl.classList.add('component-url');
		
		htmlOfCmpUrl.appendChild(spanEl);

		cmp.insertBefore(htmlOfCmpUrl, cmp.firstChild);

		spanEl.innerText = message.urls[i];

		cmp.firstChild.addEventListener('click', function() {
			chrome.extension.sendMessage({id: this.parentElement.getAttribute('id'), subj: 'currentId'});
		}, false);
	}

	function showComponent (cmp) {
		cmp.classList.add('component-active');
		$('.component-url').css({'display': 'inline-block'});
	}


	function desactivateComponent (cmp) {
		cmp.classList.remove('component-active');
		$('.component-url').hide();
	}

	function addMultipleEventListeners(el, events, fn, bubbling) {
	   events.split(' ').forEach(function(event, i) {
	      el.addEventListener(event, fn, bubbling || false )
	   });
	}

}());