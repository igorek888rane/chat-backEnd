import {aWss} from "./index.js";



export const webSocket = async (ws) => {
    console.log('Connect')
    ws.send(JSON.stringify({message:'Successful connect'}))
    ws.on('message', async (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break
            case 'message':
                // console.log(msg);
                connectionHandler(ws, msg)
                break
        }
    })
}
const connectionHandler = (ws, msg) => {
    ws.id = msg.dialogId
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {

    aWss.clients.forEach(client => {
        // console.log(client.id,msg.dialogId);
        if (client.id === msg.dialogId) {
            client.send(JSON.stringify({text:msg.text,userId:msg.userId,dialogId:msg.dialogId}))
            console.log(msg)
        }
    })
}