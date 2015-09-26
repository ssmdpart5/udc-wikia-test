(function($, mw){
	if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat' || mw.config.get('wgPageName') == 'Special:Chat'){
		var u, length, reason;
		var user_data = [], options = { ban_length: {}, reason: {} };
		function createItem(user, config){
			var username = user[0],
				avatar = user[1],
				isChatMod = user[2] || '';
			var item_html = 
				'<h3> \
					<label class="chat-ban-username" data-user="' + username + '"> \
						<img src="' + avatar + '" width="30" height="30" /> \
						<span class="username">' + username + '</span> \
					</label>
					<input value="' + username + '" type="radio" name="chatban" /> \
				</h3>';
			var elem = $('<nav />', {
				"class": "chat-ban-user-item",
				"data-user": username,
				html: [$('<header />', {
					"class": "chat-ban-user",
					html: item_html
				}), $('<ul />', {
					"id": "chat-ban-reason-list",
					"class": "dropdown-list selectbox chat-ban-reason-list"
				}), $('<ul />', {
					"id": "chat-ban-expiry-list",
					"class": "dropdown-list combobox chat-ban-reason-list"
				})]
			});
			
			$('.chat-ban-container').append(elem);
		}
		
		var users_byCid = mainRoom.model.users._byCid,
			Cid = Object.keys(users_byCid);
		for (var i = 0; i < Cid.length; i++){
			var Cid_obj = users_byCid[Cid[i]],
				username = Cid_obj.attributes.name,
				avatar = Cid_obj.attributes.avatarSrc,
				isMod = (Cid_obj.attributes.isModerator === true) ? 'mod' : '',
				isStaff = (Cid_obj.attributes.isStaff === true) ? 'staff' : '';
			var user_arr = [];
			user_arr[0] = username;
			user_arr[1] = avatar;
			if (isMod || isStaff){
				user_arr[2] = isMod || isStaff;
			}
			u = user_arr;
		}
		
		$.getJSON(window.wgScript + "?action=ajax&rs=ChatAjax&method=BanModal", function(data){
			var expires = data.template.split('<select name=\"expires\">')[1].split('</select>')[0],
				d = expires.replace(/<\/option>/g, "</option>\n").replace(/<option value=\'/g, '<li class="chat-ban-expire-list custom-list-item" data-expiry="').replace(/\'>/g, "\">").replace(/<\/option>/g, "</li>"),
				m = createItem(u, {
					
