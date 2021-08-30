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

function removeDocker() {
    let removeDockerCommand = 'sudo apt-get remove docker docker-engine docker.io containerd runc';
    exec(removeDockerCommand, (err, stdout, stderr) => {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
}

document.querySelector('#removeDocker').addEventListener('click', () => {
    removeDocker()
})
