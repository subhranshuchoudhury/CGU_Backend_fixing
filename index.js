require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const GeneralNotifications = [];
let webDATA = "...";

const app = express();
const PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});
app.listen(PORT, () => {
  console.log(`Working Fine on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send(
    "Hello <h1>I am Aditya Swayam Siddha</h1><br/><h2>Follow me on github</h2><br/><h4>https://github.com/TheCoderAdi</h4>"
  );
});

//General Notification Of  CGU

app.get("/gn", (req, res) => {
  res.send(GeneralNotifications);
});

// invoke

const options = {
  method: "GET",
};

const fetchWeb = async () => {
  await fetch(`https://cgu-odisha.ac.in/notices/`, options)
    .then((result) => {
      return result.text();
    })
    .then((content) => {
      webDATA = content;
      //   console.log(typeof content);
      const $ = cheerio.load(webDATA);
      for (let index = 1; index < 25; index++) {
        const notification = { _id: "", event: "", p_date: "" };
        notification._id = index;
        notification.event = $(`tr:nth-child(${index}) td:nth-child(2)`).text();
        notification.p_date = $(
          `tr:nth-child(${index}) td:nth-child(3)`
        ).text();
        GeneralNotifications.push(notification);
      }
      console.log("Data Loaded... 100%");
    })
    .catch((err) => {
      console.error(err);
    });
};
fetchWeb();

//Exam Notification of  CGU

app.get("/en", (req, res) => {
  //Url of CGU
  const url = "https://cgu-odisha.ac.in/examinations/";
  const scrapeExamNotification = async () => {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const examNotification = [];
      for (let index = 1; index < 25; index++) {
        const examNoti = { _id: "", event: "", p_date: "" };
        examNoti._id = index;
        examNoti.event = $(`tr:nth-child(${index}) td:nth-child(2)`).text();
        examNoti.p_date = $(`tr:nth-child(${index}) td:nth-child(3)`).text();
        examNotification.push(examNoti);
      }
      res.send(examNotification);
    } catch (error) {
      console.log(error);
    }
  };
  scrapeExamNotification();
});
