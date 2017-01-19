var el = document.createElement('script');
el.src = '<%= path %>/app.js';
document.body.appendChild(el);

var els = window.parent.document.querySelectorAll(".element-atom iframe");

for(var i = 0; i < els.length; i++) {
	els[i].style.width = "100%";
}