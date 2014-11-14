var JoysoundJLP;
(function(JoysoundJLP) {
    var Config = (function() {
        function Config(accessKey) {
            this.accessKey = accessKey;
            this.mode = undefined;
        };

        Config.prototype.beTweetMode = function() {
            this.mode = 'tw_mode';
        };

        Config.prototype.hasMode = function() {
            return this.mode != undefined
        };

        Config.prototype.requestUrl = function() {
            return 'https://lr.capio.jp/webapis/iminos/synana_k/1_1?acckey=' + this.accessKey + '&';
        };

        return Config;
    })();
    JoysoundJLP.Config = Config;


    var ResultSet = (function() {
        function ResultSet(rawResult, config) {
            this.rawResult = rawResult;
            this.config = config;
            this.resultArray = [];

            this.parse(rawResult);

        };

        ResultSet.prototype.parse = function(rawResult) {
            var self = this;
            rawResult.results.forEach(function(eachRawResult) {
                var sentence = new Result(eachRawResult);
                self.resultArray.push(sentence)
            });
        };

        ResultSet.prototype.results = function() {
            return this.resultArray;
        };

        ResultSet.prototype.apierr = function() {
            return this.rawResult.apierr;
        };

        return ResultSet;
    })();
    JoysoundJLP.ResultSet = ResultSet;


    var Result = (function() {
        function Result(rawResult) {
            this.rawResult = rawResult;
            this.phraseArray = [];
            this.morphemeArray = [];

            this.parse(rawResult)
        };

        Result.prototype.parse = function(rawResult) {
            var self = this;
            rawResult.phrases.forEach(function(eachRawPhrase) {
                var phrase = new Phrase(eachRawPhrase);
                self.phraseArray.push(phrase)
            });

            rawResult.morphemes.forEach(function(eachRawMorpheme) {
                var morpheme = new Morpheme(eachRawMorpheme);
                self.morphemeArray.push(morpheme)
            });
        };

        Result.prototype.phrases = function() {
            return this.phraseArray;
        };

        Result.prototype.morphemes = function() {
            return this.morphemeArray;
        };

        Result.prototype.err = function() {
            return this.rawResult.err;
        };

        Result.prototype.spn = function() {
            return this.rawResult.spn;
        };

        Result.prototype.pubrt = function() {
            return this.rawResult.pubrt;
        };

        Result.prototype.reply = function() {
            return this.rawResult.reply;
        };

        Result.prototype.mention = function() {
            return this.rawResult.mention;
        };

        Result.prototype.url = function() {
            return this.rawResult.url;
        };

        Result.prototype.hashtags = function() {
            return this.rawResult.hashtag;
        };

        Result.prototype.sensibilities = function() {
            return this.rawResult.sensibilities;
        };

        Result.prototype.publicRetweetedUser = function() {
            return this.pubrt();
        };

        Result.prototype.repliedUser = function() {
            return this.reply();
        };

        Result.prototype.mentionedUsers = function() {
            return this.mention();
        };

        Result.prototype.containedUrls = function() {
            return this.url();
        };

        Result.prototype.yomi = function() {
            var buffer = [];
            this.eachPhrase(function(each) {
                buffer.push(each.jyomi() + each.fyomi());
            });
            return buffer.join(' ');
        };

        Result.prototype.impression = function() {
            if (this.spn() == 0) { return '評価なし'; }
            if (this.spn() == 1) { return 'ポジティブ'; }
            if (this.spn() == 2) { return 'ネガティブ'; }
            if (this.spn() == 3) { return '条件・期待'; }
            if (this.spn() == 4) { return '依頼'; }

            return 'Unknown';
        };

        Result.prototype.eachPhrase = function(callbackFunction) {
            this.phrases().forEach(function(each) {
                callbackFunction(each);
            });
        };

        Result.prototype.eachMorpheme = function(callbackFunction) {
            this.morphemes().forEach(function(each) {
                callbackFunction(each);
            });
        };

        Result.prototype.phraseAt = function(phraseId) {
            for (var i = 0; i < this.phraseArray.length; i++) {
                var eachPhrase = this.phraseArray[i];

                if (eachPhrase.id() == phraseId) {
                    return eachPhrase;
                }
            }
            return null;
        };

        Result.prototype.morphemeAt = function(morphemeId) {
            for (var i = 0; i < this.morphemeArray.length; i++) {
                var eachMorpheme = this.morphemeArray[i];

                if (eachMorpheme.id() == morphemeId) {
                    return eachMorpheme;
                }
            }
            return null;
        };

        Result.prototype.printString = function() {
            var buf = [];
            this.eachMorpheme(function(each) {
                buf.push(each.gokan());
            });
            return 'a Result (' + buf.join('') + ' [' + this.impression() + '])';
        };

        return Result;
    })();
    JoysoundJLP.Result = Result;


    var Phrase = (function() {
        function Phrase(rawPhrase) {
            this.rawPhrase = rawPhrase;
        };

        Phrase.prototype.id = function() {
            return this.pid();
        };

        Phrase.prototype.pid = function() {
            return this.rawPhrase.pid;
        };

        Phrase.prototype.ppn = function() {
            return this.rawPhrase.ppn;
        };

        Phrase.prototype.did = function() {
            return this.rawPhrase.did;
        };

        Phrase.prototype.pairpn = function() {
            return this.rawPhrase.pairpn;
        };

        Phrase.prototype.deny = function() {
            return this.rawPhrase.deny;
        };

        Phrase.prototype.jshuushi = function() {
            return this.rawPhrase.jshuushi;
        };

        Phrase.prototype.jgokan = function() {
            return this.rawPhrase.jgokan;
        };

        Phrase.prototype.jhinshi = function() {
            return this.rawPhrase.jhinshi;
        };

        Phrase.prototype.jstart = function() {
            return this.rawPhrase.jstart;
        };

        Phrase.prototype.jcount = function() {
            return this.rawPhrase.jcount;
        };

        Phrase.prototype.jyomi = function() {
            return this.rawPhrase.jyomi;
        };

        Phrase.prototype.fshuushi = function() {
            return this.rawPhrase.fshuushi;
        };

        Phrase.prototype.fgokan = function() {
            return this.rawPhrase.fgokan;
        };

        Phrase.prototype.fhinshi = function() {
            return this.rawPhrase.fhinshi;
        };

        Phrase.prototype.fstart = function() {
            return this.rawPhrase.fstart;
        };

        Phrase.prototype.fcount = function() {
            return this.rawPhrase.fcount;
        };

        Phrase.prototype.fyomi = function() {
            return this.rawPhrase.fyomi;
        };

        Phrase.prototype.impression = function() {
            if (this.ppn() == 0) { return '評価なし'; }
            if (this.ppn() == 1) { return 'ポジティブ'; }
            if (this.ppn() == 2) { return 'ネガティブ'; }

            return 'Unknown';
        };

        Phrase.prototype.impressionOfDependencyRelation = function() {
            if (this.pairpn() == 0) { return '評価なし'; }
            if (this.pairpn() == 1) { return 'ポジティブ'; }
            if (this.pairpn() == 2) { return 'ネガティブ'; }

            return 'Unknown';
        };

        Phrase.prototype.printString = function() {
            var buf = [];
            buf.push(this.jgokan() + this.fgokan());
            buf.push(this.impression());
            return 'a Phrase (' + buf.join('') + ')';
        };

        return Phrase;
    })();
    JoysoundJLP.Phrase = Phrase;


    var Morpheme = (function() {
        function Morpheme(rawMorpheme) {
            this.rawMorpheme = rawMorpheme;
        };

        Morpheme.prototype.id = function() {
            return this.mid();
        };

        Morpheme.prototype.mid = function() {
            return this.rawMorpheme.mid;
        };

        Morpheme.prototype.pid = function() {
            return this.rawMorpheme.pid;
        };

        Morpheme.prototype.shuushi = function() {
            return this.rawMorpheme.shuushi;
        };

        Morpheme.prototype.gokan = function() {
            return this.rawMorpheme.gokan;
        };

        Morpheme.prototype.hinshi = function() {
            return this.rawMorpheme.hinshi;
        };

        Morpheme.prototype.start = function() {
            return this.rawMorpheme.start;
        };

        Morpheme.prototype.count = function() {
            return this.rawMorpheme.count;
        };

        Morpheme.prototype.yomi = function() {
            return this.rawMorpheme.yomi;
        };

        Morpheme.prototype.attr = function() {
            return this.rawMorpheme.attr;
        };

        Morpheme.prototype.printString = function() {
            var buf = [];
            buf.push(this.gokan());
            buf.push(this.hinshi());
            buf.push(this.yomi());

            return 'a Morpheme (' + buf.join(', ') + ')';
        };

        return Morpheme;
    })();
    JoysoundJLP.Morpheme = Morpheme;


    var Analyzer = (function() {
        function Analyzer(aConfig) {
            this.config = aConfig;
        };

        Analyzer.prototype.analyze = function(sentenceString, resultCallback) {
            this.request(sentenceString, resultCallback);
        };

        Analyzer.prototype.analyzeAll = function(sentenceStrings, resultCallback) {
            var joined = sentenceStrings.join('<!--p-->');
            this.request(joined, resultCallback);
        };

        Analyzer.prototype.handleRawResult = function(rawResult, resultCallback) {
            var resultSet = new ResultSet(rawResult, this.config);
            resultCallback(resultSet);
        };

        Analyzer.prototype.requestUrl = function(sentence) {
            var url = this.config.requestUrl();
            if (this.config.hasMode()) {
                url = url + 'mode=' + this.config.mode + '&';
            }

            var encodedSentence = encodeURIComponent(sentence);
            url = url + 'sent=' + encodedSentence;

            return url;
        };

        Analyzer.prototype.request = function(sentence, resultCallback) {
            var self = this;

            var url = this.requestUrl(sentence);
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                success: function(rawResult){
                    self.handleRawResult(rawResult, resultCallback)
                }
            });
        };

        return Analyzer;
    })();
    JoysoundJLP.Analyzer = Analyzer;

})(JoysoundJLP || (JoysoundJLP = {}));

