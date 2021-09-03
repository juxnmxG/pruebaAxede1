const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "prueba",
});

connection.connect();

// Obtener todos los hoteles

app.get("/", (req, res) => {
  connection.query("SELECT * FROM hoteles", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/getFromDate/:date", (req, res) => {
  const fecha = req.params.date;
  connection.query("SELECT * FROM hoteles WHERE fecha = ?", fecha, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

connection.post("/create", (req, res) => {
  const username = req.body.nombre;
  const date = req.body.date;
  const tipo = req.body.tipo;
  const nHabitaciones = req.body.habitaciones;
  const reserva = req.body.reserva;
  const disponibilidad = req.body.habitaciones;

  connection.query(
    "INSERT INTO hoteles (nombre, fecha, tipo, nHabitaciones, reserva, disponibilidad  ) VALUES (?,?,?)",
    [username, date, tipo, nHabitaciones, reserva, disponibilidad],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM hoteles WHERE id_hotel= ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
