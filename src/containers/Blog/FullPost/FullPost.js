import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state={
        loadedPost:null
    }
    deletePostHandler=()=>{
            axios.delete('/posts/'+this.props.id)
                 .then(response=>{
                    console.log(response);
                 });
    }
    componentDidMount(){
        console.log(this.props);
        if(this.props.match.params.id){
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id!==this.props.id)){
                //if a post is not loaded initially or  a post is loaded and its id is not equal to the id we selected(in case of selecting other post) only then request will be sent to server
                axios.get('/posts/'+this.props.match.params.id)  //fetching data is asynchronus it doesnt depend on rendering of jsx code
                    .then(response=>{
                        this.setState({loadedPost:response.data});
                        console.log(response);
                    });
            }
        }
    }
    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        if(this.props.match.params.id) {
            post = <p style={{textAlign:'center'}}>Loading....</p>; // till when the data is not loaded from server this will be shown 
        }//if props.id is  null or zero which it is initially then the full post will not be shown
        if(this.state.loadedPost) {
                                            //if post will be loaded then this will show but just by this an infinite loop wil start
                                            //cause we use component did update then we change state and and hence component did update start again
                                            //and this keep happening and hence a loop is formed,so 
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
        
    }
}

export default FullPost;