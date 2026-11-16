"use client";

import { useEffect } from "react";

const demoCourses = [
  { id: 1, title: "AI & Machine Learning Foundations", description: "Core concepts of AI, supervised learning, and model evaluation.", category: "Artificial Intelligence", level: "Beginner", status: "published", course_type: "online", progress: 72, duration: "6 hours", created_at: "2026-10-20T10:00:00Z", thumbnail_url: "" },
  { id: 2, title: "Python for Data Analysis", description: "Work with Python, pandas, NumPy, and practical datasets.", category: "Programming", level: "Intermediate", status: "published", course_type: "online", progress: 45, duration: "8 hours", created_at: "2026-10-18T10:00:00Z", thumbnail_url: "" },
  { id: 3, title: "Cybersecurity Essentials", description: "Understand security principles, threats, and safe practices.", category: "Security", level: "Beginner", status: "published", course_type: "online", progress: 100, duration: "4 hours", created_at: "2026-10-12T10:00:00Z", thumbnail_url: "" },
  { id: 4, title: "Leadership & Communication", description: "Build practical leadership and workplace communication skills.", category: "Professional Skills", level: "Advanced", status: "published", course_type: "online", progress: 18, duration: "5 hours", created_at: "2026-10-08T10:00:00Z", thumbnail_url: "" },
];

const demoUsers = [
  { id: 1001, user_id: 1001, name: "Aarav Sharma", employee_name: "Aarav Sharma", email: "aarav@demo.local", role: "employee", designation: "Software Engineer", department_id: 1, department_name: "Engineering", status: "active" },
  { id: 1002, user_id: 1002, name: "Priya Das", employee_name: "Priya Das", email: "priya@demo.local", role: "employee", designation: "Data Analyst", department_id: 2, department_name: "Data & AI", status: "active" },
  { id: 1003, user_id: 1003, name: "Rohan Mehta", employee_name: "Rohan Mehta", email: "rohan@demo.local", role: "department_head", designation: "Engineering Lead", department_id: 1, department_name: "Engineering", status: "active" },
  { id: 1004, user_id: 1004, name: "Ananya Roy", employee_name: "Ananya Roy", email: "ananya@demo.local", role: "company_admin", designation: "HR Manager", department_id: 3, department_name: "Human Resources", status: "active" },
];

const demoCompanies = [
  { id: 1, company_name: "Cputek Technologies", name: "Cputek Technologies", industry_type: "Information Technology", users: 128, courses: 24, status: "active" },
  { id: 2, company_name: "Northstar Analytics", name: "Northstar Analytics", industry_type: "Analytics", users: 76, courses: 16, status: "active" },
];

const demoDepartments = [
  { id: 1, department_id: 1, department_name: "Engineering", name: "Engineering", company_id: 1, employee_count: 42 },
  { id: 2, department_id: 2, department_name: "Data & AI", name: "Data & AI", company_id: 1, employee_count: 28 },
  { id: 3, department_id: 3, department_name: "Human Resources", name: "Human Resources", company_id: 1, employee_count: 12 },
  { id: 4, department_id: 4, department_name: "Operations", name: "Operations", company_id: 1, employee_count: 46 },
];

const demoHeads = [
  { id: 1003, user_id: 1003, name: "Rohan Mehta", employee_name: "Rohan Mehta", email: "rohan@demo.local", department_id: 1, department_name: "Engineering" },
  { id: 1005, user_id: 1005, name: "Neha Kapoor", employee_name: "Neha Kapoor", email: "neha@demo.local", department_id: 2, department_name: "Data & AI" },
];

const demoBranding = {
  company_id: 1, company_name: "Cputek Technologies", logo_url: "", logo_public_id: "",
  primary_color: "#FBBF24", secondary_color: "#0F172A", accent_color: "#F59E0B",
};

