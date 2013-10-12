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
        close = popup.find('div.close-spell-checker');

    close.click(function () {
        popup.remove();
    });

    $('body').append(popup);
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