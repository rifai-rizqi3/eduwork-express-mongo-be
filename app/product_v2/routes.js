const multer = require("multer");
const router = require("express").Router();
const controller = require("./controller");
const storage = require("../../config/multer");
const upload = multer({ storage: storage });

router.get("/products", controller.index);
router.get("/products/:id", controller.view);
router.post("/products", upload.single("image"), controller.store);
router.put("/products/:id", upload.single("image"), controller.update);
router.delete("/products/:id", controller.destroy);

module.exports = router;
