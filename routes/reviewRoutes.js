const express = require('express');
const router = express.Router();
const review = require('../models/review');
const blog = require('../models/blogs')

router.post('/blogs/:blogid/review', async (req, res) => {
    const { blogid } = req.params;

    const blogs = await blog.findById(blogid);
    const { rating, comment } = req.body;
    const newreview = await review.create({ rating, comment });
    await blogs.reviews.push(newreview);
    await blogs.save();
    res.redirect(`/blogs/${blogid}`);

})

module.exports=router;