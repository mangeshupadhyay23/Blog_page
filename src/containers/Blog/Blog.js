import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state={
        posts:[]
    }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts') //axios get the response from server 
             .then(response=>{ 
                    this.setState({posts:response.data});                                 //since our jsx file cant wait for sever to send data and all so we use a 
                    console.log(response);                      //a
             });

             //this.setState is not defined here cause we do not wait for response so this.setState may not work if data isnt retrieved
    }
    render () {
        const posts=this.state.posts.map(
            post=>{
                return <Post title={post.title}/>;
            }
        );
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;