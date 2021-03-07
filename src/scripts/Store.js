import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null,
    };
  }

  get deals() {
    return this.filter();
  }

  filter() {
    const { deals, productFilters, providerFilter } = this.state;

    deals.map((deal) => {
      deal.newProductTypes = deal.productTypes
        .filter((productType) => productType !== "Phone")
        .map((productType) => {
          return productType === "Fibre Broadband"
            ? "Broadband".toLowerCase()
            : productType.toLowerCase();
        });
    });

    const listEquals = (listOne, listTwo) => {
      return (
        Array.isArray(listOne) &&
        Array.isArray(listTwo) &&
        listOne.length === listTwo.length &&
        listOne.sort().every((val, index) => val === listTwo.sort()[index])
      );
    };

    const filteredDeals = deals.filter(({ newProductTypes, provider }) => {
      return productFilters.length >= 1 && providerFilter
        ? listEquals(newProductTypes, productFilters) &&
            provider.id === providerFilter
        : listEquals(newProductTypes, productFilters) ||
            provider.id === providerFilter;
    });

    return productFilters.length === 0 && !providerFilter
      ? deals
      : filteredDeals;
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
