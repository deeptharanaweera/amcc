import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema({
    curselimage1: { type: String, required: true },
    curselimage2: { type: String, required: true },
    curselimage3: { type: String, required: true },
    inlandranking: { type: String, required: true },
    provinceranking: { type: String, required: true },
    teachertostudent: { type: String, required: true },
    passrate: { type: String, required: true },
    footerimg: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Use Date type for dates
    
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Home = mongoose.models.Home || mongoose.model("Home", homeSchema);

export default Home;
