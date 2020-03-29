import axios from 'axios';  // to override some places where we are not using default URL

const  instance=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
})

instance.defaults.headers.common['Authorisation']='AUTH TOKEN';

export default instance;