class Users {
    name = '';
    surname = '';
    tasks: {name: string, date: number}[] = [    {name: "Купить колбасу", date: 0},
    {name: "Посетить спортзал", date: 0},
    {name: "Найти работу", date: 0},
    {name: "Прочитать что-то", date: 0},
];
    constructor(name: string, surname: string) {
        this.name = name;
        this.surname = surname;
    }

    getTasks() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.tasks), 500)
        })
    }

    setTasks(data: {name: string, date: number}) {
        this.tasks.push(data)
    }
}

export default Users;