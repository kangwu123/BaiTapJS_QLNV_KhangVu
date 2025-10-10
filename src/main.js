import Employee from "./employee.js";
import EmployeeManager from "./employeeManager.js";
import Validation from "./validation.js";

const manager = new EmployeeManager();
const validate = new Validation();

// Dom tới Id
export const getEle = (id) => document.getElementById(id);

const resetForm = () => {
  getEle("employee_Form").reset();
};

const get_Employee_Info = (isAdd) => {
  const input_account = getEle("tknv").value;
  const input_fullname = getEle("name").value;
  const input_email = getEle("email").value;
  const input_password = getEle("password").value;
  const input_workdays = getEle("datepicker").value;
  const input_basicSalary = getEle("luongCB").value;
  const input_position = getEle("chucvu").value;
  const input_workinghour = getEle("gioLam").value;

  // 4. Check xem có để trống hay không
  let isValid = true;

  // 4. Check hợp lệ Validation
  // Tài khoản
  if (isAdd) {
    isValid &=
      validate.checkEmpty(
        input_account,
        "invalidAccount",
        "tknv",
        "Vui lòng nhập Tài khoản."
      ) &&
      validate.checkCharacter_Number(
        input_account,
        "invalidAccount",
        "tknv",
        "Tài khoản không hợp lệ. Vui lòng chỉ nhập số."
      ) &&
      validate.checkLength(
        input_account,
        "invalidAccount",
        "tknv",
        "Tài khoản không hợp lệ. Vui lòng nhập 4-6 ký số.",
        4,
        6
      ) &&
      validate.checkExist(
        input_account,
        "invalidAccount",
        "tknv",
        "Tài khoản đã tồn tại. Vui lòng nhập Tài khoản khác.",
        manager.arr_Employee
      );
  }

  // Họ Tên
  isValid &=
    validate.checkEmpty(
      input_fullname,
      "invalidName",
      "name",
      "Vui lòng nhập Họ tên."
    ) &&
    validate.checkCharacterString(
      input_fullname,
      "invalidName",
      "name",
      "Vui lòng chỉ nhập chữ."
    );

  // Email
  isValid &=
    validate.checkEmpty(
      input_email,
      "invalidEmail",
      "email",
      "Vui lòng nhập Email."
    ) &&
    validate.checkEmailFormat(
      input_email,
      "invalidEmail",
      "email",
      "Email không hợp lệ. Vui lòng nhập lại Email."
    );

  // Mật khẩu
  isValid &=
    validate.checkEmpty(
      input_password,
      "invalidPassword",
      "password",
      "Vui lòng nhập Mật khẩu."
    ) &&
    validate.checkLength(
      input_password,
      "invalidPassword",
      "password",
      "Mật khẩu không hợp lệ. Vui lòng nhập Mật khẩu từ 6-10 ký tự.",
      6,
      10
    ) &&
    validate.checkPasswordFormat(
      input_password,
      "invalidPassword",
      "password",
      "Mật khẩu không hợp lệ. Vui lòng nhập lại Mật khẩu có chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt."
    );

  // Ngày làm
  isValid &=
    validate.checkEmpty(
      input_workdays,
      "invalidWorkDays",
      "datepicker",
      "Vui lòng nhập Ngày làm."
    ) &&
    validate.checkWorkDays(
      input_workdays,
      "invalidWorkDays",
      "datepicker",
      "Định dạng Ngày làm không hợp lệ. Vui lòng nhập lại theo mm/dd/yyyy"
    );

  // Lương cơ bản
  isValid &=
    validate.checkEmpty(
      input_basicSalary,
      "invalidBasicSalary",
      "luongCB",
      "Vui lòng nhập Lương cơ bản."
    ) &&
    validate.checkCharacter_Number(
      input_basicSalary,
      "invalidBasicSalary",
      "luongCB",
      "Lương cơ bản không hợp lệ. Vui lòng chỉ nhập số."
    ) &&
    validate.checkBasicSalaryCondition(
      input_basicSalary,
      "invalidBasicSalary",
      "luongCB",
      "Vui lòng nhập Lương cơ bản từ 10000000 đến 20000000",
      10000000,
      20000000
    );

  // Chức vu
  isValid &= validate.checkOption(
    "chucvu",
    "invalid_Position",
    "Vui lòng chọn Chức vụ."
  );

  // Giờ làm
  isValid &=
    validate.checkEmpty(
      input_workinghour,
      "invalidWorkHour",
      "gioLam",
      "Vui lòng nhập Giờ làm."
    ) &&
    validate.checkWorkHour(
      input_workinghour,
      "invalidWorkHour",
      "gioLam",
      "Giờ làm không hợp lệ. Vui lòng chỉ nhập giờ làm từ 80 đến 200",
      80,
      200
    );

  if (!isValid) {
    return null;
  }

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
    employee.Xep_Loai = "Xuat sac";
  } else if (input_workinghour >= 176 && input_workinghour < 192) {
    employee.Xep_Loai = "Gioi";
  } else if (input_workinghour >= 160 && input_workinghour < 176) {
    employee.Xep_Loai = "Kha";
  } else {
    employee.Xep_Loai = "Trung binh";
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
        <td class="d-flex align-items-center">
          <button data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="btn_Edit_Employee('${obj_Employee.account}')">Sửa</button>
          <button class="btn btn-danger" onclick="btn_Delete_Employee('${obj_Employee.account}')">Xóa</button>
        </td>
      </tr>
    `;
  }
  getEle("tableDanhSach").innerHTML = content_HTML;
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
getEle("btnThem").onclick = function () {
  getEle("header-title").innerHTML = "Log In";
  getEle("btnThemNV").style.display = "block";
  getEle("btnCapNhat").style.display = "none";

  // Mỏ phần tai_Khoan
  getEle("tknv").disabled = false;
  resetForm();
};

// 2. Khi bấm nút thêm employee
getEle("btnThemNV").onclick = function () {
  const obj_Employee = get_Employee_Info(true);

  if (!obj_Employee) return;

  manager.add_Employee(obj_Employee);

  render_ListUI(manager.arr_Employee);

  set_localStorage();
  //Dom tới nút đóng khi thêm hoặc cập nhật employee
  getEle("btnDong").click();
};

// 4. Khi nhấp vào nút edit employee
const btn_Edit_Employee = (account) => {
  getEle("header-title").innerHTML = "Edit Information";
  getEle("btnThemNV").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  // Đưa lại thông tin vào phần input
  const obj_Employee = manager.get_Account_Employee(account);
  if (obj_Employee) {
    getEle("tknv").value = obj_Employee.account;
  }
  // Block phần tai_Khoan
  getEle("tknv").disabled = true;

  getEle("name").value = obj_Employee.fullname;
  getEle("email").value = obj_Employee.email;
  getEle("password").value = obj_Employee.password;
  getEle("datepicker").value = obj_Employee.workdays;
  getEle("luongCB").value = obj_Employee.basicSalary;
  getEle("chucvu").value = obj_Employee.position;
  getEle("gioLam").value = obj_Employee.workinghour;
};
// Khai báo ra ngoài window
window.btn_Edit_Employee = btn_Edit_Employee;

// 5. Khi nhấp vào nút update employee
getEle("btnCapNhat").onclick = function () {
  let obj_Employee = get_Employee_Info(false);
  manager.update_Employee(obj_Employee);
  render_ListUI(manager.arr_Employee);
  set_localStorage();

  getEle("btnDong").click();
};

// 6. Khi bấm nút tìm kiếm xếp loại
getEle("btnTimNV").onclick = function () {
  // Dom tới người dùng nhập tìm kiếm
  const input_Search = getEle("searchName").value;
  const search_Employee = manager.search_Employee(input_Search);
  render_ListUI(search_Employee);
};
