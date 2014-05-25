JoysoundJLP
===========

言語解析WebAPI (https://5jcup.org/awards/joysound-lang-api/) を利用するためのラッパーライブラリ。

## Requirements
* jQuery


## Example
```JavaScript
var config = new JoysoundJLP.Config('YOUR_USERNAME', 'YOUR_PASSWORD');

var tagger = new JoysoundJLP.Tagger(config);
var sentence = '本日の光り物になります。今日は、おすしを食べたい。なんてブリリアントなコハダ。';
tagger.parse(sentence, function(resultSet) {
    console.log(sentence);
    console.log(resultSet);
    console.log(resultSet.readings());
});
```


## License
MIT