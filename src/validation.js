import { getEle } from "./main.js";

class Validation {
  checkEmpty(value, errorId, inputID, message) {
    if (value === "") {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      getEle(inputID).classList.add("is-invalid");
      getEle(inputID).classList.remove("is-valid");
      return false;
    } else {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      getEle(inputID).classList.remove("is-invalid");
      getEle(inputID).classList.add("is-valid");
      return true;
    }
  }
  checkOption(idSelect, errorId, message) {
    const optionIndex = getEle(idSelect).selectedIndex;
    if (optionIndex === 0) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      getEle(idSelect).classList.add("is-invalid");
      return false;
    } else {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      getEle(idSelect).classList.remove("is-invalid");
      return true;
    }
  }
  checkCharacter_Number(value, errorId, inputID, message) {
    const number = /^[0-9]+$/;
    if (value.match(number)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      getEle(inputID).classList.remove("is-invalid");
      getEle(inputID).classList.add("is-valid");
      return true;
    } else {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      getEle(inputID).classList.add("is-invalid");
      getEle(inputID).classList.remove("is-valid");
      return false;
    }
  }
 
  checkLength(value, errorId, inputID, message, min, max) {
     if ((value && min > value.trim().length) || max < value.trim().length) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      getEle(inputID).classList.add("is-invalid");
      getEle(inputID).classList.remove("is-valid");
      return false;
    } else {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      getEle(inputID).classList.remove("is-invalid");
      getEle(inputID).classList.add("is-valid");
      return true;
    }
  }

  checkExist(value, errorId, inputID, message, arr_Employee) {
    let isExist = false;
    for (let i = 0; i < arr_Employee.length; i += 1) {
      const obj_Employee = arr_Employee[i];
      if (value === obj_Employee.account) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      getEle(inputID).classList.add("is-invalid");
      getEle(inputID).classList.remove("is-valid");
      return false;
    } else {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      getEle(inputID).classList.remove("is-invalid");
      getEle(inputID).classList.add("is-valid");
      return true;
    }
  }

  checkEmailFormat(value, errorId, inputID, message) {
    const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(email)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      getEle(inputID).classList.remove("is-invalid");
      getEle(inputID).classList.add("is-valid");
      return true;
    } else {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      getEle(inputID).classList.add("is-invalid");
      getEle(inputID).classList.remove("is-valid");
      return false;
    }
  }

    checkPasswordFormat(value, errorId, inputID, message) {
    const password =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
   if (value.match(password)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      getEle(inputID).classList.remove("is-invalid");
      getEle(inputID).classList.add("is-valid");
      return true;
    } else {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      getEle(inputID).classList.add("is-invalid");
      getEle(inputID).classList.remove("is-valid");
      return false;
    }
  }

    checkWorkDays(value, errorId, inputID, message) {
    const workdays =/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
      if (value.match(workdays)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      getEle(inputID).classList.remove("is-invalid");
      getEle(inputID).classList.add("is-valid");
      return true;
    } else {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      getEle(inputID).classList.add("is-invalid");
      getEle(inputID).classList.remove("is-valid");
      return false;
    }
  }
  checkCharacterString(value, errorId, inputID, message) {
    const letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      getEle(inputID).classList.remove("is-invalid");
      getEle(inputID).classList.add("is-valid");
      return true;
    } else {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      getEle(inputID).classList.add("is-invalid");
      getEle(inputID).classList.remove("is-valid");
      return false;
    }
  }

checkBasicSalaryCondition(input, errorId, inputID, message, min, max) {
    if (Number(input) < min || Number(input) > max) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' +
        message;
      getEle(inputID).classList.add("is-invalid");
      getEle(inputID).classList.remove("is-valid");
      return false;
    } else {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      getEle(inputID).classList.remove("is-invalid");
      getEle(inputID).classList.add("is-valid");
      return true;
    }
  }
  checkWorkHour(value, errorId, inputID, message, min, max) {
    if (Number(value) < min || Number(value) > max) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' +
        message;
      getEle(inputID).classList.add("is-invalid");
      getEle(inputID).classList.remove("is-valid");
      return false;
    } else {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      getEle(inputID).classList.remove("is-invalid");
      getEle(inputID).classList.add("is-valid");
      return true;
    }
  }
}

export default Validation;
