import React from "react";
import jsCookie from "js-cookie";
import Image from 'next/image'

export class VendorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
	 
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
	console.log(storedEmail);
	console.log(storedToken);
	const cookie_val = jsCookie.get();
    if (storedState) {
      const data = {
        token: storedToken,
        email: storedEmail
      };
	  console.log(JSON.stringify(data));
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
			      //console.log(json.newToken); I STOPPED THE USE OF A NEW TOKEN IN VERIFYSHALLOW
            //localStorage.setItem("quickeatz_token", json.newToken);
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
      console.log("Token not found!")
      this.setState({
        isLoggedIn: false,
        isLoading: true,
      });
    }
  }
	
	static async getInitialProps({req}){
		console.log(req);
		const initProps = {};
		if(req && req.headers){
			const cookies = req.headers.cookie;
			if(typeof(cookies) === 'string'){
				const cookiesJSON = jsHttpCookie.parse(cookies);
				initProps.token = cookiesJSON.token;
			}
		}
		return initProps;
	}

  render() {
    if (this.state.isLoading) {
      return <div> Loading... </div>;
    } else if (this.state.isLoggedIn) {
      return (
        <div>
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Vendor Dashboard
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              You are logged in!!!
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      );
    } else {
      return (
        <div>
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Vendor Dashboard
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              Not logged in.
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      );
    }
  }
}

export default VendorDashboard;
