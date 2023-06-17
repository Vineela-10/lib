const books = [{
    id: 1,
    title: "Adventures of Tom Sawyer",
    author: "Mark Twain",
    description: "It tells about many breathataking adventures performed by tom swayer"
},
{
    id: 2,
    title: "Ben Hur",
    author: "Lewis Wallace",
    description: "It explores Ben's life"
},
{
    id: 3,
    title: "India Divided",
    author: "Dr.Rajendhra Prasad",
    description: "It tells about division of India"
},
{
    id: 4,
    title:"A Better India:A Better World",
    author:"R.K.Narayana Murthy",
    description:"It tells about how India can totally change the world to a better version"
},

];

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const cartItems = document.getElementById("cartItems");
const clearCartBtn = document.getElementById("clearCartBtn");

let cart = [];

// Display all books initially
displayBooks(books);

// Event listeners for search, sort, and cart
searchInput.addEventListener("input", handleSearch);
sortSelect.addEventListener("change", handleSort);
bookList.addEventListener("click", addToCart);
clearCartBtn.addEventListener("click", clearCart);

function displayBooks(booksArray) {
// Clear the book list
bookList.innerHTML = "";

booksArray.forEach(book => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book");

    const title = document.createElement("h2");
    title.textContent = book.title;
    bookItem.appendChild(title);

    const author = document.createElement("p");
    author.textContent = "By " + book.author;
    bookItem.appendChild(author);

    const description = document.createElement("p");
    description.textContent = book.description;
    bookItem.appendChild(description);

    const image = document.createElement("img");
    image.src = book.image;
    bookItem.appendChild(image);

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.dataset.id = book.id;
    bookItem.appendChild(addToCartBtn);

    bookList.appendChild(bookItem);
});
}

function handleSearch() {
const searchText = searchInput.value.toLowerCase();

const filteredBooks = books.filter(book => {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();
    return title.includes(searchText) || author.includes(searchText);
});

displayBooks(filteredBooks);
}

function handleSort() {
const sortKey = sortSelect.value;

const sortedBooks = books.sort((a, b) => {
    const itemA = a[sortKey].toLowerCase();
    const itemB = b[sortKey].toLowerCase();

    if (itemA < itemB) {
        return -1;
    }
    if (itemA > itemB) {
        return 1;
    }
    return 0;
});

displayBooks(sortedBooks);
}

function addToCart(event) {
if (event.target.tagName === "BUTTON") {
    const bookId = parseInt(event.target.dataset.id);
    const selectedBook = books.find(book => book.id === bookId);

    if (selectedBook) {
        cart.push(selectedBook);
        updateCartUI();
    }
}
}

function updateCartUI() {
cartItems.innerHTML = "";

cart.forEach(book => {
    const cartItem = document.createElement("li");
    cartItem.textContent = book.title;
    cartItems.appendChild(cartItem);
});
}

function clearCart() {
cart = [];
updateCartUI();
}