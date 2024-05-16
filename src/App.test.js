import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders learn react link", () => {
  render(<App />);
  const headerText = screen.getByText(/contact page app/i);
  expect(headerText).toBeInTheDocument();
});

it("should render out our 3 objects", async () => {
  render(<App />);

  const contacts = [
    { name: "Fred", age: 43, email: "fred@fred.com" },
    { name: "Mike", age: "50", email: "mike@mike.com" },
    { name: "Kim", age: "25", email: "kim@kim.com" },
  ];

  contacts.forEach((contact) => {
    expect(screen.getByText(contact.name)).toBeInTheDocument();
    expect(screen.getByText(contact.age)).toBeTruthy();
    expect(screen.getByText(contact.email)).toBeVisible();
  });
});

it("should delete a contact", async () => {
  render(<App />);
  const deleteBtn = screen.getByTestId("deleteBtn1");
  userEvent.click(deleteBtn);

  await waitFor(() => {
    const newNameValue = screen.queryByText("Fred");
    expect(newNameValue).toBeNull();
  });
});

it("should add a new contact", async () => {
  render(<App />);
  const nameValue = await screen.findByPlaceholderText("Enter Name");
  fireEvent.change(nameValue, { target: { value: "Chip" } });

  const ageValue = await screen.findByPlaceholderText("Enter Age");
  fireEvent.change(ageValue, { target: { value: "88" } });

  const emailValue = screen.getByPlaceholderText("Enter Email");
  fireEvent.change(emailValue, { target: { value: "chip@chip.com" } });

  const addClick = screen.getByRole("button", {
    name: "Add",
  });
  userEvent.click(addClick);

  await waitFor(() => {
    expect(screen.getByText("Chip")).toBeInTheDocument();
    expect(screen.getByText("88")).toBeTruthy();
    expect(screen.getByText("chip@chip.com")).toBeVisible();
  });
});

it("should edit a contact", async () => {
  render(<App />);
  const editBtn = screen.getByTestId("editBtn1");
  userEvent.click(editBtn);

  const nameInput = await screen.findByDisplayValue("Fred");
  userEvent.clear(nameInput);
  userEvent.type(nameInput, "Bill");

  const ageInput = await screen.findByDisplayValue("43");
  userEvent.clear(ageInput);
  userEvent.type(ageInput, "77");

  const emailInput = await screen.findByDisplayValue("fred@fred.com");
  userEvent.clear(emailInput);
  userEvent.type(emailInput, "new@email.com");

  const saveBtn = await screen.findByTestId("saveBtn1");
  userEvent.click(saveBtn);

  await waitFor(() => {
    expect(screen.getByText("Bill")).toBeInTheDocument();
    expect(screen.getByText("77")).toBeInTheDocument();
    expect(screen.getByText("new@email.com")).toBeVisible();
  });
});

it("should cancel edits", async () => {
  render(<App />);
  const editBtn = screen.getByTestId("editBtn1");
  userEvent.click(editBtn);

  const nameText = await screen.findByDisplayValue("Fred");
  userEvent.clear(nameText);
  userEvent.type(nameText, "Jim");

  const ageText = await screen.findByDisplayValue("43");
  userEvent.clear(ageText);
  userEvent.type(ageText, "Bill");

  const emailText = await screen.findByDisplayValue("fred@fred.com");
  userEvent.clear(emailText);
  userEvent.type(emailText, "bill@bill.com");

  const cancelBtn = screen.getByTestId("cancelBtn1");
  userEvent.click(cancelBtn);

  await waitFor(() => {
    expect(screen.getByText("Fred")).toBeInTheDocument();
  });
});

it("shouldn't filter name when search matches assignedTo", () => {
  render(<App />);
  const searchTextBox = screen.getByPlaceholderText("Search Contacts");
  userEvent.type(searchTextBox, "Fred");
  const nameText = screen.getByText("Fred");
  expect(nameText).toBeInTheDocument();
});

it("should filter name when search doesn't match assignedTo", () => {
  render(<App />);
  const searchTextBox = screen.getByPlaceholderText("Search Contacts");
  userEvent.type(searchTextBox, "Mike");
  const nameText = screen.queryByText("Fred");
  expect(nameText).not.toBeInTheDocument();
});

it("shouldn't filter age when search matches assignedTo", () => {
  render(<App />);
  const searchTextBox = screen.getByPlaceholderText("Search Contacts");
  userEvent.type(searchTextBox, "43");
  const ageText = screen.getByText("43");
  expect(ageText).toBeInTheDocument();
});

it("should filter age when search doesn't match assignedTo", () => {
  render(<App />);
  const searchTextBox = screen.getByPlaceholderText("Search Contacts");
  userEvent.type(searchTextBox, "50");
  const ageText = screen.queryByText("43");
  expect(ageText).not.toBeInTheDocument();
});

it("shouldn't filter email when search matches assignedTo", () => {
  render(<App />);
  const searchTextBox = screen.getByPlaceholderText("Search Contacts");
  userEvent.type(searchTextBox, "fred@fred.com");
  const emailText = screen.getByText("fred@fred.com");
  expect(emailText).toBeInTheDocument();
});

it("should filter email when search doesn't match assignedTo", () => {
  render(<App />);
  const searchTextBox = screen.getByPlaceholderText("Search Contacts");
  userEvent.type(searchTextBox, "mike@mike.com");
  const emailText = screen.queryByText("fred@fred.com");
  expect(emailText).not.toBeInTheDocument();
});

it("should clear inputs after submit", async () => {
  render(<App />);
  const nameText = screen.getByPlaceholderText("Enter Name");
  userEvent.type(nameText, "Rob");

  const ageText = screen.getByPlaceholderText("Enter Age");
  userEvent.type(ageText, "65");

  const emailText = screen.getByPlaceholderText("Enter Email");
  userEvent.type(emailText, "rob@rob.com");

  const addClick = screen.getByRole("button", { name: "Add" });
  userEvent.click(addClick);

  await waitFor(() => {
    expect(nameText.value).toEqual("");
    expect(ageText.value).toEqual("");
    expect(emailText.value).toEqual("");
  });
});
