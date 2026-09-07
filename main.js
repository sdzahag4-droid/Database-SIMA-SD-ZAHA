const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    // --- TAMBAHKAN BARIS INI DI BAWAH ---
    icon: path.join(__dirname, 'src/icon.ico'), 
    // ------------------------------------
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('src/index.html');
  
  // Opsional: Hilangkan menu bar default agar terlihat lebih seperti aplikasi profesional
  win.setMenuBarVisibility(false); 
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});