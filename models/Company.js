import mongoose from "mongoose";

const companyScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        // required:true
    },
    website:{
        type:String,
        // required:true
    },
    location:{
        type:String,
        
    },
    logo:{
        type:String
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required : true
    }
},{timestamps:true});


export const Company = mongoose.model('Company', companyScheme);