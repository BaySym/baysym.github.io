var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName('mySlides');
    var dots = document.getElementsByClassName('dot');
    
    // index bounds
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    // slide visibility
    for (i = 0; i < slides.length; i++) slides[i].style.display = 'none';
    slides[slideIndex-1].style.display = 'block';

    // dot colours
    for (i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(' active', '');
    dots[slideIndex-1].className += ' active';
} 