let myapp = async () => {
    let fs = require('fs');
    let path = require('path');

    function copyFileSync(source, target) {

        let targetFile = target;

        if (fs.existsSync(target)) {
            if (fs.lstatSync(target).isDirectory()) {
                targetFile = path.join(target, path.basename(source));
            }
        }

        fs.writeFileSync(targetFile, fs.readFileSync(source));
    }

    function copyFolderRecursiveSync(source, target) {
        let files = [];

        let targetFolder = path.join(target, path.basename(source));
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder);
        }

        if (fs.lstatSync(source).isDirectory()) {
            files = fs.readdirSync(source);
            files.forEach(function (file) {
                let curSource = path.join(source, file);
                if (fs.lstatSync(curSource).isDirectory()) {
                    copyFolderRecursiveSync(curSource, targetFolder);
                } else {
                    copyFileSync(curSource, targetFolder);
                }
            });
        }
    }

    const reader = require("readline-sync");

    let userName = reader.question("Username: ");

    copyFolderRecursiveSync('C:\\Users\\' + userName + '\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets', `C:\\work\\1`);

    const srcFolder = "C:\\work\\1\\Assets\\";
    const outFolder = "C:\\work\\1\\outImage\\";

    let d = new Date();
    let curr_date = d.getDate();
    let curr_month = d.getMonth() + 1;
    let curr_year = d.getFullYear();

    let data_f = curr_date + "-" + curr_month + "-" + curr_year;
    let myPrefix = "y";
    let prefix = myPrefix + data_f;

    fs.readdir(srcFolder, (err, files) => {
        files.forEach((file, i) => {
            fs.rename(srcFolder + file, outFolder + i + prefix + ".jpg", err => {
                if (err) throw err;
                console.log("rename completed!");
            });
        });
    });
};

(async () => {
    try {
        let text = await myapp();
        console.log(text);
    } catch (e) {
    }
})();