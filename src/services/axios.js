import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL

export async function getRequest(URL, queryParam = null) {
    const query = ''
    /*
    * TODO 
    * Loop query param to create query string
    */
    let res = await axios.get(BASE_URL + URL + query)
    return res.data;
}