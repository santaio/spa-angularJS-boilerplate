(function() {

  'use strict';

  angular
    .module("app")
    .controller("MainMenuController", MainMenuController);

  MainMenuController.$inject = [
    'HomeService',
    '$scope'
  ];

  function MainMenuController(HomeService, $scope) {
    var vm = this;
    
    vm.closeMenu = closeMenu;
    vm.bodyScrollTop;
    vm.htmlScrollTop;

    console.log("MainMenuController >>>>>");

    vm.init = function() {

      if (!HomeService.categories) {
        _getCategories();
      } else {
        vm.categories = HomeService.categories;
        $scope.htmlReady();
      }

      console.log("Apply Menu Jquery >>>");
      $("#menu-icon").click(function() {
        $("#menu").css("top", "0");

        vm.bodyScrollTop = $("body").scrollTop();
        vm.htmlScrollTop = $("html").scrollTop();

        $("body").css({
          "overflow-y": "scroll"
        });

        setTimeout(function(){
          $("body").css("position", "fixed");
        }, 650);
      });

      $("#product-info-menu a").click(function(e) {
        e.preventDefault();
        $(".product-info").addClass("visible-sm visible-xs");
        $($(this).attr("href")).removeClass("visible-sm visible-xs");
        $("#product-info-menu a").removeClass("active");
        $(this).addClass("active");
      });

      $("#receita-info-menu a").click(function(e) {
        e.preventDefault();
        $(".receita-info").addClass("visible-sm visible-xs");
        $($(this).attr("href")).removeClass("visible-sm visible-xs");
        $("#receita-info-menu a").removeClass("active");
        $(this).addClass("active");
      });

      //--------------------------

      $("#contato-info").carousel({
        interval: false
      });

      $("#contato-info-ctrl a").click(function(e) {
        $("#contato-info-ctrl a").removeClass("active");
        $(this).addClass("active");

        var slideTo = Number($(this).attr("data-slide-to"));

        $("#contato-info").carousel(slideTo);
        e.preventDefault();
      });


      $('.menu-product .rollover').css({
        "top": "0",
        "left": "0",
        "bottom": "initial",
        "right": "initial",
        "transform": "initial",
        "display": "none"
      });

      // Menu hover effect
      $('.menu-product').hoverdir({hoverElem: '.rollover'});


      $('.menu-product').mouseenter(function(){
        var top = $(this).children(".rollover").css("top");
        var left = $(this).children(".rollover").css("left");

        top = top == "0px" ? "0%" : top;
        left = left == "0px" ? "0%" : left;


        $(this).children(".rollover").children(".content").children(".rollover-title").css({
          "transition": "initial",
          "transform": "translate("+left+","+top+")"
        });

        $(this).children(".rollover").children(".content").children(".rollover-txt").css({
          "transition": "initial",
          "transform": "translate("+left+","+top+")"
        });

        if(top < 0) {
          // Saída pra baixo
          $(this).children(".menu-product-title").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s");
          $(this).children("img").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s .1s");

        } else if(top > 0) {
          // Saida pra cima
          $(this).children(".menu-product-title").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s .1s");
          $(this).children("img").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s");
        } else {
          // Saida da direita pra esquerda ou vice versa
          $(this).children(".menu-product-title").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s .1s");
          $(this).children("img").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s");
        }

        $(this).children(".menu-product-title").css({
          "transform": "translate("+(-Number(left.slice(0, -1)))+"px,"+(-Number(top.slice(0, -1)))+"px)"
        });

        if(top != "0%"){
          $(this).children("img").css({
            "transform": "translate(-50%,"+(-Number(top.slice(0, -1)))+"%)"
          });
        } else if (left != "0%") {
          $(this).children("img").css({
            "transform": "translate("+(-Number(left.slice(0, -1)))+"%, 0%)"
          });
        }


        setTimeout(function(){
          $(".menu-product .rollover .content .rollover-title").css({
            "transition": "all .4s ease-in-out .1s",
            "transform": "translate(0, 0)"
          });

          $(".menu-product .rollover .content .rollover-txt").css({
            "transition": "all .4s ease-in-out .2s",
            "transform": "translate(0, 0)"
          });

        }, 10);

      });

      $('.menu-product').mouseleave(function(){

        if(top < 0) {
          // Entrada pra cima
          $(this).children(".menu-product-title").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s .1s");
          $(this).children("img").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s");
        } else if (top > 0){
          // Entrada pra baixo
          $(this).children(".menu-product-title").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s");
          $(this).children("img").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s .1s");
        } else {
          // Entrada da direita pra esquerda ou vice versa
          $(this).children(".menu-product-title").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s .1s");
          $(this).children("img").css("transition", "all cubic-bezier(.49,.08,.34,.97) .5s");
        }

        $(this).children("img").css({
            "transform": "translate(-50%, 0%)"
        });

        $(this).children(".menu-product-title").css({
            "transform": "translate(0%, 0%)"
        });

      });
      
    };

    function _getCategories() {
      HomeService
        .setCategories()
        .then(function() {
          vm.categories = HomeService.categories;
          $scope.htmlReady();
          console.log("Categories :: ", vm.categories);
        });
    }

    function closeMenu() {
      $("#menu").css("top", "-100%");
      $("body").css({
        "overflow-y": "auto",
        "position": "static"
      });
      $('body').scrollTop(vm.bodyScrollTop);
      $('html').scrollTop(vm.htmlScrollTop);
    }

    vm.init();
  }
})();
