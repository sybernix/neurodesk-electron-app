// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const exec = require('child_process').exec
const shell = require('electron').shell;
const { dialog } = require('electron').remote;
const os = require('os');

const platform = os.platform();

function runVnmFirst() {
    let runVnmFirstCommand;
    if (platform === 'linux') {
        runVnmFirstCommand = 'sudo docker run --privileged --name vnm -v ~/vnm:/vnm -v /dev/shm:/dev/shm -e USER=neuro -p 6080:80 vnmd/vnm:20210523';
    } else if (platform === 'darwin') {
        runVnmFirstCommand = 'docker run --privileged --name vnm -v ~/vnm:/vnm -e USER=neuro -p 6080:80 vnmd/vnm:20210523';
    } else if (platform === 'win32') {
        runVnmFirstCommand = 'docker run --privileged --name vnm -v C:/vnm:/vnm -e USER=neuro -p 6080:80 vnmd/vnm:20210523';
    }
    exec(runVnmFirstCommand, (err, stdout, stderr) => {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
}

function startVnm() {
    let startVnmCommand;
    if (platform === 'linux') {
        startVnmCommand = 'sudo docker start vnm';
    } else if (platform === 'darwin') {
        startVnmCommand = 'docker start vnm';
    } else if (platform === 'win32') {
        startVnmCommand = 'docker start vnm';
    }
    exec(startVnmCommand, (err, stdout, stderr) => {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
    //todo check if the commands work in mac and windows
}

function openVnm() {
    shell.openExternal('http://localhost:6080');
}

function stopVnm() {
    let stopVnmCommand;
    if (platform === 'linux') {
        stopVnmCommand = 'sudo docker stop vnm';
    } else if (platform === 'darwin') {
        stopVnmCommand = 'docker stop vnm';
    } else if (platform === 'win32') {
        stopVnmCommand = 'docker stop vnm';
    }
    exec(stopVnmCommand, (err, stdout, stderr) => {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
}

function checkDocker() {
    let checkDockerCommand;
    if (platform === 'linux') {
        checkDockerCommand = 'sudo docker info';
    } else if (platform === 'darwin') {
        checkDockerCommand = 'docker info';
    } else if (platform === 'win32') {
        checkDockerCommand = 'docker info';
    }
    exec(checkDockerCommand, (err, stdout, stderr) => {
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

function checkPlatform() {
    console.log(platform);
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

document.querySelector('#checkPlatform').addEventListener('click', () => {
    checkPlatform()
})
