require("dotenv").config();
const fs = require("fs");

const contentful = require("./connect");
const uploadProductRanges = require("./uploaders/productRanges");
const uploadProductAccessories = require("./uploaders/productAccessories");

const productRangeCSV = fs.readFileSync("./csv/product_range.csv", "utf8");
const productAccessoriesCSV = fs.readFileSync("./csv/product_accessory.csv", "utf8");

// * product ranges
// uploadProductRanges(contentful, productRangeCSV);

// * product accessories
uploadProductAccessories(contentful, productAccessoriesCSV);
