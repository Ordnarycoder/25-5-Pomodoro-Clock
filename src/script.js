const { Component } = React;
const { render } = ReactDOM;

class Pomodoro extends Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    timeLeft: 25 * 60, 
    timerLabel: 'Session',
    isRunning: false,
    intervalId: null,
  };

  handleBreakDecrement = () => {
    if (this.state.breakLength > 1) {
      this.setState(prevState => ({
        breakLength: prevState.breakLength - 1,
        
        timeLeft: !prevState.isRunning && prevState.timerLabel === 'Break' ? (prevState.breakLength - 1) * 60 : prevState.timeLeft
      }));
    }
  };

  handleBreakIncrement = () => {
    if (this.state.breakLength < 60) {
      this.setState(prevState => ({
        breakLength: prevState.breakLength + 1,
        
        timeLeft: !prevState.isRunning && prevState.timerLabel === 'Break' ? (prevState.breakLength + 1) * 60 : prevState.timeLeft
      }));
    }
  };

  handleSessionDecrement = () => {
    if (this.state.sessionLength > 1) {
      this.setState(prevState => ({
        sessionLength: prevState.sessionLength - 1,
        
        timeLeft: !prevState.isRunning && prevState.timerLabel === 'Session' ? (prevState.sessionLength - 1) * 60 : prevState.timeLeft
      }));
    }
  };

  handleSessionIncrement = () => {
    if (this.state.sessionLength < 60) {
      this.setState(prevState => ({
        sessionLength: prevState.sessionLength + 1,
        
        timeLeft: !prevState.isRunning && prevState.timerLabel === 'Session' ? (prevState.sessionLength + 1) * 60 : prevState.timeLeft
      }));
    }
  };

  handleStartStop = () => {
    if (this.state.isRunning) {
      clearInterval(this.state.intervalId);
      this.setState({ isRunning: false, intervalId: null });
    } else {
      const intervalId = setInterval(this.tick, 1000);
      this.setState({ isRunning: true, intervalId });
    }
  };

  handleReset = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      timerLabel: 'Session',
      isRunning: false,
      intervalId: null,
    });
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
  };

  tick = () => {
    this.setState(prevState => {
      if (prevState.timeLeft <= 0) {
        this.playSound();
        const newLabel = prevState.timerLabel === 'Session' ? 'Break' : 'Session';
        const newLength = newLabel === 'Session' ? prevState.sessionLength : prevState.breakLength;
        return {
          timerLabel: newLabel,
          timeLeft: newLength * 60,
        };
      }
      return { timeLeft: prevState.timeLeft - 1 };
    });
  };

  playSound = () => {
    const beep = document.getElementById('beep');
    beep.currentTime = 0; 
    beep.play(); 
  };

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  render() {
    return (
      <div id="pomodoro">
        <div id="break-label">Break Length</div>
        <button id="break-decrement" onClick={this.handleBreakDecrement}>-</button>
        <span id="break-length">{this.state.breakLength}</span>
        <button id="break-increment" onClick={this.handleBreakIncrement}>+</button>

        <div id="session-label">Session Length</div>
        <button id="session-decrement" onClick={this.handleSessionDecrement}>-</button>
        <span id="session-length">{this.state.sessionLength}</span>
        <button id="session-increment" onClick={this.handleSessionIncrement}>+</button>

        <div id="timer-label">{this.state.timerLabel}</div>
        <div id="time-left">{this.formatTime(this.state.timeLeft)}</div>

        <button id="start_stop" onClick={this.handleStartStop}>
          {this.state.isRunning ? 'Pause' : 'Start'}
        </button>
        <button id="reset" onClick={this.handleReset}>Reset</button>
        
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    );
  }
}

render(<Pomodoro />, document.getElementById('pomodoro'));
