import mongoose from "mongoose";

const baristaSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/
    },

    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
    },

    active: {
        type: Boolean,
        default: true
    },

    hiredDate: {
        type: Date,
        default: Date.now
    }
});

baristaSchema.virtual("daysSinceHire").get(function () {
    const now = new Date();
    const created = this.hiredDate;
    const diffTime = Math.abs(now-created);
    const diffDays = Math.ceil(diffTime/(1000*60*60*24));
    return diffDays;
});

baristaSchema.virtual("status").get(function () {
    return this.active ? "Active" : "Inactive";
});

export default mongoose.model("Baristas", baristaSchema);