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
      review_rating: "",
      isLoggedIn: false,
      isLoading: true,
      account_type: "",
      current_vendor_firstname: "",
      current_vendor_lastname: "",
      current_vendor_address: [],
      current_vendor_phone: "",
      current_vendor_website: "",
      current_vendor_menu: [],
      current_vendor_cuisine: "",
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
        email: storedEmail,
      };
      fetch("/api/auth/verifyShallow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            console.log("Token verified!");
            localStorage.setItem("quickeatz", true);
            this.setState({
              isLoggedIn: true,
              isLoading: false,
              account_type: json.account_type,
            });
          } else {
            this.setState({
              isLoggedIn: false,
              isLoading: true,
            });
            Router.push("/login");
          }
        });
    } else {
      console.log("Token not found!");
      this.setState({
        isLoggedIn: false,
        isLoading: false,
      });
      Router.push("/login");
    }
    fetch(`/api/getVendorName?_id=${Router.query.vendor_id}`) //Get the business name of the reviewee for readability
      .then((v_data) => v_data.json())
      .then((v_json) => {
        console.log("VJSON:", v_json);
        this.setState({
          current_vendor_name: v_json.business_name,
          current_vendor_firstname: v_json.first_name,
          current_vendor_lastname: v_json.last_name,
          current_vendor_address: v_json.current_location.coordinates,
          current_vendor_phone: v_json.phone_number,
          current_vendor_website: v_json.website,
          current_vendor_menu: v_json.menu,
          current_vendor_cuisine: v_json.cuisine,
        });
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
        <div className="text-center font-pridi">
          <h1 className="pt-10 font-bold text-3xl">
            You are writing a review for...
          </h1>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 m-4 w-3/4">
              <div className="text-left p-5">
                <h1 className="text-5xl">{this.state.current_vendor_name}</h1>
                <br />
                <br />
                <div className="text-left text-lg">
                  <h2 className="font-semibold">
                    Proudly Owned by {this.state.current_vendor_firstname}{" "}
                    {this.state.current_vendor_lastname}
                  </h2>
                  <div className="inline-flex font-semibold">Address: </div>
                  <>
                    {" "}
                    ({this.state.current_vendor_address[0]},{" "}
                    {this.state.current_vendor_address[1]})
                  </>
                  <br />
                  <div className="inline-flex font-semibold">Cuisine: </div>
                  <> {this.state.current_vendor_cuisine}</>
                  <br />
                  <div className="inline-flex font-semibold">Phone Number:</div>
                  <> {this.state.current_vendor_phoner} </>
                  <br />
                  <div className="inline-flex font-semibold">Website:</div>{" "}
                  <a
                    className="font-semibold text-yellow-400 hover:text-yellow-500"
                    href={this.state.current_vendor_website}
                  >
                    {this.state.current_vendor_website}
                  </a>
                </div>
              </div>

              <div className="flex justify-center items-center">
                {" "}
                <div className="border-4 w-full border-double border-black p-2 pl-4 pr-4 m-5">
                  <h2 className="text-3xl pb-1">Menu</h2>
                  <hr />
                  <ul>
                    {this.state.current_vendor_menu.map((menu_item) => (
                      <li className="pb-1">
                        <h2>
                          <strong>{menu_item.food_name}</strong>
                          <br />
                          {menu_item.desc}{" "}
                          {menu_item.desc.trim() ? <br /> : null}
                          <strong>Price:</strong> ${menu_item.price.toFixed(2)}
                        </h2>
                        <hr />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-span-2">
                <br />
                <hr className="border-2 border-black w-full" />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <br />
            <form
              className="text-left text-lg w-3/4 m-4"
              onSubmit={this.handleSubmit}
            >
              <div className="text-3xl">Your Review</div>
              <hr className="my-2" />
              How would you rate this vendor?
              <select
                className="border-2 border-black rounded-md mx-2 px-2 mb-2 focus:outline-none"
                id="rating"
                placeholder
                value={this.state.review_rating}
                onChange={this.handleChange}
                required
              >
                <option value="" selected>None </option>
                <option value="1.0"> 1 Star </option>
                <option value="1.5">1.5 Stars </option>
                <option value="2.0"> 2 Stars </option>
                <option value="2.5">2.5 Stars </option>
                <option value="3.0"> 3 Stars </option>
                <option value="3.5">3.5 Stars </option>
                <option value="4.0"> 4 Stars </option>
                <option value="4.5">4.5 Stars </option>
                <option value="5.0"> 5 Stars </option>
              </select>
              <div className="pt-2 pb-1">Additional Comments</div>
              <textarea
                id="comments"
                placeholder="Leave a comment"
                value={this.state.review_text}
                onChange={this.handleChange}
                className="w-full h-16 border-2 border-black rounded-md p-1"
              />
              <br />
              <div className="text-center">
                <button
                  className="w-1/6 border-2 border-black rounded-md m-2 px-2 hover:bg-yellow-500 hover:text-white focus:outline-none"
                  type="submit"
                >
                  Submit Review
                </button>
              <hr className="my-2" />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default WriteReview;
