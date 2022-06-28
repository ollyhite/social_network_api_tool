const router = require('express').Router();
const {User} = require('../../models')

router.get('/', async(req, res) => {
    try{
        const allUserData = await User.find({})
        //res is send data to front end
        res.status(200).json(allUserData);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'something went wrong' });
    }
});

router.post('/', async(req, res) => {
    try{
        const newUserData = await User.create({
            username:req.body.username,
            email:req.body.email
        })
        res.status(200).json(newUserData);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'something went wrong' });
    }
});

router.put('/:name', async(req, res) => {
    try{
        const newUserData = await User.findOneAndUpdate(
            {username:req.params.username},
            {username:req.body.username,email:req.body.email})
        res.status(200).json(newUserData);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'something went wrong' });
    }
});

router.delete('/:_id', async(req, res) => {
    try{
        const deleteUserData = await User.findOneAndDelete({username:req.params._id});
        res.status(200).json(deleteUserData);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'something went wrong' });
    }
});

module.exports = router;
