document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Cek apakah ada preferensi mode gelap dari local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        toggleButton.textContent = "Terang";
    }

    toggleButton.addEventListener('click', () => {
        // Toggle class 'dark-mode' pada body
        body.classList.toggle('dark-mode');

        // Ganti teks tombol
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
            toggleButton.textContent = "Terang";
        } else {
            localStorage.removeItem('theme');
            toggleButton.textContent = "Gelap";
        }
    });
});
