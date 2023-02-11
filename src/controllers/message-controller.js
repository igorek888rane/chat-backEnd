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
  async getMessagesByDialog (req,res){
      const messages = await Message.find({dialog:req.params.id })
      const resMessages = messages.map(mes=>({id:mes._id,text:mes.text,dialogId:mes.dialog,userId:mes.user}))

      res.json(resMessages)
  }

}


export default new MessageController()