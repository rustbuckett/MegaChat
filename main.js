
const { app, BrowserWindow, Menu, Tray, shell } = require('electron');
const path = require('path');

let mainWindow;
let tray = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true, // Enable context isolation for security
            // preload: path.join(__dirname, 'preload.js') // Use a preload script
            webviewTag: true,
        },
        icon: path.join(__dirname, './assets/icons/four-arrows-48.png')
    });

    loadTelegram(); // Load Telegram by default

    const menu = Menu.buildFromTemplate([
        {
            label: 'Chat Services',
            submenu: [
                { label: 'Telegram', click: () => loadTelegram() },
                { label: 'Discord', click: () => loadDiscord() },
                { label: 'Messages', click: () => loadMessages() },
                { label: 'Facebook', click: () => loadFacebook() },
                { label: 'Matrix', click: () => loadMatrix() },
                { label: 'Lemmy', click: () => loadLemmy() },
                { label: 'Mastodon', click: () => loadMastodon() },
                { label: 'Notion', click: () => loadNotion() },
                { label: 'Quit', click: () => app.quit() }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);

    createTray();

    mainWindow.webContents.on('new-window', function(event, url) {
        event.preventDefault(); // Prevent opening new Electron window
        shell.openExternal(url); // Open URL in default browser
    });

    mainWindow.loadFile('src/index.html');

// You will need to replace 'electron' with whatever you named the exposed object in the preload script.
}

function loadTelegram() {
    mainWindow.loadURL('https://web.telegram.org/');
}

function loadDiscord() {
    mainWindow.loadURL('https://discord.com/login');
}

function loadMessages() {
    mainWindow.loadURL('https://messages.google.com/web/');
};

function loadFacebook() {
    mainWindow.loadURL('https://www.messenger.com/login/')
};

function loadMatrix() {
    mainWindow.loadURL('https://riot.im/app')
};

function loadLemmy() {
    mainWindow.loadURL('https://programming.dev/')
};

function loadMastodon() {
    mainWindow.loadURL('https://mastodon.social/home')
};

function loadNotion() {
    mainWindow.loadURL('https://notion.so')
};

function createTray() {
    tray = new Tray(path.join(__dirname, './assets/icons/four-arrows-22.png'));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open', click: () => mainWindow.show() },
        { label: 'Quit', click: () => app.quit() }
    ]);
    tray.setToolTip('MegaChat');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
