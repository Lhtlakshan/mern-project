import Product from "../models/product.js";

export const addProduct = (req, res) => {
  // if (req.user.role != "admin") {
  //   res.status(403).json({
  //     message: "You cannot add a product...",
  //   });
  //   return;
  // }
  const product = new Product(req.body);

  product
    .save()
    .then(() => {
      res.status(200).json({
        message: "Product saved",
      });
    })
    .catch((err) => {
      res.json({
        message: "Product was not saved",
      });
    });
    
};

export const getAllProducts = async (req, res) => {
  Product.find().then((products)=>{
    res.status(200).json(products);
  }
).catch((err)=>{
  res.status(500).json({message : err.message})
})
};

export const getProductById = async (req, res) => {
  const id = req.params.id;

  Product.findOne({productId : id}).then((product)=>{
    res.status(200).json(product);
  }).catch((err)=>{
    res.status(500).json({message : err.message});
  })

};

export const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  
  Product.findOneAndUpdate({ productId: productId }, req.body)
    .then((product) => {
      res.status(200).json({
        message: "Product updated",
        Data: product,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  Product.findOneAndDelete({productId :productId}).then((product)=>{
    res.status(200).json({
      message : "Product deleted",
      Data : product
    })
  }).catch((err)=>{
    res.status(500).json({
      message: err.message
    })
  })
};
