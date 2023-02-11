import Message from "../models/message.js";

class MessageController {
  async create(req,res){
   const userId= req.userId;
   const postData ={
    text:req.body.text,
    dialog:req.body.dialogId,
    userId
   }
   const message = await Message.create(postData)
   res.json(message)
  }
  async getMessagesByDialog (req,res){
     try{
         const messages = await Message.find({dialog:req.params.id })
         const resMessages = messages.map(mes=>({id:mes._id,text:mes.text,dialogId:mes.dialog,userId:mes.userId}))

         res.json(resMessages)
     }catch (e) {
         console.log(e)
         res.status(404).json({message:'Error'})
     }
  }

}


export default new MessageController()