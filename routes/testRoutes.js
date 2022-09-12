const express = require("express");
const router = express.Router();
const fs = require("fs");
router.get("/test", (req, res) => {
  fs.writeFile(
    `./img/text-${Date.now()}.txt`,
    `File Content text-${Date.now()}`,
    function (err) {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        console.log("Файл создан");
        res.status(200);
      }
    }
  );
});
router.get("/read-file", (req, res) => {
  fs.readdir("./img", (err, files) => {
    let arrFiles = [];
    files.forEach((file) => {
      arrFiles.push(file);
      console.log(arrFiles);
    });
    res.json({ files: arrFiles });
  });
});

module.exports = router;
