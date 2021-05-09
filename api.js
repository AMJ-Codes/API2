let giphys = [
  "godzilla",
  "pacific rim",
  "gamera",
  "king ghidorah",
  "king kong",
  "mechagodzilla",
  "tokyo",
  "destroy all monsters",];

function displayGiphy() {
  $("#giphy-view").empty();

  const giphy = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&limit=8&api_key=dc6zaTOxFJmzC";

    
/* This was an attempt at utilizing another API fetch as an example towards randomizing outputs. Unfortunately I couldn't get it to work with ajax which I found neccessary to make most of it work.

let url = "api.giphy.com/v1/gifs/search/q=&limit=8&api_key=dziXrLOV3W9rmrDcN7zjZygiA0xYAzDI";

fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
.then((res) => res.json())
.then((json) => {
  let pokeNameArr = json.results;

  let randomPokemon =
    pokeNameArr[Math.floor(Math.random() * pokeNameArr.length)];
  console.log(randomPokemon);

  // Second fetch to access url data which was previously unavailable due to '?offset/limit.
  fetch(randomPokemon["url"])
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return displayResults(data);
    */

  $.ajax({
    url: queryURL,
    method: "GET",
  }).done(function (response) {
    
    let randomGif =
    response.data[Math.floor(Math.random() * response.data.length)]
    console.log(randomGif)

    console.log(response.data[0].images.downsized_medium.url);
    console.log(response.data[0].images.downsized_still.url);
    for (let i = 0; i < response.data[0].images.downsized_medium.url.length;i++) {
      let giphDiv = $("<div class='newGiphy'>");
      let animate = response.data[i].images.downsized_medium.url;
      let still = response.data[i].images.downsized_still.url;
      let image = $("<img>").attr("src", still);
      image.attr("data-still", still);
      image.attr("data-animate", animate);
      image.attr(
        "data-state",
        image.data("state") === "still" ? "animate" : "still"
      );
      image.addClass("gif");
      giphDiv.append(image);
      $("#giphy-view").prepend(giphDiv);
      event.preventDefault();
    }
  });
}
function renderButtons() {
  $("#buttons-view").empty();
  for (i = 0; i < giphys.length; i++) {
    let a = $("<button>");
    a.addClass("giphy");
    a.addClass("btn btn-outline-warning btn-rounded waves-effect");
    a.attr("data-name", giphys[i]);
    a.text(giphys[i]);
    $("#buttons-view").append(a);
  }
}
$("#add-giphy").on("click", function (event) {
  event.preventDefault();
  const giphy = $("#giphy-input").val().trim();
  giphys.push(giphy);
  renderButtons();
});
$(document).ready(function () {
  renderButtons();
  $("#giphy-input").focus();
  $(document).on("click", ".giphy", displayGiphy);
  $(document).on("click", ".gif", function () {
    let state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});
