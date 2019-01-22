
    window.addEventListener('DOMContentLoaded', function () {
        try {
            var DEBUG = window.location.search.includes('debug');
            DEBUG && console.log("IPACL");
            if (!(typeof CookieUtil === "object" && typeof CookieUtil.cookieToMap === "function" && typeof CookieUtil.setCookie === "function")) {
                DEV && console.error('CookieUtil module is required for ACL script to run! CookieUtil:', CookieUtil);
            }
            var cookies = CookieUtil.cookieToMap();
            if ((cookies.acl === undefined && cookies.TmPusr === undefined) || cookies._htzwif === undefined) {
                var expireMs = Date.now() + 77760000000; // 900 * 24 * 3600 * 1000 =  900 days
                var expire = new Date(expireMs);
                // Init universty cookie with none
                CookieUtil.setCookie("_htzwif", "none", '/', 'themarker.com', expire);
                var date = new Date();
                var isProxyServer = window.location.origin.includes("proxy");
                date.setTime(date.getTime() + 3600000); // 60 * 60 * 1000 = 1 hour
                document.cookie = "acl=acl;expires=" + date.toGMTString() + ";path=/";
                var xhr;
                if (window.XMLHttpRequest) { // Mozilla, Safari, ...
                    xhr = new XMLHttpRequest();
                }
                else if (window.ActiveXObject) { // IE
                    try {
                        xhr = new ActiveXObject('Msxml2.XMLHTTP');
                    }
                    catch (err) {
                        try {
                            xhr = new ActiveXObject('Microsoft.XMLHTTP');
                        }
                        catch (err) {
                            DEV && console.error('Unable to create an xhr object! ', err)
                        }
                    }
                }
                xhr.onerror = function onACLError(err) {
                    DEBUG && console.log('XHR Error :', err);
                };
                var dest = "//" + document.location.hostname + "/ipAcl?ts=" + Date.now() + "&isProxyServer=" + isProxyServer;
                xhr.open('get', dest, true);
                xhr.withCredentials = true;
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        try {
                            var data = JSON.parse(this.responseText);
                            DEBUG && console.log(data);
                            location.reload();
                        }
                        catch (err) {
                            DEV && console.error(err);
                        }
                    } else {
                        return false;
                    }
                };
                xhr.send();
            }
        } catch (err) {
            DEBUG && console.log('Access list by IP script error: ' + err);
        }
    });

 