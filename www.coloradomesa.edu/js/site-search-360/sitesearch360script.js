window.ss360Config = {
    siteId: "www.coloradomesa.edu",
    style: {
        themeColor: "#860037",
        accentColor: "#860037",
        suggestions: {
            text: {
                color: "#333333"
            },
            background: {
                color: "#ffffff"
            },
            padding: "5px",
            distanceFromTop: "0px",
            border: {
                color: "#dddddd",
                radius: "0px"
            }
        },

       // searchBox: {
       //     button: {
       //         text: " ",
       //         icon: "magnifier",
       //         color: "#000000"
        //    },
        //    text: {
        //        color: "#333333",
        //        size: "14px"
        //    },
        //    background: {
        //        color: "#ffffff"
         //   },
        //    border: {
        //        color: "#dddddd",
        //        radius: "0px"
        //    },
        //    padding: "8px",
        //    icon: {
        //        image: "magnifier",
        //        color: "#666666"
        //    }
        //},
        loaderType: "circle",
        additionalCss: "#content .ss360-suggests__url{border-bottom:none!important; color:#006621!important}#content .ss360-custom-result a{font-size:19px;font-weight:700;padding:20px 15px;border-bottom:none!important;display:block;width:100%;background-color:#fffbd0}"
    },
    searchBox: {
        selector: ".ss360SearchBox",
        placeholder: "Search coloradomesa.edu...",
        searchButton: ".ss360Button"
    },
    results: {
         embedConfig: {
            contentBlock: "div.display-ss360-results",
            url: "https://www.coloradomesa.edu/search/results.html"
        },
        moreResultsButton: null
    },
    tracking: {
        providers: [],
        enhanced: true
    },
    accessibility: {
        searchFieldLabel: "Search",
        srSuggestBoxControlDescription: "Use up and down arrows to select available result. Press enter to go to selected search result. Touch devices users can use touch and swipe gestures."
    },
    layout: {
        mobile: {
            showImages: false,
            showUrl: true
        },
        desktop: {
            showImages: false,
            showUrl: true
        },
        navigation: {
            type: "scroll",
            tabSpacingPx: 5,
            tabTitle: "Found #COUNT# #NAME# for '#QUERY#'",
            forceTabs: false
        }
    },
    filters: {
        enabled: false,
        showCounts: false,
        deleteAllLabel: "Clear All"
    },
    showErrors: false,
    callbacks: {
      preSearch: function(query) {
         if (window.location.search.indexOf('ss360Query') !== -1) {
            var queryParams = window.location.search.substring(1).split('&').reduce(function(acc, part) {
               var partParts = part.split('=');
               acc[decodeURIComponent(partParts[0])] = decodeURIComponent(partParts[1]);
               return acc;
            }, {});
            if (queryParams.ss360Query !== query) {
               window.location.href = window.ss360Config.results.embedConfig.url + "?ss360Query=" + encodeURIComponent(query);
               return false;
            }
        }
        return true;
      }
   }
};