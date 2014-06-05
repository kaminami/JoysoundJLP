window.onload = function() {
    document.getElementById('example01Button').onclick = function(event) {
        $("#example01-tw").empty();
        $("#example01-words").empty();

        var twmodeEnabled = $("#example01-tw_mode:checked").val();
        var sourceSentence = $("#example01-input").val().trim();

        var config = new JoysoundJLP.Config('YOUR_USERNAME', 'YOUR_PASSWORD');
        if (twmodeEnabled) { config.beTweetMode() };

        var tagger = new JoysoundJLP.Tagger(config);

        tagger.parse(sourceSentence, function(resultSet) {
            var sentence = resultSet.first();
            console.log(sentence);
            console.log(sentence.dependencies())

            $("#example01-reading").text(sentence.reading());

            if (twmodeEnabled) {
                addItemToTw("publicRetweetedUser", sentence.publicRetweetedUser());
                addItemToTw("repliedUser", sentence.repliedUser());
                addItemToTw("mentionedUsers", sentence.mentionedUsers());
                addItemToTw("containedUrls", sentence.containedUrls());
                addItemToTw("hashtags", sentence.hashtags());
            }

            sentence.eachWord(function(eachWord) {
                addItemToWords(eachWord.printString());
            });
        });

        var addItemToTw = function(key, value) {
            $("#example01-tw").append($("<li>").text(key + ': ' + value).append($("</li>")));
        }

        var addItemToWords = function(value) {
            $("#example01-words").append($("<li>").text(value).append($("</li>")));
        }
    };
}
