    // Array determines values of buttons, will be updated when the user submits info w/ the form
    var buttonArray = ["Denver, CO", "Austin, TX", "Portland, OR", "New York, NY", "San Fransico, CA", "Los Angeles, CA", "Seattle, WA", "Bend, OR", "New Orleans, LA", "Nashville, TN", "Boston, MA", "Washington D.C."]

    // Loop through buttons array and: create new button, pass buttonArray value into button text, append that button to the buttons div 
    var addButton = function() {
        $("#buttons").empty(); 
        for (var i = 0; i < buttonArray.length; i++) {
            var newButton = $('<button type="button" class="btn btn-secondary">'); 
            $(newButton).attr("data-city", buttonArray[i])
            $(newButton).text(buttonArray[i]); 
            $("#buttons").append(newButton)
        }
    };

    // Call the function on page load
    addButton();



    //When a secondary button is click: make an ajax call for a set of 10 gifs, append those gifs to the gifDisplay div 
    $("#buttons").on("click",".btn-secondary", function(){
    
        //Capture a string of the city for the corresponding button
        var city = $(this).attr("data-city"); 
        // Build in the query url and dynamically include the search parameter for the city
        var url = "https://api.giphy.com/v1/gifs/search?q=" + city + "&limit=10&api_key=VGvXMieJmo5kN9L1on9V5cy0mQmXyGQF"
        
        $.ajax({
            url: url, 
            method: "GET"
        }).then(function(response) {
            // Capture the results data in a variable 
            var results = response.data; 
            console.log(results)
        
            // Loop through the results array
            for (var i = 0; i < results.length; i++){
                // Create a div for the specific gif w/ the city gif class, this class will help animante 
                var gifInstance = $('<div>'); 
                // Capture the rating
                var rating = results[i].rating; 
                // Create a p tag and append that value 
                var renderRating = $("<p>").text("Rating: " + rating);
                // Create an image tag for the gif 
                var cityGif = $("<img>")
                // Add data attribute
                $(cityGif).attr("data-state", "still");
                //Add class 
                $(cityGif).attr("class", "cityImg");
                //Put an id that is data-city, this will help animate 
                $(cityGif).attr("id", city); 
                // Set the src attribute of that new img to a gif at the corresponding index
                $(cityGif).attr("src", results[i].images.fixed_height_still.url)
                $(cityGif).attr("data-still", results[i].images.fixed_height_still.url)
                $(cityGif).attr("data-move", results[i].images.fixed_height.url)
                // Append the rating tot he gifInstance div 
                $(gifInstance).append(renderRating)
                // Append the gif to the gifInstance div 
                $(gifInstance).append(cityGif)
                // Prepend the gifInstance div to the gifDisplay div
                $("#gifDisplay").prepend(gifInstance)
            };
        });

    });

    $("#gifDisplay").on("click",".cityImg", function(){
        console.log("This won't print.")
        var dataState = $(this).attr("data-state")
        var move = "move"; 
        if (dataState == "still") {
            $(this).attr("src", $(this).attr("data-move")); 
            $(this).attr("data-state", "move")
        } else if (dataState == move) {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "still")                
        }
    });

    $(".btn-primary").on("click", function(event){
        event.preventDefault(); 
        var newState = $("#newStateInput"); 
        console.log(newState[0].value)
        buttonArray.push(newState[0].value); 
        addButton(); 

    });
