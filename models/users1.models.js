
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
    },
    password:{
            type:String,
            required:[true,"Password is Required"],
        },
        user_online:{
            type:Boolean
        },
        
user_type_id:{ type: Schema.Types.ObjectId, ref: 'user_types' },
created_date:{
    type:Date
},
updated_date:{
    type:Date
}     
});

userSchema.pre("save",async function(next){ 
    const salt =await bcrypt.genSalt();
    this.password =await bcrypt.hash(this.password, salt);
next();
});

userSchema.statics.login=async function(username,password){
    
    const user = await this.findOne({username});
    
    if(user){
const auth = await bcrypt.compare(password,user.password);

if(auth){
    return user;
}

throw Error("incorrect password !!!");


    }

    throw Error("incorrect Email!!!!");

}



module.exports=mongoose.model("tb_users1",userSchema);