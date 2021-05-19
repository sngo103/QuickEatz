import { checkToken } from "../../../util/apiHelpers";
import _ from "lodash";

export default async (req, res) => {
  // Request body should have email and token
  if (req.method === "POST") {
    const response = await checkToken(req.body.token);
    if (_.isEmpty(response)) {
      res.status(401).json({
        error: "No active session for this user.",
        success: false,
      }); // Redirect to login in this case.
    } else {
      res.status(200).json({
        message: "Session found.",
        success: true,
        account_type: response.account_type,
      }); // User is authorized to view page.
    }
  } else {
    res.status(400).json({
      error: "Something went wrong.",
      success: false,
    });
  }
};
