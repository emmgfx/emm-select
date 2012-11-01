(function($){
	$.fn.emmselect = function(title){
		var data = new Array();
		this.each(function(e){
		
			var rand = Math.floor(Math.random()*999+1);
			
			var title2 = $(this).children('option:nth-child(1)').text();
			
			if(title2!=''){
				title=title2;
			}
			
			if($(this).attr("filter")=='true'){
				filter = true;
			}else{
				filter = false;
			}


			$(this).children('option').each(function(e){
				var value	= $(this).attr("value");
				var key		= $(this).text();
				var data2 = [
					value,
					key
				]
				data.push(data2);
			});

			$(this).hide().attr("rand",rand).before('<div class="emmselect" id="emmselect'+rand+'" rand="'+rand+'">'+
														'<div class="arrow"></div>'+
														'<div class="title" rand="'+rand+'">'+title+'</div>'+
													'</div>'+
													'<div class="emmselectoptions" rand="'+rand+'">'+
													'</div>');
			if(filter){
				$('.emmselectoptions[rand="'+rand+'"]').append('<div class="filter"><input type="text" name="filter" placeholder="Search... (case sensitive)" /></div>');
			}
						
			for(i=0;i<data.length;i++){
				if(data[i][1]!=''){$('.emmselectoptions[rand="'+rand+'"]').append('<div class="option" value="'+data[i][0]+'" rand="'+rand+'">'+data[i][1]+'</div>');}
			}
			
			data = [];
			
		});
		
		$(".emmselectoptions .option").live("click",function(){
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


		$(".emmselect").live("click",function(){
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
		
		$(".emmselectoptions input").live("keyup",function(){
			var rand	= $(this).parent(".filter").parent('.emmselectoptions').attr("rand");
			var val		= $(this).val();
			if(val!=""){
				$('.emmselectoptions[rand="'+rand+'"] .option').stop().slideUp("fast");
				$('.emmselectoptions[rand="'+rand+'"] .option:contains("'+val+'")').stop().slideDown("fast");
			}else{
				$('.emmselectoptions[rand="'+rand+'"] .option').stop().slideDown("fast");
			}
		});
	};
})(jQuery);