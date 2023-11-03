/// Function to show/hide menu in small devices
function toggleMenu(button) {
    // toggle the icon
    let icon = button.querySelector('.toggle-icon');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-close');
    icon.classList.toggle('rotate-180');

    // get the navigation container
    let nav = icon;
    while (!nav.classList.contains('container')) {
        nav = nav.parentElement;
    }

    // toggle all navigation items
    nav.querySelectorAll('.menu-item').forEach(menu_item => {
        menu_item.classList.toggle('hidden');
        menu_item.classList.toggle('flex');
    });
}

/// Function to toggle the faq
function toggleFaq(button) {
    // toggle the icon
    let icon = button.querySelector('.toggle-icon');
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus');
    icon.classList.toggle('rotate-180');

    // get the faq which is being triggered
    let this_faq = button;
    while (!this_faq.classList.contains('faq')) {
        this_faq = this_faq.parentElement;
    }

    // close all others faq
    document.querySelectorAll('.faq').forEach(faq => {
        let answer = faq.querySelector('.faq-answer');
        let icon = faq.querySelector('.toggle-icon');
        if (!faq.isSameNode(this_faq)) {
            answer.classList.add('h-0');
            answer.classList.remove('h-full');
            answer.classList.add('opacity-0');
            answer.classList.remove('opacity-1');
            icon.classList.remove('rotate-180');
            icon.classList.add('fa-plus');
            icon.classList.remove('fa-minus');
        }
    })

    // toggle this faq
    let answer = this_faq.querySelector('.faq-answer');
    answer.classList.toggle('h-0');
    answer.classList.toggle('h-full');
    answer.classList.toggle('opacity-1');
    answer.classList.toggle('opacity-0');
}
