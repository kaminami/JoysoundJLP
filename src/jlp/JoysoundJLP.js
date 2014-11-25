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
            this.apierr = rawResult.apierr;

            this.config = config;
            this.results = [];

            this.parse(rawResult);
        };

        ResultSet.prototype.parse = function(rawResult) {
            var self = this;
            rawResult.results.forEach(function(eachRawResult) {
                var sentence = new Result(eachRawResult);
                self.results.push(sentence)
            });
        };

        return ResultSet;
    })();
    JoysoundJLP.ResultSet = ResultSet;


    var Result = (function() {
        function Result(rawResult) {
            this.err = rawResult.err;
            this.spn = rawResult.spn;
            this.pubrt = rawResult.pubrt;
            this.reply = rawResult.reply;
            this.mention = rawResult.mention;
            this.url = rawResult.url;
            this.hashtags = rawResult.hashtags;
            this.sensibilities = rawResult.sensibilities;

            this.phrases = [];
            this.morphemes = [];

            this.parse(rawResult)
        };

        Result.prototype.parse = function(rawResult) {
            var self = this;
            rawResult.phrases.forEach(function(eachRawPhrase) {
                var phrase = new Phrase(eachRawPhrase);
                self.phrases.push(phrase)
            });

            rawResult.morphemes.forEach(function(eachRawMorpheme) {
                var morpheme = new Morpheme(eachRawMorpheme);
                self.morphemes.push(morpheme)
            });
        };

        Result.prototype.publicRetweetedUser = function() {
            return this.pubrt;
        };

        Result.prototype.repliedUser = function() {
            return this.reply;
        };

        Result.prototype.mentionedUsers = function() {
            return this.mention;
        };

        Result.prototype.containedUrls = function() {
            return this.url;
        };

        Result.prototype.reading = function() {
            var buffer = [];
            this.eachPhrase(function(each) {
                buffer.push(each.reading());
            });
            return buffer.join(' ');
        };

        Result.prototype.impression = function() {
            if (this.spn == 0) { return '評価なし'; }
            if (this.spn == 1) { return 'ポジティブ'; }
            if (this.spn == 2) { return 'ネガティブ'; }
            if (this.spn == 3) { return '条件・期待'; }
            if (this.spn == 4) { return '依頼'; }

            return 'Unknown';
        };

        Result.prototype.eachPhrase = function(callbackFunction) {
            this.phrases.forEach(function(each) {
                callbackFunction(each);
            });
        };

        Result.prototype.eachMorpheme = function(callbackFunction) {
            this.morphemes.forEach(function(each) {
                callbackFunction(each);
            });
        };

        Result.prototype.phraseAt = function(phraseId) {
            for (var i = 0; i < this.phrases.length; i++) {
                var eachPhrase = this.phrases[i];

                if (eachPhrase.id() == phraseId) {
                    return eachPhrase;
                }
            }
            return null;
        };

        Result.prototype.morphemeAt = function(morphemeId) {
            for (var i = 0; i < this.morphemes.length; i++) {
                var eachMorpheme = this.morphemes[i];

                if (eachMorpheme.id() == morphemeId) {
                    return eachMorpheme;
                }
            }
            return null;
        };

        Result.prototype.printString = function() {
            var buf = [];
            this.eachMorpheme(function(each) {
                buf.push(each.gokan);
            });
            return 'a Result (' + buf.join('') + ' [' + this.impression() + '])';
        };

        return Result;
    })();
    JoysoundJLP.Result = Result;


    var Phrase = (function() {
        function Phrase(rawPhrase) {
            this.pid = rawPhrase.pid;
            this.ppn = rawPhrase.ppn;
            this.did = rawPhrase.did;
            this.pairpn = rawPhrase.pairpn;
            this.deny = rawPhrase.deny;
            this.jshuushi = rawPhrase.jshuushi;
            this.jgokan = rawPhrase.jgokan;
            this.jhinshi = rawPhrase.jhinshi;
            this.jstart = rawPhrase.jstart;
            this.jcount = rawPhrase.jcount;
            this.jyomi = rawPhrase.jyomi;
            this.fshuushi = rawPhrase.fshuushi;
            this.fgokan = rawPhrase.fgokan;
            this.fhinshi = rawPhrase.fhinshi;
            this.fstart = rawPhrase.fstart;
            this.fcount = rawPhrase.fcount;
            this.fyomi = rawPhrase.fyomi;
        };

        Phrase.prototype.id = function() {
            return this.pid;
        };

        Phrase.prototype.reading = function() {
            return this.jyomi + this.fyomi;
        };

        Phrase.prototype.impression = function() {
            if (this.ppn == 0) { return '評価なし'; }
            if (this.ppn == 1) { return 'ポジティブ'; }
            if (this.ppn == 2) { return 'ネガティブ'; }

            return 'Unknown';
        };


        Phrase.prototype.isPositive = function() {
            return this.ppn == 1;
        }

        Phrase.prototype.isNegative = function() {
            return this.ppn == 2;
        }

        Phrase.prototype.isNeutral = function() {
            return this.ppn == 0;
        }

        Phrase.prototype.impressionOfDependencyRelation = function() {
            if (this.pairpn == 0) { return '評価なし'; }
            if (this.pairpn == 1) { return 'ポジティブ'; }
            if (this.pairpn == 2) { return 'ネガティブ'; }

            return 'Unknown';
        };

        Phrase.prototype.printString = function() {
            var buf = [];
            buf.push(this.jgokan + this.fgokan);
            buf.push(this.impression());
            return 'a Phrase (' + buf.join(', ') + ')';
        };

        return Phrase;
    })();
    JoysoundJLP.Phrase = Phrase;


    var Morpheme = (function() {
        function Morpheme(rawMorpheme) {
            this.mid = rawMorpheme.mid;
            this.pid = rawMorpheme.pid;
            this.shuushi = rawMorpheme.shuushi;
            this.gokan = rawMorpheme.gokan;
            this.hinshi = rawMorpheme.hinshi;
            this.start = rawMorpheme.start;
            this.count = rawMorpheme.count;
            this.yomi = rawMorpheme.yomi;
            this.attr = rawMorpheme.attr;
        };

        Morpheme.prototype.id = function() {
            return this.mid;
        };

        Morpheme.prototype.reading = function() {
            return this.yomi;
        };

        Morpheme.prototype.printString = function() {
            var buf = [];
            buf.push(this.gokan);
            buf.push(this.hinshi);
            buf.push(this.yomi);

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
