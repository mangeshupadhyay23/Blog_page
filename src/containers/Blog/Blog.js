import React, { Component } from 'react';
//import axios from 'axios';
import {Route,NavLink,Switch} from 'react-router-dom';
//import Post from '../../containers/Blog/FullPost/FullPost';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    
    


   
    render () {
        
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>                {/*u can use activeClassName='active' or use active */}
                            <li><NavLink to='/posts' exact  >Posts</NavLink></li>  {/*exact has to be added or the css will be applied when the link is not exact as well*/}
                            <li><NavLink to={{
                                pathname:'/new-post', //absolute path : https://blogpage/home/new-post   relative path: /new-post // to always make it an absolute path
                                hash:'#submit',
                                search:'?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={()=>(<h1>Home</h1>)}/> exact stands for exact match so when the link will be exactly same as defined path only then it will be shown */}
               {/* <Route path="/"  render={()=>(<h1>Home2</h1>)}/> this will be shown only when the path will be the current path as written in path attribute */}
                <Switch>{/* switch only loads first path that matches URL even if two paths are similar inititally*/}
                    <Route path='/new-post' exact component={NewPost}/>
                    <Route path='/posts/'      component={Posts}/>   {/*  But this will u will reload ur application every time u click and hence lose ur previous data so we just want to re render the application not reload the app */}
                </Switch>
            </div>
        );
    }
}

export default Blog;