const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// const connection = mongoose.connection;
// autoIncrement.initialize(connection);

const echoesSchema = new mongoose.Schema({
    // echoId: {
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
        enum: ["Fusion", "Spectro", "Glacio", "Electro", "Havoc", "Aero"],
    },
    rarity: {
        type: Number,
        required: true,
        enum: [4, 5],
    },
    cost: {
        type: Number,
        required: true,
        enum: [2, 3, 4, 5],
    },

});

// echoseSchema.plugin(autoIncrement.plugin, {
//     model: 'Echoses',
//     field: 'echoId',
//     startAt: 1,
//     incrementBy: 1
// });

const collection = mongoose.model('Echoes', echoesSchema);

module.exports = collection;