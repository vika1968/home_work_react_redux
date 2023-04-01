import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({   
        rname:{
            type: String,
            unique: false,
            requiered: true
        },
        imgdata:{
            type: String,
            unique: false,
            requiered: true    
        } ,        
        address:{
                type: String,
                unique: false,
                requiered: true    
         } ,
         delimg:{
                type: String,
                unique: false,
                requiered: true    
         } ,
         somedata:{
                type: String,
                unique: false,
                requiered: true    
         } ,
         price:{
                type: Number,
                unique: false,
                requiered: true    
         } ,
         rating:{
                type: String,
                unique: false,
                requiered: true    
         } ,         
         arrimg:{
                type: String,
                unique: false,
                requiered: true    
         } ,
         qnty:{
                type: Number,
                unique: false,
                requiered: true    
         } ,      
        
});

const ProductsModel = mongoose.model("products", ProductsSchema);
    

export default ProductsModel;





