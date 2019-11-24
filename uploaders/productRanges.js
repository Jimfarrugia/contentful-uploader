const parse = require("csv-parse");
const assert = require("assert");

const uploadProductRanges = (contentfulClient, csv) => {
  parse(csv, { columns: true }, (err, output) => {
    // test the first row
    assert.deepEqual(
      [output[0]],
      [
        {
          id: "1",
          range: "Linea Weatherboard",
          type: "",
          name: "Linea",
          descriptor: "Weatherboard",
          headline: "A deep shadow weatherboard for contemporary homes.",
          description:
            "The clean horizontal lines of Linea™ weatherboards work beautifully on the expansive external walls of modern architecture. Ideal for creating a Hamptons or coastal inspired look when combined with contrasting Axent Trims in new homes or renovations, Linea can also be confidently painted in dark colours. Innovative and durable, Linea weatherboards are resistant to shrinking, swelling and cracking and will hold paint longer than wood. Featuring the distinctive charm of a deep shadow weatherboard without the maintenance of timber, the unmatched thickness for fibre cement weatherboards of 16mm which also enable handy tongue and groove short ends for clean butt joins even off-stud.",
          proposition_headline: "Features & Benefits",
          seo_title: "Linea Weatherboard",
          seo_description: "",
          fc_fire_resistance: "",
          fc_mositure_resistance: "",
          fc_termite_resistance: "",
          slug: "scyon-linea-weatherboard"
        }
      ]
    );
  
    // test the number of records (39 in product_range)
    assert.deepEqual(output.length, 39);
  
    // connect to contentful
    contentfulClient
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then(space => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID))
      .then(environment => {
        output.forEach((item, index) => {
          //if (index < 1) {
            environment
              .createEntry("productRange", {
                fields: {
                  range: {
                    "en-GB": item.range
                  },
                  name: {
                    "en-GB": item.name
                  },
                  descriptor: {
                    "en-GB": item.descriptor
                  },
                  headline: {
                    "en-GB": item.headline
                  },
                  description: {
                    "en-GB": item.description
                  },
                  propositionHeadline: {
                    "en-GB": item.proposition_headline
                  },
                  seoTitle: {
                    "en-GB": item.seo_title
                  }
                }
              })
              .then(entry =>
                console.log(`*** Added product_range ${item.id}: `, entry.fields.range["en-GB"])
              );
          //}
        });
      })
      .catch(console.error);
  });
}

module.exports = uploadProductRanges;