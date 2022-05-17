import axios from 'axios';

const token = 'charleslemes21@gmail.com';
const api = axios.create({
    baseURL: 'https://tiao.supliu.com.br/api',
    headers: {'authorization': token}
})


export default api;