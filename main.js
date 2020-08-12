// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

//const VirtualKeyboard = require('electron-virtual-keyboard');
 
let vkb; // keep virtual keyboard reference around to reuse.
     
      
      

function createWindow () {
  // Create the browser window.
  
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    //frame:false,
    webPreferences: {
      nodeIntegration: true ,
      preload: path.join(__dirname, 'preload.js')
      
    }
  })
  
  // var config=require('./config')
  // sql.connect(config, function (err) {

  //   });
  // and load the index.html of the app.
  //mainWindow.setFullScreen(true);
  mainWindow.loadFile('./index.html')
  //vkb = new VirtualKeyboard(mainWindow.webContents);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})
var handleStartupEvent = function () {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1];

  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      install();
      return true;
    case '--squirrel-uninstall':
      uninstall();
      app.quit();
      return true;
    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
 
  function install() {
    var cp = require('child_process');    
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }
  function uninstall() {
    var cp = require('child_process');    
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }

};

if (handleStartupEvent()) {
  return;
}
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
