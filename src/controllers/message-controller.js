import Message from "../models/message.js";

class MessageController {
  async create(req,res){
   const userId= req.userId;
   const postData ={
    text:req.body.text,
    dialog:req.body.dialogId,
    user:userId
   }
   const message = await Message.create(postData)
   res.json(message.text)
  }

}


export default new MessageController()