function mockPayload(path: string, method: string, body: string) {
  if (path.includes("/chat") && path.includes("session")) return { id: "demo-session-001" };
  if (path.includes("/chat") && path.includes("messages")) return [];
  if (path.endsWith("/chat") || path.includes("/chat/")) {
    let message = "your question";
    try { message = JSON.parse(body || "{}").message || message; } catch {}
    return { answer: "This is a simulated LMS AI Assistant response. In the live product, the assistant would use your organisation's learning materials.\n\nFor this demo, your message was: “" + message + "”.", sources: [], session_id: "demo-session-001" };
  }
  if (path.includes("/dashboard/stats") || path.endsWith("/stats")) {
    return { companies: 2, users: 128, courses: 24, lessons: 96, files: 18, active_users: 87, learning_hours: 342, completion_rate: 78, departments: 4, employees: 128, certificates: 36 };
  }
  if (path.includes("/notification-settings")) return { success: true, settings: { course_assignment_email: true, certificate_email: true }, email_delivery_configured: false };
  if (path.includes("/notifications")) return { notifications: [], unread_count: 0, success: true };
  if (path.includes("/branding")) return { ...demoBranding, success: true };
  if (path.includes("/companies") && path.includes("/departments")) return demoDepartments;
  if (path.includes("/department-heads")) return demoHeads;
  if (path.includes("/company-admins")) return demoUsers.filter((u) => u.role === "company_admin");
  if (path.includes("/employees") || path.includes("/users")) {
    if (path.includes("/courses")) return demoCourses;
    if (path.includes("/completed-lessons")) return [];
    if (path.includes("/progress")) return { progress: 72, completed_lessons: 5, total_lessons: 7 };
    return demoUsers;
  }
  if (path.includes("/companies")) return demoCompanies;
  if (path.includes("/departments")) return demoDepartments;
  if (path.includes("/courses")) {
    if (path.includes("/lessons")) return [
      { id: 1, title: "Introduction", description: "Course overview and learning objectives.", order: 1, duration: "20 min" },
      { id: 2, title: "Core concepts", description: "Explore the essential concepts with examples.", order: 2, duration: "35 min" },
    ];
    const match = path.match(/\/courses\/(\d+)/);
    if (match) return demoCourses.find((course) => course.id === Number(match[1])) || demoCourses[0];
    return demoCourses;
  }
  if (path.includes("/user-courses") || path.includes("/assignments")) return demoCourses;
  if (path.includes("/certificates")) return { certificates: [{ id: 1, certificate_number: "LMS-DEMO-001", user_name: "Demo Learner", course_title: "Cybersecurity Essentials", company_name: "Cputek Technologies", issued_at: "2026-10-10", status: "issued" }] };
  if (path.includes("/files")) return [{ id: 1, filename: "Employee Handbook.pdf", file_name: "Employee Handbook.pdf", file_type: "pdf", created_at: "2026-10-14" }];
  if (path.includes("/next-employee-id")) return { employee_id: "DEMO-1006", next_employee_id: "DEMO-1006" };
  if (path.includes("/auth/") || path.includes("/profile")) return { success: true, user: demoUsers[0], ...demoUsers[0] };
  if (method === "GET") return [];
  return { success: true, message: "Demo action completed. Changes are not persisted." };
}

if (typeof window !== "undefined") {
  const w = window as Window & { __lmsDemoFetchInstalled?: boolean };
  if (!w.__lmsDemoFetchInstalled) {
    const nativeFetch = window.fetch.bind(window);
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const rawUrl = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      const url = new URL(rawUrl, window.location.origin);
      if (!url.pathname.includes("/api/")) return nativeFetch(input, init);
      const method = (init?.method || (input instanceof Request ? input.method : "GET")).toUpperCase();
      const body = typeof init?.body === "string" ? init.body : "";
      const payload = mockPayload(url.pathname, method, body);
      return new Response(JSON.stringify(payload), { status: 200, headers: { "Content-Type": "application/json" } });
    };
    w.__lmsDemoFetchInstalled = true;
    const defaults: Record<string, string> = {
      token: "lms-demo-session", user_id: "1001", role: "super_admin", company_id: "1",
      department_id: "1", user_name: "Demo Administrator", name: "Demo Administrator",
      email: "admin@lmsdemo.local", company_name: "Cputek Technologies",
    };
    Object.entries(defaults).forEach(([key, value]) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, value);
    });
  }
}

export default function DemoRuntime() {
  useEffect(() => {}, []);
  return null;
}
