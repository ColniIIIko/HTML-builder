const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname,'project-dist');
const source = path.resolve(__dirname,'styles');

fs.promises.readdir(source,{withFileTypes: true})
.then(files => {
    let is = fs.createWriteStream(path.resolve(dist,'bundle.css'));
    for(let file of files)
    {
        if(file.name.match(/\.css/))
        {
            let rs = fs.createReadStream(path.resolve(source,file.name),'utf-8');
            rs.pipe(is);
        }
    }
});
