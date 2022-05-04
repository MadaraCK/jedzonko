// Program wyswietlajacy wiadomosc powitalna z prosba o podanie imienia i dodajacy ja do localStorage
// Jesli imie jest podane w localStorage- div nie wyswietli sie

const firstTimeMessageDiv = document.querySelector(".hero .message");
const firstTimeMessageForm = document.querySelector(".message .message__container")
const firstTimeInput = document.querySelector(".message__container--input");
const personNameSpan = document.querySelector(".person__name")

const addRecipe = document.querySelector('.widget_recipe') //
const addPlans = document.querySelector('.widget_plan') //
const widget = document.querySelector('.widget_box')
const showRecipe = document.querySelector('.hide_recipe')
const showPlan = document.querySelector('.hideClass_plan')
const pulpit = document.querySelector('.pulpit')
const recipe = document.querySelector('.recipes_js')
const listRecipe = document.querySelector('.listClass')
const plans = document.querySelector('.plans')
const showPlans = document.querySelector('.hidePlans')


const personName = localStorage.getItem("personName");
if (personName === null) {
    firstTimeMessageDiv.classList.remove("hideClass");

    firstTimeMessageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem("personName", firstTimeInput.value);
        personNameSpan.textContent = firstTimeInput.value;

        firstTimeMessageDiv.classList.add("hideClass");
    })
} else {
    personNameSpan.textContent = personName;
}


//Kolejny program ktory bedziemy pisac..
function removeWidget() {
    widget.style.display = "none";
}

function addAtr() {
    showRecipe.classList.add("hide_recipe");
    showPlan.classList.add("hideClass_plan");
    listRecipe.classList.add("listClass")
    showPlans.classList.add('hidePlans')

}


addRecipe.addEventListener("click", e => {
    removeWidget()
    showRecipe.classList.remove("hide_recipe");
})
addPlans.addEventListener("click", e => {
    removeWidget()
    showPlan.classList.remove("hideClass_plan");
})
pulpit.addEventListener("click", e => {
    widget.style.display = "block";

    addAtr()
})
recipe.addEventListener("click", e => {
    removeWidget()
    listRecipe.classList.remove("listClass")
    showRecipe.classList.add("hide_recipe");
    showPlan.classList.add("hideClass_plan");
    showPlans.classList.add('hidePlans')



})


plans.addEventListener("click", e => {
    removeWidget()

    addAtr()
    showPlans.classList.remove('hidePlans')
    removeWidget()
})


//Dodawanie nowego planu do local storage
const newPlanSection = document.querySelector(".new-plan__box");
const addPlanBtn = document.querySelector(".new-plan__heading-btn");
const addPlanForm = document.querySelector(".new-plan__form");
const planTitle = document.querySelector("#plan-name");
const planDescription = document.querySelector("#plan-description");
const planWeekNumber = document.querySelector("#plan-number");
const mondayDishes = document.querySelector(".new-plan__monday-tr").children;
const addPlanFormElements = [...addPlanForm.elements];

//Klasa tworzaca plan wraz z metodami
class Plan {
    constructor(title, description, weekNumber) {
        this.title = title;
        this.description = description;
        this.weekNumber = weekNumber;
        this.monday = [];
        this.tuesday = [];
        this.wednesday = [];
        this.thursday = [];
        this.friday = [];
        this.saturday = [];
        this.sunday = [];
    }

    addMonday(array) {
        const newArr = array.filter((element, index) => index > 3 && index < 9);
        newArr.forEach((element) =>   this.monday.push(element));
    };

    addTuesday(array) {
        const newArr = array.filter((element, index) => index > 8 && index < 14);
        newArr.forEach((element) =>   this.tuesday.push(element));
    };

    addWednesday(array) {
        const newArr = array.filter((element, index) => index > 13 && index < 19);
        newArr.forEach((element) =>   this.wednesday.push(element));
    };

    addThursday(array) {
        const newArr = array.filter((element, index) => index > 18 && index < 24);
        newArr.forEach((element) =>   this.thursday.push(element));
    };

    addFriday(array) {
        const newArr = array.filter((element, index) => index > 23 && index < 29);
        newArr.forEach((element) =>   this.friday.push(element));
    };

    addSaturday(array) {
        const newArr = array.filter((element, index) => index > 28 && index < 34);
        newArr.forEach((element) =>   this.saturday.push(element));
    };

    addSunday(array) {
        const newArr = array.filter((element, index) => index > 33 && index < 39);
        newArr.forEach((element) =>   this.sunday.push(element));
    };

    //Metoda sprawdzajaca czy juz sa przepisy i dodajaca nowe
    saveRecipeToLocalStorage() {
        let dataFromLocalStorage = [];

        if (localStorage.getItem("recipes") !== null) {
            dataFromLocalStorage = JSON.parse(localStorage.getItem("recipes"));
            dataFromLocalStorage.push(this);
            localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));

        } else {
            dataFromLocalStorage.push(this);
            localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
        };

        alert("Zapisano nowy przepis do localStorage")
    };

};

