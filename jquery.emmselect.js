(function($){
	$.fn.emmselect = function(title){
		var data = new Array();
		this.each(function(e){
		
			var rand = Math.floor(Math.random()*999+1);
			
			var title2 = $(this).children('option:nth-child(1)').text();
			
			if(title2!=''){
				title=title2;
			}
						
			filter 	= ($(this).attr("filter")=='true');
			cs 		= ($(this).attr("case_sensitive")=='true');
			
			$(this).children('option').each(function(e){
				var value	= $(this).attr("value");
				var key		= $(this).text();
				var data2 	= [
					value,
					key
				]
				data.push(data2);
			});

			$(this).hide().attr("rand",rand).before('<div class="emmselect" id="emmselect'+rand+'" rand="'+rand+'" case_sensitive="'+cs+'">'+
														'<div class="arrow"></div>'+
														'<div class="title" rand="'+rand+'">'+title+'</div>'+
													'</div>'+
													'<div class="emmselectoptions" rand="'+rand+'" case_sensitive="'+cs+'">'+
													'</div>');
			if(filter){
				$('.emmselectoptions[rand="'+rand+'"]').append('<div class="filter"><input type="text" name="filter" placeholder="Search..." /></div>');
			}
						
			for(i=0;i<data.length;i++){
				if(data[i][1]!=''){$('.emmselectoptions[rand="'+rand+'"]').append('<div class="option" value="'+data[i][0]+'" rand="'+rand+'">'+data[i][1]+'</div>');}
			}
			
			data = [];
			
		});
		
/* 		$(".emmselectoptions .option").live("click",function(){ */
		$(document).on("click",".emmselectoptions .option",function(){
			$(this).parent(".emmselectoptions").fadeOut("fast");
			var rand	= $(this).attr("rand");
			var value	= $(this).attr("value");
			var key		= $(this).text();
			$("#emmselect"+rand+" > .title").text(key);
			$('select[rand="'+rand+'"] option').each(function(e){
				if($(this).val()==value){
					$(this).attr("selected","selected");
				}
			});
		});


/* 		$(".emmselect").live("click",function(){ */
		$(document).on("click",".emmselect",function(){
			var coords	= $(this).offset();
			var ancho	= $(this).css("width");
			var alto	= $(this).css("height");
			var rand	= $(this).attr("rand");
			if($('.emmselectoptions[rand="'+rand+'"]:visible').size()>0){
				$(".emmselectoptions").slideUp("fast");
			}else{
				$(".emmselectoptions").slideUp("fast");
				$('.emmselectoptions[rand="'+rand+'"]')
					.css("top",coords.top+26+"px")
					.css("left",coords.left+"px")
					.css("position","absolute")
					.css("width",ancho+"px")
					.slideToggle("fast",function(){
						$(this).children(".filter").children("input").focus();
					});
			}
		});
		
/* 		$(".emmselectoptions input").live("keyup",function(){ */
		$(document).on("keyup",".emmselectoptions input",function(){
			var rand	= $(this).parent(".filter").parent('.emmselectoptions').attr("rand");
			var cs 		= ($(this).parent(".filter").parent('.emmselectoptions').attr("case_sensitive")=='true');
			var val		= $(this).val();
			if(val!=""){
				$('.emmselectoptions[rand="'+rand+'"] .option').stop().slideUp("fast");
				if(cs){
					$('.emmselectoptions[rand="'+rand+'"] .option:contains("'+val+'")').stop().slideDown("fast");
				} else {
					$('.emmselectoptions[rand="'+rand+'"] .option:containsi("'+val+'")').stop().slideDown("fast");
				}
			}else{
				$('.emmselectoptions[rand="'+rand+'"] .option').stop().slideDown("fast");
			}
		});
	};
})(jQuery);
$.extend($.expr[':'], {
  'containsi': function(elem, i, match, array)
  {
    return (elem.textContent || elem.innerText || '').toLowerCase()
    .indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});