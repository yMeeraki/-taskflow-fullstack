const API_URL = "http://localhost:5000";

export const api = async (
  endpoint: string,
  method: string = "GET",
  body?: any
) => {
  let token = localStorage.getItem("token");

  const makeRequest = async (token?: string) => {
    return fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  try {
    let res = await makeRequest(token || undefined);

    // 🔄 If access token expired
    if (res.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      // ❌ No refresh token → logout
      if (!refreshToken) {
        logout();
        return;
      }

      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      // ❌ Refresh failed → logout
      if (!refreshRes.ok) {
        logout();
        return;
      }

      const data = await refreshRes.json();

      // ✅ Save new access token
      localStorage.setItem("token", data.accessToken);

      // 🔁 Retry original request (ONLY ONCE)
      res = await makeRequest(data.accessToken);
    }

    // ❌ Handle non-OK responses
    if (!res.ok) {
      const errorData = await safeJson(res);
      throw new Error(errorData?.message || "Something went wrong");
    }

    return await safeJson(res);
  } catch (error: any) {
    console.error("API Error:", error.message);
    throw error;
  }
};

/* =========================
   SAFE JSON PARSER
========================= */
const safeJson = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

/* =========================
   LOGOUT
========================= */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}