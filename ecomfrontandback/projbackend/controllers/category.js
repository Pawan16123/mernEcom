const categoryModelCollection = require('../models/category.js');


exports.getCategoryById = (req, res, next, id)=>{
    categoryModelCollection.findById(id).exec((err,category)=>{
        if( err || !category){
            return res.status(400).json({
                error: "Category not found"
            });
        }
        req.category = category;
        next();
    })
}

exports.createCategory = (req, res)=>{
    const category = new categoryModelCollection(req.body);
    console.log('Request for creating Category', category);
    category.save((err, category)=>{
        if(err){
            if(`${err}`.includes('duplicate')){
                err = 'as it already Exists'
            }
            return res.status(400).json({
                error: `Unable to create category ${err}`
            })
        }
        res.json({
            message: "New Category Created successfully",
            category
        })
    });
}

exports.getCategory = (req, res)=>{
    res.status(200).json(req.category);
}

exports.getAllCategory = (req, res)=>{
    categoryModelCollection.find().exec((err, allCategory)=>{
        if(err){
            return res.status(400).json({
                error: "No categories found"
            })
        }
        res.json(allCategory);
    })
}

exports.updateCategory = (req, res)=>{
    const category = req.category;
    category.name = req.body.name;
    // console.log(category);
    category.save((err, updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to update the category"
            })
        }
        res.json(updatedCategory);
    })
}

exports.deleteCategory = (req, res)=>{
    const category = req.category;
    category.remove((err, removedCategory)=>{
        if(err){
            return res.status(400).json({
                error: "Unable to delete the seleted category"
            })
        }
        res.json({
            message: `Category ${category.name} successfully deleted`,
            category
        })
    })
}