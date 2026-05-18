const router = require("express").Router();

router.get("/", (req, res) => {
    const posts = [
        {
            title: 'Learning NodeJS',
            desc: 'Build backend applications using Express.',
            image: 'https://picsum.photos/600/400?1'
        },
        {
            title: 'Bootstrap Tutorial',
            desc: 'Create responsive UI quickly.',
            image: 'https://picsum.photos/600/400?2'
        },
        {
            title: 'MongoDB Guide',
            desc: 'Learn database for NodeJS apps.',
            image: 'https://picsum.photos/600/400?3'
        }
    ];

    res.render('user/home', {
        posts
    });
});


module.exports = router;