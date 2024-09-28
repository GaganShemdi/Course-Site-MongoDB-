const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

        await User.create({
            username: username,
            password:password
        })
        res.json({
            msg:"The User is Created"
        })
});

router.get('/courses', async (req, res) => {
    const response = await Course.find({})
    res.json({
            courses : response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
        const courseId = req.params.courseId;
        const username = req.headers.username;

        try {
            await  User.updateOne({
                username
            },{
               "$push": {
                purchasedCourses:courseId
               }
                
            })

        }catch(e) {
            console.log(e)
        }
        res.json({
            message: "Purchase Complete"
        })
      
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const user = await User.findOne({
        username : req.headers.username
    });
    const courses = await Course.find({
        _id: {
            "$in" : user.purchasedCourses
        }
    })
    res.json({
        courses:courses
    })

});

module.exports = router