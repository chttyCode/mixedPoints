"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Student = /** @class */ (function () {
    function Student(teacher) {
        this.teacher = teacher;
    }
    return Student;
}());
var student_1 = /** @class */ (function (_super) {
    __extends(student_1, _super);
    function student_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    student_1.prototype.update = function () {
        console.log(this.teacher.getState() + ',学霸抬头举手');
    };
    return student_1;
}(Student));
var student_2 = /** @class */ (function (_super) {
    __extends(student_2, _super);
    function student_2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    student_2.prototype.update = function () {
        console.log(this.teacher.getState() + ',学渣低头祈祷');
    };
    return student_2;
}(Student));
var Teacher = /** @class */ (function () {
    function Teacher() {
        this.students = new Array();
        this.state = '老师讲课';
    }
    Teacher.prototype.getState = function () {
        return this.state;
    };
    Teacher.prototype.askQuestion = function () {
        this.state = '老师提问';
        this.notifyAllStudents();
    };
    Teacher.prototype.attach = function (student) {
        this.students.push(student);
    };
    Teacher.prototype.notifyAllStudents = function () {
        this.students.forEach(function (student) { return student.update(); });
    };
    return Teacher;
}());
var teacher = new Teacher();
teacher.attach(new student_1(teacher));
teacher.attach(new student_2(teacher));
teacher.askQuestion();
