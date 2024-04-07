import "./style.css";
console.warn("start app");

const apiEndpoint = "recipes.json";
const display = document.querySelector("#display-data");
const input = document.querySelector("#input");

//Function to split input into an array of ingredients
const splitInput = input => {
  return input.split(",").map(ingredient => ingredient.trim());
};

// Function to check if at least one ingredient matches
const hasMatchingIngredient = (recipeIngredients, queryIngredients) => {
  for (const ingredient of queryIngredients) {
    if (recipeIngredients.toLowerCase().includes(ingredient.toLowerCase())) {
      return true;
    }
  }
  return false;
};

//get data from json and insert it
const getData = async () => {
  const res = await fetch(apiEndpoint);
  const data = await res.json();
  //console.log(data);
  return data;
};

const displayRecipes = async () => {
  let query = input.value;
  let queryIngredients = splitInput(query);
  //console.log("Query::", query);

  const payload = await getData();

  // let dataDisplay = payload
  //   .filter(eventData => {
  //     if (query === "") {
  //       return false;
  //     } else if (eventData.ingredients.toLowerCase().includes(query.toLowerCase())) {
  //       return eventData;
  //     }
  //   })

  let dataDisplay = payload
    .filter(eventData => {
      if (query === "") {
        return false; // Return true to display all recipes when the input is empty
      } else if (hasMatchingIngredient(eventData.ingredients, queryIngredients)) {
        return true;
      } else {
        return false;
      }
    })

    .map(object => {
      const { name, type, ingredients, instructions, time } = object;

      return `
    <div class= "container">
    <p> Name: ${name}</p>
    <p> Type of meal: ${type}</p>
    <p> Ingredients: ${ingredients}</p>
    <p> Instructions: ${instructions}</p>
    <p> Cooking Time: ${time}</p>
    </div>
    <hr>
    `;
    })
    .join("");

  display.innerHTML = dataDisplay;
};
displayRecipes();

input.addEventListener("input", () => {
  displayRecipes();
});

// Start View recipe modal
function displayRecipe(recipe) {
  var modal = document.getElementById("myModal");
  var modalTitle = document.getElementById("modal-title");
  var modalType = document.getElementById("modal-type");
  var modalIngredients = document.getElementById("modal-ingredients");
  var modalInstructions = document.getElementById("modal-instructions");
  var modalTime = document.getElementById("modal-time");

  modalTitle.textContent = recipe.name;
  modalType.textContent = "Type: " + recipe.type;
  modalIngredients.textContent = "Ingredients: " + recipe.ingredients;
  modalInstructions.textContent = "Instructions: " + recipe.instructions;
  modalTime.textContent = "Time: " + recipe.time;

  modal.style.display = "block";

  var closeModalBtn = document.querySelector(".close");
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });
}
var viewButtons = document.querySelectorAll(".view-btn");
viewButtons.forEach(button => {
  button.addEventListener("click", async function () {
    try {
      var response = await fetch("recipes.json");
      var recipes = await response.json();
      var recipeIndex = parseInt(button.dataset.recipeIndex);
      var recipe = recipes[recipeIndex];
      displayRecipe(recipe);
    } catch (error) {
      console.error("Eroare:", error);
    }
  });
});
// End View recipe modal

// // Event listener to open the modal when button is clicked
// document.getElementById("openModal").addEventListener("click", function () {
//   var modal = document.getElementById("modal1");
//   modal.style.display = "block";
// });

// // Close modal when "x" button is clicked
// document.querySelector(".close1").addEventListener("click", function () {
//   var modal = document.getElementById("modal1");
//   modal.style.display = "none";
// });

// if (window.location.hash === "#modal1") {
//   window.location.hash = "";
// }
