export let renderTime = () => {

  let now = new Date();
  let tt = "AM";
  let hh = now.getHours();
  let nn = "0" + now.getMinutes();

  if(now.getHours()>12){
    hh = now.getHours()-12;
    tt = "PM";
  }

  document.querySelector('.time').innerHTML = hh + ":" + nn.substr(-2) + " " + tt;

  let doit = function(){
    renderTime();
  }

  setTimeout(doit,1000);

};

export let enableButtons = () => {

  // Enable previous/next functionality
	let tim = document.querySelector('.time');
	let tic = tim.cloneNode(true);
	tim.parentNode.replaceChild(tic, tim);
	tic.addEventListener('click', (event) => {
    tic.classList.toggle('large');
	});

  return true;

};
