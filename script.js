const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnime() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInout
    })
    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    .from("#herofooter", {
        y:-10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInout
    })
}

function circleMouseFollower(xscale,yscale) {
    window.addEventListener("mousemove",function(dets){
     document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`; 
    })
}
// jab mouse move ho toh hum log skew kar paaye aur maximum skew 
// and minimum skew define kar paaye , jab mouse move ho toh chapta
//value badhe, aur jab mouse move ho jaaye to chapta hata lo

function circleChaptaKarlo(){
    window.addEventListener("mousemove",function(dets){
        //define default scale value
        var xscale = 1;
        var yscale = 1;

        var xprev = 0;
        var yprev = 0;

        this.window.addEventListener("mousemove", function(dets){
            xscale = gsap.utils.clamp(.8,1.2, dets.clientX - xprev);
            yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprev);

            xprev = dets.clientX;
            yprev = dets.clientY;

            circleMouseFollower(xscale,yscale);

        });
    })
}

circleMouseFollower();
firstPageAnime();
circleChaptaKarlo();

//teeno element ko select karo,uske baad teeno par ek mousemove lagao,
// jab mousemove ho to ye pata karo ki mouse kaha par hai,jiska matlab hai
// mouse ki x and y position pata karo, abh mouse ki x y position ke badle us 
// image ko skow karo and us image ko move karo,ove karte waqt rotate karo,
// and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

      elem.addEventListener("mouseleave", function (dets){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets){
      var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX; 
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20, diffrot * 0.5)
        });
    });
});