export function getCurrentUser() {
  return {
    userId: Number(localStorage.getItem("user_id") || "1001"),
    role: localStorage.getItem("role") || "super_admin",
    companyId: Number(localStorage.getItem("company_id") || "1"),
    departmentId: Number(localStorage.getItem("department_id") || "1"),
    name: localStorage.getItem("user_name") || "Demo Administrator",
    email: localStorage.getItem("email") || "admin@lmsdemo.local",
  };
}
