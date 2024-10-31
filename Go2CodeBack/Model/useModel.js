const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const bcrypt=require('bcrypt')


// Define the user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        // minlength: 3,
        // maxlength: 100
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        // unique: true,
        // match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        // lowercase: true,
        // trim: true,
        // maxlength: 255
    },
    password: {
        type: String,
        required: [true, 'Password is required'], // Fixed typo here
        // minlength: 4,
        // maxlength: 100,
        // match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,'password is not strong.at least one uppercase one lowercase and one special character is required'], // Password complexity regex
        // select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirmation is required'],
        validate: {
            validator: function(value) {
                return value === this.password; // Use `this` to access password
            },
            message: props => `${props.value} is not the same as the password.`, // Improved message
        }
    },
    
    
});

// Pre-save hook to hash the password
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified
    if (!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password, 12);
    this.confirmPassword = undefined;

    next();
});
userSchema.methods.isSamePassword= async function(userPassword,DBPassword){
    //  console.log('user',userPassword,'da',DBPassword)
    return await bcrypt.compare(userPassword,DBPassword);
}

const userModel = mongoose.model('User', userSchema); // Changed to 'User' for consistency


module.exports = userModel;
