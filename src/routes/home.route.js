const router = require("express").Router();

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

router.get("/", (req, res) => {
    res.render('user/', {
        posts: posts
    });
});

router.get('/search', (req, res) => {
    const query = (req.query.q || '').trim();
    const normalized = query.toLowerCase();

    const resultPosts = posts.filter(post => {
        return post.title.toLowerCase().includes(normalized)
            || post.desc.toLowerCase().includes(normalized);
    });

    res.render('user/', {
        posts: resultPosts
    });
});


router.get("/login", (req, res) => {
    res.render("user/login");
});

router.get("/register", (req, res) => {
    res.render("user/register");
});


module.exports = router;