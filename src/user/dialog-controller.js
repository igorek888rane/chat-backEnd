import Dialog from "../models/dialog.js";
import User from "../models/user.js";
import Message from "../models/message.js";


class DialogController {
   async create(req,res) {
    try{
        console.log(req.userId);
        const postData = {
            memberOne: req.userId,
            memberTwo: req.body.memberTwo,
            lastMessage:req.body.message
        };
        const doc = new Dialog(postData)
        const dialog = await doc.save()
        await Message.create({
            text:req.body.message,
            dialog:dialog._id,
            user:req.userId
        })
        await User.findByIdAndUpdate({_id:req.userId},{
            $push:{dialogs:dialog}
        })
        await User.findByIdAndUpdate({_id:req.body.memberTwo},{
            $push:{dialogs:dialog}
        })

        res.json(dialog._id)
    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не Создать диалог',
        });
    }
    }
}


export default new DialogController()