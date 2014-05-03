(function(){
    function doLayout() {
        var webview = document.querySelector('webview');
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var webviewWidth = windowWidth;
        var webviewHeight = windowHeight;

        webview.style.width = webviewWidth + 'px';
        webview.style.height = (webviewHeight - 70) + 'px';
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
                'http://src.chromium.org/blink/trunk/Source/devtools/front_end/inspector.html',
                'http://src.chromium.org/blink/branches/chromium/NNNN/Source/devtools/front_end/inspector.html'
            ]
        }

        $scope.setDevtoolsUrl = function(devtoolsUrl) {
            $scope.config.devtoolsUrl = devtoolsUrl;
        }

        var devtoolsUrlInput = $('#devtoolsUrl');
        devtoolsUrlInput.popover(
            {
                container: 'body',
                content: "Replace NNNN in URL above with one of the branch numbers shown below.",
                placement: 'bottom',
                animation: 'true',
                title: ' '
            }
        );

        $scope.reconnect = function() {
            var foundAt = $scope.config.devtoolsUrl.indexOf('/NNNN/') + 1;
            if ($scope.config.devtoolsUrl.indexOf('/NNNN/') !== -1) {
                devtoolsUrlInput.prop('selectionStart', foundAt);
                devtoolsUrlInput.prop('selectionEnd', foundAt + 4);
                devtoolsUrlInput.focus();
                devtoolsUrlInput.popover('show');
                setTimeout(function(){devtoolsUrlInput.popover('hide');}, 4000);
                if ($('webview').prop('src') !== 'http://src.chromium.org/blink/branches/chromium/') {
                    $('webview').prop('src', 'http://src.chromium.org/blink/branches/chromium/');
                }
            } else {
                devtoolsUrlInput.popover('hide');
                $('webview').prop('src', 'http://' + $scope.config.host + ':' + $scope.config.port + '/#' + $scope.config.devtoolsUrl);
            }
        }

        $scope.info = function() {
            $('webview').prop('src', 'https://developers.google.com/chrome-developer-tools/docs/debugger-protocol#remote');
        }

        $scope.exit = function() {
            window.close();
        }
    })
})();
