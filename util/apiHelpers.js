export function formatNewCustomer(firstName, lastName, username, password, email) {
  const customersDoc = {
    "first_name": firstName,
    "last_name": lastName,
    "username": username,
    "password": password,
    "email": email,
    "created_at": Date.now(),
    "reviews": [],
    "country_code": 1,
  };
  const allUsersDoc = {
    "relevant_id": undefined,
    "email": email,
    "password": password,
    "account_type": "customer",
  };
  return [customersDoc, allUsersDoc];
}
