const express = require('express');
const router = express.Router();
const blog = require('../models/blogs');
const { isLoggedIn} = require('../middleware');

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/blogs', async (req, res) => {
    const blogs = await blog.find({});

    res.render('blogs/index', { blogs });
})

router.get('/blogs/new',isLoggedIn, (req, res) => {
    res.render('blogs/new');
})

router.post('/blogs',isLoggedIn, async (req, res) => {
    try {
        const { author, desc, img, title } = req.body;
        await blog.create({ author, desc, img, title });
        req.flash('success', 'Blog created successfully');
        res.redirect('/blogs');

    }
    catch (e) {
        req.flash('error', 'Cannot create the Blog at the moment');
        res.redirect('/blogs/new');
    }
})

router.get('/blogs/:blogid', async (req, res) => {
    const { blogid } = req.params;
    const blogs = await blog.findById(blogid).populate('reviews');
    res.render('blogs/show', { blogs });
})

router.get('/blogs/:blogid/edit',isLoggedIn, async (req, res) => {
    const { blogid } = req.params;
    const blogs = await blog.findById(blogid);
    res.render('blogs/edit', { blogs });
})

router.patch('/blogs/:blogid', async (req, res) => {
    try {
        const { blogid } = req.params;
        const { author, desc, img, title } = req.body;
        await blog.findByIdAndUpdate(blogid, { author, desc, img, title });
        req.flash('success', 'Updated the Blog successfully');
        res.redirect(`/blogs/${blogid}`);
    }
    catch (e) {
        req.flash('error', 'Something went wrong');
        res.redirect('/blogs');
    }
})

router.delete('/blogs/:blogid',isLoggedIn, async (req, res) => {
    try {
        const { blogid } = req.params;
        const { author, desc, img, title } = req.body;
        await blog.findByIdAndDelete(blogid, { author, desc, img, title });
        req.flash('success', 'Deleted the Blog successfully');
        res.redirect('/blogs');

    }
    catch (e) {
        req.flash('error', 'something went wrong');
        res.redirect('/products');
    }
})

module.exports = router;