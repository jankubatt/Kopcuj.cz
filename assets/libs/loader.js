(function(){
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(item, from) {
		    var len = this.length;
		    var i = from || 0;
		    if (i < 0) { i += len; }
		    for (;i<len;i++) {
				if (i in this && this[i] === item) { return i; }
		    }
		    return -1;
		}
	}
	if (!Array.indexOf) {
		Array.indexOf = function(obj, item, from) { return Array.prototype.indexOf.call(obj, item, from); }
	}

	var Loader = {
		base: "https://api.mapy.cz",
		mode: "single",
		lang: "cs",
		version: "0",
		async: false,

		_callback: false,
		_files: {
			css: {
				api: ["/css/api/v4/api.css", "/css/api/v4/card.css", "/css/api/v4/marker.css"],
				poi: "/css/api/v4/poi.css",
				pano: "/css/api/v4/pano.css",
				suggest: "/css/api/v4/suggest.css",
				"api-simple": "/css/api/v4/api.css",
				"api-jak": "/css/api/v4/smap-jak.css",
				"api-poi": "/css/api/v4/smap-poi.css",
				"api-jak-poi-pano-suggest": "/css/api/v4/smap-jak-poi-pano-suggest.css"
			},

			single: {
				jak: "/js/api/v4/jak.js",
				api: ["/js/api/v4/smap.js", "/config.js?key={key}"],
				poi: "/js/api/v4/poi.js",
				pano: "/js/api/v4/pano.js",
				suggest: "/js/api/v4/suggest.js",
				"api-simple": ["/js/api/v4/smap-simple.js", "/config.js?key={key}"],
				"api-jak": ["/js/api/v4/smap-jak.js", "/config.js?key={key}"],
				"api-poi": ["/js/api/v4/smap-jak.js", "/config.js?key={key}", "/js/api/v4/poi.js"],
				"api-jak-poi-pano-suggest": ["/js/api/v4/smap-jak.js", "/config.js?key={key}", "/js/api/v4/poi-pano-suggest.js"]
			},

			multi: {
				jak: ["/js/api/v4/jak/touchr.js", "/js/api/v4/jak/jak.js"],
				api: [
						"/js/api/v4/api/polyfills.js",
						"/js/api/v4/jak/graphics.js",
						"/js/api/v4/jak/xml.js",
						"/js/api/v4/jak/interpolator.js",
						"/js/api/v4/jak/rpc.js",
						"/js/api/v4/jak/frpc.js",
						"/js/api/v4/jak/base64.js",
						"/js/api/v4/jak/css3.js",
						"/js/api/v4/jak/xmlrpc.js",
						"/js/api/v4/api/map.js",
						"/js/api/v4/api/map-iowned.js",
						"/js/api/v4/lib/open-location-code.js",
						"/js/api/v4/lib/proj4-src.js",
						"/js/api/v4/api/coords.js",
						"/js/api/v4/api/ophoto-date.js",
						"/js/api/v4/api/util.js",
						"/js/api/v4/api/projection.js",
						"/js/api/v4/api/projection-oblique.js",
						"/js/api/v4/api/projection-robinson.js",
						"/js/api/v4/api/layer.js",
						"/js/api/v4/api/layer-tile.js",
						"/js/api/v4/api/layer-tile-oblique.js",
						"/js/api/v4/api/layer-image.js",
						"/js/api/v4/api/layer-wms.js",
						"/js/api/v4/api/layer-wmts.js",
						"/js/api/v4/api/layer-smart.js",
						"/js/api/v4/api/layer-smart-turist.js",
						"/js/api/v4/api/layer-turist.js",
						"/js/api/v4/api/layer-marker.js",
						"/js/api/v4/api/layer-geometry.js",
						"/js/api/v4/api/layer-winter.js",
						"/js/api/v4/api/geometry.js",
						"/js/api/v4/api/geometry-multi.js",
						"/js/api/v4/api/geometry-smart.js",
						"/js/api/v4/api/marker.js",
						"/js/api/v4/api/marker-repositioner.js",
						"/js/api/v4/api/marker-cluster.js",
						"/js/api/v4/api/marker-clusterer.js",
						"/js/api/v4/api/card.js",
						"/js/api/v4/api/control.js",
						"/js/api/v4/api/control-keyboard.js",
						"/js/api/v4/api/control-mouse.js",
						"/js/api/v4/api/control-orientation.js",
						"/js/api/v4/api/control-overview.js",
						"/js/api/v4/api/control-layer.js",
						"/js/api/v4/api/control-zoom.js",
						"/js/api/v4/api/control-copyright.js",
						"/js/api/v4/api/control-minimap.js",
						"/js/api/v4/api/control-rosette.js",
						"/js/api/v4/api/control-scale.js",
						"/js/api/v4/api/control-pointer.js",
						"/js/api/v4/api/contextmenu.js",
						"/js/api/v4/api/contextmenu-item.js",
						"/js/api/v4/api/wmmarker.js",
						"/js/api/v4/util/gpx.js",
						"/js/api/v4/util/kml.js",
						"/js/api/v4/util/geocoder.js",
						"/js/api/v4/util/route.js",
						"/js/api/v4/util/url.js",
						"/js/api/v4/api/eggs.js",
					 "/config.js?key={key}"
				],
				poi: [
						"/js/api/v4/poi/poiserver.js",
						"/js/api/v4/poi/poiserver-xml.js",
						"/js/api/v4/poi/poiserver-frpc.js",
						"/js/api/v4/poi/dataprovider.js",
						"/js/api/v4/poi/layer-lookup.js",
						"/js/api/v4/poi/marker-poi.js",
						"/js/api/v4/poi/marker-fotopoi.js",
						"/js/api/v4/poi/marker-trafficdetail.js",
						"/js/api/v4/poi/geometry-traffic.js",
						"/js/api/v4/poi/def.js"
				],
				pano: [
						"/js/api/v4/pano/gl-matrix-min.js",
						"/js/api/v4/pano/gl.js",
						"/js/api/v4/pano/pano.js",
						"/js/api/v4/pano/pano-renderer.js",
						"/js/api/v4/pano/pano-webgl.js",
						"/js/api/v4/pano/pano-nav.js",
						"/js/api/v4/pano/pano-clickmask.js",
						"/js/api/v4/pano/pano-place.js",
						"/js/api/v4/pano/pano-scene.js",
						"/js/api/v4/pano/pano-sphere.js",
						"/js/api/v4/pano/pano-tile.js",
						"/js/api/v4/pano/pano-marker.js",
						"/js/api/v4/pano/pano-layer.js"
				],
				suggest: [
						"/js/api/v4/suggest/suggest-params.js",
						"/js/api/v4/suggest/suggest-item.js",
						"/js/api/v4/suggest/suggest-provider.js",
						"/js/api/v4/suggest/suggest.js"
				],
				"api-simple": [
						"/js/api/v4/api/map-simple.js",
						"/js/api/v4/api/util-simple.js",
						"/js/api/v4/api/projection.js",
					 "/config.js?key={key}"
				],
				"api-jak": [],
				"api-poi": [],
				"api-jak-poi-pano-suggest": []
			}
		},

		load: function(key_, what_, callback) {
			var key = key_ || "";
			var what = {
				jak: true,
				poi: false,
				pano: false,
				suggest: false,
				api: "full"
			};

			for (var p in what_) { what[p] = what_[p]; }
			if (callback) { this._callback = callback; }

			/* soupis souboru k naloadovani */
			var langs = {
				cs: "cs",
				de: "de",
				en: "en",
				sk: "sk",
				pl: "pl"
			};
			var list = [];
			var css = [];
			var files = this._files[this.mode];
			var load = false;
			if (this.mode == "single" && what.api == "full" && what.jak && what.poi && what.pano && what.suggest
				&& !window.JAK && !window.SMap) {
				list = list.concat(files["api-jak-poi-pano-suggest"]);
				css = css.concat(this._files.css["api-jak-poi-pano-suggest"]);
			}
			else if (this.mode == "single" && what.api == "full" && what.jak && !window.SMap && !window.JAK) {
				list = list.concat(files["api-jak"]);
				css = css.concat(this._files.css["api-jak"]);
			}
			else if (this.mode == "single" && what.api == "full" && what.jak && what.poi && !window.SMap && !window.JAK) {
				list = list.concat(files["api-poi"]);
				css = css.concat(this._files.css["api-poi"]);
			}

			if (what.jak && !window.JAK && list.indexOf(files["api-jak"][0]) == -1) { list = list.concat(files.jak); }
			if (what.api == "simple" && !window.SMap) {
				list = list.concat(files["api-simple"]);
				css = css.concat(this._files.css["api-simple"]);
			}
			if (what.api == "full" && !window.SMap && list.indexOf(files["api-jak"][0]) == -1) {
				list = list.concat(files.api);
				css = css.concat(this._files.css.api);
			}
			if (what.poi && !(window.SMap && window.SMap.Detail) && list.indexOf(files["api-poi"][2]) == -1
				&& list.indexOf(files["api-jak-poi-pano-suggest"][2]) == -1) {
				list = list.concat(files.poi);
				css = css.concat(this._files.css.poi);
			}
			if (what.pano && !(window.SMap && window.SMap.Pano) && list.indexOf(files["api-jak-poi-pano-suggest"][2]) == -1) {
				list = list.concat(files.pano);
				css = css.concat(this._files.css.pano);
			}
			if (what.suggest && !(window.SMap && window.SMap.Suggest) && list.indexOf(files["api-jak-poi-pano-suggest"][2]) == -1) {
				list = list.concat(files.suggest);
				css = css.concat(this._files.css.suggest);
			}
			list.push("/js/lang/" + (langs[this.lang] ? langs[this.lang] : langs.cs) + ".js");

			/* mozna neni co delat? */
			if (!list.length) {
				if (this._callback) { this._callback(); }
				return;
			}
			/* vyrobit celou cestu */
			for (var i=0;i<list.length;i++) {
				var value = list[i];
				value = value.replace(/{key}/, key);
				if (value.indexOf("?") != -1) {
					value += "&";
				} else {
					value += "?";
				}
				value += "v=" + (this.version == 0 ? Math.random() : this.version);
				list[i] = this.base + value;
			}
			this._loadList(list);

			/* nacist css */
			var parent = (document.getElementsByTagName("head")[0] || document.documentElement);
			while (css.length) {
				var link = document.createElement("link");
				link.rel = "stylesheet";
				link.type = "text/css";
				link.href = this.base + css.shift() + "?v" + (this.version == 0 ? Math.random() : this.version);
				parent.appendChild(link);
			}
		},

		_onLoad: function() {

			// Pokud nejsme na https, zobrazí se varovná hláška
			this._showHttpsError();

			this.async = true;

			if (this._callback) {
				this._callback();
				this._callback = null;
			}
		},

		_loadAsync: function(list) {
			var head = document.getElementsByTagName("head")[0];

			function readyStateChange(e) {
				var elm = e.srcElement;
				if (elm.readyState == 'loaded' || elm.readyState == 'complete') { loadNext(); }
			}

			function loadNext() {
				if (!list.length) {
					if (Loader._callback) {
						Loader._callback();
						Loader._callback = null;
					}
					return;
				}

				var name = list.shift();
				var script = document.createElement("script");
				script.charset = "utf-8";

				if (script.attachEvent) {
					script.attachEvent("onreadystatechange", readyStateChange);
				} else {
					script.addEventListener("load", loadNext, false);
				}

				script.type = "text/javascript";
				script.src = name;
				head.appendChild(script);
			}

			loadNext();
		},

		_loadSync: function(list) {
			for (var i=0;i<list.length;i++) {
				document.write('<script charset="utf-8" type="text/javascript" src="'+list[i]+'"></script>');
			}
		},

		_loadList: function(list) {
			if (this.async) {
				this._loadAsync(list);
			} else {
				this._loadSync(list);
			}
		},

		/**
		 * Pokud není loader volán přes https nebo nejsme na https (ie), zobrazí se chybová hláška
		 */
		_showHttpsError: function() {
			var cs = document.currentScript;
			var url = "";
			if (cs && cs.src) {
				url = cs.src;
			} else {
				var scripts = document.scripts;
				for (var s = 0; s < scripts.length; s++) {
					var src = scripts[s].src;
					if (src && src.match(/loader\.js/i)) {
						url = src;
						break;
					}
				}
			}

			if (!(url || location.protocol).match(/^https/i)) {
				var httpsError = {
					"cs": "Používáte zastaralý nezabezpečený protokol HTTP pro API Mapy.cz.\nProsím, přejděte na bezpečnější protokol HTTPS!\nVíce informací na https://napoveda.seznam.cz/forum/viewtopic.php?f=31&t=31514.",
					"de": "Sie verwenden das veraltete ungesicherte HTTP-Protokoll für API Mapy.cz.\nBitte gehen Sie zu einem sichereren HTTPS-Protokoll!\nWeitere Informationen finden Sie unter https://napoveda.seznam.cz/forum/viewtopic.php?f=31&t=31514.",
					"en": "You are using obsolete unsecured HTTP protocol for API Mapy.cz.\nPlease go to a secure HTTPS protocol!\nMore information at https://napoveda.seznam.cz/forum/viewtopic.php?f=31&t=31514.",
					"sk": "Používate zastaraný nezabezpečený protokol HTTP pre API Mapy.cz.\nProsím, prejdite na bezpečnější protokol HTTPS!\nViac informácií na https://napoveda.seznam.cz/forum/viewtopic.php?f=31&t=31514."
				}
				console.warn(httpsError[this.lang] || httpsError["en"]);
			}
		}
	};

	window.Loader = Loader;

	if (window.attachEvent) {
		window.attachEvent("onload", function() { Loader._onLoad(); });
	} else {
		window.addEventListener("load", function() { Loader._onLoad(); }, false);
	}
})();