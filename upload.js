
const readline = require('readline');
const fs = require('fs');
const os = require('os');

let fullfilename = './files/p.json'
let result = './result.txt'



let fRead = fs.createReadStream(fullfilename);
let fWrite = fs.createWriteStream(result);
let objReadline = readline.createInterface({
    input: fRead
});

let filename = fullfilename.substr(fullfilename.lastIndexOf('/')+1,fullfilename.length-1);
if(fs.exists(fullfilename,(res)=>{
    if(res) {
        let prefixtmp = 'deleteFile(SPIFFS,\"/' + filename + "\");";

        fWrite.write(prefixtmp + os.EOL);
        objReadline.on('line',(line)=>{
            let ch = '"';
            let reg = "/" + ch + "/g";
            let res = '\\"';
            line = line.replace(eval(reg),res);
            let tmp = 'appendFile(SPIFFS, \"/' + filename + "\",\""  + line + "\");";
            fWrite.write(tmp + os.EOL);
            let blankline = 'appendLn(SPIFFS,\"/' + filename + "\");";
            fWrite.write(blankline + os.EOL);
        });
        
        objReadline.on('close',()=>{
            // let postfix = 'file.close()';
            // fWrite.write(postfix + os.EOL);
            console.log('the file [',filename,'] loading success');
        });
    }
}));


