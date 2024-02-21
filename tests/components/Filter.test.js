import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Filter from "../../src/components/Filter.js";

describe("Filter Component Tests", () => {
  const mockDistricts = ["District1", "District2", "District3"];

  it("renders correctly", () => {
    const { toJSON } = render(<Filter districts={mockDistricts} onSelectDistrict={() => {}} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the correct number of Pressable elements", () => {
    const { getAllByTestId } = render(<Filter districts={mockDistricts} onSelectDistrict={() => {}} />);
    const pressableElements = getAllByTestId("pressable-element");
    expect(pressableElements).toHaveLength(mockDistricts.length);
  });

  it("calls onSelectDistrict with the correct district when Pressable is pressed", () => {
    const onSelectDistrictMock = jest.fn();
    const { getByText } = render(<Filter districts={mockDistricts} onSelectDistrict={onSelectDistrictMock} />);

    mockDistricts.forEach((district) => {
      const pressableElement = getByText(district);
      fireEvent.press(pressableElement);
      expect(onSelectDistrictMock).toHaveBeenCalledWith(district);
    });
  });
});
