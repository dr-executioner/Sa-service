import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  googleApiKey: string;
  mailId : string
  password: string
  feUrl: string
  sendGridApi: string
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  googleApiKey: process.env.GOOGLE_API_KEY || "",
  mailId: process.env.EMAIL_USER || "",
  password: process.env.EMAIL_PASS || "",
  feUrl: process.env.FRONTEND_URL || "",
  sendGridApi: process.env.SENDGRID_API || "",
};

export default config;
