
//let light = { t0:0,t1:0,t2:0,t3:0,t4:0,t5:0,t6:0,t7:0,t8:0,t9:0,t10:0,t11:0,t12:0,t13:0,t14:0,t15:0,t16:0,t17:0,t18:0,t19:0,t20:0,t21:0,t22:0,t23:0}；
let light = [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

let tagsres = [{tag:4,tagvalue:100},
    {tag:8,tagvalue:200},
    {tag:15,tagvalue:250},
    {tag:20,tagvalue:50},{tag:23,tagvalue:18}];

let startflag = true;
let endbit = 23;
let start,end;
let current = 0;

let tagslength = tagsres.length;
for(let i=0;i<tagslength;i++) {
    let temparr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    let tagvalues = [];
    if(startflag) {
        start = 0;
        end = tagsres[i].tag;
        getcontent(temparr,start,tagsres[i].tag,tagsres[i].tagvalue);
        current = tagsres[i].tag;
        startflag = false;
    } else if(i== tagslength-1){
        start = current+1;
        end = tagsres[i].tag - current;
        tagvalues.push(tagsres[i-1].tagvalue);
        tagvalues.push(tagsres[i].tagvalue);
        getcontent(temparr,start,end,tagvalues);
        
        current = tagsres[i].tag +1;
        temparr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        getcontent(temparr,current,endbit-current +1,tagsres[i].tagvalue);
    } else {
        start = current+1;
        end = tagsres[i].tag - current;
        tagvalues.push(tagsres[i-1].tagvalue);
        tagvalues.push(tagsres[i].tagvalue);
        getcontent(temparr,start,end,tagvalues);
        current = tagsres[i].tag;
    }
}



function getcontent(arr,start,end,tagvalue) {
    // if(start == 0) {
    //     light[0] = tagvalue;
    // } else if(start == 24) {
    //     light[23] = tagvalue;
    // } else {
    //     let res = arr.splice(start,end);
    //     updatecontent(res,tagvalue);
    // }
    let res = arr.splice(start,end);
    console.log(res);
    //updatecontent(res,tagvalue);    
} 


function updatecontent(arr,val) {
    console.log(arr,val);
    light[arr[0]] = val[0];
    let length = arr.length;
    light[arr[length-1]] = val[1];
    
    let data = 0;
    let diff = 0;
    let perval = 0;
    if(val[0]< val[1]) {
        diff = val[1]-val[0];
        perval = diff / (arr.length-1) | 0
        for(let i=1;i<length-1;i++) {            
            light[arr[i]] = (perval * i) + val[0];
        }
    } else if(val[0]>val[1]) {
        diff = val[0] - val[1];
        perval = diff / (arr.length-1) | 0;
        for(let i=1;i<length-1;i++) {
            light[arr[i]] = (perval * (length-i));
        }
    }
}

//console.log(light);

