import { Fragment, useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import EditRow from "./components/EditRow";
import ReadRow from "./components/ReadRow";
import Search from "./components/Search";
import data from "./data.json";

// const data = [
//   {
//     id: 1,
//     name: "Fred",
//     age: 43,
//     email: "fred@fred.com",
//   },
//   {
//     id: 2,
//     name: "Mike",
//     age: 50,
//     email: "mike@mike.com",
//   },
//   {
//     id: 3,
//     name: "Kim",
//     age: 25,
//     email: "kim@kim.com",
//   },
// ];

function App() {
  const [contacts, setContacts] = useState(data);
  const [editContactId, setEditContactId] = useState(null);
  const [formData, setFormData] = useState({
    add: {
      name: "",
      age: "",
      email: "",
    },
    edit: {
      name: "",
      age: "",
      email: "",
    },
  });
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.age.toString().includes(search) ||
      contact.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleFormChange = (e, formType) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [formType]: {
        ...prevFormData[formType],
        [name]: value,
      },
    }));
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      name: formData.add.name,
      age: formData.add.age,
      email: formData.add.email,
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      add: {
        name: "",
        age: "",
        email: "",
      },
    }));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedContact = {
      id: editContactId,
      name: formData.edit.name,
      age: formData.edit.age,
      email: formData.edit.email,
    };

    const updatedContacts = contacts.map((contact) =>
      contact.id === editContactId ? editedContact : contact
    );

    console.log("Edit Saved");
    setContacts(updatedContacts);
    setEditContactId(null);
  };

  const handleDeleteClick = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    console.log("Contact Deleted");
    setContacts(newContacts);
  };

  const handleEditClick = (contact) => {
    setEditContactId(contact.id);

    const editFormValues = {
      name: contact.name,
      age: contact.age,
      email: contact.email,
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      edit: editFormValues,
    }));
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  return (
    <div className="App">
      <h2>Contact Page App</h2>
      <Search search={search} setSearch={setSearch} />
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact, i) => (
              <Fragment key={i}>
                {editContactId === contact.id ? (
                  <EditRow
                    contact={contact}
                    formData={formData}
                    setFormData={setFormData}
                    handleEditClick={handleEditClick}
                    handleCancelClick={handleCancelClick}
                    handleFormChange={handleFormChange}
                    handleEditFormSubmit={handleEditFormSubmit}
                  />
                ) : (
                  <ReadRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add New Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.add.name}
          onChange={(e) => handleFormChange(e, "add")}
        />
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.add.age}
          onChange={(e) => handleFormChange(e, "add")}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.add.email}
          onChange={(e) => handleFormChange(e, "add")}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
