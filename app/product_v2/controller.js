const { ObjectId } = require("mongodb");
const Products = require("./model");

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
      result = await Products.find({
        name: { $regex: req.query.search, $options: "i" },
      }).sort({ _id: "desc" });
    } else {
      result = await Products.find().sort({ _id: "desc" });
    }
    response(res, 200, result);
  } catch (error) {
    response(res, 500, error);
  }
};

const view = async (req, res) => {
  try {
    const result = await Products.findById(req.params.id);
    response(res, 200, result);
  } catch (error) {
    response(res, 500, error);
  }
};

const store = async (req, res) => {
  try {
    let result = "";
    if (req.file) {
      result = await Products.create({
        ...req.body,
        image_url: `http://localhost:3000/public/${req.file.originalname}`,
      });
    } else {
      result = await Products.create(req.body);
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
      result = await Products.updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            ...req.body,
            image_url: `http://localhost:3000/public/${req.file.originalname}`,
          },
        }
      );
    } else {
      result = await Products.updateOne(
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
    const result = await Products.findOneAndDelete({ _id: req.params.id });
    response(res, 200, result);
  } catch (error) {
    response(res, 500, error);
  }
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
