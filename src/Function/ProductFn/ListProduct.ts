import axios from 'axios';

const getProducts = async(queryKey:any) => {
    console.log('fetching')
    return await axios.get(queryKey[2]).then((res)=>res.data);
};
export default getProducts;
