import "./style.css";
console.warn("start app");

const apiEndpoint = "data/recipes.json";
const display = document.querySelector("#display-data");
const input = document.querySelector("#input");

// //Function to split input into an array of ingredients
// const splitInput = input => {
//   return input.split(",").map(ingredient => ingredient.trim());
// };

const splitInput = input => {
  const ingredientsArray = [];
  let currentIngredient = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      ingredientsArray.push(currentIngredient.trim());
      currentIngredient = "";
    } else {
      currentIngredient += char;
    }
  }

  ingredientsArray.push(currentIngredient.trim());
  return ingredientsArray.filter(ingredient => ingredient !== ""); // Filter out empty strings
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

//Function to get data from json and insert it
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
      const { image, name, type, ingredients, instructions, time } = object;

      return `
    <div class= "container">
       <div class="image-container"> 
         <img src="${image}" alt="${name} Image" style= "width:300px; position: relative; filter: brightness(80%);
          border-radius: 7%; border-top-left-radius: 7%; margin-right: 20px; margin-top: 20px;">
        </div>
        <div class="text-container"> 
          <p> <strong>Name:</strong> ${name}
          <p> <strong>Type of meal:</strong> ${type}</p>
          <p> <strong>Ingredients:</strong> ${ingredients}</p>
          <p> <strong>Instructions:</strong> ${instructions}</p>
          <p> <strong>Cooking Time:</strong> ${time}</p>
    </div>
    <hr>
    `;
    })
    .join("");

  display.innerHTML = dataDisplay;
};

const displayAllRecipes = async () => {
  const payload = await getData();
  const recipeContainer = document.getElementById("recipe-results");

  payload.forEach((recipe, index) => {
    const div = document.createElement("div");
    div.classList.add("tooltip");

    const img = document.createElement("img");
    img.classList.add("recipe-img");
    img.src = recipe.image;
    img.alt = recipe.name;
    img.name = recipe.name;

    const span = document.createElement("span");
    span.classList.add("tooltiptext");
    span.textContent = `> ${recipe.time}`;

    const pName = document.createElement("p");
    pName.classList.add("recipe-name");
    pName.textContent = recipe.name;

    const button = document.createElement("button");
    button.setAttribute("type", "menu");
    button.classList.add("view-btn");
    button.dataset.recipeIndex = index;
    button.textContent = "View";
    button.addEventListener("click", async () => {
      try {
        displayRecipe(recipe);
      } catch (error) {
        console.error("Error:", error);
      }
    });

    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(pName);
    div.appendChild(button);

    recipeContainer.appendChild(div);
  });
};

// Start View recipe modal
function displayRecipe(recipe) {
  var modal = document.getElementById("myModal");
  var modalTitle = document.getElementById("modal-title");
  var body = modal.querySelector(".modal-body");

  var img = document.createElement("img");
  img.src = recipe.image;
  img.classList.add("modal-image");

  modalTitle.textContent = recipe.name;
  body.innerHTML = `
    <div>
    <img class="modal-img" src="${recipe.image}" alt="${recipe.name}" style= "width:250px; margin-right: 20px; margin-top: 20px;"" />
    </div>
    <div>
      <p><strong>Type:</strong> ${recipe.type}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <p><strong>Time:</strong> ${recipe.time}</p> 
    </div>
  `;

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

// Event listener to open the modal when button is clicked
document.getElementById("openModal").addEventListener("click", function () {
  console.log("click");
  var modal = document.getElementById("modal1");
  modal.style.display = "block";
});

// Close modal when "x" button is clicked
document.querySelector(".close1").addEventListener("click", function () {
  var modal = document.getElementById("modal1");
  modal.style.display = "none";
});

if (window.location.hash === "#modal1") {
  window.location.hash = "";
}

displayRecipes();

// Call displayAllRecipes function when the page loads
window.addEventListener("load", displayAllRecipes);

input.addEventListener("input", () => {
  displayRecipes();
});
