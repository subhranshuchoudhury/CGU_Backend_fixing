require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

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
  //Url of CGU
  const url = "https://cgu-odisha.ac.in/notices/";
  const scrapeGeneralNotification = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(data);
      const $ = cheerio.load(data);
      const GeneralNotifications = [];
      for (let index = 1; index < 25; index++) {
        const notification = { _id: "", event: "", p_date: "" };
        notification._id = index;
        notification.event = $(`tr:nth-child(${index}) td:nth-child(2)`).text();
        notification.p_date = $(
          `tr:nth-child(${index}) td:nth-child(3)`
        ).text();
        GeneralNotifications.push(notification);
      }
      res.send(GeneralNotifications);
    } catch (error) {
      //   console.error(error);
      res.send(error);
    }
  };
  scrapeGeneralNotification();
});

app.get("/test", (req, res) => {
  const options = {
    method: "GET",
    headers: {
      accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53",
      "Accept-Language": "en-US,en;q=0.9,it;q=0.8,es;q=0.7",
      referer: "https://www.google.com/",
      cookie:
        "DSID=AAO-7r4OSkS76zbHUkiOpnI0kk-X19BLDFF53G8gbnd21VZV2iehu-w_2v14cxvRvrkd_NjIdBWX7wUiQ66f-D8kOkTKD1BhLVlqrFAaqDP3LodRK2I0NfrObmhV9HsedGE7-mQeJpwJifSxdchqf524IMh9piBflGqP0Lg0_xjGmLKEQ0F4Na6THgC06VhtUG5infEdqMQ9otlJENe3PmOQTC_UeTH5DnENYwWC8KXs-M4fWmDADmG414V0_X0TfjrYu01nDH2Dcf3TIOFbRDb993g8nOCswLMi92LwjoqhYnFdf1jzgK0",
    },
  };

  const fetchWeb = async () => {
    await fetch(`https://cgu-odisha.ac.in/notices/`, options)
      .then((result) => {
        return result.text();
      })
      .then((content) => {
        // console.log(content);
        const $ = cheerio.load(content);
        const GeneralNotifications = [];
        for (let index = 1; index < 25; index++) {
          const notification = { _id: "", event: "", p_date: "" };
          notification._id = index;
          notification.event = $(
            `tr:nth-child(${index}) td:nth-child(2)`
          ).text();
          notification.p_date = $(
            `tr:nth-child(${index}) td:nth-child(3)`
          ).text();
          GeneralNotifications.push(notification);
        }
        res.send(GeneralNotifications);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  fetchWeb();
});

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
