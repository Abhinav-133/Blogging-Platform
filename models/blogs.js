const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    author: String,
    img: String,
    title: String,
    desc: String,
    author: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

const Blogs = mongoose.model('Blogs', blogsSchema);

module.exports = Blogs;