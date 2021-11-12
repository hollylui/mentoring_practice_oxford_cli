const axios = require("axios");
require("dotenv").config();

const { OXFORD_API_KEY: key, OXFORD_API_ID: id } = process.env;

const word = process.argv[2].toLowerCase();
const category = process.argv[3];

//! api url links ------------------------------------------
const entriesUrl = `https://od-api.oxforddictionaries.com:443/api/v2/entries/en-gb/`;
const optionUrl = `?fields=definitions&strictMatch=true`;
const catergoryUrl = `&lexicalCategory=`;

const finalUrl =
  category === undefined
    ? `${entriesUrl}${word}${optionUrl}`
    : `${entriesUrl}${word}${optionUrl}${catergoryUrl}${category.toLowerCase()}`;

//! API configuration ------------------------------------------
const config = {
  headers: {
    app_id: id,
    app_key: key,
  },
};

//! Function -----------------------------------------------
const dictionary = async () => {
  let response = await axios.get(finalUrl, config);

  let result = response.data.results[0].lexicalEntries[0].entries[0].senses;

  let definition = [];
  result.map((result) => definition.push(result.definitions));
  return definition;
};

dictionary()
  .then((definition) => console.log(definition))
  .catch((err) => console.log(err));
