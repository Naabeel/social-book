const Like =  require('../models/like');
const Post =  require('../models/post');
const Comment =  require('../models/comment');

module.exports.toggleLike = async function(req,res){
    try {

        let likeable;
        let deleted = false;

        if(req.query.type == "Post"){
            likeable = await Post.findById(req.query.id).populate('likes')
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes')
        }

        let existingLike =  await Like.findOne({
            user: req.user._id,
            likeable:req.query.id,
            onModel:req.query.type,
        })


        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted= true;

        }else{
            let newLike = await Like.create({
                user:req.user._id,
                likeable: req.query.id,
                onModel:req.query.type,
            })

            likeable.likes.push(newLike._id);
            likeable.save();

        }

        return res.json(200,{
            message: 'Request successfull',
            data:{
                deleted: deleted
            }
        })
        
    } catch (error) {
        console.log('error', error);
        return res.json(500,{
            message: "internal server error"      
        });
        
    }
}