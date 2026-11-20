function normalizePath(path: string): string {
  const pathname = path.split("?")[0] || "/";
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function canNonSuperAdminAccessAdminRoute(method: string, path: string): boolean {
  const normalizedMethod = method.toUpperCase();
  const normalizedPath = normalizePath(path);

  if (normalizedMethod === "GET" && normalizedPath === "/api/admin/withdrawals") {
    return true;
  }

  return normalizedMethod === "POST" &&
    /^\/api\/admin\/withdrawals\/\d+\/(?:approve|reject|inpay|drimpay(?:\/status)?|clapay(?:\/status)?|ppaypros(?:\/status)?)$/.test(normalizedPath);
}

export function canNonSuperAdminAccessBankerRoute(method: string, path: string): boolean {
  const normalizedMethod = method.toUpperCase();
  const normalizedPath = normalizePath(path);

  if (normalizedMethod === "GET" && normalizedPath === "/api/banker/withdrawals") {
    return true;
  }

  return normalizedMethod === "POST" &&
    /^\/api\/banker\/withdrawals\/\d+\/(?:approve|reject)$/.test(normalizedPath);
}
