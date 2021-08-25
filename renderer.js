// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const exec = require('child_process').exec
const shell = require('electron').shell;
const { dialog } = require('electron').remote;

function runVnmFirst() {
    exec('sudo docker run --privileged --name vnm -v ~/vnm:/vnm -v /dev/shm:/dev/shm -e USER=neuro -p 6080:80 vnmd/vnm:20210523', (err, stdout, stderr) => {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
}

function startVnm() {
    exec('sudo docker start vnm', (err, stdout, stderr) => {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
}

function openVnm() {
    shell.openExternal('http://localhost:6080');
}

function stopVnm() {
    exec('sudo docker stop vnm', (err, stdout, stderr) => {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
}

function checkDocker() {
    exec('sudo docker info', (err, stdout, stderr) => {
        console.log('error', err);
        console.log('stdout', stdout);
        console.log('stderr', stderr);
        if (err) {
            dialog.showMessageBox({
                title: `Docker Error`,
                message: `Docker is not running`,
                buttons: [`OK`],
            });
        } else {
            dialog.showMessageBox({
                title: `Docker Good`,
                message: `Docker is running`,
                buttons: [`OK`],
            });
        }
    });
}

document.querySelector('#runVnmFirst').addEventListener('click', () => {
    runVnmFirst()
})

document.querySelector('#startVnm').addEventListener('click', () => {
    startVnm()
})

document.querySelector('#openVnm').addEventListener('click', () => {
    openVnm()
})

document.querySelector('#stopVnm').addEventListener('click', () => {
    stopVnm()
})

document.querySelector('#checkDocker').addEventListener('click', () => {
    checkDocker()
})
