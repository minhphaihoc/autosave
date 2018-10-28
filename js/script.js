;(function (window, document, undefined) {
	'use strict';

	var loadData = function () {

		// Get data
		var formData = localStorage.getItem('formData');
		if (!formData) return;

		formData = JSON.parse(formData);

		// Loop through formData object
		for (var data in formData) {
			if (formData.hasOwnProperty(data)) {

				// Get form field
				var field = document.querySelector('[name="' + data + '"]');
				if (!field) continue;

				if (field.type === 'checkbox') {
					field.checked = formData[data];
				} else if (field.type === 'radio') {
					var radios = Array.from(document.querySelectorAll('input[type="radio"]'));
					radios.forEach(function (radio) {
						if (radio.value === formData[data]) {
							radio.checked = true;
						}
					});
				} else {
					field.value = formData[data];
				}
			}
		}
	};

	var saveData = function (event) {
		// Get data
		var formData = localStorage.getItem('formData');
		formData = formData ? JSON.parse(formData) : {};

		if (event.target.type === 'checkbox') {
			formData[event.target.name] = event.target.checked;
		} else {
			formData[event.target.name] = event.target.value;
		}
		localStorage.setItem('formData', JSON.stringify(formData));
	};

	// Reset formData to empty object
	var resetData = function () {
		localStorage.setItem('formData', JSON.stringify({}));
	};

	// Load data from localStorage
	loadData();

	// Listen for input changes
	document.addEventListener('input', saveData, false);

	// Listen for submit event
	document.addEventListener('submit', resetData, false);
})(window, document);
