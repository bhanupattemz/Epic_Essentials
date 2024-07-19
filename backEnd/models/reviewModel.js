const mongoose=require("mongoose")
const reviewschema=mongoose.Schema({
    rating:{
        type:Number,
        required:[true,"rating required"],
        min:0,
        max:5
    },
    comment:{
        type:String,
        required:[true,"comment reruired"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    }
})

module.exports=mongoose.model("Review",reviewschema)