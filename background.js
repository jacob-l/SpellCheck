/*
 * http://developer.chrome.com/extensions/background_pages.html - фоновая страница
 */

function getHighlightedText(text, data) {
    var result = '',
        start = 0,
        noSuggestion = chrome.i18n.getMessage('noSuggestion'),
        errorCls = 'error-spell-checker';

    data.forEach(function(item) {
        var suggestion = item.s.join(', ') || noSuggestion;

        result += text.substr(start, item.pos - start);
        result += '<span class="{0}" title="{1}">{2}</span>'.
            replace('{0}', errorCls).
            replace('{1}', suggestion).
            replace('{2}', item.word);

        start = item.pos + item.len;
    });

    return result + text.substr(start, text.length - start);
}

function contextMenuHandler(info, tab) {
    var text = info.selectionText;

    new SpellChecker().check(text).done(function(data) {
            var htmlResult = getHighlightedText(text, data);

            /*
             * http://developer.chrome.com/extensions/tabs.html#method-sendMessage
             *
             * Отправляет сообщение во встроенный нашим
             * расширением скрипт в указанной вкладке.
             *
             * См. contentScript.js
             */
            chrome.tabs.sendMessage(tab.id, {
                content: htmlResult
            });
        }).fail(function() {
            console.log(arguments);
        });
};

/*
 * http://developer.chrome.com/extensions/runtime.html#event-onInstalled
 *
 * Это событие возникает, когда расширение впервые устанавливается,
 * обновляется до новой версии или Google Chrome обновляется до новой версии.
 */
chrome.runtime.onInstalled.addListener(function() {
    /*
     * http://developer.chrome.com/extensions/contextMenus.html#method-create
     *
     * Добавляем элемент в контекстное меню.
     */
    chrome.contextMenus.create({
        title: chrome.i18n.getMessage('checkSpelling'),
        //Элемент появится только тогда, когда есть выделенный текст на странице
        contexts: ['selection'],
        onclick: contextMenuHandler
    })
});