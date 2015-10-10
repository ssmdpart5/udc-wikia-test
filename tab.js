function createTab(arr, max){
	var tab;
	if (arr.length){
		for (var i = 0; i < arr.length; i++){
			var name = Object.keys(arr[i])[0],
				icon = arr[i][name].icon,
				icon_match = (icon.match(/http:\/\/(.*).(com|org|us|net|gov|edu)(?:\/.*)) ? true : false;
			var el = $('<li />', {
				"class": "tab",
				"data-tab": name,
				html: function(){
					var tab_html = '';
					var el_arr = [, '<em class="tab-title">' + name + '</em>'];
					if (icon_match === true){
						el_arr[0] = '<img src="' + icon + '" alt="' + name + '" style="width: 30px; height: 30px;" />';
					} else {
						var icon_split = icon.split(':'),
							icon_type = icon_split[0],
							icon_name = icon_split[1];
						if (icon_type == 'fa'){
							el.arr[0] = '<i class="fa fa-' + icon_name + '"></i>';
						else if (icon_type == 'glyphicon'){
							el.arr[0] = '<i class="glyphicons glyphicons-' + icon_name.split('/')[0] + '">' + icon_name.split('/')[1] + '</i>';
						}
					}
					for (var i = 0; i < el_arr.length; i++){
						var content = el_arr[i];
						var el = '<div class="tab-content-section">' + content + '</div>';
						tab_html += el;
					}
					
					return tab_html;
				}
			});
			
			$('.tabs-wrapper').append(el);
		}
	}
}
