import { useState } from "react";
import { auth } from "../../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import "./login.css";

import EyeIcon from "../../../public/icons/eye.svg";
import EyeHiddenIcon from "../../../public/icons/eyeHidden.svg";

export function Login({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  // input обробник
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
// показ пароля
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const showAlert = ({ icon = "info", title, text, timer = 2000 }) =>
    Swal.fire({ icon, title, text, showConfirmButton: false, timer });

  const handleLogin = async (e) => {
    e.preventDefault();
    showAlert({ icon: "info", title: "Завантаження...", timer: 1000 });

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (user.email !== adminEmail) {
        showAlert({
          icon: "error",
          title: "Доступ заборонено",
          text: "Цей обліковий запис не є адміністратором.",
        });
        await auth.signOut();
        return;
      }

      localStorage.setItem("is_authenticated", true);
      setIsAuthenticated(true);
      showAlert({ icon: "success", title: "Вхід успішний (Адмін)", timer: 3000 });
    } catch (error) {
      showAlert({ icon: "error", title: "Помилка входу", text: error.message });
    }
  };

  return (
    <div className="small-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-title">Hello Admin</h1>

        <label htmlFor="email" className="login-label">Email</label>
        <input
          id="email"
          type="email"
          className="login-input"
          placeholder="admin@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="login-password-container">
          <label htmlFor="password" className="login-label">Password</label>
          <div className="login-password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="toggleShowHide" onClick={toggleShowPassword}>
              <img
                src={showPassword ? EyeIcon : EyeHiddenIcon}
                alt={showPassword ? "Hide password" : "Show password"}
                width="20"
                height="20"
              />
            </span>
          </div>
        </div>

        <input type="submit" value="Login" className="login-submit" />
      </form>
    </div>
  );
}
