
const readline = require('readline');
const fs = require('fs');
const os = require('os');

let fullfilename = './files/p.html'
let result = './result.txt'



let fRead = fs.createReadStream(fullfilename);
let fWrite = fs.createWriteStream(result);
let objReadline = readline.createInterface({
    input: fRead
});

let filename = fullfilename.substr(fullfilename.lastIndexOf('/')+1,fullfilename.length-1);
if(fs.exists(fullfilename,(res)=>{
    if(res) {
        objReadline.on('line',(line)=>{
            let ch = '"';
            let reg = "/" + ch + "/g";
            let res = '\\"';
            line = line.replace(eval(reg),res);
            let tmp = 'html = html + \"' + line + '\";';
            fWrite.write(tmp + os.EOL);
        });
        
        objReadline.on('close',()=>{
            // let postfix = 'file.close()';
            // fWrite.write(postfix + os.EOL);
            console.log('the file [',filename,'] loading success');
        });
    }
}));


