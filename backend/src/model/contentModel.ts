import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    contentType: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    files: {
        type: String
    },
    description: {
        type: String
    },
    tags: [{
        type: String
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt : {
        type: Date,
        default : Date.now()
    }
})

const Content = mongoose.model('Content', contentSchema)

export default Content;