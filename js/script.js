

    window.silex = window.silex || {}
    window.silex.data = {"site":{"width":1400},"pages":[{"id":"page-accueil","displayName":"Accueil","link":{"linkType":"LinkTypePage","href":"#!page-accueil"},"canDelete":true,"canProperties":true,"canMove":true,"canRename":true,"opened":false},{"id":"page-menus","displayName":"Menus","link":{"linkType":"LinkTypePage","href":"#!page-menus"},"canDelete":true,"canProperties":true,"canMove":true,"canRename":true,"opened":false},{"id":"page-contact","displayName":"Contact","link":{"linkType":"LinkTypePage","href":"#!page-contact"},"canDelete":true,"canProperties":true,"canMove":true,"canRename":true,"opened":false}]}

        /*
         * active menu widget for Silex
         * create an element which links to an anchor, e.g. an element with a link to #anchor1
         * add the css class "anchor-link" to this element
         * create an element which is the anchor, e.g. an element with the css class "anchor1"
         * when the user clicks on the link, the scroll slides until the element is visible
         * when the user slides and the element is visible, the link gets a css class "active-menu"
         */
        $(function() {
            // Cache selectors
            var lastId,
            // All list items
            menuItems = $(".anchor-link a");
            $(menuItems[0]).addClass("active-menu");
            // Anchors corresponding to menu items
            // find the name of the elements which are anchors
            var scrollItems = menuItems.map(function(){
                // the names are in the href attribute of the anchor links
                var attr = $(this).attr("data-silex-href") || $(this).attr("href");
                // case of a link in text field or an external link after publish
                $(this).find("[href]").each(function() {
                    attr = $(this).attr("href");
                });
                // case of an "external link" before publish
                $(this).find("[data-silex-href]").each(function() {
                    attr = $(this).attr("href");
                });
                // the links to anchors are expected to start with #
                if(attr && attr.indexOf("#") === 0) {
                    var name = attr.substring(1);
                    var item = $("." + name);
                    // check if there is a hash in the URL to scroll to the anchor at start
                    if(window.location.hash.indexOf(name) === 1) {
                        var offsetTop = item.offset().top;
                        $('html, body').stop().animate({
                            scrollTop: offsetTop - 85
                        }, 300);
                    }
                    // now find the element itself, which has the name as a css class
                    if (item.length) { return {
                            "link": this,
                            "item": item.get(0)
                        };
                    }
                }
            });
            // Bind click handler to menu items
            // so we can get a fancy scroll animation
            scrollItems.each(function() {
                var link = this.link;
                var item = this.item;
                var offsetTop = $(item).offset().top;
                $(link).click(function(e){
                  $('html, body').stop().animate({
                      scrollTop: offsetTop - 85
                  }, 300);
                  e.preventDefault();
                });
            })
            // Bind to scroll
            $(window).scroll(function(){
               // Get container scroll position
               var fromTop = $(this).scrollTop();
               // Get id of current scroll item
               var cur = scrollItems.map(function(){
                 if ($(this.item).offset().top  - 85 <= fromTop)
                   return this;
               });
               // add the css class on the current menu item
               $(".active-menu").removeClass("active-menu");
               if(cur.length > 0) {
                   cur = cur[cur.length-1];
                   $(cur.link).addClass("active-menu");
               }
            });
        });

// remove PRE
/*
                    $(document).ready(function() {
    $("body").children().each(function() {
        $(this).html($(this).html().replace(/&#8232;/g," "));
    });
});
*/
    