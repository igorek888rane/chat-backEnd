import {User} from "../models/models.js";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/generateToken.js";

 class UserController {
    async register(req, res) {
        try {
            const {phone_number, password, user_name} = req.body
            const candidate = await User.findOne({where: {phone_number}})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким номером уже существует"})
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({phone_number, password: hashPassword, user_name})
            const token = generateToken(user.id, user.phone_number, user.user_name)
            return res.json({token, userId: user.id, phoneNumber: user.phone_number, username: user.user_name})

        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Не удалось зарегистрироваться',
            });
        }

    }
    async login (req,res) {
        const {phone_number, password} = req.body
        const user = await User.findOne({where:{phone_number}})
        if(!user){
            return res.status(400).json({message: "Пользователь не найден"})
        }
        let  comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return res.status(400).json({message: "Указан неверный пароль"})
        }
        const token = generateToken(user.id, user.phone_number, user.user_name)
        return res.json({token, userId: user.id, phoneNumber: user.phone_number, username: user.user_name})
    }
}


export default new UserController()