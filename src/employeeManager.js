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
    this.arr_Employee.splice(index, 1);
  }

  edit_Employee(account) {
    const index = this.locate_index(account);
    const obj_Employee = this.arr_Employee[index];
    return obj_Employee;
  }

  update_Employee(account) {
    const index = this.locate_index(account);
    const obj_Employee = this.arr_Employee[index];
    const new_account = obj_Employee.account;
    return new_account;
  }

  filter_Employee(input_Search) {
    const filter_Employee = [];

    for (let i = 0; i < this.arr_Employee.length; i += 1) {
      const obj_Employee = this.arr_Employee[i];
      if (input_Search === obj_Employee.Xep_Loai) {
        filter_Employee.push(obj_Employee);
      }
    }
    return filter_Employee;
  }
}

export default EmployeeManager;