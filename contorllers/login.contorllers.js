const userModels = require("../models/users1.models");
const jwt = require('jsonwebtoken');
const maxAge = 60000;
const bcrypt = require('bcryptjs');

const createToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
};


module.exports.createUsers = async (req, res, next) => {

    const form = req.body;

    const data1 = {
        username: form.username,
        password: form.password,
        user_online: false,
        user_types_id: form.user_types_id,
    }

    const result = userModels.find({
        username: data1.username
    });

    if (result) {

        res.json({
            status: false,
            message: "username have been ! "

        })

    } else {

        const data = await userModels.create(data1)

        const token = createToken(data._id);
        res.cookie("id", token, {
            withCredent: true,
            httpOnly: false,
            maxAge: 60000,

        });

        console.log("create  user");
        res.json({
            status: true,
            message: "selete all data ",
            data: token
        })
    }






};


module.exports.readUsers1 = async (req, res, next) => {

    userModels.aggregate([{
        $lookup: {
            from: "user_types",
            localField: "user_types_id",
            foreignField: "_id",
            as: "user_type"
        }
    }]).exec((err, data) => {

        if (!err) {

            res.json({
                status: true,
                message: "selete all data ",
                data: data
            })
        } else {


            console.log("error");
            res.json({
                status: false,
                message: err
            })
        }
    });

}

module.exports.readUsers = async (req, res, next) => {

    userModels.find().exec((err, data) => {

        if (!err) {

            console.log("select ", data);
            res.json({
                status: true,
                message: "selete all data ",
                data: data
            })
        } else {


            console.log("error");
            res.json({
                status: false,
                message: err
            })
        }
    });

}

module.exports.testUser = async (req, res, next) => {

    userModels.find().populate('author').exec((err, data) => {

        if (!err) {

            console.log("select ", data);
            res.json({
                status: true,
                message: "selete all data ",
                data: data
            })
        } else {


            console.log("error");
            res.json({
                status: false,
                message: err
            })
        }
    });

}


module.exports.updateUsers = async (req, res, next) => {
    const form = req.body;
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(form.password, salt);

    const data = {
        username: form.username,
        password: password,
        use_types_id: form.user_types_id
        
    }
    userModels.findByIdAndUpdate(form._id, data, {
        useFindAndModify: false
    }).exec((err, data) => {

        if (!err) {
            console.log("Updatwe Sucess  ");

            res.json({
                status: true,
                message: "Update Sucess !",
                data: data

            })

        } else {
            console.log("error");

            res.json({
                status: false,
                message: err
            })


        }
    })



}

module.exports.deleteUsers = async (req, res, next) => {

    const form = req.body;


    userModels.findByIdAndDelete(form._id, {
        useFindAndModify: false
    }).exec((err, data) => {

        if (!err) {
            console.log("Delete Sucess  ");

            res.json({
                status: true,
                message: "Delete Sucess !",
                data: data

            })

        } else {

            console.log(" Delete error");

            res.json({
                status: false,
                message: err
            })


        }
    })



}

module.exports.userLogin = async (req, res, next) => {

    const form = req.body;
    const username = form.username;
    const user = await userModels.findOne({
        username
    });

  
    if (user) {

        
        const auth = await bcrypt.compare(form.password, user.password);


        if (auth) {

       
            const data1={
                user_online: true,
        
            }
                userModels.findByIdAndUpdate(user._id, data1, {
                    useFindAndModify: false
                }).exec((err) => {
            
                    if (!err) {
                        console.log("Update Status User Sucess  ");
            
                    } else {
                        console.log("error");
            
                    }
                })
            
        

            const token = createToken(user._id);

            res.cookie("id", token, {
                withCredent: true,
                httpOnly: true,
                maxAge: 60000,

            });

            res.json({
                status: true,
                message: "login Succecss  !",
                token: token

            })

        } else {


            res.json({
                status: false,
                message: "password is not corect!",

            })

        }
        return
    }

    res.json({
        status: false,
        message: "username have not !",

    })




}
module.exports.checkToken = async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModels.findById(decoded.id);


        if (user)

            return res.status(200).json({
                status: true,
                data: user
            });



    } else {

        return res.status(401).json({
            status: false,
            message: "Token is not "
        })


    }

}


module.exports.register = async (req, res, next) => {
    try {



        const form = req.body;
        console.log(form)

        const data = {
            username: form.username,
            password: form.password,
            user_online: false,
            user_type_id: form.user_type_id,
            created_date: new Date()
        }

        console.log(data)
        await userModels.create(data, err => {

            if (!err) {


                console.log("Save");
                res.json({
                    status: true,
                    message: "Saved"

                })
            } else {
                console.log("error ");

                res.json({
                    status: false,

                    message: "username have been!"


                })
            }
        })






    } catch (err) {

        console.log(err.message);

        const errors = handleError(err);
        res.json({
            errors,
            created: false
        });

    }
};

module.exports.checkUser1 = async (req,res,next)=> {

    const token =req.session['id'];

 
     if(token){

        console.log("token start");
        const decoded= jwt.verify(token,process.env.JWT_SECRET, async  (err,decodedToken)=>{

            if(err){
                
return                res.json({status:false,messqge:"error check user"});

            }else{


                const user = await User.findById(decodedToken.id);

                if(user)
                return res.json({
                status:true,
                user:user.username
            });
        }
             
        })


     }else{

        res.json({status:false,message:"token is not "});
        next();
    }
}


module.exports.checkToken1 = async (req,res,next)=> {

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);


    if(user)

    return res.status(200).json({
    status:true,
    data:user
});



}  else {

return res.status(401).json({status:false,message:"Token is not "})


}

}
