import React from 'react';

class Timer extends React.Component{

constructor(){
    super();
    this.state = {
        timeInp: undefined,
        tickerMSTotal: '',
        timeHolder: '',

    }
}

handlingChange = (e) => {
this.setState({
    [e.target.name]: e.target.value
})
}

timeSubmit = (e) => {
    e.preventDefault()
    this.timecalc(this.state.timeInp)
    this.setState({
        timeHolder: this.state.timeInp,
        timeInp: ''

    })
}

// countDown = (timeInput) => {
//     if (timeInput <= 2){

//     }
// }

timecalc = (timeInp) => {
    let min, secs, hrs, days, total;
    secs = parseInt(timeInp.slice(-2)) * 1000
    
        if(timeInp.length < 3){
            total = parseInt(timeInp) * 1000;
            return this.setState({tickerMSTotal: total})
    }
    if( timeInp.length >= 3 && timeInp.length < 5 ){
        if(timeInp.length >3){
            min = parseInt(timeInp.slice(0,2)) * 60000
        } else {
            min = parseInt(timeInp.slice(0,1)) * 60000
           }
        total = min + secs
        return this.setState({tickerMSTotal: total})
      }
    if(timeInp.length >= 5 && timeInp.length < 7){
        if(timeInp.length >5){
            hrs = parseInt(timeInp.slice(0,2)) * 3600000
            min = parseInt(timeInp.slice(2,4)) * 60000
            console.log(hrs, min)
        } else {
            hrs = parseInt(timeInp.slice(0,1)) * 3600000
            min = parseInt(timeInp.slice(1,3)) * 60000
            console.log(hrs,min)
         }
        total = hrs + min + secs
        this.setState({tickerMSTotal: total})
      } 
    }

    formatter = (milliseconds)=> {
         if ((parseInt(milliseconds)/60000)<1) {
            //console.log(`${(parseInt(milliseconds)/1000) }`)
              return `${(parseInt(milliseconds)/1000) + ' Seconds'}`
           }
         if (24>=(parseInt(milliseconds)/3600000)>=1) {
               let hrs = parseInt(milliseconds/3600000)
               let remainder = parseInt(milliseconds)%3600000 
                 return hrs + ' Hours ' + this.minutes(remainder)
               //console.log(remainder)
            }
         if((parseInt(milliseconds)/(24*3600000))>=1){
                let days = parseInt(milliseconds/(24*3600000))
                let remainder = parseInt(milliseconds)%(24*3600000)
                  if (remainder > 3600000){
                    let hrs = parseInt(remainder/3600000)
                    let minSecs = parseInt(remainder)%3600000
                      return days + ' Days ' + hrs + ' Hours ' + this.minutes(minSecs)
                   }
                      return days + ' Days ' + this.minutes(remainder)
                } else {
                return this.minutes(milliseconds)
            }
        }

        minutes = (millis)  => {
            let min = parseInt(millis/60000)
            let secs = min >=1 ? parseInt(millis%60000)/1000 : parseInt(millis/1000)
               if (min >= 1){
                 return `${ min + ' Minutes ' + secs + ' Seconds.'}`
                } else {
                return `${secs + ' Seconds.'}`
               }
            }

    componentWillUnmount() {
        this.cleanUpInterval()
      }
      
      componentDidMount() {
        this.startTicker()
      }
      
    
      startTicker = () => {
        this.interval = setInterval(this.ticker, 1000);
      }
    
      cleanUpInterval = () => {
        clearInterval(this.interval);
      }


    ticker = () => {
        let stateInt = parseInt(this.state.tickerMSTotal)
        let newInt = (stateInt - 1000).toString()
            if(parseInt(this.state.tickerMSTotal) > 0 ){
             return this.setState({tickerMSTotal: newInt }) 
          }         
       }


render(){


    return(
        <div style={{backgroundColor:'gray'}}>
            <br></br>
            <form onSubmit={this.timeSubmit}>
                <label style={{color:'beige', fontWeight:'bolder'}}>Enter any Time HHMMSS </label>
                <input type="text" name="timeInp" value={this.state.timeInp} onChange={this.handlingChange} />
                <input type="submit" name="Start Timer" value="Start Timer!"/>
            </form><br></br>
            {/* {this.state.tickerMSTotal ? this.startTicker():''} */}
            {this.state.tickerMSTotal && <span style={{color:'white', textDecoration:'underline' }}>Time Remaining:</span>}{" "}
            {this.state.tickerMSTotal  && <span style={{color:'burlywood', fontWeight: 'bolder'}}>{this.formatter(this.state.tickerMSTotal)}</span>}
        </div>
    )
  }
 }



export default Timer
