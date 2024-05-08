import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   surname: {
      type: String,
      required: true,
   },
   middlename: {
     type: String,
     required: true,
   },
   phoneNumber: {
      type: String,
      required: true,
      unique: true,
   },
   favourites: {
      type: [String],
   },
   feedbacks: {
      type: [{
         productId: {
            type: String
         },
         feedbackText: {
            type: String
         }
      }]
   },
   dropshipperInfo: {
      status: {
         type: Boolean,
         default: false
      },
      codeDRFO: {
         type: String,
      },
      iban: {
         type: String
      },
      bankName: {
         type: String,
      },
      mfo: {
         type: String,
      },
      country: {
         type: String
      },
      index: {
         type: String,
      },
      region: {

      },
      district: {
         type: String,
      },
      city: {
         type: String,
      },
      address: {
         type: String
      }
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      enum: ['admin', 'user', 'dropshipper'],
      default: 'user'
   }
}, {timestamps: true})

UserSchema.index({ name: 0, surname: 0, middlename: 0 });

export default mongoose.model('User', UserSchema)