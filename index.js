const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: "AKIAJZ5H2FLQMSWPPXUQ",
    secretAccessKey: "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" 
});

const fileName = 'my-file.jpeg';

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'upload-test-to-amazon-s3', // pass your bucket name
         Key: 'my-file.jpeg', // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(err, data) {
         if (err) throw err;
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};


//uploadFile();

// const file_to_download = 'my-file.jpeg';
// function downloadfile(Bucket, Key, outputPath){
//     try{
//     var file = {
//     Bucket : 'upload-test-to-amazon-s3',
//     Key: 'my-file.jpeg',
//     };
//     var file = fs.createWriteStream('/Downloads');
//    getObject(Key).createReadStream().pipe(file);
   
//     }catch (error){
//     console.error("Error while getting file from s3 bucket:",error, error.stack);
    
//     }
// }
// downloadfile('upload-test-to-amazon-s3','my-file.jpeg',"/Downloads");

exports.getFile = (req, res, next) => {
    let fileKey = 'my-file.jpeg'; //just a dummy
  
    console.log("Trying to download file", fileKey);
    let s3 = new AWS.S3();
    let options = {
      Bucket: 'upload-test-to-amazon-s3',
      Key: 'my-file.jpeg',
    };
  
    res.attachment(fileKey);
    let fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(res);
    console.log("The file is ",fileStream);
  };