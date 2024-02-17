//
// Scripts
// 

window.addEventListener('DOMContentLoaded', async event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
    initializeContactForm();

    let productWords = ['Vision.', 'Product.', 'Idea.']
    let productHeroHeadingId = 'productHeroHeading'
    let offerWords = ['Code.', 'Software.', 'App.']


    for(let i = 0; ; i++) {
        await displayWordTypeWriter(productHeroHeadingId, productWords[i%3])
    }
});

function displayWordTypeWriter(elementId, word) {
    return new Promise(async (resolve, reject) => {
        await typeWriter(elementId, word);
        setTimeout(async _ => {
            await deleteTypewriter(elementId)
            resolve()
        }, 2000)
    })
}

function typeWriter(targetId, txt) {
    return new Promise((resolve, reject) => {
        let i = 0;
        let speed = 150;
        function write() {
            if (i < txt.length) {
                document.getElementById(targetId).innerHTML += txt.charAt(i);
                i++;
                setTimeout(write, speed);
            }
            else(resolve())
        }
        write();
    })
}
function deleteTypewriter(targetId) {
    return new Promise((resolve, reject) => {
        let speed = 100;
        let target = document.getElementById(targetId);
        function deleteLetter() {
            if(target.textContent) {
                target.textContent = target.textContent.slice(0, -1);
                setTimeout(deleteLetter, speed);
            }
            else(resolve());
        }
        deleteLetter();
    });
}

function initializeContactForm() {
    let form = document.getElementById('contactForm');
    const contactModal =  new bootstrap.Modal('#contactModal');
    const successMessage = document.getElementById('successMessage')
    form.onsubmit = async (e) => {
        e.preventDefault();

        await fetch('https://formkeep.com/f/cc3f3607fe41', {
            method: 'POST',
            body: new FormData(form)
        });

        //display success message
        successMessage.classList.remove('d-none');

        //disable button
        var button = document.getElementById('submitButton')
        button.disabled = 'disabled';

        //close modal
        setTimeout(_ => {
            contactModal.hide();
        }, 5000)
    };
}