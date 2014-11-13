JoysoundJLP
===========

言語解析WebAPI (https://lr.capio.jp/services/webapis/) を利用するためのラッパーライブラリ。

## Requirements
* jQuery


## Example
```JavaScript
var config = new JoysoundJLP.Config('!!!YOUR_ACCESSKEY!!!');
var analyzer = new JoysoundJLP.Analyzer(config);
        
var sourceSentence = "今日はいい天気だ";
analyzer.analyze(sourceSentence, function(resultSet) {
    console.log(sourceSentence);
    console.log(resultSet);

    var result = resultSet.results()[0];
    console.log(result.yomi());

    result.eachMorphem(function(each) {
        console.log(each.printString())
    });
});
```


## License
MIT
