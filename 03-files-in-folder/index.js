const fs = require('fs');
const path = require('path');

fs.promises.readdir(path.resolve(__dirname,'secret-folder'),{withFileTypes: true})
    .then(files => {
        for(let file of files)
        {
            if(!file.isDirectory())
            {
                let fileParsed = path.parse(path.resolve(__dirname,'secret-folder',file.name));
                let string = `${fileParsed.name} - ${fileParsed.ext.slice(1)} - `;
                fs.stat(path.resolve(__dirname,'secret-folder',file.name),(err, stats)=>{
                    if(err)
                    {
                        console.log(err);
                    }else
                    {
                        console.log(string + (stats.size/1024).toFixed(1) + 'kb');
                    }
                });
            }
        }
    })
    .catch(err=> {
        console.log(err)
    })
