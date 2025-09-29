import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const dummyUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "admin123", // password minimal 6 karakter
    role: "Administrator",
  },
  {
    id: 2,
    username: "nabil",
    email: "nabil@example.com",
    password: "nabil123",
    role: "Staff",
  },
];

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error saat user mulai mengetik
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username/Email harus diisi";
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const foundUser = dummyUsers.find(
        (user) =>
          (user.username === formData.username ||
            user.email === formData.username) &&
          user.password === formData.password
      );

      if (foundUser) {
        console.log("Login berhasil:", foundUser);
        navigate("/admin");
      } else {
        setErrors({ general: "Username atau password salah" });
      }
    } catch (error) {
      setErrors({ general: "Login gagal. Silakan coba lagi." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        {/* Judul */}
        <h4 className="text-xl font-semibold mb-4">Login Dashboard</h4>

        {/* Logo */}
        <img
          src="/src/assets/image/logo1.png"
          alt="Logo"
          className="w-16 h-16 object-cover rounded-lg mb-6"
        />

        {/* Form */}
        <form className="w-full flex flex-col gap-4">
          {/* Username / Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username / Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username atau email"
                className={`
                  block w-full pl-10 pr-3 py-3 border rounded-lg text-sm 
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                  transition-colors duration-200
                  ${
                    errors.username
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }
                `}
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className={`
                  block w-full pl-10 pr-12 py-3 border rounded-lg text-sm 
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                  transition-colors duration-200
                  ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }
                `}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Tombol Login */}
          <button
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
            className={`
              w-full flex justify-center py-3 px-4 border border-transparent rounded-lg 
              text-sm font-semibold text-white transition-all duration-200
              ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5"
              }
            `}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Memproses...
              </div>
            ) : (
              "Masuk"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
