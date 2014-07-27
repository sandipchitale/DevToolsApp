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
        debuggerView.style.height = (webviewHeight - 110) + 'px';
        
        infoView.style.width = webviewWidth + 'px';
        infoView.style.height = (webviewHeight - 110) + 'px';
        
        blogView.style.width = webviewWidth + 'px';
        blogView.style.height = (webviewHeight - 110) + 'px';

        gitHubView.style.width = webviewWidth + 'px';
        gitHubView.style.height = (webviewHeight - 110) + 'px';
    }

    window.onresize = doLayout;

    angular.module('DevToolsApp', [])
    .config(function() {

    })
    .run(function() {
        doLayout();
    })
    .controller('DevToolsController', function($scope, $http) {
        $scope.config = {
            host: 'localhost',
            port: '9222',
            devtoolsUrl: 'http://sandipchitaleschromedevtoolsstuff.googlecode.com/git/front_end/inspector.html',
            devtoolsUrls: [
                'http://sandipchitaleschromedevtoolsstuff.googlecode.com/git/front_end/inspector.html',
                'http://sandipchitaleschromedevtoolsrnd.googlecode.com/git/Source/devtools/front_end/inspector.html',
                'http://chrome-developer-tools.googlecode.com/git/inspector/front-end/inspector.html',
                'http://src.chromium.org/blink/trunk/Source/devtools/front_end/inspector.html',
                "Builtin"
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

        var debuggerTab = $('#contentTabs a[href="#debuggerTab"]');
        var debuggerview = $('#debuggerview');

        $scope.reconnect = function() {
        	debuggerTab.tab('show');
        	debuggerview.prop('src', 'http://' + $scope.config.host + ':' + $scope.config.port + ($scope.config.devtoolsUrl === 'Builtin' ?  '' : '/#' + $scope.config.devtoolsUrl));
        }

        $scope.exit = function() {
            window.close();
        }
    })
})();
