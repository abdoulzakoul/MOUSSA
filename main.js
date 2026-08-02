const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 850,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#F1F3F7',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  Menu.setApplicationMenu(null);

  win.loadFile(path.join(__dirname, 'app', 'zaktech-erp.html'));
  win.webContents.openDevTools(); // TEMPORAIRE : pour voir l'erreur exacte
}

app.whenReady().then(() => {
  createWindow();
  globalShortcut.register('F12', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) win.webContents.toggleDevTools();
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
