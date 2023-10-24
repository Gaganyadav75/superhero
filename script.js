
const rn = () => {
    return Math.floor(Math.random() * 732) + 1
  }
  
  var supname = document.getElementById('heroname');
  var supimg = document.getElementById('heroimg');
  var getsup = document.getElementById('getsupbtn');
  var searchinput = document.getElementById('searchinput')
  var pstats = document.getElementById('powerdiv');
  var app = document.getElementById('appdiv');
  
  
  
  getsup.onclick = ()=>inputcheck();
  window.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
inputcheck();
    }
})
  
  const inputcheck =()=>{
    if (searchinput.value == "") { getsuperhero(rn()) }
  
    else {
      let inp = searchinput.value;
      getsearchsuperhero(inp);
    }
  }
  
  const url = `https://superheroapi.com/api.php/122094717698093925/`;
  
  const getsuperhero = (id) => {
  
    fetch(`${url}${id}`)
      .then(response => response.json())
      .then(json => {
      htmlset(json);
      })
  }
  
  const pow = {
    intelligence: '🧠',
    strength: '🏋️',
    speed: '🏃',
    durability: '💪',
    power: '⚡',
    combat: '⚔️'
  }

  const appper = {
    "gender": '‍♀️♂️',
    "race": '👨🏻',
    "height": '🕴🏻',
    "weight": '⚖️',
    "eye-color": "👁️",
    "hair-color": '👱🏻‍♂️'
  }
  
  
  const getsearchsuperhero = (name) => {
    fetch(`${url}search/${name}`)
      .then(response => response.json())
      .then(json => {
       
       const hero = json.results[0];
       htmlset(hero);
        
      })
  }
  
  const biopower = (sup) => {
    supname.innerText = sup.name;
    supimg.src = sup.image.url;
  
  }
  
  const getstatshtml = (sup) => {
  
    const stats = Object.keys(sup.powerstats).map(stat => {
      if (sup.powerstats[stat]=="null") {
        return `<p>${pow[stat]} ${stat}:  Not Avail`
      }else{
        return `<p>${pow[stat]} ${stat}: ${sup.powerstats[stat]}</p> `
      }
      
    })
  
    return stats.join('').toLocaleUpperCase()
  }
  
  
  const getapphtml = (sup) => {
    const apps = Object.keys(sup.appearance).map(app => {
      if (sup.appearance[app]=="null") {
        return `<p>${appper[app]} ${app}:  Not Avail`
      }else{
        return `<p>${appper[app]} ${app}: ${sup.appearance[app]}</p> `
      }
    })
  
    return apps.join('').toLocaleUpperCase()
  }



const htmlset =(hero)=>{
    pstats.innerHTML = `<h2 style="color:white;text-decoration:underline;">Powers</h2>${getstatshtml(hero)}`
    app.innerHTML = `<h2 style="color:white;text-decoration:underline;">Appearance </h2>${getapphtml(hero)}`
    biopower(hero);
}