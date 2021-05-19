// import { connectToDatabase } from "../../../../util/mongodb";
import { addNewToken } from "../../../util/apiHelpers";
import _ from "lodash";

export default async (req, res) => {
  // Request body should have email
  if (req.method === "POST") {
    const newToken = await addNewToken(req.body.email, req.body.type);
    res.status(200).json({newToken:newToken});
  } else {
    res.status(400).json({ error: "Something went wrong." });
  }
};
