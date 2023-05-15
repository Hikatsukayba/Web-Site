import { object } from 'prop-types';
import { useEffect, useState } from 'react';

const initialState = {
    page: 'page',
    price_lt: 'price__lt',
    price_gt: 'price__gt',
    bio_lt: 'bio__lt',
    bio_gt: 'bio__gt',
    address: 'address',
    date_created_after: 'date_created__after',
    date_created_before: 'date_created__before'
};
const Valuebase: Filter = {
    page: 1,
    price_lt: '',
    price_gt: '',
    bio_lt: '',
    bio_gt: '',
    address: '',
    date_created_after: '',
    date_created_before: ''
};
function useFilters(url: string) {
    const [Data, setData] = useState<Filter>(Valuebase);
    const [urlf, setUrl] = useState(url);

    const setINfo = (name: string, data: string) => {
        setData({ ...Data, [name]: data });
    };
    useEffect(() => {
        let oGurl=url;
        for (const prop in Data) {
            if (Data[prop] !== '') {
                oGurl+=`&${initialState[prop]}=${Data[prop]}`;
            }
            setUrl(oGurl);
        }
    }, [Data]);
    console.log(urlf)

    return { urlf, setINfo };
}

export default useFilters;
