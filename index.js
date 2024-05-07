"use strict";
// Triển khai interface 
class TodoList {
    constructor() {
        let data = localStorage.getItem("todolist");
        if (data) {
            this.todolist = JSON.parse(data);
        }
        else {
            this.todolist = [];
        }
    }
    // Lưu dữ liệu lên local
    saveTodoList() {
        localStorage.setItem("todolist", JSON.stringify(this.todolist));
    }
    // Render dữ liệu
    renderJob() {
        let data = localStorage.getItem("todolist");
        if (data) {
            this.todolist = JSON.parse(data);
        }
        else {
            this.todolist = [];
        }
        let text = ``;
        let body = document.getElementById("body");
        for (let i = 0; i < this.todolist.length; i++) {
            text += `
            <div class="check-box">
                    <input type="checkbox"> ${this.todolist[i].name}
                    <span class="material-symbols-outlined icon pen" onclick="updateJob(${this.todolist[i].name})">edit</span>
                    <span class="material-symbols-outlined delete" onclick="deleteJob(${this.todolist[i].id})">delete</span>
                </div>
            `;
        }
        body.innerHTML = text;
    }
    createJob() {
        let name = document.getElementById("input").value;
        if (document.getElementById("input").value == "") {
            alert("Không được để trống tên.");
        }
        else {
            let completed = true;
            let id = Math.floor(Math.random() * 9999999999999);
            let newJob = {
                name: name,
                completed: completed,
                id: id,
            };
            this.todolist.push(newJob);
            document.getElementById("input").value = "";
            localStorage.setItem("todolist", JSON.stringify(this.todolist));
        }
    }
    deleteJob(id) {
        for (let i = 0; i < this.todolist.length; i++) {
            if (id == this.todolist[i].id) {
                confirm(`Bạn có xác nhận xóa ${this.todolist[i].name} không?`);
                this.todolist.splice(i, 1);
            }
        }
        localStorage.setItem("todolist", JSON.stringify(this.todolist));
        this.renderJob();
    }
}
let todolist1 = new TodoList();
todolist1.todolist = [
    {
        id: Math.floor(Math.random() * 9999999999),
        name: "Code",
        completed: true,
    }
];
todolist1.renderJob();
todolist1.renderJob();
// Hàm xóa
function deleteJob(id) {
    todolist1.deleteJob(id);
}
// Hàm thêm
function createJob() {
    todolist1.createJob();
    todolist1.renderJob();
}
