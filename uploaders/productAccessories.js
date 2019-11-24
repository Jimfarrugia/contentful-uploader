const parse = require("csv-parse");
const assert = require("assert");

const uploadProductAccessories = (contentfulClient, csv) => {
  parse(csv, { columns: true }, (err, output) => {
    // test the first row
    assert.deepEqual(
      [output[0]],
      [
        {
          id: "1",
          code: "305911",
          name: "HardieEdge Base Trim 3950mm",
          descriptor: "",
          package_quantity: "",
          headline: "",
          description: "A powder coated 3,950mm long Aluminium extrusion used on slab edges. Colour: 'Sable™ Brilliance' (dark grey).",
          seo_title: "",
          seo_description: "",
          image: "accessories-images/305911.png",
          slug: "hardieedge"
        }
      ]
    );
  
    // test the number of records (39 in product_range)
    // assert.deepEqual(output.length, 39);
  
    // connect to contentful
    contentfulClient
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then(space => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID))
      .then(environment => {
        output.forEach((item, index) => {
          //if (index < 1) {
            environment
              .createEntry("accessoriesTools", {
                fields: {
                  code: {
                    "en-GB": item.code
                  },
                  name: {
                    "en-GB": item.name
                  },
                  descriptor: {
                    "en-GB": item.descriptor
                  },
                  packageQuantity: {
                    "en-GB": item.package_quantity
                  },
                  description: {
                    "en-GB": item.description
                  },
                  slug: {
                    "en-GB": item.proposition_headline
                  }
                }
              })
              .then(entry =>
                console.log(`*** Added product accessory ${item.id}: `, entry.fields.name["en-GB"])
              );
          //}
        });
      })
      .catch(err => console.error(err));
  });
}

module.exports = uploadProductAccessories;