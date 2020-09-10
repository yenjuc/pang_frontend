import axios from 'axios'
export default instance;

const instance=axios.create({
    baseURL:'http://localhost:8000'
})
