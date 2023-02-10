import {aWss} from "./index.js";



export const webSocket = async (ws) => {
    console.log('Connect')
    ws.send('Successful connect')
    ws.on('message', async (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "create-chat":
                break
            case "connection":
                connectionHandler(ws, msg)
                break
            case "message":
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
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}