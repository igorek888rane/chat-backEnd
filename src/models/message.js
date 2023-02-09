import {model, Schema} from "mongoose";


 const Message = new Schema({
  text: { type: String ,required: true},
  dialog: { type: Schema.Types.ObjectId, ref: "Dialog", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
 },{timestamps:true})




export default model('Message', Message);


