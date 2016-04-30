$(function() {

    $('input[type="checkbox"]').click(function() {
        $(this).toggleClass("checked", this.checked).parent().hide().show();
    });

});