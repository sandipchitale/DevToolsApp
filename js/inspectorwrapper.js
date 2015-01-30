(function(){
    function doLayout() {
        var debuggerView = document.querySelector('#debuggerview');
        var infoView = document.querySelector('#infoview');
        var blogView = document.querySelector('#blogview');
        var gitHubView = document.querySelector('#githubview');
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
    }

    window.onresize = doLayout;

    angular.module('DevToolsApp', [])
    .config(function() {

    })
    .run(function() {
        doLayout();
    })
    .controller('DevToolsController', function($scope, $http, $timeout, $window) {
        $scope.config = {
            host: 'localhost',
            port: '9222',
            devtoolsUrl: 'http://chrome-developer-tools.googlecode.com/git/devtools-frontend/Source/devtools/front_end/inspector.html',
            experiments: false,
            devtoolsUrls: [
                'Builtin',
                'http://src.chromium.org/blink/trunk/Source/devtools/front_end/inspector.html',
                'http://chrome-developer-tools.googlecode.com/git/devtools-frontend/Source/devtools/front_end/inspector.html',
                'http://sandipchitaleschromedevtoolsstuff.googlecode.com/git/front_end/inspector.html',
                'http://sandipchitaleschromedevtoolsrnd.googlecode.com/git/Source/devtools/front_end/inspector.html'
            ]
        }

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
                                branchNums.length = 25;
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
            $window.open(e.targetUrl);
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
