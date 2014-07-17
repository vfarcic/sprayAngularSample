angular.module("configModule",[]).config(["$routeProvider","$locationProvider",function(o,t){t.html5Mode(!0),o.when("/page/home",{templateUrl:"/assets/html/home/home.tmpl.html"}).when("/page/books",{templateUrl:"/assets/html/books/books.tmpl.html",controller:"booksCtrl"}).when("/page/static/:name",{templateUrl:function(o){return"/assets/html/static/"+o.name+".tmpl.html"}}).otherwise({redirectTo:"/page/home"})}]),angular.module("mainModule",["ngRoute","configModule","booksModule"]).controller("mainCtrl",["$scope",function(o){o.themes=[{title:"Slate (used by this application)",css:"bootstrap_slate.min.css"},{title:"Default Bootstrap",css:"bootstrap.min.css"},{title:"Amelia",css:"bootstrap_amelia.min.css"},{title:"Cerulean",css:"bootstrap_cerulean.min.css"},{title:"Cosmo",css:"bootstrap_cosmo.min.css"},{title:"Cyborg",css:"bootstrap_cyborg.min.css"},{title:"Darkly",css:"bootstrap_darkly.min.css"},{title:"Flatly",css:"bootstrap_flatly.min.css"},{title:"Journal",css:"bootstrap_journal.min.css"},{title:"Lumen",css:"bootstrap_lumen.min.css"},{title:"Readable",css:"bootstrap_readable.min.css"},{title:"Simplex",css:"bootstrap_simplex.min.css"},{title:"Spacelab",css:"bootstrap_spacelab.min.css"},{title:"Superhero",css:"bootstrap_superhero.min.css"},{title:"United",css:"bootstrap_united.min.css"},{title:"Yeti",css:"bootstrap_yeti.min.css"}],o.theme=o.themes[0].css,o.changeTheme=function(t){o.theme=t}}]),angular.module("booksModule",["ngTable"]).controller("booksCtrl",["$scope","$http","ngTableParams",function(o,t,e){o.listBooks=function(){t.get("/api/v1/books").then(function(t){o.books=t.data,o.setTableParams()})},o.openBook=function(e){t.get("/api/v1/books/_id/"+e).then(function(t){o.book=t.data,o.originalBook=angular.copy(o.book)})},o.newBook=function(){o.book={},o.originalBook=angular.copy(o.book)},o.saveBook=function(){o.book.link="/api/v1/books/"+o.book._id,t.put("/api/v1/books",o.book).then(function(){o.listBooks(),o.newBook()})},o.revertBook=function(){o.book=angular.copy(o.originalBook)},o.deleteBook=function(){t.delete("/api/v1/books/_id/"+o.book._id).then(function(){o.listBooks(),o.newBook()})},o.deleteAllBooks=function(){t.delete("/api/v1/books").then(function(){o.listBooks()})},o.cssClass=function(o){return{"has-error":o.$invalid,"has-success":o.$valid}},o.cssClassButton=function(o){return{"btn-success":o.$valid,"btn-danger":o.$invalid}},o.isValid=function(t){return t.$valid&&!angular.equals(o.book,o.originalBook)},o.canRevertBook=function(){return!angular.equals(o.book,o.originalBook)},o.canDeleteBook=function(){return"undefined"!=typeof o.book&&"undefined"!=typeof o.book._id&&""!==o.book._id},o.pricePattern=function(){return/^[\d]+\.*(\d)*$/},o.setTableParams=function(){var t=0;void 0!==o.books&&(t=o.books.length),void 0!==o.tableParams&&o.tableParams.count(o.tableParams.count()-1),o.tableParams=new e({page:1,count:10},{counts:[],total:t,getData:function(t,e){t.resolve(o.books.slice((e.page()-1)*e.count(),e.page()*e.count()))}})},o.listBooks(),o.newBook()}]),angular.module("MODULE_NAME",[]).controller("CONTROLLER_NAME",["$scope","$http",function(){}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJjb25maWcuY3RybC5qcyIsIm1haW4uY3RybC5qcyIsImJvb2tzXFxib29rcy5jdHJsLmpzIiwidGVtcGxhdGVcXHRlbXBsYXRlLmN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBQSxPQUFBLG1CQUNBLFFBQUEsaUJBQUEsb0JBQ0EsU0FBQSxFQUFBLEdBQ0EsRUFBQSxXQUFBLEdBQ0EsRUFDQSxLQUFBLGNBQ0EsWUFBQSxxQ0FFQSxLQUFBLGVBQ0EsWUFBQSxxQ0FDQSxXQUFBLGNBRUEsS0FBQSxzQkFDQSxZQUFBLFNBQUEsR0FDQSxNQUFBLHVCQUFBLEVBQUEsS0FBQSxnQkFHQSxXQUNBLFdBQUEsa0JDakJBLFFBQUEsT0FBQSxjQUNBLFVBQ0EsZUFDQSxnQkFFQSxXQUFBLFlBQUEsU0FDQSxTQUFBLEdBQ0EsRUFBQSxTQUNBLE1BQUEsbUNBQUEsSUFBQSw0QkFDQSxNQUFBLG9CQUFBLElBQUEsc0JBQ0EsTUFBQSxTQUFBLElBQUEsNkJBQ0EsTUFBQSxXQUFBLElBQUEsK0JBQ0EsTUFBQSxRQUFBLElBQUEsNEJBQ0EsTUFBQSxTQUFBLElBQUEsNkJBQ0EsTUFBQSxTQUFBLElBQUEsNkJBQ0EsTUFBQSxTQUFBLElBQUEsNkJBQ0EsTUFBQSxVQUFBLElBQUEsOEJBQ0EsTUFBQSxRQUFBLElBQUEsNEJBQ0EsTUFBQSxXQUFBLElBQUEsK0JBQ0EsTUFBQSxVQUFBLElBQUEsOEJBQ0EsTUFBQSxXQUFBLElBQUEsK0JBQ0EsTUFBQSxZQUFBLElBQUEsZ0NBQ0EsTUFBQSxTQUFBLElBQUEsNkJBQ0EsTUFBQSxPQUFBLElBQUEsMkJBRUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxHQUFBLElBQ0EsRUFBQSxZQUFBLFNBQUEsR0FDQSxFQUFBLE1BQUEsTUM1QkEsUUFBQSxPQUFBLGVBQUEsWUFDQSxXQUFBLGFBQUEsU0FBQSxRQUFBLGdCQUNBLFNBQUEsRUFBQSxFQUFBLEdBQ0EsRUFBQSxVQUFBLFdBRUEsRUFBQSxJQUFBLGlCQUFBLEtBQUEsU0FBQSxHQUNBLEVBQUEsTUFBQSxFQUFBLEtBQ0EsRUFBQSxvQkFHQSxFQUFBLFNBQUEsU0FBQSxHQUNBLEVBQUEsSUFBQSxxQkFBQSxHQUFBLEtBQUEsU0FBQSxHQUNBLEVBQUEsS0FBQSxFQUFBLEtBQ0EsRUFBQSxhQUFBLFFBQUEsS0FBQSxFQUFBLFNBR0EsRUFBQSxRQUFBLFdBQ0EsRUFBQSxRQUNBLEVBQUEsYUFBQSxRQUFBLEtBQUEsRUFBQSxPQUVBLEVBQUEsU0FBQSxXQUNBLEVBQUEsS0FBQSxLQUFBLGlCQUFBLEVBQUEsS0FBQSxJQUNBLEVBQUEsSUFBQSxnQkFBQSxFQUFBLE1BQUEsS0FBQSxXQUNBLEVBQUEsWUFDQSxFQUFBLGFBR0EsRUFBQSxXQUFBLFdBQ0EsRUFBQSxLQUFBLFFBQUEsS0FBQSxFQUFBLGVBRUEsRUFBQSxXQUFBLFdBQ0EsRUFBQSxPQUFBLHFCQUFBLEVBQUEsS0FBQSxLQUFBLEtBQUEsV0FDQSxFQUFBLFlBQ0EsRUFBQSxhQUdBLEVBQUEsZUFBQSxXQUNBLEVBQUEsT0FBQSxpQkFBQSxLQUFBLFdBQ0EsRUFBQSxlQUdBLEVBQUEsU0FBQSxTQUFBLEdBQ0EsT0FDQSxZQUFBLEVBQUEsU0FDQSxjQUFBLEVBQUEsU0FHQSxFQUFBLGVBQUEsU0FBQSxHQUNBLE9BQ0EsY0FBQSxFQUFBLE9BQ0EsYUFBQSxFQUFBLFdBR0EsRUFBQSxRQUFBLFNBQUEsR0FDQSxNQUFBLEdBQUEsU0FBQSxRQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUEsZUFFQSxFQUFBLGNBQUEsV0FDQSxPQUFBLFFBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQSxlQUVBLEVBQUEsY0FBQSxXQUNBLE1BQ0EsbUJBQUEsR0FBQSxNQUNBLG1CQUFBLEdBQUEsS0FBQSxLQUNBLEtBQUEsRUFBQSxLQUFBLEtBR0EsRUFBQSxhQUFBLFdBQ0EsTUFBQSxtQkFFQSxFQUFBLGVBQUEsV0FDQSxHQUFBLEdBQUEsQ0FDQSxVQUFBLEVBQUEsUUFBQSxFQUFBLEVBQUEsTUFBQSxRQUNBLFNBQUEsRUFBQSxhQUNBLEVBQUEsWUFBQSxNQUFBLEVBQUEsWUFBQSxRQUFBLEdBRUEsRUFBQSxZQUFBLEdBQUEsSUFDQSxLQUFBLEVBQ0EsTUFBQSxLQUVBLFVBQ0EsTUFBQSxFQUNBLFFBQUEsU0FBQSxFQUFBLEdBQ0EsRUFBQSxRQUFBLEVBQUEsTUFBQSxPQUFBLEVBQUEsT0FBQSxHQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxjQUtBLEVBQUEsWUFFQSxFQUFBLGFDekZBLFFBQUEsT0FBQSxrQkFDQSxXQUFBLG1CQUFBLFNBQUEsUUFDQSIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdjb25maWdNb2R1bGUnLCBbXSlcclxuICAgIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlcicsXHJcbiAgICAgICAgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxuICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgICAgIC53aGVuKCcvcGFnZS9ob21lJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2Fzc2V0cy9odG1sL2hvbWUvaG9tZS50bXBsLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLndoZW4oJy9wYWdlL2Jvb2tzJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2Fzc2V0cy9odG1sL2Jvb2tzL2Jvb2tzLnRtcGwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2Jvb2tzQ3RybCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAud2hlbignL3BhZ2Uvc3RhdGljLzpuYW1lJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBmdW5jdGlvbihwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcvYXNzZXRzL2h0bWwvc3RhdGljLycgKyBwYXJhbXMubmFtZSArICcudG1wbC5odG1sJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm90aGVyd2lzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogJy9wYWdlL2hvbWUnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICBdKTsiLCIvLyBUT0RPIFRlc3RcclxuYW5ndWxhci5tb2R1bGUoJ21haW5Nb2R1bGUnLCBbXHJcbiAgICAnbmdSb3V0ZScsXHJcbiAgICAnY29uZmlnTW9kdWxlJyxcclxuICAgICdib29rc01vZHVsZSdcclxuXSlcclxuLmNvbnRyb2xsZXIoJ21haW5DdHJsJywgWyckc2NvcGUnLFxyXG4gICAgZnVuY3Rpb24gKCRzY29wZSkge1xyXG4gICAgICAgICRzY29wZS50aGVtZXMgPSBbXHJcbiAgICAgICAgICAgIHt0aXRsZTogJ1NsYXRlICh1c2VkIGJ5IHRoaXMgYXBwbGljYXRpb24pJywgY3NzOiAnYm9vdHN0cmFwX3NsYXRlLm1pbi5jc3MnfSxcclxuICAgICAgICAgICAge3RpdGxlOiAnRGVmYXVsdCBCb290c3RyYXAnLCBjc3M6ICdib290c3RyYXAubWluLmNzcyd9LFxyXG4gICAgICAgICAgICB7dGl0bGU6ICdBbWVsaWEnLCBjc3M6ICdib290c3RyYXBfYW1lbGlhLm1pbi5jc3MnfSxcclxuICAgICAgICAgICAge3RpdGxlOiAnQ2VydWxlYW4nLCBjc3M6ICdib290c3RyYXBfY2VydWxlYW4ubWluLmNzcyd9LFxyXG4gICAgICAgICAgICB7dGl0bGU6ICdDb3NtbycsIGNzczogJ2Jvb3RzdHJhcF9jb3Ntby5taW4uY3NzJ30sXHJcbiAgICAgICAgICAgIHt0aXRsZTogJ0N5Ym9yZycsIGNzczogJ2Jvb3RzdHJhcF9jeWJvcmcubWluLmNzcyd9LFxyXG4gICAgICAgICAgICB7dGl0bGU6ICdEYXJrbHknLCBjc3M6ICdib290c3RyYXBfZGFya2x5Lm1pbi5jc3MnfSxcclxuICAgICAgICAgICAge3RpdGxlOiAnRmxhdGx5JywgY3NzOiAnYm9vdHN0cmFwX2ZsYXRseS5taW4uY3NzJ30sXHJcbiAgICAgICAgICAgIHt0aXRsZTogJ0pvdXJuYWwnLCBjc3M6ICdib290c3RyYXBfam91cm5hbC5taW4uY3NzJ30sXHJcbiAgICAgICAgICAgIHt0aXRsZTogJ0x1bWVuJywgY3NzOiAnYm9vdHN0cmFwX2x1bWVuLm1pbi5jc3MnfSxcclxuICAgICAgICAgICAge3RpdGxlOiAnUmVhZGFibGUnLCBjc3M6ICdib290c3RyYXBfcmVhZGFibGUubWluLmNzcyd9LFxyXG4gICAgICAgICAgICB7dGl0bGU6ICdTaW1wbGV4JywgY3NzOiAnYm9vdHN0cmFwX3NpbXBsZXgubWluLmNzcyd9LFxyXG4gICAgICAgICAgICB7dGl0bGU6ICdTcGFjZWxhYicsIGNzczogJ2Jvb3RzdHJhcF9zcGFjZWxhYi5taW4uY3NzJ30sXHJcbiAgICAgICAgICAgIHt0aXRsZTogJ1N1cGVyaGVybycsIGNzczogJ2Jvb3RzdHJhcF9zdXBlcmhlcm8ubWluLmNzcyd9LFxyXG4gICAgICAgICAgICB7dGl0bGU6ICdVbml0ZWQnLCBjc3M6ICdib290c3RyYXBfdW5pdGVkLm1pbi5jc3MnfSxcclxuICAgICAgICAgICAge3RpdGxlOiAnWWV0aScsIGNzczogJ2Jvb3RzdHJhcF95ZXRpLm1pbi5jc3MnfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgJHNjb3BlLnRoZW1lID0gJHNjb3BlLnRoZW1lc1swXS5jc3M7XHJcbiAgICAgICAgJHNjb3BlLmNoYW5nZVRoZW1lID0gZnVuY3Rpb24odGhlbWUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnRoZW1lID0gdGhlbWU7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXSk7IiwiYW5ndWxhci5tb2R1bGUoJ2Jvb2tzTW9kdWxlJywgWyduZ1RhYmxlJ10pXHJcbiAgICAuY29udHJvbGxlcignYm9va3NDdHJsJywgWyckc2NvcGUnLCAnJGh0dHAnLCAnbmdUYWJsZVBhcmFtcycsXHJcbiAgICAgICAgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsIG5nVGFibGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmxpc3RCb29rcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBTa2lwIGFza2luZyBzZXJ2ZXIgYWZ0ZXIgUFVUIG9yIERFTEVURSByZXF1ZXN0c1xyXG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL3YxL2Jvb2tzJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5ib29rcyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNldFRhYmxlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJHNjb3BlLm9wZW5Cb29rID0gZnVuY3Rpb24oYm9va0lkKSB7XHJcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvdjEvYm9va3MvX2lkLycgKyBib29rSWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYm9vayA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9yaWdpbmFsQm9vayA9IGFuZ3VsYXIuY29weSgkc2NvcGUuYm9vayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJHNjb3BlLm5ld0Jvb2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ib29rID0ge307XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUub3JpZ2luYWxCb29rID0gYW5ndWxhci5jb3B5KCRzY29wZS5ib29rKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJHNjb3BlLnNhdmVCb29rID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuYm9vay5saW5rID0gJy9hcGkvdjEvYm9va3MvJyArICRzY29wZS5ib29rLl9pZDtcclxuICAgICAgICAgICAgICAgICRodHRwLnB1dCgnL2FwaS92MS9ib29rcycsICRzY29wZS5ib29rKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5saXN0Qm9va3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3Qm9vaygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRzY29wZS5yZXZlcnRCb29rID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuYm9vayA9IGFuZ3VsYXIuY29weSgkc2NvcGUub3JpZ2luYWxCb29rKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJHNjb3BlLmRlbGV0ZUJvb2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRodHRwLmRlbGV0ZSgnL2FwaS92MS9ib29rcy9faWQvJyArICRzY29wZS5ib29rLl9pZCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubGlzdEJvb2tzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld0Jvb2soKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkc2NvcGUuZGVsZXRlQWxsQm9va3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRodHRwLmRlbGV0ZSgnL2FwaS92MS9ib29rcycpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxpc3RCb29rcygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRzY29wZS5jc3NDbGFzcyA9IGZ1bmN0aW9uKG5nTW9kZWxDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICdoYXMtZXJyb3InOiBuZ01vZGVsQ29udHJvbGxlci4kaW52YWxpZCxcclxuICAgICAgICAgICAgICAgICAgICAnaGFzLXN1Y2Nlc3MnOiBuZ01vZGVsQ29udHJvbGxlci4kdmFsaWRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRzY29wZS5jc3NDbGFzc0J1dHRvbiA9IGZ1bmN0aW9uKG5nTW9kZWxDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICdidG4tc3VjY2Vzcyc6IG5nTW9kZWxDb250cm9sbGVyLiR2YWxpZCxcclxuICAgICAgICAgICAgICAgICAgICAnYnRuLWRhbmdlcic6IG5nTW9kZWxDb250cm9sbGVyLiRpbnZhbGlkXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkc2NvcGUuaXNWYWxpZCA9IGZ1bmN0aW9uKG5nTW9kZWxDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmdNb2RlbENvbnRyb2xsZXIuJHZhbGlkICYmICFhbmd1bGFyLmVxdWFscygkc2NvcGUuYm9vaywgJHNjb3BlLm9yaWdpbmFsQm9vayk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRzY29wZS5jYW5SZXZlcnRCb29rID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIWFuZ3VsYXIuZXF1YWxzKCRzY29wZS5ib29rLCAkc2NvcGUub3JpZ2luYWxCb29rKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJHNjb3BlLmNhbkRlbGV0ZUJvb2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mICRzY29wZS5ib29rICE9PSAndW5kZWZpbmVkJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiAkc2NvcGUuYm9vay5faWQgIT09ICd1bmRlZmluZWQnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmJvb2suX2lkICE9PSAnJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJHNjb3BlLnByaWNlUGF0dGVybiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICgvXltcXGRdK1xcLiooXFxkKSokLyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRUYWJsZVBhcmFtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsID0gMDtcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuYm9va3MgIT09IHVuZGVmaW5lZCkgdG90YWwgPSAkc2NvcGUuYm9va3MubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS50YWJsZVBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRhYmxlUGFyYW1zLmNvdW50KCRzY29wZS50YWJsZVBhcmFtcy5jb3VudCgpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudGFibGVQYXJhbXMgPSBuZXcgbmdUYWJsZVBhcmFtcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTBcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudHM6IFtdLCAvLyBoaWRlIHBhZ2UgY291bnRzIGNvbnRyb2xcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0RGF0YTogZnVuY3Rpb24oJGRlZmVyLCBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRlZmVyLnJlc29sdmUoJHNjb3BlLmJvb2tzLnNsaWNlKChwYXJhbXMucGFnZSgpIC0gMSkgKiBwYXJhbXMuY291bnQoKSwgcGFyYW1zLnBhZ2UoKSAqIHBhcmFtcy5jb3VudCgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIFRPRE8gVGVzdFxyXG4gICAgICAgICAgICAkc2NvcGUubGlzdEJvb2tzKCk7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gVGVzdFxyXG4gICAgICAgICAgICAkc2NvcGUubmV3Qm9vaygpO1xyXG4gICAgICAgIH1cclxuICAgIF0pOyIsImFuZ3VsYXIubW9kdWxlKCdNT0RVTEVfTkFNRScsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0NPTlRST0xMRVJfTkFNRScsIFsnJHNjb3BlJywgJyRodHRwJyxcclxuICAgICAgICBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCkge1xyXG4gICAgICAgIH1cclxuICAgIF0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==