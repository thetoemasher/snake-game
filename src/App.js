import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    let map = []
    for(let i = 0; i < 25; i++) {
      let arr = []
      for(let f = 0; f < 25; f++) {
        // console.log('a')
        if(i === 0 || i === 24 || f === 0 || f === 24) {
          arr.push(1)
        } else if(i === 12 && f === 12) {
          arr.push(2)
        } else {
          arr.push(0)
        }
      }
      map.push(arr)
    }
    
    this.state = {
      map: map,
      head: [12, 12],
      dot: null,
      snake: [[12, 12]] ,
      direction: null,
    }
  }

  componentDidMount() {
    this.getDot()
  }

  componentDidUpdate(prevProps, prevState) {
    // let {direction} = this.state
    // let {handleKeyPress} = this
    if(prevState.dot) {
      if(this.state.dot[0] === 0 && this.state.dot[1] === 0) {
        this.getDot()
      }
    }
    // if(this.state.direction) {
    //   if(prevState.direction === this.state.direction) {
    //     setTimeout(function() {
    //       console.log(direction)
    //       handleKeyPress({key: direction})
    //     }, 1000)
    //   } else if (prevState.direction !== this.state.direction) {
    //     setTimeout(function() {
    //       console.log(direction)
    //       handleKeyPress({key: direction})
    //     }, 1000)
      // }
    // }
  }

  getDot = () => {
    let dot = []
    let map = this.state.map.slice()
    dot[0] = ~~(Math.random() * 24) + 1
    dot[1] = ~~(Math.random() * 24) + 1
    while (this.state.map[dot[0]][dot[1]] === 1 || this.state.map[dot[0]][dot[1]] === 2){
      dot[0] = ~~(Math.random() * 5) + 1
      dot[1] = ~~(Math.random() * 5) + 1
    }
    map[dot[0]][dot[1]] = 3
    this.setState({map, dot})
  }

  handleKeyPress = (e) => {
    if(/[wasd]/.test(e.key)){
      let head = this.state.head.slice()
      if(e.key === 'w') head[0]--
      if(e.key === 's') head[0]++
      if(e.key === 'a') head[1]--
      if(e.key === 'd') head[1]++
      let dot = this.state.dot.slice()
      let length = this.state.length
      let snake = this.state.snake.slice()
      let map = this.state.map.slice()
      if(head[0] === dot[0] && head[1] === dot[1]) {
        dot = [0, 0]
        length++
        snake.unshift(head)
      } else {
        snake.unshift(head)
        let tail = snake.pop(snake.length - 1)
        map[tail[0]][tail[1]]= 0
      }
      if(map[head[0]][head[1]] === 1 || map[head[0]][head[1]] === 2){
        alert("You Fail")
        window.location.reload()
      }
      map[head[0]][head[1]] = 2
      this.setState({head, map, dot, length, snake, direction: e.key})
    }
  }
  render() {
    let {direction} = this.state
    let {handleKeyPress} = this
    let map = this.state.map.map((r, f) => {
      // console.log(r)
      let row = r.map((c, i) => {
        if(c === 0) {
          return(
            <div className='cube' style={{backgroundColor: 'black'}} key={i}></div>
          )
        } else if(c === 2){
          return(
            <div className='cube' style={{backgroundColor: 'white'}} key={i}></div>
          )
        } else if(c === 3) {
            return(
              <div className='cube' style={{backgroundColor: 'red'}} key={i}></div>
            )
        }
      })
      return (
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}} key={f}>
          {row}
        </div>
      )
    })
    return (
      <div onKeyDown={this.handleKeyPress} style={{backgroundColor: 'purple'}} tabIndex="0">
        {map}
      </div>
    );
  }
}

export default App;
