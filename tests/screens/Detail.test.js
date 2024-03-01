import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import Detail from "./Detail";

const mockRoute = {
  params: {
    data: {
      name: "Hotel Name",
      mainImage: "https://example.com/hotel-image.jpg",
      district: "Example District",
      rating: 4.5,
      rooms: [
        { id: 1, name: "Room 1", price: 100 },
        { id: 2, name: "Room 2", price: 150 },
      ],
      roomsImage: ["https://example.com/room1-image.jpg", "https://example.com/room2-image.jpg"],
      roomsPrices: [100, 150],
      roomsStatement: ["Room 1 statement", "Room 2 statement"],
    },
  },
};

describe("Detail Page Tests", () => {
  it("renders the Detail page correctly", async () => {
    const { getByText, getByTestId } = render(<Detail route={mockRoute} />);

    // Check if hotel name is rendered
    const hotelName = getByText("Hotel Name");
    expect(hotelName).toBeTruthy();

    // Check if back button is rendered
    const backButton = getByTestId("back-button");
    expect(backButton).toBeTruthy();
  });

  it("navigates to HomePage when the back button is pressed", async () => {
    const { getByTestId } = render(<Detail route={mockRoute} navigation={{ navigate: jest.fn() }} />);

    // Find and press the back button
    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);

    // Wait for the navigation to be called
    await waitFor(() => {
      expect(mockRoute.navigation.navigate).toHaveBeenCalledWith("HomePage");
    });
  });
});
