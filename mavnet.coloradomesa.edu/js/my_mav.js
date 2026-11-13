// A background call got a 401: the mavnet session expired while the page sat
// open. Ask login_check where to sign in and go there, so the person comes back
// through SSO to this page instead of looking at empty sections.
// Only for a top-level MAVzone page on www: in an iframe the IdP can't be
// framed, and on mavnet's own pages it would throw away what they were doing.
// At most once per page, and once per 5 minutes per tab in case the cookie
// never sticks (the redirect would otherwise repeat on every page load).
var mavnet_relogin_started = false;
function mavnet_relogin()
{
	if (mavnet_relogin_started) return;
	mavnet_relogin_started = true;
	if (window.top !== window.self || window.location.hostname != 'www.coloradomesa.edu') return;
	try
	{
		var $last = parseInt(sessionStorage.getItem('mavnet_relogin_at') || '0', 10);
		if (Date.now() - $last < 5 * 60 * 1000) return;
		sessionStorage.setItem('mavnet_relogin_at', String(Date.now()));
	}
	catch (e) {}
	$.ajax(
	{
		type: 'GET',
		async: true,
		url: 'https://mavnet.coloradomesa.edu/login_check/?relogin=1&dest=' + encodeURIComponent(window.location.pathname),
		xhrFields:
		{
			withCredentials: true
		},
		crossDomains: true
	}).done(function(data)
		{
			if (/^https:\/\/mavnet\.coloradomesa\.edu\/cmu_redir\//.test(data)) window.location.replace(data);
		});
}

function mavnet_get($div,$url)
{
	$.ajax(
	{
		type: 'GET',
		async: true,
		url: $url,
		xhrFields:
		{
			withCredentials: true
		},
		crossDomains: true
	}).done(function(data)
		{
			$($div).html(data);
		}).fail(function(xhr)
		{
			if (xhr.status == 401) mavnet_relogin();
		});
}

function mavnet_put($div,$url,$data)
{
	$.ajax(
	{
		type: 'PUT',
		async: true,
		url: $url,
		data: $data,
		xhrFields:
		{
			withCredentials: true
		},
		crossDomains: true
	}).done(function(data)
		{
			$($div).html(data);
		}).fail(function(xhr)
		{
			if (xhr.status == 401) mavnet_relogin();
		});
}

function mesa4_get($div,$url)
{
	mavnet_get($div,$url);
}

function mesa4_get_orig($div,$url)
{
	$.ajax(
	{
		type: 'GET',
		async: false,
		url: $url,
		xhrFields:
		{
			withCredentials: true
		},
		crossDomains: true
	}).done(function(data)
		{
			$($div).html(data);
		});
}


function getFavorites()
{
	mavnet_get( ".favs_inner", "https://mavnet.coloradomesa.edu/favorites_get" );
}

function getTrending()
{
	mavnet_get( ".trending-apps", "https://mavnet.coloradomesa.edu/trending_get" );
}

function getAll($search_form)
{
	$search_query = '';
	if ($search_form)
	{
		//alert( "$search_form = " + $search_form );
		$search_query = $search_form;
	}
	else
	{
		var search_opts = $('#app_search').val();
		//alert( "search_opts = " + search_opts );
		if ($search_query == 'undefined')
		{
			$search_query = '*';
		}
		else
		{
			$search_query = search_opts;
		}
		
	}

	mavnet_get( ".all-apps", "https://mavnet.coloradomesa.edu/all_apps/" + $search_query );
}

var delay = (function()
{
	var timer = 0;
  	return function(callback, ms)
			{
    			clearTimeout (timer);
    			timer = setTimeout(callback, ms);
  			};
})();

function cmu_app_load($app,$div)
{
	mavnet_get( $div,  "https://mavnet.coloradomesa.edu/cmu_app/" + $app )
}

function cmu_widget_load( $widget, $div )
{
	$.ajax(
	{
		type: 'GET',
		async: true,
		url: "https://mavnet.coloradomesa.edu/widget/" + $widget,
		xhrFields:
		{
			withCredentials: true
		},
		crossDomains: true
	}).done(function(data)
		{
			$($div).html(data);
		});
}



function cmu_widgets( $div )
{
	$.ajax(
	{
		type: 'GET',
		async: true,
		url: "https://mavnet.coloradomesa.edu/widgets",
		xhrFields:
		{
			withCredentials: true
		},
		crossDomains: true
	}).done(function(data)
		{
			$($div).html(data);
		});
}

function mavzone_alerts( $div )
{
	$.ajax(
	{
		type: 'GET',
		async: false,
		url: "https://mavnet.coloradomesa.edu/mavzone_alerts",
		xhrFields:
		{
			withCredentials: true
		},
		crossDomains: true
	}).done(function(data)
		{
			$($div).html(data);
		});
}


function cmu_app($app,$div,$update)
{
	if ($update === null)
	{
		$update = '';
	}

	if ($update == 'update')
	{
		$update = '&update';
	}
	else
	{
		$update = '';
	}
	
	mavnet_get( $div,  "https://mavnet.coloradomesa.edu/cmu_app/" + $app + "&css" + $update );
};

function fav_icon_set($app, $div)
{
	// MMM Not using mesa4_get, because it does more than update a div
	$.ajax({
		type: 'GET',
		async: false,
		url: "https://mavnet.coloradomesa.edu/favorites_set/" + $app,
		xhrFields:
		{
			withCredentials: true
		},
		crossDomains: true
	}).done(function(data)
		{
			fav_icon_refresh($app,$div);
			getFavorites();
			getTrending();
			cmu_app( 'outlook', '#cmuApp-outlook', 'update' );
		});
};

function fav_icon_unset($app, $div)
{
	// MMM Not using mesa4_get, because it does more than update a div
	$.ajax({
		type: 'GET',
		async: false,
		url: "https://mavnet.coloradomesa.edu/favorites_unset/" + $app,
		xhrFields:
		{
			withCredentials: true
		},
		crossDomains: true
	}).done(function(data)
		{
			fav_icon_refresh($app,$div);
			getFavorites();
			getTrending();
			cmu_app( 'outlook', '#cmuApp-outlook', 'update' );
		});
};

function fav_icon_refresh($app,$div)
{
	$.ajax({
		type: 'GET',
		async: true,
		url: "https://mavnet.coloradomesa.edu/fav_icon/" + $app,
		xhrFields:
		{
			withCredentials: true
		},
		crossDomains: true
	}).done(function(data)
		{
			mavnet_get( $($div).parent(), "https://mavnet.coloradomesa.edu/cmu_app/" + $app + "?update=true" );
		});
};

jQuery(function(){
         jQuery('#filter').change(function(){
		var category = $("#filter option:selected").val();
		if (category == 'all')
		{
	               	$('.top').show();
		}
		else
		{
	        $('.top').show();
			$('.top:not(.' + category + ')').hide();
		}
        });
});

function task_notify()
{
	$.ajax({
		type: 'GET',
		async: true,
		url: "https://mavnet.coloradomesa.edu/task_notify",
		xhrFields:
		{
			withCredentials: true
		},
		crossDomains: true
	}).done(function(data)
		{
			if (parseInt(data) > 0)
			{
				$('#tasks-nav.task').addClass('task-available');
			}
		});
};

