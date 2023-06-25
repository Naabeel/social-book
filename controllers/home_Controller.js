module.exports.home = function(req,res){
    // return res.end('<h1>express is up </h1>')
    return res.render('home',{
        title: "welcome home"
    })
}
