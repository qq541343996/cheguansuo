import axios from 'axios'
axios.defaults.headers.common['token'] ="0fa16a943ab6679ccd052814a6ada0d6"

const HttpClientget = (url,params) =>{
    return new Promise((resolve, reject) => {
        axios.get(url,params
        ).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
}

const HttpClientpost = (url,params) =>{
    return new Promise((resolve, reject) => {
        axios.post(url,params
        ).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
}

export  {HttpClientget,HttpClientpost}