//Glowna funkcja do zapisywania localStorage
function savePlanToLocalStorage(event) {
    event.preventDefault();
    const addPlanFormValues = addPlanFormElements
        .map((element) => element.value);

    const newObj = new Plan(planTitle.value, planDescription.value, planWeekNumber.value);
    newObj.addMonday(addPlanFormValues);
    newObj.addTuesday(addPlanFormValues);
    newObj.addWednesday(addPlanFormValues);
    newObj.addThursday(addPlanFormValues);
    newObj.addFriday(addPlanFormValues);
    newObj.addSaturday(addPlanFormValues);
    newObj.addSunday(addPlanFormValues);

    newObj.saveRecipeToLocalStorage();

    // newPlanSection.classList.add("hideClass_plan");
};


addPlanForm.addEventListener("submit", savePlanToLocalStorage);


//Dodawanie nowego przepisu do localStorage

const btnSaveAndClose = document.querySelector(".close_recipe");
const inputNameRecipe = document.querySelector(".input_text_recipe");
const descriptionRecipe = document.querySelector(".text_area_recipe");
const inputInstructions = document.querySelector(".instructions");
const inputIngredients = document.querySelector(".ingredients");
const btnAddInstruction = document.querySelector(".add_instructions");
const btnAddIngredients = document.querySelector(".add_ingrediens");
const olInstructions = document.querySelector(".ol_instructions");
const olIngredients= document.querySelector(".ol_ingredients");

class Recipe{
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.instructions = [];
        this.ingredients = [];
    }

    addInstruction(instruction){
        this.instructions.push(instruction);
    }

    addIngredients(ingredient){
        this.ingredients.push(ingredient);
    }
}


btnAddInstruction.addEventListener('click' ,function(e) {
    e.preventDefault();
    // zupa.addInstruction(inputInstructions.value);
    const li = document.createElement('li');
    const aEditRecipe = document.createElement('a');
    aEditRecipe.classList.add('edit_recipe');
    aEditRecipe.href = '#';
    const iEdit = document.createElement('i');
    iEdit.classList.add('fa-regular');
    iEdit.classList.add('fa-pen-to-square');
    const aDeleteRecipe = document.createElement('a');
    aDeleteRecipe.classList.add('delete_recipe');
    aDeleteRecipe.href = '#';
    const iDelete = document.createElement('i');
    iDelete.classList.add('fa-solid');
    iDelete.classList.add('fa-trash-can');
    li.textContent = inputInstructions.value;
    olInstructions.appendChild(li);
    li.append(aEditRecipe);
    li.append(aDeleteRecipe);
    aEditRecipe.appendChild(iEdit);
    aDeleteRecipe.appendChild(iDelete);
    inputInstructions.value = '';
});

btnAddIngredients.addEventListener('click' ,function(e) {
    e.preventDefault();
    // zupa.addInstruction(inputInstructions.value);
    const li = document.createElement('li');
    const aEditRecipe = document.createElement('a');
    aEditRecipe.classList.add('edit_recipe');
    aEditRecipe.href = '#';
    const iEdit = document.createElement('i');
    iEdit.classList.add('fa-regular');
    iEdit.classList.add('fa-pen-to-square');
    const aDeleteRecipe = document.createElement('a');
    aDeleteRecipe.classList.add('delete_recipe');
    aDeleteRecipe.href = '#';
    const iDelete = document.createElement('i');
    iDelete.classList.add('fa-solid');
    iDelete.classList.add('fa-trash-can');
    li.textContent = inputIngredients.value;
    olIngredients.appendChild(li);
    li.append(aEditRecipe);
    li.append(aDeleteRecipe);
    aEditRecipe.appendChild(iEdit);
    aDeleteRecipe.appendChild(iDelete);
    inputIngredients.value = '';
});

btnSaveAndClose.addEventListener('click', function () {
   const newRecipe = new Recipe(inputNameRecipe.value, descriptionRecipe.value);
   const instructions = [...document.querySelectorAll('.ol_instructions li')];
   instructions.forEach((item) => newRecipe.instructions.push(item.textContent) );

    const ingredients = [...document.querySelectorAll('.ol_ingredients li')];
    ingredients.forEach((item) => newRecipe.ingredients.push(item.textContent) );

    // localStorage.setItem('przepis', JSON.stringify(newRecipe));

    let dataFromLocalStorage = [];
    if (localStorage.getItem("newRecipe") !== null) {
        dataFromLocalStorage = JSON.parse(localStorage.getItem("newRecipe"));
        dataFromLocalStorage.push(newRecipe);
        localStorage.setItem("newRecipe", JSON.stringify(dataFromLocalStorage));

    } else {
        dataFromLocalStorage.push(newRecipe);
        localStorage.setItem("newRecipe", JSON.stringify(dataFromLocalStorage));
    };

    alert("Zapisano nowy przepis do localStorage");

    inputNameRecipe.value = '';
    descriptionRecipe.value = '';

});



//Kolejny program do napisania ..

