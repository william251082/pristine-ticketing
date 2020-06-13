import mongoose from 'mongoose';

// describes required props of new User
interface userAttrs {
    email: string;
    password: string;
}

// describes required props that User Model has
interface UserModel extends mongoose.Model<any>{
    build(attrs: userAttrs): any;
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

const User = mongoose.model<any, UserModel>('User', userSchema);

User.build({
    email: 'test@test.com',
    password: 'password',
});

export { User };