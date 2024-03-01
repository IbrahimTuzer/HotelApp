import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Profile from "./Profile";
import { useDispatch } from "react-redux";

// Mocking the useSelector and useDispatch hooks
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();

describe("Profile Page Tests", () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    useDispatch.mockReturnValue(mockDispatch);
  });

  it("renders the Profile page correctly when user is logged in", () => {
    const mockUser = { email: "test@example.com" };
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ user: mockUser });

    const { getByText, getByTestId } = render(<Profile />);

    // Check if user email is rendered
    const userEmailText = getByText("E-Posta: test@example.com");
    expect(userEmailText).toBeTruthy();

    // Check if "Çıkış Yap" button is rendered
    const logoutButton = getByTestId("logout-button");
    expect(logoutButton).toBeTruthy();
  });

  it("renders the Profile page correctly when user is not logged in", () => {
    useSelector.mockReturnValue({ user: null });

    const { getByText, getByTestId } = render(<Profile />);

    // Check if "Kullanıcı giriş yapmadı." text is rendered
    const notLoggedInText = getByText("Kullanıcı giriş yapmadı.");
    expect(notLoggedInText).toBeTruthy();

    // Check if "Çıkış Yap" button is not rendered
    const logoutButton = getByTestId("logout-button");
    expect(logoutButton).toBeNull();
  });

  it("dispatches the logout action when the 'Çıkış Yap' button is pressed", () => {
    const mockUser = { email: "test@example.com" };
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ user: mockUser });

    const { getByTestId } = render(<Profile />);

    // Find and press the "Çıkış Yap" button
    const logoutButton = getByTestId("logout-button");
    fireEvent.press(logoutButton);

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(logout());
  });
});
