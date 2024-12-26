const production = false;
export const API_URL: string = production
  ? "https://link-server-topaz.vercel.app/api/v1/"
  : "http://localhost:5000/api/v1/";
