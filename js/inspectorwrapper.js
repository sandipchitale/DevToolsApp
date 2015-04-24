(function(){
	var connectFormShowing = true;
    function doLayout() {
        var debuggerView = document.querySelector('#debuggerview');
        var infoView = document.querySelector('#infoview');
        var blogView = document.querySelector('#blogview');
        var gitHubView = document.querySelector('#githubview');
        var apiView = document.querySelector('#apiview');
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var webviewWidth = windowWidth;
        var webviewHeight = windowHeight;

        var offset = (connectFormShowing ? 0 : 55);

        debuggerView.style.width = webviewWidth + 'px';
        debuggerView.style.height = (webviewHeight - 110 + offset) + 'px';

        infoView.style.width = webviewWidth + 'px';
        infoView.style.height = (webviewHeight - 110 + offset) + 'px';

        blogView.style.width = webviewWidth + 'px';
        blogView.style.height = (webviewHeight - 110 + offset) + 'px';

        gitHubView.style.width = webviewWidth + 'px';
        gitHubView.style.height = (webviewHeight - 110 + offset) + 'px';

        apiView.style.width = webviewWidth + 'px';
        apiView.style.height = (webviewHeight - 130 + offset) + 'px';

        var devtoolsurlinputgroup = document.querySelector('#devtoolsurlinputgroup');
        devtoolsurlinputgroup.style.width = ((830/1280) * windowWidth).toFixed(0) + 'px';
    }

    window.onresize = doLayout;

    angular.module('DevToolsApp', [])
    .constant('version', chrome.runtime.getManifest().version)
    .config(function() {

    })
    .run(function() {
        doLayout();
    })
    .controller('DevToolsController', function($scope, $http, $timeout, version) {
    	$scope.app = {
    		version: version
    	};

        $scope.config = {
            host: 'localhost',
            port: '9222',
            devtoolsUrl: 'http://cdn.rawgit.com/sandipchitale/chrome-developer-tools/enhanced/devtools-frontend/Source/devtools/front_end/inspector.html',
            experiments: false,
            devtoolsUrls: [
                'Builtin',
                'http://localhost:8090/front_end/inspector.html',
                'http://src.chromium.org/blink/trunk/Source/devtools/front_end/inspector.html',
                'http://chrome-developer-tools.googlecode.com/git/devtools-frontend/Source/devtools/front_end/inspector.html',
                'http://chrome-developer-tools.googlecode.com/git-history/issue453801/devtools-frontend/Source/devtools/front_end/inspector.html',
                'http://chrome-developer-tools.googlecode.com/git-history/allfilesoutline/devtools-frontend/Source/devtools/front_end/inspector.html',
                'http://sandipchitaleschromedevtoolsstuff.googlecode.com/git/front_end/inspector.html',
                'http://cdn.rawgit.com/sandipchitale/chrome-developer-tools/enhanced/devtools-frontend/Source/devtools/front_end/inspector.html',
                'http://src.chromium.org/blink/branches/chromium/BRANCHNUM/Source/devtools/front_end/inspector.html'
            ]
        };

    	$scope.copyUrl = function() {
    		$('#clipboard').val("http://" +
    				$scope.config.host +
    				":" + $scope.config.port +
    				($scope.config.devtoolsUrl === 'Builtin' ?  "" : ("/#" + $scope.config.devtoolsUrl))).select();
		    document.execCommand('copy');
		    $('#clipboard').val('');
    	};

        var availableInfo = {};
        availableInfo[$scope.config.devtoolsUrls[0]] = {info : "Use the target Chrome's built-in devtools.", experiments : false};
    	availableInfo[$scope.config.devtoolsUrls[1]] = {info : "Use devtools served from a local server.", experiments : false};
    	availableInfo[$scope.config.devtoolsUrls[2]] = {info : "Use latest devtools from blink repository.", experiments : false};
    	availableInfo[$scope.config.devtoolsUrls[3]] = {info : "Use this to try out Highlight changed properties functionality." +
    			" Make sure to enable experiments." +
    			"<br/><a href=\"http://sandipchitale.blogspot.com/2014/12/chrome-developer-tools-enhancement.html\" target=\"blog\">Blog</a>", experiments : true};
    	availableInfo[$scope.config.devtoolsUrls[4]] = {info : "Use this to try out" +
    			" Show constructor definition and" +
    			" Show function|class documentation functionality." +
    			" The documentation will be loaded in API tab." +
    			" Make sure to enable experiments." +
    			"<br/><a href=\"http://sandipchitale.blogspot.com/2015/02/update-show-class-definition-chrome.html\" target=\"blog\">Blog</a>", experiments : true};
    	availableInfo[$scope.config.devtoolsUrls[5]] = {info : "Use this to try out" +
    			" Go to member all files (Ctrl+Alt+Shift+P) functionality." +
    			"<br/><a href=\"http://sandipchitale.blogspot.com/2015/02/all-files-outline-chrome-devtools.html\" target=\"blog\">Blog</a>", experiments : false};
    	availableInfo[$scope.config.devtoolsUrls[6]] = {info : "Use this to try out" +
			" JavaScript Object Diagram functionality." +
			"<br/><a href=\"http://sandipchitale.blogspot.com/2014/03/javascript-object-diagram-integration.html\" target=\"blog\">Blog</a>", experiments : false};
    	availableInfo[$scope.config.devtoolsUrls[7]] = {info : "Use this to try out" +
			" Highlight changed properties and" +
			" Go to member all files (Ctrl+Alt+Shift+P) and" +
			" Show constructor definition and" +
			" Show function|class documentation functionality." +
			" The documentation will be loaded in API tab." +
			" Make sure to enable experiments." +
			"<br/><a href=\"http://sandipchitale.blogspot.com/2015/02/single-devtools-with-all-my-enhancements.html\" target=\"blog\">Blog</a>", experiments : true};
    	
    	function adjustExperiments(url) {
    		if (availableInfo[url] && availableInfo[url].experiments) {
				$scope.config.experiments = availableInfo[url].experiments;
			} else {
				$scope.config.experiments = false;
			}
    	}
    	
        // Adjust initial experiments flag status
        adjustExperiments($scope.config.devtoolsUrl);

    	$scope.showAvailableInfo = function() {
    		if (availableInfo[$scope.config.devtoolsUrl]) {
    			var infoPopoverContent = availableInfo[$scope.config.devtoolsUrl].info;
    			$('#devtoolsUrl').attr('data-content', infoPopoverContent);
    			$('#devtoolsUrl').attr('data-html', true);
    			$timeout(function() {
    				$('#devtoolsUrl').popover(infoPopoverContent ? 'show' : 'hide');
    				$timeout(function() {
    					$scope.hideAvailableInfo();
    				}, 5000);
    			}, 0);    			
    		}
    	};

    	$scope.hideAvailableInfo = function() {
    		$('#devtoolsUrl').popover('hide');
    	};

    	$scope.$watch('config.devtoolsUrl', function (newValue, oldValue) {
    		if (newValue !== oldValue) {
    			if (newValue === $scope.config.devtoolsUrls[8]) {
    				// Get 25 latest branch numbers from blink
    				$http({method: 'GET', url: 'http://src.chromium.org/blink/branches/chromium/'}).
    				success(function(data, status, headers, config) {
    					var el = document.createElement( 'div' );
    					el.innerHTML = data;
    					var lis = el.getElementsByTagName('li');
    					if (lis) {
    						var branchNums = [];
    						for (var i = 0; i < lis.length; i++) {
    							if (lis[i] && lis[i].firstChild && lis[i].firstChild.firstChild && lis[i].firstChild.firstChild.textContent) {
    								var branchNum = parseInt(lis[i].firstChild.firstChild.textContent);
    								if (!isNaN(branchNum)) {
    									branchNums.push(branchNum);
    								}
    							}
    						}
    						branchNums.sort(function(a, b){return b-a});
    						branchNums.length = 100;
    						if (branchNums.length > 0) {
    							availableInfo[$scope.config.devtoolsUrls[8]] = { info : "", experiments: false};
    							availableInfo[$scope.config.devtoolsUrls[8]].info = "Use devtools from blink repository branches. Change BRANCHNUM in URL above to one of ";
    							for(var j = 0; j < branchNums.length; j++) {
    								availableInfo[$scope.config.devtoolsUrls[8]].info += (j > 0 ? ", " : "") + branchNums[j];
    							}
    							availableInfo[$scope.config.devtoolsUrls[8]].info += " ...";
    						}
    					}
    					$scope.showAvailableInfo();
    				}).
    				error(function(data, status, headers, config) {
    				});
    			} else {
    				$scope.showAvailableInfo();
    			}
    			adjustExperiments(newValue);
    		}
	    });

        $scope.setDevtoolsUrl = function(devtoolsUrl) {
            $scope.config.devtoolsUrl = devtoolsUrl;
        }

        $scope.connectFormShowing = true;
        $scope.showConnectForm = function() {
        	$('#connectform').collapse('show');
        	$scope.connectFormShowing = true;
        	connectFormShowing = true;
        	$timeout(doLayout, 0);
        }
        $scope.hideConnectForm = function() {
        	$scope.hideAvailableInfo();
        	$('#connectform').collapse('hide');
        	$scope.connectFormShowing = false;
        	connectFormShowing = false;
        	$timeout(doLayout, 0);
        }

        $scope.duplicate = function() {
        	chrome.runtime.getBackgroundPage(function(backgroundPage) {
        		backgroundPage.launch();
        	});
        }

        var debuggerTab = $('#contentTabs a[href="#debuggerTab"]');
        var debuggerview = $('#debuggerview');

        debuggerview[0].request.onBeforeRequest.addListener(
                function(details) {
                	if ($scope.config.experiments && "main_frame" === details.type) {
                		if (details.url.indexOf('?ws=') != -1 && details.url.indexOf('&experiments=true') === -1) {
                			return {redirectUrl: details.url + '&experiments=true'};
                		}
                	}
                	return {cancel: false};
                },
                {urls: ["<all_urls>"]},
            ["blocking"]);

        debuggerview[0].addEventListener('newwindow', function(e) {
            e.preventDefault();
            
            var apiView = $('#apiview');
            apiView.prop('src', e.targetUrl);

            var apiTab = $('#contentTabs a[href="#apiTab"]');
            apiTab.tab('show');
        });

        $scope.reconnect = function() {
        	if ($scope.config.devtoolsUrl === $scope.config.devtoolsUrls[8]) {
        		$scope.showAvailableInfo();
        		return;
        	}
        	$scope.hideConnectForm();
        	debuggerTab.tab('show');
        	debuggerview.prop('src', 'http://' + $scope.config.host + ':' + $scope.config.port + ($scope.config.devtoolsUrl === 'Builtin' ?  '' : '/#' + $scope.config.devtoolsUrl));
        }

        $scope.minimize = function() {
    		chrome.app.window.current().minimize();
        }
        
        $scope.toggleMaximize = function() {
        	if (chrome.app.window.current().isMaximized()) {
        		chrome.app.window.current().restore();
        	} else {
        		chrome.app.window.current().maximize();
        	}
        }
        
        $scope.api = "";
        
        /**
         * @param {string} api
         */
        $scope.showApi = function(api) {
        	if (!api || api === "")
        		return;
            var urlPrefixes = ["https://developer.mozilla.org/en-US/docs/Web/API/{api}",
                               "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/{api}",
                               "https://developer.mozilla.org/de/docs/DOM/window.{api}"];

            const apiToken = "{api}";
            var xhr = new XMLHttpRequest();

            function showPage(i) {
                var url = urlPrefixes[i];
                if (!url)
                    return;
                url = url.replace(apiToken, api);
                xhr.open("HEAD", url, true);
                xhr.onreadystatechange = function()
                {
                    if (xhr.readyState !== XMLHttpRequest.DONE)
                        return;
                    xhr.onreadystatechange = null;
                    if (xhr.status !== 200) {
                        showPage(i+1);
                        return;
                    }
                    xhr.onreadystatechange = null;
                    var apiView = $('#apiview');
                    apiView.prop('src', url);
                }
                xhr.send(null);
            }
            showPage(0);
        }

        $scope.exit = function() {
            window.close();
        }
    })
})();
