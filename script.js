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
    // Centre de la France
    const france = { lat: 46.603354, lng: 1.888334 };
    
    // Créer la carte
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: france,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        }
    });

    // Style personnalisé pour les marqueurs
    const markerIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#3498DB",
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 10
    };

    // Ajouter les marqueurs pour chaque laverie
    laundries.forEach(laundry => {
        const marker = new google.maps.Marker({
            position: { lat: laundry.lat, lng: laundry.lng },
            map: map,
            title: laundry.name,
            icon: markerIcon,
            animation: google.maps.Animation.DROP
        });

        // Créer une fenêtre d'info personnalisée
        const infowindow = new google.maps.InfoWindow({
            content: `
                <div class="info-window">
                    <h3>${laundry.name}</h3>
                    <p>${laundry.address}</p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(laundry.address)}" 
                       target="_blank" class="directions-link">
                       <i class="fas fa-directions"></i> Itinéraire
                    </a>
                </div>`,
            maxWidth: 300
        });

        // Ajouter les événements pour les marqueurs
        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });

        marker.addListener("mouseover", () => {
            marker.setIcon({
                ...markerIcon,
                fillColor: "#2980b9",
                scale: 12
            });
        });

        marker.addListener("mouseout", () => {
            marker.setIcon(markerIcon);
        });
    });
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    // Animation des cartes au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observer les éléments
    const elements = document.querySelectorAll('.price-card, .service-card');
    if (elements.length > 0) {
        elements.forEach(el => observer.observe(el));
    }

    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gestion des adresses cliquables
    const addresses = document.querySelectorAll('.location-address');
    if (addresses.length > 0) {
        addresses.forEach(address => {
            address.style.cursor = 'pointer';
            address.addEventListener('click', () => {
                const addressText = address.textContent;
                if (addressText) {
                    const encodedAddress = encodeURIComponent(addressText);
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                    window.open(mapsUrl, '_blank');
                }
            });
        });
    }
});
