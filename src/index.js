import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';


axios.defaults.baseURL='https://jsonplaceholder.typicode.com';  //default URL and every local URL calls wil append with it
axios.defaults.headers.common['Authorisation']='AUTH TOKEN';
axios.defaults.headers.post['Content-Type']='application/json';

axios.interceptors.request.use(request=>{  // intereptors to handle request
    console.log(request);  // all the request will pass through here this is where we can use authentication if required and request can be edited as well
    return request;
},error=>{
    console.log(error);
    return Promise.reject(error); // this error will be seen when there is any error in sending request like no internet conncetivity 

});

axios.interceptors.response.use(response=>{ //interceptors for handling response
    console.log(response);
    return response; //to return response to the components

},error=>{
    console.log(error);
    return Promise.reject(error); //to return error to the component so that we can catch them locally
}

);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
