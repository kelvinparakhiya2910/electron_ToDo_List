const electron = require("electron");
const { app, BrowserWindow, protocol, Menu, Tray, ipcMain } = electron;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

// DataBase Import 
const Database = require('better-sqlite3');
const DataBaseName = new Database('tododata', {});

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'my-electron-app',
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "./preload.js"),
        },
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
    protocol.registerHttpProtocol(
        "file",
        (request, callback) => {
            const url = request.url.substr(8);
            callback({ path: path.normalize(`${__dirname}/${url}`) });
        },
        (error) => {
            if (error) console.error("Failed to register protocol");
        }
    );
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
    setupLocalFilesNormalizerProxy();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            // createWindow();
        }
    });

    //Tray is to add app in bottom fram
    tray = new Tray("public/download.png");

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "App Name",
            click: function () {
                mainWindow.show();
            },
        },
        {
            label: "Quit",
            type: "normal",
            click: function () {
                app.isQuiting = true;
                app.quit();
            },
        },
    ]);

    tray.setToolTip("Electron + React");
    tray.setContextMenu(contextMenu);
    tray.on("click", () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
});


// app.on("ready", createWindow);
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});


// -> All Database Quri Start <- //

// ## Database Query Fire and Select Query Function;
const queryFunction = () => {
    const queri = "SELECT * FROM todoList";
    let fireQuery = DataBaseName.prepare(queri);
    let responce = fireQuery.all();
    return responce;
};


// Get Table Queri (get_table);
ipcMain.handle("get_table", async (event) => {
    const get = queryFunction();
    return get;
});

// Add Table Row Queri (add_table_row);
ipcMain.handle("add_table_row", async (event, data) => {
    const queri_1 = "INSERT INTO todoList (todo_name,is_completed,is_editing) VALUES (?,?,?)";
    DataBaseName.prepare(queri_1).run([data.todo_text, 1, 0]);
    return queryFunction();
});

// Edit Table Row Queri (edit_todo_text);
ipcMain.handle("edit_todo_text", async (event, data) => {
    const queri_1 = "UPDATE todoList SET todo_name= ?, is_editing= ?, is_completed= ? WHERE todo_id= ?";
    DataBaseName.prepare(queri_1).run([data.todo_name, data.is_editing, data.is_completed,data.todo_id]);
    return queryFunction();
});

// Edit Table Row Queri (is_todo_editing);
ipcMain.handle("is_todo_editing", async (event, data) => {
    const queri_1 = "UPDATE todoList SET is_editing= ? WHERE todo_id= ?";
    DataBaseName.prepare(queri_1).run([data.is_editing, data.todo_id]);
    return queryFunction();
});

// Edit Table Row Queri (complete_todo_edit);
ipcMain.handle("complete_todo_edit", async (event, data) => {
    const queri_1 = "UPDATE todoList SET is_completed= ? WHERE todo_id= ?";
    DataBaseName.prepare(queri_1).run([data.is_completed, data.todo_id]);
    return queryFunction();
});

// Delete Table Row Queri (delete_table_row);
ipcMain.handle("delete_table_row", async (event, data) => {
    const queri_1 = "DELETE FROM todoList WHERE todo_id=?";
    DataBaseName.prepare(queri_1).run([data.todo_id]);
    return queryFunction();
})

