const path = require("path");
const unzipper = require("unzipper")
const fs = require("fs").promises
 const PNG = require("pngjs").PNG
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const pathToBlue = path.join(__dirname, "blue");

/*IOhandler.unzip(zipFilePath, pathUnzipped)
IOhandler.readDir(pathUnzipped)
IOhandler.grayScale(zipFilePath, pathProcessed)
    //.then((listOfImages) => brightFilter(listOfImages, pathProcessed))
    .catch((err) => console.log(err));
//IOhandler.readDir(pathUnzipped)*/

// .then(pics => console.log(pics))
//.then(pics => pics.forEach(p => IOhandler.grayScale(pathUnzipped, pathProcessed)))
async function main() {
    IOhandler.unzip(zipFilePath, pathUnzipped);
    //console.log(unz);
    const data = await IOhandler.readDir(pathUnzipped);
    const grayImages = data.map( data => IOhandler.grayScale(data, data.replace(pathUnzipped, pathProcessed)));
    const blueImages = data.map( data => IOhandler.blue(data, data.replace(pathUnzipped, pathToBlue)));
}

main();
// IOhandler.readDir(pathUnzipped)
// .then(data => data.forEach(p => IOhandler.grayScale(pathUnzipped, pathProcessed)))
/*for (let i = 0; i < data.length; i++) {
        const file = data[i];
        const outputFilename =  path.join(__dirname, "grayscaled", `gray${i}.png`);
        const outputSepia = path.join(__dirname, "sepia", `sepia${i}.png`);
        const sepiaImages = IOhandler.sepia(file, outputSepia);
        const grayImages = IOhandler.grayScale(file, outputFilename);
        return grayImages, sepiaImages; 
    }*/