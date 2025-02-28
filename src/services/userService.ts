import axios from "axios";

type UserDataType = {
  token: string;
  role: string;
  message: string;
};

interface FormDataType {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

type  LeaveDataType = {
  id: number;
  reason: string;
  name:string;
  statut: string;
  startDate: Date;
  endDate: Date;
  userId: number;
};


class UserService {
  static BASE_URL = "http://localhost:8081";


  static async login(email: string, password: string) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/login`, { email, password });
      console.log("i'm here");
      console.log(response.data);

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
  static async getLeave() {
    try{
      const response=await axios.get(`${UserService.BASE_URL}/api/leave/getAll`,{
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    }catch(err){
      console.log(err);
      throw err;
    };
  }
  static async approveLeave(id: number) {
    try {
      const leaveReqDto = { id };  // You may need to add other necessary fields
      const response = await axios.post(`${UserService.BASE_URL}/api/leave/approved`, leaveReqDto, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  
  static async rejectLeave(id: number) {
    try {
      const leaveReqDto = { id };  // Again, add other fields if necessary
      const response = await axios.post(`${UserService.BASE_URL}/api/leave/rejected`, leaveReqDto, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  static async getUser() {
    try {
      const email = localStorage.getItem('email');
      console.log(localStorage.getItem('email'));
      const response = await axios.get(
        `${UserService.BASE_URL}/admin/get-users/${email}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  static async updateUser(userData: FormDataType) {
    try {
      const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userData.id}`, userData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  
  
  

}
export default UserService;