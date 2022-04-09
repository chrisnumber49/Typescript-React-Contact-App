import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  history: any;
  addContact(name:string, email:string): void;
}

const AddContact: React.FC<Props> = (props) =>{
  //new contact with name and email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //when form submitted, sned name and email of new contact to addContact in App (name and email should be filled)
  const add = (e:React.SyntheticEvent) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    props.addContact(name, email);
    setName("");
    setEmail("");
    //back to default page
    props.history.push("/");
  };
  
  return (
    <div className="container-fluid">
      <h1 className="font-weight-bold">Add Contact</h1>

      <hr/>

      <form className="ui form" onSubmit={add}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* submit button */}
        <button className="btn btn-primary my-3">Add</button>
        
        {/* back to default page */}
        <Link to="/">
          <button className="btn btn-secondary ms-3">Cancel</button>
        </Link>
      </form>
      
    </div>
  );
}

export default AddContact;