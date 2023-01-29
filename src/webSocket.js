import {aWss} from "./index.js";


export const webSocket = (ws) => {
    console.log('Connect')
    ws.send('Successful connect')
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                console.log('Connect');
                connectionHandler(ws,msg)
                break
            case "message":
                console.log(msg.message);
                connectionHandler(ws,msg)
                break
        }
    })
}
const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws,msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client =>{
        if(client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}