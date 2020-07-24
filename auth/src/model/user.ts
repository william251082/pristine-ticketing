import mongoose from 'mongoose';
import {Password} from "../services/password";

// describes required props of new User
interface userAttrs {
    email: string;
    password: string;
}

// describes required props that User Model has
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: userAttrs): UserDoc;
}

// describes required props that User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    // view level logic, not model
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

// middleware func from mongoose
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: userAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// const user = User.build({
//     email: 'test@test.com',
//     password: 'password',
// });

// user.email

export { User };