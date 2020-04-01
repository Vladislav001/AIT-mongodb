const mongoose = require('mongoose')

const applicationsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  descriptionCode: {
    type: String,
    required: true,
  },
  defaultSettings: {
    type: Object,
    required: true,
  },
})

applicationsSchema.virtual('applicationId').get(function() {
  return this._id
})

let Applications = mongoose.model('Applications', applicationsSchema)

module.exports = Applications
