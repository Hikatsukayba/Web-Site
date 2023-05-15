import axios from "axios";


function getProduct(url:string) {
    return axios.get(url)
}

export default getProduct;