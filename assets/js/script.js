


const apiurl = 'https://mp3quran.net/api/v3/' ;
const reciters = 'reciters'
const language = 'ar'
// القراء 
async function getReciters () {
    const chooseReciters = document.querySelector("#chooseReciters")
    const respons = await fetch(`${apiurl}${reciters}?language=${language}`)
    const data = await respons.json() ;
    chooseReciters.innerHTML = `<Option value="">اختر قارئ</Option>`
    console.log(data);
    data.reciters.forEach(reciter => {
            chooseReciters.innerHTML += `<Option value=${reciter.id}> ${reciter.name}</Option>`
    });
    chooseReciters.addEventListener('change',   (e)=> getMoshaf(e.target.value))
}

getReciters() ;




// ال الداله دي عشان لما تيجي تختار اي قارء يجيب ليك المصحف بتاعه 
async function getMoshaf(reciter) {
    const Choosemosahf = document.querySelector("#changeMoshaf")
    const respons = await fetch(`${apiurl}${reciters}?language=${language}&reciter=${reciter}`)
    const datamoshaf = await respons.json() ; 
    // ل استدعاء المصاحف عند ضغط علي اي مرتل 
 
    const moshaf = datamoshaf.reciters[0].moshaf ;
    Choosemosahf.innerHTML= `<Option value="" >اختر روايه</Option>`

    moshaf.forEach(moshaf => {
     Choosemosahf.innerHTML += `<Option value=${moshaf.id} data-server=${moshaf.server} data-surahlist = ${moshaf.surah_list}> ${moshaf.name}</Option>`

   })
   Choosemosahf.addEventListener('change',  (e)=>{
    // suralist & dataserver  تانيه بس المرادي ل السوره من خلال المتغيرين ال هما  function بعدها بقا بتكمل عادي و بتعمل   Choosemosahf.options[Choosemosahf.selectedIndex]  من خلال الامر ده  Server ده ال فوق انه بيجيب ليك ال  Api بتاعه وظيفه ال  Api ليه عشان تقدر لما تعمل ايفينت ل الروايه تقدر لما تضغط عليها تجيب ال سيرفير ال موجود فيه جميع سور المصحف ب الروايه دي ل القارئ ده من خلال انك انتا بتعمل متغير المتغير ده بتجيب فيه ال تاج بتاع الروايه ومن خلاله انتا طبعا رابط ال  data-surahlist & data-server  & value عشان تجيب السوره بعد ما خدت الروايه لازم ال تاج ال اسمه اوبشن تحط ثلاثه اشيا هي 
    const selectmoshaf = Choosemosahf.options[Choosemosahf.selectedIndex] 
    const dataserver = `${selectmoshaf.dataset.server}` ;
    const suralist = `${selectmoshaf.dataset.surahlist}`
    getSurah(dataserver , suralist)
   } )

}
getMoshaf()

// الداله ال هنجيب منها السوره 

async function getSurah(dataserver , suralist) {
    const ChooseSurah = document.querySelector("#changeSurah")
    const respons = await fetch('https://mp3quran.net/api/v3/suwar')
    const datasurah = await respons.json() ; 
    console.log(datasurah)
    const surahNames = datasurah.suwar

    suralist = suralist.split(',')
    ChooseSurah.innerHTML = `<Option value=''>اختر سوره</Option>`

    suralist.forEach(surah => {
        const padsurah = surah.padStart(3 ,'0')
        surahNames.forEach(surahName => {
            if(surahName.id == surah){
                ChooseSurah.innerHTML += `<Option value=${dataserver}${padsurah}.mp3> ${surahName.name}</Option>`
            }
        })
    })
    ChooseSurah.addEventListener('change',  (e)=>{
        const selectsurah = ChooseSurah.options[ChooseSurah.selectedIndex] 
        playsurah(selectsurah.value)
       } )
}
getSurah()


function playsurah(surahMp3) {
    const playaudio = docxument.querySelector("#audio")
    playaudio.src = surahMp3 ;
    playaudio.play()
}


// video live 

function playvideo(channle) {
    if(Hls.isSupported()) {
        var video = document.getElementById('livevideo');
        var hls = new Hls();
        hls.loadSource(`${channle}`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
      });
     }
}




