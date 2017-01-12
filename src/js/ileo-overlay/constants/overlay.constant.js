/*!

    IleoOverlay
    from @ileotechparis

*/

(function() {

    'use strict';

    angular.module('ileo.overlay', [])
        .constant('ILEO_OVERLAY_DEFAULT_PARAMS' , {
            data: {},
            scope: {},
            class: '',
            overlap: true,
            hasBackdrop: true,
            openOnStart: false,
            hasAjaxAction: false,
            template: '<p><button close-ileo-overlay>Close</button></p>',
        })
        .constant('ILEO_OVERLAY_CSS' , {
            overlay: {
                top: '10%',
                left: '10%',
                zIndex: 1000,
                width: '80%',
                height: '80%',
                position: 'fixed',
                background: 'rgba(255,255,255,1)'
            },
            backdrop: {
                top: 0,
                left: 0,
                zIndex: 999,
                width: '100%',
                height: '100%',
                position: 'fixed',
                background: 'rgba(0,0,0,.5)'
            },
        });

})();
