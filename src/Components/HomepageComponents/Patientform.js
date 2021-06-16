// import React, { useState, useEffect, createRef } from "react";
// import { toast } from "react-toastify";
// import "../../css/Patientform.css"
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import Button from "@material-ui/core/Button";
// const delay = require("delay");

// const Patientform = () => {
//   const map = createRef();

//   const [drivers, setDriver] = useState([
//     {
//       name: "",
//     },
//   ]);

//   useEffect(() => {
//     axios
//       .get("https://server.prioritypulse.co.in/hosp/hospitalActiveDriver", {
//         headers: { Authorization: localStorage.getItem("token") },
//       })
//       .then((res) => {
//         console.log(res.data);
//         res.data.map((data) => {
//           setDriver(res.data);
//         });
//         // setDriver([...drivers, { name: data.name, id: data._id }])
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     axios
//       .get("https://server.prioritypulse.co.in/hosp/getUsers", {
//         headers: { Authorization: localStorage.getItem("token") },
//       })
//       .then((res) => {
//         console.log(res.data);
//         setphone(res.data);
//       });
//   }, []);

//   const [phone, setphone] = useState([
//     {
//       location: {
//         coordinates: [],
//       },
//       _id: "",

//       phoneNumber: 0,
//       __v: 0,
//     },
//   ]);

//   const [user, setUser] = useState({
//     name: "",
//     pcase: "",
//     age: "",
//     // patientNo: "",
//     guardianNo: "",
//     casePrior: "",
//     pickedBy: "",
//     pickUplocation: {
//       coordinates: [0, 0],
//     },
//   });
//   let name, value;
//   const handleInputs = (e) => {
//     name = e.target.name;
//     value = e.target.value;
//     if (name === "pickedBy") {
//       let n = drivers.findIndex((re) => {
//         return re.name === value;
//       });
//       // console.log(n);
//       if (n === -1) {
//         setUser({ ...user, [name]: "none" });
//       } else {
//         setUser({ ...user, [name]: drivers[n] });
//       }
//     } else {
//       setUser({ ...user, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newUser = {
//       name: user.name,
//       pcase: user.pcase,
//       age: user.age,
//       // patientNo: Number(user.patientNo),
//       guardianNo: Number(user.guardianNo),
//       casePrior: user.casePrior,
//       pickedBy: user.pickedBy,
//       pickUplocation: {
//         coordinates: [0, 0],
//       },
//     };
//     axios
//       .post("https://server.prioritypulse.co.in/hosp/createRide", newUser, {
//         headers: { Authorization: localStorage.getItem("token") },
//       })
//       .then(async (res) => {
//         toast.success("Form Submitted Sucessfully");
//         await delay(5000);
//         console.log("Form Submitted SuccessFully");
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err.status);
//         console.log(err.error);
//         toast.error("Please fill Form correctly");
//         console.log(`Please Fill form Correctly`);
//       });
//   };

//   return (
//     <div>
//       <div className="patient-box">
//         <h2>Patient Form</h2>

//         <form method="PUT">
//           <div className="userpatient-box">
//             <input
//               name="name"
//               type="text"
//               placeholder="Patient Name"
//               autoComplete="on"
//               id="text"
//               onChange={handleInputs}
//             />
//           </div>
//           <div className="userpatient-box">
//             <input
//               name="pcase"
//               type="text"
//               placeholder="Patient Case"
//               autoComplete="on"
//               id="text"
//               onChange={handleInputs}
//             />
//           </div>
//           <div className="userpatient-box">
//             {" "}
//             <input
//               name="age"
//               type="text"
//               placeholder="Age"
//               autoComplete="on"
//               id="number"
//               onChange={handleInputs}
//             />
//           </div>

//           {/* <div className="userpatient-box">
//             <input
//               name="patientNo"
//               type="text"
//               placeholder="Patient no."
//               autoComplete="on"
//               id="address"
//               onChange={handleInputs}
//             />
//           </div> */}
//           <div className="userpatient-box">
//             {" "}
//             <input
//               name="guardianNo"
//               type="text"
//               placeholder="Guardian No."
//               autoComplete="off"
//               id="text"
//               list="phoneList"
//               onChange={handleInputs}
//             />
//           </div>

//           <div className="userpatient-box">
//             <input
//               name="casePrior"
//               type="text"
//               placeholder="Case priority"
//               autoComplete="on"
//               id="text"
//               onChange={handleInputs}
//             />
//           </div>
//           <div className="userpatient-box">
//             {" "}
//             <input
//               name="pickedBy"
//               type="text"
//               placeholder="Driver Name"
//               autoComplete="off"
//               id="text"
//               list="mylist"
//               onChange={handleInputs}
//             />
//             <datalist id="mylist">
//               {drivers.map((value) => {
//                 return <option value={value.name}></option>;
//               })}
//             </datalist>
//             <datalist id="phoneList">
//               {phone.map((value) => {
//                 return <option value={value.phoneNumber}></option>;
//               })}
//             </datalist>
//           </div>

//           <h6 style={{ marginTop: "-10px" }}>
//             <a onClick={handleSubmit}>Submit</a>
//           </h6>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Patientform;
