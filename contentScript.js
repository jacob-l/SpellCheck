function showPopup(htmlMsg) {
    var popup = $(
        '<div class="wrapper-spell-checker reset-css-spell-checker">' +
            '<div class="header-spell-checker">' +
                chrome.i18n.getMessage('checking') +
                '<div class="close-spell-checker"></div>' +
            '</div>' +
            '<div class="content-spell-checker">' +
                htmlMsg +
            '</div>' +
        '</div>'),
        close = popup.find('div.close-spell-checker'),
        body = $('body');

    close.click(function () {
        popup.remove();
    });

    body.click(function (event) {
        if ($(event.target).parents('div.wrapper-spell-checker').length === 0) {
            popup.remove();
        }
    });
    body.append(popup);
}

/*
 * http://developer.chrome.com/extensions/runtime.html#event-onMessage
 *
 * Событие возникает, когда расширение шлет сообщение.
 *
 * См. background.js
 */
chrome.runtime.onMessage.addListener(function(msg) {
    showPopup(msg.content);
});