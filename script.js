// Données des laveries
const laundries = [
    { name: "Saint-Denis", address: "30 rue Pinel, Saint Denis, 93200", lat: 48.9362, lng: 2.3574 },
    { name: "Paris Montmartre", address: "27 rue Ramey, Paris, 75018", lat: 48.8877, lng: 2.3467 },
    { name: "Paris Canal Saint-Martin", address: "20 rue de Lancry, Paris, 75010", lat: 48.8697, lng: 2.3628 },
    { name: "Paris Popincourt", address: "12 rue Popincourt, Paris, 75011", lat: 48.8589, lng: 2.3755 },
    { name: "Marseille Thiers", address: "3 rue Thiers, Marseille, 13001", lat: 43.2965, lng: 5.3698 },
    { name: "Paris Gravilliers", address: "52 rue des Gravilliers, Paris, 75004", lat: 48.8636, lng: 2.3588 },
    { name: "Paris Flandre", address: "122 avenue de Flandre, Paris, 75019", lat: 48.8897, lng: 2.3789 },
    { name: "Marseille Fédération", address: "14 boulevard de la Fédération, Marseille, 13004", lat: 43.3017, lng: 5.3931 },
    { name: "Lille Douai", address: "3 rue de Douai, Lille, 59000", lat: 50.6292, lng: 3.0573 },
    { name: "Villeneuve d'Ascq", address: "61 place de l'Hôtel de Ville, Villeneuve d'Ascq, 59650", lat: 50.6192, lng: 3.1319 },
    { name: "Tourcoing", address: "45 Place de la Victoire, Tourcoing, 59200", lat: 50.7236, lng: 3.1590 }
];

// Initialisation de la carte Google Maps
function initMap() {
    const france = { lat: 46.8534, lng: 2.3488 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: france,
        styles: [
            {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#c9c9c9" }]
            }
        ]
    });

    // Ajouter les marqueurs pour chaque laverie
    laundries.forEach(laundry => {
        const marker = new google.maps.Marker({
            position: { lat: laundry.lat, lng: laundry.lng },
            map: map,
            title: laundry.name,
            animation: google.maps.Animation.DROP
        });

        const infowindow = new google.maps.InfoWindow({
            content: `
                <div class="info-window">
                    <h3>${laundry.name}</h3>
                    <p>${laundry.address}</p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(laundry.address)}" 
                       target="_blank">Itinéraire</a>
                </div>`
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    });
}

// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.price-card, .location, .contact-form')
        .forEach(el => observer.observe(el));
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuButton.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Form Submission
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Merci pour votre réservation ! Nous vous contacterons rapidement pour confirmer.');
        this.reset();
    });
}

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs du formulaire
        const formData = {
            prenom: this.prenom.value,
            nom: this.nom.value,
            email: this.email.value,
            telephone: this.telephone.value,
            message: this.message.value
        };

        // Validation du numéro de téléphone (10 chiffres)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.telephone)) {
            alert('Veuillez entrer un numéro de téléphone valide (10 chiffres)');
            return;
        }

        // Simulation d'envoi du formulaire
        console.log('Données du formulaire :', formData);
        alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
        
        // Réinitialisation du formulaire
        this.reset();
    });

    // Validation en temps réel du numéro de téléphone
    const telephoneInput = document.getElementById('telephone');
    telephoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
    });
}

// Scroll Animation for Services Cards
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Fonction pour ouvrir Google Maps dans un nouvel onglet
function openGoogleMaps(address) {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

// Ajouter les écouteurs d'événements aux adresses
document.addEventListener('DOMContentLoaded', () => {
    const addresses = document.querySelectorAll('.location-address');
    addresses.forEach(address => {
        address.style.cursor = 'pointer';
        address.addEventListener('click', () => {
            openGoogleMaps(address.textContent);
        });
    });
});

// Animation du menu de navigation
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});
