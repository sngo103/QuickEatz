// import { connectToDatabase } from "../../../../util/mongodb";
import { getToken, addNewToken } from "../../../util/apiHelpers";
import _ from "lodash";

export default async (req, res) => {
  // Request body should have email and token
  if (req.method === "POST") {
    // req.body.token = "60733401b5680226fb0cf57b";
    const response = await checkToken(req.body.email, req.body.token);
    if (_.isEmpty(response) || response.isDeleted) {
      res.status(401).json({
        error: "No active session for this user.",
        success: false,
      }); // Redirect to login in this case.
    } else {
      addNewToken(req.body.email, req.body.type);
      res.status(200).json({
        message: "Session found.",
        success: true,
      }); // User is authorized to view page.
    }
  } else {
    res.status(400).json({
      error: "Something went wrong.",
      success: false,
    });
  }
};
