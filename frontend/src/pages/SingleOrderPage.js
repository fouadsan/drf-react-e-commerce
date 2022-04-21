import React, { useEffect } from "react";
import styled from "styled-components";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { getOrderDetail, payOrder } from "../store/actions/order";
import { Message, Loading } from "../components";

function SingleOrderPage() {
  const { id } = useParams();

  const {
    order_loading: loading,
    order_error: error,
    order,
  } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!order || order.id !== Number(id)) {
      dispatch(getOrderDetail(id));
    }
  }, [dispatch, order, id]);

  const handleMailto = (e, mailto) => {
    e.preventDefault();
    window.location.href = mailto;
  };

  const handleSuccessPayment = (data) => {
    dispatch(payOrder(id, data));
  };

  return loading ? (
    <Loading />
  ) : error.status ? (
    <Message type={"warning"} text={error.msg} />
  ) : order ? (
    <Wrapper>
      <div className="container page-100">
        {/* <h2>Order: {order.id}</h2> */}
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h3>Shipping</h3>
                <p>
                  <strong>Username: </strong>
                  {order.user.username}
                </p>
                <p>
                  <strong>Email: </strong>
                  <Link
                    to="#"
                    onClick={(e) =>
                      handleMailto(e, `mailto:${order.user.email}`)
                    }
                  >
                    {order.user.email}
                  </Link>
                </p>
                <p>
                  <strong>Shipping: </strong>
                  {order.shipping_address.address},{" "}
                  {order.shipping_address.city}
                  {"    "}
                  {order.shipping_address.postalCode},{" "}
                  {order.shipping_address.country}
                </p>
                {order.is_delivered ? (
                  <Message
                    type={"success"}
                    text={`Delivered on ${order.delivered_at}.`}
                  />
                ) : (
                  <Message type={"info"} text={"Not Delivered Yet."} />
                )}
              </li>
              <li className="list-group-item">
                <h3>Payment Method</h3>
                <p>
                  <strong>Method: </strong>
                  {order.payment_method}
                </p>
                {order.is_paid ? (
                  <Message
                    type={"success"}
                    text={`Paid on ${order.paid_at}.`}
                  />
                ) : (
                  <Message type={"info"} text={"Not Paid."} />
                )}
              </li>
              <li className="list-group-item">
                <h3>Order Items</h3>
                {order.order_items.length === 0 ? (
                  <Message type={"info"} text={"Order Is Empty"} />
                ) : (
                  <ul className="list-group list-group-flush">
                    {order.order_items.map((item, index) => {
                      const { id, name, image, quantity, price } = item;
                      return (
                        <li key={index} className="list-group-item">
                          <div className="row">
                            <div className="col-lg-1 col-md-2 col-2">
                              <img
                                src={image}
                                alt={name}
                                className="img-fluid rounded"
                              />
                            </div>
                            <div className="col-md-6 col-5">
                              <Link to={`/products/${id}`}>{name}</Link>
                            </div>
                            <div className="col-md-4 col-5">
                              {quantity} X ${price} = $
                              {(quantity * price).toFixed(2)}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card border-secondary mb-3">
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h3>Order Summary</h3>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Items Price:</div>
                      <div className="col">
                        ${Number(order.total_price).toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Shipping:</div>
                      <div className="col">${order.shipping_price}</div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Tax:</div>
                      <div className="col">${order.tax_price}</div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Total:</div>
                      <div className="col">${order.total_price}</div>
                    </div>
                  </li>
                  {!order.is_paid && (
                    <li className="list-group-item mt-2">
                      {loading ? (
                        <div className="row justify-content-center">
                          <Loading />
                        </div>
                      ) : (
                        <PayPalButtons
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: order.total_price,
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={(data, actions) => {
                            handleSuccessPayment(data);
                          }}
                        />
                      )}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  ) : null;
}

const Wrapper = styled.main`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default SingleOrderPage;
