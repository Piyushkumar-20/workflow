import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      min: 8,
    },

    role: {
      type: String,
      enum: ["OWNER", "ADMIN", "MEMBER"],
      default: "MEMBER",
    },
  },
  { timestamp: true },
);

userSchema.pre("save", async function() {
    if (!this.isModified(password)) return;

    this.password = await bcrypt.hash(this.password, 10)

    userSchema.methods.comparePassword = async function(candidatePassword) {
        return await bcrypt.comparePassword(candidatePassword, this.password)
    }

})
const User = mongoose.model("User", userSchema);
export default User;
