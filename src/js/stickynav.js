const header = document.getElementById('header');

function stickyNavBar() {
    if (window.pageYOffset > 0) {
        header.classList.add('hfe-sticky');
    } else {
        setTimeout( () => {
            header.classList.remove('hfe-sticky');
        }, 100);
    }
}

window.onscroll = () => {
    stickyNavBar();
}