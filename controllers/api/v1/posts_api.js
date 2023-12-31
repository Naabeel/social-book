const Post = require('../../../models/post')
const Comment = require('../../../models/comment')


module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .populate('user')
    .populate({
      path : 'comments',
      populate: {
        path: 'user'
      }
    });
    return res.json(200,{
        message : "list of posts",
        posts:posts
    })
}




module.exports.destroyPost =  async function(req,res){
    try {
        console.log(req)
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();


            await Comment.deleteMany({post : req.params.id});


            return res.json(200,{
                message:'posts and comments deleted'
            })  
        }else{
            return res.json(401,{
                message: 'you cannot delete this post'
            })
        }
       
           

    } catch (error) {
        console.log('Error', error);
        return res.json(500,{
            message: 'internal server error'
        });   
    }
}