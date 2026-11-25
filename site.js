/* ALK Hospitality & Development: shared text (EN / AR), settings and data.
   To go live: paste your form endpoint, your Revolut Business payment link and (optionally) your booking calendar link below.
   The join flow stays in demo mode until BOTH FORM_ENDPOINT and REVOLUT_PAYMENT_LINK are set. */
const SETTINGS = {
  FORM_ENDPOINT: "",        // where sign-ups are sent (JSON POST), e.g. https://formspree.io/f/xxxxxxx
  REVOLUT_PAYMENT_LINK: "", // e.g. https://checkout.revolut.com/pay/xxxx  (amount: 1,000 USD)
  CALENDAR_LINK: "",        // optional, e.g. https://calendly.com/alk-hospitality/visit. Empty = date and time picker on the site.
  INSTAGRAM: "https://www.instagram.com/mohammad_elkhaldy/",
  INSTAGRAM_HOUSE: "https://www.instagram.com/elkhaldy_hospitality/"
};
const FILE_FEE_AMOUNT_USD = 1000;
const LIVE = !!(SETTINGS.FORM_ENDPOINT && SETTINGS.REVOLUT_PAYMENT_LINK);

/* Map points. status: done (red) | progress (gold) | open (steel) | own (ivory).
   lat / lng come from Google Maps. Places inside Greater Cairo show on the Cairo view.
   confirm:true = status or details still to confirm: the point is shown grey, as "Status to confirm",
   and is not counted under its status until you remove confirm:true. noPin:true = address still missing. */
const CITIES = {
  cairo:[30.044,31.236],giza:[30.013,31.209],alex:[31.2,29.92],portsaid:[31.26,32.3],ismailia:[30.6,32.27],suez:[29.97,32.53],
  mansoura:[31.04,31.38],tanta:[30.79,31.0],fayoum:[29.31,30.84],minya:[28.1,30.75],asyut:[27.18,31.18],luxor:[25.69,32.64],
  aswan:[24.09,32.9],hurghada:[27.26,33.81],gouna:[27.39,33.68],sharm:[27.92,34.33],dahab:[28.5,34.51],marsaalam:[25.07,34.89],
  matrouh:[31.35,27.24],siwa:[29.2,25.52]
};
const PLACES = [
  {name:"Catchy Fish & More",lab:"t",lat:30.0568501,lng:31.2261862,area:"zamalek",type:"boat",status:"done",confirm:true,map:"https://maps.app.goo.gl/EXj9oAhNhRzdzKPo7"},
  {name:"Aubaine",lab:"r",lat:30.0191811,lng:31.0047654,area:"zayed",type:"restaurant",status:"done",confirm:true,map:"https://maps.app.goo.gl/73wDgWQCELmjLx4B6"},
  {name:"The Smokery",lab:"l",lat:29.9928867,lng:31.4142879,area:"katameya",type:"restaurant",status:"done",confirm:true,map:"https://maps.app.goo.gl/JwM9Z6TE8ARX18XNA"},
  {name:"Sky City Luxury Apartments",lab:"b",lat:30.0592337,lng:31.3319668,area:"nasr",type:"residence",status:"done",confirm:true,map:"https://maps.app.goo.gl/XCWJRU4zHbS9fgKM8"},
  {name:"Juli’s Restaurant & Cafe",lab:"l",lat:30.0900914,lng:31.3233985,area:"heliopolis",type:"restaurant",status:"done",confirm:true,map:"https://maps.app.goo.gl/FGwHMpyZijAbc1op6"},
  {name:"Beit Ward",lab:"l",lat:30.0486754,lng:31.2033398,area:"dokki",type:"restaurant",status:"done",confirm:true,map:"https://maps.app.goo.gl/fcEQEoqC8nGMsPTW8"},
  {name:"AREV Bistro",lab:"r",lat:30.0821147,lng:31.3441646,area:"almaza",type:"bistro",status:"done",confirm:true,map:"https://maps.app.goo.gl/yFdh47HT48SM7uL88"},
  {name:"Le Petit Jardin",lab:"r",lat:48.8373204,lng:2.4395935,area:"paris",type:"restaurant",status:"done",confirm:true,map:"https://www.google.com/maps/place/Le+Petit+Jardin/@48.8373204,2.4395935,17z/data=!4m6!3m5!1s0x47e67386e10b3e1b:0xffa28603bfa4672e!8m2!3d48.8373204!4d2.4395935"},
  {name:"Jouri",status:"own",type:"own",noPin:true,ig:"https://www.instagram.com/jouri.eg/"},
  {name:"Les Secrets",status:"own",type:"own",noPin:true,ig:"https://www.instagram.com/lessecrets.eg/"},
  {name:"80%",status:"own",type:"own",noPin:true,ig:"https://www.instagram.com/80percent.eg/"}
];
/* Countries for the join form (ISO codes). Names are shown in English or Arabic by the browser. Egypt is listed first. */
const COUNTRIES = "AD AE AF AG AI AL AM AO AR AT AU AW AZ BA BB BD BE BF BG BH BI BJ BM BN BO BR BS BT BW BY BZ CA CD CF CG CH CI CL CM CN CO CR CU CV CY CZ DE DJ DK DM DO DZ EC EE EG ER ES ET FI FJ FR GA GB GD GE GH GM GN GQ GR GT GW GY HK HN HR HT HU ID IE IN IQ IR IS IT JM JO JP KE KG KH KM KN KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MG MK ML MM MN MO MR MT MU MV MW MX MY MZ NA NE NG NI NL NO NP NZ OM PA PE PG PH PK PL PS PT PY QA RO RS RU RW SA SB SC SD SE SG SI SK SL SM SN SO SR SS ST SV SY SZ TD TG TH TJ TL TM TN TO TR TT TW TZ UA UG US UY UZ VA VC VE VN VU WS XK YE ZA ZM ZW".split(" ");
function countryName(code, lang){
  try { const n = new Intl.DisplayNames([lang], {type:"region"}).of(code); if (n && n !== code) return n; } catch (e) {}
  return code;
}
/* Greater Cairo view bounds */
const CAIRO = {w:570,h:300,lng0:30.95,lng1:31.47,lat1:30.177};
CAIRO.k = CAIRO.w/(CAIRO.lng1-CAIRO.lng0); CAIRO.lat0 = CAIRO.lat1 - CAIRO.h/(CAIRO.k/Math.cos(30.05*Math.PI/180));

