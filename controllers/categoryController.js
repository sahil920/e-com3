const  categoryModel = require( "../models/categoryModel")

const createCategoryController = async(req, res) =>{
    try {
        const {name} = req.body
            if(!name){
                return res.status(500).send({message: "Name is required"})
            }
            const existingCategory = await categoryModel.findOne({name})
            if(existingCategory){
                res.status(200).send({message: "Category Already Exist"})
            }
            const category = await new categoryModel({name}).save()
            res.status(200).send({
                success: true,
                message: "new category created",
                category
            })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:"Error in category"
        })
    }
}

const updateCategoryController = async(req, res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name}, {new: true})
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error, 
            message:"Error while updating category",
        })
    }
}

const categoryController = async(req, res)=>{
    try {    
        const category = await categoryModel.find({})
        // res.status(200).send({
        //     success:true,
        //     message:"All Categories List",
        //     category
        // })
        res.json(category);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting all category"
        })
    }
}

const singleCategoryController = async(req, res)=>{
    try {
        const {id} = req.params
        const category = await categoryModel.findById(id)
        res.status(200).send({
            success:true,
            message:"Category",
            category

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error While Getting single category"
        })        
    }
}

const deleteCategoryController = async(req, res)=>{
    try {
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfully",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error, 
            message:"Deleting category failed"
        })
        
    }
}

module.exports = {createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController}