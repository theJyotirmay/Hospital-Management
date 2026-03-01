const mongoose = require('mongoose');

const appintments_schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
        required: true,
    },
    payment: {
        type: String,
        default: 'unpaid'
    },
    status: {
        type: String,
        default: "unchecked",
    },
    invoice: {
        type: String,
        require: true,
    },
    chief_complaints: {
        type: String,
        default: "None",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    primary_diagnosis: {
        type: String,
    },
    investigation_advice: {
        type: String,
    },
    final_diagnosis: {
        type: String,
    },
    treatment: {
        type: String,
    },
    about: {
        type: String,
    },
    medicine: {
        type: [String]
    },



});


const appointments = mongoose.model("appointments", appintments_schema);
module.exports = appointments;