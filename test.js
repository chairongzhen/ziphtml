// var str = "2018-09-10 22:06:33";
// str = str.replace(/-/g,"/");
// var date = new Date(str);
// var unixDate = date.getTime()/1000 | 0;
// console.log(unixDate);

// let temp = 1711843520;

// function numToIp(number) {
//     var ip = number % 256;
//     for (var i = 1; i <= 3; i++) {
//     number = Math.floor(number / 256);
//     ip = number % 256 + '.' + ip;
//     }
//     let arr = ip.split('.');
//     let res = arr[3] + "." + arr[2] + "." + arr[1] + "." + arr[0];
//     return res;
// }

// console.log(numToIp(temp));

let arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

let tagsres = [{tag:4,tagvalue:100},{tag:8,tagvalue:200},{tag:15,tagvalue:250},{tag:20,tagvalue:50}];

let inter = [4,8,15,20];
let startflag = true;
let endflag = true;
let startbit = 0;
let endbit = 23;
let start,end;
let current = 0;
let interlength = inter.length;
for(let i=0;i<inter.length;i++) {
    let temparr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    if(startflag) {
        start = 0;
        end = inter[i];
        getcontent(temparr,start,inter[i]);
        current = inter[i];
        startflag = false;
    } else if(i== inter.length-1){
        start = current+1;
        end = inter[i] - current -1;
        getcontent(temparr,start,end);
        current = inter[i] +1;
        temparr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        getcontent(temparr,current,endbit-current +1);
    } else {
        start = current+1;
        end = inter[i] - current-1;
        getcontent(temparr,start,end);
        current = inter[i];
    }
}



function getcontent(arr,start,end) {
    console.log(arr.splice(start,end));
} 