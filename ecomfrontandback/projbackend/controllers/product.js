const productModelCollection = require('../models/product.js')

const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs')

// populate ?
exports.getProductById = (req, res, next, id)=>{
    console.log('PRODUCT ID ',id);
    productModelCollection.findById(id)
    .populate('category')
    .exec((err, product)=>{
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product;
        next();
    })
};

exports.createProduct = (req, res)=>{
    console.log('creating product');
     let form = new formidable.IncomingForm();
     form.keepExtensions = true;
     form.parse(req, (error, fields, file)=>{
        // console.log(file.photo);
        if(error){
            return res.status(400).json({
                error: 'Unable to save the file'
            })
        }
        let product = new productModelCollection(fields);
        // console.log(product, fields, file);
        const {name, description, category, stock, price} = fields;
        // console.log(stock, name);
        if( !name || !description || !category || !stock || !price){
            return res.status(400).json({
                error: "Please include all the required fields"
            });
        }
        // handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size should be less then 3Mb"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = file.photo.type;
        }
        // Save file in DB.
        product.save((err, product)=>{
            if(err){
                return res.status(400).json({
                    error: "Saving file  in Db failed"
                })
            }
            res.json(product);
        })
     })
}

exports.getProduct = (req, res)=>{
    req.product.photo = undefined;
    res.json(req.product);
}

// test: http://localhost:2022/product/photo/636a97e2a67ccd95fc813fdc
exports.photoById = (req, res, next)=>{
    if(req.product?.photo.data){
        // res.set("Content-Type", "image/jpeg");
        res.setHeader("Content-Type", "image/jpeg");
        return res.send(req.product.photo.data);
    }
    next();
}

exports.deleteProduct = (req,res)=>{
    let product = req.product;
    product.remove((err, deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete the product"
            })
        }
        res.json({
            message: `Successfully deleted product: ${deletedProduct.name}`,
            deletedProduct
        })
    })   
}

exports.updateProduct = (req,res)=>{
    console.log('request received');
    let form = new formidable.IncomingForm();
     form.keepExtensions = true;
     form.parse(req, (error, fields, file)=>{
        // console.log(file.photo);
        if(error){
            return res.status(400).json({
                error: 'Unable to save the file'
            })
        }
        let product = req.product;
        product = _.extend(product, fields);
        // console.log(product);
        const {name, description, category, stock, price} = fields;
        if(!name && !description && !category && !price){
            return res.status(400).json({
                error: "Atleast one filed need to be updated."
            })
        }

        // handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size should be less then 3Mb"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = file.photo.type;
        }
        // Save file in DB.
        product.save((err, product)=>{
            if(err){
                return res.status(400).json({
                    error: "Updation of file in Db failed"
                })
            }
            res.json(product);
        })
     })
}

exports.getAllProducts = (req,res)=>{
    // .select method used to include or exclude fields
    // .sort([sortBy, "asc"])
    console.log('req.qery.limit:', req.query.limit);
    let limit = parseInt(req.query.limit) || 8;
    let sortBy = req.query.sortBy || "_id";
    productModelCollection.find()
    .select("-photo")
    .sort({sortBy:-1})
    .populate("category")
    .limit(limit)
    .exec((err, products)=>{
        console.log()
        if(err){
            return res.status(400).json({
                error: "Products unavailable"
            })
        }
        res.json({
            products
        })
    })
}

exports.getAllUniqueCategory = (req, res)=>{
    productModelCollection.distinct("category", {}, (err, category)=>{
        if(err){
            return res.status(400).json({
                error: "No category found"
            })
        }
        res.json(category);
    })
}

exports.updateStock = (req, res, next)=>{
    let myOperations = req.body.order.products.map(product=>{
        return {
            updateOne: {
                filter: {_id: product_id},
                update: {$inc: {sotck: -product.count, sold: +product.count}}
            }
        }
    })
    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk operations failed"
            })
        }
        next();
    })
}