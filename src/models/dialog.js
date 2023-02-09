import {model, Schema} from "mongoose";


 const Dialog = new Schema({
  memberOne: { type: Schema.Types.ObjectId, ref: 'User' },
  memberTwo: { type: Schema.Types.ObjectId, ref: 'User' },
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
 },{timestamps: true})




export default model('Dialog', Dialog);


