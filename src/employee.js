class Employee{
    constructor(account,fullname,email,password,workdays,basicSalary,position,workinghour){
            this.account = account;
            this.fullname = fullname;
            this.email = email;
            this.password = password;
            this.workdays = workdays;
            this.basicSalary = basicSalary;
            this.position = position;
            this.workinghour = workinghour;
            this.TotalSalary = 0;
            this.Xep_Loai = "";
    }
    calculate_TotalSalary(salary_coefficient){
    this.TotalSalary = Number(this.basicSalary*salary_coefficient);
    }
}

export default Employee