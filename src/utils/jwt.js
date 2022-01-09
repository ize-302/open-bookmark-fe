import jwt from "jsonwebtoken";

export function verifyToken(jwtToken) {
  try {
    var token = jwtToken.replace("Bearer ", "");
    return jwt.verify(
      token,
      `${process.env.VUE_APP_PUBLIC_SUPBASE_JWT_SECRET}`
    );
  } catch (e) {
    console.log("e:", e);
    return null;
  }
}
