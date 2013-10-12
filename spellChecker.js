var SpellChecker = function () {
}

SpellChecker.prototype = {
    /*
     * Яндекс.Спеллер API http://api.yandex.ru/speller/doc/dg/reference/checkText.xml
     */
    url: 'https://speller.yandex.net/services/spellservice.json/checkText',

    check: function (text) {
        return $.ajax({
            type: "POST",
            url: this.url,
            data: {
                text: text
            }
        });
    }
}