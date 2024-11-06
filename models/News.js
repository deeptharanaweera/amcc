import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    header: { type: String, required: false },
    description: { type: String, required: false },
    closingdate: { type: String, required: false },
    startdate: { type: String, required: false },
    date: { type: Date, default: Date.now }, // Use Date type for dates
    image_name: { type: String, required: false },
    image_data: { type: Buffer, required: false },
    image_type: { type: String, required: false },
    
    download: { type: String, required: false },
    onlineapply: { type: String, required: false },
    category: { type: String, required: false },
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

const News = mongoose.models.News || mongoose.model("News", newsSchema);

export default News;
