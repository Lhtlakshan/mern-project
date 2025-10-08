import React, { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increase":
      return { count: state.count + 1};
    case "decrease":
      return {count: state.count - 1}
  }
};

const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increaseCount = () => {
    dispatch({ type: "increase" });
  };

  const decreaseCount = () => {
    dispatch({ type: "decrease" });
  };

  return <div>UseReducer</div>;
};

export default UseReducer;
