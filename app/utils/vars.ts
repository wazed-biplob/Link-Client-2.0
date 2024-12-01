const production = true;
export let API_URL: string;
production
  ? (API_URL = "https://link-server-topaz.vercel.app/api/v1/")
  : (API_URL = "http://localhost:5000/api/v1/");
