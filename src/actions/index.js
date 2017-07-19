import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';

const ROOT_URL = `http://reduxblog.herokuapp.com/api`;
const API_KEY = '?key=mplibunao';

export function fetchPosts(){
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, callback){
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(()=> callback());
  
  /* Error: body not passed in the post request
  const request = fetch(`${ROOT_URL}/posts${API_KEY}`, {
    method: 'POST',
    body: JSON.stringify(values)
  }).then(res => { console.log(res); callback(); } );
  */
  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id){
  //http://reduxblog.herokuapp.com/api/posts/5	
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
  return {
    type: FETCH_POST,
    payload: request
  };
}