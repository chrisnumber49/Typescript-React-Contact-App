import React, {ChangeEvent, useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

interface Contact{
  id: string;
  name: string;
  email: string;
}

interface Props {
  contacts:Contact[];
  search: string;
  deleteConact(id: string): void;
  searchContact(e: string): void;
}

const ContactList: React.FC<Props> = (props) => {
  //get the input value in the search bar, sent to the searchContact function in App
  // const inputValue = useRef<HTMLInputElement>(null);

  //map each contact in contacts, then send to each ContactCard to render each contact
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        deleteConact={props.deleteConact}
        key={contact.id}
      />
    );
  });
  
  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between my-2">
        <h1 className="font-weight-bold">Contact List</h1>

        {/* link to AddContact */}
        <Link to="/add">
          <button className="btn btn-primary">Add Contact</button>
        </Link>
      </div>
      <hr/>

      {/* sent the value in the search bar to the searchContact function in App*/}
      <div className="input-group mb-3">
        <input type="text" 
          className="form-control" 
          placeholder="Find Someone..." 
          value={props.search} 
          onChange={(e)=> props.searchContact(e.target.value)}
        />
        <div className="input-group-append">
          <span className="input-group-text" id="basic-addon2">
            <i className="material-icons">search</i>
          </span>
        </div>
      </div>
      
      {/* render ContactCard */}
      {renderContactList.length ? renderContactList : <h1> No Contact is Found!!! </h1>}
    </div>
  );
};

export default ContactList;