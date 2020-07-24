import mongoose from 'mongoose';

// describes required props of new User
interface TicketAttrs {
    title: string;
    price: string;
    userId: string;
}

// describes required props that User Model has
interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs: TicketAttrs): TicketDoc;
}

// describes required props that User Document has
interface TicketDoc extends mongoose.Document {
    title: string;
    price: string;
    userId: string;
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    // view level logic, not model
    toJSON: {
        // ret is the object that's just about to turn to JSON
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };