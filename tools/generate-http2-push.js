fs = require('fs');

fs.readdir('dist/', (err, files) => {
    files = files.filter(file => {
        if(file.indexOf('.gz') != -1) {
            return false;
        }
        if(file.indexOf('.bundle.') != -1) {
            return true;
        } else {
            return false;
        }
    })
    let result = '';
    for(let file of files) {
        let type;
        if(file.substr(-3) == "css") {
            type = 'style';
        } else {
            type = 'script';
        }
        result += `</${file}>;rel=preload;as=${type},`
    }
    console.log(result);
})