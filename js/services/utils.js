
module.exports.GetURLParameter = function GetURLParameter(sParam) {
    let value;
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            value = sParameterName[1];
        }
    }
    return value;
};