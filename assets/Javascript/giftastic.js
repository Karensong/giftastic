  var movies = ["Britney Spears", "Alicia Silverstone", "The Spice Girls", "Bill Clinton", "Nancy Kerrigan", "Oksana Baiul", "Princess Diana", "Julia Roberts", "Will Smith", "Backstreet Boys", "Saved by the Bell", "Jennifer Love Hewitt", "Hanson", "Sarah Michelle Gellar", "Destinys Child", "Freddy Prinze Jr", "The Wonder Years", "Michael Jordan", "Claire Danes", "Mariah Carey","Keanu Reeves"];
      // displayMovieInfo function re-renders the HTML to display the appropriate content
      
      function renderButtons() {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("movie-button");
          // Adding a data-attribute
          a.attr("data-name", movies[i]);
          // Providing the initial button text
          a.text(movies[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        };
      };
      // This function handles events where a movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();
        // Adding movie from the textbox to our array
        movies.push(movie);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".movie-button", displayMovieInfo);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();



      function displayMovieInfo() {
        var movie = $(this).attr("data-name");
      
        // Creating an AJAX call for the specific movie button being clicked
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=19J7cbqcz6wrBLq2rIdhWd8WsdtuaQE1&q="+ movie + "&limit=10";
        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          // Creating a div to hold the movie
          var movieDiv = $("<div class='movie'>");
          // Storing the rating data
          var inform = response.data;
          console.log(inform);

          for (var i = 0; i < response.data.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          // var movieDiv = $("<div class='movie'>");
          var b = response.data[i];
          console.log(b);

          // var c = response.data[i].findIndex();
          // console.log(c);

          var imgURL = response.data[i].images.fixed_height_still.url;
          console.log(imgURL);

          var something = response.data[i].images.fixed_height.url;
          // Creating an element to hold the image
         
          // Putting the entire movie above the previous movies
          $("#movies-view").html(movieDiv);

          // var imageitself = $("<img>");
          // imageitself.addClass("person");
          // imageitself.attr("data-name", i);
          // console.log(imageitself);

          var image = $("<img>").attr("src", imgURL).attr("datastill", imgURL).attr("dataanimate", something).attr("datastate", "still").attr("class", "gif");

          console.log(image);
          // image.addClass("person");
          // image.attr("data-name", );
          // console.log(image);
          // Appending the image
          movieDiv.append(image);

          var pOne = $("<p>").text("Rating: " + response.data[i].rating);
          // Displaying the rating
          movieDiv.append(pOne);
          // Adding a class of movie to our button
          
        };
      });

          
          
       
      };

      // $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
     $(document).on("click", ".gif", changevalue);

      function changevalue() {

      var state = $(this).attr("datastate");
      console.log(state);
      // // var state = $(this).attr(img.gif.attributes.datastate.childNodes.nodeValue);

      

      // // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // // Then, set the image's data-state to animate
      // // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("dataanimate"));
      //   // $(this).attr("src", img.gif.attributes.dataanimate.childNodes.nodeValue)
        $(this).attr("datastate", "animate");
      } else {
      //   // $(this).attr("src", img.gif.attributes.datastill.childNodes.nodeValue);
        $(this).attr("src", $(this).attr("datastill"));
        $(this).attr("datastate", "still");
      }
    };