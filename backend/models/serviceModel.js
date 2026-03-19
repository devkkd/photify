const mongoose = require("mongoose");


// WHAT WE OFFER
const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  }

});


// SPECIAL SECTION POINTS
const specialPointSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  }

});


// MAIN SERVICE SCHEMA
const serviceSchema = new mongoose.Schema(
{
  slug: {
    type: String,
    required: true,
    unique: true
  },

  title: {
    type: String,
    required: true
  },

  subtitle: {
    type: String
  },

  bannerImage: {
    type: String,
    required: true
  },

  bannerPublicId: {
    type: String
  },


  offers: {
    type: [offerSchema],
    validate: {
      validator: function(v){
        return v.length <= 6;
      },
      message: "Maximum 6 offers allowed"
    }
  },


  specialSection: {

    title: {
      type: String
    },

    image: {
      type: String
    },

    imagePublicId: {
      type: String
    },

    points: {
      type: [specialPointSchema],

      validate: {
        validator: function(v){
          return v.length <= 6;
        },
        message: "Maximum 6 points allowed"
      }
    }
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);