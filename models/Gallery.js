import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    header: { type: String, required: true },
    description: { type: String, required: true },
    mainimage: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Use Date type for dates
    otherimages: { type: [String], required: true } // Change to array of strings
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default Gallery;
