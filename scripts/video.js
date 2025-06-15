// fetch, load and show categories on html
// create loadCategories()
// create DisplayCategories()

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data))
    .catch((error) => console.log(error));
};

const displayCategories = (data) => {
  const categoriesBtnContainer = document.getElementById(
    "category-btn-container"
  );
  data.categories.forEach((item) => {
    const categoryBtnDiv = document.createElement("div");
    categoryBtnDiv.innerHTML = `
    <button class="btn">${item.category}</button>
    `;
    categoriesBtnContainer.append(categoryBtnDiv);
  });
};

loadCategories();
