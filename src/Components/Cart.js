import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button } from "bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Cart = () => {
  let history = useHistory();
  const [cartData2, setData] = useState([]);

  useEffect(() => {
    let cartArray = history.location.state.cartData;
    setData(cartArray);
    console.log(cartArray);
    console.log(cartData2);
  }, []);

  const cancelfunc = (id, ky) => {
    let index = cartData2.findIndex((item) => item.id === id);

    let cartData3 = cartData2.filter((item) => item !== cartData2[index]);
    setData([cartData3]);
    console.log(cartData2);
  };

  return (
    <div className="d-flex flex-column">
      <h3 className="d-inline">Cart</h3>

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
          {cartData2?.map((item, ky) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>Python</td>

                <td>{item?.date?.toString()}</td>
                <td>{item?.time}</td>
                <td>{item?.seat}seats available</td>

                <td>
                  <button onClick={() => cancelfunc(item.id, ky)}>
                    cancel
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

export default Cart;
