import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  let sut;

  beforeEach(() => {
    // Arrange
    sut = new Store();
    sut.setDeals(mockData.deals);
  });

  it("should return all deals when no filters applied", () => {
    // Act
    const result = sut.deals;

    // Assert
    expect(result).toEqual(mockData.deals);
    expect(result).toHaveLength(11);
  });

  it("should return 4 deals if filter by broadband", () => {
    // Arrange
    sut.setProductFilter("broadband");

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toHaveLength(4);
  });

  it("should return 4 deals if filter by broadband and tv", () => {
    // Arrange
    sut.setProductFilter("broadband");
    sut.setProductFilter("tv");

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toHaveLength(4);
  });

  it("should return 1 deals if filter by broadband and mobile", () => {
    // Arrange
    sut.setProductFilter("broadband");
    sut.setProductFilter("mobile");

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toHaveLength(1);
  });

  it("should return 2 deals if filter by broadband, tv and mobile", () => {
    // Arrange
    sut.setProductFilter("broadband");
    sut.setProductFilter("tv");
    sut.setProductFilter("mobile");

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toHaveLength(2);
  });
});
