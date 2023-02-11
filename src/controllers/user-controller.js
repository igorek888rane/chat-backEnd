import User from "../models/user.js";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/generateToken.js";

 class UserController {
    async register(req, res) {
        try {
            const {email, password, username} = req.body
            const candidate = await User.findOne( {email})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким номером уже существует"})
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hashPassword, username})
            const token = generateToken(user._id,)
            return res.json({token,id: user._id, email: user.email, username: user.username})

        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Не удалось зарегистрироваться',
            });
        }

    }
    async login (req,res) {
     try{
         const {email, password} = req.body
         const user = await User.findOne({email})
         if(!user){
             return res.status(400).json({message: "Пользователь не найден"})
         }
         let  comparePassword = bcrypt.compareSync(password,user.password)
         if(!comparePassword){
             return res.status(400).json({message: "Указан неверный пароль"})
         }
         const token = generateToken(user._id)
         return res.json({token, id: user._id, email: user.email, username: user.username})
     }catch (e) {
         console.log(e);
         res.status(500).json({
             message: 'Не удалось Войти',
         });
     }
    }
     async getUsers(req, res) {
         try {
             const users = await User.find()
             res.json(users)
         } catch (e) {
             console.log(e)
         }
     }
     async getMe(req, res) {
         try {
             const user = await User.findById(req.userId);

             if (!user) {
                 return res.status(404).json({
                     message: 'Пользователь не найден',
                 });
             }
             res.json({id:user._id,email:user.email,username:user.username,dialogs:user.dialogs});

         } catch (e) {
             console.log(e);
             res.status(500).json({
                 message: 'Нет доступа',
             });
         }
     }
     async getUserById(req, res) {
         try {
             const user = await User.findById(req.params.id);

             if (!user) {
                 return res.status(404).json({
                     message: 'Пользователь не найден',
                 });
             }



             res.json(user);

         } catch (e) {
             console.log(e);
             res.status(500).json({
                 message: 'Нет доступа',
             });
         }
     }
}


export default new UserController()