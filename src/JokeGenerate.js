import React, { Component } from 'react'
import  axios from 'axios'
import "./JokeGenerate.css"
import Joke from './Joke'
import { v4 as uuidv4 } from 'uuid';

const joke_get_url="https://icanhazdadjoke.com/"
export class JokeGenerate extends Component {
static defaultProps={
    NumofJokes:10
}
constructor(props) {
    super(props)

    this.state = {
        jokes:JSON.parse(window.localStorage.getItem("jokes") || "[]"),
        loading:false
     
    }
    this.seenJokes=new Set (this.state.jokes.map(j=>j.text))
  
    this.handleClick=this.handleClick.bind(this)
}

    componentDidMount(){
if (this.state.jokes.length===0) 
 this.getJokes();



}
 async getJokes(){

        let finaljokes=[];
  while(finaljokes.length<this.props.NumofJokes){
        let response=await axios.get(joke_get_url, {headers:{Accept:"application/json"}})
 if (!this.seenJokes.has(response.data.joke)){
       finaljokes.push({text:response.data.joke, id:uuidv4(),vote:0})
        }

  else{
console.log("Found Dublicate!!!")
       }
  }
    this.setState(st=>({loading:false,jokes:[...st.jokes,...finaljokes],}),
    
  ()=>window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes))
)


   
}
 
 handleVote(id,delta){
this.setState(st=>({
    jokes:st.jokes.map(j=>
        j.id===id? {...j,vote:j.vote+delta} : j
    )
}),
()=>window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes))
)
 }
 handleClick(){
   this.setState({loading:true},()=>this.getJokes())  ;
 }

 
    render() {
      
      if(this.state.loading){
 return( 
  <div className="Spinner">
  <i className="far fa-8x fa-laugh fa-spin"></i>
 <h1 >Loading....</h1>
 </div>
    )
         
      }
 
return ( 
<div className="JokeList">
 <div className="JokeList__Sidebar">
 <h1 className="JokeListSidebar__title"> <span>Dad</span> Jokes</h1>  
    <img className="JokeListSidebar__img"  alt="smile" src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
     <button className="JokeListSidebar__button" onClick={this.handleClick}>Fetch Jokes</button>
 </div>
<div className="JokeList_jokes">
 {this.state.jokes.map(joke=> 
     <Joke key={joke.id} joke={joke.text} vote={joke.vote} Upvote={()=>this.handleVote(joke.id,1)} Downvote={()=>this.handleVote(joke.id,-1)}/>)}
 </div>
            
 </div>
        )
    }
}

export default JokeGenerate
