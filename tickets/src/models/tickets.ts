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