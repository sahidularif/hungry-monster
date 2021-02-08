
// Themealdb API & Input Value
const NameApi = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const letterApi = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const idApi = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

// Search Meal Result..
function searchMealItem() {
    const searchKeyword = document.getElementById("search-keyword").value;
    
    if (searchKeyword !== '') {
        document.getElementById('error-msg').innerText = '';
        
        if(searchKeyword.length == 1){
           let url = `${letterApi}${searchKeyword}`;
           searchMeal(url);
        }
        else{
            let url = `${NameApi}${searchKeyword}`;
            searchMeal(url);
        }

    } 
    else {
        // Error message if input text is empty        
        let msg = document.getElementById('error-msg');
        msg.innerText = 'Please type your search keyword !!!'
        let parentDiv = document.getElementById("parent-div").innerHTML = ""; 
    }

}

// Display meal details API

const displayMealDetails = idMeal => {
    let displayMealDetails = document.getElementById("display-meal-details").innerHTML = "";
    fetch(`${idApi}${idMeal}`)
        .then(response => response.json())
        .then(data => showMealRecipe(data.meals));
}

// Display Meals Details Function
function showMealRecipe(meal) {
    meal = meal[0];
    let displayMealDetails = document.getElementById('display-meal-details');
    const displayMeal = document.createElement('div');
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } 
        else {
           
            break;
        }
    }
    displayMeal.innerHTML = `
                <div id="meal-recipe-details" >
                    <div class="meal-img" id="meal-img"> 
                        <img src="${meal.strMealThumb}">
                    </div>
                    <div id="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <h5>Ingredients</h5>
                        
                        ${ingredients.map(ingredient => `<li id="ingredient"><i class="far fa-check-circle"></i> &nbsp; ${ingredient}</li>`).join('')}
                                               
                        
                    </div>
                </div>
            `;
    displayMealDetails.appendChild(displayMeal);
}

// Search User Meals

function searchMeal(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => getMealList(data))

    let parentDiv = document.getElementById("parent-div").innerHTML = ""; 
    let displayMealDetails = document.getElementById("display-meal-details").innerHTML = "";

    const getMealList = data => {

        if (data.meals == null) {
            document.getElementById('error-msg').innerText = 'No meals found...!!!';
        } 
        else {
            data.meals.forEach(meal => {

                let parentDiv = document.getElementById("parent-div");
                const mealItem = document.createElement('div');
                let mealInfo = `            
                        <div onclick="displayMealDetails('${meal.idMeal}')" id="meal-details" >
                       
                            <div class="meal-img" id="meal-img"> 
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            </div>
                            <div class="meal-name">
                                <h4>${meal.strMeal}</h4>                                        
                            </div>
                        </div> `;
                mealItem.innerHTML = mealInfo;
                parentDiv.appendChild(mealItem);
            });
        }
    }
}

