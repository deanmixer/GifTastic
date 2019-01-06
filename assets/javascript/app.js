

let tryitout = $(document).ready(function() {

let buttonChoices = ["Adam West", "Michael Keaton", "Val Kilmer", "George Clooney", "Christian Bale", "Ben Affleck", "Will Arnett"];

for(i = 0; i < buttonChoices.length; i++) {
    let buttons = $('<button>'+ buttonChoices[i] + '</button>') 
    buttons.addClass("btn btn-dark")
    buttons.css('margin','2px');
    buttons.attr("data-animal", buttonChoices[i]);
    buttons.appendTo('#choices'); 
    $("#choices").append(buttons);	
}

$("#add-Bat").on("click", function(event) {
	event.preventDefault();
	let userInput = $("#newBat").val().trim();
    let buttons = $('<button>'+ userInput + '</button>') 
    buttons.addClass("btn btn-dark")
    buttons.css('margin','2px');
    buttons.attr("data-animal", userInput);
    buttons.appendTo('#choices'); 
    $("#choices").append(buttons);	
});

$("#choices").on("click", ".btn-dark", function() {
	$(".btn-dark").on("click", function() {
	$("#gifs-appear-here").empty();
	$(event.currentTarget).removeClass("btn btn-dark");
	$(event.currentTarget).addClass("btn btn-warning");
	$(event.currentTarget).siblings().removeClass("btn btn-warning");
	$(event.currentTarget).siblings().addClass("btn btn-dark");
      let actor = $(this).attr("data-animal");
      console.log()
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        actor + "&api_key=83CMTH58dPC8tZpUHf2uWtUD0Tb2BRKC&limit=10";
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          let results = response.data;

          for (let i = 0; i < results.length; i++) {
            let actorDiv = $("<div>");
            let p = $("<p>").text("Rating: " + results[i].rating);
            let actorImage = $("<img>");
            actorImage.attr("src", results[i].images.fixed_height_still.url);
            actorImage.attr("data-still", results[i].images.fixed_height_still.url);
            actorImage.attr("data-animate", results[i].images.fixed_height.url);
            actorImage.attr("data-state", "still");
            actorImage.css('max-width','100%');
            actorDiv.append(actorImage);
            actorDiv.append(p);
            $("#gifs-appear-here").prepend(actorDiv);
          }
        });
    });
     });   

$("#gifs-appear-here").on("click", function() {
    $("img").on("click", function() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
    });
})

