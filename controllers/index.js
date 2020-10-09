const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const router = require('express').Router();

// build path to ejs template
const ejsTemplatePath = path.join(__dirname, '../', 'templates', 'post.ejs');
// upload ejs HTML template 
const ejsBodyTemplate = fs.readFileSync(ejsTemplatePath, 'utf8');

// Static object to pass to ejs engine
// In real world you will want to load post/article/user profile from database
// To be concise I leave it outside of this example.
const posts = [
    {
        id: '406z04hkfwkkmd5',
        // og:title & twitter:title
        title: 'Baldur&#39;s Gate 3 - Release 06/10',
        // og:description & twitter:description
        description: 'Baldur&#39s Gate III is an upcoming role-playing video game that is being developed and published by Larian Studios.',
        // I hope you have no doubts
        // but just in case this is unreal addressed :)
        // reserved for twitter:domain
        domain: 'https://example.com',
        // og:url & twitter:url
        url: 'https://example.com/post/406z04hkfwkkmd5',
        // og:image & twitter:image
        image: 'https://image.example.com/post/406z04hkfwkkmd5',
        // og:updated_time
        updatedat: Date.now(),
    }
];

const generatePostHTML = (req, res, next) => {
    try {
        const { postId } = req.params;
        // Step 1. Find post per provided param in URL string
        const [post] = posts.filter(({ id }) => id === postId);
        // Step 2. Check id posts exists 
        if (!post) {
            throw new Error('Post not found');
        }
        // Step 3. Generate HTML file out of template my means of ejs.
        const html = ejs.render(ejsBodyTemplate, post);
        // Step 4. Sent response back to requestor
        res.send(html);
    } catch (err) {
        next(err);
    }
}

// mirroring end-points vs front-end
// URL: /api/post/:postId
router.get('/post/:postId', generatePostHTML);
// Other end-point you what to feed back to crawler...
module.exports = router;