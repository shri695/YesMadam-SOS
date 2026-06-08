const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
    agentName: String,
    clientName: String,
    status: { type: String, default: 'Completed' },
    date: { type: Date, default: Date.now },
    duration: String
});

module.exports = mongoose.model('Mission', MissionSchema);