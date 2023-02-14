const db = require("../models");
const multer = require("multer");
const sharp = require("sharp");

// create main Model
const Product = db.products;
const Review = db.reviews;

// multer and sharp
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadProductPhoto = upload.single("image");

const resizeProductPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `product-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${req.file.filename}`);

  next();
};

// 1. create product
const addProduct = async (req, res) => {
  let info = {
    image: req.file.filename,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  console.log(req.file);
  console.log(req.body);
  const product = await Product.create(info);
  res.status(200).send(product);
  // console.log(product)
};

// 2. get all products
const getAllProducts = async (req, res) => {
  let products = await Product.findAll({});
  res.status(200).send(products);
};

// 3. get single product
const getOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
};

// 4. update Product
const updateProduct = async (req, res) => {
  let id = req.params.id;

  const product = await Product.update(req.body, { where: { id: id } });

  res.status(200).send(product);
};

// 5. delete product by id
const deleteProduct = async (req, res) => {
  let id = req.params.id;

  await Product.destroy({ where: { id: id } });

  res.status(200).send("Product is deleted !");
};

// 6. get published product
const getPublishedProduct = async (req, res) => {
  const products = await Product.findAll({ where: { published: true } });

  res.status(200).send(products);
};

// 7. connect one to many relation Product and Reviews
const getProductReviews = async (req, res) => {
  const data = await Product.findOne({
    include: [
      {
        model: Review,
        as: "review",
      },
    ],
    where: { id: req.params.id },
  });

  res.status(200).send(data);
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProduct,
  getProductReviews,
  uploadProductPhoto,
  resizeProductPhoto,
};
