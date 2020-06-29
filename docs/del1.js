
let Promise = require('./Promise');

let fs = require('fs');



function read(filename) {

    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (data) {
                resolve(data)

            } else {
                reject(err)
            }
        })
    })
}


read('./name.txt1').then(res => {
    console.log(res)
}, err => {
    console.log(err)
})


