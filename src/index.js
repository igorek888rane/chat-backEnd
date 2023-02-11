import express from 'express'
import cors from 'cors'
import expressWs from 'express-ws'
import {DB_URI, PORT} from "./procces-variables.js";
import {webSocket} from "./webSocket.js";
import {routerAuth, routerDialog, routerMessage} from "./routes/routes.js";
import mongoose from "mongoose";



const app = express()
const WSServer = expressWs(app)
export const aWss = WSServer.getWss()

app.use(cors())
app.use(express.json())
app.use('/auth', routerAuth)
app.use('/dialog', routerDialog)
app.use('/message', routerMessage)

WSServer.app.ws('/', (ws) => webSocket(ws))


const start = async () =>{
    try {
        await mongoose.connect(DB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch (e){
        console.log(e)
    }
}

start()


