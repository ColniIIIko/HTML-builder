const fs = require('fs');
const path = require('path');

const copyPath = path.resolve(__dirname,'files-copy');

fs.promises.mkdir(copyPath,{recursive: true})
.then(dirPath => {
    return fs.promises.readdir(path.resolve(__dirname,'files'),{withFileTypes: true})
})
.then(files => {
    for(let file of files)
    {
        fs.promises.copyFile(path.resolve(__dirname,'files',file.name),path.resolve(copyPath,file.name));
    }
})
