import React from "react";

class Input extends React.Component {
  render() {
    console.log("-->> RENDER INPUT");
    return (
      <input
        placeholder="Enter text.."
        ref={this.props.forwardedRef}
        value={this.props.input}
        onChange={(e) => this.props.onInputChange(e)}
      />
    );
  }
}

export default Input;
