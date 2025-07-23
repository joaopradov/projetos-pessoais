const hamburguer = document.getElementById('hamburguer');
const navList = document.querySelector('.nav-list');
const btnPrimary = document.querySelector('.btn-primary');

hamburguer.addEventListener('click', () => {
    navList.classList.toggle('active');
    hamburguer.classList.toggle('active');
    btnPrimary.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        hamburguer.classList.remove('active');
        btnPrimary.classList.remove('active');
    });
});