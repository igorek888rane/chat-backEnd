import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import expressWs from 'express-ws'
import {Sequelize} from "sequelize";



dotenv.config()

const PORT = process.env.PORT || 5000
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD= process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_PORT= process.env.DB_PORT

const app = express()
const WSServer = expressWs(app)
const aWss = WSServer.getWss()

const sequelize = new Sequelize(DB_NAME, DB_USER,DB_PASSWORD, {
        dialect: 'postgres',
        host: DB_HOST,
        port: DB_PORT
    }
)

app.use(cors())
app.use(express.json())
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

const start = async () =>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch (e){
        console.log(e)
    }
}

start()


