import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  let sut;
  const BROADBAND = "Broadband";
  const MOBILE = "Mobile";
  const TV = "Tv";
  const SKY_ID = 1;
  const BT_ID = 3;

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
    sut.setProductFilter(BROADBAND);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toHaveLength(4);
  });

  it("should return 4 deals if filter by broadband and tv", () => {
    // Arrange
    sut.setProductFilter(BROADBAND);
    sut.setProductFilter(TV);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toHaveLength(4);
  });

  it("should return 1 deals if filter by broadband and mobile", () => {
    // Arrange
    sut.setProductFilter(BROADBAND);
    sut.setProductFilter(MOBILE);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toHaveLength(1);
  });

  it("should return 2 deals if filter by broadband, tv and mobile", () => {
    // Arrange
    sut.setProductFilter(BROADBAND);
    sut.setProductFilter(TV);
    sut.setProductFilter(MOBILE);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toHaveLength(2);
  });

  it("should return 1 deals if filter by Sky provider", () => {
    // Arrange
    sut.setProviderFilter(SKY_ID);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toHaveLength(1);
  });

  it("should return 2 deals if filter by BT, broadband and tv", () => {
    // Arrange
    sut.setProviderFilter(BT_ID);
    sut.setProductFilter(BROADBAND);
    sut.setProductFilter(TV);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toHaveLength(2);
  });
});
