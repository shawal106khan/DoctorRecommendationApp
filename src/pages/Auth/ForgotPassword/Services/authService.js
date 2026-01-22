export const authService = {
  sendResetLink(email) {
    // 🔐 generate fake token
    const token = Math.random().toString(36).substring(2, 15);

    // store token → email mapping
    localStorage.setItem("reset_token", JSON.stringify({ token, email }));

    console.log(
      `🔗 Reset link (FRONTEND SIMULATION): http://localhost:5173/reset-password/${token}`,
    );

    return token;
  },

  resetPassword(token, newPassword) {
    const stored = JSON.parse(localStorage.getItem("reset_token"));

    if (!stored || stored.token !== token) {
      throw new Error("Invalid or expired token");
    }

    console.log("✅ Password reset for:", stored.email);
    console.log("🔑 New password:", newPassword);

    localStorage.removeItem("reset_token");
    return true;
  },
};
