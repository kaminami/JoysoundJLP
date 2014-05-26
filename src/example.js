window.onload = function() {
    document.getElementById('example01Button').onclick = function (event) {
        var config = new JoysoundJLP.Config('yome3', 'yome111223');

        var tagger = new JoysoundJLP.Tagger(config);
        var sentence = '本日の光り物になります。今日は、おすしを食べたい。なんてブリリアントなコハダ。';
        tagger.parse(sentence, function(resultSet) {
            console.log(sentence);
            console.log(resultSet);

            console.log(resultSet.readings());
            $("#example01-reading").text(resultSet.readings());

            resultSet.sentences().forEach(function(eachSentence) {
                eachSentence.eachWord(function (eachWord) {
                    console.log(eachWord.printString())
                    $("#example01-words").append($("<li>").text(eachWord.printString())).append($("</li>"))
                });
            });
        });
    };
}
