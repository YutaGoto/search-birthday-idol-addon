import SparqlClient from 'sparql-http-client'

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

      const client = new SparqlClient({endpointUrl: 'https://sparql.crssnky.xyz/spql/imas/query'})

      const query = `
      PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX schema: <http://schema.org/>

      SELECT DISTINCT ?birthDate ?name
      WHERE {
        ?s rdfs:label ?name;
          rdf:type ?type;
          imas:nameKana|imas:alternateNameKana ?kana;
          schema:birthDate ?birthDate .
          FILTER (regex(str(?type), 'Idol$|Staff$')).
          FILTER (str(?birthDate) = '--${e.target.value}')
      }
      ORDER BY ?birthDate
      `

      const stream = client.query.select(query)
      const data = []

      await new Promise((resolve, _reject) => {
        stream.on('data', (row) => {
          data.push(row)
          resolve(data)
        })
      })

      data.forEach((idol) => {
        const content = document.createElement("p");
        content.textContent = idol.name.value;
        results.appendChild(content);
      });
    }
  });
});
