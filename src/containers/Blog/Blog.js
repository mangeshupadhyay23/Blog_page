import React, { Component } from 'react';
//import axios from 'axios';
import axios from "../../axios";
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state={
        posts:[],
        selectedPostId:null,
        error:false
    }
    componentDidMount(){
        axios.get('/posts') //axios get the response from server 
             .then(response=>{ 
                    const posts=response.data.slice(0,4);  // took 4 entries out of array of data coming
                    const updatedPosts=posts.map(post=>{
                        return{
                            ...post,                      //made a loop for extracting every element of array posts one by one and giving the properties to post and returning a post element containing all properties of post and an added property of author and  adding it the to the array updated post and then one by one elements of that array are taken and entered in post component
                            author:'Max'
                        };
                    })
                    this.setState({posts:updatedPosts});                                 //since our jsx file cant wait for sever to send data and all so we use a 
                    console.log(response);                      //a
             })
             .catch(error=>{
                this.setState({error:true});
            
             });

             //this.setState is not defined here cause we do not wait for response so this.setState may not work if data isnt retrieved
    }


    postSelectedHandler=(id)=>{
        this.setState({selectedPostId:id});
    }
    render () {
        let posts=<p style={{textAlign:'center'}}>SOMETHING WENT WRONG</p>
        if(this.state.error===false){
         posts=this.state.posts.map(
            post=>{
                return <Post 
                key={post.id}
                title={post.title} 
                author={post.author}
                clicked={()=>this.postSelectedHandler(post.id)}/>;
            }
        )};
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;