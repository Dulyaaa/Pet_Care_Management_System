import axios from 'axios';

 class LoginService{
    getUser(user){
        return axios.get('http://localhost:8080/admin/login'+ '/' +user);
    }
}
export default new LoginService();