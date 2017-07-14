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


// Helper Functions


	// Function to add a trip and send updates to trip.html
	function addTrip() {
		
	}

		))