// Function to open/close the cart modal
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartList = document.getElementById('cart-list');
const totalPriceElement = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');

document.getElementById('hamburger-menu').addEventListener('click', function() {
    document.getElementById('nav-list').classList.toggle('show');
});

// Cart items array
let cartItems = [];

// Event listener for cart button
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    updateCart();
});

// Event listener for close button
closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const cakeName = e.target.getAttribute('data-name');
        const cakePrice = parseFloat(e.target.getAttribute('data-price'));
        
        // Check if item is already in cart
        const existingItem = cartItems.find(item => item.name === cakeName);
        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity if already in the cart
        } else {
            cartItems.push({ name: cakeName, price: cakePrice, quantity: 1 });
        }
        
        updateCart();
    });
});

// Update the cart modal
function updateCart() {
    // Clear previous items
    cartList.innerHTML = '';
    
    let totalPrice = 0;
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}`;
        cartList.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: ₹${totalPrice.toFixed(2)}`;
    cartBtn.textContent = `Cart (${cartItems.length})`;
}

// Proceed to checkout (Placeholder)
checkoutBtn.addEventListener('click', () => {
    alert('Proceeding to checkout...');
});

// Get modal and close button elements for cake details
const modal = document.getElementById("cake-details-modal");
const closeBtn = document.querySelector(".close");

// Cake data for demonstration (could be dynamic from server or database)
const cakeDetails = {
    1: {
        title: "Birthday Cake",
        description: "A rich, moist Birthday cake with a creamy chocolate frosting, perfect for birthday celebrations.",
        ingredients: "Flour, Cocoa Powder, Sugar, Butter, Milk, Baking Powder",
        price: 600.00,  // Price in rupees
        image: "birthday_cake.jpg"
    },
    2: {
        title: "Anniversary Cake",
        description: "A light and fluffy Anniversary cake topped with a rich vanilla buttercream frosting, ideal for all occasions.",
        ingredients: "Flour, Eggs, Butter, Sugar, Milk, Baking Powder, Vanilla Extract",
        price: 700.00,  // Price in rupees
        image: "anniversary_cake.jpg"
    },
    3: {
        title: "Function Cake",
        description: "A sweet Function cake made with fresh strawberries and whipped cream, a delightful treat for summer.",
        ingredients: "Strawberries, Flour, Sugar, Butter, Milk, Baking Powder",
        price: 600.00,  // Price in rupees
        image: "function_cake.jpg"
    },
    // Add more cakes as needed...
    4: {
        title: "Wedding Cake",
        description: "A decadent Wedding cake filled with layers of chocolate truffle cream, perfect for chocolate lovers.",
        ingredients: "Flour, Cocoa Powder, Butter, Sugar, Chocolate, Cream, Baking Powder",
        price: 1200.00  // Price in rupees
    },
    5: {
        title: "Pastry Cake",
        description: "A soft, moist red Pastry cake with a creamy white cheese frosting, a luxurious dessert for any occasion.",
        ingredients: "Flour, Cocoa Powder, Buttermilk, Eggs, Sugar, Butter, Baking Powder, Red Food Coloring",
        price: 50.00  // Price in rupees
    },
    6: {
        title: "Chocolate Cake",
        description: "A refreshing Chocolate cake, light and zesty with a tangy lemon glaze topping.",
        ingredients: "Flour, Sugar, Eggs, Butter, Lemon Zest, Baking Powder",
        price: 600.00  // Price in rupees
    },
    7: {
        title: "Vanilla Cake",
        description: "A moist Vanilla cake with walnuts and cream cheese frosting, a healthy yet indulgent dessert.",
        ingredients: "Carrots, Flour, Sugar, Eggs, Walnuts, Butter, Baking Powder",
        price: 650.00  // Price in rupees
    },
    8: {
        title: "Strawberry Cake",
        description: "A Strawberry delight made with fresh mango puree and light sponge cake, topped with whipped cream.",
        ingredients: "Mango, Flour, Sugar, Eggs, Butter, Baking Powder, Cream",
        price: 650.00  // Price in rupees
    }
};

// Show the modal with the cake details
document.querySelectorAll(".view-details").forEach(button => {
    button.addEventListener("click", () => {
        const cakeId = button.closest(".cake-item").getAttribute("data-cake");
        const cake = cakeDetails[cakeId];

        // Update modal content with cake details
        document.getElementById("cake-title").textContent = cake.title;
        document.getElementById("cake-description").textContent = cake.description;
        document.getElementById("cake-ingredients").textContent = cake.ingredients;
        document.getElementById("cake-price").textContent = `₹${cake.price.toFixed(2)}`;

        // Show the modal
        modal.style.display = "flex";
    });
});

// Close the modal when the user clicks the close button
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close the modal if the user clicks anywhere outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// WhatsApp Share Functionality
const whatsappShareButtons = document.querySelectorAll('.whatsapp-share');
whatsappShareButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const cakeId = button.closest(".cake-item").getAttribute("data-cake");
        const cake = cakeDetails[cakeId];

        // Prepare the WhatsApp message with all cake details
        const message = `
            Check out this cake from D.K. Mezza Bakery! 🎂\n
            Name: ${cake.title}\n
            Description: ${cake.description}\n
            Ingredients: ${cake.ingredients}\n
            Price: ₹${cake.price.toFixed(2)}\n
            Image: ${window.location.origin}/images/${cake.image}\n\n
            Order now and make your celebrations special!`;

        // Encode message text to ensure it's safe for URLs
        const encodedMessage = encodeURIComponent(message);

        // Get phone number from button attribute
        const phoneNumber = button.getAttribute('data-phone');
        
        // Create the WhatsApp URL
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Debugging: Log the generated URL (optional)
        console.log('WhatsApp URL:', whatsappURL);
        
        // Open WhatsApp (in new window or tab)
        window.open(whatsappURL, '_blank');
    });
});
