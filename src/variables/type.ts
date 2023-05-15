interface image {
    id: number;
    image: string;
}
interface Cooperative{
  ice:number,
  name: string
  description:string
  address:string,
  date_created:Date
  image:image,
}
interface Customer{
  id:number,
  first_name: string
  last_name:string
  address:string,
  image:image,
}
interface User {
    id: string;
    username: string;
    email: string;
    is_enabled: boolean;
    is_cooperative: boolean;
    infoemation:Cooperative |Customer |null
}

interface userdata {
    username: string;
    password: string;
}

interface UserState {
    user: User | null;
}

interface Filter {
    page: number | 1;
    price_lt: number | string;
    price_gt: number | string;
    bio_lt: number | string;
    bio_gt: number | string;
    address: string;
    date_created_after: Date | string;
    date_created_before: Date | string;
}
('http://127.0.0.1:8000/api/simple-product/?');
