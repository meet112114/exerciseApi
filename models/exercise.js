const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    bodyPart: {
        type: String,
    },
    equipment: {
        type: String,
    },
    name: {
        type: String,
    },
    target: {
        type: String,
    },
    image : {
        type: String,
    },
    secondaryMuscles0: {
        type: String,
    },
    secondaryMuscles1: {
        type: String,
    },
    secondaryMuscles2: {
        type: String,
    },
    secondaryMuscles3: {
        type: String,
    },
    secondaryMuscles4: {
        type: String,
    },
    instructions0: {
        type: String,
    },
    instructions1: {
        type: String,
    },
    instructions2: {
        type: String,
    },
    instructions3: {
        type: String,
    },
    instructions4: {
        type: String,
    },
    instructions5: {
        type: String,
    },
    instructions6: {
        type: String,
    },
    instructions7: {
        type: String,
    },
    instructions8: {
        type: String,
    },
    instructions9: {
        type: String,
    },
    instructions10: {
        type: String,
    },
});

module.exports = mongoose.model('Exercise', ExerciseSchema);