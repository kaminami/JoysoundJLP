window.onload = function() {
    document.getElementById('example01Button').onclick = function (event) {
        var config = new JoysoundJLP.Config('YOUR_USERNAME', 'YOUR_PASSWORD');

        var tagger = new JoysoundJLP.Tagger(config);
        var sentence = '本日の光り物になります。今日は、おすしを食べたい。なんてブリリアントなコハダ。';
        tagger.parse(sentence, function(resultSet) {
            console.log(sentence);
            console.log(resultSet);
            console.log(resultSet.readings());

            resultSet.sentences().forEach(function(eachSentence) {
                eachSentence.eachWord(function (eachWord) {
                    console.log(eachWord.printString())
                });
            });
        });
    };

    document.getElementById('example02Button').onclick = function (event) {
        var config = new JoysoundJLP.Config('YOUR_USERNAME', 'YOUR_PASSWORD');

        var tagger = new JoysoundJLP.Tagger(config);
        var sentence1 = '本日の光り物になります。今日は、おすしを食べたい。なんてブリリアントなコハダ。';
        var sentence2 = '犬も歩けば棒に当たる。';
        var sentence3 = '風が吹けば桶屋が儲かる。';
        var sentences = [sentence1, sentence2, sentence3];
        tagger.parseAll(sentences, function(resultSet) {
            console.log(sentences);
            console.log(resultSet);
            console.log(resultSet.readings());
        });
    };
}
