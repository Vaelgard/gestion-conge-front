export const getAccessToken = async () => {
    const accessToken = localStorage.getItem("token");
    const tokenExpiry = parseInt(localStorage.getItem("token_expiry") || "0");
  
    if (Date.now() >= tokenExpiry) {
      return await refreshToken();
    }
    return accessToken;
  };
  
  export const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      logout();
      return null;
    }
  
    try {
      const response = await fetch("http://localhost:8080/realms/GestionPers/protocol/openid-connect/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: "myapp-client",
          grant_type: "refresh_token",
          refresh_token: refreshToken
        })
      });
  
      if (!response.ok) throw new Error("Refresh token expired");
  
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.z);
      localStorage.setItem("token_expiry", (Date.now() + data.expires_in * 1000).toString());
  
      return data.access_token;
    } catch (err) {
      logout();
      return null;
    }
  };
  
  export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiry");
    window.location.href = "/login";
  };
  