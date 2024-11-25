export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const DATABASE_URL =
    "postgresql://theprimepram_owner:6XMNQzIv1JFr@ep-cold-mode-a1dd5a8b.ap-southeast-1.aws.neon.tech/youapp?sslmode=require";
export const CLOUDINARY_CLOUD_NAME = "dn4pc5cov";
export const CLOUDINARY_API_KEY = "688456573383585";
export const CLOUDINARY_API_SECRET = "Cnn7ZD1PXtRE-CyEag-1paz6sfw";
export const DOMAIN_URL = IS_PRODUCTION
    ? "https://youapp-pram.vercel.app"
    : "http://localhost:3000";
