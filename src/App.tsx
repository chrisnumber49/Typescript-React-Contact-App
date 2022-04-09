import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuid_v4 } from "uuid";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";

interface EachContact {
  id?: string;
  name: string;
  email: string;
}

function App() {
  const LOCAL_STORAGE_KEY: string = "contacts";
  const [contacts, setContacts] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //add new contact, when on submit in AddContact the input name and email will be sent here
  const addContact = (newName:string, newEmail:string) => {
    setContacts([...contacts, {id: uuid_v4(), name: newName, email: newEmail }]);
  };

  //edit the selected contact, when on submit in EditContact the coresponding id, input name and email will be sent here
  const updateContact = (updateId:string, updateName:string, updateEmail:string) =>{
    const updatedContact = contacts.map((eachContact:EachContact) => {
      //return eachContact.id === updateId ? {id: eachContact.id, name: updateName, email: updateEmail} :eachContact;
      return eachContact.id === updateId ? {...eachContact, name: updateName, email: updateEmail} :eachContact;
    })
    setContacts(updatedContact);
  };

  //delete the selected contact, when click the delete button in ContactCard, the coresponding id will be sent here
  const deleteConact = (id:string) => {
    const newContactList = contacts.filter((eachContact:EachContact) => {
      return eachContact.id !== id;
    });

    setContacts(newContactList);
  };

  //search contacts, when input on change in ContactList, the input value will be sent here
  const searchContact = (search:string) => {
    setSearch(search);
    if(search !== "") {
      const searchContactList = contacts.filter((eachContact:EachContact)=>{
        return (eachContact.name.toLowerCase().includes(search.toLowerCase()) || eachContact.email.toLowerCase().includes(search.toLowerCase()));
      });
      setSearchResult(searchContactList);
    }else{
      setSearchResult(contacts);
    }
  };

  //load the contacts from the local storage at the begining
  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "");
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  //save the contacts into the local storage once contacts change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <Router>
        {/* header */}
        <header className="bg-dark text-center container-fluid">
          <h1 className="font-weight-bold text-white pt-2">My Contact Manager</h1>
          <hr/>
        </header>

        <Switch>
          {/* default page, if searching somthing, sned searchResult, otherwise, send full contacts*/}
          <Route 
            path="/" 
            exact 
            render={(props)=> (
              <ContactList {...props} 
                contacts={search.length > 0 ? searchResult : contacts} 
                deleteConact={deleteConact} 
                search={search} 
                searchContact={searchContact}
              />
            )}
          />
          
          {/* send addContact function to AddContact */}
          <Route 
            path="/add"
            render={(props)=> (
              <AddContact {...props} addContact={addContact} />
            )}
          />

          {/* ContactDetail with coresponding path with contact id */}
          <Route
            path="/contact/:id"
            // component={ContactDetail}
            render={(props)=> (
              <ContactDetail {...props} />
            )}
          />

          {/* EditContact with coresponding path with contact id*/}
          <Route
            path="/edit/:id"
            render={(props)=> (
              <EditContact {...props} updateContact={updateContact} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;