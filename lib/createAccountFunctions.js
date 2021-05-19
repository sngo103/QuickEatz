export async function newCustomer(customerObj) {
  const data = {
    username: customerObj.username,
    password: customerObj.password,
    first_name: customerObj.first_name,
    last_name: customerObj.last_name,
    email: customerObj.email,
    business_name: customerObj.business_name,
    phone_number: customerObj.phone,
    website: customerObj.website,
    xCor: 40.85088985991754,
    yCor: -73.97110926821726,
    hours: customerObj.hours,
    cuisine: customerObj.cuisine,
    menu: customerObj.menu,
    is_open: false,
  };
  const response = await fetch("/api/users/customers/new_customer", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => json.pass);
  return response;
}

export async function newVendor(email, password, account_type) {
  const data = {
    email: email,
    password: password,
    account_type: account_type,
  };
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => json.pass);
  return response;
}

export async function refreshToken(email, type) {
  const data = {
    email: email,
    type: type,
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

export async function logout(email) {
  const data = {
    email: email,
  };
  const response = await fetch("/api/auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  return response;
}
