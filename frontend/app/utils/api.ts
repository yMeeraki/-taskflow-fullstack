const apiURL = process.env.API_URL || "http://localhost:5000";

const api = async (endpoint: string, method = "GET", body?: any) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN SENT:", token);
  const res = await fetch(`${apiURL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
};

export { api };
