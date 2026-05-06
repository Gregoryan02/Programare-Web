const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title:  {type: String, require: true},
    tech:   {type: String, require: true},
    done:   {type: Boolean, require: false},
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;