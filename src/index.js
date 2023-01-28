import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import expressWs from 'express-ws'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
const WSServer = expressWs(app)
const aWss = WSServer.getWss()



app.use(cors())
app.use(express.json())

WSServer.app.ws('/', (ws) => {
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
})


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


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