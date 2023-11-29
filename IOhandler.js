/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */
const fs = require('fs');
const { createReadStream, createWriteStream } = require("fs");

var AdmZip = require("adm-zip"),
  PNG = require("pngjs").PNG,
  path = require("path");
const { readdir} = require("fs/promises");
/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */

//const unzip = createGunzip();
const unzip = (pathIn, pathOut) => {
  var zip = new AdmZip(pathIn);
  zip.extractAllTo(/*target path*/ pathOut, /*overwrite*/ true);
  return "all done";
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */

const readDir = (dir) => {
  return readdir(dir)
  .then((files) => {
    const newArray = []; //maybe add for loop
    files.forEach(f => {
      if(f.endsWith(".png")){
        newArray.push(path.join(__dirname, "unzipped", f))
      }
    })
    return newArray
  })
  .catch((err) => console.log(err))
};


/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *const grayScale = (array, pathOut) => {
  
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */

  const grayScale = (pathIn, pathOut) => {
    return new Promise((resolve, reject) => {
        const inputStream = fs.createReadStream(pathIn);
        const outputStream = fs.createWriteStream(pathOut);
        inputStream
            .pipe(new PNG())
            .on('parsed', function() {
              for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                  var idx = (this.width * y + x) << 2;
      
                  const r = this.data[idx];
                  const g = this.data[idx + 1];
                  const b = this.data[idx + 2];
      
                  const result = (r+g+b)/3;
                  // invert color
                  this.data[idx] = result;
                  this.data[idx + 1] = result;
                  this.data[idx + 2] = result;
                }
              }
              this.pack().pipe(outputStream)
                .on('finish', () => resolve("All images are done in gray scaling"))
                .on('error', (err) => reject(err));
            })
            .on('error', (err) => reject(err));
    });
};

const blue = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
      const inputStream = fs.createReadStream(pathIn);
      const outputStream = fs.createWriteStream(pathOut);
      inputStream
          .pipe(new PNG())
          .on('parsed', function() {
            for (var y = 0; y < this.height; y++) {
              for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;

                this.data[idx] = 0;
                this.data[idx + 1] = 0;
                //this.data[idx + 2] = result;
              }
            }
            this.pack().pipe(outputStream)
              .on('finish', () => resolve("All images are done in sepia"))
              .on('error', (err) => reject(err));
          })
          .on('error', (err) => reject(err));
  });
};

module.exports = { unzip, grayScale, readDir, blue }