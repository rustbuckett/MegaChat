const telegramIcon = document.getElementById('telegram-icon');
const discordIcon = document.getElementById('discord-icon');
const messengerIcon = document.getElementById('facebook-messenger-icon');
const mastodonIcon = document.getElementById('mastodon-icon');
const matrixIcon = document.getElementById('matrix-icon');
const messagesIcon = document.getElementById('messages-icon');
const lemmyIcon = document.getElementById('lemmy-icon');
const notionIcon = document.getElementById('notion-icon');
const content = document.getElementById('content');

telegramIcon.addEventListener('click', () => loadChatService('https://web.telegram.org/'));
discordIcon.addEventListener('click', () => loadChatService('https://discord.com/login'));
messengerIcon.addEventListener('click', () => loadChatService('https://www.messenger.com/login/'));
mastodonIcon.addEventListener('click', () => loadChatService('https://mastodon.social/home'));
matrixIcon.addEventListener('click', () => loadChatService('https://riot.im/app'));
messagesIcon.addEventListener('click', () => loadChatService('https://messages.google.com/web'));
lemmyIcon.addEventListener('click', () => loadChatService('https://programming.dev'));
notionIcon.addEventListener('click', () => loadChatService('https://notion.so'));

function loadChatService(url) {
    content.innerHTML = `<webview src="${url}" style="width:100%; height:100%;"></webview>`;
}
