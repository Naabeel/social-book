const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession =  async function(req,res){
    let user = await User.findOne({email:req.body.email});

    if(!user || user.password != req.body.password){
        return res.json(422,{
            message: 'Inavlid username or password'
        });
    }
    return res.json(200,{
        message : 'sign in successful, here is your token please keep it safe',
        data: {
            token : jwt.sign(user.toJSON(),'socialbook', {expiresIn:100000})
        }
    })
}