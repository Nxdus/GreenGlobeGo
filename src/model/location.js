import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema(
    {
        location: {
            type: String,
            unique: true,
            require: true
        },
        desc: {            
            type: String,
            require: true
        }
    }, 
    { timestamps: true }
)

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);
export default Location;