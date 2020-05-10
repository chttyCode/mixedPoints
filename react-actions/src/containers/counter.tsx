import React, { Component } from "react";
import actions from "../store/actions";
import { connect } from "react-redux";
import * as types from "../store/types";
class Counter extends Component<any, any> {
  render() {
    console.log(this.props);
    return (
      <div>
        <p>counter:{this.props.number}</p>
        <button onClick={() => this.props.ADD(2)}>+</button>
        <button onClick={this.props.minus}>-</button>
      </div>
    );
  }
}
let mapStateToProps = (state: any) => {
  console.log(state);
  return { ...state };
};

export default connect(mapStateToProps, actions)(Counter);
