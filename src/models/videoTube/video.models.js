import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate  from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
    videoFile: {
        // we can store files in mongodb itselft but it is not so good practice
        type: String,//url
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished:{
        type :Boolean,
        default:true
    },
    owner:{
        type : Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps: true })

videoSchema.plugin(mongooseAggregatePaginate) // we can use now aggregate queries
export const Video = mongoose.model("Video", videoSchema)