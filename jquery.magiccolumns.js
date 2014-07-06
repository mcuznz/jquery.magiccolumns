(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	$.fn.magiccolumns = function(options) {
		
		
	
		// if we're called on junk or a non-table non-junk, run away
		if (this[0] == undefined || this[0].tagName !== 'TABLE') {
			console.log('.magiccolumns must be called on a <table> element.');
			return this; // chaining!
		}

		var table = this[0];
		var $table = $(table);
		
		if (options=='stop'){
			clearTimeout(this.timeout)
			var data = $table.data();
			if (data.magiccolumns) {
				
				$table.data({magiccolumns: false,maxpriority:0,stopped:true});
				$( window ).off('resize.magiccolumns',data.handler);
				//update to restore table.
				update(table);
			}
			return this;
		} 
		
		if ($table.data('stopped') && options!='start') {
			console.log('.magiccolumns stopped, pass "start" to enable.');
			return this;
		}

		// get the highest priority
		var maxpriority = 0;
		var headers = $table.find('th');

		//sizebaker(this);

		headers.each(function(){
			if ($(this).data('priority') !== undefined && $(this).data('priority') > maxpriority) {
				maxpriority = Number($(this).data('priority'));
			};
		});
		
		if (!maxpriority) {
			this.timeout = setTimeout(function(){
				$table.magiccolumns();
			}, 500);
			return this;
		}
	
		$table.data({maxpriority: maxpriority});
		
		if (!$table.data('magiccolumns')) {
			var handler = function() {
				update(table);
			};
			$table.data({magiccolumns: true,handler:handler});
			
			$( window ).on('resize.magiccolumns',handler);
		}
		

		update(table);

		return this; // chaining!

	}
	
	var update = function(table) {
		
	
		// Let's try this... show everything, and then hide stuff until it fits.
		$(table).find('th').css({display: 'table-cell'});
		$(table).find('td').css({display: 'table-cell'});

		var lastpriority = $(table).data('maxpriority');
		
		if (!lastpriority)
			return;
			
		var numHidden = 0;
		var lastNumHidden=-1;
		while (lastpriority > 0 && (numHidden == lastNumHidden  || ($(table).outerWidth() > $(table).parent().width()))) {
			
			lastNumHidden = numHidden;
		
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
			
		}

	};

}));
