const fs = require('fs');
const path = require('path');

let stream = new fs.ReadStream(path.join(__dirname,'text.txt'), {encoding: 'utf-8'});

stream.on('data',(data) => {
    if(data)
    {
        console.log(data);
    }
    else
    {
        console.log('cannont read file');
    }

});


