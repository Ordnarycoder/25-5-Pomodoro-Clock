function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const { Component } = React;
const { render } = ReactDOM;

class Pomodoro extends Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      timerLabel: 'Session',
      isRunning: false,
      intervalId: null });_defineProperty(this, "handleBreakDecrement",


    () => {
      if (this.state.breakLength > 1) {
        this.setState(prevState => ({
          breakLength: prevState.breakLength - 1,

          timeLeft: !prevState.isRunning && prevState.timerLabel === 'Break' ? (prevState.breakLength - 1) * 60 : prevState.timeLeft }));

      }
    });_defineProperty(this, "handleBreakIncrement",

    () => {
      if (this.state.breakLength < 60) {
        this.setState(prevState => ({
          breakLength: prevState.breakLength + 1,

          timeLeft: !prevState.isRunning && prevState.timerLabel === 'Break' ? (prevState.breakLength + 1) * 60 : prevState.timeLeft }));

      }
    });_defineProperty(this, "handleSessionDecrement",

    () => {
      if (this.state.sessionLength > 1) {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength - 1,

          timeLeft: !prevState.isRunning && prevState.timerLabel === 'Session' ? (prevState.sessionLength - 1) * 60 : prevState.timeLeft }));

      }
    });_defineProperty(this, "handleSessionIncrement",

    () => {
      if (this.state.sessionLength < 60) {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength + 1,

          timeLeft: !prevState.isRunning && prevState.timerLabel === 'Session' ? (prevState.sessionLength + 1) * 60 : prevState.timeLeft }));

      }
    });_defineProperty(this, "handleStartStop",

    () => {
      if (this.state.isRunning) {
        clearInterval(this.state.intervalId);
        this.setState({ isRunning: false, intervalId: null });
      } else {
        const intervalId = setInterval(this.tick, 1000);
        this.setState({ isRunning: true, intervalId });
      }
    });_defineProperty(this, "handleReset",

    () => {
      clearInterval(this.state.intervalId);
      this.setState({
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 25 * 60,
        timerLabel: 'Session',
        isRunning: false,
        intervalId: null });

      const beep = document.getElementById('beep');
      beep.pause();
      beep.currentTime = 0;
    });_defineProperty(this, "tick",

    () => {
      this.setState(prevState => {
        if (prevState.timeLeft <= 0) {
          this.playSound();
          const newLabel = prevState.timerLabel === 'Session' ? 'Break' : 'Session';
          const newLength = newLabel === 'Session' ? prevState.sessionLength : prevState.breakLength;
          return {
            timerLabel: newLabel,
            timeLeft: newLength * 60 };

        }
        return { timeLeft: prevState.timeLeft - 1 };
      });
    });_defineProperty(this, "playSound",

    () => {
      const beep = document.getElementById('beep');
      beep.currentTime = 0;
      beep.play();
    });_defineProperty(this, "formatTime",

    seconds => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    });}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "pomodoro" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("button", { id: "break-decrement", onClick: this.handleBreakDecrement }, "-"), /*#__PURE__*/
      React.createElement("span", { id: "break-length" }, this.state.breakLength), /*#__PURE__*/
      React.createElement("button", { id: "break-increment", onClick: this.handleBreakIncrement }, "+"), /*#__PURE__*/

      React.createElement("div", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("button", { id: "session-decrement", onClick: this.handleSessionDecrement }, "-"), /*#__PURE__*/
      React.createElement("span", { id: "session-length" }, this.state.sessionLength), /*#__PURE__*/
      React.createElement("button", { id: "session-increment", onClick: this.handleSessionIncrement }, "+"), /*#__PURE__*/

      React.createElement("div", { id: "timer-label" }, this.state.timerLabel), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, this.formatTime(this.state.timeLeft)), /*#__PURE__*/

      React.createElement("button", { id: "start_stop", onClick: this.handleStartStop },
      this.state.isRunning ? 'Pause' : 'Start'), /*#__PURE__*/

      React.createElement("button", { id: "reset", onClick: this.handleReset }, "Reset"), /*#__PURE__*/

      React.createElement("audio", { id: "beep", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));


  }}


render( /*#__PURE__*/React.createElement(Pomodoro, null), document.getElementById('pomodoro'));