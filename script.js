document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById('task'),
        add = document.querySelector('.list__button'),
        wrapper = document.querySelector(".item__wrapper"),
        select = document.querySelector(".list__select");

    let itemCounter = 1;
    let activeTaskList = Array.from(localStorage.getItem("active").split(",")),
        doneTaskList = [],
        deletedTaskList = [];

    function createElement(counter, task) {
        const element = document.createElement('li');
        element.classList.add("item__task");
        element.innerHTML = `
            <p class="item__word">${counter + 1}) ${task}</p>
            <img src="delete.svg" alt="del" class="item__delete">
            <img src="done.svg" alt="del" class="item__done">
            `;
        return element;
    }
    if (activeTaskList[0] == [""]) {
        activeTaskList.shift();
    }

    activeTaskList.forEach((item, i = 1) => {
        wrapper.append(createElement(i, item));
    });

    add.addEventListener('click', function () {
        if (input.value && input.value != "Input your task please!") {
            activeTaskList.push(input.value);
            localStorage.setItem("active", activeTaskList);
            wrapper.innerHTML = "";
            activeTaskList.forEach((item, i = 1) => {
                wrapper.append(createElement(i, item));
            });
            input.value = "";
        } else {
            input.style.color = "red";
            input.value = "Input your task please!";
            setTimeout(() => {
                input.style.color = "black";
                input.value = "";
            }, 300);
        }
    });

    function reloadList(arr) {
        wrapper.innerHTML = "";
        arr.forEach((item, i = 1) => {
            wrapper.append(createElement(i, item));
        });
    }
    select.addEventListener('change', () => {
        if (select.value == "Active") {
            reloadList(activeTaskList);
        } else if (select.value == "Done") {
            reloadList(doneTaskList);
            wrapper.querySelectorAll("img").forEach(item => {
                item.style.display = "none";
            });
        } else if (select.value == "Deleted") {
            reloadList(deletedTaskList);
            wrapper.querySelectorAll("img").forEach(item => {
                item.style.display = "none";
            });
        }
    });

    function addTask() {
        activeTaskList.forEach((item, i = 1) => {
            wrapper.append(createElement(i, item));
        });
    }

    wrapper.addEventListener("click", (event) => {
        const del = document.querySelectorAll(".item__delete"),
            done = document.querySelectorAll(".item__done");
        if (event.target && event.target.classList.contains("item__delete")) {
            wrapper.innerHTML = "";
            del.forEach((item, i) => {
                if (event.target == item) {
                    deletedTaskList.push(activeTaskList.splice(i, 1));
                }
                localStorage.setItem("active", activeTaskList);
                localStorage.setItem("delete", deletedTaskList);
            });
            addTask();
        } else if (event.target && event.target.classList.contains("item__done")) {
            wrapper.innerHTML = "";
            done.forEach((item, i) => {
                if (event.target == item) {
                    doneTaskList.push(activeTaskList.splice(i, 1));
                }
                localStorage.setItem("active", activeTaskList);
                localStorage.setItem("done", doneTaskList);
            });
            addTask();
        }
    });


    wrapper.addEventListener("mouseover", (e) => {
        if (e.target && e.target.classList.contains("item__delete")) {
            wrapper.querySelectorAll(".item__delete").forEach((item, i) => {
                if (e.target == item) {
                    wrapper.querySelectorAll("P")[i].classList.add("item__word_del");
                }
            });
        } else if (e.target && e.target.classList.contains("item__done")) {
            wrapper.querySelectorAll(".item__done").forEach((item, i) => {
                if (e.target == item) {
                    wrapper.querySelectorAll("P")[i].classList.add("item__word_done");
                }
            });
        }
        else {
            wrapper.querySelectorAll(".item__delete").forEach((item, i) => {
                wrapper.querySelectorAll("P")[i].classList.remove("item__word_del");
                wrapper.querySelectorAll("P")[i].classList.remove("item__word_done");
            });
        }
    });


    // wrapper.addEventListener("mouseover", (e) => {
    //     if (e.target && e.target.classList.contains("item__task")) {
    //         wrapper.querySelectorAll(".item__task").forEach(item => {
    //             if (e.target === item) {
    //                 item.querySelector(".item__delete").classList.add("item__delete_hover");
    //                 console.log(1);
    //             }
    //         });
    //     } else {
    //         wrapper.querySelectorAll(".item__task").forEach(item => {
    //             item.querySelector(".item__delete").classList.remove("item__delete_hover");
    //             console.log(1);
    //         });
    //     }
    // });
});
