Promise.all([
    fetch('components/navbar.html').then(res => res.text()),
    fetch('components/footer.html').then(res => res.text())
])
.then(([navbarData, footerData]) => {
    document.getElementById('navbar').innerHTML = navbarData;
    document.getElementById('footer').innerHTML = footerData;
});