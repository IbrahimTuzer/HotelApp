import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginPage from "./LoginPage";
import { useDispatch } from "react-redux";

// Mocking the useDispatch hook
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();

describe("LoginPage Tests", () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    useDispatch.mockReturnValue(mockDispatch);
  });

  it("renders the LoginPage correctly", () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage />);
    
    // Check if email input is rendered
    const emailInput = getByPlaceholderText("E-posta");
    expect(emailInput).toBeTruthy();

    // Check if password input is rendered
    const passwordInput = getByPlaceholderText("Şifre");
    expect(passwordInput).toBeTruthy();

    // Check if "Giriş yap" button is rendered
    const loginButton = getByText("Giriş yap");
    expect(loginButton).toBeTruthy();
  });

  it("dispatches the login action when the 'Giriş yap' button is pressed", () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage />);
    
    // Find and fill the email and password inputs
    const emailInput = getByPlaceholderText("E-posta");
    const passwordInput = getByPlaceholderText("Şifre");
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password");

    // Find and press the "Giriş yap" button
    const loginButton = getByText("Giriş yap");
    fireEvent.press(loginButton);

    // Check if dispatch is called with the correct arguments
    expect(mockDispatch).toHaveBeenCalledWith(login({ email: "test@example.com", password: "password" }));
  });
});
