const Notification = ({ message }) => {
  const success = {
    color: "green",
    fontColor: "green",
    background: "lightgrey",
    padding: "10px",
    border: "3px solid green",
    fontSize: "30px",
    margin: "2rem 0 1rem 0",
  };
  if (message === null) {
    return null;
  }

  return <div style={success}>{message}</div>;
};

export default Notification;
