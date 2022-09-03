/**
 * Handle error
 * @param err Error
 * @param res Response
 */
const handleError = (err, res) => {
   require("../utils/handleError").handleError(err, res);
}

/**
 * Save the image and get the image url
 * @param req Request
 * @param image Image
 * @param name Name
 * @returns {string} Image url
 */
const saveImage = (req, image) => {
   return require("../utils/saveImage").saveImage(req, image);
}

/**
 * Save images and get the images url
 * @param req Request
 * @param images File[] Array of images
 * @param limit Limit
 * @returns {[]} string[] Array of image urls
 */
const saveImageArr = (req, images, limit) => {
   return require("../utils/saveImage").saveImageArr(req, images, limit);
}

module.exports = {
   handleError,
   saveImage,
   saveImageArr
};
