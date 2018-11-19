(function ($, window) {
    console.log("Main.js ran");

    // http://www.omdbapi.com/?s=star+wars&apikey=6505fd56

    var apiKey = "6505fd56";
    var searchResults;
    var server = "https://instructor-code-challenge.herokuapp.com/favorites";

    $(document).ready(function() {
        $("#searchButton").click(function(event){
            event.preventDefault();
            var searchString = $("#searchString").val();
            searchMovies(searchString);
            createTable(searchResults);
        });
    });

    function searchMovies(searchString) {
        $.ajaxSetup({async: false});
        $.get("http://www.omdbapi.com", { s:searchString, apikey:apiKey }, function(data, status){
            searchResults = data.Search;
            console.log(searchResults);
        }, "json");        
    }

    function createTable(movieJSON) {
        $("#movieList").append("<tr><th>Title</th><th>Favorite</th></tr>");

        for (x in movieJSON) {
            $("#movieList").append('<tr> \
                <td><a href="http://www.imdb.com/title/' + movieJSON[x].imdbID + '">' + movieJSON[x].Title + '</a></td> \
                <td><input type="checkbox" name="' + movieJSON[x].Title + '" onclick="handleFavoritesChange(this)" /></td> \
                </tr>');
        }
    }

    function handleFavoritesChange(element) {
        console.log("pre post");
        $.post(server, { title: this.name })
        .done(function() {
            alert("second success");
        })
        .fail(function(response) {
            alert("error:" + response.responseText);
        })
        .always(function() {
            alert("finished");
         });
    }

    window.handleFavoritesChange = handleFavoritesChange;
} ($, window));