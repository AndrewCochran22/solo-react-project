var express = require('express');
const checkAuth = require('../auth/checkAuth');
var router = express.Router();
const models = require('../models');

router.get('/', async function(req, res) {
    const posts = await models.Post.findAll({
        include: [{
            model: models.User,
            attributes: ['username', 'id']
        }],
    })
    res.json(posts);
})

router.post('/', checkAuth, async (req, res) => {
    if (!req.body.title || !req.body.content || !req.body.startDate || !req.body.endDate) {
        return res.status(400).json({
            error: 'Please include all title, content, and dates'
        })
    }

    const post = await models.Post.create({
        title: req.body.title,
        content: req.body.content,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        UserId: req.session.user.id
    })

    res.status(201).json(post);
})

router.post('/:id/comments', checkAuth, async (req, res) => {
    const post = await models.Post.findByPk(req.params.id)
    
    if (!post) {
        res.status(404).json({
            error: 'Could not find post with that Id'
        })
    }

    if (!req.body.text) {
        res.status(400).json({
            error: "Please include all required fields"
        })
    }

    const comment = await post.createComment({
        text: req.body.text,
        PostId: req.params.id,
        UserId: req.session.user.id
    })

    res.status(201).json(comment);
})

router.get('/:id/comments', async (req, res) => {
    const post = await models.Post.findByPk(req.params.id)

    if (!post) {
        res.status(404).json({
            error: "Could not find post with that Id"
        })
    }

    const comments = await post.getComments({
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName']
        }]
    });

    res.json(comments)
})

router.post('/:id/rsvps', checkAuth, async (req, res) => {
    const existingRsvp = await models.Rsvp.findOne({
        where: {
            PostId: req.params.id,
            UserId: req.session.user.id
        }
    })
    
    if (existingRsvp) {
        res.status(400).json({
            error: "Already Rsvp"
        }) 
    }
    
    const post = await models.Post.findByPk(req.params.id)

    if (!post) {
        res.status(404).json({
            error: "Could not find post with that Id"
        })
    }

    if (!req.body.attend) {
        res.status(400).json({
            error: "Please include all required fields"
        })
    }

    const rsvp = await post.createRsvp({
        attend: req.body.attend,
        PostId: req.params.id,
        UserId: req.session.user.id
    })

    res.status(201).json(rsvp);
})

router.get('/:id/rsvps', async (req, res) => {
    const post = await models.Post.findByPk(req.params.id)

    if (!post) {
        res.status(404).json({
            error: "Could not find post with that Id"
        })
    }

    const rsvps = await post.getRsvps({
        include: [{
            model: models.User,
            attributes: ['id', 'firstName', 'lastName']
        }] 
    });

    res.json(rsvps)
})

module.exports = router;