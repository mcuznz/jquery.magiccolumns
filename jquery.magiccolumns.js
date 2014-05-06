(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	$.fn.magiccolumns = function() {

		// if we're called on junk or a non-table non-junk, run away
		if (this[0] == undefined || this[0].tagName !== 'TABLE') {
			console.log('.magiccolumns must be called on a <table> element.');
			return this; // chaining!
		}

		var table = this[0];

		if (!$(table).data('magiccolumns')) {
			$(table).data({magiccolumns: true});

			$( window ).resize(function() {
				update(table);
			});
		}

		// get the highest priority
		var maxpriority = 0;
		var headers = $(table).find('th');

		//sizebaker(this);

		headers.each(function(){
			if ($(this).data('priority') !== undefined && $(this).data('priority') > maxpriority) {
				maxpriority = $(this).data('priority');
			};
		});
		
		if (maxpriority == 0) {
			setTimeout(function(){
				$(table).magiccolumns();
			}, 500);
			return this;
		}

		$(table).data({maxpriority: maxpriority});

		update(table);

		return this; // chaining!

	}
	
	var update = function(table) {
		// Is the table too big? either left edge or right edge needs to be off-screen
		var maxRight = $(window).width();
		
		// Let's try this... show everything, and then hide stuff until it fits.
		$(table).find('th').css({display: 'table-cell'});
		$(table).find('td').css({display: 'table-cell'});

		var lastpriority = $(table).data('maxpriority');

		while ($(table).offset().left < 0 ||
			$(table).offset().left + $(table).outerWidth() > maxRight) {

			var numHidden = 0;
			$(table).find('th').each(function() {
				if ($(this).data('priority') == lastpriority) {
					$(this).css({display: 'none'});
					numHidden++;
				}
			});

			$(table).find('td').each(function() {
				if ($(this).data('priority') == lastpriority) {
					$(this).css({display: 'none'});
					numHidden++;
				}
			});

			// walk down priority in case we're still too large
			lastpriority -= 1;
			if (lastpriority <= 0) break;
		}

	};

}));
