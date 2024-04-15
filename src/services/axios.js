import axios from 'axios';

class AxiosConfig {
  constructor(apiPath) {
    this.axios = axios.create({
      baseURL: `https://legal-medicine.fly.dev/api/${apiPath}`,
    });

    
    this.axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

 
    this.axios.interceptors.response.use(response => response, error => {
     
      return Promise.reject(error);
    });
  }
}
export default AxiosConfig;
