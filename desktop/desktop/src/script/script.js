/* NMS Passport Desktop v2.0.0 — Web core v2.2 — Haizenchi — bilingual FR/EN */
(() => {
'use strict';

const APP_VERSION = '2.0.0';
const DATA_SCHEMA_VERSION = '2.2';
const APP_AUTHOR = 'Haizenchi';
const BASE_W = 1600, BASE_H = 1000;
const MODULES = ['identity','ship','base','discovery'];
const SUPPORTED_LANGS = ['en','fr'];
const GALAXIES = [
  ['1','Euclid'],['2','Hilbert Dimension'],['3','Calypso'],['4','Hesperius Dimension'],['5','Hyades'],
  ['6','Ickjamatew'],['7','Budullangr'],['8','Kikolgallr'],['9','Eltiensleen'],['10','Eissentam']
];
const ROLE_VALUES = ['','traveller','explorer','pilot','captain','merchant','mercenary','architect','naturalist','smuggler'];
const DISCOVERY_CATEGORIES = ['', 'Planète', 'Faune', 'Flore', 'Minéral', 'Lieu remarquable', 'Épave'];
const I18N = {
  en:{
    meta:{description:"Community toolkit for creating Traveller, ship, base and discovery cards for No Man's Sky."},
    aria:{profileManagement:'Profile management',modules:'Passport modules',cardPreview:'Card preview',close:'Close'},
    ui:{language:'Language',previewOnly:'Preview only',showEditor:'Show editor',localProfiles:'Local profiles',blankSession:'— Blank session —',save:'Save',new:'New',delete:'Delete',exportJson:'Export JSON',importJson:'Import JSON',copyData:'Copy data',localProcessing:'Local processing',identity:'Identity',ship:'Ship',base:'Base',discovery:'Discovery',theme:'Theme',cardLayout:'Card layout',cardFormat:'Card 16:10',squareFormat:'Square 1:1',bannerFormat:'Banner 16:9',identityHeading:'Traveller identity',name:'Name',max32:'32 characters',race:'Race',role:'Role',travellerCode:'Traveller code',generate:'Generate',galaxy:'Galaxy',customName:'Custom name',optional:'Optional',portrait:'Portrait',chooseImage:'Choose image',remove:'Remove',shipHeading:'Ship record',shipName:'Ship name',type:'Type',shipTypePlaceholder:'Fighter, Corvette…',class:'Class',system:'System',damage:'Damage',shield:'Shield',hyperdrive:'Hyperdrive',maneuverability:'Maneuverability',shipCapture:'Ship screenshot',baseHeading:'Base record',baseName:'Base name',baseTypePlaceholder:'Outpost, farm…',planet:'Planet',shortDescription:'Short description',baseNotePlaceholder:'View, purpose, services, notable features…',baseCapture:'Base screenshot',discoveryHeading:'Discovery record',category:'Category',weather:'Weather',sentinels:'Sentinels',resources:'Resources',discoveryCapture:'Discovery screenshot',renderQuality:'Render quality',imageFormat:'Image format',compressionQuality:'Compression quality',standard:'Standard',highQuality:'High quality',veryHighQuality:'Very high quality',exportImage:'Export image',resetModule:'Reset this module',chooseGlyph:'Choose a glyph',clearSlot:'Clear this slot',portalAddress:'Portal address',glyphInfo:'12 glyphs • 0–F',glyphTitle:'Glyph {n}',zoom:'Zoom',choose:'— Choose —',otherGalaxy:'Other galaxy'},
    modules:{identity:'Atlas Accreditation',ship:'Ship Record',base:'Base Record',discovery:'Discovery Report'},
    roles:{traveller:'Traveller',explorer:'Explorer',pilot:'Pilot',captain:'Captain',merchant:'Merchant',mercenary:'Mercenary',architect:'Architect',naturalist:'Naturalist',smuggler:'Smuggler'},
    categories:{'Planète':'Planet','Faune':'Fauna','Flore':'Flora','Minéral':'Mineral','Lieu remarquable':'Notable location','Épave':'Wreck'},
    glyphs:{Sunset:'Sunset',Bird:'Bird',Face:'Face',Diplo:'Diplo',Eclipse:'Eclipse',Balloon:'Balloon',Boat:'Boat',Bug:'Bug',Dragonfly:'Dragonfly',Galaxy:'Galaxy',Voxel:'Voxel',Fish:'Fish',Tent:'Tent',Rocket:'Rocket',Tree:'Tree',Atlas:'Atlas'},
    canvas:{identityTitle:'ATLAS ACCREDITATION',identitySubtitle:'TRAVELLER / EXPLORER IDENTIFICATION',name:'Name',race:'Race',code:'Code',affiliation:'AFFILIATION',verified:'TRAVELLER VERIFIED',role:'ROLE',galaxy:'GALAXY',mainAddress:'MAIN ADDRESS',portalAddress:'PORTAL ADDRESS',shipTitle:'SHIP RECORD',shipSubtitle:'TECHNICAL SHEET / DISCOVERY COORDINATES',shipName:'Ship name',type:'Type',class:'Class',system:'System',damage:'Damage',shield:'Shield',hyperdriveShort:'Hyperdrive',maneuverability:'Maneuverability',baseTitle:'BASE RECORD',baseSubtitle:'LOCATION / SERVICES / PORTAL ACCESS',baseName:'Base name',planet:'Planet',description:'DESCRIPTION',discoveryTitle:'DISCOVERY REPORT',discoverySubtitle:'CATALOGUE / ENVIRONMENT / COORDINATES',category:'Category',biome:'Biome',weather:'Weather',sentinels:'Sentinels',resources:'Resources'},
    msg:{imageFormat:'Unsupported image format. Use JPG, PNG or WEBP.',imageTooLarge:'Image is too large (18 MB max).',imageInvalid:'Invalid image or excessive dimensions.',secureGenerationUnavailable:'Secure generation is unavailable in this application.',imageExported:'{format} {w} × {h} exported.',jsonExported:'JSON profile exported.',jsonImported:'JSON profile imported and validated.',jsonInvalid:'Invalid, oversized or non-compliant JSON file.',profilePrompt:'Local profile name:',defaultProfile:'My Traveller',profileSaved:'Profile saved locally.',profileLoaded:'Profile “{name}” loaded.',selected:'selected',deleteProfileConfirm:'Delete profile “{name}”?',profileDeleted:'Profile deleted.',newSessionConfirm:'Create a blank session? Unsaved data will be lost.',newSession:'New blank session.',dataCopied:'Card data copied.',shareError:'Unable to create or copy sharing data.',saveProfileError:'Unable to save profile.',resetConfirm:'Reset the “{module}” module?',moduleReset:'Module reset.',desktopSaveError:'Unable to save the file.',desktopOpenError:'Unable to open the selected file.'}
  },
  fr:{
    meta:{description:"Outil communautaire pour créer des cartes de voyageur, vaisseau, base et découverte pour No Man's Sky."},
    aria:{profileManagement:'Gestion des profils',modules:'Modules du passeport',cardPreview:'Aperçu de la carte',close:'Fermer'},
    ui:{language:'Langue',previewOnly:'Aperçu seul',showEditor:'Afficher l’éditeur',localProfiles:'Profils locaux',blankSession:'— Session vierge —',save:'Enregistrer',new:'Nouveau',delete:'Supprimer',exportJson:'Exporter JSON',importJson:'Importer JSON',copyData:'Copier les données',localProcessing:'Traitement local',identity:'Identité',ship:'Vaisseau',base:'Base',discovery:'Découverte',theme:'Thème',cardLayout:'Disposition',cardFormat:'Carte 16:10',squareFormat:'Carré 1:1',bannerFormat:'Bannière 16:9',identityHeading:'Identité du voyageur',name:'Nom',max32:'32 caractères',race:'Race',role:'Fonction',travellerCode:'Code voyageur',generate:'Générer',galaxy:'Galaxie',customName:'Nom personnalisé',optional:'Optionnel',portrait:'Portrait',chooseImage:'Choisir une image',remove:'Retirer',shipHeading:'Fiche vaisseau',shipName:'Nom du vaisseau',type:'Type',shipTypePlaceholder:'Chasseur, Corvette…',class:'Classe',system:'Système',damage:'Dégâts',shield:'Bouclier',hyperdrive:'Hyperpropulsion',maneuverability:'Maniabilité',shipCapture:'Capture du vaisseau',baseHeading:'Fiche de base',baseName:'Nom de la base',baseTypePlaceholder:'Avant-poste, ferme…',planet:'Planète',shortDescription:'Description courte',baseNotePlaceholder:'Vue, fonction, services, particularité…',baseCapture:'Capture de la base',discoveryHeading:'Fiche de découverte',category:'Catégorie',weather:'Météo',sentinels:'Sentinelles',resources:'Ressources',discoveryCapture:'Capture de la découverte',renderQuality:'Qualité de rendu',imageFormat:'Format d’image',compressionQuality:'Qualité de compression',standard:'Standard',highQuality:'Haute qualité',veryHighQuality:'Très haute qualité',exportImage:'Exporter l’image',resetModule:'Réinitialiser ce module',chooseGlyph:'Choisir un glyphe',clearSlot:'Vider cet emplacement',portalAddress:'Adresse portail',glyphInfo:'12 glyphes • 0–F',glyphTitle:'Glyphe {n}',zoom:'Zoom',choose:'— Choisir —',otherGalaxy:'Autre galaxie'},
    modules:{identity:'Accréditation Atlas',ship:'Dossier vaisseau',base:'Dossier de base',discovery:'Rapport de découverte'},
    roles:{traveller:'Voyageur',explorer:'Explorateur',pilot:'Pilote',captain:'Capitaine',merchant:'Marchand',mercenary:'Mercenaire',architect:'Architecte',naturalist:'Naturaliste',smuggler:'Contrebandier'},
    categories:{'Planète':'Planète','Faune':'Faune','Flore':'Flore','Minéral':'Minéral','Lieu remarquable':'Lieu remarquable','Épave':'Épave'},
    glyphs:{Sunset:'Coucher',Bird:'Oiseau',Face:'Visage',Diplo:'Diplo',Eclipse:'Éclipse',Balloon:'Ballon',Boat:'Bateau',Bug:'Insecte',Dragonfly:'Libellule',Galaxy:'Galaxie',Voxel:'Voxel',Fish:'Poisson',Tent:'Tente',Rocket:'Fusée',Tree:'Arbre',Atlas:'Atlas'},
    canvas:{identityTitle:'ACCRÉDITATION ATLAS',identitySubtitle:'IDENTIFICATION VOYAGEUR / EXPLORATEUR',name:'Nom',race:'Race',code:'Code',affiliation:'AFFILIATION',verified:'VOYAGEUR VÉRIFIÉ',role:'FONCTION',galaxy:'GALAXIE',mainAddress:'ADRESSE PRINCIPALE',portalAddress:'ADRESSE PORTAIL',shipTitle:'DOSSIER VAISSEAU',shipSubtitle:'FICHE TECHNIQUE / COORDONNÉES DE DÉCOUVERTE',shipName:'Nom du vaisseau',type:'Type',class:'Classe',system:'Système',damage:'Dégâts',shield:'Bouclier',hyperdriveShort:'Hyperprop.',maneuverability:'Maniabilité',baseTitle:'DOSSIER DE BASE',baseSubtitle:'LOCALISATION / SERVICES / ACCÈS PORTAIL',baseName:'Nom de la base',planet:'Planète',description:'DESCRIPTION',discoveryTitle:'RAPPORT DE DÉCOUVERTE',discoverySubtitle:'CATALOGUE / ENVIRONNEMENT / COORDONNÉES',category:'Catégorie',biome:'Biome',weather:'Météo',sentinels:'Sentinelles',resources:'Ressources'},
    msg:{imageFormat:'Format image refusé. Utilise JPG, PNG ou WEBP.',imageTooLarge:'Image trop volumineuse (18 Mo max).',imageInvalid:'Image invalide ou dimensions excessives.',secureGenerationUnavailable:'Génération sécurisée indisponible dans cette application.',imageExported:'{format} {w} × {h} exporté.',jsonExported:'Profil JSON exporté.',jsonImported:'Profil JSON importé et validé.',jsonInvalid:'Fichier JSON invalide, trop volumineux ou non conforme.',profilePrompt:'Nom du profil local :',defaultProfile:'Mon voyageur',profileSaved:'Profil enregistré localement.',profileLoaded:'Profil « {name} » chargé.',selected:'sélectionné',deleteProfileConfirm:'Supprimer le profil « {name} » ?',profileDeleted:'Profil supprimé.',newSessionConfirm:'Créer une session vierge ? Les données non enregistrées seront perdues.',newSession:'Nouvelle session vierge.',dataCopied:'Données de fiche copiées.',shareError:'Impossible de créer ou copier les données de partage.',saveProfileError:'Impossible d’enregistrer le profil.',resetConfirm:'Réinitialiser le module « {module} » ?',moduleReset:'Module réinitialisé.',desktopSaveError:'Impossible d’enregistrer le fichier.',desktopOpenError:'Impossible d’ouvrir le fichier sélectionné.'}
  }
};
const ROLE_CODES = {traveller:'TR',explorer:'EX',pilot:'PL',captain:'CP',merchant:'MR',mercenary:'MC',architect:'AR',naturalist:'NT',smuggler:'CB'};
const GLYPHS = [
  ['0','☀','Sunset'],['1','⌁','Bird'],['2','◉','Face'],['3','⌒','Diplo'],['4','◒','Eclipse'],['5','◯','Balloon'],['6','⌂','Boat'],['7','✣','Bug'],
  ['8','✧','Dragonfly'],['9','◎','Galaxy'],['A','◇','Voxel'],['B','≈','Fish'],['C','△','Tent'],['D','↑','Rocket'],['E','♧','Tree'],['F','◆','Atlas']
];
const THEMES = {
  atlas:{name:'ATLAS',paper:'#f6f5f1',paper2:'#ebeae5',navy:'#10233a',navy2:'#091725',accent:'#18a7d4',accent2:'#e3a72d',ink:'#10253d',white:'#ffffff',dark:'#081018'},
  korvax:{name:'KORVAX',paper:'#edf5f5',paper2:'#dfe9ea',navy:'#18383d',navy2:'#0b2227',accent:'#58d4d0',accent2:'#d7f176',ink:'#14373a',white:'#ffffff',dark:'#071315'},
  vykeen:{name:'VY’KEEN',paper:'#f2eee9',paper2:'#e3dad0',navy:'#3a2424',navy2:'#211313',accent:'#d04b42',accent2:'#e7b849',ink:'#3a2020',white:'#ffffff',dark:'#140b0b'},
  gek:{name:'GEK',paper:'#f5f0df',paper2:'#e7dfc4',navy:'#354126',navy2:'#1b2613',accent:'#8fbd49',accent2:'#e5b33c',ink:'#2d3822',white:'#ffffff',dark:'#0c1208'},
  autophage:{name:'AUTOPHAGE',paper:'#eeedf4',paper2:'#dfdce9',navy:'#28213c',navy2:'#171126',accent:'#9b79e5',accent2:'#e0ab47',ink:'#2b2440',white:'#ffffff',dark:'#0d0915'}
};

const SECURITY_LIMITS = Object.freeze({
  importBytes: 20 * 1024 * 1024,
  mediaDataChars: 4_500_000,
  uploadDataChars: 26_000_000,
  imageMaxDimension: 4096,
  imageMaxPixels: 16_000_000,
  uploadMaxDimension: 16000,
  uploadMaxPixels: 100_000_000,
  shareEncodedChars: 6000,
  profileNameChars: 60
});
const GALAXY_VALUES = ['', ...GALAXIES.map(([value])=>value), 'custom'];
const FIELD_SCHEMAS = Object.freeze({
  identity:{name:{max:32},race:{max:24},role:{enum:ROLE_VALUES},code:{max:26,upper:true},discord:{max:32},galaxy:{enum:GALAXY_VALUES},galaxyCustom:{max:28}},
  ship:{name:{max:38},type:{max:24},class:{enum:['','C','B','A','S']},system:{max:30},galaxy:{enum:GALAXY_VALUES},damage:{max:12},shield:{max:12},hyperdrive:{max:12},maneuver:{max:12}},
  base:{name:{max:38},type:{max:24},planet:{max:30},system:{max:30},galaxy:{enum:GALAXY_VALUES},note:{max:110,multiline:true}},
  discovery:{name:{max:38},category:{enum:DISCOVERY_CATEGORIES},planet:{max:30},system:{max:30},galaxy:{enum:GALAXY_VALUES},biome:{max:24},weather:{max:24},sentinels:{max:24},resources:{max:32}}
});
const GLYPH_CODES = new Set(GLYPHS.map(([code])=>code));
const ALLOWED_IMAGE_MIME = new Set(['image/jpeg','image/png','image/webp']);


const $ = id => document.getElementById(id);
const canvas = $('card');
const statusEl = $('status');
let activeModule = 'identity';
let state = blankState();
let imageCache = {identity:null,ship:null,base:null,discovery:null};
let dragging = null;
let activeGlyphTarget = null;
let activeProfileId = '';
let qrCache = {text:'',matrix:null};
let currentLang = preferredLanguage();

function preferredLanguage(){
  try{const saved=localStorage.getItem('nms-passport-language');if(SUPPORTED_LANGS.includes(saved))return saved;}catch(_){}
  return String(navigator.language||'en').toLowerCase().startsWith('fr')?'fr':'en';
}
function t(path,vars={}){const value=path.split('.').reduce((obj,key)=>obj?.[key],I18N[currentLang]);let out=typeof value==='string'?value:path;for(const [key,val] of Object.entries(vars))out=out.replaceAll(`{${key}}`,String(val));return out;}
function moduleTitle(module){return t(`modules.${module}`);}
function roleLabel(value){return value?t(`roles.${value}`):'';}
function categoryLabel(value){return value?(I18N[currentLang].categories[value]||value):'';}
function languageLocale(){return currentLang==='fr'?'fr':'en';}

function blankMedia(){ return {data:'',zoom:1,x:0,y:0}; }
function blankModule(module){
  if(module==='identity') return {name:'',race:'',role:'',code:'',discord:'',galaxy:'',galaxyCustom:'',glyphs:Array(12).fill(''),media:blankMedia()};
  if(module==='ship') return {name:'',type:'',class:'',system:'',galaxy:'',damage:'',shield:'',hyperdrive:'',maneuver:'',glyphs:Array(12).fill(''),media:blankMedia()};
  if(module==='base') return {name:'',type:'',planet:'',system:'',galaxy:'',note:'',glyphs:Array(12).fill(''),media:blankMedia()};
  return {name:'',category:'',planet:'',system:'',galaxy:'',biome:'',weather:'',sentinels:'',resources:'',glyphs:Array(12).fill(''),media:blankMedia()};
}
function blankState(){return {version:DATA_SCHEMA_VERSION,theme:'atlas',identity:blankModule('identity'),ship:blankModule('ship'),base:blankModule('base'),discovery:blankModule('discovery')};}
function isPlainObject(value){if(!value||typeof value!=='object'||Array.isArray(value))return false;const proto=Object.getPrototypeOf(value);return proto===Object.prototype||proto===null;}
function cleanText(value,max,multiline=false,upper=false){
  if(value==null)return '';
  if(typeof value!=='string'&&typeof value!=='number')return '';
  let out=String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g,'');
  out=multiline?out.replace(/\r\n?/g,'\n').replace(/\t/g,' '):out.replace(/[\r\n\t]+/g,' ');
  if(upper)out=out.toUpperCase();
  return out.slice(0,max);
}
function sanitiseField(module,key,value){const rule=FIELD_SCHEMAS[module]?.[key];if(!rule)return '';if(rule.enum){const v=String(value??'');return rule.enum.includes(v)?v:'';}return cleanText(value,rule.max,Boolean(rule.multiline),Boolean(rule.upper));}
function clampNumber(value,min,max,fallback){const n=Number(value);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):fallback;}
function safeImageDataUrl(data,maxChars=SECURITY_LIMITS.mediaDataChars){
  if(typeof data!=='string'||data.length===0||data.length>maxChars)return '';
  const match=/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/i.exec(data);
  if(!match||match[2].length%4===1)return '';
  return data;
}
function normaliseMedia(incoming,allowMedia=true){const out=blankMedia();if(!isPlainObject(incoming))return out;out.zoom=clampNumber(incoming.zoom,1,4,1);out.x=clampNumber(incoming.x,-1,1,0);out.y=clampNumber(incoming.y,-1,1,0);if(allowMedia)out.data=safeImageDataUrl(incoming.data);return out;}
function normaliseGlyphs(value){const src=Array.isArray(value)?value:[];return Array.from({length:12},(_,i)=>{const code=String(src[i]??'').toUpperCase();return GLYPH_CODES.has(code)?code:'';});}
function normaliseModuleData(module,incoming,allowMedia=true){const out=blankModule(module);const src=isPlainObject(incoming)?incoming:{};for(const key of Object.keys(FIELD_SCHEMAS[module]))out[key]=sanitiseField(module,key,src[key]);out.glyphs=normaliseGlyphs(src.glyphs);out.media=normaliseMedia(src.media,allowMedia);return out;}
function secureRandomIndex(max){if(!globalThis.crypto?.getRandomValues)throw new Error('Web Crypto unavailable');const span=0x100000000,limit=Math.floor(span/max)*max,buf=new Uint32Array(1);do{crypto.getRandomValues(buf);}while(buf[0]>=limit);return buf[0]%max;}
function createSecureId(){if(globalThis.crypto?.randomUUID)return crypto.randomUUID();if(!globalThis.crypto?.getRandomValues)throw new Error('Web Crypto unavailable');const b=new Uint8Array(16);crypto.getRandomValues(b);b[6]=(b[6]&0x0f)|0x40;b[8]=(b[8]&0x3f)|0x80;const h=[...b].map(x=>x.toString(16).padStart(2,'0')).join('');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;}
function setStatus(msg,timeout=3200){statusEl.textContent=msg;clearTimeout(setStatus.t);if(timeout)setStatus.t=setTimeout(()=>statusEl.textContent='',timeout);}
function escFile(s){return String(s||'passport').trim().replace(/[^a-z0-9_-]+/gi,'-').replace(/^-|-$/g,'').toLowerCase()||'passport';}
function fitText(c,text,maxWidth,start,min,weight='700'){let s=start;for(;s>min;s--){c.font=`${weight} ${s}px Segoe UI,Arial,sans-serif`;if(c.measureText(text).width<=maxWidth)break;}return s;}
function rr(c,x,y,w,h,r){const m=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+m,y);c.arcTo(x+w,y,x+w,y+h,m);c.arcTo(x+w,y+h,x,y+h,m);c.arcTo(x,y+h,x,y,m);c.arcTo(x,y,x+w,y,m);c.closePath();}
function line(c,x1,y1,x2,y2,color,width=2){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=width;c.stroke();}
function txt(c,text,x,y,size,color,weight='500',align='left'){c.save();c.fillStyle=color;c.font=`${weight} ${size}px Segoe UI,Arial,sans-serif`;c.textAlign=align;c.textBaseline='alphabetic';c.fillText(String(text??''),x,y);c.restore();}
function wrapText(c,text,x,y,maxWidth,lineHeight,maxLines,color,size,weight='500'){
  const words=String(text||'').split(/\s+/).filter(Boolean);let lineTxt='',lines=[];
  c.font=`${weight} ${size}px Segoe UI,Arial,sans-serif`;
  for(const word of words){const test=lineTxt?lineTxt+' '+word:word;if(c.measureText(test).width>maxWidth&&lineTxt){lines.push(lineTxt);lineTxt=word;}else lineTxt=test;if(lines.length===maxLines-1)break;}
  if(lineTxt&&lines.length<maxLines)lines.push(lineTxt);
  if(words.length&&lines.length===maxLines){let last=lines[maxLines-1];while(c.measureText(last+'…').width>maxWidth&&last.length>1)last=last.slice(0,-1);lines[maxLines-1]=last+'…';}
  lines.forEach((l,i)=>txt(c,l,x,y+i*lineHeight,size,color,weight));
}
function hexPattern(c,x,y,w,h,color='rgba(16,35,58,.045)',step=18){c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.strokeStyle=color;c.lineWidth=1;const hh=step*.866;for(let row=-2;row<h/hh+2;row++){for(let col=-2;col<w/(step*1.5)+2;col++){const cx=x+col*step*1.5+(row%2?step*.75:0),cy=y+row*hh,r=step*.5;c.beginPath();for(let i=0;i<6;i++){const a=Math.PI/3*i,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;i?c.lineTo(px,py):c.moveTo(px,py);}c.closePath();c.stroke();}}c.restore();}
function drawCompass(c,cx,cy,r,T){c.save();c.translate(cx,cy);c.strokeStyle=T.accent2;c.lineWidth=2;c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.stroke();c.strokeStyle=T.accent;c.beginPath();c.arc(0,0,r*.72,0,Math.PI*2);c.stroke();for(let i=0;i<8;i++){const a=Math.PI/4*i;line(c,Math.cos(a)*r*.78,Math.sin(a)*r*.78,Math.cos(a)*r,Math.sin(a)*r,i%2?T.accent:T.accent2,2);}c.fillStyle=T.white;c.beginPath();c.moveTo(0,-r*.9);c.lineTo(r*.14,0);c.lineTo(0,r*.9);c.lineTo(-r*.14,0);c.closePath();c.fill();c.restore();}
function drawEmblem(c,cx,cy,s,T,theme){c.save();c.translate(cx,cy);c.strokeStyle=T.accent2;c.fillStyle=T.accent2;c.lineWidth=Math.max(3,s*.025);
  if(theme==='atlas'){c.beginPath();c.moveTo(0,-s*.45);c.lineTo(s*.3,0);c.lineTo(0,s*.45);c.lineTo(-s*.3,0);c.closePath();c.stroke();c.beginPath();c.ellipse(0,0,s*.22,s*.1,0,0,Math.PI*2);c.stroke();c.beginPath();c.arc(0,0,s*.05,0,Math.PI*2);c.fill();}
  else if(theme==='korvax'){c.beginPath();c.arc(0,0,s*.29,0,Math.PI*2);c.stroke();c.beginPath();c.arc(0,0,s*.11,0,Math.PI*2);c.stroke();for(let i=0;i<8;i++){const a=i*Math.PI/4;line(c,Math.cos(a)*s*.29,Math.sin(a)*s*.29,Math.cos(a)*s*.42,Math.sin(a)*s*.42,T.accent2,s*.025);}}
  else if(theme==='vykeen'){for(let i=-1;i<=1;i++){c.beginPath();c.moveTo(-s*.34,s*(i*.12-.1));c.lineTo(0,s*(i*.12+.16));c.lineTo(s*.34,s*(i*.12-.1));c.stroke();}}
  else if(theme==='gek'){c.beginPath();c.arc(0,0,s*.28,0,Math.PI*2);c.stroke();c.beginPath();c.arc(-s*.09,-s*.04,s*.04,0,Math.PI*2);c.arc(s*.09,-s*.04,s*.04,0,Math.PI*2);c.fill();c.beginPath();c.arc(0,s*.05,s*.14,.1*Math.PI,.9*Math.PI);c.stroke();}
  else {c.beginPath();c.moveTo(0,-s*.4);c.lineTo(s*.35,s*.28);c.lineTo(-s*.35,s*.28);c.closePath();c.stroke();for(const [x,y] of [[0,-.4],[.35,.28],[-.35,.28],[0,.05]]){c.beginPath();c.arc(x*s,y*s,s*.04,0,Math.PI*2);c.fill();}line(c,0,-s*.36,0,s*.01,T.accent2,s*.02);line(c,s*.31,s*.25,s*.04,s*.07,T.accent2,s*.02);line(c,-s*.31,s*.25,-s*.04,s*.07,T.accent2,s*.02);}
  c.restore();}

