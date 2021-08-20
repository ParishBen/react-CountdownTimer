import logo from './logo.svg';
import './App.css';
import Timer from './countdown';
import CountDownTimer from './variationToTimer';
function App() {
  const hoursMinSecs = {hours:0, minutes: 10, seconds: 40}

  return (
    <div className="App" style={{width:'100%', height:'100%'}} >
      
      <Timer />
      <CountDownTimer anytime={hoursMinSecs} />
    </div>
  );
}

export default App;
