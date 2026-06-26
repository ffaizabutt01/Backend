import mongoose from 'mongoose';
import mongooseAggeragePaginate from 'mongoose-aggregate-paginate-v2';
const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String,//cloudinary url[url generate about files or etc]
        required: true
    },
    thumNail: {
        type: String,//cloudinary url[url generate about files or etc]
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: string,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type:Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });
videoSchema.plugin(mongooseAggeragePaginate);
export const Video = mongoose.model('Video', videoSchema);