function fillSelect(select,options){select.replaceChildren();for(const [value,label] of options){const o=document.createElement('option');o.value=value;o.textContent=label;select.appendChild(o);}}
function galaxyLabel(value,custom=''){if(value==='custom')return custom||t('ui.otherGalaxy');const row=GALAXIES.find(g=>g[0]===String(value));return row?row[1]:'';}
function galaxyOptions(){return [['',t('ui.choose')],...GALAXIES.map(([value,name])=>[value,`${String(value).padStart(2,'0')} — ${name}`]),['custom',t('ui.otherGalaxy')]];}
function roleOptions(){return ROLE_VALUES.map(value=>[value,value?roleLabel(value):t('ui.choose')]);}
function categoryOptions(){return DISCOVERY_CATEGORIES.map(value=>[value,value?categoryLabel(value):t('ui.choose')]);}
function galaxyCode(value){const n=parseInt(value,10);return Number.isFinite(n)?'E'+String(n).padStart(2,'0'):'E00';}
function serialFragment(code){const groups=String(code||'').toUpperCase().split(/[^A-Z0-9]+/).filter(Boolean);let f=groups.find((g,i)=>i>0&&g.length>=4)||groups.find(g=>g.length>=4)||groups.join('');f=f.replace(/[^A-Z0-9]/g,'').slice(0,4);return (f||'XXXX').padEnd(4,'X');}
function buildSerial(){const d=state.identity;return `AT-${galaxyCode(d.galaxy)}-${ROLE_CODES[d.role]||'XX'}-${serialFragment(d.code)}-16`;}
function glyphCode(module){return (state[module].glyphs||[]).map(v=>v||'·').join('');}

