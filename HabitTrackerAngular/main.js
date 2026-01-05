const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    // آیکون برنامه (اختیاری)
    icon: path.join(__dirname, 'dist/habit-tracker/public/icon.ico') 
  });

  // حذف منوی بالا (File, Edit, ...) برای زیبایی بیشتر
  mainWindow.setMenuBarVisibility(false);

  // فایل اصلی آنگولار را لود کن
  // نکته: نام پوشه پروژه باید دقیق باشد
  mainWindow.loadFile(
    path.join(__dirname, 'dist/habit-tracker/browser/index.html')
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});