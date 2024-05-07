interface ITodoList{
    id: number;
    name: string;
    completed: boolean;
}

// Triển khai interface 
class TodoList{
    todolist: ITodoList[]
    constructor(){
        let data:string|null = localStorage.getItem("todolist");
        if(data){
            this.todolist = JSON.parse(data);
        }else{
            this.todolist = [];
        }
    }

    // Lưu dữ liệu lên local
    saveTodoList(): void {
        localStorage.setItem("todolist", JSON.stringify(this.todolist));
    }

    // Render dữ liệu
    renderJob(): void{
        let data: string|null = localStorage.getItem("todolist");
        if(data){
            this.todolist = JSON.parse(data);
        }else{
            this.todolist = [];
        }

        let text = ``;
        let body = (<HTMLInputElement>document.getElementById("body"));
        for(let i=0;i<this.todolist.length;i++){
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

    createJob():void{
        let name:string = (<HTMLInputElement>document.getElementById("input")).value;
        if((<HTMLInputElement>document.getElementById("input")).value == ""){
            alert("Không được để trống tên.");
        }else{
            let completed:boolean = true;
            let id:number = Math.floor(Math.random()*9999999999999);
            let newJob = {
                name:name,
                completed:completed,
                id:id,
            }
            this.todolist.push(newJob);
            (<HTMLInputElement>document.getElementById("input")).value = "";
            localStorage.setItem("todolist", JSON.stringify(this.todolist));
        }

    }

    deleteJob(id:number):void{
        for(let i = 0; i < this.todolist.length; i++){
            if(id == this.todolist[i].id){
                confirm(`Bạn có xác nhận xóa ${this.todolist[i].name} không?`)
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
        id: Math.floor(Math.random()*9999999999),
        name: "Code",
        completed: true,
    }
];
todolist1.renderJob();
todolist1.renderJob();
// Hàm xóa
function deleteJob(id:number){
    todolist1.deleteJob(id);
}
// Hàm thêm
function createJob(){
    todolist1.createJob();
    todolist1.renderJob();
}