document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  const searchBirthday = document.getElementById("search");
  searchBirthday.focus();

  searchBirthday.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      const results = document.getElementById("results");

      while (results.firstChild) {
        results.removeChild(results.firstChild);
      }
      const data = await fetch(
        `https://sparql.crssnky.xyz/spql/imas/query?output=json&query=PREFIX+imas%3A+%3Chttps%3A%2F%2Fsparql.crssnky.xyz%2Fimasrdf%2FURIs%2Fimas-schema.ttl%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0A%0ASELECT+DISTINCT+%3FbirthDate+%3Fname%0AWHERE+%7B%0A++%3Fs+rdfs%3Alabel+%3Fname%3B%0A+++++rdf%3Atype+%3Ftype%3B%0A+++++imas%3AnameKana%7Cimas%3AalternateNameKana+%3Fkana%3B%0A+++++schema%3AbirthDate+%3FbirthDate+.%0A+++++FILTER+%28regex%28str%28%3Ftype%29%2C+%27Idol%24%7CStaff%24%27%29%29.%0A+++++FILTER+%28str%28%3FbirthDate%29+%3D+%27--${e.target.value}%27%29%0A%7D%0AORDER+BY+%3FbirthDate%0A`
      ).then((res) => res.json());

      data.results.bindings.forEach((idol) => {
        const content = document.createElement("p");
        content.textContent = idol.name.value;
        results.appendChild(content);
      });
    }
  });
});
