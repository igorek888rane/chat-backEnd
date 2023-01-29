import express from 'express'
import cors from 'cors'
import expressWs from 'express-ws'
import {sequelize} from "./db.js";
import {PORT} from "./procces-variables.js";
import {webSocket} from "./webSocket.js";




const app = express()
const WSServer = expressWs(app)
export const aWss = WSServer.getWss()

app.use(cors())
app.use(express.json())

WSServer.app.ws('/', (ws) => webSocket(ws))

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


