JoysoundJLP
===========

������WebAPI(https://5jcup.org/awards/joysound-lang-api/)�𗘗p���邽�߂̃��b�p�[���C�u�����B

## Requirements
* jQuery


## Example
```JavaScript
var config = new JoysoundJLP.Config('YOUR_USERNAME', 'YOUR_PASSWORD');

var tagger = new JoysoundJLP.Tagger(config);
var sentence = '�{���̌��蕨�ɂȂ�܂��B�����́A��������H�ׂ����B�Ȃ�ău�����A���g�ȃR�n�_�B';
tagger.parse(sentence, function(resultSet) {
    console.log(sentence);
    console.log(resultSet);
    console.log(resultSet.readings());
});
```


## License
MIT