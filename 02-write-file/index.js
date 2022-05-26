const fs = require('fs');
const path = require('path');

const outputStream = fs.createWriteStream(path.resolve(__dirname,'outputText.txt'));
const readline = require('readline').createInterface({input: process.stdin, output: outputStream});


console.log('Enter data: ');
readline.on('line',(input)=>{
    if(input == 'exit')
    {
        readline.close();
        outputStream.close();
        process.emit('SIGINT');
    }
    outputStream.write(input + '\n');
})



process.on('SIGINT',()=>{
    console.log('bye bye');
    process.exit(1);
})

