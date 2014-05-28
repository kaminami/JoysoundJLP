var JoysoundJLP;
(function (JoysoundJLP) {
    var Config = (function () {
        function Config(usernameStr, passwordStr) {
            this.username = usernameStr;
            this.password = passwordStr;

            this.mode = undefined;

            this.host = 'event.capio.jp';
            this.apiPath = 'webapis/synana/1/index.php';
        };

        Config.prototype.beTweetMode = function () {
            this.mode = 'tw_mode';
        };

        Config.prototype.hasMode = function () {
            return this.mode != undefined
        };

        Config.prototype.requestUrl = function() {
            return 'http://' + this.keyForBasicAuth() + '@' + this.host + '/' + this.apiPath;
        };

        Config.prototype.keyForBasicAuth = function() {
            return this.username + ':' + this.password;
        };

        return Config;
    })();
    JoysoundJLP.Config = Config;


    var ResultSet = (function () {
        function ResultSet(rawResult, config) {
            this.rawResult = rawResult;
            this.config = config;
            this.sentenceArray = [];

            this.parse(rawResult);

        };

        ResultSet.prototype.parse = function (rawResult) {
            var self = this;
            rawResult.result.forEach(function (eachRawSentence) {
                var sentence = new Sentence(eachRawSentence);
                self.sentenceArray.push(sentence)
            });
        };

        ResultSet.prototype.sentences = function () {
            return this.sentenceArray;
        };

        ResultSet.prototype.errorCode = function () {
            return this.rawResult.error_code;
        };

        ResultSet.prototype.readings = function () {
            var readings = [];
            this.sentences().forEach(function (eachSentence) {
                readings.push(eachSentence.reading());
            });
            return readings;
        };

        ResultSet.prototype.first = function () {
            return this.sentences()[0];
        };

        ResultSet.prototype.second = function () {
            return this.sentences()[1];
        };

        ResultSet.prototype.third = function () {
            return this.sentences()[2];
        };

        return ResultSet;
    })();
    JoysoundJLP.ResultSet = ResultSet;


    var Sentence = (function () {
        function Sentence(rawSentence) {
            this.rawSentence = rawSentence;
            this.phraseArray = [];

            this.parse(rawSentence)
        };

        Sentence.prototype.parse = function (rawSentence) {
            var self = this;
            rawSentence.phrases.forEach(function (eachRawPhrase) {
                var phrase = new Phrase(eachRawPhrase);
                self.phraseArray.push(phrase)
            });
        };

        Sentence.prototype.phrases = function () {
            return this.phraseArray;
        };

        Sentence.prototype.errorCode = function () {
            return this.rawSentence.ana_error_code;
        };

        Sentence.prototype.isPositive = function () {
            return this.rawSentence.sent_pn == 1;
        };

        Sentence.prototype.isNegative = function () {
            return this.rawSentence.sent_pn == 2;
        };

        Sentence.prototype.isNeautral = function () {
            return this.rawSentence.sent_pn == 0;
        };

        Sentence.prototype.publicRetweetedUser = function () {
            return this.rawSentence.pubrt;
        };

        Sentence.prototype.repliedUser = function () {
            return this.rawSentence.reply;
        };

        Sentence.prototype.mentionedUsers = function () {
            return this.rawSentence.mention;
        };

        Sentence.prototype.containedUrls = function () {
            return this.rawSentence.url;
        };

        Sentence.prototype.hashtags = function () {
            return this.rawSentence.hashtag;
        };

        Sentence.prototype.topics = function () {
            return this.rawSentence.topics;
        };

        Sentence.prototype.reading = function () {
            var buffer = [];
            this.phrases().forEach(function (eachPhrase) {
                buffer.push(eachPhrase.reading());
            });
            return buffer.join('');
        };

        Sentence.prototype.eachPhrase = function (callbackFunction) {
            this.phrases().forEach(function (each) {
                callbackFunction(each);
            });
        };

        Sentence.prototype.eachWord = function (callbackFunction) {
            this.eachPhrase(function (eachPhrase) {
                eachPhrase.eachWord(function(eachWord){
                    callbackFunction(eachWord);
                });
            });
        };

        return Sentence;
    })();
    JoysoundJLP.Sentence = Sentence;


    var Phrase = (function () {
        function Phrase(rawPhrase) {
            this.rawPhrase = rawPhrase;

            this.phraseWordArray = [];
            this.wordArray = [];

            this.parse(rawPhrase);
        };

        Phrase.prototype.parse = function (rawPhrase) {
            var self = this;

            rawPhrase.phrase_word.forEach(function (eachRawPhraseWord) {
                var phraseWord = new Word(eachRawPhraseWord);
                self.phraseWordArray.push(phraseWord)
            });

            rawPhrase.words.forEach(function (eachRawWord) {
                var word = new Word(eachRawWord);
                self.wordArray.push(word)
            });
        };

        Phrase.prototype.phraseWords = function () {
            return this.phraseWordArray;
        };

        Phrase.prototype.words = function () {
            return this.wordArray;
        };

        Phrase.prototype.id = function () {
            return this.rawPhrase.id;
        };

        Phrase.prototype.isPositive = function () {
            return this.rawPhrase.phrase_pn == 1;
        };

        Phrase.prototype.isNegative = function () {
            return this.rawPhrase.phrase_pn == 2;
        };

        Phrase.prototype.isNeautral = function () {
            return this.rawPhrase.phrase_pn == 0;
        };

        Phrase.prototype.dependPhrase = function () {
            return this.rawPhrase.depend_id;
        };

        Phrase.prototype.isPositivePair = function () {
            return this.rawPhrase.pair_phrase_pn == 1;
        };

        Phrase.prototype.isNegativePair = function () {
            return this.rawPhrase.pair_phrase_pn == 2;
        };

        Phrase.prototype.isNeautralPair = function () {
            return this.rawPhrase.pair_phrase_pn == 0;
        };

        Phrase.prototype.modalities = function () {
            return this.rawPhrase.modality;
        };

        Phrase.prototype.reading = function () {
            var buffer = [];
            this.words().forEach(function (eachWord) {
                buffer.push(eachWord.reading());
            });
            buffer.push(' ');
            return buffer.join('');
        };

        Phrase.prototype.eachWord = function (callbackFunction) {
            this.words().forEach(function (each) {
                callbackFunction(each);
            });
        };
        return Phrase;
    })();
    JoysoundJLP.Phrase = Phrase;


    var Word = (function () {
        function Word(rawWord) {
            this.rawWord = rawWord;
        };

        Word.prototype.parse = function (rawWord) {
            // noop
        };

        Word.prototype.word = function () {
            return this.rawWord.word;
        };

        Word.prototype.base = function () {
            return this.rawWord.base == "" ? this.word(): this.rawWord.base;
        };

        Word.prototype.startPosition = function () {
            return this.rawWord.start;
        };

        Word.prototype.byteLength = function () {
            return this.rawWord.count;
        };

        Word.prototype.attribute = function () {
            switch (this.rawWord.attr) {
                case '0': return '接頭辞';
                case '1': return '自立語';
                case '2': return '付属語';
            }
            return 'Unknown';
        };

        Word.prototype.partsOfSpeech = function () {
            return this.rawWord.pos;
        };

        Word.prototype.reading = function () {
            return this.rawWord.reading;
        };

        Word.prototype.printString = function () {
            var buf = [];
            buf.push(this.word());
            buf.push(this.base());
            buf.push(this.startPosition());
            buf.push(this.byteLength());
            buf.push(this.attribute());
            buf.push(this.partsOfSpeech());
            buf.push(this.reading());

            return 'a Word (' + buf.join(', ') + ')';
        };

        return Word;
    })();
    JoysoundJLP.Word = Word;


    var Tagger = (function () {
        function Tagger(aConfig) {
            this.config = aConfig;
        };

        Tagger.prototype.parse = function (sentenceString, resultCallback) {
            this.request(sentenceString, resultCallback);
        };

        Tagger.prototype.parseAll = function (sentenceStrings, resultCallback) {
            var joined = sentenceStrings.join('<!--p-->');
            this.request(joined, resultCallback);
        };

        Tagger.prototype.parseRawResult = function (rawResult, resultCallback) {
            var resultSet = new ResultSet(rawResult, this.config);
            resultCallback(resultSet);
        };

        Tagger.prototype.requestUrl = function (sentence) {
            var url = this.config.requestUrl() + '?';
            if (this.config.hasMode()) {
                url = url + 'mode=' + this.config.mode + '&';
            }

            var encodedSentence = encodeURIComponent(sentence);
            url = url + 'sent=' + encodedSentence;

            return url;
        };

        Tagger.prototype.request = function (sentence, resultCallback) {
            var self = this;

            var url = this.requestUrl(sentence);
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                success: function(rawResult){
                    self.parseRawResult(rawResult, resultCallback)
                }
            });
        };

        return Tagger;
    })();
    JoysoundJLP.Tagger = Tagger;

})(JoysoundJLP || (JoysoundJLP = {}));

