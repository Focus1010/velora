export const getUser = () => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem("velora_user");
  return raw ? JSON.parse(raw) : null;
};

export const setUser = (user: any) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("velora_user", JSON.stringify(user));
};

export const getInvoices = () => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem("velora_invoices");
  return raw ? JSON.parse(raw) : [];
};

export const setInvoices = (invoices: any[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("velora_invoices", JSON.stringify(invoices));
};

