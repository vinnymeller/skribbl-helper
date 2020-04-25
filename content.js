var overallLength = 0
var curWordElement = document.getElementById("currentWord");
var chatBoxElement = document.getElementById("inputChat");   // get the div holding the current word
var letterCount = document.createElement('div');			 // create a div to put after it
letterCount.setAttribute("id", "letter-count");				 // give the div id letter-count
letterCount.style.fontSize = "24px";						 // make font size 24px
letterCount.style.fontWeight = "700"						 // font weight 700 to match the game
letterCount.style.textAlign = "left";						 // align left so everything is centered in the end
letterCount.style.flex = "1 1 auto";					     // make it flex so it works with the currentWord div
curWordElement.parentNode.insertBefore(letterCount, curWordElement.nextSibling); //put the new div after currentWord div
curWordElement.style.textAlign = "right";					 // align currentWord div right

var observer = new MutationObserver(function(mutations) {	 // define mutationobserver for changes in currentWord
	mutations.forEach(function(mutation) {
		overallLength = curWordElement.textContent.length
		wordArr = curWordElement.textContent.split(/[\s-]+/);// split the currentWord string by space or dashes

		countStr = "( " + String(wordArr[0].length);		 // init count string with the length of the first split
		for (var i = 1; i < wordArr.length; i++) {		     // loop through the rest of the split arr if there are more
			countStr += " - ";								 // add dashes in between counts
			countStr += String(wordArr[i].length);			 // add the word count
		}
		countStr += " )"								     // close parenthesis
		letterCount.textContent = countStr;					 // update the counter

		chatBoxElement.setAttribute("placeholder", curWordElement.textContent + " " + countStr);
	})
})

var config = { childList: true };							 // set the mutationobserver to listen for childList changes
	
observer.observe(curWordElement, config);					 // observe on curWordElement with config


chatBoxElement.addEventListener('input', (evt) => {			 // observe changes to input field
	var curWordLength = curWordElement.textContent.length;
	var textBoxLength = chatBoxElement.value.length;
	if (textBoxLength > curWordLength) {
		chatBoxElement.value = chatBoxElement.value.substring(0, curWordLength);	// don't let the user type more letters than are in the word
		return;
	}
	for (var i = 0; i < textBoxLength; i++) {										// check that the users letters match the given letters
		if (curWordElement.textContent[i] != '_' && curWordElement.textContent[i] != chatBoxElement.value[i]) {
			chatBoxElement.value = chatBoxElement.value.substring(0, i);			// if they don't, go back to the last letter that matches
			return;
		}
	}
	if (textBoxLength == curWordLength) {											// if the length is right be green
		chatBoxElement.style.backgroundColor = "#bfffbd";
	} else { 																		// otherwise be orange
		chatBoxElement.style.backgroundColor = "#ffcb94";
	}
});

chatBoxElement.addEventListener('change', (evt) => {								// after submitting go back to orange
	chatBoxElement.style.backgroundColor = "#ffcb94";
});


