const fs = require("fs");
const imageUpload = (dir, image, originalName) => {
  let imageName = "";
  try {
    if (dir && image && originalName) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const imageExt = originalName.split(".")[originalName.split(".").length - 1]
      const imageTitle = Date.now();
      const path = `./public/uploads/${dir}/${imageTitle}.${imageExt}`;
      const normalImage = imageTitle + "." + imageExt;
	    let base64Data = '';
  	  if(image.includes("data:application/pdf;base64,")){
        base64Data = image.replace("data:application/pdf;base64,","");
  	  } else {
        base64Data = image.replace(/^data:([A-Za-z-+/]+);base64,/, "");
  	  }
      fs.writeFileSync(path, base64Data, { encoding: "base64" });
      imageName = normalImage;
    }
    return imageName;
  } catch (error) {
    console.log(error);
    return imageName;
  }
};
module.exports = imageUpload;