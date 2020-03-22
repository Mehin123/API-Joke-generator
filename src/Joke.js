import React, { Component } from 'react'
import "./Joke.css";
export class Joke extends Component {
  static defaultProps={
    colors:["red","orange",'yellow','lightgreen','yellowgreen','green'],
    emojis:["em em-confused","em em-full_moon_with_face",'em em-smile','em em-laughing','em em-joy','em em-angry']
  }
   constructor(props) {
     super(props)
   
     this.state = {
        color:"red"
     }
   }
   
  colorGen(){
    if(this.props.vote>=15 ){
      
      return this.props.colors[5]
    }
    else if(this.props.vote>=12){
      return this.props.colors[4]
    }
   else if (this.props.vote>=9){
    return this.props.colors[3]
  }
  else if (this.props.vote>=6 ){
    return this.props.colors[2]
  }
  else if (this.props.vote>=3 ){
    return this.props.colors[1]
  }
else{
  return this.props.colors[0]
}
  }
  emojiGen(){
    if(this.props.vote>=15){
      
      return this.props.emojis[4]
    }
   else if(this.props.vote>=12){
      
      return this.props.emojis[4]
    }
    else if(this.props.vote>=9 ){
      return this.props.emojis[3]
    }
   else if(this.props.vote>=6 ){
    return this.props.emojis[2]
  }
 else if(this.props.vote>=3 ){
    return this.props.emojis[1]
  } 
  else if(this.props.vote>=0 ){
    return this.props.emojis[0]
  } 
  else{
    return this.props.emojis[5]
  }
 
  }
  
  
    render() {
  
        return (
            <div className="Joke">
          <div className="Joke__buttons">
          <i onClick={this.props.Upvote} className="fas fa-arrow-up"></i>
        <span className="Joke__vote"  style={{border:`2px solid ${this.colorGen()}`}}> 
       {this.props.vote}
        </span> 
          <i onClick={this.props.Downvote} className="fas fa-arrow-down">
          </i>
          </div>
          
          <div className="Joke__text">
          {this.props.joke}
          </div>
          <div className="Joke_emoji">
          <i className={this.emojiGen()} ></i>
         
          </div>
         
            </div>
        )
    }
}

export default Joke
