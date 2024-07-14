const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const socketIo = require('socket.io');
const http = require('http');
const HttpStatusCodes = require("./constants/statusCode")
const dbConnection = require("./config/database")
const allRoutes = require("./routers");
const { liveStreamModel } = require("./models");
require('dotenv').config()

// BASIC SETUP 
const app = express()
const port = process.env.PORT || 4001
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(morgan("tiny"))

// SOCKET
const server = http.createServer(app);
const io = socketIo(server);

// UPDATING VIEWERS
let viewerCounts = {};
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('joinStream', async (streamId) => {
        socket.join(streamId);
        if (!viewerCounts[streamId]) {
            viewerCounts[streamId] = 0;
        }
        viewerCounts[streamId]++;

        // Update the viewer count in the database
        await liveStreamModel.findByIdAndUpdate(streamId, { viewers: viewerCounts[streamId] });

        io.to(streamId).emit('updateViewers', viewerCounts[streamId]);
    });

    socket.on('leaveStream', async (streamId) => {
        socket.leave(streamId);
        if (viewerCounts[streamId]) {
            viewerCounts[streamId]--;
            await liveStreamModel.findByIdAndUpdate(streamId, { viewers: viewerCounts[streamId] });
            io.to(streamId).emit('updateViewers', viewerCounts[streamId]);
        }
    });

    socket.on('disconnecting', async () => {
        const rooms = Object.keys(socket.rooms);
        for (const room of rooms) {
            if (viewerCounts[room]) {
                viewerCounts[room]--;
                await liveStreamModel.findByIdAndUpdate(room, { viewers: viewerCounts[room] });
                io.to(room).emit('updateViewers', viewerCounts[room]);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



// DATABASE CONNECTION
dbConnection()

// API
app.use(allRoutes)








// INVALID REQUEST URL 
app.use("*", (req, res) => {
    return res.status(HttpStatusCodes["Not Found"]).json({ Error: "Your are hitting wrong api. This api not exits" })
})
// LISTNEING PORT
app.listen(port, () => {
    console.log(`server is runing on: http://localhost:${port}/`)
})