function initOptions(){
  ['idGalaxy','shipGalaxy','baseGalaxy','discGalaxy'].forEach(id=>fillSelect($(id),galaxyOptions()));
  fillSelect($('idRole'),roleOptions());
  fillSelect($('discCategory'),categoryOptions());
}

function applyLanguage(){
  document.documentElement.lang=currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n);});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{el.placeholder=t(el.dataset.i18nPlaceholder);});
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{el.setAttribute('aria-label',t(el.dataset.i18nAria));});
  const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=t('meta.description');
  $('languageSelect').value=currentLang;
  initOptions();
  for(const [id,[mod,key]] of Object.entries(bindings)){const el=$(id);if(el)el.value=state[mod][key]??'';}
  buildGlyphSections();buildMediaTools();MODULES.forEach(m=>{updateGlyphUI(m);updateMediaTools(m);});
  updateShareUi();updatePreviewButton();updateHeader();render();
}
async function setLanguage(lang){if(!SUPPORTED_LANGS.includes(lang)||lang===currentLang)return;currentLang=lang;try{localStorage.setItem('nms-passport-language',lang);}catch(_){}applyLanguage();await refreshProfiles();}

function buildGlyphSections(){
  document.querySelectorAll('.glyph-section').forEach(section=>{
    const mod=section.dataset.glyphSection;
    const head=document.createElement('div');head.className='glyph-head';
    const strong=document.createElement('strong');strong.textContent=t('ui.portalAddress');
    const info=document.createElement('span');info.textContent=t('ui.glyphInfo');head.append(strong,info);
    const slots=document.createElement('div');slots.className='glyph-slots';
    const code=document.createElement('div');code.className='glyph-code';
    section.replaceChildren(head,slots,code);
    for(let i=0;i<12;i++){const b=document.createElement('button');b.type='button';b.className='glyph-slot empty';b.dataset.module=mod;b.dataset.slot=i;b.textContent='·';b.title=t('ui.glyphTitle',{n:i+1});slots.appendChild(b);}
  });
  const palette=$('glyphPalette');palette.replaceChildren();
  for(const [code,symbol,name] of GLYPHS){const b=document.createElement('button');b.type='button';b.className='glyph-choice';b.dataset.glyph=code;const title=document.createElement('b');title.textContent=`${symbol} ${code}`;const label=document.createElement('span');label.textContent=I18N[currentLang].glyphs[name]||name;b.append(title,label);palette.appendChild(b);}
}
function updateGlyphUI(module){const section=document.querySelector(`[data-glyph-section="${module}"]`);if(!section)return;section.querySelectorAll('.glyph-slot').forEach((b,i)=>{const code=state[module].glyphs[i];const info=GLYPHS.find(g=>g[0]===code);b.textContent=info?`${info[1]} ${code}`:'·';b.classList.toggle('empty',!code);});section.querySelector('.glyph-code').textContent=glyphCode(module);}
function openGlyph(module,slot){activeGlyphTarget={module,slot};$('glyphDialog').showModal();}

