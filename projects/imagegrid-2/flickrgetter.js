$(function(){

	function startFlickrGallery(){
		// Variables appended fg for Flickr Getter
		var fgApiKey, fgUserID, fgPerPage, fgPages, fgExtras, fgTag;
		fgApiKey = '6cb7449543a9595800bc0c365223a4e8';
		fgUserID = '';
		fgPerPage = 55;
		fgPages = 1;
		fgExtras = "url_s,url_m,url_z,url_l,url_q,url_sq";
		fgTag = "NCAA Football";

		////// Example with a User ID and Tag
		// fgApiKey = '6cb7449543a9595800bc0c365223a4e8';
		// fgUserID = '48986833@N00';
		// fgPerPage = 55;
		// fgPages = 1;
		// fgExtras = "url_s,url_m,url_z,url_l,url_q,url_sq";
		// fgTag = "japan";

		var dataURL = 'http://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=' + fgApiKey +'&extras='+ fgExtras +'&user_id=' + fgUserID +'&per_page='+ fgPerPage +'&page='+ fgPages +'&format=json&nojsoncallback=1&method=flickr.photos.search&tags='+fgTag;


		console.log(dataURL);

		var flickrData;
	    var flickrGetter = $.getJSON( dataURL, function(data) {
			console.log( "Success" );
			if (data.photos){
				flickrData = data.photos;
				buildPhotoGrid(flickrData);
			} else {
				console.log( "Flickr Success, but No Photos" );
			}
		})
		.done(function(e) { console.log( "Flickr Getter Succes, Done", e ); })
		.fail(function(e) { console.log( "Flickr Getter Failed", e ); })
		.always(function() { console.log( "Flickr Getter, Complete" ); });
	}

	function buildPhotoGrid(data){
		var photos = data.photo;
		$('.imageGrid').hide();
		for (var i = photos.length - 1; i >= 0; i--) {
			console.log(photos[i]);
			var photoUrl = photos[i].url_q;
			var photoLargeUrl = photos[i].url_l;

			var img = document.createElement('img');
			$(img).attr('src', photoUrl);
			$(img).attr('alt', photoUrl);

			var a = document.createElement('a');
			$(a).attr('href', photoLargeUrl);
			$(a).attr('class', 'photoGalleryLink');
			$(a).append(img);

			$(".imageGrid").append(a);
		};
		// Show the Grid
		$('.imageGrid').fadeIn(100);

		// Attach Actions
		$('.imageGrid').magnificPopup({
			delegate: 'a', // child items selector, by clicking on it popup will open
			type: 'image',
			gallery: {
				// options for gallery
				enabled: true
			},
		});


	}

	startFlickrGallery();

});
