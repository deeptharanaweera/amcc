import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    header: { type: String, required: true },
    description: { type: String, required: true },
    closingdate: { type: String, required: false },
    startdate: { type: String, required: false },
    date: { type: Date, default: Date.now }, // Use Date type for dates
    image: { type: String, required: true },
    download: { type: String, required: false },
    onlineapply: { type: String, required: false },
    category: { type: String, required: true },
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

const News = mongoose.models.News || mongoose.model("News", newsSchema);

export default News;
