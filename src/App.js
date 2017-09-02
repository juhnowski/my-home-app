import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
        temperature : {
            now: 0,
            start: 22,
            stop: 28,
        },
        contur1: "Выкл.",
        contur2: "Выкл.",
        timer : {
          now: "12:00",
          start: "19:00",
          stop: "9:00",
        },
        switched: "Выкл.",
      };

  }

  componentDidMount(){
    fetch('http://192.168.0.149:4567/state')
    .then(results => {
      return results.json();
    })
    .then(data => {
      console.log(data);
      if (data.contur1) {
        data.contur1 = "Вкл."
      } else {
        data.contur1 = "Выкл."
      }
      if (data.contur2) {
        data.contur2 = "Вкл."
      } else {
        data.contur2 = "Выкл."
      }
      if (data.switched) {
        data.switched = "Вкл."
      } else {
        data.switched = "Выкл."
      }
      this.setState(data)
    })
  }



  render() {
    return (


      <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Мой дом</h2>
            </div>
            <p className="App-intro">
              Электрокотел:
            </p>
            <table>
            <tbody>
              <tr>
                <th>Параметр</th>
                <th>Значение</th>
                <th>Управление</th>
              </tr>
              <tr>
                <td>Температура</td>
                <td >{this.state.temperature.now}</td>
              </tr>
              <tr>
                <td>Включать при температуре</td>
                <td onClick={onItemClick}>{this.state.temperature.start}</td>
                <td>
                    <input type="submit" value="+" onClick={onButtonClick}></input>
                </td>
              </tr>
              <tr>
                <td>Выключать при температуре</td>
                <td onClick={onItemClick}>{this.state.temperature.stop}</td>
              </tr>
              <tr>
                <td>1-контур</td>
                <td onClick={onItemClick}>{this.state.contur1}</td>
              </tr>
              <tr>
                <td>2-контур</td>
                <td onClick={onItemClick}>{this.state.contur2}</td>
              </tr>
              <tr>
                <td>Время</td>
                <td>{this.state.timer.now}</td>
              </tr>
              <tr>
                <td>Начало</td>
                <td onClick={onItemClick}>{this.state.timer.start}</td>
              </tr>
              <tr>
                <td>Окончание</td>
                <td onClick={onItemClick}>{this.state.timer.stop}</td>
              </tr>
              <tr>
                <td>Включено</td>
                <td onClick={onItemClick}>{this.state.switched}</td>
              </tr>
              </tbody>
            </table>
          </div>
        );

  }
}

var onItemClick = function (event) {
    if (target == 0) {
      target = event.currentTarget;
    } else {
      target.style.backgroundColor = '#ffffff';
      target = event.currentTarget;
    }

    event.currentTarget.style.backgroundColor = '#ccc';
    console.log(event.currentTarget);

}

var onButtonClick = function (event) {
  fetch("http://192.168.0.149:4567/temperature/start",
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify({a: 1, b: 2})
})
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) })
}

var target = 0;
export default App;
