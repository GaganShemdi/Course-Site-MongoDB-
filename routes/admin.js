const { Router } = require("express");
const {Admin, Course}= require("../db")
const adminMiddleware = require("../middleware/admin");
const router = Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

        await Admin.create({
            username: username,
            password:password
        })
        res.json({
            msg:"The Admin is Created"
        })
});

router.post('/courses', adminMiddleware, async (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    console.log(newCourse);
    res.json({
        message:"Course create succesfully"
    })
    
});

router.get('/courses', adminMiddleware, async (req, res) => {

    const response = await Course.find({})
        res.json({
            courses : response
        })
});

module.exports = router;