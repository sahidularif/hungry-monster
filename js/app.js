// Search Meal Result..
function searchMealItem() {
    const searchKeyword = document.getElementById("search-keyword").value;

    if (searchKeyword !== '') {
        document.getElementById('error-msg').innerText = '';

        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchKeyword + '')
            .then(res => res.json())
            .then(data => getMealList(data))

        let parentDiv = document.getElementById("parent-div").innerHTML = ""; //msg
        let displayMealDetails = document.getElementById("display-meal-details").innerHTML = "";

        const getMealList = data => {

            if (data.meals == null) {
                document.getElementById('error-msg').innerText = 'No meals found...';
            } else {
                data.meals.forEach(meal => {

                    let parentDiv = document.getElementById("parent-div");
                    const mealItem = document.createElement('div');
                    let mealInfo = `
                                <div id="meal-details" >
                                    <div class="meal-img" id="meal-img"> 
                                        <img onclick="displayMealDetails('${meal.idMeal}')" src="${meal.strMealThumb}" alt="${meal.strMeal}">
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
    } else {
        console.log('Please enter your search name');
        let msg = document.getElementById('error-msg');
        msg.innerText = 'Please type your search keyword!'
        let parentDiv = document.getElementById("parent-div").innerHTML = ""; //msg
    }

}

const displayMealDetails = idMeal => {
    let displayMealDetails = document.getElementById("display-meal-details").innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(response => response.json())
        .then(data => showMealRecipe(data.meals));
}
// Display Meals Details
function showMealRecipe(meal) {
    meal = meal[0];
    let displayMealDetails = document.getElementById('display-meal-details');
    const displayMeal = document.createElement('div');
    displayMeal.innerHTML = `
                <div id="meal-recipe-details" >
                    <div class="meal-img" id="meal-img"> 
                        <img src="${meal.strMealThumb}">
                    </div>
                    <div class="meal-name">
                        <h4>${meal.strMeal}</h4>
                        <h5>Ingredients</h5>
                        <p>${meal.strMeasure1}&nbsp;${meal.strIngredient1}</p>
                        <p>${meal.strMeasure2}&nbsp;${meal.strIngredient2}</p>
                        <p>${meal.strMeasure3}&nbsp;${meal.strIngredient3}</p>
                        <p>${meal.strMeasure4}&nbsp;${meal.strIngredient4}</p>
                        <p>${meal.strMeasure5}&nbsp;${meal.strIngredient5}</p>
                        <p>${meal.strMeasure6}&nbsp;${meal.strIngredient6}</p>
                        <p>${meal.strMeasure7}&nbsp;${meal.strIngredient7}</p>
                        <p>${meal.strMeasure8}&nbsp;${meal.strIngredient8}</p>
                        <p>${meal.strMeasure9}&nbsp;${meal.strIngredient9}</p>
                        <p>${meal.strMeasure10}&nbsp;${meal.strIngredient10}</p>
                        <p>${meal.strMeasure11}&nbsp;${meal.strIngredient11}</p>
                        <p>${meal.strMeasure12}&nbsp;${meal.strIngredient12}</p>
                        <p>${meal.strMeasure13}&nbsp;${meal.strIngredient13}</p>
                        <p>${meal.strMeasure14}&nbsp;${meal.strIngredient14}</p>
                        <p>${meal.strMeasure15}&nbsp;${meal.strIngredient15}</p>
                        <p>${meal.strMeasure16}&nbsp;${meal.strIngredient16}</p>
                        <p>${meal.strMeasure17}&nbsp;${meal.strIngredient17}</p>
                        <p>${meal.strMeasure18}&nbsp;${meal.strIngredient18}</p>
                        <p>${meal.strMeasure19}&nbsp;${meal.strIngredient19}</p>
                        <p>${meal.strMeasure20}&nbsp;${meal.strIngredient20}</p>                       
                        
                    </div>
                </div>
            `;
    displayMealDetails.appendChild(displayMeal);
}