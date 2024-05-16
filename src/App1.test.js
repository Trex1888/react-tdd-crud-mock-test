import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("./data.json", () => [
  {
    id: 1,
    name: "John",
    age: 30,
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Alice",
    age: 35,
    email: "alice@example.com",
  },
  {
    id: 3,
    name: "Bob",
    age: 40,
    email: "bob@example.com",
  },
]);

beforeEach(() => {
  render(<App />);
});

test("renders learn react link", () => {
  const headerText = screen.getByText(/contact page app/i);
  expect(headerText).toBeInTheDocument();
});

it("should render out our 3 objects", async () => {
  const contacts = [
    { name: "John", age: 30, email: "john@example.com" },
    { name: "Alice", age: 35, email: "alice@example.com" },
    { name: "Bob", age: 40, email: "bob@example.com" },
  ];

  contacts.forEach((contact) => {
    expect(screen.getByText(contact.name)).toBeInTheDocument();
    expect(screen.getByText(contact.age)).toBeTruthy();
    expect(screen.getByText(contact.email)).toBeVisible();
  });
});

it("should delete a contact", async () => {
  const deleteBtn = screen.getByTestId("deleteBtn1");
  userEvent.click(deleteBtn);

  await waitFor(() => {
    const newNameValue = screen.queryByText("John");
    expect(newNameValue).toBeNull();
  });
});

it("should add a new contact", async () => {
  const nameValue = await screen.findByPlaceholderText("Enter Name");
  fireEvent.change(nameValue, { target: { value: "Dave" } });

  const ageValue = await screen.findByPlaceholderText("Enter Age");
  fireEvent.change(ageValue, { target: { value: "45" } });

  const emailValue = screen.getByPlaceholderText("Enter Email");
  fireEvent.change(emailValue, { target: { value: "dave@example.com" } });

  const addClick = screen.getByRole("button", {
    name: "Add",
  });
  userEvent.click(addClick);

  await waitFor(() => {
    expect(screen.getByText("Dave")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeTruthy();
    expect(screen.getByText("dave@example.com")).toBeVisible();
  });
});

it("should edit a contact", async () => {
  const editBtn = screen.getByTestId("editBtn1");
  userEvent.click(editBtn);

  const nameInput = await screen.findByDisplayValue("John");
  userEvent.clear(nameInput);
  userEvent.type(nameInput, "Steve");

  const ageInput = await screen.findByDisplayValue("30");
  userEvent.clear(ageInput);
  userEvent.type(ageInput, "50");

  const emailInput = await screen.findByDisplayValue("john@example.com");
  userEvent.clear(emailInput);
  userEvent.type(emailInput, "steve@example.com");

  const saveBtn = await screen.findByTestId("saveBtn1");
  userEvent.click(saveBtn);

  await waitFor(() => {
    expect(screen.getByText("Steve")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("steve@example.com")).toBeVisible();
  });
});

it("should cancel edits", async () => {
  const editBtn = screen.getByTestId("editBtn1");
  userEvent.click(editBtn);

  const nameText = await screen.findByDisplayValue("John");
  userEvent.clear(nameText);
  userEvent.type(nameText, "Sam");

  const ageText = await screen.findByDisplayValue("30");
  userEvent.clear(ageText);
  userEvent.type(ageText, "35");

  const emailText = await screen.findByDisplayValue("john@example.com");
  userEvent.clear(emailText);
  userEvent.type(emailText, "sam@example.com");

  const cancelBtn = screen.getByTestId("cancelBtn1");
  userEvent.click(cancelBtn);

  await waitFor(() => {
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});

describe("Filtering tests", () => {
  const getSearchTextBox = () => screen.getByPlaceholderText("Search Contacts");

  it("shouldn't filter name when search matches assignedTo", () => {
    const searchTextBox = getSearchTextBox();
    userEvent.type(searchTextBox, "John");
    const nameText = screen.getByText("John");
    expect(nameText).toBeInTheDocument();
  });

  it("should filter name when search doesn't match assignedTo", () => {
    const searchTextBox = getSearchTextBox();
    userEvent.type(searchTextBox, "Alice");
    const nameText = screen.queryByText("John");
    expect(nameText).not.toBeInTheDocument();
  });

  it("shouldn't filter age when search matches assignedTo", () => {
    const searchTextBox = getSearchTextBox();
    userEvent.type(searchTextBox, "35");
    const ageText = screen.getByText("35");
    expect(ageText).toBeInTheDocument();
  });

  it("should filter age when search doesn't match assignedTo", () => {
    const searchTextBox = getSearchTextBox();
    userEvent.type(searchTextBox, "40");
    const ageText = screen.queryByText("35");
    expect(ageText).not.toBeInTheDocument();
  });

  it("shouldn't filter email when search matches assignedTo", () => {
    const searchTextBox = getSearchTextBox();
    userEvent.type(searchTextBox, "john@example.com");
    const emailText = screen.getByText("john@example.com");
    expect(emailText).toBeInTheDocument();
  });

  it("should filter email when search doesn't match assignedTo", () => {
    const searchTextBox = getSearchTextBox();
    userEvent.type(searchTextBox, "alice@example.com");
    const emailText = screen.queryByText("john@example.com");
    expect(emailText).not.toBeInTheDocument();
  });
});
