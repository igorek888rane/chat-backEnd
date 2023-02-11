import {model, Schema} from "mongoose";


 const Message = new Schema({
  text: { type: String },
  dialog: { type: Schema.Types.ObjectId, ref: "Dialog", },
  userId: { type: Schema.Types.ObjectId, ref: "User", },
 },{timestamps:true})




export default model('Message', Message);


