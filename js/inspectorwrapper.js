(function(){
    function doLayout() {
        var webview = document.querySelector('webview');
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var webviewWidth = windowWidth;
        var webviewHeight = windowHeight;

        webview.style.width = webviewWidth + 'px';
        webview.style.height = webviewHeight + 'px';
    }

    window.onresize = doLayout;

    angular.module('DevToolsApp', [])
    .config(function() {

    })
    .run(function() {
        doLayout();
    })
    .controller('DevToolsController', function($scope) {
        $scope.config = {
            host: 'localhost',
            port: '9222',
            devtoolsUrl: 'http://sandipchitaleschromedevtoolsstuff.googlecode.com/git/front_end/inspector.html',
            devtoolsUrls: [
                'https://sandipchitaleschromedevtoolsstuff.googlecode.com/git/front_end/inspector.html',
                'http://chrome-developer-tools.googlecode.com/git/inspector/front-end/inspector.html',
                'http://src.chromium.org/blink/trunk/Source/devtools/front_end/inspector.html'
            ]
        }

        $scope.setDevtoolsUrl = function(devtoolsUrl) {
            $scope.config.devtoolsUrl = devtoolsUrl;
        }

        $scope.reconnect = function() {
            $('webview').prop('src', 'http://' + $scope.config.host + ':' + $scope.config.port + '/#' + $scope.config.devtoolsUrl);
        }

        $scope.info = function() {
            $('webview').prop('src', 'https://developers.google.com/chrome-developer-tools/docs/debugger-protocol#remote');
        }

        $scope.exit = function() {
            window.close();
        }
    })
})();
