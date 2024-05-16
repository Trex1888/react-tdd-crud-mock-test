function EditRow({
  contact,
  formData,
  setFormData,
  handleFormChange,
  handleCancelClick,
  handleEditFormSubmit,
}) {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.edit.name}
          onChange={(e) => handleFormChange(e, "edit", setFormData)}
        />
      </td>
      <td>
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.edit.age}
          onChange={(e) => handleFormChange(e, "edit", setFormData)}
        />
      </td>
      <td>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.edit.email}
          onChange={(e) => handleFormChange(e, "edit", setFormData)}
        />
      </td>
      <td>
        <button
          type="button"
          data-testid={`cancelBtn${contact.id}`}
          onClick={handleCancelClick}
        >
          Cancel
        </button>
        <button
          type="button"
          data-testid={`saveBtn${contact.id}`}
          onClick={handleEditFormSubmit}
        >
          Save
        </button>

        {/* <button
          type="button"
          data-testid={`saveBtn${contact.id}`}
          onClick={(e) => handleEditFormSubmit(e, contact)}
        >
          Save
        </button> */}
      </td>
    </tr>
  );
}

export default EditRow;
