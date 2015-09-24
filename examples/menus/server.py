#-----------------------------------------------------------------------------
#  Copyright (c) 2015-, Jupyter Development Team.
#
#  Distributed under the terms of the Modified BSD License.
#
#  The full license is in the file LICENSE, distributed with this software.
#-----------------------------------------------------------------------------

#
# Import handling to support python 2 + 3
#
try:
    from http.server import SimpleHTTPRequestHandler
    import http.server as BaseHTTPServer
except ImportError:
    from SimpleHTTPServer import SimpleHTTPRequestHandler
    import BaseHTTPServer


class CORSRequestHandler( SimpleHTTPRequestHandler ):
    '''
    This class provides an example server to allow local requests for the 
    data.json file in this output area demo.

    Making local file requests is not/should not be possible using the 
    XmlHttpRequest handler (for security reasons); in general javascript
    that fetches data from a different domain is frowned upon and is 
    legitimately a security concern, hence XSS (cross-site scripting) is not
    allowed.

    The solution to this is to allow CORS (cross-origin resource sharing), which allows
    the remote data to be fetched, but with much fewer security concerns than XSS.

    CORS is enabled server-side (there's nothing the client can do to request it,
    obviously) by adding the 'Access-Control-Allow-Origin' (ACAO) header to the 
    http response.
    '''
    def end_headers( self ):
        self.send_header( 'Access-Control-Allow-Origin', '*' )
        SimpleHTTPRequestHandler.end_headers(self)

        
if __name__ == '__main__':
    BaseHTTPServer.test( CORSRequestHandler, BaseHTTPServer.HTTPServer ) 