function buildMediaTools(){document.querySelectorAll('.media-tools').forEach(w=>{const mod=w.dataset.mediaTools;w.replaceChildren();for(const [key,label,min,max] of [['zoom',t('ui.zoom'),'1','4'],['x','X','-1','1'],['y','Y','-1','1']]){const row=document.createElement('div');row.className='slider-line';const span=document.createElement('span');span.textContent=label;const input=document.createElement('input');input.dataset.mediaRange=key;input.dataset.module=mod;input.type='range';input.min=min;input.max=max;input.step='0.01';input.addEventListener('input',()=>{state[mod].media[key]=Number(input.value);updateMediaTools(mod);render();});const output=document.createElement('output');row.append(span,input,output);w.appendChild(row);}});}
function updateMediaTools(module){const w=document.querySelector(`[data-media-tools="${module}"]`);const m=state[module].media;w.hidden=!m.data;w.querySelectorAll('[data-media-range]').forEach(r=>{const key=r.dataset.mediaRange;r.value=m[key];r.nextElementSibling.value=key==='zoom'?Number(m[key]).toFixed(2)+'×':Math.round(Number(m[key])*100)+'%';});}

const bindings = {
  idName:['identity','name'],idRace:['identity','race'],idRole:['identity','role'],idCode:['identity','code'],idDiscord:['identity','discord'],idGalaxy:['identity','galaxy'],idGalaxyCustom:['identity','galaxyCustom'],
  shipName:['ship','name'],shipType:['ship','type'],shipClass:['ship','class'],shipSystem:['ship','system'],shipGalaxy:['ship','galaxy'],shipDamage:['ship','damage'],shipShield:['ship','shield'],shipHyperdrive:['ship','hyperdrive'],shipManeuver:['ship','maneuver'],
  baseName:['base','name'],baseType:['base','type'],basePlanet:['base','planet'],baseSystem:['base','system'],baseGalaxy:['base','galaxy'],baseNote:['base','note'],
  discName:['discovery','name'],discCategory:['discovery','category'],discPlanet:['discovery','planet'],discSystem:['discovery','system'],discGalaxy:['discovery','galaxy'],discBiome:['discovery','biome'],discWeather:['discovery','weather'],discSentinels:['discovery','sentinels'],discResources:['discovery','resources']
};
function syncFormFromState(){for(const [id,[mod,key]] of Object.entries(bindings)){const el=$(id);if(el)el.value=state[mod][key]??'';}$('theme').value=state.theme;MODULES.forEach(m=>{updateGlyphUI(m);updateMediaTools(m);});updateHeader();render();}
function bindForms(){
  for(const [id,[mod,key]] of Object.entries(bindings)){const el=$(id);const sync=()=>{const p=id==='idCode'?el.selectionStart:null;const val=sanitiseField(mod,key,el.value);state[mod][key]=val;if(el.value!==val)el.value=val;if(p!=null){try{el.setSelectionRange(Math.min(p,val.length),Math.min(p,val.length));}catch(_){}}onDataChanged();};el.addEventListener('input',sync);el.addEventListener('change',sync);}
  $('theme').addEventListener('change',()=>{state.theme=THEMES[$('theme').value]?$('theme').value:'atlas';onDataChanged();});
}
function onDataChanged(){qrCache.text='';updateHeader();render();}
function updateHeader(){$('previewTitle').textContent=moduleTitle(activeModule);$('serialPreview').textContent=activeModule==='identity'?buildSerial():moduleReference(activeModule);}
function moduleReference(mod){const d=state[mod],prefix={ship:'SHIP',base:'BASE',discovery:'DISC'}[mod]||'NMS';const seed=(d.name||d.system||'XXXX').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6).padEnd(4,'X');return `${prefix}-${galaxyCode(d.galaxy)}-${seed}`;}

