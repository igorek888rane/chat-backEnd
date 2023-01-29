import {aWss} from "./index.js";
import {Chat, Message} from "./models/models.js";


export const webSocket = async (ws) => {
    console.log('Connect')
    ws.send('Successful connect')
    ws.on('message', async (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "create-chat":
                await Chat.create({user_id:msg.usersId})
                break
            case "connection":
                connectionHandler(ws, msg)
                break
            case "message":
                await Message.create({
                    message: msg.message,
                    user_name: msg.username,
                    chatId:msg.chatId,
                    userId:msg.userId
                })
                connectionHandler(ws, msg)
                break
        }
    })
}
const connectionHandler = (ws, msg) => {
    ws.id = msg.chatId
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}