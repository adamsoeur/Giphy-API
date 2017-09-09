var topicArray = ["Lion", "Deer", "Dog", "Wolf", "Squid", "Bird"];

var apiKey = "&api_key=dc6zaTOxFJmzC";
var queryURL = "http://api.giphy.com/v1/gifs/search?q=";

function renderButtons(){ 
	$(".giphyButtons").html("");
	for (var i = 0; i < topicArray.length; i++) {
		var newButton = $("<button>");
		newButton.html(topicArray[i]);
		newButton.attr("class", "topicButton");
		newButton.addClass("btn");
		newButton.addClass("btn-primary");
		newButton.attr("data-name", topicArray[i]);
		$(".giphyButtons").append(newButton);
	}
}

$(document).ready(function () {

	renderButtons();

	$("#addTopic").on("click", function (event) {
		event.preventDefault();
		var newTopic = $("#topic-input").val();
		topicArray.push(newTopic);
		renderButtons();
		$("#topic-input").val("");
	})
	
	$(document).on("click", ".topicButton", function() {
		$.ajax({
			url: queryURL + this.dataset.name + "&limit=10" + apiKey,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			$(".gifs").html("");
			for (var i = 0; i < response.data.length; i++) {
				console.log(response.data[i]);
				var newDiv = $("<div>");
				newDiv.attr("class", "gifWrapper");
				var newImg = $("<img>");
				newImg.attr("class", "still");
				var stillURL = response.data[i].images.fixed_height_still.url;
				var gifURL = response.data[i].images.fixed_height.url;
				newImg.attr("data-stillLink", stillURL);
				newImg.attr("data-gifLink", gifURL);
				newImg.attr("src", stillURL);
				newDiv.append(newImg);
				newDiv.append("<div class='rating'>Rating: " + response.data[i].rating + "</div>");
				$(".gifs").append(newDiv);
			}
		})
	})

	$(document).on("click", ".still", function () {
		console.log(this.getAttribute("data-gifLink"));
		$(this).attr("src", this.getAttribute("data-gifLink"));
		$(this).attr("class", "animated");
	})

	$(document).on("click", ".animated", function() {
		$(this).attr("src", this.getAttribute("data-stillLink"));
		$(this).attr("class", "still");
	})

})