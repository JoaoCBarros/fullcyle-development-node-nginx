const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql2");

app.get("/", async (req, res) => {
  const connection = mysql.createConnection(config);
  connection.query(
    "CREATE TABLE if not exists people (id int not null auto_increment, name VARCHAR(255), primary key(id));",
    (err, response) => {
      connection.query(
        "INSERT INTO people(name) values('Joao Barros')",
        (err, response) => {
          connection.query("SELECT * FROM people", (err, response) => {
            const html = `
            <h1>FullCycless</h1>
            <ul>
            ${response.reduce((acc, cur) => {
              return (acc += `<li>${cur.name}</li>`);
            }, "")}
            </ul>
          `;
            connection.end();
            res.send(html);
          });
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
