class Product {
  constructor(
    id,
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    rating,
    numReviews
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.brand = brand;
    this.category = category;
    this.price = price;
    this.countInStock = countInStock;
    this.rating = rating;
    this.numReviews = numReviews;
  }
}

export { Product };
