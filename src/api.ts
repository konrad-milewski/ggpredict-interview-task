
 async function get(url :string){
    let error;
    const res = await fetch(url);
    if (!res.ok)
      error = res.status;
    const data = await res.json();
    if (error) {
      return Promise.reject(error);
    }
    return data;
  }
  
  function getData(endpoint : string) {
    const URL = `https://api.ggpredict.dev:8080/restapi/${endpoint}`;
    return get(URL);
  }
  
  export default  getData
  