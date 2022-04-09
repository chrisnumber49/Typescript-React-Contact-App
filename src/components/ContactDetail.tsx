import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

interface Props {
    location: any;
}

const ContactDetail: React.FC<Props> = (props) => {
  //recieve data from coresponding contact id then render
  const { name, email } = props.location.state.contact;

  return (
    <div className="container-fluid my-2 text-center">
        <div className="d-flex justify-content-center">
            <div className="card" style={{width: '25rem'}}>
                <img src={user} className="card-img-top" alt="user"/>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{email}</p>
                </div>
            </div>
        </div>

        {/* back to default page */}
        <Link to="/">
            <button className="btn btn-primary mt-2">Back to Contacts</button>
        </Link>
    </div>
  );
};

export default ContactDetail;