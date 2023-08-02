const { ObjectId } = require("mongodb");
const db = require("../../config/mongodb");

const response = (res, status, result) => {
  res.send(status, {
    statusCode: status,
    result,
  });
};

const index = async (req, res) => {
  try {
    let result = "";
    if (req.query.search) {
      result = await db
        .collection("products")
        .find({ name: { $regex: req.query.search, $options: "i" } })
        .toArray();
    } else {
      result = await db
        .collection("products")
        .find()
        .sort({ _id: -1 })
        .toArray();
    }
    response(res, 200, result);
  } catch (error) {
    response(res, 500, error);
  }
};

const view = async (req, res) => {
  try {
    const result = await db
      .collection("products")
      .findOne({ _id: ObjectId(req.params.id) });
    response(res, 200, result);
  } catch (error) {
    response(res, 500, error);
  }
};

const store = async (req, res) => {
  try {
    let result = "";
    if (req.file) {
      result = await db.collection("products").insertOne({
        ...req.body,
        image_url: `http://localhost:3000/public/${req.file.originalname}`,
      });
    } else {
      result = await db.collection("products").insertOne(req.body);
    }
    response(res, 201, result);
  } catch (error) {
    response(res, 500, error);
  }
};

const update = async (req, res) => {
  try {
    let result = "";
    if (req.file) {
      result = await db.collection("products").updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            ...req.body,
            image_url: `http://localhost:3000/public/${req.file.originalname}`,
          },
        }
      );
    } else {
      result = await db.collection("products").updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: req.body,
        }
      );
    }
    response(res, 200, result);
  } catch (error) {
    response(res, 500, error);
  }
};

const destroy = async (req, res) => {
  try {
    const result = await db
      .collection("products")
      .deleteOne({ _id: ObjectId(req.params.id) });
    response(res, 200, result);
  } catch (error) {
    response(res, 500, result);
  }
};

module.exports = { index, view, store, update, destroy };
