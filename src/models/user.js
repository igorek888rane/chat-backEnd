import {model, Schema} from "mongoose";


 const User = new Schema({
  email: {type: String, unique: true, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  dialogs:[{type: Schema.Types.ObjectId, ref: 'Dialog'}]
 },
     {timestamps: true})




export default model('User', User);


