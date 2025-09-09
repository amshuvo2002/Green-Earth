let allPlants = []
let cart = []

// Categories load section
const loadCategorise = () => {
  const url = `https://openapi.programming-hero.com/api/categories`
  fetch(url)
    .then(res => res.json())
    .then(json => {
      displayCategories(json.categories)
    });
};

const displayCategories = (categories) => {
  const allCategories = document.getElementById("all-Categories");
  allCategories.innerHTML = `
    <li class="hover:bg-[#15803D] hover:text-white p-1 pl-2 rounded-lg cursor-pointer bg-[#15803D] text-white" data-category="All Trees">
      All Trees
    </li>
  `

  categories.forEach(categorie => {
    allCategories.innerHTML += `
      <li class="hover:bg-[#15803D] hover:text-white p-1 pl-2 rounded-lg cursor-pointer" data-category="${categorie.category_name}">
        ${categorie.category_name}
      </li>
    `
  })

  const categoryItems = allCategories.querySelectorAll("li")
  categoryItems.forEach(item => {
    item.addEventListener("click", () => {
      categoryItems.forEach(i => i.classList.remove("text-white", "bg-[#15803D]"))
      item.classList.add("bg-[#15803D]", "text-white");
      const selectedCategory = item.getAttribute("data-category");

      showLoading()
      setTimeout(() => {
        filterPlants(selectedCategory)
        hideLoading()
      }, 800);
    })
  })
}

// Plants load section
const loadPlants = () => {
  const url = `https://openapi.programming-hero.com/api/plants`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      allPlants = data.plants;
      displayPlants(allPlants);
    })
}

const filterPlants = (category) => {
  if (category === "All Trees") {
    displayPlants(allPlants)
  } else {
    const filtered = allPlants.filter(p => p.category === category)
    displayPlants(filtered)
  }
}

// Show spinner section
const showLoading = () => {
  document.getElementById("spin").classList.remove("hidden")
}
const hideLoading = () => {
  document.getElementById("spin").classList.add("hidden")
}

// Display Plants section
const displayPlants = (plants) => {
  const allCards = document.getElementById("all-cards")
  allCards.innerHTML = ""

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
              data-price="${plant.price}">
              ${plant.name}
          </h2>
          <p class="text-xs text-gray-500 mt-1">${plant.description.substring(0, 60)}...</p>
          <div class="flex justify-between items-center mt-4">
            <h1 class="bg-[#DCFCE7] text-[#15803D] text-sm px-2 py-1 rounded-2xl">${plant.category}</h1>
            <h1 class="text-sm">৳${plant.price}</h1>
          </div>
          <button class="cart-btn bg-[#15803D] text-white rounded-2xl w-full p-1 mt-3">Add to Cart</button>
        </div>
      </div>
    `
  }

  // Modal section
  const plantNames = document.querySelectorAll(".plant-name")
  plantNames.forEach(name => {
    name.addEventListener("click", () => {
      const modal = document.getElementById("tree-modal");
      document.getElementById("modal-image").src = name.getAttribute("data-image")
      document.getElementById("modal-name").innerText = name.getAttribute("data-name")
      document.getElementById("modal-description").innerText = name.getAttribute("data-description")
      document.getElementById("modal-category").innerText = name.getAttribute("data-category")
      document.getElementById("modal-price").innerText = `৳${name.getAttribute("data-price")}`
      modal.checked = true;
    })
  })

  // Add to Cart section
  const cartButtons = document.querySelectorAll(".cart-btn")
  cartButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const parent = e.target.closest("div")
      const name = parent.querySelector(".plant-name").dataset.name
      const price = parseFloat(parent.querySelector(".plant-name").dataset.price)

      cart.push({ name, price })
      alert(`✅${name} added to cart!`)
      updateCartUI()
    })
  })
}
// Update Cart UI section
const updateCartUI = () => {
  const cartSection = document.getElementById("cart-section")
  const cartTotal = document.getElementById("cart-total").querySelector("p:last-child")

  cartSection.innerHTML = ""
  let total = 0

  cart.forEach((item, index) => {
    total += item.price
    cartSection.innerHTML += `
  <div class="flex justify-between items-center gap-10 bg-[#F0FDF4] mb-2 p-2 rounded">
    <div>
      <h1 class="text-sm">${item.name}</h1>
      <h1 class="text-sm">৳${item.price} x 1</h1>
    </div>
    <button class="remove-btn text-red-500 font-bold" data-index="${index}">❌</button>
  </div>
`

  })

  cartTotal.innerText = `৳${total}`;

  // Remove btns section
  const removeButtons = document.querySelectorAll(".remove-btn")
  removeButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index")
      cart.splice(idx, 1)
      updateCartUI()
    })
  })
}


loadCategorise()
loadPlants()
 