const T = {
en:{
  navHome:"Home",navMap:"Our map",cta:"Add your restaurant",
  foot:"ALK Hospitality & Development · Restaurant consulting",
  /* home */
  h1:"Thirty years in kitchens. Now we work in yours.",
  lead:"Premium catering and restaurant consultancy, led by chef Mohammad Elkhaldy. We shape concepts, menus and guest experiences for places people return to.",
  readStory:"Read our story",drawNote:"Drawn by hand: zaatar and olive oil, olives, hummus, koshari, baladi bread, mint tea.",
  whoTitle:"Who we are",
  whoBody:"A chef-led house for premium catering and restaurant consultancy. We have run the pass on a full Friday night, opened places, trained teams and stood in front of a camera. That is the experience we bring to your restaurant.",
  diffs:[["Chef first","Every recommendation is tested against one question: will it work in the kitchen at 9 p.m.?"],["Food psychology","Why guests choose a dish, a table, a place, and what brings them back."],["Concept to service","From the idea and the brand to the menu, the costs and the team on the floor."]],
  storyTitle:"Our story",
  story:[["Damascus · 1996","At sixteen, Mohammad Elkhaldy walks into a kitchen for the first time. It is love at first sight."],["Syria, Lebanon, Egypt, the Emirates","More than twenty years in kitchens across the region. He also hosts cooking shows on Syrian television, for home cooks and professionals."],["France · 2015","The war forces him to leave Syria. He starts again in France and cooks with the Refugee Food Festival."],["Cancale · 2018","With chef Olivier Rœllinger he creates a zaatar blend, still sold today by Épices Rœllinger."],["Cairo","He co-founds Jouri, Les Secrets and 80%, and advises restaurants on concept, menu and the psychology of the guest."],["Today","ALK Hospitality & Development brings that path to other restaurants, wherever they are."]],
  storyNote:"Story drawn from public profiles and interviews. To be confirmed by Mohammad Elkhaldy.",
  storyPhotoGroup:"Story in photographs",storyPhotoAltOne:"A man standing under a single light in a dark studio.",storyPhotoAltTwo:"Open hands resting on a plate between cutlery and a glass.",storyPhotoAltThree:"A hand opening a steaming glass jar with a tomato inside.",
  storyPhotoCaptionOne:"Behind the scenes",storyPhotoCaptionTwo:"A place at the table",storyPhotoCaptionThree:"Keeping the season",
  svcTitle:"What we do",
  svc:[["Concept and positioning","Who the place is for, what it promises, and how that shows in the room, the menu and the prices."],["Menu and costing","A menu that reads clearly, is costed dish by dish, and sells what the kitchen does best."],["Guest experience","The path from the door to the bill: the welcome, the rhythm at the table, the details guests remember."],["Operations and team","Routines, roles and training so the standard holds on a busy night, not only on opening day."],["Openings and development","From the first plan to opening week, and the next site after that."],["Premium catering","A premium catering offering shaped around the occasion and the people at the table."]],
  joinTitle:"Working with us",
  joinBody:"Every restaurant we work with appears on our map. Its colour tells where the work stands. Opening a restaurant file costs $1,000 USD.",
  joinSteps:[["File opened","You add your restaurant and open your file. Your point appears on the map."],["Visit and project","You book a visit. We come to see you, then the project starts."],["Completed","The work is done. Your restaurant joins the red points."]],
  seeMap:"See the map",
  ticker:["Zaatar","Koshari","Hummus","Baladi bread","Mint tea","Concept","Menu","Service","The guest"],
  /* statuses */
  st:{done:"Completed",progress:"Project in progress",open:"File opened",own:"Our own houses",tbc:"Status to confirm"},
  types:{restaurant:"Restaurant",bistro:"Bistro",boat:"Restaurant on a Nile boat",residence:"Luxury residence",hotel:"Hotel restaurant",cafe:"Café",own:"Founded by Mohammad Elkhaldy"},
  areas:{zamalek:"Zamalek, Cairo",zayed:"Sheikh Zayed, Giza",katameya:"Katameya, New Cairo",nasr:"Nasr City, Cairo",heliopolis:"Heliopolis, Cairo",dokki:"Dokki, Giza",almaza:"Almaza, Heliopolis",paris:"Paris area, France"},
  workTbc:"Details of our work coming soon.",ownLine:"Co-founded by Mohammad Elkhaldy.",tbc:"Status to confirm",noAddr:"Address to add",gmaps:"Open in Google Maps",egypt:"Egypt",cairoView:"Greater Cairo",cluster:n=>`Greater Cairo · ${n}`,
  cities:{cairo:"Cairo",giza:"Giza",alex:"Alexandria",portsaid:"Port Said",ismailia:"Ismailia",suez:"Suez",mansoura:"Mansoura",tanta:"Tanta",fayoum:"Fayoum",minya:"Minya",asyut:"Asyut",luxor:"Luxor",aswan:"Aswan",hurghada:"Hurghada",gouna:"El Gouna",sharm:"Sharm El Sheikh",dahab:"Dahab",marsaalam:"Marsa Alam",matrouh:"Marsa Matrouh",siwa:"Siwa"},
  geo:{med:"Mediterranean Sea",red:"Red Sea",sinai:"Sinai",nile:"Nile",pyr:"Pyramids",zam:"Zamalek",hel:"Heliopolis",nc:"New Cairo",zay:"Sheikh Zayed",dt:"Downtown"},
  /* map page */
  mapH1:"The places we work with",
  mapLead:"Every point is a place we work with. Pick one to see what we did, or filter by status.",
  world:"World",zoomIn:"Zoom in",zoomOut:"Zoom out",mapFail:"The map could not load. The list of places still works.",
  sampleNote:"Places from Google Maps. Grey points are still being confirmed.",noPins:"No point on the map yet for this filter: addresses still to add.",
  allPlaces:"All places",visitIg:"Instagram",
  /* join flow */
  addTitle:"Add your restaurant",
  addLead:"Open your restaurant file for $1,000 USD, then arrange a visit with our team.",
  s1:"Your restaurant",s2:"Your file",s3:"Book the visit",
  fName:"Restaurant name",fCountry:"Country",fCity:"City",eCity:"Please add your city.",fPerson:"Your name",fContact:"Phone or email",fNeed:"What do you need?",
  needs:["Opening a new venue","Repositioning a concept","Menu and costing","Guest experience","Operations and team","Events","Something else"],
  next:"Continue",back:"Back",
  eReq:"Please fill this in.",eContact:"Please add a valid phone number or email address.",eSend:"We could not send your details. Check your connection and try again.",sending:"Sending…",
  feeWhat:"The file-opening fee is $1,000 USD.",
  fileFee:"$1,000 USD",fileFeeLabel:"Restaurant file opening fee",fileFeeNote:"Amount in USD · payment link not yet connected",fileFeeNoteLive:"Amount in USD · payment handled through Revolut",
  pay:"Pay $1,000 USD · open my file",payMethods:"Payment handled through Revolut. Payment is confirmed manually.",
  paymentStatus:"Online payment is not set up yet. No payment will be taken on this site.",
  demoPay:"Continue in preview mode without paying",
  payNext:"I have paid, continue",payRef:r=>`Your file reference: ${r}. Keep it: we use it to match your payment.`,
  paidLine:"Your file is open.",paidLineLive:"Thank you. We will confirm your payment.",
  bookLead:"Choose a day and a time for our visit.",fDate:"Date",fSlot:"Time",
  slots:["10:00","12:00","15:00","17:00"],
  openCal:"Open the calendar",book:"Book the visit",calDone:"I have booked my visit",bookLeadCal:"Open the calendar, choose a day and a time, then come back here.",
  doneTitle:"See you soon.",
  at:(d,s)=>`${d} at ${s}`,
  doneBody:(n,w)=>`${n} is on the map as a file opened.${w ? ` Visit requested for ${w}.` : ""} Once we start working together, your point turns gold.`,
  doneLive:(n,w)=>`We received the file for ${n}.${w ? ` Visit requested for ${w}.` : ""} Once we confirm your payment and your visit, your restaurant appears on our map.`,
  demoNote:"Demo: nothing is paid or sent, and your point is only shown in this browser.",
  showMine:"Show it on the map"
},
fr:{
  navHome:"Accueil",navMap:"Notre carte",cta:"Ajoutez votre restaurant",
  foot:"ALK Hospitality & Development · Conseil en restauration",
  /* home */
  h1:"Trente ans en cuisine. Aujourd’hui, nous travaillons dans la vôtre.",
  lead:"Traiteur premium et conseil en restauration, dirigés par le chef Mohammad Elkhaldy. Nous façonnons des concepts, des cartes et des expériences qui donnent envie de revenir.",
  readStory:"Lire notre histoire",drawNote:"Dessiné à la main : zaatar et huile d’olive, olives, houmous, koshari, pain baladi, thé à la menthe.",
  whoTitle:"Qui sommes-nous",
  whoBody:"Une maison menée par un chef, entre traiteur premium et conseil en restauration. Nous avons tenu le passe un vendredi soir complet, ouvert des lieux, formé des équipes et cuisiné devant la caméra. C’est cette expérience que nous apportons à votre restaurant.",
  diffs:[["Le chef d’abord","Chaque recommandation passe un seul test : est-ce que ça tient en cuisine à 21 h ?"],["Psychologie du goût","Pourquoi un client choisit un plat, une table, un lieu, et ce qui le fait revenir."],["Du concept au service","De l’idée et de la marque à la carte, aux coûts et à l’équipe en salle."]],
  storyTitle:"Notre histoire",
  story:[["Damas · 1996","À seize ans, Mohammad Elkhaldy entre pour la première fois dans une cuisine. C’est le coup de foudre."],["Syrie, Liban, Égypte, Émirats","Plus de vingt ans dans les cuisines de la région. Il anime aussi des émissions culinaires à la télévision syrienne, pour les amateurs comme pour les professionnels."],["France · 2015","La guerre l’oblige à quitter la Syrie. Il repart de zéro en France et cuisine avec le Refugee Food Festival."],["Cancale · 2018","Avec le chef Olivier Rœllinger, il crée un mélange de zaatar, toujours vendu aujourd’hui par Épices Rœllinger."],["Le Caire","Il cofonde Jouri, Les Secrets et 80 %, et conseille des restaurants sur le concept, la carte et la psychologie du client."],["Aujourd’hui","ALK Hospitality & Development met ce parcours au service d’autres restaurants, où qu’ils soient."]],
  storyNote:"Histoire tirée de profils publics et d’entretiens. À confirmer par Mohammad Elkhaldy.",
  storyPhotoGroup:"Notre histoire en images",storyPhotoAltOne:"Un homme debout sous une lumière, dans un studio sombre.",storyPhotoAltTwo:"Des mains ouvertes posées sur une assiette, entre des couverts et un verre.",storyPhotoAltThree:"Une main ouvre un bocal en verre fumant contenant une tomate.",
  storyPhotoCaptionOne:"Dans les coulisses",storyPhotoCaptionTwo:"À table",storyPhotoCaptionThree:"Préserver la saison",
  svcTitle:"Ce que nous faisons",
  svc:[["Concept et positionnement","À qui s’adresse le lieu, ce qu’il promet, et comment cela se voit dans la salle, la carte et les prix."],["Carte et coûts","Une carte claire, chiffrée plat par plat, qui met en avant ce que la cuisine fait le mieux."],["Expérience client","Le parcours de la porte à l’addition : l’accueil, le rythme à table, les détails dont on se souvient."],["Organisation et équipe","Des routines, des rôles et de la formation pour tenir le niveau un soir de rush, pas seulement le jour de l’ouverture."],["Ouvertures et développement","Du premier plan à la semaine d’ouverture, puis l’adresse suivante."],["Traiteur premium","Une offre traiteur pensée autour de l’occasion et des personnes réunies à table."]],
  joinTitle:"Travailler avec nous",
  joinBody:"Chaque restaurant avec lequel nous travaillons apparaît sur notre carte. Sa couleur indique où en est le travail. L’ouverture d’un dossier restaurant coûte 1 000 $ US.",
  joinSteps:[["Dossier ouvert","Vous ajoutez votre restaurant et ouvrez votre dossier. Votre point apparaît sur la carte."],["Visite et projet","Vous réservez une visite. Nous venons vous voir, puis le projet commence."],["Terminé","Le travail est fait. Votre restaurant rejoint les points rouges."]],
  seeMap:"Voir la carte",
  ticker:["Zaatar","Koshari","Houmous","Pain baladi","Thé à la menthe","Concept","Carte","Service","Le client"],
  /* statuses */
  st:{done:"Terminé",progress:"Projet en cours",open:"Dossier ouvert",own:"Nos maisons",tbc:"Statut à confirmer"},
  types:{restaurant:"Restaurant",bistro:"Bistrot",boat:"Restaurant sur un bateau du Nil",residence:"Résidence de luxe",hotel:"Restaurant d’hôtel",cafe:"Café",own:"Fondé par Mohammad Elkhaldy"},
  areas:{zamalek:"Zamalek, Le Caire",zayed:"Cheikh Zayed, Gizeh",katameya:"Katameya, Nouveau Caire",nasr:"Nasr City, Le Caire",heliopolis:"Héliopolis, Le Caire",dokki:"Dokki, Gizeh",almaza:"Almaza, Héliopolis",paris:"Région parisienne, France"},
  workTbc:"Le détail de notre travail arrive bientôt.",ownLine:"Cofondé par Mohammad Elkhaldy.",tbc:"Statut à confirmer",noAddr:"Adresse à ajouter",gmaps:"Ouvrir dans Google Maps",egypt:"Égypte",cairoView:"Grand Caire",cluster:n=>`Grand Caire · ${n}`,
  cities:{cairo:"Le Caire",giza:"Gizeh",alex:"Alexandrie",portsaid:"Port-Saïd",ismailia:"Ismaïlia",suez:"Suez",mansoura:"Mansourah",tanta:"Tanta",fayoum:"Fayoum",minya:"Minya",asyut:"Assiout",luxor:"Louxor",aswan:"Assouan",hurghada:"Hurghada",gouna:"El Gouna",sharm:"Charm el-Cheikh",dahab:"Dahab",marsaalam:"Marsa Alam",matrouh:"Marsa Matrouh",siwa:"Siwa"},
  geo:{med:"Mer Méditerranée",red:"Mer Rouge",sinai:"Sinaï",nile:"Nil",pyr:"Pyramides",zam:"Zamalek",hel:"Héliopolis",nc:"Nouveau Caire",zay:"Cheikh Zayed",dt:"Centre-ville"},
  /* map page */
  mapH1:"Les lieux avec lesquels nous travaillons",
  mapLead:"Chaque point est un lieu avec lequel nous travaillons. Choisissez-en un pour voir ce que nous avons fait, ou filtrez par statut.",
  world:"Monde",zoomIn:"Zoomer",zoomOut:"Dézoomer",mapFail:"La carte n’a pas pu se charger. La liste des lieux fonctionne toujours.",
  sampleNote:"Lieux issus de Google Maps. Les points gris sont en cours de confirmation.",noPins:"Aucun point sur la carte pour ce filtre : adresses encore à ajouter.",
  allPlaces:"Tous les lieux",visitIg:"Instagram",
  /* join flow */
  addTitle:"Ajoutez votre restaurant",
  addLead:"Ouvrez le dossier de votre restaurant pour 1 000 $ US, puis convenez d’une visite avec notre équipe.",
  s1:"Votre restaurant",s2:"Votre dossier",s3:"Réserver la visite",
  fName:"Nom du restaurant",fCountry:"Pays",fCity:"Ville",eCity:"Merci d’indiquer votre ville.",fPerson:"Votre nom",fContact:"Téléphone ou e-mail",fNeed:"De quoi avez-vous besoin ?",
  needs:["Ouvrir un nouveau lieu","Repositionner un concept","Carte et coûts","Expérience client","Organisation et équipe","Événements","Autre chose"],
  next:"Continuer",back:"Retour",
  eReq:"Merci de remplir ce champ.",eContact:"Merci d’indiquer un numéro de téléphone ou un e-mail valide.",eSend:"Impossible d’envoyer vos informations. Vérifiez votre connexion et réessayez.",sending:"Envoi…",
  feeWhat:"Les frais d’ouverture du dossier sont de 1 000 $ US.",
  fileFee:"1 000 $ US",fileFeeLabel:"Frais d’ouverture du dossier restaurant",fileFeeNote:"Montant en dollars US · lien de paiement pas encore configuré",fileFeeNoteLive:"Montant en dollars US · paiement via Revolut",
  pay:"Payer 1 000 $ US · ouvrir mon dossier",payMethods:"Paiement via Revolut. La confirmation du paiement est manuelle.",
  paymentStatus:"Le paiement en ligne n’est pas encore configuré. Aucun paiement ne sera prélevé sur ce site.",
  demoPay:"Continuer en aperçu sans payer",
  payNext:"J’ai payé, continuer",payRef:r=>`Référence de votre dossier : ${r}. Gardez-la : elle nous sert à retrouver votre paiement.`,
  paidLine:"Votre dossier est ouvert.",paidLineLive:"Merci. Nous allons confirmer votre paiement.",
  bookLead:"Choisissez un jour et une heure pour notre visite.",fDate:"Date",fSlot:"Heure",
  slots:["10:00","12:00","15:00","17:00"],
  openCal:"Ouvrir le calendrier",book:"Réserver la visite",calDone:"J’ai réservé ma visite",bookLeadCal:"Ouvrez le calendrier, choisissez un jour et une heure, puis revenez ici.",
  doneTitle:"À très bientôt.",
  at:(d,s)=>`le ${d} à ${s}`,
  doneBody:(n,w)=>`${n} est sur la carte en dossier ouvert.${w ? ` Visite demandée ${w}.` : ""} Dès que nous commençons à travailler ensemble, votre point passe en doré.`,
  doneLive:(n,w)=>`Nous avons bien reçu le dossier de ${n}.${w ? ` Visite demandée ${w}.` : ""} Dès que nous aurons confirmé votre paiement et votre visite, votre restaurant apparaîtra sur notre carte.`,
  demoNote:"Démo : rien n’est payé ni envoyé, et votre point n’apparaît que dans ce navigateur.",
  showMine:"Le voir sur la carte"
},
ar:{
  navHome:"الرئيسية",navMap:"خريطتنا",cta:"أضف مطعمك",
  foot:"ALK للضيافة والتطوير · استشارات المطاعم",
  h1:"ثلاثون عامًا في المطابخ. والآن نعمل في مطبخك.",
  lead:"ضيافة راقية واستشارات للمطاعم بقيادة الشيف محمد الخالدي. نصوغ المفاهيم والقوائم وتجارب الضيوف التي تجعلهم يعودون.",
  readStory:"اقرأ قصتنا",drawNote:"مرسومة باليد: زعتر وزيت زيتون، زيتون، حمّص، كشري، عيش بلدي، شاي بالنعناع.",
  whoTitle:"من نحن",
  whoBody:"بيت يقوده شيف للضيافة الراقية واستشارات المطاعم. عملنا على خط الخدمة في ليالي الجمعة المزدحمة، وافتتحنا أماكن، ودرّبنا فرقًا، ووقفنا أمام الكاميرا. هذه هي الخبرة التي نحملها إلى مطعمك.",
  diffs:[["الشيف أولًا","كل توصية تُختبر بسؤال واحد: هل ستنجح في المطبخ في التاسعة مساءً؟"],["سيكولوجية الطعام","لماذا يختار الضيف طبقًا وطاولة ومكانًا، وما الذي يعيده."],["من الفكرة إلى الخدمة","من الفكرة والعلامة إلى القائمة والتكاليف والفريق في الصالة."]],
  storyTitle:"قصتنا",
  story:[["دمشق · 1996","في السادسة عشرة، يدخل محمد الخالدي المطبخ لأول مرة. حبّ من النظرة الأولى."],["سوريا، لبنان، مصر، الإمارات","أكثر من عشرين عامًا في مطابخ المنطقة. وقدّم أيضًا برامج طبخ على التلفزيون السوري، للهواة والمحترفين."],["فرنسا · 2015","أجبرته الحرب على مغادرة سوريا. بدأ من جديد في فرنسا وطبخ مع مهرجان Refugee Food Festival."],["كانكال · 2018","ابتكر مع الشيف أوليفييه رولينجر خلطة زعتر ما زالت تُباع حتى اليوم لدى Épices Rœllinger."],["القاهرة","شارك في تأسيس جوري ولي سيكريه و80%، ويقدّم الاستشارات للمطاعم في المفهوم والقائمة وسيكولوجية الضيف."],["اليوم","تنقل ALK للضيافة والتطوير هذه المسيرة إلى مطاعم أخرى، أينما كانت."]],
  storyNote:"القصة مأخوذة من ملفات ومقابلات منشورة. بانتظار تأكيد محمد الخالدي.",
  storyPhotoGroup:"قصتنا بالصور",storyPhotoAltOne:"رجل يقف تحت ضوء واحد في استوديو مظلم.",storyPhotoAltTwo:"يدان مفتوحتان على طبق بين أدوات المائدة وكأس.",storyPhotoAltThree:"يد تفتح مرطبانًا زجاجيًا يتصاعد منه البخار وفيه حبة طماطم.",
  storyPhotoCaptionOne:"من خلف الكواليس",storyPhotoCaptionTwo:"مكان على المائدة",storyPhotoCaptionThree:"حفظ الموسم",
  svcTitle:"ما نقدمه",
  svc:[["المفهوم والتموضع","لمن هذا المكان، وبماذا يَعِد، وكيف يظهر ذلك في القاعة وقائمة الطعام والأسعار."],["القائمة والتكاليف","قائمة واضحة القراءة، محسوبة التكلفة طبقًا بطبق، تبيع أفضل ما يتقنه المطبخ."],["تجربة الضيف","الرحلة من الباب حتى الفاتورة: الاستقبال، وإيقاع الطاولة، والتفاصيل التي يتذكرها الضيوف."],["التشغيل والفريق","إجراءات وأدوار وتدريب تحافظ على المستوى في الليالي المزدحمة، لا في يوم الافتتاح فقط."],["الافتتاح والتطوير","من الخطة الأولى حتى أسبوع الافتتاح، ثم الفرع التالي."],["الضيافة الراقية","خدمة ضيافة راقية تُصاغ بما يناسب المناسبة والضيوف حول المائدة."]],
  joinTitle:"العمل معنا",
  joinBody:"كل مطعم نعمل معه يظهر على خريطتنا، ولونه يخبر أين وصل العمل. تبلغ رسوم فتح ملف المطعم 1,000 دولار أمريكي.",
  joinSteps:[["ملف مفتوح","تضيف مطعمك وتفتح ملفك. تظهر نقطتك على الخريطة."],["الزيارة والمشروع","تحجز موعد الزيارة. نأتي لرؤيتك، ثم يبدأ المشروع."],["مكتمل","انتهى العمل. ينضم مطعمك إلى النقاط الحمراء."]],
  seeMap:"شاهد الخريطة",
  ticker:["زعتر","كشري","حمّص","عيش بلدي","شاي بالنعناع","المفهوم","القائمة","الخدمة","الضيف"],
  st:{done:"مكتمل",progress:"مشروع قيد التنفيذ",open:"ملف مفتوح",own:"بيوتنا الخاصة",tbc:"الحالة بانتظار التأكيد"},
  types:{restaurant:"مطعم",bistro:"بيسترو",boat:"مطعم على مركب نيلي",residence:"شقق فندقية فاخرة",hotel:"فندق ومطعم",cafe:"مقهى",own:"أسسها محمد الخالدي"},
  areas:{zamalek:"الزمالك، القاهرة",zayed:"الشيخ زايد، الجيزة",katameya:"القطامية، القاهرة الجديدة",nasr:"مدينة نصر، القاهرة",heliopolis:"مصر الجديدة، القاهرة",dokki:"الدقي، الجيزة",almaza:"ألماظة، مصر الجديدة",paris:"منطقة باريس، فرنسا"},
  workTbc:"تفاصيل عملنا قريبًا.",ownLine:"شارك في تأسيسه محمد الخالدي.",tbc:"الحالة بانتظار التأكيد",noAddr:"العنوان لم يُضف بعد",gmaps:"افتح في خرائط Google",egypt:"مصر",cairoView:"القاهرة الكبرى",cluster:n=>`القاهرة الكبرى · ${n}`,
  cities:{cairo:"القاهرة",giza:"الجيزة",alex:"الإسكندرية",portsaid:"بورسعيد",ismailia:"الإسماعيلية",suez:"السويس",mansoura:"المنصورة",tanta:"طنطا",fayoum:"الفيوم",minya:"المنيا",asyut:"أسيوط",luxor:"الأقصر",aswan:"أسوان",hurghada:"الغردقة",gouna:"الجونة",sharm:"شرم الشيخ",dahab:"دهب",marsaalam:"مرسى علم",matrouh:"مرسى مطروح",siwa:"سيوة"},
  geo:{med:"البحر المتوسط",red:"البحر الأحمر",sinai:"سيناء",nile:"النيل",pyr:"الأهرامات",zam:"الزمالك",hel:"مصر الجديدة",nc:"القاهرة الجديدة",zay:"الشيخ زايد",dt:"وسط البلد"},
  mapH1:"الأماكن التي نعمل معها",
  mapLead:"كل نقطة مكان نعمل معه. اختر نقطة لترى ما قمنا به، أو صفِّ حسب الحالة.",
  world:"العالم",zoomIn:"تكبير",zoomOut:"تصغير",mapFail:"تعذّر تحميل الخريطة. قائمة الأماكن ما زالت تعمل.",
  sampleNote:"الأماكن من خرائط Google. النقاط الرمادية قيد التأكيد.",noPins:"لا توجد نقاط على الخريطة لهذا الفلتر بعد: العناوين لم تُضف.",
  allPlaces:"كل الأماكن",visitIg:"إنستغرام",
  addTitle:"أضف مطعمك",
  addLead:"افتح ملف مطعمك مقابل 1,000 دولار أمريكي، ثم نسّق موعد زيارة مع فريقنا.",
  s1:"مطعمك",s2:"فتح الملف",s3:"حجز الزيارة",
  fName:"اسم المطعم",fCountry:"الدولة",fCity:"المدينة",eCity:"يرجى إضافة مدينتك.",fPerson:"اسمك",fContact:"الهاتف أو البريد الإلكتروني",fNeed:"ما الذي تحتاجه؟",
  needs:["افتتاح مكان جديد","إعادة تموضع المفهوم","القائمة والتكاليف","تجربة الضيف","التشغيل والفريق","فعاليات","أمر آخر"],
  next:"متابعة",back:"رجوع",
  eReq:"يرجى ملء هذا الحقل.",eContact:"يرجى إضافة رقم هاتف أو بريد إلكتروني صحيح.",eSend:"تعذّر إرسال بياناتك. تحقّق من الاتصال وحاول مجددًا.",sending:"جارٍ الإرسال…",
  feeWhat:"رسوم فتح الملف 1,000 دولار أمريكي.",
  fileFee:"1,000 دولار أمريكي",fileFeeLabel:"رسوم فتح ملف المطعم",fileFeeNote:"المبلغ بالدولار الأمريكي · رابط الدفع غير مُعدّ بعد",fileFeeNoteLive:"المبلغ بالدولار الأمريكي · الدفع عبر Revolut",
  pay:"ادفع 1,000 دولار أمريكي · افتح الملف",payMethods:"الدفع عبر Revolut. يتم تأكيد الدفع يدويًا.",
  paymentStatus:"الدفع عبر الإنترنت غير مُعدّ بعد. لن يتم تحصيل أي مبلغ عبر هذا الموقع.",
  demoPay:"تابع في وضع المعاينة دون دفع",
  payNext:"دفعت، متابعة",payRef:r=>`رقم ملفك: ${r}. احتفظ به: نستخدمه لمطابقة دفعتك.`,
  paidLine:"ملفك مفتوح.",paidLineLive:"شكرًا. سنؤكد دفعتك.",
  bookLead:"اختر يومًا وساعة لزيارتنا.",fDate:"التاريخ",fSlot:"الساعة",
  slots:["10:00","12:00","15:00","17:00"],
  openCal:"افتح التقويم",book:"احجز الزيارة",calDone:"حجزت موعد الزيارة",bookLeadCal:"افتح التقويم واختر يومًا وساعة، ثم عد إلى هنا.",
  doneTitle:"نراك قريبًا.",
  at:(d,s)=>`يوم ${d} الساعة ${s}`,
  doneBody:(n,w)=>`${n} على الخريطة كملف مفتوح.${w ? ` طُلبت الزيارة ${w}.` : ""} حين نبدأ العمل معًا تتحول نقطتك إلى اللون الذهبي.`,
  doneLive:(n,w)=>`استلمنا ملف ${n}.${w ? ` طُلبت الزيارة ${w}.` : ""} حين نؤكد دفعتك وموعد زيارتك، يظهر مطعمك على خريطتنا.`,
  demoNote:"تجربة: لا يُدفع أو يُرسل شيء، ونقطتك تظهر في هذا المتصفح فقط.",
  showMine:"اعرضه على الخريطة"
}};

