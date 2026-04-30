import mongoose from "mongoose";
mongoose.set('strictPopulate',false);

const customerSchema = new mongoose.Schema({
    name: { // Customer's name
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: { // Customer's email
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/
    },

    phone: { // Customer's phone number
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

customerSchema.virtual("daysSinceCreated").get(function () {
    const now = new Date();
    const created = this.createdAt;
    const diffTime = Math.abs(now-created);
    const diffDays = Math.ceil(diffTime/(1000*60*60*24));
    return diffDays;
});

export default mongoose.model("Customer", customerSchema);