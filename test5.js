let TIMEDEFINE =
["0:00", "0:10", "0:20", "0:30", "0:40", "0:50",
    "1:00", "1:10", "1:20", "1:30", "1:40", "1:50",
    "2:00", "2:10", "2:20", "2:30", "2:40", "2:50",
    "3:00", "3:10", "3:20", "3:30", "3:40", "3:50",
    "4:00", "4:10", "4:20", "4:30", "4:40", "4:50",
    "5:00", "5:10", "5:20", "5:30", "5:40", "5:50",
    "6:00", "6:10", "6:20", "6:30", "6:40", "6:50",
    "7:00", "7:10", "7:20", "7:30", "7:40", "7:50",
    "8:00", "8:10", "8:20", "8:30", "8:40", "8:50",
    "9:00", "9:10", "9:20", "9:30", "9:40", "9:50",
    "10:00", "10:10", "10:20", "10:30", "10:40", "10:50",
    "11:00", "11:10", "11:20", "11:30", "11:40", "11:50",
    "12:00", "12:10", "12:20", "12:30", "12:40", "12:50",
    "13:00", "13:10", "13:20", "13:30", "13:40", "13:50",
    "14:00", "14:10", "14:20", "14:30", "14:40", "14:50",
    "15:00", "15:10", "15:20", "15:30", "15:40", "15:50",
    "16:00", "16:10", "16:20", "16:30", "16:40", "16:50",
    "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
    "18:00", "18:10", "18:20", "18:30", "18:40", "18:50",
    "19:00", "19:10", "19:20", "19:30", "19:40", "19:50",
    "20:00", "20:10", "20:20", "20:30", "20:40", "20:50",
    "21:00", "21:10", "21:20", "21:30", "21:40", "21:50",
    "22:00", "22:10", "22:20", "22:30", "22:40", "22:50",
    "23:00", "23:10", "23:20", "23:30", "23:40", "23:50"
];

function updatecontent(arr, val, light) {
    let length = arr.length;
    light[arr[length - 1]] = val[1];
    let diff = 0;
    let perval = 0;
    if (val[0] < val[1]) {
        diff = val[1] - val[0];
        perval = diff / length | 0;
        for (let i = 0; i < length - 1; i++) {
            light[arr[i]] = (perval * (i + 1)) + val[0];
        }
    } else if (val[0] > val[1]) {
        diff = val[0] - val[1];
        perval = diff / length | 0;
        for (let i = 0; i < length - 1; i++) {
            light[arr[i]] = (perval * (length - i)) + val[1] - perval;
        }
    } else {
        for (let i = 0; i < length; i++) {
            light[arr[i]] = val[0];
        }
    }
}

function generateLightData(tagsres) {
    let light = [];
    for(var i=0;i<144;i++) {
        light.push(0);
    }
    return new Promise((resolve, reject) => {
        let temparr = [];
        for(var i=0;i<144;i++) {
            temparr.push(i);
        }
        let startflag = true;
        let tagslength = tagsres.length;
        let res = [];
        let val = [];
        for (let i = 0; i < tagslength; i++) {
            if (startflag) {
                res = temparr.splice(0, tagsres[i].tag + 1);
                startflag = false;
                val = [];
                if (tagsres[i].tag != 0) {
                    val.push(0);
                } else {
                    val.push(tagsres[i].tagvalue);
                }
                val.push(tagsres[i].tagvalue);
            } else {
                res = temparr.splice(0, tagsres[i].tag - tagsres[i - 1].tag);
                val = [];
                val.push(tagsres[i - 1].tagvalue);
                val.push(tagsres[i].tagvalue);
            }
            updatecontent(res, val, light);
        }

        resolve(light);
    });

}

let tagsres = [
    { tag: 0, tagvalue: 51 },
    { tag: 64, tagvalue: 100 },
    { tag: 78, tagvalue: 100},
    { tag: 80, tagvalue: 100 }
];

let res = generateLightData(tagsres);
console.log(res);