const LANGS = ["en", "fr", "ar"];
let LANG = "en";
try { const s = localStorage.getItem("alk-lang"); if (LANGS.includes(s)) LANG = s; } catch (e) {}
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const t = () => T[LANG];

function applyText(){
  const d = t();
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-t]").forEach(el => { const v = d[el.dataset.t]; if (typeof v === "string") el.textContent = v; });
  document.querySelectorAll("[data-t-alt]").forEach(el => { const v = d[el.dataset.tAlt]; if (typeof v === "string") el.alt = v; });
  document.querySelectorAll("[data-t-aria]").forEach(el => { const v = d[el.dataset.tAria]; if (typeof v === "string") el.setAttribute("aria-label", v); });
  document.querySelectorAll("[data-geo]").forEach(el => el.textContent = d.geo[el.dataset.geo]);
  document.querySelectorAll("#langs button").forEach(b => b.setAttribute("aria-pressed", b.dataset.l === LANG));
}
/* life: sections rise in on scroll; the story line fills as you read */
function initMotion(){
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  const targets = [...document.querySelectorAll("main .band > *, .intro, .legend, .explore")].filter(el => !el.closest(".hero"));
  targets.forEach(el => el.classList.add("rv"));
  ["diffs", "storyList", "svc", "steps"].forEach(id => { const e = $(id); if (e) { e.classList.add("stg"); if (!e.closest(".rv")) e.classList.add("rv"); } });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {rootMargin:"0px 0px -8% 0px", threshold:.06});
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
}
function storyLine(){
  const story = $("storyList"); if (!story) return;
  const mid = innerHeight * .62, r = story.getBoundingClientRect();
  story.style.setProperty("--p", Math.min(1, Math.max(0, (mid - r.top) / r.height)).toFixed(3));
  story.querySelectorAll("li").forEach(li => li.classList.toggle("on", li.getBoundingClientRect().top + 14 < mid));
}
addEventListener("scroll", storyLine, {passive:true}); addEventListener("resize", storyLine);
function initLang(render){
  document.querySelectorAll("#langs button").forEach(b => b.addEventListener("click", () => {
    if (b.dataset.l === LANG) return;
    LANG = b.dataset.l;
    try { localStorage.setItem("alk-lang", LANG); } catch (e) {}
    applyText(); render(); storyLine();
  }));
  applyText(); render(); initMotion(); storyLine();
}
