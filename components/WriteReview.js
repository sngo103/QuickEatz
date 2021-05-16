import Head from "next/head";
import React from "react";
import Router from "next/router";

export class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    console.log("THERE");
    this.state = {
      current_user: localStorage.getItem("quickeatz_email") || "",
      current_vendor_name: "",
      current_vendor_id: Router.query.vendor_id || "",
      review_text: "",
      review_rating: "1.0",
      isLoggedIn: false,
      isLoading: true,
      account_type: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
    if (storedToken && storedEmail && storedState) {
      const data = {
        token: storedToken,
        email: storedEmail
      };
      fetch("/api/auth/verifyShallow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            console.log("Token verified!");
            localStorage.setItem("quickeatz", true);
            this.setState({
              isLoggedIn: true,
              isLoading: false,
              account_type: json.account_type
            });
          } else {
            this.setState({
              isLoggedIn: false,
              isLoading: true,
            });
            Router.push("/login")
          }
        });
    } else {
      console.log("Token not found!")
      this.setState({
        isLoggedIn: false,
        isLoading: false
      })
      Router.push("/login")
    }
    fetch(`/api/getVendorName?_id=${Router.query.vendor_id}`) //Get the business name of the reviewee for readability
      .then((v_data) => v_data.json())
      .then((v_json) => {
        this.setState({ current_vendor_name: v_json.business_name });
      }); //Get the name specifically
    console.log("Here's the latest state!");
    console.log(this.state);
  }

  handleChange(event) {
    const target = event.target;
    if (target.id === "comments") {
      this.setState({ review_text: target.value });
    } else if (target.id === "rating") {
      this.setState({ review_rating: target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Im handing over this state to the Review call!");
    console.log(this.state);
    const rev_info = {
      review_rating: this.state.review_rating,
      review_text: this.state.review_text,
    };

    const user_id_str = this.state.current_user;
    const vendor_id_str = this.state.current_vendor_id;

    const data = fetch(
      `/api/sendReview?user_email=${user_id_str}&vendor_id=${vendor_id_str}&review_content=${rev_info.review_text}&rating=${rev_info.review_rating}`
    ).then((response) => {
      console.log(response);
      fetch(`/api/updateVendorRating?vendor_id=${vendor_id_str}`);
      if (response.status != 400) {
        //Im probably misusing the convention, but Ill leave it as 400 for now. See sendReview.
        Router.push("/reviewSubmitted");
      } else {
        Router.push("/dashboard"); //REPLACE WITH SOMETHING ELSE
      }
    });
  }

  render() {
    console.log("YOU ARE: ");
    console.log(this.state.current_user);
    return (
      <>
        <Head>
          <title> Write Review </title>
        </Head>
        <div className="container text-center">
          <h1 className="container p-3 text-xl">
            You are writing a review for...
          </h1>
          <h1 className="container p-3 text-5xl">
            {this.state.current_vendor_name}
          </h1>
          <br />

          <br />

          <form onSubmit={this.handleSubmit}>
            <label className="text-xl" for="rating">
              How would you rate this vendor?
            </label>
            <br />
            <br />
            <select
              className="text-xl border-2 border-black rounded-md p-1"
              id="rating"
              value={this.state.review_rating}
              onChange={this.handleChange}
              required
            >
              <option value="1.0"> 1 Star </option>
              <option value="1.5">1.5 Star </option>
              <option value="2.0"> 2 Star </option>
              <option value="2.5">2.5 Star </option>
              <option value="3.0"> 3 Star </option>
              <option value="3.5">3.5 Star </option>
              <option value="4.0"> 4 Star </option>
              <option value="4.5">4.5 Star </option>
              <option value="5.0"> 5 Star </option>
            </select>
            <br />
            <br />
            <hr />
            <br />
            <label className="text-xl" for="comments">
              Additional Comments
            </label>
            <br />
            <br />
            <textarea
              id="comments"
              placeholder="Leave a comment"
              value={this.state.review_text}
              onChange={this.handleChange}
              className="text-md w-1/4 h-32 border-2 border-black rounded-md p-1"
            />
            <br />
            <br />
            <hr />
            <br />
            <button
              className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
              type="submit"
            >
              Submit Review
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default WriteReview;
