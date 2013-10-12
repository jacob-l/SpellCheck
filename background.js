/*
 * http://developer.chrome.com/extensions/background_pages.html - фоновая страница
 */

function contextMenuHandler(info, tab) {
    var text = info.selectionText;

    new SpellChecker().check(text).done(function(data) {
            console.log(data);
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
        title: 'Проверить правописание',
        //Элемент появится только тогда, когда есть выделенный текст на странице
        contexts: ['selection'],
        onclick: contextMenuHandler
    })
});