import React, { useEffect, useRef, useState } from "react";

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const timeRef = useRef({});

  useEffect(() => {
    console.log(timeRef), [toasts];
  });

  const closeToast = (id) => {
    setToasts((prevToasts) => {
      clearTimeout(timeRef.current[id]);
      delete timeRef.current[id];
      const filterToast = prevToasts.filter((toast) => {
        return toast.id != id;
      });
      return filterToast;
    });
  };
  const showToast = (message, type) => {
    const id = new Date().getTime();
    const newToast = [...toasts, { id, message, type }];
    setToasts(newToast);
    timeRef.current[id] = setTimeout(() => {
      closeToast(id);
    }, 5000);
  };
  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map((toast) => {
          return (
            <div className={`toast ${toast.type}`} key={toast.id}>
              {toast.message}
              <span onClick={() => closeToast(toast.id)}>&times;</span>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <button
          className="success"
          onClick={() => showToast(" this is a Success message", "success")}>
          Success
        </button>
        <button
          onClick={() => showToast(" this is a warning message", "warning")}
          className="warning">
          Warning
        </button>
        <button
          onClick={() => showToast(" this is a info message", "info")}
          className="info">
          Info
        </button>
        <button
          onClick={() => showToast(" this is a danger message", "danger")}
          className="danger">
          Danger
        </button>
      </div>
    </div>
  );
};

export default ToastContainer;
