const { app, BrowserWindow, desktopCapturer } = require('electron');
const path = require('path');
const windowStateKeeper = require("electron-window-state");
let win;

function createWindow () {
  const mainWindowState = windowStateKeeper({
    defaultHeight: 400,
    defaultWidth: 400,
  });


  // Create the browser window.
  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //load the index.html from a url
  win.loadURL('http://localhost:3000');

  //load with file
  // win.loadFile(path.join(__dirname, '../build/index.html'));

  // Open the DevTools.
  win.webContents.openDevTools();
  mainWindowState.manage(win);
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.whenReady().then(createWindow)

// OS INFORMATION
const os = require("os");
console.log("cpus :: ", os.cpus());
console.log("homedir :: ", os.homedir());
console.log("hostname :: ", os.hostname());
console.log("machine :: ", os.machine());
console.log("networkInterfaces :: ", os.networkInterfaces());
console.log("cpuserInfous :: ", os.userInfo());
console.log("version :: ", os.version());

// TAKE A SCREENSHOT
setTimeout(() => {
  desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { height: 768, width: 1366}, fetchWindowIcons: true })
          .then( sources => {
            let imgg = sources[0].thumbnail.toDataURL();
            console.log("image data :: ", imgg);
            const fs = require('fs');
            imgg = imgg.replace(/^data:image\/\w+;base64,/, "")
            let buff = new Buffer(imgg, "base64");
            fs.writeFile(`img${Math.random()}.png`, buff, "base64", function(err) {
              if (err) {
                console.log("err :: ", err);
              }
            })
              // document.getElementById('root').src = sources[0].thumbnail.toDataURL() // The image to display the screenshot
          })
}, 5000);

// Quit when all windows are closed, except on macOS. There, it's common
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

app.on('before-quit', (e) => {
  console.warn("before-quit fired :: ");
  // e.preventDefault(); // this will not allow application to get quit. because before app quit, this will set its state to default.
});
