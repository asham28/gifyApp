$(document).ready(function () {

    // 1.CREATE ARRAY OF STRINGS
    var topics = ["jada pinkett", "beyonce", "tiffany haddish", "viola davis", "kerry washington", "angela bassett", "zendaya", "gabrielle union", "tracee ellis ross"];

    // 2. CREATE A FUCTION TO MAKE THE BUTTONS 
    function createBtns() {
        $("#btns").empty(); 
        for (var i = 0; i < topics.length; i++) {
          

            var a = $("<button class='btn-info btn-small m-2 col-3'>");
            a.addClass("topics"); // limits 'scope' of document
            a.addClass("btn");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#btns").append(a);
        }
    }
    createBtns();

    // 3. CLICK EVENT --> 10 STATIC IMAGES 
    // A. FILL IMAGES --> AJAX 
    function getGifs() {
        $(document).on('click', ".topics", function () {
            $("#images").empty();

            var topic = $(this).attr("data-name"); //copying the data-name
            var apiKey = "SmyC6pLugsHSOmSjmIrnBRtwz8RW1opF";
            var limit = 10;
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + ".offset&api_key=" + apiKey + "&limit=" + limit;

            console.log(queryURL);

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {
                var results = response.data;
                console.log(results);

                // B. FOR LOOP TO DISPLAY IMAGES: ADDING DATA ATTRIBUTES 
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div class='col-10 col-sm-2'>")

                    var rating = results[i].rating;
                    var animatedImageUrl = results[i].images.fixed_height.url;
                    var staticImageUrl = results[i].images.fixed_height_still.url;
                    var p = $("<p class='font-weight-bold '>").text("Rating: " + rating);
                    var imageDisplay = $("<img class= 'rounded'>");

                    // For Still / Animated Gifs
                    imageDisplay.addClass("imageGiphy")
                    imageDisplay.attr("src", staticImageUrl);
                    imageDisplay.attr("data-state", "still");
                    imageDisplay.attr("data-still", staticImageUrl);
                    imageDisplay.attr("data-animate", animatedImageUrl);

                    $(gifDiv).append(p);
                    $(gifDiv).prepend(imageDisplay);

                    $("#images").prepend(gifDiv);
                }
            });
        });
    }
    getGifs();


    // 4. CHANGE DATA STATE FROM STATIC TO ANIMATED 
    // Image click event will stop/start gifs 
    $(document).on("click", ".imageGiphy", startStopGifs);

    function startStopGifs() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate"); // changes data state
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
    }

    startStopGifs();

    // 5. CREATE FORM FOR USER TO ADD BUTTONS  
    //Submit button click event takes search term from form input, trims and pushes to topics array, displays button

    $("#submit").on("click", function (event) {
        event.preventDefault();

        var searchTerm = $("#inputText").val().trim();
        topics.push(searchTerm);
        console.log(searchTerm);
        $("#inputText").val('');
        createBtns();
    });

});