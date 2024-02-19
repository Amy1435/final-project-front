export const handleScroll = () => {
    const navbar = document.querySelector("nav");
    navbar.classList.toggle("sticky", window.scrollY > 0);
};
