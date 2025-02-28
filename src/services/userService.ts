import axios from "axios";

type UserDataType = {
  token: string;
  role: string;
  message: string;
};

interface FormDataType {
  name: string;
  email: string;
  password: string;
  role: string;
  city: string;
}

type OffreDataType = {
  id: string;
  date: string;
  driverId: string;
  placeDispo: string;
  placeInitiale: string;
  prix: string;
  status: boolean;
  villeDepartId: string;
  villeArrivId: string;
  heureArriv: string;
  heureDepart: string;
};

class UserService {
  static BASE_URL = "http://localhost:8081";


  static async login(email: string, password: string) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/login`, { email, password });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async register(userData: FormDataType) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData, {
        // headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  static async getEmployee() {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, {
         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data.ourUsersList;
    } catch (err) {
      console.log(err);
      throw err;
    }
    }
}
export default UserService;