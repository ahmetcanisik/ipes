const { Ipes } = require("../dist/index.js");

(async () => {
    const ipes = new Ipes();
    console.log(await ipes.get_country_info());
})();
