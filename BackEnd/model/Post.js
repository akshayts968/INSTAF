const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
//const Comment=require('./comment.js');
const Post=new Schema({
    post:{
        type:String,
        default:"https://img.jagranjosh.com/imported/images/E/GK/sachin-records.png",
        set:(v) =>
        v===""
        ?"https://img.jagranjosh.com/imported/images/E/GK/sachin-records.png"
        :v,
    },
    type:String,
    nLikes:{
        type:Number,
        default:0
    },
    likes:[
        {
            type:String,
        }
    ],
    nComments:{
        type:Number,
        default:0
    },
    postOwner: {
        type: ObjectId, // Define type properly
    }
});
module.exports=mongoose.model("Post",Post);