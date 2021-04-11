// import { connectToDatabase } from "../../../../util/mongodb";
import { findUser } from "../../../util/apiHelpers";
import _ from "lodash";
import { compareSync } from "bcrypt";

export default async (req, res) => {
  // Request body should have username, password, and account_type
  if (req.method === "GET") {
    let collection;
    if (req.body.account_type === "customer") {
      collection = "customers";
    } else if (req.body.account_type === "vendor") {
      collection = "vendors";
    } else {
      res.status(400).json({ error: "Invalid account_type." });
      return;
    }
    const response = await findUser(_.get(req, "body.email"), collection);
    if (_.isEmpty(response)) {
      res.status(400).json({ error: "No account with this email exists." });
    } else if (response.length != 1) {
      res.status(400).json({
        error: "More than one account with this email exist. Contact admin.",
      });
    } else {
      const user = response[0];
      const accepted = compareSync(req.body.password, user.password);
      if (accepted) {
        res.status(200).json({ message: "Password accepted." });
      } else {
        res.status(401).json({ message: "Password incorrect." });
      }
    }
  } else {
    res.status(400).json({ error: "Something went wrong." });
  }
};
