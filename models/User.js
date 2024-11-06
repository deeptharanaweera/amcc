import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    role: { type: String, required: false },
    date: { type: Date, default: Date.now },
}, {
    timestamps: true
});

// Access `models` via the mongoose instance
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
