const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    rank: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "{VALUE} no es un rango válido",
      },
      default: "user",
    },
    email: {
      type: String,
      required: [true, "El e-mail es obligatorio"],
      maxLength: 100,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 200,
      required: [true, "La contraseña es obligatoria"],
    },
    perfil_photo: {
      type: String,
      default: "https://i.ibb.co/K6P65ZZ/157f088b56f86d22066e6df568cbb134.png",
    },
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      minLength: 4,
      maxLength: 100,
      unique: true,
      trim: true,
    },
    isIdle: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
