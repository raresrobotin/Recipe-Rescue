import "./style.css";
console.warn("start app");

const apiEndpoint = "recipes.json";
const display = document.querySelector("#display-data");
const input = document.querySelector("#input");

//get data from json and insert it
const getData = async () => {
  const res = await fetch(apiEndpoint);
  const data = await res.json();
  //console.log(data);
  return data;
};

const displayRecipes = async () => {
  let query = input.value;
  //console.log("Query::", query);

  const payload = await getData();

  let dataDisplay = payload
    .filter(eventData => {
      if (query === "") {
        return false;
      } else if (eventData.ingredients.toLowerCase().includes(query.toLowerCase())) {
        return eventData;
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
