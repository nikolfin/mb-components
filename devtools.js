(function() {

	// chrome.devtools.panels.elements.createSidebarPane('Component Info', function (sidebar) {

	// 	chrome.devtools.inspectedWindow.eval("(function() {return {url: Mb.ComponentManager.getComponentById('web-question-question_popular__0').url, data: Mb.ComponentManager.getComponentById('web-question-question_popular__0').getData(),params: Mb.ComponentManager.getComponentById('web-question-question_popular__0').getParams(), literals: Mb.ComponentManager.getComponentById('web-question-question_popular__0').getLiterals(), INIT_TYPE: Mb.ComponentManager.getComponentById('web-question-question_popular__0').INIT_TYPE}} ());", function(result, isException) {

	// 		if (isException) {
	// 			console.log( isException );
	// 		}

	// 		var title = result.url;

	// 		title += result.INIT_TYPE === 0 ? ' | SERVER' : ' | CLIENT';

	// 		sidebar.setObject(result, title);

	// 	});

	// });







	// создаем порт для конекта с background
	var port = chrome.extension.connect({
			name: 'fromDevtools'
		}),
		urls = [];

	// пингуем content через background
	port.postMessage('giveMeComponentsId');

	// получаем ответ от content script
	port.onMessage.addListener(function (message) {

	    if (message.subj === 'componentsList') {

	    	urls = [];

	    	message.ids.forEach(function(id, i) {

				chrome.devtools.inspectedWindow.eval(
					"(function() {return Mb.ComponentManager.getComponentById('"+id+"').url} ());",
					function(result, isException) {
						if (isException) {
							console.log( isException );
						}
						urls.push(result);
						if (message.ids.length === urls.length) {
							port.postMessage({urls: urls, subj: 'urlsList'});
						}
					}
				);
		   	});
	    }

	    if (message === 'refresh') {
	    	port.postMessage('giveMeComponentsId');
	    }
	});

}());