import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";
// import user from "../images/user.ico";

interface Props {
  deleteConact(id:string): void;
  contact:{
    id: string;
    name: string;
    email:string;
  };
}

const ContactCard: React.FC<Props> = (props) => {
  //recieve props from ContactList
  const { id, name, email } = props.contact;
 
  return (
    <div className="d-flex align-items-center border my-2">
      {/* link to coresponding path with contact id to render contact's detail with ContactDetail */}
      <div className="col-lg-1 col-2 d-flex justify-content-center flex-wrap">
        <Link to={{pathname: `/contact/${id}`, state:{contact: props.contact}}}>
          <img className="ms-2 w-100" src={user} alt="user" />
        </Link>
      </div>

      {/* link to coresponding path with contact id and data to render contact's detail with ContactDetail */}
      <div className="col-lg-8 col-7 d-flex justify-content-star ps-3 flex-wrap">
        <Link to={{pathname: `/contact/${id}`, state:{contact: props.contact}}} className="text-decoration-none">
          <h2>{name}</h2>
          <h6>{email}</h6>
        </Link>
      </div>

      <div className="col-lg-3 col-3 d-flex justify-content-end flex-wrap">
        {/* link to coresponding path with contact id and data to modify contact with EditContact */}
        <Link to={{pathname: `/edit/${id}`, state:{contact: props.contact}}}>
          <button className="btn btn-info text-white m-2">
            <i className="material-icons">edit</i>
          </button>
        </Link>
        
        {/* delete button, send coresponding id to deleteConact function in App */}
        <button className="btn btn-danger m-2" onClick={() => props.deleteConact(id)}>
          <i className="material-icons">delete</i>
        </button>
        
      </div>
    </div>
  );
};

export default ContactCard;