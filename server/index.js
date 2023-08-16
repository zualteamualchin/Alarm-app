//IMPORT MONGOOSE EXPRESS AND CORS FOR USE
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Alarm = require("./source/Tables");

//NOW CREATE EXPRESS APP
const app = express();

//LET's USE CORS INSIDE THE EXPRESS
app.use(cors());

//USE JSON TO EXPRESS TO PARSE JSON REQUESTS
app.use(express.json());

//CONNECTION TO MONGODB...
mongoose.connect(
  "mongodb+srv://zualteamualchin:lalhmangaihzuala@cluster0.d53vy6a.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Save to connection log...
const connection = mongoose.connection;

//Setting up event listener for Database connection.

//Whenever there is an error in connecting the database, it will perform the second parameter
connection.on(
  "error",
  console.error.bind(console, "MongDB connection error : ")
);

//Success when Database is connected
connection.once("connecting", () => {
  console.log("Connection successfully established....");
});

//Fetching data
app.get("/get", async (req, res) => {
  try {
    const alarmsList = await Alarm.find();
    console.log(alarmsList);
    res.json(alarmsList);
  } catch (err) {
    console.error("error in fetching data : ", err);
    res.status(500).json({ err: "An error had occured" });
  }
});

//Deleting data alarms
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Alarm.findByIdAndDelete(id);
    res.json("Deleted!");
  } catch (err) {
    console.error("Error : ", err);
    res.status(500).json({ err: "Error" });
  }
});

//Update the data...
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const onOff = req.body.onOff;
  try {
    await Alarm.findOneAndUpdate({ _id: id }, { OnOff: onOff });
    res.json("Updated");
  } catch (err) {
    console.error("erroor : ", err);
  }
});

//Importing DB table and initiate
app.post("/add", async (req, res) => {
  const time = req.body.time;
  const onOff = req.body.onOff;
  console.log(time, onOff);
  const alarm = new Alarm({ time: time, OnOff: onOff });

  try {
    await alarm.save();
    res.send("SUCKS");
    console.log("YESH");
  } catch (err) {
    console.log(err);
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
