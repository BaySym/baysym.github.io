jquery(document).ready(function($){
    $('.time').each(function(){
        $(this).css({
            'margin-bottom' : 50 - $(this).outerHeight() + 'px'
        });
    });
});

function toggleBlock(x) {
    x.classList.toggle("available");
    x.classList.toggle("unavailable");
}