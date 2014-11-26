JoysoundJLP
===========

言語解析WebAPI (https://lr.capio.jp/services/webapis/) を利用するための薄いラッパーライブラリ。
サードパーティ。


なお、サンプルプログラムを試す際は、言語解析WebAPI利用登録時に得られるAccessKeyで、example0x.jsを書き換える必要がある。

## Requirements
* jQuery


## Example
```JavaScript

var config = new JoysoundJLP.Config('YOUR_ACCESSKEY');
var analyzer = new JoysoundJLP.Analyzer(config);

var sourceSentence = "今日はいい天気だ";

analyzer.analyze(sourceSentence, function(resultSet) {
    console.log(sourceSentence);
    console.log(resultSet);

    var result = resultSet.results[0];
    console.log(result.impression());
    // ポジティブ

    console.log(result.reading());
    // きょうはいいてんきだ

    result.eachPhrase(function(each) {
        console.log(each.printString())
    });
    /*
    a Phrase (今日は, 評価なし)
    a Phrase (いい, ポジティブ)
    a Phrase (天気だ, 評価なし)
    */

    result.eachMorpheme(function(each) {
        console.log(each.printString())
    });
    /*
    a Morpheme (今日, 名詞, きょう)
    a Morpheme (は, その他, は)
    a Morpheme (い, 形容・形容動詞, い)
    a Morpheme (い, その他, い)
    a Morpheme (天気, 名詞, てんき)
    a Morpheme (だ, その他, だ)
    */
});
```


## License
MIT
