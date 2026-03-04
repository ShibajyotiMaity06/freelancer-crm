const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        maxLength:10,
        minLength:3,
        trim : true
    },
    email : {
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true,
        lowercase:true
    },
    password : {
        required:true,
        type:String,
        minLength:6
    },
    plan : {
        type:String,
        enum : ['free' , 'pro'],
        default : 'free',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

},  {
    timestamps: true, 
  })


UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password)
}

const User = mongoose.model("User", UserSchema);

module.exports = User