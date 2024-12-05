const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// const connection = mongoose.connection;
// autoIncrement.initialize(connection);

const weaponsSchema = new mongoose.Schema({
    // weaponId: {
    //     type: Number,
    //     unique: true,
    // },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    rarity: {
        type: Number,
        required: true,

    },
    attack: {
        type: String,
        required: true,
    },

});

// weaponsSchema.plugin(autoIncrement.plugin, {
//     model: 'Weapons',
//     field: 'weaponId',
//     startAt: 1,
//     incrementBy: 1
// });

const collection = mongoose.model('Weapons', weaponsSchema);

module.exports = collection;