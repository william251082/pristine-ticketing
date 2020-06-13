import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

// ts doesn't know about mongoose user args
new User({
    email: 'test@tes.com',
    password: 23587,
});

export { User };