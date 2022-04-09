import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
// import { History } from 'history';

interface Props {
  // history: History;
  history: RouteComponentProps["history"];
  location: any;
  updateContact(id:string,updateName:string,updateEmail:string): void;
}

const EditContact: React.FC<Props> = (props) => {
  //recieve data from coresponding contact id to modify
  const { id, name, email } = props.location.state.contact;

  //updated name and updated email will be sent into updateContact function in App
  const [updateName, setName] = useState(name);
  const [updateEmail, setEmail] = useState(email);

  const update = (e:React.SyntheticEvent) => {
    e.preventDefault();
    if (updateName === "" || updateEmail === "") {
      alert("All fields are mandatory!");
      return;
    }
    props.updateContact(id, updateName, updateEmail);
    setName("");
    setEmail("");
    //back to default page
    props.history.push("/");
  };
  
  return (
    <div className="container-fluid">
      <h1 className="font-weight-bold">Edit Contact</h1>

      <hr/>

      <form className="ui form" onSubmit={update}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control"
            value={updateName}
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
            value={updateEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* submit button */}
        <button className="btn btn-primary my-3">Update</button>
        
        {/* back to default page */}
        <Link to="/">
          <button className="btn btn-secondary ms-3">Cancel</button>
        </Link>
      </form>
      
    </div>
  );
}

export default EditContact;