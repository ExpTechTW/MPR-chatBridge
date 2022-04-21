'use strict'

const Plugin = {
    "name": "chatBridge",
    "version": "1.0.0",
    "depends": {
        "pluginLoader": ">=3.5.0",
        "UUID": ">=1.0.0"
    },
    "Events": ["messageCreate"],
    "Commands": [
        {
            "name": "chatBridge start",
            "note": "開始 chatBridge 服務"
        },
        {
            "name": "chatBridge stop",
            "note": "結束 chatBridge 服務"
        }
    ],
    "author": ["whes1015"],
    "link": "https://github.com/ExpTechTW/MPR-TimeNow",
    "resources": ["AGPL-3.0"],
    "description": "聊天橋梁"
}


const pluginLoader = require('../Core/pluginLoader')
const WebSocket = require('ws')
const config = require('../config')
const ws = new WebSocket(config.API_WebSocket)
const fs = require('fs')
const path = require("path")
const Path = path.resolve("")

async function messageCreate(client, message) {
    if (!fs.existsSync(Path + '/Data/chatBridge.json')) {
        fs.writeFileSync(Path + '/Data/chatBridge.json', JSON.stringify({}, null, "\t"), 'utf8')
    }
    let file = JSON.parse(fs.readFileSync(Path + '/Data/chatBridge.json').toString())

    ws.send(JSON.stringify({
        "APIkey": "a5ef9cb2cf9b0c86b6ba71d0fc39e329",
        "Function": "chatBridge",
        "Type": "data",
        "FormatVersion": 1,
        "UUID": 1
    }))
}

ws.on('open', function open() {
    pluginLoader.log("Info >> chatBridge 已連線")
})

ws.on('message', function message(data) {
    let Data = JSON.parse(data.toString())
    console.log(Data)
})

module.exports = {
    Plugin,
    messageCreate,
}