function setActiveModule(module){if(!MODULES.includes(module))return;activeModule=module;document.querySelectorAll('.module-tab').forEach(b=>b.classList.toggle('active',b.dataset.module===module));document.querySelectorAll('.module-form').forEach(f=>f.classList.toggle('active',f.dataset.form===module));updateHeader();render();}

async function fileToDataUrl(file,module){
  if(!file)return;
  if(!ALLOWED_IMAGE_MIME.has(file.type)){setStatus(t('msg.imageFormat'));return;}
  if(file.size>18*1024*1024){setStatus(t('msg.imageTooLarge'));return;}
  try{
    const raw=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);});
    const img=await imageFromData(raw,{maxChars:SECURITY_LIMITS.uploadDataChars,maxDimension:SECURITY_LIMITS.uploadMaxDimension,maxPixels:SECURITY_LIMITS.uploadMaxPixels});
    const max=1400,scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));const c=document.createElement('canvas');c.width=Math.max(1,Math.round(img.naturalWidth*scale));c.height=Math.max(1,Math.round(img.naturalHeight*scale));c.getContext('2d').drawImage(img,0,0,c.width,c.height);const data=c.toDataURL('image/jpeg',.9);
    if(!safeImageDataUrl(data))throw new Error('Image compressée trop volumineuse');
    state[module].media={data,zoom:1,x:0,y:0};imageCache[module]=await imageFromData(data);updateMediaTools(module);onDataChanged();
  }catch(e){console.warn('Image refusée',e);setStatus(t('msg.imageInvalid'));}
}
function imageFromData(data,{maxChars=SECURITY_LIMITS.mediaDataChars,maxDimension=SECURITY_LIMITS.imageMaxDimension,maxPixels=SECURITY_LIMITS.imageMaxPixels}={}){return new Promise((res,rej)=>{const safe=safeImageDataUrl(data,maxChars);if(!safe){rej(new Error('Data URL image invalide'));return;}const img=new Image();img.onload=()=>{if(!img.naturalWidth||!img.naturalHeight||img.naturalWidth>maxDimension||img.naturalHeight>maxDimension||img.naturalWidth*img.naturalHeight>maxPixels){rej(new Error('Dimensions image refusées'));return;}res(img);};img.onerror=()=>rej(new Error('Décodage image impossible'));img.src=safe;});}
async function hydrateImages(){for(const mod of MODULES){imageCache[mod]=null;const data=state[mod]?.media?.data;if(data){try{imageCache[mod]=await imageFromData(data);}catch(_){state[mod].media.data='';}}updateMediaTools(mod);}render();}
function drawMedia(c,module,x,y,w,h,r,T){c.save();rr(c,x,y,w,h,r);c.clip();c.fillStyle=T.navy2;c.fillRect(x,y,w,h);hexPattern(c,x,y,w,h,`rgba(255,255,255,.05)`,20);const img=imageCache[module],m=state[module].media;if(img&&m.data){const base=Math.max(w/img.naturalWidth,h/img.naturalHeight),sc=base*Number(m.zoom||1),dw=img.naturalWidth*sc,dh=img.naturalHeight*sc,dx=x+(w-dw)/2+Number(m.x||0)*w*.48,dy=y+(h-dh)/2+Number(m.y||0)*h*.48;c.drawImage(img,dx,dy,dw,dh);c.fillStyle='rgba(3,12,18,.08)';c.fillRect(x,y,w,h);}else{c.strokeStyle=T.accent;c.globalAlpha=.16;c.lineWidth=2;for(let i=0;i<7;i++){c.beginPath();c.arc(x+w/2,y+h/2,55+i*42,0,Math.PI*2);c.stroke();}c.globalAlpha=1;drawEmblem(c,x+w/2,y+h/2,Math.min(w,h)*.42,T,state.theme);}c.restore();c.strokeStyle=T.accent;c.lineWidth=3;rr(c,x,y,w,h,r);c.stroke();}

