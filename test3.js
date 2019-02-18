// // 4,8,15,20,23
// let temparr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
// let res1 = temparr.splice(0,4 + 1);
// console.log(res1);

// let res2 = temparr.splice(0,8-4);
// console.log(res2);

// let res3 = temparr.splice(0,15-8);
// console.log(res3);

// let res4 = temparr.splice(0,20-15);
// console.log(res4);

// let res5 = temparr.splice(0,23-20);
// console.log(res5);




let light = [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

let tagsres = [{tag:0,tagvalue:0},{tag:4,tagvalue:100},
    {tag:8,tagvalue:200},
    {tag:15,tagvalue:50},
    {tag:20,tagvalue:50},{tag:23,tagvalue:255}];
let temparr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
let startflag = true;
let tagslength = tagsres.length;
let res = [];
let val = [];
for(let i=0;i<tagslength;i++) {
    if(startflag) {
        res = temparr.splice(0,tagsres[i].tag +1 );
        startflag = false;
        val = [];
        if(tagsres[i].tag != 0) {
            val.push(0);
        } else {
            val.push(tagsres[i].tagvalue);
        }
        val.push(tagsres[i].tagvalue);
    } else {
        res = temparr.splice(0,tagsres[i].tag - tagsres[i-1].tag);
        val = [];
        val.push(tagsres[i-1].tagvalue);
        val.push(tagsres[i].tagvalue);
    }
    updatecontent(res,val);
}

function updatecontent(arr,val) {
    //console.log(arr,val);
    let length = arr.length;
    light[arr[length-1]] = val[1];
    let diff = 0;
    let perval = 0;
    if(val[0]<val[1]) {
        diff = val[1]-val[0];
        perval = diff / length | 0;
        for(let i=0;i<length-1;i++) {
            light[arr[i]] = (perval * (i + 1)) + val[0];
        }
    } else if(val[0]>val[1]) {
        diff = val[0] - val[1];
        perval = diff / length | 0;
        for(let i=0;i<length-1;i++) {
            light[arr[i]] = (perval*(length-i));
        }
        light[arr[length-1]] = val[1];
    } else {
        for(let i=0;i<length;i++) {
            light[arr[i]] = val[0];
        }
    }
}
console.log(light);
