import crypto from "crypto";
const generateToken = () => {
  const code = crypto.randomInt(100000, 1000000).toString();
  return code;
};

const hashToken = (token: string): string => {
  const hash = crypto.createHash("sha512").update(token).digest("hex");
  return hash;
};

const compareToken = (token: string, hash: string) => {
  // Secure comparison
  if (
    crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(token, "hex"))
  ) {
    return { approved: true, message: "Password matched" };
  } else {
    return { approved: false, message: "Password not matched" };
  }
};




export { generateToken, hashToken, compareToken };
