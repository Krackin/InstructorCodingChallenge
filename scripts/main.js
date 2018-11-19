(function ($, window) {
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
        $("#movieList").html("");
        $("#movieList").append("<tr><th>Title</th><th>Favorite</th></tr>");

        for (x in movieJSON) {
            $("#movieList").append('<tr> \
                <td><a href="http://www.imdb.com/title/' + movieJSON[x].imdbID + '">' + movieJSON[x].Title + '</a></td> \
                <td><input type="checkbox" name="' + movieJSON[x].Title + '" onclick="handleFavoritesChange(this)" /></td> \
                </tr>');
        }
    }

    function handleFavoritesChange(element) {
        $.post(server, { title: this.name })
        .done(function() {
            console.log("success");
        })
        .fail(function(response) {
            console.log("error:" + response.statusText);
        })
        .always(function() {
            console.log("finished");
         });
    }

    window.handleFavoritesChange = handleFavoritesChange;
} ($, window));