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

WSServer.app.ws('/',(ws,req)=>{
console.log('Connect')
    ws.send('Successful connect')
    ws.on('message',(msg)=>{
        console.log(msg)
    })
})


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
