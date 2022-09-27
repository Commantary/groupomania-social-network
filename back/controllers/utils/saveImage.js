const path = require("path");
const sharp = require("sharp");
const randomstring = require("randomstring");
const extensionAllowed = ["jpg", "jpeg", "png", "gif"];

require("dotenv").config();

function saveImageArr(req, images, limit) {
   let imageArr = [];

   for (let i = 0; i < Math.min(images.length, limit); i++) {
      let name = randomstring.generate(10);

      // Save image in images folder with fs module
      let imageName = `${Math.floor(Date.now() / 1000)}_${name}`;
      // Path of the image with the timestamp and name of the sauce
      let imageDirPath = path.join(__dirname, `${process.env.IMAGES_DIR}/${process.env.IMAGES_FOLDER}`);
      let imagePath = `${imageDirPath}/${imageName}.${images[i].name.split('.').pop()}`;

      let link = `${imageName}.${images[i].name.split('.').pop()}`

      imageArr.push(link);

      // Get the width from the image with sharp
      sharp(images[i].path)
         .metadata()
         .then(metadata => {
            let width = metadata.width;
            let height = metadata.height;

            // If the width is greater than 1920px and 1080px, resize the image to this size
            if (width > 1920 && height > 1080) {
               width = 1920;
               height = 1080;
            }

            sharp(images[i].path)
               .resize({width: width, height: height})
               .withMetadata()
               .toFile(imagePath, (err) => {
                  if (err) {
                     return console.log("sharp saving error:", err);
                  }
               })
         });
   }

   return imageArr;
}

function saveImage(req, image) {
   const name = randomstring.generate(10);
   // Save image in images folder with fs module
   const imageName = `${Math.floor(Date.now() / 1000)}_${name}`;
   // Path of the image with the timestamp and name of the sauce
   const imageDirPath = path.join(__dirname, `${process.env.IMAGES_DIR}/${process.env.IMAGES_FOLDER}`);
   const imagePath = `${imageDirPath}/${imageName}.${image.name.split('.').pop()}`;

   let link = `${imageName}.${image.name.split('.').pop()}`

   // Check the extension of the image
   if (!extensionAllowed.includes(image.name.split('.').pop())) {
      return "Extension not allowed";
   }

   // Get the width from the image with sharp
   sharp(image.path)
      .metadata()
      .then(metadata => {
         let width = metadata.width;
         let height = metadata.height;

         // If the width is greater than 1920px and 1080px, resize the image to this size
         if (width > 1920 && height > 1080) {
            width = 1920;
            height = 1080;
         }

         sharp(image.path)
            .resize({width: width, height: height})
            .withMetadata()
            .toFile(imagePath, (err) => {
               if (err) {
                  console.log("sharp saving error:", err);
               }
            });
      });

   return link;
}

module.exports = {
   saveImageArr,
   saveImage
};
