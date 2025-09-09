let allPlants = []; // সব plants store করার জন্য

// categories section
const loadCategorise = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
        .then(res => res.json())
        .then(json => {
            displayCategories(json.categories);
        });
}

const displayCategories = (categories) => {
    const allCategories = document.getElementById("all-Categories");
    allCategories.innerHTML = `
      <li class="hover:bg-[#15803D] hover:text-white p-1 pl-2 rounded-lg cursor-pointer active" data-category="All Trees">
          All Trees
      </li>
    `;

    categories.forEach(categorie => {
        allCategories.innerHTML += `
          <li class="hover:bg-[#15803D] hover:text-white p-1 pl-2 rounded-lg cursor-pointer" data-category="${categorie.category_name}">
              ${categorie.category_name}
          </li>
        `;
    });

    // click event to filter plants
    const categoryItems = allCategories.querySelectorAll("li");
    categoryItems.forEach(item => {
        item.addEventListener("click", () => {
            // active class handling
            categoryItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            const selectedCategory = item.getAttribute("data-category");
            filterPlants(selectedCategory);
        });
    });
}

// card section
const loadPlants = () => {
    const url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allPlants = data.plants; // save all plants
            displayPlants(allPlants); // by default show all
        });
}

const displayPlant = (plants) => {
    const allCards = document.getElementById("all-cards");
    allCards.innerHTML = "";

    for (let plant of plants) {
        allCards.innerHTML += `
        <div class="bg-base-100 shadow-sm p-4 rounded-lg w-full sm:w-[250px] md:w-[290px]">
            <figure>
                <img src="${plant.image}" alt="${plant.name}" class="rounded-xl w-full h-40 object-cover" />
            </figure>
            <div class="mt-4">
                <h2 class="font-bold text-[#1F2937]">${plant.name}</h2>
                <p class="text-xs text-gray-500 mt-1">${plant.description}</p>
                <div class="flex justify-between items-center mt-4">
                    <h1 class="bg-[#DCFCE7] text-[#15803D] text-sm px-2 py-1 rounded-2xl">${plant.category}</h1>
                    <h1 class="text-sm">৳${plant.price}</h1>
                </div>
                <button class="bg-[#15803D] text-white rounded-2xl w-full p-1 mt-3">Add to Cart</button>
            </div>
        </div>
        `;
    }
}






// filter plants by category
const filterPlants = (category) => {
    if(category === "All Trees") {
        displayPlants(allPlants);
    } else {
        const filtered = allPlants.filter(p => p.category === category);
        displayPlants(filtered);
    }
}

// initialize
loadCategorise();
loadPlants();


const displayPlants = (plants) => {
    const allCards = document.getElementById("all-cards");
    allCards.innerHTML = "";

    for (let plant of plants) {
        allCards.innerHTML += `
        <div class="bg-base-100 shadow-sm p-4 rounded-lg w-full sm:w-[250px] md:w-[290px]">
            <figure>
                <img src="${plant.image}" alt="${plant.name}" class="rounded-xl w-full h-40 object-cover" />
            </figure>
            <div class="mt-4">
                <h2 class="font-bold text-[#1F2937] cursor-pointer plant-name" 
                    data-name="${plant.name}"
                    data-image="${plant.image}"
                    data-description="${plant.description}"
                    data-category="${plant.category}"
                    data-price="${plant.price}"
                >${plant.name}</h2>
                <p class="text-xs text-gray-500 mt-1">${plant.description.substring(0, 60)}...</p>
                <div class="flex justify-between items-center mt-4">
                    <h1 class="bg-[#DCFCE7] text-[#15803D] text-sm px-2 py-1 rounded-2xl">${plant.category}</h1>
                    <h1 class="text-sm">৳${plant.price}</h1>
                </div>
                <button class="bg-[#15803D] text-white rounded-2xl w-full p-1 mt-3">Add to Cart</button>
            </div>
        </div>
        `;
    }


 // modal section
    const plantNames = document.querySelectorAll(".plant-name");
    plantNames.forEach(name => {
        name.addEventListener("click", () => {
            const modal = document.getElementById("tree-modal");
            document.getElementById("modal-image").src = name.getAttribute("data-image");
            document.getElementById("modal-name").innerText = name.getAttribute("data-name");
            document.getElementById("modal-description").innerText = name.getAttribute("data-description");
            document.getElementById("modal-category").innerText = name.getAttribute("data-category");
            document.getElementById("modal-price").innerText = `৳${name.getAttribute("data-price")}`;
            
            modal.checked = true;
        });
    });
}
