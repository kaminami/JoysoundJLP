window.onload = function() {
    document.getElementById('example02Button').onclick = function(event) {

        var config = new JoysoundJLP.Config('YOUR_ACCESSKEY'); // use your AccessKey !!!
        var analyzer = new JoysoundJLP.Analyzer(config);

        analyzer.getSensibilities(function(valuelist) {
            console.log(valuelist);

            clearSensibilities();
            valuelist.value.forEach(function(value) {
                addItemToSensibilities(value);
            });
        });

        var addItemToSensibilities = function(value) {
            $("#example02-sensibilities").append($("<li>").text(value).append($("</li>")));
        }

        var clearSensibilities = function(value) {
            $("#example02-sensibilities").empty();
        }
    };
}
