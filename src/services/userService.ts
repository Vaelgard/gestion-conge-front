import { LeaveCreate } from "@/models/LeaveCreate";
import { LeaveRequest } from "@/models/LeaveRequest";
import { User } from "@/models/User";
import axios from "axios";

interface FormDataType {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}



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
  
  static async rejectLeave(leaveReqDto: LeaveRequest) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/api/leave/rejected`,
        leaveReqDto,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  
  static async getUser() {
    try {
      const email = localStorage.getItem('email');
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
  static async updateUser(userData: User) {
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
  static async createLeave(leaveData: LeaveCreate) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/api/leave/create`, leaveData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  static async getLeaveByUser(id: number) {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/api/leave/getAllByUserId/${id}`,{
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  static async deleteEmployee(id: number) {
    try {
      const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${id}`, {
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