import User from "../../schema/user.schema.js";
import ApiError from "../../utils/api-error.js";
import bcrypt from "bcryptjs";

const register = async ({ name, email, password }) => {
  const existingUser = User.findOne(email);
  if (existingUser) {
    throw ApiError.conflict("User Already Exist");
  }
  const user = await User.create({
    fullname,
    email,
    password,
  });

  return user;
};

const login = async({email,password}) => {
    const user = User.findOne(email).select("+password")

    if(!user){
        throw ApiError.unauthorized("User dosn't Exist")
    }

    const verifyPassword = await user.comparePassword(password);
    if (!verifyPassword) {
      throw ApiError.unauthorized("Invalid Email or Password");
    }
  
    const refreshToken = generateRefreshToken({ id: user._id });
    const accessToken = generateAccessToken({ id: user._id });
  
    user.refreshToken = hashToken(refreshToken);
    await user.save({ validateBeforeSave: false });

    return {user, refreshToken, accessToken}
}

export {register, login}