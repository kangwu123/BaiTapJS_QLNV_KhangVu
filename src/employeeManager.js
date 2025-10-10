class EmployeeManager {
    constructor() {
        this.arr_Employee = [];
    }
    add_Employee(obj_Employee) {
    this.arr_Employee.push(obj_Employee);
  }
   locate_index(account) {
    let index = -1;
    for (let i = 0; i < this.arr_Employee.length; i += 1) {
      const obj_Employee = this.arr_Employee[i];
      if (obj_Employee.account === account) {
        index = i;
        break;
      }
    }
    return index;
  }
  delete_Employee(account) {
    const index = this.locate_index(account);
    // Xóa
    if (index!==-1) {
      this.arr_Employee.splice(index, 1);
    }
  }

  get_Account_Employee(account) {
    const index = this.locate_index(account);
      if (index!==-1) return this.arr_Employee[index];
    return obj_Employee;
  }

  update_Employee(obj_Employee) {
    const index = this.locate_index(obj_Employee.account);
    if (index!==-1) {
      this.arr_Employee[index] = obj_Employee;
    } 
  }

  search_Employee(input_Search) {
    const search_Employee_Arr = [];
    if (input_Search === "tat ca" || input_Search ==="All") {
       return this.arr_Employee;
      }
    for (let i = 0; i < this.arr_Employee.length; i += 1) {
       const obj_Employee = this.arr_Employee[i];
       // Chuyển xếp loại sang chữ thường
      const lower_Input_Search = input_Search.toLowerCase();
      // Chuyển input_Search sang chữ thường
      const lower_Ranking = obj_Employee.Xep_Loai.toLowerCase();
      if (lower_Ranking.indexOf(lower_Input_Search) !== -1) {
        search_Employee_Arr.push(obj_Employee);
      }
    }
    return search_Employee_Arr;
  }
}

export default EmployeeManager;