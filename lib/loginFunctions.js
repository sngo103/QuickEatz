export async function checkLogin(email, password, account_type) {
  const data = {
    email: email,
    password: password,
    account_type: account_type
  };
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => json.pass);
  return response;
}

export async function refreshToken(email) {
  const data = {
    email: email
  };
  const response = await fetch("/api/auth/new_session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => json.newToken);
  return response;
}