// Aplikacija TO-DO lista
// Zavrsiti sa casa (26.08.2021) zapocetu aplikaziju za to-do listu koja treba da poseduje sledece funkcionalnosti:
// 1. Podaci iz niza se prikazuju na stranici (lista to-do itema)
// 2. Ima formu/input za unos novih podataka (to-do itema) u niz (automatski se azurira i prikaz na stranici)
// 3. Svaki item sadrzi sledece :
//      - id
//      - opis (desc)
//      - iformaciju da li je uradjen ili ne (done)
// 4. Na stranici za svaki item se prikazuje text - opis i checkbox polje koje menja stanje itema (uradjeno-neuradjeno),
// kao i dugme za brisanje itema. Kada je item uradjen (done == true) tekst (desc) itema se precrta (ili se na neki drugi
// nacin naznaci da je item uradjen).

import myData from "./service.js";

const submitForm = document.querySelector(".todoForm");
const inputField = document.querySelector(".inputField");
const todoStatus = Array.from(document.getElementsByName("todoStatus"));
const todoList = document.querySelector(".todoList");

// dodavanje niza na DOM
function addDataToDom(data, todoList) {
  todoList.innerHTML = "";
  data.forEach(function (todo) {
    let singleTodo = document.createElement("div");
    singleTodo.classList.add("singleTodo");

    let todoDesc = document.createElement("p");
    todoDesc.classList = "todoDesc";
    todoDesc.textContent = todo.desc;

    let checker = document.createElement("input");
    checker.type = "checkbox";
    checker.classList.add("checker");

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "Delete Task";

    let thisOneIsDone = document.createElement("p");
    thisOneIsDone.classList.add("thisOneIsDone");
    thisOneIsDone.textContent =
      "Pending. Check the above box when you complete it.";

    singleTodo.append(todoDesc, checker, deleteBtn, thisOneIsDone);
    todoList.append(singleTodo);

    if (todo.done) {
      singleTodo.classList.add("done");
      thisOneIsDone.textContent = "This one is done.";
      checker.checked = true;
    }

    checker.addEventListener("change", function (e) {
      singleTodo.classList.toggle("done");
      if (checker.checked) {
        thisOneIsDone.textContent = "This one is done.";
        todo.done = true;
        console.log(todo);
      } else {
        thisOneIsDone.textContent =
          "Pending. Check the above box when you complete it.";
        todo.done = false;
        console.log(todo);
      }
    });

    deleteBtn.addEventListener("click", function (e) {
      singleTodo.remove();
      myData.deleteById(todo.id);
      console.log(data);
    });
  });
}
addDataToDom(myData.data, todoList);

console.log(myData.data.length);

function newItem(inputField, todoStatus) {
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const chosenStatus = todoStatus.find((element) => element.checked);

    let newTodo = {
      desc: inputField.value,
      done: chosenStatus.id == "done" ? true : false,
    };
    console.log(newTodo);
    myData.add(newTodo);
    console.log(myData.data);
    addDataToDom(myData.data, todoList);
    inputField.value = "";
  });
}
newItem(inputField, todoStatus);
