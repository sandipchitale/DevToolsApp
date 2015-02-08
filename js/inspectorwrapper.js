(function(){
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

        debuggerView.style.width = webviewWidth + 'px';
        debuggerView.style.height = (webviewHeight - 55) + 'px';

        infoView.style.width = webviewWidth + 'px';
        infoView.style.height = (webviewHeight - 55) + 'px';

        blogView.style.width = webviewWidth + 'px';
        blogView.style.height = (webviewHeight - 55) + 'px';

        gitHubView.style.width = webviewWidth + 'px';
        gitHubView.style.height = (webviewHeight - 55) + 'px';

        apiView.style.width = webviewWidth + 'px';
        apiView.style.height = (webviewHeight - 55) + 'px';

        var devtoolsurlinputgroup = document.querySelector('#devtoolsurlinputgroup');
        devtoolsurlinputgroup.style.width = ((920/1280) * windowWidth).toFixed(0) + 'px';
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
            devtoolsUrl: 'http://chrome-developer-tools.googlecode.com/git-history/allfilesoutline/devtools-frontend/Source/devtools/front_end/inspector.html',
            experiments: false,
            devtoolsUrls: [
                'Builtin',
                'http://localhost:8090/front_end/inspector.html',
                'http://src.chromium.org/blink/trunk/Source/devtools/front_end/inspector.html',
                'http://chrome-developer-tools.googlecode.com/git/devtools-frontend/Source/devtools/front_end/inspector.html',
                'http://chrome-developer-tools.googlecode.com/git-history/issue453801/devtools-frontend/Source/devtools/front_end/inspector.html',
                'http://chrome-developer-tools.googlecode.com/git-history/allfilesoutline/devtools-frontend/Source/devtools/front_end/inspector.html',
                'http://sandipchitaleschromedevtoolsstuff.googlecode.com/git/front_end/inspector.html'
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
        availableInfo[$scope.config.devtoolsUrls[0]] = "Use the target Chrome's built-in devtools.";
    	availableInfo[$scope.config.devtoolsUrls[1]] = "Use devtools served from a local server.";
    	availableInfo[$scope.config.devtoolsUrls[2]] = "Use latest devtools from blink repository.";
    	availableInfo[$scope.config.devtoolsUrls[3]] = "Use this to try out Highlight changed properties functionality." +
    			" Make sure to enable experiments.";
    	availableInfo[$scope.config.devtoolsUrls[4]] = "Use this to try out" +
    			" Show constructor definition and" +
    			" Show function|class documentation functionality." +
    			" The documentation will be loaded in API tab." +
    			" Make sure to enable experiments.";
    	availableInfo[$scope.config.devtoolsUrls[5]] = "Use this to try out" +
    			" Go to member all files (Ctrl+Alt+Shift+P) functionality.";
    	availableInfo[$scope.config.devtoolsUrls[5]] = "Use this to try out" +
			" JavaScript Object Diagram functionality.";

    	$scope.showAvailableInfo = function() {
    		var infoPopoverContent = availableInfo[$scope.config.devtoolsUrl];
    		$('#devtoolsUrl').attr('data-content', infoPopoverContent)
    		$timeout(function() {
    			$('#devtoolsUrl').popover(infoPopoverContent ? 'show' : 'hide');
    			$timeout(function() {
    				$scope.hideAvailableInfo();
        		}, 5000);
    		}, 0);
    	};

    	$scope.hideAvailableInfo = function() {
    		$('#devtoolsUrl').popover('hide');
    	};

//    	$('#devtoolsUrl').blur(function() {
//    		$scope.$apply(function() {
//    			$scope.hideAvailableInfo();
//    		});
//    	});
    	
    	$scope.$watch('config.devtoolsUrl', function (newValue, oldValue) {
    		if (newValue !== oldValue)
    			$scope.showAvailableInfo();
	    });
    	
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
                                branchNums.length = 15;
                                if (branchNums.length > 0) {
                                    for(var j = 0; j < branchNums.length; j++) {
                                        $scope.config.devtoolsUrls.push(
                                            'http://src.chromium.org/blink/branches/chromium/' + branchNums[j] +  '/Source/devtools/front_end/inspector.html')
                                    }
                                }
                            }
                        }).
                        error(function(data, status, headers, config) {
                        });

        $scope.setDevtoolsUrl = function(devtoolsUrl) {
            $scope.config.devtoolsUrl = devtoolsUrl;
        }

        $scope.connectFormShowing = true;
        $scope.showConnectForm = function() {
        	$('#connectform').collapse('show');
        	$scope.connectFormShowing = true;
        	$timeout(doLayout, 0);
        }
        $scope.hideConnectForm = function() {
        	$scope.hideAvailableInfo();
        	$('#connectform').collapse('hide');
        	$scope.connectFormShowing = false;
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
        	$scope.hideConnectForm();
        	debuggerTab.tab('show');
        	debuggerview.prop('src', 'http://' + $scope.config.host + ':' + $scope.config.port + ($scope.config.devtoolsUrl === 'Builtin' ?  '' : '/#' + $scope.config.devtoolsUrl));
        }

        $scope.exit = function() {
            window.close();
        }
    })
})();
