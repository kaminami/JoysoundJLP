window.onload = function() {
    document.getElementById('example01Button').onclick = function(event) {
        $("#example01-tw").empty();
        $("#example01-words").empty();

        var twmodeEnabled = $("#example01-tw_mode:checked").val();
        var sourceSentence = $("#example01-input").val().trim();

        var config = new JoysoundJLP.Config('!!!YOUR_ACCESSKEY!!!');
        if (twmodeEnabled) { config.beTweetMode() };

        var analyzer = new JoysoundJLP.Analyzer(config);

        analyzer.analyze(sourceSentence, function(resultSet) {
            var result = resultSet.results()[0];
            console.log(result);
            console.log(result.printString());

            $("#example01-reading").text(result.yomi());

            if (twmodeEnabled) {
                addItemToTw("publicRetweetedUser", result.publicRetweetedUser());
                addItemToTw("repliedUser", result.repliedUser());
                addItemToTw("mentionedUsers", result.mentionedUsers());
                addItemToTw("containedUrls", result.containedUrls());
                addItemToTw("hashtags", result.hashtags());
            }

            clearMorphemes();
            result.eachMorpheme(function(morpheme) {
                addItemToMorphemes(morpheme.printString());
            });
        });

        var addItemToTw = function(key, value) {
            $("#example01-tw").append($("<li>").text(key + ': ' + value).append($("</li>")));
        }

        var addItemToMorphemes = function(value) {
            $("#example01-morphemes").append($("<li>").text(value).append($("</li>")));
        }

        var clearMorphemes = function(value) {
            $("#example01-morphemes").empty();
        }
    };
}
