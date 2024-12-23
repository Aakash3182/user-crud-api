const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Properties & types
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(v);
            },
            message: props => `${props.value} is not a valid email id.`
        }
    },
    age: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
}, {
    collection: "User",
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
