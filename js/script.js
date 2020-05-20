jQuery(document).ready(function($) {
	$('.look-up').on('click', function() {
		var errors = 0;
        var zipCode = document.getElementById("zipCode").value;
		if (zipCode.trim().length === 0) { //Added trim to prevent empty spaces
			$('#errorMessage').addClass("alert").text("Please enter a Zip Code");
			$('#errorMessage').show();
			errors = errors + 1;
		}
		if (errors === 0) {
            $('#errorMessage').hide();
            $('#weatherBox').addClass('loading');
            axios.get('https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+'&appid=10f562ef77456af7be4f3f4ba59cf3f4&units=metric').then(function (response) {
                $('#weatherBox').removeClass('loading');
                var iconCode = response.data.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                var $img = $('<img>').attr('src', iconUrl).attr('alt', response.data.weather[0].description);
                var cityName = '<h4>'+response.data.name+'</h4>';
                var cityDesc = response.data.weather[0].description;
                cityDesc = '<p class=mt-3>'+cityDesc.substr(0,1).toUpperCase()+cityDesc.substr(1)+'</p>';
                var cityTemp = response.data.main.temp;
                var convertTemp = cityTemp * 9 / 5 + 32;
                cityTemp = '<h5>'+convertTemp.toPrecision(2)+' &#8457;</h5>';
                var cityFeels = response.data.main.feels_like;
                convertTemp = cityFeels * 9 / 5 + 32;
                cityFeels = '<p> Feels Like '+convertTemp.toPrecision(2)+' &#8457;</p>';
                var cityHumidity = '<p> Humidity '+response.data.main.humidity+'%</p>';
                var $htmlOutput = cityName + cityTemp +  cityDesc + cityFeels + cityHumidity;
                $('#weatherBox').html($htmlOutput).prepend($img);
                })
                .catch(function (error) { 
                    console.log(error.message);
                    $('#weatherBox').removeClass('loading');
                    $('#weatherBox').html('Invalid Zip Code, City Not Found');
                  });
                $('#weatherBox').empty();
		}
	});
});