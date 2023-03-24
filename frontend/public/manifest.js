( function () {

    "use strict";

    var manifest = {},
        origin = "",
        displayModes = [ "fullscreen",
            "standalone",
            "minimal-ui",
            "browser"
        ],
        purpose = [
            "badge",
            "maskable",
            "none",
            "any"
        ],
        swUpdate = [ "imports", "all", "none" ],
        orientation = [];

    function validate( m, o ) {

        if ( !m || !o ) {
            throw "missing required parameters to validate the web manifest";
        }

        manifest = m;
        origin = o;

    }

    function validateRequiredValues() {

        return ( manifest.name && manifest.name !== "" &&
            manifest.icons && manifest.icons.length > 0 &&
            manifest.start_url && manifest.start_url !== "" );

    }

    function validateURLProperty( prop ) {

        prop = manifest[ prop ];

        if ( prop && prop !== "" ) {

            try {

                var url = new URL( prop, o );

                return true;

            } catch ( error ) {

                return false;

            }

        } else {

            return false;
        }

    }

    function validateScope() {

        return validateURLProperty( "scope" );

    }

    function validateServiceWorker() {

        if ( manifest.serviceworker && typeof manifest.serviceworker === "object" ) {

            if ( manifest.serviceworker.src && manifest.serviceworker.src !== "" ) {

                try {

                    var url = new URL( manifest.serviceworker.src, origin );

                } catch ( error ) {
                    return false;
                }

            }

        }

        return true;

    }

    function validateStartURL() {

        return validateURLProperty( "start_url" );

    }

    function validateIcons() {

        if ( !manifest.icons ) {
            return false;
        }

        var invalids = [],
            minimalIconSet = {
                androidSmall: {
                    width: 192,
                    valid: false
                },
                androidLarge: {
                    width: 512,
                    valid: false
                },
                iOSSmall: {
                    width: 120,
                    valid: false
                },
                iOSLarge: {
                    width: 180,
                    valid: false
                }
            };

        for ( var index = 0; index < manifest.icons.length; index++ ) {

            var icon = manifest.icons[ index ];

            try {

                var url = new URL( icon.src, o );



                //clean icon image type
                //require sizes
                //if purpose, ensure valid purpose???

            } catch ( error ) {

                invalids.push( index );

            }

        }

        //remove not valid icon urls
        //go backward
        for ( index = invalids.length - 1; index > -1; index-- ) {

            manifest.icons = manifest.icons.splice( invalids[ index ], 1 );

        }

    }

    function getIconWidth( icon ) {



    }

    function validateMinimalIcons() {

        //must have at least minimal set of icons
        //icon images must exist

    }

    function isColor( src ) {

        return /^#[0-9A-F]{6}|#[0-9A-F]{3}$/i.test( src );

    }

    function validateThemeColor() {

        if ( !manifest.theme_color ) {
            return true; //technically optional
        }

        return isColor( manifest.theme_color );

    }

    function validateBackgroundColor() {

        if ( !manifest.background_color ) {
            return true; //technically optional
        }

        return isColor( manifest.background_color );

    }

    function validateDisplayMode() {

        return displayModes.includes( manifest.display );

    }

    window.manifest = {
        validate: validate

    };

} )();


/*

{
scope: "/",

display: [ "fullscreen", "standalone", "minimal-ui", "browser" ],

dir: "ltr" | "rtl" | "auto",

lang: "",

name: "",

short_name: "",

description: "",

icons: [],

screenshots: [],

categories: [],

iarc_rating_id: "",

start_url: "",

orientation: "",

theme_color: "",

background_color: "",

related_applications: "",

prefer-related_applications: true|false

serviceworker: {
    "src": "sw.js",
    "scope": "/racer/",
    "update_via_cache": "none"
}

}

*/