!function(){function e(e){return e&&e.__esModule?e.default:e}var n={};Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")};var t={};function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,n,t){n&&r(e.prototype,n);t&&r(e,t);return e};var a=function(){"use strict";function r(){e(n)(this,r),this.searchQuery="",this.page=1}return e(t)(r,[{key:"fetchHits",value:function(e){var n=this;console.log(this);var t="https://pixabay.com/api/?key=32070440-da23fcdb10bb13069c595106c&q=".concat(this.searchQuery,"&image_type=photo&lang=en&orientation=horizontal&safesearch=true&page=").concat(this.page,"&per_page=40");return fetch(t).then((function(e){return e.json()})).then((function(e){return n.incrementPage(),console.log(e),e.hits}))}},{key:"incrementPage",value:function(){this.page+=1}},{key:"resetPage",value:function(){this.page=1}},{key:"query",get:function(){return this.searchQuery},set:function(e){this.searchQuery=e}}]),r}(),o=document.querySelector("#search-form"),c=document.querySelector('input[name="searchQuery"]'),i=document.querySelector(".gallery"),s=document.querySelector(".load-more"),u=new a;o.addEventListener("submit",(function(e){if(e.preventDefault(),u.query=c.value,""===u.query)return alert("Please enter a value to search for results");u.resetPage(),console.log(u.query),u.fetchHits("").then((function(e){i.innerHTML="",l(e)}))})),s.addEventListener("click",(function(e){u.fetchHits("").then(l)}));function l(e){i.insertAdjacentHTML("beforeend",function(e){var n=e.map((function(e){return'<div class="photo-card">\n                <img class="img-card" src="'.concat(e.webformatURL,'" alt="').concat(e.tags,'" loading="lazy"/>\n                <div class="info">\n                  <p class="info-item">\n                  <b>Likes</b> ').concat(e.likes,'\n                  </p>\n                  <p class="info-item">\n                  <b>Views</b> ').concat(e.views,'\n                  </p>\n                  <p class="info-item">\n                  <b>Comments</b> ').concat(e.comments,'\n                  </p>\n                  <p class="info-item">\n                  <b>Downloads</b> ').concat(e.downloads,"\n                  </p>\n              </div>\n            </div>")})).join("");i.innerHTML=n}(e))}}();
//# sourceMappingURL=index.4a49d956.js.map