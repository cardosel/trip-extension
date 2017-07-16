/**
 * Initially called when extension page loads. Attaches click handlers to all the buttons.
 */
function init() {
	document.getElementById("trip").innerText = localStorage["trip-selection"] || 10;
	
	var buttonGroups = document.getElementsByClassName("trip-buttons-group")
	Array.prototype.forEach.call(buttonGroups, function(divElem) {

		Array.prototype.forEach.call(divElem.childNodes, function(elem) {
			elem.onclick = tripButtonOnClickHandler;
		});

	});

}

/**
 * Add click handlers to settings for user.
 */
function tripButtonOnClickHandler(event) {
	var targetElem = event.target;
	var tripSelected = +targetElem.innerText; // Get button text and convert to number
	var settingKey = targetElem.parentNode.id; // Get id of node (tells us whether trip was added).
	localStorage[settingKey] = tripSelected; // Save in localstorage.
	document.getElementById(settingKey.split("-")[0]).innerText = tripSelected;
}

document.addEventListener('DOMContentLoaded', init);