function compactShareObject(){const d=normaliseModuleData(activeModule,state[activeModule],false);const clean={};for(const [k,v] of Object.entries(d)){if(k==='media')continue;if(Array.isArray(v)){const glyphString=v.map(x=>x||'-').join('');if(v.some(Boolean))clean.g=glyphString;}else if(v!==''&&v!=null)clean[k]=v;}return {v:APP_VERSION,m:activeModule,t:THEMES[state.theme]?state.theme:'atlas',d:clean};}
function base64UrlEncode(str){const bytes=new TextEncoder().encode(str);let bin='';bytes.forEach(b=>bin+=String.fromCharCode(b));return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function encodedSharePayload(){const payload=base64UrlEncode(JSON.stringify(compactShareObject()));if(payload.length>SECURITY_LIMITS.shareEncodedChars)throw new Error('Fiche trop volumineuse à partager');return payload;}
function localShareToken(payload=encodedSharePayload()){return `NMSP2:${payload}`;}
function shareTarget(){return {text:localShareToken(),kind:'data'};}
function qrContent(){return shareTarget().text;}
function updateShareUi(){const b=$('copyShare');if(!b)return;b.textContent=t('ui.copyData');b.title=t('ui.copyData');}
function qrMatrix(){let text='';try{text=qrContent();}catch(e){console.warn('Partage',e);return null;}if(!text)return null;if(qrCache.text===text&&qrCache.matrix)return qrCache.matrix;try{qrCache={text,matrix:window.NMSQR?.matrix(text,'L')||null};}catch(e){console.warn('QR',e);qrCache={text,matrix:null};}return qrCache.matrix;}
function drawQR(c,x,y,size,T){const matrix=qrMatrix();if(!matrix)return;c.fillStyle='#fff';rr(c,x,y,size,size,8);c.fill();const n=matrix.length,quiet=4,cell=Math.floor(size/(n+quiet*2));if(cell<1)return;const actual=cell*(n+quiet*2),ox=x+(size-actual)/2+quiet*cell,oy=y+(size-actual)/2+quiet*cell;c.fillStyle=T.navy2;for(let r=0;r<n;r++)for(let col=0;col<n;col++)if(matrix[r][col])c.fillRect(Math.round(ox+col*cell),Math.round(oy+r*cell),cell,cell);}
function drawGlyphRow(c,module,x,y,box,T,label=t('canvas.portalAddress')){txt(c,label,x,y,13,T.ink,'800');const glyphs=state[module].glyphs;for(let i=0;i<12;i++){const bx=x+i*(box+6),by=y+14;c.fillStyle='rgba(16,35,58,.06)';rr(c,bx,by,box,box,6);c.fill();c.strokeStyle=i<3?T.accent2:T.accent;c.globalAlpha=.55;c.lineWidth=1.5;rr(c,bx,by,box,box,6);c.stroke();c.globalAlpha=1;txt(c,glyphs[i]||'·',bx+box/2,by+box*.68,box*.46,glyphs[i]?T.navy:'#9ca7ad','850','center');}}
function drawLabelValue(c,label,value,x,y,w,T,big=32){txt(c,label.toUpperCase(),x,y,14,T.accent,'800');c.fillStyle='rgba(16,35,58,.055)';rr(c,x,y+12,w,56,5);c.fill();const fs=fitText(c,value||'—',w-24,big,18,'750');txt(c,value||'—',x+12,y+50,fs,T.navy,'750');}
function drawStat(c,label,value,x,y,w,T){c.fillStyle='rgba(16,35,58,.06)';rr(c,x,y,w,82,8);c.fill();txt(c,label.toUpperCase(),x+13,y+25,12,T.accent,'800');txt(c,value||'—',x+13,y+61,28,T.navy,'800');}
function drawBaseShell(c,T,title,subtitle){c.fillStyle=T.dark;c.fillRect(0,0,BASE_W,BASE_H);c.fillStyle=T.paper;rr(c,45,45,1510,910,38);c.fill();hexPattern(c,45,45,1510,910,'rgba(16,35,58,.045)',18);c.fillStyle=T.navy;c.beginPath();c.moveTo(1040,45);c.lineTo(1517,45);c.quadraticCurveTo(1555,45,1555,83);c.lineTo(1555,165);c.lineTo(1130,165);c.closePath();c.fill();c.fillStyle=T.accent2;c.fillRect(45,177,1510,4);drawCompass(c,110,115,45,T);txt(c,title,160,142,58,T.navy,'850');txt(c,subtitle,160,168,18,T.accent,'650');txt(c,`NMS PASSPORT // ${APP_VERSION}`,1460,106,16,T.accent2,'800','right');}
function drawFooterMarks(c,T){for(let i=0;i<20;i++){c.fillStyle=i%5===0?T.accent2:'rgba(16,35,58,.24)';c.fillRect(1040+i*19,916,10,3);}}
function drawIdentity(c,T){const d=state.identity;drawBaseShell(c,T,t('canvas.identityTitle'),t('canvas.identitySubtitle'));txt(c,buildSerial(),1460,137,18,T.white,'800','right');drawMedia(c,'identity',115,257,390,460,35,T);
  drawLabelValue(c,t('canvas.name'),d.name,565,260,485,T,36);drawLabelValue(c,t('canvas.race'),d.race,565,380,485,T,34);drawLabelValue(c,t('canvas.code'),d.code,565,500,485,T,32);drawLabelValue(c,'Discord',d.discord,565,620,485,T,29);
  c.fillStyle=T.navy;rr(c,1110,220,350,515,26);c.fill();c.strokeStyle=T.accent;c.lineWidth=2;rr(c,1125,235,320,485,22);c.stroke();txt(c,t('canvas.affiliation'),1285,270,16,T.accent,'800','center');drawEmblem(c,1285,455,310,T,state.theme);txt(c,T.name,1285,657,30,T.accent2,'850','center');txt(c,t('canvas.verified'),1285,689,12,T.accent,'800','center');
  c.fillStyle=T.navy;c.beginPath();c.moveTo(45,800);c.lineTo(235,800);c.lineTo(285,865);c.lineTo(960,865);c.lineTo(1010,925);c.lineTo(45,925);c.closePath();c.fill();drawCompass(c,120,862,46,T);
  const roleText=d.role?roleLabel(d.role):'';
  const galaxyText=d.galaxy?galaxyLabel(d.galaxy,d.galaxyCustom):'';
  txt(c,t('canvas.role'),280,828,12,T.accent,'800');txt(c,roleText,280,857,25,T.navy,'750');txt(c,t('canvas.galaxy'),540,828,12,T.accent,'800');txt(c,galaxyText,540,857,25,T.navy,'750');
  drawGlyphRow(c,'identity',1030,812,22,T,t('canvas.mainAddress'));drawQR(c,1370,740,155,T);drawFooterMarks(c,T);
}
function drawModuleCommon(c,T,module,title,subtitle){const d=state[module];drawBaseShell(c,T,title,subtitle);txt(c,moduleReference(module),1460,137,18,T.white,'800','right');drawMedia(c,module,90,235,700,500,24,T);drawGlyphRow(c,module,90,805,40,T);drawQR(c,1370,740,155,T);drawFooterMarks(c,T);txt(c,t('canvas.galaxy'),850,735,12,T.accent,'800');txt(c,galaxyLabel(d.galaxy)||'—',850,768,25,T.navy,'800');}
function drawShip(c,T){const d=state.ship;drawModuleCommon(c,T,'ship',t('canvas.shipTitle'),t('canvas.shipSubtitle'));drawLabelValue(c,t('canvas.shipName'),d.name,850,245,610,T,34);drawLabelValue(c,t('canvas.type'),d.type,850,350,285,T,28);drawLabelValue(c,t('canvas.class'),d.class,1175,350,285,T,30);drawLabelValue(c,t('canvas.system'),d.system,850,455,610,T,28);drawStat(c,t('canvas.damage'),d.damage,850,565,140,T);drawStat(c,t('canvas.shield'),d.shield,1005,565,140,T);drawStat(c,t('canvas.hyperdriveShort'),d.hyperdrive,1160,565,140,T);drawStat(c,t('canvas.maneuverability'),d.maneuver,1315,565,145,T);}
function drawBase(c,T){const d=state.base;drawModuleCommon(c,T,'base',t('canvas.baseTitle'),t('canvas.baseSubtitle'));drawLabelValue(c,t('canvas.baseName'),d.name,850,245,610,T,34);drawLabelValue(c,t('canvas.type'),d.type,850,350,285,T,27);drawLabelValue(c,t('canvas.planet'),d.planet,1175,350,285,T,26);drawLabelValue(c,t('canvas.system'),d.system,850,455,610,T,28);txt(c,t('canvas.description'),850,575,14,T.accent,'800');c.fillStyle='rgba(16,35,58,.055)';rr(c,850,590,610,125,8);c.fill();wrapText(c,d.note||'—',870,625,570,29,3,T.navy,21,'650');}
function drawDiscovery(c,T){const d=state.discovery;drawModuleCommon(c,T,'discovery',t('canvas.discoveryTitle'),t('canvas.discoverySubtitle'));drawLabelValue(c,t('canvas.name'),d.name,850,235,610,T,32);drawLabelValue(c,t('canvas.category'),categoryLabel(d.category),850,335,285,T,26);drawLabelValue(c,t('canvas.planet'),d.planet,1175,335,285,T,25);drawLabelValue(c,t('canvas.system'),d.system,850,435,610,T,26);drawStat(c,t('canvas.biome'),d.biome,850,545,140,T);drawStat(c,t('canvas.weather'),d.weather,1005,545,140,T);drawStat(c,t('canvas.sentinels'),d.sentinels,1160,545,140,T);drawStat(c,t('canvas.resources'),d.resources,1315,545,145,T);}
function renderCard(target=canvas,W=BASE_W,H=BASE_H){const c=target.getContext('2d'),sx=W/BASE_W,sy=H/BASE_H,T=THEMES[state.theme]||THEMES.atlas;c.save();c.setTransform(sx,0,0,sy,0,0);c.clearRect(0,0,BASE_W,BASE_H);if(activeModule==='identity')drawIdentity(c,T);else if(activeModule==='ship')drawShip(c,T);else if(activeModule==='base')drawBase(c,T);else drawDiscovery(c,T);c.restore();}
function render(){renderCard(canvas,BASE_W,BASE_H);}

function currentMediaRegion(){return activeModule==='identity'?{x:115,y:257,w:390,h:460}:{x:90,y:235,w:700,h:500};}
function canvasPoint(ev){const r=canvas.getBoundingClientRect();return {x:(ev.clientX-r.left)/r.width*BASE_W,y:(ev.clientY-r.top)/r.height*BASE_H};}
function hitMedia(ev){const p=canvasPoint(ev),g=currentMediaRegion();return p.x>=g.x&&p.x<=g.x+g.w&&p.y>=g.y&&p.y<=g.y+g.h;}

function isDesktopApp(){return Boolean(window.__TAURI__?.dialog&&window.__TAURI__?.fs);}
function desktopApi(){if(!isDesktopApp())throw new Error('Tauri desktop API unavailable');return {dialog:window.__TAURI__.dialog,fs:window.__TAURI__.fs};}
function exportDescriptor(value){return ({png:{mime:'image/png',ext:'png',label:'PNG'},jpeg:{mime:'image/jpeg',ext:'jpg',label:'JPG'},webp:{mime:'image/webp',ext:'webp',label:'WebP'}})[value]||{mime:'image/png',ext:'png',label:'PNG'};}
function imageMimeFromBytes(bytes){
  if(!(bytes instanceof Uint8Array)||bytes.length<12)return '';
  if(bytes[0]===0x89&&bytes[1]===0x50&&bytes[2]===0x4e&&bytes[3]===0x47&&bytes[4]===0x0d&&bytes[5]===0x0a&&bytes[6]===0x1a&&bytes[7]===0x0a)return 'image/png';
  if(bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff)return 'image/jpeg';
  if(String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP')return 'image/webp';
  return '';
}
async function nativeOpen(filters){const {dialog}=desktopApi();return dialog.open({multiple:false,directory:false,filters});}
async function nativeRead(path,maxBytes){const {fs}=desktopApi();const bytes=await fs.readFile(path);if(!(bytes instanceof Uint8Array))throw new Error('Invalid native file data');if(bytes.byteLength>maxBytes)throw new Error('File too large');return bytes;}
async function saveBlob(blob,filename,descriptor=null){
  try{
    const {dialog,fs}=desktopApi();
    const desc=descriptor||{label:'JSON',ext:'json'};
    const path=await dialog.save({defaultPath:filename,filters:[{name:desc.label,extensions:[desc.ext]}]});
    if(!path)return false;
    const bytes=new Uint8Array(await blob.arrayBuffer());
    await fs.writeFile(path,bytes);
    return true;
  }catch(e){console.error('Desktop save failed',e);setStatus(t('msg.desktopSaveError'));return false;}
}
function canvasToBlob(canvas,mime,quality){return new Promise((resolve,reject)=>canvas.toBlob(blob=>{if(!blob){reject(new Error(`Canvas export failed for ${mime}`));return;}if(blob.type&&blob.type!==mime){reject(new Error(`Unsupported canvas export format: ${mime}`));return;}resolve(blob);},mime,quality));}
async function exportImage(){
  const scale=Number($('resolution').value||1),layout=$('exportFormat').value,desc=exportDescriptor($('imageFormat').value);
  const base=document.createElement('canvas');base.width=Math.round(BASE_W*scale);base.height=Math.round(BASE_H*scale);renderCard(base,base.width,base.height);let out=base;
  if(layout!=='card'){const dims=layout==='square'?[1600,1600]:[1920,1080];out=document.createElement('canvas');out.width=Math.round(dims[0]*scale);out.height=Math.round(dims[1]*scale);const c=out.getContext('2d'),T=THEMES[state.theme];c.fillStyle=T.dark;c.fillRect(0,0,out.width,out.height);const margin=Math.round(48*scale),fit=Math.min((out.width-margin*2)/base.width,(out.height-margin*2)/base.height),dw=base.width*fit,dh=base.height*fit;c.drawImage(base,(out.width-dw)/2,(out.height-dh)/2,dw,dh);}
  const quality=desc.mime==='image/png'?undefined:clampNumber(Number($('imageQuality').value)/100,.6,1,.92);
  const blob=await canvasToBlob(out,desc.mime,quality);const d=state[activeModule],name=d.name||activeModule;const saved=await saveBlob(blob,`nms-passport-${activeModule}-${escFile(name)}.${desc.ext}`,desc);if(saved)setStatus(t('msg.imageExported',{format:desc.label,w:out.width,h:out.height}));
}
async function exportJson(){const safeState=normaliseState(state,true);const payload={app:'NMS Passport Desktop',version:APP_VERSION,dataSchema:DATA_SCHEMA_VERSION,author:APP_AUTHOR,exportedAt:new Date().toISOString(),state:safeState};const saved=await saveBlob(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),`nms-passport-${escFile(safeState.identity.name||(currentLang==='fr'?'profil':'profile'))}.json`,{label:'JSON',ext:'json'});if(saved)setStatus(t('msg.jsonExported'));}
async function importJsonText(raw,byteLength){try{if(typeof raw!=='string'||byteLength>SECURITY_LIMITS.importBytes||raw.length>SECURITY_LIMITS.importBytes)throw new Error('JSON too large');const payload=JSON.parse(raw);if(!isPlainObject(payload))throw new Error('Invalid JSON root');const incoming=isPlainObject(payload.state)?payload.state:payload;if(!MODULES.every(mod=>isPlainObject(incoming[mod])))throw new Error('Missing modules');state=normaliseState(incoming,true);activeProfileId='';$('profileSelect').value='';await hydrateImages();syncFormFromState();setActiveModule('identity');setStatus(t('msg.jsonImported'));}catch(e){console.warn('JSON import rejected',e);setStatus(t('msg.jsonInvalid'));}}
async function importJsonNative(){try{const path=await nativeOpen([{name:'NMS Passport JSON',extensions:['json']}]);if(!path)return;const bytes=await nativeRead(path,SECURITY_LIMITS.importBytes);const raw=new TextDecoder('utf-8',{fatal:true}).decode(bytes);await importJsonText(raw,bytes.byteLength);}catch(e){console.warn('Desktop JSON open failed',e);setStatus(t('msg.desktopOpenError'));}}
async function chooseNativeImage(module){try{if(!MODULES.includes(module))return;const path=await nativeOpen([{name:'Images',extensions:['png','jpg','jpeg','webp']}]);if(!path)return;const bytes=await nativeRead(path,18*1024*1024);const mime=imageMimeFromBytes(bytes);if(!ALLOWED_IMAGE_MIME.has(mime)){setStatus(t('msg.imageFormat'));return;}const file=new File([bytes],`selected.${mime==='image/jpeg'?'jpg':mime.split('/')[1]}`,{type:mime});await fileToDataUrl(file,module);}catch(e){console.warn('Desktop image open failed',e);setStatus(t('msg.desktopOpenError'));}}
function updateExportControls(){const desc=exportDescriptor($('imageFormat').value);$('imageQualityField').hidden=desc.mime==='image/png';$('imageQualityOut').value=`${$('imageQuality').value}%`;}
function normaliseState(incoming,allowMedia=true){const s=blankState();const src=isPlainObject(incoming)?incoming:{};s.theme=THEMES[src.theme]?src.theme:'atlas';for(const mod of MODULES)s[mod]=normaliseModuleData(mod,src[mod],allowMedia);return s;}
function openDb(){return new Promise((res,rej)=>{const req=indexedDB.open('nms-passport-db',1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('profiles'))db.createObjectStore('profiles',{keyPath:'id'});};req.onsuccess=()=>res(req.result);req.onerror=()=>rej(req.error);});}
async function dbPut(obj){const db=await openDb();return new Promise((res,rej)=>{const tx=db.transaction('profiles','readwrite');tx.objectStore('profiles').put(obj);tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});}
async function dbGet(id){const db=await openDb();return new Promise((res,rej)=>{const r=db.transaction('profiles').objectStore('profiles').get(id);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
async function dbDelete(id){const db=await openDb();return new Promise((res,rej)=>{const tx=db.transaction('profiles','readwrite');tx.objectStore('profiles').delete(id);tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});}
async function dbAll(){const db=await openDb();return new Promise((res,rej)=>{const r=db.transaction('profiles').objectStore('profiles').getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error);});}
async function refreshProfiles(){try{const profiles=(await dbAll()).filter(isPlainObject).sort((a,b)=>String(a.name||'').localeCompare(String(b.name||''),languageLocale()));const sel=$('profileSelect');const current=activeProfileId;const empty=document.createElement('option');empty.value='';empty.textContent=t('ui.blankSession');sel.replaceChildren(empty);for(const p of profiles){const id=cleanText(p.id,80),name=cleanText(p.name,SECURITY_LIMITS.profileNameChars);if(!id||!name)continue;const o=document.createElement('option');o.value=id;o.textContent=name;sel.appendChild(o);}sel.value=current;$('deleteProfile').disabled=!current;}catch(e){console.warn(e);}}
async function saveProfile(){let name='';if(activeProfileId){const old=await dbGet(activeProfileId);name=cleanText(old?.name,SECURITY_LIMITS.profileNameChars)||'';}if(!name)name=state.identity.name||state[activeModule].name||'';name=prompt(t('msg.profilePrompt'),name||t('msg.defaultProfile'));name=cleanText(name,SECURITY_LIMITS.profileNameChars).trim();if(!name)return;const id=activeProfileId||createSecureId();await dbPut({id,name,updatedAt:Date.now(),state:normaliseState(state,true)});activeProfileId=id;await refreshProfiles();$('profileSelect').value=id;$('deleteProfile').disabled=false;setStatus(t('msg.profileSaved'));}
async function loadProfile(id){if(!id){activeProfileId='';$('deleteProfile').disabled=true;return;}const p=await dbGet(id);if(!p)return;activeProfileId=id;state=normaliseState(p.state);await hydrateImages();syncFormFromState();setActiveModule('identity');$('deleteProfile').disabled=false;setStatus(t('msg.profileLoaded',{name:p.name}));}
async function deleteProfile(){if(!activeProfileId)return;const p=await dbGet(activeProfileId);const label=cleanText(p?.name,SECURITY_LIMITS.profileNameChars)||t('msg.selected');if(!confirm(t('msg.deleteProfileConfirm',{name:label})))return;await dbDelete(activeProfileId);activeProfileId='';await refreshProfiles();setStatus(t('msg.profileDeleted'));}
function newSession(){if(!confirm(t('msg.newSessionConfirm')))return;state=blankState();activeProfileId='';imageCache={identity:null,ship:null,base:null,discovery:null};$('profileSelect').value='';$('deleteProfile').disabled=true;syncFormFromState();setActiveModule('identity');setStatus(t('msg.newSession'));}

async function copyShare(){try{const target=shareTarget();if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(target.text);}else{const ta=document.createElement('textarea');ta.value=target.text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();}setStatus(t('msg.dataCopied'));}catch(e){console.warn('Partage impossible',e);setStatus(t('msg.shareError'));}}
function updatePreviewButton(){const b=$('previewOnly');if(b)b.textContent=document.body.classList.contains('preview-only')?t('ui.showEditor'):t('ui.previewOnly');}

function setupEvents(){
  document.querySelectorAll('.module-tab').forEach(b=>b.addEventListener('click',()=>setActiveModule(b.dataset.module)));
  document.addEventListener('click',ev=>{const glyph=ev.target.closest('.glyph-slot');if(glyph)openGlyph(glyph.dataset.module,Number(glyph.dataset.slot));const choice=ev.target.closest('.glyph-choice');if(choice&&activeGlyphTarget){state[activeGlyphTarget.module].glyphs[activeGlyphTarget.slot]=choice.dataset.glyph;updateGlyphUI(activeGlyphTarget.module);$('glyphDialog').close();activeGlyphTarget=null;onDataChanged();}});
  $('clearGlyph').addEventListener('click',()=>{if(activeGlyphTarget){state[activeGlyphTarget.module].glyphs[activeGlyphTarget.slot]='';updateGlyphUI(activeGlyphTarget.module);$('glyphDialog').close();activeGlyphTarget=null;onDataChanged();}});
  document.querySelectorAll('[data-media-pick]').forEach(b=>b.addEventListener('click',()=>chooseNativeImage(b.dataset.mediaPick)));
  document.querySelectorAll('[data-media-remove]').forEach(b=>b.addEventListener('click',()=>{const mod=b.dataset.mediaRemove;state[mod].media=blankMedia();imageCache[mod]=null;updateMediaTools(mod);onDataChanged();}));
  $('generateCode').addEventListener('click',()=>{try{const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';const part=()=>Array.from({length:4},()=>chars[secureRandomIndex(chars.length)]).join('');state.identity.code=`AX-${part()}-${part()}`;$('idCode').value=state.identity.code;onDataChanged();}catch(e){console.warn(e);setStatus(t('msg.secureGenerationUnavailable'));}});
  $('download').addEventListener('click',()=>exportImage().catch(e=>{console.error(e);setStatus(t('msg.desktopSaveError'));}));$('exportJson').addEventListener('click',()=>exportJson().catch(e=>{console.error(e);setStatus(t('msg.desktopSaveError'));}));$('importJson').addEventListener('click',()=>importJsonNative().catch(e=>{console.error(e);setStatus(t('msg.desktopOpenError'));}));$('copyShare').addEventListener('click',copyShare);
  $('imageFormat').addEventListener('change',updateExportControls);$('imageQuality').addEventListener('input',updateExportControls);
  $('saveProfile').addEventListener('click',()=>saveProfile().catch(e=>{console.error(e);setStatus(t('msg.saveProfileError'));}));$('newProfile').addEventListener('click',newSession);$('deleteProfile').addEventListener('click',()=>deleteProfile().catch(console.error));$('profileSelect').addEventListener('change',e=>loadProfile(e.target.value).catch(console.error));
  $('resetModule').addEventListener('click',()=>{if(!confirm(t('msg.resetConfirm',{module:moduleTitle(activeModule)})))return;state[activeModule]=blankModule(activeModule);imageCache[activeModule]=null;syncFormFromState();setStatus(t('msg.moduleReset'));});
  $('previewOnly').addEventListener('click',()=>{document.body.classList.toggle('preview-only');updatePreviewButton();});
  $('languageSelect').addEventListener('change',e=>setLanguage(e.target.value).catch(console.error));
  canvas.addEventListener('pointerdown',ev=>{if(!imageCache[activeModule]||!hitMedia(ev))return;const m=state[activeModule].media;dragging={id:ev.pointerId,startX:ev.clientX,startY:ev.clientY,x:Number(m.x),y:Number(m.y)};canvas.setPointerCapture(ev.pointerId);});
  canvas.addEventListener('pointermove',ev=>{if(!dragging)return;const r=canvas.getBoundingClientRect(),g=currentMediaRegion(),m=state[activeModule].media;m.x=Math.max(-1,Math.min(1,dragging.x+(ev.clientX-dragging.startX)/(r.width*(g.w/BASE_W))));m.y=Math.max(-1,Math.min(1,dragging.y+(ev.clientY-dragging.startY)/(r.height*(g.h/BASE_H))));updateMediaTools(activeModule);render();});
  canvas.addEventListener('pointerup',()=>dragging=null);canvas.addEventListener('pointercancel',()=>dragging=null);canvas.addEventListener('wheel',ev=>{if(!imageCache[activeModule]||!hitMedia(ev))return;ev.preventDefault();const m=state[activeModule].media;m.zoom=Math.max(1,Math.min(4,Number(m.zoom)+(ev.deltaY<0?.08:-.08)));updateMediaTools(activeModule);render();},{passive:false});
}

async function init(){applyLanguage();bindForms();setupEvents();updateShareUi();syncFormFromState();setActiveModule(activeModule);updateExportControls();await hydrateImages();await refreshProfiles();console.info(`NMS Passport Desktop v${APP_VERSION} — ${APP_AUTHOR}`);}

init();
})();
