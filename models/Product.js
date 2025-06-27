import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    description: {
        type: String,
        required: true
    },
    sku:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true,
        enum:[
            "heels",
            "sneakers",
            "mule",
            "sandal",
            "chelsea",
            "boat",
            "oxfords",
            "loafers",
            "boots",
            "clogs",
            "slippers"
        ]
    },
    brand:{
        type: String,
        required: false,
        enum:[
            "Nike",
            "Adidas",
            "Puma",
            "Reebok",
            "New Balance", 
            "Converse",
            "Vans",
            "Under Armour",
            "Asics",
            "Skechers"
        ]
    },
    sizes:[
        {
            size:String,
            countInStock: Number
        }
    ],
    color: {
        type: String,
        required: true,
    },
    style: {
        type: String,
        required: true,
        enum: [
            "casual",
            "formal",
            "sport",
            "party",
            "business",
            "athletic",
            "outdoor",
            "lounge"
        ]
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product; 