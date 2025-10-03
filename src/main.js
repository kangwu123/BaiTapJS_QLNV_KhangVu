import Employee from "./employee.js";
import EmployeeManager from "./employeeManager.js";

const manager = new EmployeeManager();

// Dom tới Id
const Dom_Id = (id) => document.getElementById(id);

// Lấy thông tin của từng employee
const get_Employee_Info = () => {
  const input_account = Dom_Id("tknv").value;
  const input_fullname = Dom_Id("name").value;
  const input_email = Dom_Id("email").value;
  const input_password = Dom_Id("password").value;
  const input_workdays = Dom_Id("datepicker").value;
  const input_basicSalary = Dom_Id("luongCB").value;
  const input_position = Dom_Id("chucvu").value;
  const input_workinghour = Dom_Id("gioLam").value;

  const employee = new Employee(
    input_account,
    input_fullname,
    input_email,
    input_password,
    input_workdays,
    input_basicSalary,
    input_position,
    input_workinghour
  );

  // 5. Tính tổng lương
  let salary_coefficient = 1;
  if (input_position === "Sếp") {
    salary_coefficient = 3;
  } else if (input_position === "Trưởng phòng") {
    salary_coefficient = 2;
  }

  employee.calculate_TotalSalary(salary_coefficient);

  // 6. Xếp loại
  if (input_workinghour >= 192) {
    employee.Xep_Loai = "Nhân viên xuất sắc";
  } else if (input_workinghour >= 176 && input_workinghour < 192) {
    employee.Xep_Loai = "Nhân viên giỏi";
  } else if (input_workinghour >= 160 && input_workinghour < 176) {
    employee.Xep_Loai = "Nhân viên khá";
  }

  return employee;
};

// 1. Render danh sách ra ngoài UI
const render_ListUI = (employee_List) => {
  let content_HTML = "";
  for (let i = 0; i < employee_List.length; i += 1) {
    const obj_Employee = employee_List[i];
    content_HTML += `
      <tr>
        <td>${obj_Employee.account}</td>
        <td>${obj_Employee.fullname}</td>
        <td>${obj_Employee.email}</td>
        <td>${obj_Employee.workdays}</td>
        <td>${obj_Employee.position}</td>
        <td>${obj_Employee.TotalSalary}</td>
        <td>${obj_Employee.Xep_Loai}</td>
        <td class="d-flex">
          <button data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="btn_Edit_Employee('${obj_Employee.account}')">Sửa</button>
          <button class="btn btn-danger" onclick="btn_Delete_Employee('${obj_Employee.account}')">Xóa</button>
        </td>
      </tr>
    `;
  }
  Dom_Id("tableDanhSach").innerHTML = content_HTML;
};

// Lưu thông tin employee vào localStorage
const set_localStorage = () => {
  const convert_JSON_to_String = JSON.stringify(manager.arr_Employee);
  localStorage.setItem("LIST_EMPLOYEE", convert_JSON_to_String);
};

// Đưa thông tin đã lưu lên UI lại
const get_localStorage = () => {
  const info_String = localStorage.getItem("LIST_EMPLOYEE");

  if (!info_String) return true;

  const convert_String_to_JSON = JSON.parse(info_String);

  manager.arr_Employee = convert_String_to_JSON;

  render_ListUI(convert_String_to_JSON);
};
get_localStorage();

// 7. Khi nhấp vào nút xóa employee
const btn_Delete_Employee = (account) => {
  console.log(account);

  manager.delete_Employee(account);

  render_ListUI(manager.arr_Employee);

  set_localStorage();
};
// Khai báo ra ngoài window
window.btn_Delete_Employee = btn_Delete_Employee;

// Dom tới nút thêm employee
  Dom_Id("btnThem").onclick = function () {
  Dom_Id("header-title").innerHTML = "Log In";
  Dom_Id("btnThemNV").style.display = "block";
  Dom_Id("btnCapNhat").style.display = "none";

  // Mỏ phần tai_Khoan
  Dom_Id("tknv").disabled = false;
};

// 4. Khi nhấp vào nút edit employee
const btn_Edit_Employee = (account) => {
  Dom_Id("header-title").innerHTML = "Edit Information";
  Dom_Id("btnThemNV").style.display = "none";
  Dom_Id("btnCapNhat").style.display = "block";

  // Block phần tai_Khoan
  Dom_Id("tknv").disabled = true;

  // Đưa lại thông tin vào phần input
  const obj_Employee = manager.edit_Employee(account);

  Dom_Id("tknv").value = obj_Employee.account;
  Dom_Id("name").value = obj_Employee.fullname;
  Dom_Id("email").value = obj_Employee.email;
  Dom_Id("password").value = obj_Employee.password;
  Dom_Id("datepicker").value = obj_Employee.workdays;
  Dom_Id("luongCB").value = obj_Employee.basicSalary;
  Dom_Id("chucvu").value = obj_Employee.position;
  Dom_Id("gioLam").value = obj_Employee.workinghour;
};
// Khai báo ra ngoài window
window.btn_Edit_Employee = btn_Edit_Employee;

// 5. Khi nhấp vào nút update employee
Dom_Id("btnCapNhat").onclick = function () {
  let new_obj_Employee = get_Employee_Info();

  const locate_tai_Khoan = manager.update_Employee(
    new_obj_Employee.account
  );

  for (let i = 0; i < manager.arr_Employee.length; i += 1) {
    let obj_Employee = manager.arr_Employee[i];
    if (locate_tai_Khoan === obj_Employee.account) {
      manager.arr_Employee[i] = new_obj_Employee;
    }
  }

  render_ListUI(manager.arr_Employee);

  set_localStorage();
};

// 6. Khi bấm nút tìm kiếm xếp loại
Dom_Id("btnTimNV").onclick = function () {
  // Dom tới người dùng nhập tìm kiếm
  const input_Search = Dom_Id("searchName").value;

  if (input_Search === "Tất cả" || input_Search === "All") {
    render_ListUI(manager.arr_Employee);
    return;
  }

  const filter_Employee = manager.filter_Employee(input_Search);

  render_ListUI(filter_Employee);
};

// 2. Khi bấm nút thêm employee
Dom_Id("btnThemNV").onclick = function () {
  const obj_Employee = get_Employee_Info();

  manager.add_Employee(obj_Employee);

  render_ListUI(manager.arr_Employee);

  set_localStorage();
};

console.log(manager.arr_Employee);