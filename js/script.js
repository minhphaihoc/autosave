;(function (window, document, undefined) {
	'use strict';
	var forms = document.querySelectorAll('form');

	var loadData = function (form) {

		// Get data
		var formData = localStorage.getItem('formData-' + form.id);
		if (!formData) return;

		formData = JSON.parse(formData);

		// Loop through formData object
		for (var data in formData) {
			// Get form field
			var field = form.querySelector('[name="' + data + '"]');
			if (!field) continue;

			if (field.type === 'checkbox') {
				field.checked = formData[data];
			} else if (field.type === 'radio') {
				var radios = Array.from(form.querySelectorAll('input[type="radio"]'));
				radios.forEach(function (radio) {
					if (radio.value === formData[data]) {
						radio.checked = true;
					}
				});
			} else {
				field.value = formData[data];
			}
		}
	};

	var saveData = function (event) {
		// Get data
		var id = event.target.closest('form').id;
		if (!id) return;

		var formData = localStorage.getItem('formData-' + id);
		formData = formData ? JSON.parse(formData) : {};

		if (event.target.type === 'checkbox') {
			formData[event.target.name] = event.target.checked;
		} else {
			formData[event.target.name] = event.target.value;
		}
		localStorage.setItem('formData-' + id, JSON.stringify(formData));
	};

	// Reset formData to empty object
	var resetData = function (id) {
		localStorage.setItem('formData-' + id, JSON.stringify({}));
	};

	var handleSubmit = function (event) {
		var id = event.target.closest('form').id;
		if (!id) return;

		resetData(id);
	};

	// Load data from localStorage
	forms.forEach(function (form) {
		loadData(form);
	});

	// Listen for input changes
	document.addEventListener('input', saveData, false);

	// Listen for submit event
	document.addEventListener('submit', handleSubmit, false);
})(window, document);
