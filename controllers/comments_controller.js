const Comment =  require('../models/comment');
const Post =  require('../models/post');



module.exports.create =  function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(err){
            console.log('error in finding post');
            return;
        }
        if(post){
            Comment.create({
                content:req.body.content,
                post: req.body.post,
                user: req.user._id,
            },function(err,comment){
                if(err){
                    console.log('error in creating comment');
                    return;
            }
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        })
        }
    })

}
module.exports.destroyComment = function(req,res){
    Comment.findById(req.params.id, function(err,comment) {
        if(comment.user ==  req.user.id){
            const postId =  comment.post;

            comment.remove();


            Post.findByIdAndUpdate(postId, { $pull : {comments: req.params.id}}, function(err,post){
                return res.redirect('back');
            })
        }else{
            res.redirect('back')
        }
        
    })
}