const fs = require('fs');
const path = require('path');

async function readFile(filePath)
{
    return await fs.promises.readFile(filePath,'utf-8');
}

async function cpyDir(src,dest)
{
    fs.promises.mkdir(dest,{recursive: true})
    .then(dirPath => {
        return fs.promises.readdir(path.resolve(src),{withFileTypes: true})
    })
    .then(files => {
        for(let file of files)
        {
            if(!file.isDirectory())
                fs.promises.copyFile(path.resolve(src,file.name),path.resolve(dest,file.name));
            else
                cpyDir(path.resolve(src,file.name),path.resolve(dest,file.name));
        }
    });
}

async function replaceHTML(data,dirPath)
{
    let tags = [...data.matchAll(/{{(\w*)}}/g)];
    for(let tag of tags)
    {
        await readFile(path.resolve(dirPath,`${tag[1]}.html`))
        .then(replaceData => {
            data = data.replace(tag[0],replaceData);
        })
    }

    return data;

}

async function mergeStyles(src,dist)
{
    fs.promises.readdir(src,{withFileTypes: true})
    .then(files => {
        let is = fs.createWriteStream(path.resolve(dist,'style.css'));
        for(let file of files)
        {
            if(file.name.match(/\.css/))
            {
                let rs = fs.createReadStream(path.resolve(src,file.name),'utf-8');
                rs.pipe(is);
            }
        }
    });
}

async function app()
{
    let distDir = path.resolve(__dirname,'project-dist');

    cpyDir(path.resolve(__dirname,'assets'),path.resolve(distDir,'assets'));

    readFile(path.resolve(__dirname,'template.html'))
    .then(html => replaceHTML(html,path.resolve(__dirname,'components')))
    .then(htmlReplace => fs.promises.writeFile(path.resolve(distDir,'index.html'),htmlReplace));

    mergeStyles(path.resolve(__dirname,'styles'),distDir);
}

app();