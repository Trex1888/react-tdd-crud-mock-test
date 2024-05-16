function ReadRow({ contact, handleEditClick, handleDeleteClick }) {
  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.age}</td>
      <td>{contact.email}</td>
      <td>
        {/* <button
          type="button"
          data-testid={`editBtn${contact.id}`}
          onClick={(e) => handleEditClick(e, contact)}
        >
          Edit
        </button> */}
        <button
          type="button"
          data-testid={`editBtn${contact.id}`}
          onClick={() => handleEditClick(contact)}
        >
          Edit
        </button>

        <button
          type="button"
          data-testid={`deleteBtn${contact.id}`}
          onClick={() => handleDeleteClick(contact.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ReadRow;
