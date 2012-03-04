(function($){
	$.fn.CSSSelect = function(title){
		var data = new Array();
		this.each(function(e){
		
			var rand = Math.floor(Math.random()*999+1);
			
			$(this).children('option').each(function(e){
				var value	= $(this).attr("value");
				var key		= $(this).text();
				var data2 = [
					value,
					key
				]
				data.push(data2);
			});

			var title = $(this).children('option:nth-child(1)').text();

			$(this).hide().attr("rand",rand).before('<div class="cssselect" id="cssselect'+rand+'">'+
													'<div class="arrow"></div>'+
													'<div class="title" rand="'+rand+'">'+title+'</div>'+
													'<div class="options">'+
														'<div class="filter"><input type="text" name="filter" placeholder="Search..." /></div>'+
													'</div>'+
													'</div>');
						
			for(i=0;i<data.length;i++){
				$("#cssselect"+rand+" > .options").append('<div class="option" value="'+data[i][0]+'" rand="'+rand+'">'+data[i][1]+'</div>');
			}
			
			data = [];
			
		});
		
		$(".cssselect .option").live("click",function(){
			var rand	= $(this).attr("rand");
			var value	= $(this).attr("value");
			var key		= $(this).text();
			$("#cssselect"+rand+" > .title").text(key);
			$('select[rand="'+rand+'"] option').each(function(e){
				if($(this).val()==value){
					$(this).attr("selected","selected");
				}
			});
		});


		$(".cssselect").live("click",function(){
			var coords	= $(this).offset();
			var ancho	= $(this).css("width");
			var alto	= $(this).css("height");
			$(this)	.children(".options")
					.css("top",coords.top+29+"px")
					.css("left",coords.left+"px")
					.css("position","absolute")
					.css("width",ancho+"px")
					.slideToggle("fast");
		});
	};
})(jQuery);