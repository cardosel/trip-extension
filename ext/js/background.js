// **
// * Global Variables
// **

var itineraryStates = {
		"on" : {"state": "on", "html": "popup.html"},
		"itinerary" : new ItineraryState(),
	stateKey = "on",
	currentState = itineraryStates[stateKey],
	trip;
}

// Executed Initially

// Sets initial popup page when icon is clicked
chrome.browserAction.setPopup({
	"popup": currentState.html
})

// Message listeners for messages from trip.js
chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse) {
		// only add a trip if the extension was already on.
		if(request.command === "addTrip" && stateKey === "on"){
			changeToNextState(false);
			sendResponse({message: "Trip has been added to itinerary."});
		}

		// only clear the itinerary if it is not on.
		else if (request.command === "deleteTrip" && stateKey !== "on") {
			if (trip) clearItinerary(trip);
			trip = null;
			changeState("on", false); // change to on state
			chrome.runtime.sendMessage({
				command: "tripDeleted"
			});
		}

	});


/**
 * Helper Functions
 */


/**
 * Given the difference in seconds between the start time and current time,
 * formats it into m:ss (ex. 0:55) and sends a message to timer.js, so it can
 * update the UI.
 */
function sendUpdatedTrip() {
	var coordinates = trip().geocode();
	chrome.runtime.sendMessage({
		"command": "updateLocation",
		"location": coordinates,
	});
	chrome.browserAction.setBadgeText({"text" : coordinates});
}


/**
 * Notifies the user when a trip is added.
 */
function notifyUser() {
	var idBase = currentState.notificationBaseId;
	var id = idBase + (new Date()).getTime();
	chrome.notifications.create(id, currentState.opt, function() {
		console.log(idBase + " trip created.");
	}); // Callback function as 3rd parameter is required.
}

/**
 * Called during a change of state during usual flow.
 */
function changeToNextState(isAdded) {
	nextStateKey = currentState.nextState;
	changeState(nextStateKey, isDelayed);
}


}