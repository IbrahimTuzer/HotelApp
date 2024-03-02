import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Hotels from "./Hotels";
import { useNavigation } from "@react-navigation/native";

// Mocking the useNavigation hook
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe("Hotels Component Tests", () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    useNavigation.mockReturnValue(mockNavigation);
  });

  it("renders the Hotels component correctly", () => {
    const data = {
      name: "Hotel Name",
      mainImage: "https://example.com/hotel-image.jpg",
      address: "Example Address",
      rating: 4.5,
    };

    const { getByText } = render(<Hotels data={data} />);
    
    // Check if hotel name is rendered
    const hotelName = getByText("Hotel Name");
    expect(hotelName).toBeTruthy();

    // Check if address is rendered
    const hotelAddress = getByText("Example Address");
    expect(hotelAddress).toBeTruthy();

    // Check if rating is rendered
    const hotelRating = getByText("4.5");
    expect(hotelRating).toBeTruthy();
  });

  it("navigates to Detail page when pressed", () => {
    const data = {
      name: "Hotel Name",
      mainImage: "https://example.com/hotel-image.jpg",
      address: "Example Address",
      rating: 4.5,
    };

    const { getByTestId } = render(<Hotels data={data} />);
    
    // Find and press the component
    const hotelsComponent = getByTestId("hotels-component");
    fireEvent.press(hotelsComponent);

    // Check if navigation.navigate is called with the correct arguments
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Detail", { data });
  });
});
