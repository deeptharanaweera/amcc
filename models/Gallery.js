// import mongoose from 'mongoose';

// const gallerySchema = new mongoose.Schema({
//     header: { type: String, required: false },
//     description: { type: String, required: false },
//     date: { type: Date, default: Date.now }, // Use Date type for dates
//     image_name: { type: String, required: false },
//     image_data: { type: Buffer, required: false },
//     image_type: { type: String, required: false },
//     otherimages: { type: [String], required: false } // Change to array of strings
// }, {
//     timestamps: true // Adds createdAt and updatedAt fields automatically
// });

// const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

// export default Gallery;



import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    header: { type: String, required: false },
    description: { type: String, required: false },
    date: { type: Date, default: Date.now }, // Use Date type for dates
    main_image: { // Store the main image details
        image_name: { type: String, required: false },
        image_data: { type: Buffer, required: false },
        image_type: { type: String, required: false },
    },
    other_images: [{ // Store other images in an array
        image_name: { type: String, required: false },
        image_data: { type: Buffer, required: false },
        image_type: { type: String, required: false },
    }],
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default Gallery;
