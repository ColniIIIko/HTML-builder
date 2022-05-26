const fs = require('fs');
const path = require('path');

const copyPath = path.resolve(__dirname,'files-copy');

fs.readdir(copyPath, (err, files) => {
    if (!err) {
        files.forEach(file => {
            fs.unlink(path.join(copyPath, file), (err) => {
                if (err) {
                    console.error(err);
                    return;

                }
            })
        })
    } else return;
})

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
.catch(err => {
    console.log(err);
})

// fs.promises.readdir(copyPath)
// .then(fie => console.log(123))
// .catch(err => console.log(321));

