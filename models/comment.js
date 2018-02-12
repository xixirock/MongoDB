//Dependency
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Create comment schema
var CommentSchema = new Schema({
    comment:String
});

//Create model for above schema
var Comment = mongoose.model("Comment", CommentSchema);

//Export model
module.exports = Comment;