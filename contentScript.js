/*
 * http://developer.chrome.com/extensions/runtime.html#event-onMessage
 *
 * Событие возникает, когда расширение шлет сообщение.
 *
 * См. background.js
 */
chrome.runtime.onMessage.addListener(function(msg) {
    alert(msg.content);
});