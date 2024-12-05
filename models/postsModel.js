const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// const connection = mongoose.connection;
// autoIncrement.initialize(connection);

const postsSchema = new mongoose.Schema({
    // postId: {
    //     type: Number,
    //     unique: true,
    // },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        required: true,
    },
    dislike: {
        type: Number,
        required: true,
    }
});

// postsSchema.plugin(autoIncrement.plugin, {
//     model: 'Post',
//     field: 'postId',
//     startAt: 1,
//     incrementBy: 1
// });

const Post = mongoose.model('Post', postsSchema);

module.exports = Post;
