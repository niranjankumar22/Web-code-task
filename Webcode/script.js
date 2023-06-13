(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var l = (n[o] = { exports: {} });
      t[o][0].call(
        l.exports,
        function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function (require, module, exports) {
        "use strict";

        var makeupApp = {};

        //init function that holds the function I want fired on page load
        makeupApp.init = function () {
          makeupApp.getMakeup();
        };

        //ajax request to access makeup API data
        makeupApp.getMakeup = function (productType, productBrand) {
          $.ajax({
            url: "https://makeup-api.herokuapp.com/api/v1/products.json",
            method: "GET",
            dataType: "json",
            data: {
              product_type: productType,
              product_brand: productBrand,
              //my 3 functions that I want available once ajax request is complete
            },
          }).then(function (res) {
            makeupApp.displayBrands(res);
            makeupApp.filterProductTypes(res);
            makeupApp.filterTags(res);
          });
        };

        makeupApp.displayBrands = function (products) {
          //on click of makeup brand radio buttons, access product data
          $(".makeup-brand-button").click(products, function () {
            //empty container to remove existing content
            $("#makeupContainer").empty();
            //store the value of the radio button user clicked on into variable
            var brandSelected = $("input[name=brand]:checked").val();
            //filter through product data, and return the brand that is exactly equal to users input
            var filterBrands = products.filter(function (product) {
              return product.brand === brandSelected;
            });
            //loop over the filtered brands, and for every piece of data that comes back...
            //dynamically create a div that will hold all of the product data, including h2, p tags, images, etc.
            for (var i = 0; i < filterBrands.length; i++) {
              $("#makeupContainer").append(
                '\n    \t\t\t<div class="makeupInfo">\n    \t\t\t\t<h2>' +
                  filterBrands[i].brand +
                  "</h2> \n    \t\t\t\t<h3>" +
                  filterBrands[i].name +
                  '</h3> \n    \t\t\t\t<div><img src="' +
                  filterBrands[i].image_link +
                  '" alt="" /></div>\n    \t\t\t\t<p class="tags">Features: ' +
                  filterBrands[i].tag_list +
                  '</p>\n    \t\t\t\t<a href="' +
                  filterBrands[i].product_link +
                  '" target="_blank" class="pinkText">Product url</a>\n    \t\t\t\t<p>' +
                  filterBrands[i].description +
                  "</p>\n    \t\t\t</div>"
              );
            }
          });
        };

        makeupApp.filterProductTypes = function (products) {
          //on click of makeup product type radio buttons, access product data
          $(".product-type").click(products, function () {
            //empty container to remove existing content
            $("#makeupContainer").empty();
            //store the value of the radio button user clicked on into variable
            var productTypeSelected = $("input[name=type]:checked").val();
            //filter through product data, and return the product type that is exactly equal to users input
            var filterProducts = products.filter(function (product) {
              return product.product_type === productTypeSelected;
            });
            //loop over the filtered products, and for every piece of data that comes back...
            //dynamically create a div that will hold all of the product data, including h2, p tags, images, etc.
            for (var i = 0; i < filterProducts.length; i++) {
              $("#makeupContainer").append(
                '\n\t\t\t\t<div class="makeupInfo">\n\t\t\t\t\t<h2>' +
                  filterProducts[i].brand +
                  "</h2>\n\t\t\t\t\t<h3>" +
                  filterProducts[i].name +
                  '</h3> \n    \t\t\t\t<div><img src="' +
                  filterProducts[i].image_link +
                  '" alt="" /></div>\n    \t\t\t\t<p class="tags">Features: ' +
                  filterProducts[i].tag_list +
                  '</p>\n    \t\t\t\t<a href="' +
                  filterProducts[i].product_link +
                  '" target="_blank" class="pinkText">Product url</a>\n    \t\t\t\t<p>' +
                  filterProducts[i].description +
                  "</p>\n\t\t\t\t</div>"
              );
            }
          });
        };

        makeupApp.filterTags = function (products) {
          //on click of makeup product type radio buttons, access product data
          $(".makeup-ajax-button").click(products, function () {
            //empty container to remove existing content
            $("#makeupContainer").empty();
            //store the value of the radio button user clicked on into variable
            var tagSelected = $("input[name=tag]:checked").val();
            //filter through product data, and return the tags that are exactly equal to users input
            var filterTags = products.filter(function (product) {
              return product.tag_list == tagSelected;
            });
            //loop over the filtered tags, and for every piece of data that comes back...
            //dynamically create a div that will hold all of the product data, including h2, p tags, images, etc.
            for (var i = 0; i < filterTags.length; i++) {
              $("#makeupContainer").append(
                '\n\t\t\t\t<div class="makeupInfo">\n\t\t\t\t\t<h2>' +
                  filterTags[i].name +
                  "</h2> \n\t\t\t\t\t<h3>" +
                  filterTags[i].name +
                  '</h3> \n\t\t\t\t\t<div><img src="' +
                  filterTags[i].image_link +
                  '" alt="" /></div>\n\t\t\t\t\t<p class="tags">Features: ' +
                  filterTags[i].tag_list +
                  '</p>\n\t\t\t\t\t<a href="' +
                  filterTags[i].product_link +
                  '" target="_blank" class="pinkText">Product url</a>\n    \t\t\t\t<p>' +
                  filterTags[i].description +
                  "</p>\n\t\t\t\t</div>"
              );
            }
          });
        };

        //changing margin-top on aboutWebsite section to account for h1 sliding down and overlapping text on click of hamburger menu button
        window.addEventListener("resize", function (event) {
          var win = $(window);
          if (win.width() < 514) {
            document.getElementById("aboutWebsite").style.marginTop = "400px";
          } else {
            document.getElementById("aboutWebsite").style.marginTop = "100px";
          }
        });

        //reload page on click of refresh button
        document
          .getElementById("refreshPage")
          .addEventListener("click", function () {
            location.reload();
            window.scrollTo(0, 0);
          });

        //smooth scroll
        $("input[type=radio]").click(function () {
          $("html, body").animate(
            {
              scrollTop: $("#makeupContainer").offset().top,
            },
            1000
          );
        });

        $(function () {
          makeupApp.init();
        });

        /*Problems to address
    4. need to figure out how to connect the functions. right now i can filter but only if if statements meet one condition. ie. for example, if user input = selectedbrand AND selected producttype AND certain ingredient factor, display relative content
    6. why does it take a bit for data to be pulled? should be present right on page load
    */
      },
      {},
    ],
  },
  {},
  [1]
);
