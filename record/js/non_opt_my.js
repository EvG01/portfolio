$(function () {
    $('#accordion').on('shown.bs.collapse', function (e) {
        var offset = $(this).find('.collapse.in').prev('.panel-heading');
        if(offset) {
            $('html,body').animate({
                scrollTop: $(offset).offset().top - 70
            }, 100); 
        }
    }); 
});

 

track = document.getElementById("music");
track.onprogress = function(){
    var w = 100*(track.buffered.end(0))/track.duration;
    $('#buffered').css("width",w+"%");
}

$(function() {

    $('.accordion').on('show', function (e) {
         $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
    });

    $('.accordion').on('hide', function (e) {
        $(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
    });

});





function add_favorite(a) {
  title=document.title;
  url=document.location;
  try {
    // Internet Explorer
    window.external.AddFavorite(url, title);
  }
  catch (e) {
     try {
       // Mozilla
       window.sidebar.addPanel(title, url, "");
     }
     catch (e) {
       // Opera
       if (typeof(opera)=="object") {
         a.rel="sidebar";
         a.title=title;
         a.url=url;
         return true;
       }
       else {
         // Unknown
         alert('Нажмите Ctrl-D чтобы добавить страницу в закладки');
       }
     }
   }
   return false;
 }






