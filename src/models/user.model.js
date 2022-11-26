const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema+({
    username: {
        type: String,
        require: true
    },
    birthdate: {
        type: Date,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
}, {timestamps: true});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bycrypt.genSalt(10);
    return await bycrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async function (password) {
    return await bycrypt.compare(password, this.password);
};

module.exports = mongoose.models['User'] || mongoose.model('User', userSchema);
