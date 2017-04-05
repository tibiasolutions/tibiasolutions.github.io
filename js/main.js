$(document).ready(function () {
	var repoUri  = 'https://api.github.com/users/tibiasolutions/repos';

	requestJSON(repoUri, function(data) {
		if (data.message === undefined) {
			sortBy(data, {
			  prop: "updated_at",
			  desc: true
			});

			for (var i = 0; i < data.length; i++) {
				var language = data[i].language !== null ? '<span class="item-info"><i class="fa fa-circle" aria-hidden="true"></i> ' + data[i].language + '</span>' : '';
				var starts =  data[i].stargazers_count > 0 ? '<span class="item-info"><i class="fa fa-star info" aria-hidden="true"></i> ' + data[i].stargazers_count + '</span>' : '';
				var forks =  data[i].forks_count > 0 ? '<span class="item-info"><i class="fa fa-code-fork info" aria-hidden="true"></i> ' + data[i].forks + '</span>' : '';
				
				var html = '<div class="container">' +
									'<div class="innercontainer">' +
										'<h2>{ <a href="' + data[i].html_url + '">' + data[i].name + '</a> }</h2>' +
										'<span class="project-description">' + data[i].description + '</span>' +
										'<p>' + language + starts + forks + ' Updated <relative-time datetime="' + data[i].updated_at + '"></relative-time></p>' +
									'</div>' +
								'</div>';

				$('#content').append(html);
			}

			$('#loader').fadeOut();
			$('#content').fadeIn(2000);
		} else {
			//
		}
	});

	function requestJSON(url, callback) {
		$.ajax({
			url: url,
			complete: function(xhr) {
				callback.call(null, xhr.responseJSON);
			}
		});
	}
});

// Credits: http://jsbin.com/kucawudaco/edit?js,console
var sortBy = (function () {
  
  var _toString = Object.prototype.toString,
      //the default parser function
      _parser = function (x) { return x; },
      //gets the item to be sorted
      _getItem = function (x) {
        return this.parser((x !== null && typeof x === "object" && x[this.prop]) || x);
      };
  
  /* PROTOTYPE VERSION */
  // Creates the sort method in the Array prototype
  Object.defineProperty(Array.prototype, "sortBy", {
    configurable: false,
    enumerable: false,
    // @o.prop: property name (if it is an Array of objects)
    // @o.desc: determines whether the sort is descending
    // @o.parser: function to parse the items to expected type
    value: function (o) {
      if (_toString.call(o) !== "[object Object]")
        o = {};
      if (typeof o.parser !== "function")
        o.parser = _parser;
      o.desc = !!o.desc ? -1 : 1;
      return this.sort(function (a, b) {
        a = _getItem.call(o, a);
        b = _getItem.call(o, b);
        return o.desc * (a < b ? -1 : +(a > b));
        //return ((a > b) - (b > a)) * o.desc;
      });
    }
  });
  
  /* FUNCTION VERSION */
  // Sorts the elements of an array
  // @array: the Array
  // @o.prop: property name (if it is an Array of objects)
  // @o.desc: determines whether the sort is descending
  // @o.parser: function to parse the items to expected type
  return function (array, o) {
    if (!(array instanceof Array) || !array.length)
      return [];
    if (_toString.call(o) !== "[object Object]")
      o = {};
    if (typeof o.parser !== "function")
      o.parser = _parser;
    o.desc = !!o.desc ? -1 : 1;
    return array.sort(function (a, b) {
      a = _getItem.call(o, a);
      b = _getItem.call(o, b);
      return o.desc * (a < b ? -1 : +(a > b));
    });
  };
  
}());
