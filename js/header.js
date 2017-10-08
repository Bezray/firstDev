
function backToTop(){
	var a = $(document).scrollTop();
	if (a > 0){
		$(".layer_top").show()
	} else{
		$(".layer_top").hide()
	}
}

    /*
    if (typeof WS_HOST != "undefined" && !in_array(window.location.host, ["fsight.qq.com", "fsight.openqa.qq.com", "fsightpub.qq.com"])) {
        connect(WS_HOST);
        getUnReadMessage()
    }
    reloadBody();
    $(window).resize(reloadBody);
    */
 
    $(window).bind("scroll", backToTop);
    $(".layer_top").on("click", function(){
    	$("html, body").animate({
    		scrollTop: 0
    	}, $(this).offset().top / 7)

    });
    $(window).trigger('scroll');