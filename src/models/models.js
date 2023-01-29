import {sequelize} from "../db.js";
import {DataTypes} from "sequelize";


const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    phone_number:{type:DataTypes.INTEGER,unique:true},
    password:{type:DataTypes.STRING},
})


const Chat = sequelize.define('chat',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
})

const Message = sequelize.define('message',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    message:{type:DataTypes.STRING,allowNull:false},
    user_name:{type:DataTypes.STRING,allowNull: false}
})

const UserChat = sequelize.define('user_chat',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
})

User.belongsToMany(Chat,{through:UserChat})
Chat.belongsToMany(User,{through:UserChat})

Chat.hasMany(Message)
Message.belongsTo(Chat)

User.hasMany(Message)
Message.belongsTo(User)

export default {
    User,
    Chat,
    Message,
    UserChat
}