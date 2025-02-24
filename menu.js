document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded'); // Debug
    
    const menuButton = document.querySelector('.menu-button');
    console.log('Menu button:', menuButton); // Debug
    
    if (menuButton) {
        const dropdownMenu = menuButton.querySelector('.dropdown-menu');
        console.log('Dropdown menu:', dropdownMenu); // Debug
        
        if (dropdownMenu) {
            menuButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropdownMenu.classList.toggle('active');
                console.log('Menu clicked, active:', dropdownMenu.classList.contains('active')); // Debug
            });
        }
    }
});
