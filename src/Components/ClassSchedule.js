import { Button } from "bootstrap";
import React, { useState, Component, useEffect } from "react";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";
import Cart from "./Cart";
import { useHistory } from "react-router-dom";

const ClassSchedule = () => {
  let history = useHistory();
  const [seconds, setSeconds] = useState(60);
  const [data, setData] = useState([]);
  const [cartData, setCart] = useState([]);
  const [date, setDate] = useState(dayjs(new Date()).format("DD MMM YYYY"));

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getMondays() {
    var d = new Date(dayjs().add(1, "month"));
    var month = d.getMonth();
    var mondays = [];

    d.setDate(1);
    console.log(month);
    // Get the first Monday in the month
    while (d.getDay() !== 1) {
      d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month || d.getMonth() === month + 1) {
      mondays.push(dayjs(new Date(d.getTime())).format("ddd MMM DD YYYY"));
      d.setDate(d.getDate() + 7);
    }

    return mondays;
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds("BOOOOM!");
    }
  }, [seconds]);

  useEffect(() => {
    // var noofseats = [];
    // for (let i = 0; i < getMondays().length; i++) {
    //   noofseats.push(randomIntFromInterval(5, 15));
    // }
    // let zerorow1 = randomIntFromInterval(0, 7);
    // noofseats[zerorow1] = 0;
    // noofseats[zerorow1 + 1] = 0;
    let zerorow1 = randomIntFromInterval(0, 7);
    let temp = {},
      tempData = [];
    getMondays().map((item, index) => {
      temp.cartcount = 0;

      if (index === zerorow1 || index === zerorow1 + 1) {
        temp.seat = 0;
      } else {
        temp.seat = randomIntFromInterval(5, 15);
      }

      temp.date = item;
      // temp.seat = noofseats;
      temp.course = "Python";
      temp.time = "04:00pm-05:00pm";
      temp.booked = false;
      temp.id = randomIntFromInterval(10000, 99999);
      tempData.push(temp);
      temp = {};
    });
    console.log(tempData);
    setData(tempData);
  }, []);

  const bookclassfunc = (id, ky) => {
    // console.log(data);
    // console.log(data.find((item) => item.id === id));

    let index = data.findIndex((item) => item.id === id);
    data[index].booked = true;
    data[index].seat = data[index].seat - 1;
    cartData.push(data[index]);
    setCart([...cartData]);
    setData([...data]);
    console.log(cartData);
  };

  const cartdisplay = () => {
    history.push("/cart", { cartData: cartData });
  };
  console.log(data.freeseats);
  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex justify-content-end mt-5 mr-5 d-inline"
        onClick={() => cartdisplay()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          class="bi bi-cart-check-fill"
          viewBox="0 0 16 16"
        >
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z" />
        </svg>
        <span class="badge alert-success" id="lblCartCount">
          {cartData.length}
        </span>
      </div>

      <div
        style={{ display: cartData.length >= 3 ? "block" : "none" }}
        class="alert alert-warning"
        role="alert"
      >
        This is a warning alert—you reacged the limit 3!
      </div>
      <h5>Time Left:{seconds} Seconds</h5>
      <h2>Claim Your Free Trial Class</h2>
      <h3 className="d-inline">Class Schedule</h3>
      <h4 className="d-flex justify-content-end">
        Free Seats Left :{data[0]?.freeseats}
      </h4>
      <Table striped bordered hover variant="white" size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>

            <th>Date</th>
            <th>Time</th>
            <th>Availability</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, ky) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>Python</td>

                <td>{item.date.toString()}</td>
                <td>{item?.time}</td>
                <td>{item?.seat}seats available</td>

                <td>
                  <button
                    disabled={
                      item.seat === 0 ||
                      cartData.length >= 3 ||
                      item.booked === true
                        ? true
                        : false
                    }
                    onClick={() => bookclassfunc(item.id, ky)}
                  >
                    {item.seat[ky] === 0
                      ? "full"
                      : item.booked
                      ? "booked"
                      : "book now"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ClassSchedule;
