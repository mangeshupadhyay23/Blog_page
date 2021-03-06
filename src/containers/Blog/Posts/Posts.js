import React from 'react';
import axios from '../../../axios';
import {Route} from 'react-router-dom';

import Post from '../../../components/Post/Post'
import FullPost from '../FullPost/FullPost';
import  './Posts.css';


class Posts extends React.Component{
    state={
        posts:[],
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
                console.log(error);
                //this.setState({error:true});
            
             });

             //this.setState is not defined here cause we do not wait for response so this.setState may not work if data isnt retrieved
    }


    postSelectedHandler=(id)=>{
        this.props.history.push('/posts/'+id);
    }


    render(){
        let posts=<p style={{textAlign:'center'}}>SOMETHING WENT WRONG</p>
        if(this.state.error===false){
         posts=this.state.posts.map(
            post=>{
                return(
                //<Link to={'/'+post.id} key={post.id}> 
                <Post        // properties of posts due to routing will not be passed down to post for that we need to pass it 
                key={post.id}
                title={post.title} 
                //{...this.props} when u want to pass all props
                //match={this.props.match} when only one prop has to be passed or else u can use import {withRouter} from react router dom HOC
                author={post.author}
                clicked={()=>this.postSelectedHandler(post.id)}/>
                //</Link>
                );
            }
        )};
    
    return(     
            <div>
                <section className="Posts">
                   {posts}                  
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/> {/*or use a lil diff path that is '/post/:id' */}
            </div>
        );    
    }
}

export default Posts;