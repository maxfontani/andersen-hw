import React from "react";
import "./App.css";
import Input from "./Input";

const InputRefFwd = React.forwardRef((props, ref) => {
  return <Input {...props} forwardedRef={ref} />;
});

class App extends React.Component {
  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFocusBtnClick = this.onFocusBtnClick.bind(this);

    this.inputRef = React.createRef(null);

    this.state = {
      input: "",
      isDisabled: false,
    };

    this.reg = new RegExp(/реакт/);
  }

  onSubmitForm(e) {
    e.preventDefault();
  }

  onInputChange(e) {
    this.setState({ input: e.target.value });
    if (this.reg.test(e.target.value)) {
      this.setState({ isDisabled: true });
      return;
    }
    this.setState({ isDisabled: false });
  }

  onFocusBtnClick() {
    this.inputRef.current?.focus();
  }

  componentDidMount() {
    console.log("--> DID MOUNT");
    this.onFocusBtnClick();
  }

  static getDerivedStateFromProps(props, state) {
    console.log("--> GET DER STATE FROM PROPS");
    console.log(props);
    console.log(state);
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("--> SHOULD COMP UPDATE");
    console.log(nextProps);
    console.log(nextState);
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("--> GET SNAPSHOT B4 UPD");
    console.log(prevProps);
    console.log(prevState);
    return { value: 42 };
  }

  componentDidUpdate(...args) {
    console.log("--> DID UPDATE");
    console.log("SNAP", args[2]);
  }

  componentWillUnmount() {
    window.alert("--> WILL UNMOUNT");
  }

  componentDidCatch(err, msg) {
    console.log("--> DID CATCH");
    console.log(err);
    console.log(msg);
  }

  render() {
    console.log("--> RENDER");

    return (
      <div className="appOuter">
        <form id="app-form" onSubmit={this.onSubmitForm}>
          <InputRefFwd
            ref={this.inputRef}
            onInputChange={this.onInputChange}
            input={this.state.input}
          />
          <div>
            <button type="submit" disabled={this.state.isDisabled}>
              Submit
            </button>
            <button type="button" onClick={this.onFocusBtnClick}>
              Focus input
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
