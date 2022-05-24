const NotificationError = ({ errorMessage }) => {
  const error = {
    color: "red",
    fontColor: "red",
    background: "lightgrey",
    padding: "10px",
    border: "3px solid red",
    fontSize: "30px",
    margin: "2rem 0 1rem 0",
  };
  if (errorMessage === null) {
    return null;
  }

  return <div style={error}>{errorMessage}</div>;
};

export default NotificationError;
