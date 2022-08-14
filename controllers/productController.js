const Product = require("../models/productModel");

exports.addProduct = async (req, res) => {
  const {
    title,
    brand,
    price,
    productImage,
    condition,
    author,
    tag,
    description,
  } = req.body;

  console.log(req.user);

  try {
    const newProduct = new Product({
      title,
      condition,
      author,
      price,
      productImage,
      description,
      tag,
      brand,
      listedBy: req.user[0]._id,
    });

    const addeProduct = await (
      await newProduct.save()
    ).populate("listedBy", "_id mobile name email");

    res.status(200).json({
      succes: true,
      data: addeProduct,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    // console.log(req.query)
    res.status(200).json({
      succes: true,
      data: allProducts,
    });
  } catch (err) {
    res.send(err.name);
  }
};

exports.getCategoryProduct = async (req, res) => {
  try {

    const category = req.params.category;

    const categoryProducts = await Product.find({ tag: category });

    res.status(200).json({
      succes: true,
      data: categoryProducts,
    });
  } catch (err) {
    res.send(err.name);
  }
};

exports.getProductDetails = async (req, res) => {
  try {

    const id = req.params.id;

    const productDetails = await Product.find({ _id: id }).populate("listedBy", "name email mobile")

    console.log(productDetails)

    res.status(200).json({
      succes: true,
      data: productDetails,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const deleted = await Product.deleteMany({});
    res.send("all deleted");
  } catch (err) {
    res.send(err);
  }
};
