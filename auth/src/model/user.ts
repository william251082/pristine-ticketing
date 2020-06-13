import mongoose from 'mongoose';

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
});
userSchema.statics.build = (attrs: userAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const user = User.build({
    email: 'test@test.com',
    password: 'password',
});

// user.email

export { User };