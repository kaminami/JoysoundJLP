window.onload = function() {
    document.getElementById('example01Button').onclick = function (event) {
        var config = new JoysoundJLP.Config('YOUR_USERNAME', 'YOUR_PASSWORD');
        var tagger = new JoysoundJLP.Tagger(config);

        var sentence = $("#example01-input").val().trim();

        tagger.parse(sentence, function(resultSet) {
            console.log(sentence);
            console.log(resultSet);
            console.log(resultSet.readings());

            $("#example01-reading").text(resultSet.readings());
            $("#example01-words").empty();
            resultSet.first().eachWord(function(eachWord) {
                console.log(eachWord.printString());
                $("#example01-words").append($("<li>").text(eachWord.printString())).append($("</li>"));
            });
        });
    };
}
