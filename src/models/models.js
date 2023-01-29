import {sequelize} from "../db.js";
import {DataTypes} from "sequelize";


export const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    phone_number:{type:DataTypes.STRING,unique:true},
    password:{type:DataTypes.STRING},
    user_name:{type:DataTypes.STRING,allowNull:false}
})


export const Chat = sequelize.define('chat',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    users_id:{type:DataTypes.ARRAY(DataTypes.STRING)}
})

export const Message = sequelize.define('message',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    message:{type:DataTypes.STRING,allowNull:false},
    user_name:{type:DataTypes.STRING,allowNull:false}
})

export const UserChat = sequelize.define('user_chat',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
})

User.belongsToMany(Chat,{through:UserChat})
Chat.belongsToMany(User,{through:UserChat})

Chat.hasMany(Message)
Message.belongsTo(Chat)

User.hasMany(Message)
Message.belongsTo(User)

// export default {
//     User,
//     UserChat,
//     Message,
//     Chat
// }