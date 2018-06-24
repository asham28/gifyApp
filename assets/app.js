$(document).ready(function(){

// 1.CREATE ARRAY OF STRINGS

var topics =["cat", "dog", "hamster", "birds"]; 
    
// 2. CREATE A FUCTION TO MAKE THE BUTTONS 
function createBtns() {

for (var i =0; i<topics.length; i++){

    var a = $("<button>"); 
    a.addClass("topics"); // limits 'scope' of document
    a.addClass("btn");         
    a.attr("data-name", topics[i]); 
    a.text(topics[i]);
    $("#btns").append(a); 
    
}

}
createBtns(); 

// 3. CLICK EVENT --> 10 STATIC IMAGES 

    //B. FILL IMAGES --> AJAX 

function getGifs() {
$(document).on('click', ".topics", function() {

    //A. EMPTY DIV
$("#images").empty(); 

var topic = $(this).attr("data-name"); //copying the data-name

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + ".offset&api_key=dc6zaTOxFJmzC&limit=10";

$.ajax({
    url: queryURL, 
    method: 'GET'
})

// state change 
// look for attribute called data-state, still vs animated 


})

}

getGifs(); 


// 4. CHANGE DATA STATE FROM STATIC TO ANIMATED 












}); 

