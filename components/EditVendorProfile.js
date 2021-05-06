import React from "react";
import styles from "../styles/CustomerProfile.module.css";

export default class EditVendorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
    if (storedState) {
      const data = {
        token: storedToken,
        email: storedEmail,
      };
      console.log(JSON.stringify(data));
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
            });
          } else {
            this.setState({
              isLoggedIn: false,
              isLoading: false,
            });
          }
        });
    } else {
      console.log("Token not found!");
      this.setState({
        isLoggedIn: false,
        isLoading: true,
      });
      Router.push("/login");
    }
  }

  componentDidUpdate() {
    if (this.state.vendor_id == "") {
      //This MAY be bad practice, but it works and shouldnt cause any loops, unless you go to the page directly
      const vendor_id = Router.query.vendor_id;
      console.log("VENDOR HEERE");
      console.log(vendor_id);
      console.log(typeof vendor_id);
      const vendor = fetch(`/api/updateVendorProfile?_id=${vendor_id}`) //Get the vendor's data
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_menu: json.menu,
            vendor_cuisine: json.cuisine,
            vendor_firstname: json.first_name,
            vendor_rating: json.average_rating,
            vendor_lastname: json.last_name,
            vendor_review_ids: json.reviews,
          });
          console.log("I helped!");
          console.log(json);
        });
    }
  }

  render() {
    return (
      <div>
        <section className={styles.topPage}>
          <h2 className={styles.title}>Edit Vendor Profile</h2>
        </section>

        <section className={styles.midPage}>
          <h2> What would you like to edit today?</h2>
        </section>

        <section className={styles.bottomPage}>
          <br />
          <br />
          <button className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white">
            Settings
          </button>
          &ensp; &ensp;
          <button className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white">
            Apply
          </button>
        </section>
      </div>
    );
  }
}
