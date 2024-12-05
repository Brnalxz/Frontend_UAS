const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// const connection = mongoose.connection;
// autoIncrement.initialize(connection);

const resonatorsSchema = new mongoose.Schema({
    // resonatorId: {
    //     type: Number,
    //     unique: true,
    // },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    element: {
        type: String,
        required: true,
    },
    weapon: {
        type: String,
        required: true,
        enum: ["Sword", "Rectifier", "Gauntlet", "Pistol", "Broadblade"],
    },
    rarity: {
        type: Number,
        required: true,
        enum: [4, 5],
    }

});

// resonatorsSchema.plugin(autoIncrement.plugin, {
//     model: 'Resonators',
//     field: 'resonatorId',
//     startAt: 1,
//     incrementBy: 1
// });

const collection = mongoose.model('Resonators', resonatorsSchema);

module.exports = collection;