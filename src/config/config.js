// ✅ SET TO TRUE FOR PRODUCTION
const isProduction = true; 

// 1. Base URL for the Server (Host)
export const SOCKET_URL = isProduction 
    ? "https://chrikitn-backend.onrender.com" 
    : "http://localhost:5000";

// 2. Base URL for API Calls
export const API_BASE_URL = `${SOCKET_URL}/api`;

// 3. Centralized Image Resolver
export const getImageUrl = (path) => {
    if (!path) return null; 

    // If it's already a full URL (like Cloudinary), return as is
    if (path.startsWith("http")) {
        return path;
    }

    // Otherwise, prefix it with the Server Host URL
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${SOCKET_URL}${cleanPath}`;
};