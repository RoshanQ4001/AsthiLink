// ============================================
// AesthiLink — Authentication Logic
// Login + Signup + Google OAuth (Frontend)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initLoginForm();
  initSignupForm();
  initOAuthButtons();
  initPasswordToggle();
});

// ------------------------------------------------
// LOGIN FORM
// ------------------------------------------------
function initLoginForm() {
  const loginForm = document.getElementById("login-form");
  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("#email").value.trim();
    const password = loginForm.querySelector("#password").value.trim();

    if (!validateEmail(email)) {
      return showError(loginForm, "Please enter a valid email");
    }

    if (!password) {
      return showError(loginForm, "Password is required");
    }

    setLoading(loginForm, true);

    try {
      // 🔥 REPLACE this later with real API call
      const res = await simulateLogin({ email, password });

      if (!res.success) {
        return showError(loginForm, res.message);
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("user_email", email);

      showSuccess(loginForm, "Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1200);

    } catch (err) {
      showError(loginForm, "Something went wrong. Try again.");
    } finally {
      setLoading(loginForm, false);
    }
  });
}

// ------------------------------------------------
// SIGNUP FORM
// ------------------------------------------------
function initSignupForm() {
  const signupForm = document.getElementById("signup-form");
  if (!signupForm) return;

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = signupForm.querySelector("#signup-email").value.trim();
    const password = signupForm.querySelector("#signup-password").value.trim();
    const confirm = signupForm.querySelector("#confirm-password").value.trim();
    const terms = signupForm.querySelector("#terms")?.checked;

    if (!validateEmail(email)) {
      return showError(signupForm, "Enter a valid email");
    }

    if (password.length < 8) {
      return showError(signupForm, "Password must be at least 8 characters");
    }

    if (password !== confirm) {
      return showError(signupForm, "Passwords do not match");
    }

    if (!terms) {
      return showError(signupForm, "You must accept the terms");
    }

    setLoading(signupForm, true);

    try {
      // 🔥 REPLACE this later with real API call
      const res = await simulateSignup({ email, password });

      if (!res.success) {
        return showError(signupForm, res.message);
      }

      showSuccess(signupForm, "Account created! Redirecting...");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);

    } catch (err) {
      showError(signupForm, "Signup failed. Try again.");
    } finally {
      setLoading(signupForm, false);
    }
  });
}

// ------------------------------------------------
// GOOGLE OAUTH (Redirect-based)
// ------------------------------------------------
function initOAuthButtons() {
  const googleBtns = document.querySelectorAll(".google-oauth-btn");
  if (!googleBtns.length) return;

  googleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // 🔥 Replace with your backend OAuth endpoint
      window.location.href = "https://your-backend.com/auth/google";
    });
  });
}

// ------------------------------------------------
// PASSWORD VISIBILITY TOGGLE
// ------------------------------------------------
function initPasswordToggle() {
  document.querySelectorAll("[data-toggle-password]").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.togglePassword);
      if (!input) return;

      input.type = input.type === "password" ? "text" : "password";
      btn.textContent = input.type === "password" ? "Show" : "Hide";
    });
  });
}

// ------------------------------------------------
// UI HELPERS
// ------------------------------------------------
function showError(form, msg) {
  clearMessages(form);
  const p = document.createElement("p");
  p.className = "text-red-500 text-sm mt-2";
  p.textContent = msg;
  form.appendChild(p);
}

function showSuccess(form, msg) {
  clearMessages(form);
  const p = document.createElement("p");
  p.className = "text-green-600 text-sm mt-2";
  p.textContent = msg;
  form.appendChild(p);
}

function clearMessages(form) {
  form.querySelectorAll("p.text-red-500, p.text-green-600").forEach(el => el.remove());
}

function setLoading(form, loading) {
  const btn = form.querySelector("button[type='submit']");
  if (!btn) return;

  btn.disabled = loading;
  btn.textContent = loading ? "Please wait..." : btn.dataset.original || btn.textContent;
}

// ------------------------------------------------
// VALIDATION HELPERS
// ------------------------------------------------
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ------------------------------------------------
// MOCK BACKEND (REMOVE LATER)
// ------------------------------------------------
async function simulateLogin() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, token: "demo_jwt_token" });
    }, 800);
  });
}

async function simulateSignup() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 900);
  });
}
