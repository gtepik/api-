import mongoose from "mongoose";    

const usuarioModelo = new mongoose.Schema({
    nombre:{type:String,require:true},
    usuario:{type:String,require:true},
    email:{type:String,require:true},
    rol:{type:String,require:true},
    password:{type:String,require:true}
});

export default mongoose.model('usuario',usuarioModelo);