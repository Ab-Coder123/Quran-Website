// متغيرات 
const nametypetafsir = 'http://api.quran-tafseer.com/' ;
const tafasirs = 'quran/'
const sura_number = 1 ;
const ayah_number = 1 ;
// جلب اسم ال سوره 

async function getnamequran() {
    const choosenametafsir = document.querySelector("#choosenametafsir")
    const respons =await fetch(`${nametypetafsir}${tafasirs}`)
    const data = await respons.json()
    choosenametafsir.innerHTML = `<Option value="">اختر سوره</Option>`
    console.log(data);
    data.forEach(tafsir => {
        choosenametafsir.innerHTML += `<Option value=${tafsir.index}> ${tafsir.name}</Option>`
    })
    //عشان تغير بين الاسماء  
    choosenametafsir.addEventListener('change',   (e)=>gettafsir(e.target.value))
}

getnamequran()    

// ************************************************************
async function gettafsir(tafsir) {
 const chosetypetafsir = document.querySelector("#choosequrantafsir")
 const respons = await fetch(`${nametypetafsir}${tafasirs}${sura_number}/${ayah_number}`)
 const datatafsir = await respons.json() ;
 console.log(datatafsir);

 const choseetypequran =  datatafsir[0] ;
 chosetypetafsir.innerHTML = `<Option value=''>اختر الايه </Option>`

 choseetypequran.forEach( aya => {
    chosetypetafsir.innerHTML += `<Option value=${aya.sura_index}> ${aya.text} </Option>`
 })
}

gettafsir()