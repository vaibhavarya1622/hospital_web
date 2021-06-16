import React, {useState} from "react";
import { useHistory, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../css/signuppage.css";
import NewSlider from "../Components/NewSlider";
import Whychooseus from "../Components/Whychooseus";
import Headersignup from "../Components/Myheader/Headersignup";
import "react-toastify/dist/ReactToastify.css";

const delay = require("delay");
const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://annapoornaeyehospital.com/wp-content/uploads/2016/06/1427405029369.jpg",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1579037005241-a79202c7e9fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
];

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: user.hemail,
      password: user.hpassword,
    };
    axios
      .put("https://server.prioritypulse.co.in/auth/hospisignin", newUser)

      .then(async (res) => {
        localStorage.setItem("token", res["data"]["token"]);
        toast.success("Login Sucessfully");
        await delay(1000);
        console.log("Login SuccessFully");
        console.log(res);
        history.push("/home");
      })
      .catch((err) => {
        console.log(err.error);
        toast.error("Invalid Credentials");
        console.log(`Invalid Details`);
      });
  };

  return (
    <>
      <Headersignup location="login" />

      {/* <div class="maindiv fadeInDown">
        <div class="div1">
          <div className="mysignupform">
            <div class="main">
              <p className="sign" align="center">
                Sign in
                <br />
                <span class="welcometext" style={{ color: "black" }}>
                  Welcome to Priority Pulse
                </span>
                <p class="welcometext" style={{ fontSize: "1rem", color: "black" }}>
                  Your Pulse,Our Priority
                </p>
              </p>
              <form class="form1" method="PUT">
                <input
                  name="hemail"
                  class="un "
                  type="text"
                  align="center"
                  placeholder="Email-id"
                  autoComplete="on"
                  onChange={handleInputs}
                />
                <input
                  name="hpassword"
                  class="pass"
                  type="password"
                  align="center"
                  placeholder="Password"
                  autoComplete="on"
                  onChange={handleInputs}
                />
                <a onClick={handleSubmit}  class="submit  welcometext" align="center">
                  Sign in
                </a>
                <p class="forgot welcometext" align="center">
                  <a href="/login">Already have an account? Login</a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div class="div2">
          <div className="mynewslider">
            <NewSlider tutorialSteps={tutorialSteps} />
          </div>
        </div>
      </div> */}

      <Whychooseus />
    </>
  );
};

export default Signup;
