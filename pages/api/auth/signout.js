import _ from "lodash";
import { deleteToken } from "../../../util/apiHelpers";

export default async (req, res) => {
  // Request body should have email
  if (req.method === "POST") {
    await deleteToken(req.body.email);
    res.status(200).json({ message: "Session ended." });
  } else {
    res.status(400).json({ error: "Something went wrong." });
  }
};
