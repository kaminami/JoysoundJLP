JoysoundJLP
===========

言語解析WebAPI (https://5jcup.org/awards/joysound-lang-api/) を利用するためのラッパーライブラリ。

※2014/11/11現在、WebAPIが変更されています。本ライブラリは満足に動作しません。
https://lr.capio.jp/services/webapis/

## Requirements
* jQuery


## Example
```JavaScript
var config = new JoysoundJLP.Config('YOUR_USERNAME', 'YOUR_PASSWORD');

var tagger = new JoysoundJLP.Tagger(config);
var sourceSentence = "本日の光り物になります。今日は、おすしを食べたい。なんてブリリアントなコハダ。";
tagger.parse(sourceSentence, function(resultSet) {
    console.log(sourceSentence);
    console.log(resultSet);

    console.log(resultSet.readings());
    // ["ほんじつの ひかりものに なります きょうは おすしを たべたい なんて ぶりりあんとな こはだ"]
    
    resultSet.sentences().forEach(function(eachSentence) {
        eachSentence.eachWord(function (eachWord) {
            console.log(eachWord.printString())
        });
    });
    /*
    a Word (本日, 本日, 0, 6, 自立語, 名詞, ほんじつ)
    a Word (の, の, 6, 3, 付属語, その他, の)
    a Word (光り物, 光り物, 9, 9, 自立語, 名詞, ひかりもの)
    a Word (に, に, 18, 3, 付属語, その他, に)
    a Word (な, なる, 21, 3, 自立語, 動詞, な)
    a Word (り, り, 24, 3, 付属語, その他, り)
    a Word (ます, ます, 27, 6, 付属語, その他, ます)
    a Word (。, 。, 33, 3, 付属語, その他, )
    a Word (今日, 今日, 36, 6, 自立語, 名詞, きょう)
    a Word (は, は, 42, 3, 付属語, その他, は)
    a Word (、, 、, 45, 3, 付属語, その他, )
    a Word (お, お, 48, 3, 接頭辞, その他, お)
    a Word (すし, すし, 51, 6, 自立語, 名詞, すし)
    a Word (を, を, 57, 3, 付属語, その他, を)
    a Word (食べ, 食べる, 60, 6, 自立語, 動詞, たべ)
    a Word (たい, たい, 66, 6, 付属語, その他, たい)
    a Word (。, 。, 72, 3, 付属語, その他, )
    a Word (なんて, なんて, 75, 9, 自立語, その他, なんて)
    a Word (ブリリアント, ブリリアント, 84, 18, 自立語, 形容・形容動詞, ぶりりあんと)
    a Word (な, な, 102, 3, 付属語, その他, な)
    a Word (コハダ, コハダ, 105, 9, 自立語, 名詞, こはだ)
    a Word (。, 。, 114, 3, 付属語, その他, )
    */
});
```


## License
MIT
