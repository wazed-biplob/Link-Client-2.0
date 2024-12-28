const production = true;
export const API_URL: string = production
  ? process.env.NEXT_PUBLIC_API_URL || ""
  : "http://localhost:5000/api/v1/";
