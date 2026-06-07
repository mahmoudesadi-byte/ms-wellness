import React, { useState, useEffect, useRef } from "react";

// ─── THEME: LIGHT BLUE ELEGANT ────────────────────────────────────────────
const T = {
  bg:      "#EFF6FF",
  s1:      "#FFFFFF",
  s2:      "#DBEAFE",
  s3:      "#BFDBFE",
  border:  "#BFDBFE",
  text:    "#0C1A2E",
  sub:     "#1E3A5F",
  muted:   "#4B8EC9",
  dim:     "#93C5FD",
  blue1:   "#0C3D6E",
  blue2:   "#1D6FAA",
  blue3:   "#3B82F6",
  blue4:   "#7BB8E8",
  red:     "#EF4444",
  green:   "#10B981",
  amber:   "#F59E0B",
  purple:  "#8B5CF6",
  font:    "'Outfit',-apple-system,BlinkMacSystemFont,sans-serif",
  fontAr:  "'Cairo','Outfit',-apple-system,sans-serif",
  r:  "12px",
  rs: "8px",
  rLg:"18px",
  rXl:"22px",
};

const LOGO_URL = "/logo.png";

const L = {
  en:{today:"Today",habits:"Habits",workout:"Workout",meals:"Meals",track:"Track",hi:"Good morning,",hiA:"Good afternoon,",hiE:"Good evening,",name:"Mahmoud",water:"Hydration",sleep:"Sleep",change:"Change",done:"Done",todayWorkout:"Today's Session",todayMeals:"Nutrition",fuelSmart:"Fuel Smart",addHabit:"New Habit",noHabits:"No habits yet",gymDay:"Gym Day",cardioDay:"Cardio Day",restDay:"Rest Day",daily:"Daily",weekly:"Select days",morning:"Morning",noon:"Noon",evening:"Evening",night:"Night",habitName:"Habit name",saveChanges:"Save",addHabitTitle:"New Habit",editHabitTitle:"Edit Habit",warmup:"Warm Up",cooldown:"Cool Down",schedule:"Plan",trainingLabel:"Train",weightAndMeasurements:"Body",logLabel:"Log",trackYourDay:"Progress",daysLogged:"Days",totalHabits:"Habits",totalWorkouts:"Sessions",habitHistory:"7-Day Streak",noData:"Start logging from Today",thisWeek:"This Week",lastWeek:"Last Week",weeksAgo:"weeks ago",startWeight:"Start",current:"Current",difference:"Change",saveEntry:"Save",historyLabel:"History",selectDate:"Date",measurements:"Measurements",waist:"Waist",chest:"Chest",arm:"Arm",target:"goal",weightProgress:"Weight",tapActivity:"Select activity then tap a day",swapExercise:"Swap",alternatives:"Alternatives",lastWeekLabel:"Last week",suggestedLabel:"Try",day1:"Day 1",day2:"Day 2",day3:"Day 3",day4:"Day 4",report:"Report",weeklyScore:"Weekly Score",scanMeal:"Scan Meal",analyzing:"Analyzing...",scanResult:"Meal Analysis",enterKey:"Enter API Key"},
  ar:{today:"اليوم",habits:"عادات",workout:"تمرين",meals:"وجبات",track:"تتبع",hi:"صباح الخير،",hiA:"مساء الخير،",hiE:"مساء النور،",name:"محمود",water:"ماء",sleep:"نوم",change:"غيّر",done:"تم",todayWorkout:"تمرين اليوم",todayMeals:"وجبات اليوم",fuelSmart:"تغذية ذكية",addHabit:"إضافة عادة",noHabits:"لا توجد عادات بعد",gymDay:"يوم جيم",cardioDay:"يوم كارديو",restDay:"يوم راحة",daily:"يومي",weekly:"أيام معينة",morning:"صباح",noon:"ظهر",evening:"مساء",night:"ليل",habitName:"اسم العادة",saveChanges:"حفظ",addHabitTitle:"عادة جديدة",editHabitTitle:"تعديل العادة",warmup:"إحماء",cooldown:"تبريد",schedule:"الخطة",trainingLabel:"التمرين",weightAndMeasurements:"الجسم",logLabel:"السجل",trackYourDay:"التقدم",daysLogged:"أيام",totalHabits:"عادات",totalWorkouts:"جلسات",habitHistory:"سلسلة 7 أيام",noData:"ابدأ التسجيل من تبويب اليوم",thisWeek:"هذا الأسبوع",lastWeek:"الأسبوع الماضي",weeksAgo:"أسابيع مضت",startWeight:"البداية",current:"الحالي",difference:"الفرق",saveEntry:"حفظ",historyLabel:"السجل",selectDate:"التاريخ",measurements:"القياسات",waist:"الخصر",chest:"الصدر",arm:"الذراع",target:"الهدف",weightProgress:"الوزن",tapActivity:"اختر النشاط ثم اضغط على اليوم",swapExercise:"تبديل",alternatives:"بدائل",lastWeekLabel:"الأسبوع الماضي",suggestedLabel:"المقترح",day1:"اليوم 1",day2:"اليوم 2",day3:"اليوم 3",day4:"اليوم 4",report:"تقرير",weeklyScore:"نقاط الأسبوع",scanMeal:"مسح وجبة",analyzing:"جاري التحليل...",scanResult:"تحليل الوجبة",enterKey:"أدخل API Key"}
};

const ACTS=[{id:"gym",en:"Gym",ar:"جيم",color:T.blue2,icon:"dumbbell"},{id:"walk",en:"Walk",ar:"مشي",color:T.amber,icon:"walk"},{id:"rest",en:"Rest",ar:"راحة",color:T.purple,icon:"moon"},{id:"cardio",en:"Cardio",ar:"كارديو",color:T.blue3,icon:"track"},{id:"volleyball",en:"Volleyball",ar:"فوليبول",color:T.green,icon:"star"}];
const TOD=[{id:"morning",en:"Morning",ar:"صباح",time:"6-10 AM",c:T.amber},{id:"noon",en:"Noon",ar:"ظهر",time:"12-2 PM",c:T.blue3},{id:"evening",en:"Evening",ar:"مساء",time:"5-8 PM",c:T.purple},{id:"night",en:"Night",ar:"ليل",time:"9-11 PM",c:T.blue1}];

const WO={1:{enT:"DAY 1 · PUSH",arT:"اليوم 1 · ضغط",enW:"10 min treadmill + arm circles",arW:"10 دقائق تردميل + دوران الذراعين",enC:"Chest & shoulder stretch 7 min",arC:"تمطيط الصدر والكتف",ex:[{en:"Incline Dumbbell Press",ar:"بنش مائل",sets:4,reps:"6-10",rest:90,ytId:"8iPEnn-ltC8",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/dumbbell-incline-bench-press.gif",swaps:["Dumbbell Bench Press","Smith Machine Press","Push Up"]},{en:"Lat Pulldown",ar:"لات بول داون",sets:4,reps:"8-12",rest:90,ytId:"CAwf7n6Luuc",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-lat-pulldown.gif",swaps:["Seated Cable Row","Dumbbell Row","Band Pulldown"]},{en:"Leg Press",ar:"ليج برس",sets:3,reps:"8-10",rest:90,ytId:"IZxyjW7MPJQ",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/leg-press.gif",swaps:["Dumbbell Lunge","Goblet Squat","Step Up"]},{en:"Dumbbell Shoulder Press",ar:"ضغط كتف",sets:3,reps:"8-10",rest:90,ytId:"HzIiNhHhhtA",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-shoulder-press.gif",swaps:["Arnold Press","Smith OHP","Cable Press"]},{en:"Lateral Raise",ar:"رفع جانبي",sets:3,reps:"12-15",rest:60,ytId:"3VcKaXpzqRo",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-lateral-raise.gif",swaps:["Cable Lateral Raise","Machine Raise","Front Raise"]},{en:"Dumbbell Curl",ar:"بايسبس كيرل",sets:3,reps:"10-12",rest:60,ytId:"ykJmrZ5v0Oo",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-bicep-curl.gif",swaps:["Hammer Curl","Cable Curl","Concentration Curl"]}]},2:{enT:"DAY 2 · PULL",arT:"اليوم 2 · سحب",enW:"5 min walk + shoulder rolls",arW:"5 دقائق مشي + تدوير الكتفين",enC:"Back & hip stretch 7 min",arC:"تمطيط الظهر والورك",ex:[{en:"Seated Cable Row",ar:"كيبل رو",sets:4,reps:"8-12",rest:90,ytId:"GZbfZ033f74",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-seated-row.gif",swaps:["Dumbbell Row","TRX Row","Smith Row"]},{en:"Hip Thrust",ar:"هيب ثراست",sets:4,reps:"8-12",rest:90,ytId:"LM8XHLYJoYs",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/07/dumbbell-hip-thrust.gif",swaps:["Glute Bridge","Romanian Deadlift","Cable Kickback"]},{en:"Seated Cable Chest Fly",ar:"فلاي صدر",sets:3,reps:"12-15",rest:60,ytId:"Iwe6AmxVf7o",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-chest-fly.gif",swaps:["Dumbbell Fly","Pec Deck","Crossover"]},{en:"Reverse Dumbbell Fly",ar:"ريفرس فلاي",sets:3,reps:"12-15",rest:60,ytId:"d1YMKuxzLiA",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/reverse-dumbbell-fly.gif",swaps:["Face Pull","Rear Delt Cable","Band Pull Apart"]},{en:"Hammer Curl",ar:"هامر كيرل",sets:3,reps:"10-12",rest:60,ytId:"TwD-YGVP4Bk",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-hammer-curl.gif",swaps:["Cable Curl","Incline Curl","Cross Body Curl"]},{en:"Overhead Triceps Extension",ar:"ترايسبس أوفرهيد",sets:3,reps:"10-12",rest:60,ytId:"_gsUck-7M74",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-tricep-overhead-extension.gif",swaps:["Tricep Pushdown","Close Grip Press","Skull Crusher"]}]},3:{enT:"DAY 3 · LEGS",arT:"اليوم 3 · أرجل",enW:"5 min treadmill + dynamic stretch",arW:"5 دقائق تردميل + تمطيط ديناميكي",enC:"Full leg & back stretch",arC:"تمطيط الأرجل والظهر",ex:[{en:"Cable Lat Pulldown",ar:"لات بول داون",sets:4,reps:"8-12",rest:90,ytId:"CAwf7n6Luuc",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-lat-pulldown.gif",swaps:["Assisted Pull Up","Dumbbell Row","Band Pulldown"]},{en:"Goblet Squat",ar:"جوبلت سكوات",sets:3,reps:"10-12",rest:90,ytId:"MeIiIdhvXT4",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/07/goblet-squat.gif",swaps:["Leg Press","Sumo Squat","Wall Sit"]},{en:"Dumbbell Bench Press",ar:"بنش برس",sets:3,reps:"8-10",rest:90,ytId:"QsYre__-aro",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/dumbbell-bench-press.gif",swaps:["Smith Machine Press","Incline Press","Push Up"]},{en:"Lateral Raise",ar:"رفع جانبي",sets:4,reps:"12-15",rest:60,ytId:"3VcKaXpzqRo",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-lateral-raise.gif",swaps:["Cable Raise","Arnold Press","Upright Row"]},{en:"Dumbbell Curl",ar:"بايسبس كيرل",sets:3,reps:"10-12",rest:60,ytId:"ykJmrZ5v0Oo",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-bicep-curl.gif",swaps:["Hammer Curl","Cable Curl","Preacher Curl"]},{en:"Overhead Triceps Extension",ar:"ترايسبس أوفرهيد",sets:3,reps:"10-12",rest:60,ytId:"_gsUck-7M74",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-tricep-overhead-extension.gif",swaps:["Tricep Dip","Pushdown","Skull Crusher"]}]},4:{enT:"DAY 4 · FULL",arT:"اليوم 4 · هيكل عام",enW:"10 min treadmill moderate",arW:"10 دقائق تردميل وتيرة متوسطة",enC:"10 min full body stretch",arC:"10 دقائق تمطيط شامل",ex:[{en:"Dumbbell Row",ar:"تجديف بالدمبل",sets:4,reps:"8-12",rest:90,ytId:"pYcpY20QaE8",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/07/dumbbell-row.gif",swaps:["Cable Row","Smith Row","Meadows Row"]},{en:"Lat Pulldown",ar:"لات بول داون",sets:3,reps:"8-12",rest:90,ytId:"CAwf7n6Luuc",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-lat-pulldown.gif",swaps:["Assisted Pull Up","Band Pulldown","Cable Row"]},{en:"Dumbbell Shoulder Press",ar:"ضغط كتف",sets:3,reps:"8-10",rest:90,ytId:"HzIiNhHhhtA",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-shoulder-press.gif",swaps:["Arnold Press","Smith OHP","Cable Press"]},{en:"Leg Press",ar:"ليج برس",sets:3,reps:"8-10",rest:90,ytId:"IZxyjW7MPJQ",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/leg-press.gif",swaps:["Goblet Squat","Dumbbell Lunge","Step Up"]},{en:"Lateral Raise",ar:"رفع جانبي",sets:3,reps:"12-15",rest:60,ytId:"3VcKaXpzqRo",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-lateral-raise.gif",swaps:["Cable Raise","Front Raise","Upright Row"]},{en:"Reverse Dumbbell Fly",ar:"ريفرس فلاي",sets:3,reps:"12-15",rest:60,ytId:"d1YMKuxzLiA",img:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/reverse-dumbbell-fly.gif",swaps:["Face Pull","Rear Delt Cable","Band Pull Apart"]}]}};

function getCalGoal(t){return t==="gym"?2280:["cardio","walk","volleyball"].includes(t)?2000:1750;}
function getMeals(t){const g=t==="gym",c=["cardio","walk","active","volleyball"].includes(t);if(g)return[{time:"7:00 AM",timeAr:"7:00 ص",tag:"BREAKFAST",en:"Breakfast",ar:"الفطور",kcal:420,p:36,cb:52,f:10,iEn:["2 Weetabix with low-fat milk","Nada Greek Yoghurt 0%","1 tsp honey","Green tea"],iAr:["2 Weetabix بحليب","Nada Greek Yoghurt 0%","ملعقة عسل","شاي أخضر"]},{time:"10:30 AM",timeAr:"10:30 ص",tag:"SNACK",en:"Morning Snack",ar:"سناك الصباح",kcal:280,p:12,cb:22,f:18,iEn:["30g walnuts","15g almonds","1 apple"],iAr:["30g جوز","15g لوز","تفاحة"]},{time:"1:00 PM",timeAr:"1:00 م",tag:"LUNCH",en:"Lunch",ar:"الغداء",kcal:580,p:52,cb:68,f:14,iEn:["220g grilled chicken or salmon","1 cup quinoa","Spinach salad"],iAr:["220غ دجاج أو سلمون","كوب كينوا","سلطة سبانخ"]},{time:"4:00 PM",timeAr:"4:00 م",tag:"PRE-GYM",en:"Pre-Workout",ar:"قبل الجيم",kcal:320,p:18,cb:52,f:6,iEn:["1 banana","2 Weetabix","1 tbsp peanut butter"],iAr:["موزة","2 Weetabix","ملعقة زبدة فول"]},{time:"7:30 PM",timeAr:"7:30 م",tag:"POST-GYM",en:"Post-Workout",ar:"بعد الجيم",kcal:460,p:50,cb:52,f:10,iEn:["200g salmon or tuna","Oats + honey + cinnamon","5 walnuts"],iAr:["200غ سلمون أو تونة","شوفان + عسل + قرفة","5 جوزات"]},{time:"9:30 PM",timeAr:"9:30 م",tag:"NIGHT",en:"Night Snack",ar:"سناك الليل",kcal:220,p:26,cb:18,f:5,iEn:["Nada Greek Yoghurt 0%","1 tsp honey"],iAr:["Nada Greek Yoghurt 0%","ملعقة عسل"]}];if(c)return[{time:"7:00 AM",timeAr:"7:00 ص",tag:"BREAKFAST",en:"Breakfast",ar:"الفطور",kcal:380,p:32,cb:44,f:9,iEn:["2 Weetabix with milk","Nada Greek Yoghurt 0%","1 tsp honey"],iAr:["2 Weetabix بحليب","Nada Greek Yoghurt 0%","ملعقة عسل"]},{time:"10:30 AM",timeAr:"10:30 ص",tag:"SNACK",en:"Morning Snack",ar:"سناك الصباح",kcal:230,p:10,cb:18,f:16,iEn:["30g walnuts","1 apple"],iAr:["30g جوز","تفاحة"]},{time:"1:00 PM",timeAr:"1:00 م",tag:"LUNCH",en:"Lunch",ar:"الغداء",kcal:500,p:48,cb:55,f:12,iEn:["200g chicken or fish","half cup brown rice","Spinach salad"],iAr:["200غ دجاج أو سمك","نصف كوب أرز بني","سلطة"]},{time:"5:00 PM",timeAr:"5:00 م",tag:"PRE-CARDIO",en:"Pre-Cardio",ar:"قبل الكارديو",kcal:180,p:8,cb:28,f:4,iEn:["1 small banana","Small Greek Yoghurt"],iAr:["موزة صغيرة","لبن يوناني"]},{time:"8:00 PM",timeAr:"8:00 م",tag:"DINNER",en:"Dinner",ar:"العشاء",kcal:470,p:48,cb:52,f:12,iEn:["200g salmon or tuna","Oats + honey + cinnamon","5 walnuts"],iAr:["200غ سلمون أو تونة","شوفان + عسل","5 جوزات"]},{time:"9:30 PM",timeAr:"9:30 م",tag:"NIGHT",en:"Night Snack",ar:"سناك الليل",kcal:240,p:27,cb:22,f:10,iEn:["Nada Greek Yoghurt 0%","30g walnuts"],iAr:["Nada Greek Yoghurt 0%","30g جوز"]}];return[{time:"7:30 AM",timeAr:"7:30 ص",tag:"BREAKFAST",en:"Breakfast",ar:"الفطور",kcal:380,p:32,cb:42,f:10,iEn:["2 Weetabix with milk","Nada Greek Yoghurt 0%","1 tsp honey"],iAr:["2 Weetabix بحليب","Nada Greek Yoghurt 0%","ملعقة عسل"]},{time:"11:00 AM",timeAr:"11:00 ص",tag:"SNACK",en:"Morning Snack",ar:"سناك الصباح",kcal:200,p:8,cb:14,f:14,iEn:["30g walnuts","10 almonds"],iAr:["30g جوز","10 لوز"]},{time:"1:30 PM",timeAr:"1:30 م",tag:"LUNCH",en:"Lunch",ar:"الغداء",kcal:480,p:50,cb:48,f:12,iEn:["200g chicken or fish","half cup brown rice","Spinach salad"],iAr:["200غ دجاج أو سمك","نصف كوب أرز بني","سلطة"]},{time:"4:00 PM",timeAr:"4:00 م",tag:"SNACK",en:"Snack",ar:"سناك مسائي",kcal:150,p:18,cb:12,f:3,iEn:["Nada Greek Yoghurt 0%","Cinnamon + honey"],iAr:["Nada Greek Yoghurt 0%","قرفة + عسل"]},{time:"7:30 PM",timeAr:"7:30 م",tag:"DINNER",en:"Dinner",ar:"العشاء",kcal:420,p:40,cb:46,f:10,iEn:["200g salmon or beef","Oats + honey + cinnamon","5 walnuts"],iAr:["200غ سلمون أو لحم","شوفان + عسل + قرفة","5 جوزات"]},{time:"9:30 PM",timeAr:"9:30 م",tag:"NIGHT",en:"Night Snack",ar:"سناك الليل",kcal:120,p:16,cb:10,f:3,iEn:["Small Nada Greek Yoghurt","Light honey"],iAr:["Nada Greek Yoghurt صغير","عسل خفيف"]}]}

const sGet=k=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch(e){return null;}};
const sSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}};
const todayKey=()=>new Date().toISOString().slice(0,10);
const ytOpen=id=>window.open("https://www.youtube.com/watch?v="+id,"_blank");

function Ic({name,size=20,color=T.text,stroke=1.8}){
  const p={fill:"none",stroke:color,strokeWidth:stroke,strokeLinecap:"round",strokeLinejoin:"round"};
  const ic={
    home:<><path d="M3 12L12 3l9 9"/><path d="M9 21V12h6v9"/></>,
    dumbbell:<><path d="M6 5v14M18 5v14"/><path d="M3 8h6M15 8h6M3 16h6M15 16h6"/></>,
    food:<><path d="M3 11h18M12 3v8M5 21h14a2 2 0 002-2v-4H3v4a2 2 0 002 2z"/></>,
    track:<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    check:<><polyline points="20 6 9 17 4 12"/></>,
    chev:<><polyline points="9 18 15 12 9 6"/></>,
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    play:<polygon points="5 3 19 12 5 21 5 3" fill={color} stroke="none"/>,
    plus:<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    drop:<><path d="M12 2C6 9 4 13 4 16a8 8 0 0016 0c0-3-2-7-8-14z"/></>,
    bed:<><path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8M2 10V6a2 2 0 012-2h4M22 10V6a2 2 0 00-2-2h-4M10 8h4"/></>,
    bolt:<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    walk:<><circle cx="12" cy="4" r="2"/><path d="M9 21l2-8-2-3h6l-2 3 2 8M7 15l-2 1M17 15l2 1"/></>,
    edit:<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    moon:<><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></>,
    star:<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    swap:<><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></>,
    camera:<><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></>,
    timer:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    calendar:<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" {...p}>{ic[name]}</svg>;
}

function Logo(){return(<div style={{display:"flex",alignItems:"center",gap:10}}><img src={LOGO_URL} alt="MS" style={{width:36,height:36,borderRadius:"50%",objectFit:"cover",border:"2px solid "+T.s3}} onError={e=>{e.target.style.display="none";}}/><div><div style={{fontFamily:"Georgia,serif",fontSize:15,fontWeight:700,color:T.text,lineHeight:1}}>M.S</div><div style={{fontFamily:T.font,fontSize:9,color:T.muted,letterSpacing:1.5,marginTop:1}}>ONE DAY AT A TIME</div></div></div>);}

function Ring({value,max,size=80,stroke=7,color=T.blue2,children}){const r=(size-stroke)/2,circ=2*Math.PI*r,pct=Math.min(value/max,1);return(<div style={{position:"relative",width:size,height:size,flexShrink:0}}><svg width={size} height={size} viewBox={"0 0 "+size+" "+size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.s2} strokeWidth={stroke}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={String(circ)} strokeDashoffset={String(circ*(1-pct))} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.6s ease"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{children}</div></div>);}

function Card({children,style={}}){return <div style={{background:T.s1,borderRadius:T.rXl,border:"1px solid "+T.border,overflow:"hidden",boxShadow:"0 2px 12px rgba(29,111,170,0.06)",...style}}>{children}</div>;}

function Timer({onDone}){
  const startRef=useRef(Date.now());const extraRef=useRef(0);const[left,setLeft]=useState(90);
  useEffect(()=>{const id=setInterval(()=>{const elapsed=Math.floor((Date.now()-startRef.current)/1000);const rem=90+extraRef.current-elapsed;if(rem<=0){clearInterval(id);onDone();return;}setLeft(rem);},500);return()=>clearInterval(id);},[]);
  const adj=s=>{extraRef.current+=s;setLeft(p=>Math.max(1,p+s));};
  return(<div style={{position:"fixed",inset:0,zIndex:600,display:"flex",alignItems:"flex-end"}}><div onClick={onDone} style={{position:"absolute",inset:0,background:"rgba(12,26,46,0.6)"}}/><div style={{position:"relative",width:"100%",background:T.s1,borderRadius:"24px 24px 0 0",padding:"28px 24px 60px",textAlign:"center",border:"1px solid "+T.border}}><div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:2,marginBottom:20}}>REST TIMER</div><Ring value={left} max={90+extraRef.current} size={120} stroke={8} color={T.blue2}><div><div style={{fontFamily:T.font,fontSize:36,fontWeight:800,color:T.text}}>{left}</div><div style={{fontFamily:T.font,fontSize:10,color:T.muted}}>SEC</div></div></Ring><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginTop:24}}><button onClick={()=>adj(-15)} style={{width:52,height:52,borderRadius:"50%",border:"1px solid "+T.border,background:T.bg,color:T.text,fontFamily:T.font,fontSize:13,fontWeight:700,cursor:"pointer"}}>-15</button><button onClick={onDone} style={{padding:"12px 32px",background:T.bg,border:"1px solid "+T.border,borderRadius:50,color:T.text,fontFamily:T.font,fontSize:14,fontWeight:600,cursor:"pointer"}}>Skip</button><button onClick={()=>adj(15)} style={{width:52,height:52,borderRadius:"50%",border:"1px solid "+T.border,background:T.bg,color:T.text,fontFamily:T.font,fontSize:13,fontWeight:700,cursor:"pointer"}}>+15</button></div></div></div>);}

function ExImg({ex,done,ar}){const[st,setSt]=useState("loading");const[idx,setIdx]=useState(0);const srcs=[ex.ytId?"https://img.youtube.com/vi/"+ex.ytId+"/mqdefault.jpg":null,ex.img].filter(Boolean);const tryNext=()=>{if(idx<srcs.length-1)setIdx(i=>i+1);else setSt("err");};return(<div style={{position:"relative",background:T.blue1,overflow:"hidden",borderRadius:T.r+" "+T.r+" 0 0"}}>{srcs[idx]&&<img src={srcs[idx]} alt={ex.en} onLoad={()=>setSt("ok")} onError={tryNext} style={{width:"100%",height:200,objectFit:"cover",display:st==="ok"?"block":"none"}}/>}{st==="loading"&&<div style={{height:200,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:28,height:28,border:"2px solid "+T.s3,borderTop:"2px solid "+T.blue2,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/></div>}{st==="err"&&<div style={{height:160,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="dumbbell" size={44} color={T.s3} stroke={1}/></div>}<div style={{position:"absolute",top:0,left:0,right:0,padding:"12px 14px",background:"linear-gradient(rgba(12,26,46,0.85),transparent)",display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:28,height:28,background:done?T.green:T.blue2,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name={done?"check":"dumbbell"} size={14} color="#fff" stroke={2}/></div><div style={{fontFamily:T.fontAr,fontSize:14,fontWeight:600,color:"#fff"}}>{ar?ex.ar:ex.en}</div></div></div><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"10px 14px",background:"linear-gradient(transparent,rgba(12,26,46,0.9))",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>{ex.ytId&&<button onClick={()=>ytOpen(ex.ytId)} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",background:"#FF0000",border:"none",borderRadius:6,color:"#fff",fontFamily:T.font,fontSize:10,fontWeight:700,cursor:"pointer"}}><Ic name="play" size={9} color="#fff"/> YouTube</button>}</div></div>);}

function HabitForm({habit,onSave,onClose,ar}){const ll=ar?L.ar:L.en;const[name,setName]=useState(habit?habit.name:"");const[freq,setFreq]=useState(habit?habit.frequency:"daily");const[days,setDays]=useState(habit?habit.days:[0,1,2,3,4,5,6]);const[times,setTimes]=useState(habit?habit.timesPerDay:1);const[when,setWhen]=useState(habit?habit.when:"morning");const[color,setColor]=useState(habit?habit.color:T.blue2);const COLS=[T.blue2,T.green,T.red,T.amber,T.purple,T.blue3,T.blue4,T.blue1];const DS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];const tog=d=>setDays(p=>p.includes(d)?p.filter(x=>x!==d):[...p,d]);const valid=name.trim().length>0;return(<div style={{position:"fixed",inset:0,zIndex:500,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}><div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(12,26,46,0.5)"}}/><div style={{position:"relative",background:T.s1,borderRadius:"24px 24px 0 0",padding:"20px 20px 52px",maxHeight:"90vh",overflowY:"auto",border:"1px solid "+T.border}}><div style={{width:36,height:4,background:T.s2,borderRadius:2,margin:"0 auto 20px"}}/><div style={{fontFamily:T.font,fontSize:18,fontWeight:700,color:T.text,marginBottom:20,textAlign:"center"}}>{habit?ll.editHabitTitle:ll.addHabitTitle}</div><input value={name} onChange={e=>setName(e.target.value)} placeholder={ll.habitName} dir={ar?"rtl":"ltr"} style={{width:"100%",padding:"14px 16px",background:T.bg,border:"1px solid "+T.border,borderRadius:T.r,color:T.text,fontSize:16,fontFamily:T.fontAr,outline:"none",boxSizing:"border-box",marginBottom:16}}/><div style={{display:"flex",gap:10,marginBottom:16,justifyContent:"center"}}>{COLS.map(c=><div key={c} onClick={()=>setColor(c)} style={{width:32,height:32,borderRadius:"50%",background:c,cursor:"pointer",border:color===c?"3px solid "+T.text:"3px solid transparent",boxSizing:"border-box"}}/>)}</div><div style={{display:"flex",gap:8,marginBottom:16}}>{[{id:"daily",label:ll.daily},{id:"weekly",label:ll.weekly}].map(f=>(<button key={f.id} onClick={()=>setFreq(f.id)} style={{flex:1,padding:"12px",border:"none",borderRadius:T.r,background:freq===f.id?color:T.bg,color:freq===f.id?"#fff":T.muted,fontFamily:T.fontAr,fontSize:15,fontWeight:600,cursor:"pointer"}}>{f.label}</button>))}</div>{freq==="weekly"&&(<div style={{display:"flex",gap:6,marginBottom:16}}>{DS.map((d,i)=>(<button key={i} onClick={()=>tog(i)} style={{flex:1,padding:"8px 2px",border:"none",borderRadius:T.rs,background:days.includes(i)?color:T.bg,color:days.includes(i)?"#fff":T.muted,fontFamily:T.font,fontSize:11,fontWeight:600,cursor:"pointer"}}>{d}</button>))}</div>)}<div style={{display:"flex",gap:8,marginBottom:16}}>{[1,2,3,4,5].map(n=>(<button key={n} onClick={()=>setTimes(n)} style={{flex:1,padding:"10px",border:"none",borderRadius:T.r,background:times===n?color:T.bg,color:times===n?"#fff":T.muted,fontFamily:T.font,fontSize:16,fontWeight:700,cursor:"pointer"}}>{n}x</button>))}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:24}}>{TOD.map(t=>(<button key={t.id} onClick={()=>setWhen(t.id)} style={{padding:"12px",border:"1px solid "+(when===t.id?t.c:T.border),borderRadius:T.r,background:when===t.id?t.c+"22":T.bg,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}><div style={{width:8,height:8,borderRadius:"50%",background:t.c,flexShrink:0}}/><div style={{textAlign:"left"}}><div style={{fontFamily:T.fontAr,fontSize:14,fontWeight:when===t.id?600:400,color:when===t.id?t.c:T.text}}>{ar?t.ar:t.en}</div><div style={{fontFamily:T.font,fontSize:10,color:T.muted}}>{t.time}</div></div></button>))}</div><button onClick={()=>{if(valid)onSave({...(habit||{}),name:name.trim(),frequency:freq,days,timesPerDay:times,when,color})}} style={{width:"100%",padding:"16px",background:valid?color:T.bg,border:"none",borderRadius:T.r,color:valid?"#fff":T.muted,fontFamily:T.font,fontSize:17,fontWeight:700,cursor:valid?"pointer":"default"}}>{habit?ll.saveChanges:ll.addHabitTitle}</button></div></div>);}

function WtTracker({dailyLog,onSave,ar}){const ll=ar?L.ar:L.en;const today=todayKey();const[date,setDate]=useState(today);const[wt,setWt]=useState((dailyLog[today]&&dailyLog[today].weight)||"");const[waist,setWaist]=useState((dailyLog[today]&&dailyLog[today].waist)||"");const[chest,setChest]=useState((dailyLog[today]&&dailyLog[today].chest)||"");const[arm,setArm]=useState((dailyLog[today]&&dailyLog[today].arm)||"");const[saved,setSaved]=useState(false);const load=d=>{setDate(d);const lg=dailyLog[d]||{};setWt(lg.weight||"");setWaist(lg.waist||"");setChest(lg.chest||"");setArm(lg.arm||"");};const doSave=()=>{if(!wt)return;onSave(date,{weight:wt,waist,chest,arm});setSaved(true);setTimeout(()=>setSaved(false),2000);};const wH=Object.entries(dailyLog).filter(([,v])=>v&&v.weight).sort(([a],[b])=>a.localeCompare(b)).slice(-10).map(([d,v])=>({d:d.slice(5),v:parseFloat(v.weight)}));const latest=wH.length?wH[wH.length-1].v:97;const diff=parseFloat((latest-97).toFixed(1));return(<div style={{padding:"0 16px 20px",display:"flex",flexDirection:"column",gap:12}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>{[{label:ll.startWeight,val:"97",unit:"kg",c:T.muted},{label:ll.current,val:String(latest),unit:"kg",c:T.text},{label:ll.difference,val:diff>0?"+ "+diff:diff<0?"- "+Math.abs(diff):"0",unit:"kg",c:diff>0?T.red:T.green}].map((s,i)=>(<Card key={i} style={{padding:"16px 10px",textAlign:"center"}}><div style={{fontFamily:T.font,fontSize:22,fontWeight:800,color:s.c}}>{s.val}</div><div style={{fontFamily:T.font,fontSize:9,color:T.muted,marginTop:2}}>{s.unit}</div><div style={{fontFamily:T.fontAr,fontSize:11,color:T.muted,marginTop:4}}>{s.label}</div></Card>))}</div>{wH.length>=2&&(<Card style={{padding:"16px"}}><div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1,marginBottom:12}}>WEIGHT PROGRESS</div><svg width="100%" height="80" viewBox={"0 0 "+(wH.length*36)+" 75"} preserveAspectRatio="none">{(()=>{const vals=wH.map(x=>x.v),mn=Math.min(...vals,87)-0.5,mx=Math.max(...vals,97)+0.5;const pts=wH.map((x,i)=>(i*36+18)+","+(70-((x.v-mn)/(mx-mn))*55)).join(" ");const ty=70-((87-mn)/(mx-mn))*55;return(<g><line x1="0" y1={ty} x2={wH.length*36} y2={ty} stroke={T.green} strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/><polyline points={pts} fill="none" stroke={T.blue2} strokeWidth="2.5"/>{wH.map((x,i)=>(<g key={i}><circle cx={i*36+18} cy={70-((x.v-mn)/(mx-mn))*55} r="4" fill={T.blue2}/><text x={i*36+18} y={74} textAnchor="middle" fill={T.muted} fontSize="7" fontFamily="Outfit,-apple-system">{x.d}</text></g>))}<text x={wH.length*36-2} y={ty-4} textAnchor="end" fill={T.green} fontSize="7" fontFamily="Outfit,-apple-system">87 {ll.target}</text></g>);})()}</svg></Card>)}<Card style={{padding:"16px"}}><div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1,marginBottom:10}}>DATE</div><input type="date" value={date} max={today} onChange={e=>load(e.target.value)} style={{width:"100%",padding:"12px 14px",background:T.bg,border:"1px solid "+T.border,borderRadius:T.rs,color:T.text,fontSize:15,fontFamily:T.font,outline:"none",boxSizing:"border-box"}}/></Card><Card style={{padding:"16px"}}><div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1,marginBottom:14}}>MEASUREMENTS</div>{[{key:"weight",label:"Weight *",val:wt,set:setWt,color:T.blue2,unit:"kg"},{key:"waist",label:ll.waist,val:waist,set:setWaist,color:T.blue3,unit:"cm"},{key:"chest",label:ll.chest,val:chest,set:setChest,color:T.green,unit:"cm"},{key:"arm",label:ll.arm,val:arm,set:setArm,color:T.purple,unit:"cm"}].map(f=>(<div key={f.key} style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}><div style={{width:8,height:8,borderRadius:"50%",background:f.color,flexShrink:0}}/><div style={{width:72,fontFamily:T.font,fontSize:13,color:T.text,flexShrink:0}}>{f.label}</div><input type="number" step="0.1" value={f.val} onChange={e=>f.set(e.target.value)} placeholder="---" style={{flex:1,padding:"10px",background:T.bg,border:"1px solid "+(f.val?f.color:T.border),borderRadius:T.rs,color:f.val?f.color:T.text,fontSize:17,fontWeight:700,fontFamily:T.font,outline:"none",textAlign:"center"}}/><div style={{fontFamily:T.font,fontSize:12,color:T.muted,width:22}}>{f.unit}</div></div>))}<button onClick={doSave} disabled={!wt} style={{width:"100%",marginTop:8,padding:"14px",background:wt?T.blue2:T.bg,border:"none",borderRadius:T.r,color:wt?"#fff":T.muted,fontFamily:T.font,fontSize:16,fontWeight:700,cursor:wt?"pointer":"default"}}>{saved?"Saved!":ll.saveEntry}</button></Card>{Object.entries(dailyLog).filter(([,v])=>v&&v.weight).length>0&&(<Card style={{padding:"16px"}}><div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1,marginBottom:12}}>HISTORY</div>{Object.entries(dailyLog).filter(([,v])=>v&&v.weight).sort(([a],[b])=>b.localeCompare(a)).slice(0,8).map(([d,log],i)=>(<div key={i} onClick={()=>load(d)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid "+T.border,cursor:"pointer"}}><div style={{fontFamily:T.font,fontSize:12,color:T.muted,width:50}}>{d.slice(5)}</div><div style={{fontFamily:T.font,fontSize:18,fontWeight:700,color:T.blue2}}>{log.weight} kg</div>{log.waist&&<div style={{fontFamily:T.font,fontSize:12,color:T.blue3}}>{log.waist}cm</div>}{log.chest&&<div style={{fontFamily:T.font,fontSize:12,color:T.green}}>{log.chest}cm</div>}{log.arm&&<div style={{fontFamily:T.font,fontSize:12,color:T.purple}}>{log.arm}cm</div>}</div>))}</Card>)}</div>);}

// ─── MEAL SCANNER ─────────────────────────────────────────────────────────────
function MealScanner({onClose,ar,apiKey,onAddToDay}){
  const ll=ar?L.ar:L.en;
  const[img,setImg]=useState(null);
  const[loading,setLoading]=useState(false);
  const[result,setResult]=useState(null);
  const[err,setErr]=useState(null);
  const fileRef=useRef();

  const analyze=async(base64,mtype)=>{
    setLoading(true);setErr(null);setResult(null);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({
          model:"claude-haiku-4-5-20251001",
          max_tokens:600,
          messages:[{role:"user",content:[
            {type:"image",source:{type:"base64",media_type:mtype,data:base64}},
            {type:"text",text:"Analyze this meal photo and respond ONLY with a JSON object (no markdown, no backticks) with these exact fields: {\"name\":\"meal name\",\"calories\":number,\"protein\":number,\"carbs\":number,\"fat\":number,\"fiber\":number,\"items\":[\"item1\",\"item2\"],\"rating\":\"Excellent/Good/Fair/Poor\",\"tip\":\"one health tip for Mahmoud who has high LDL and wants to lose weight\"}"}
          ]}]
        })
      });
      const data=await res.json();
      const txt=data.content[0].text.replace(/```json|```/g,"").trim();
      const parsed=JSON.parse(txt);
      setResult(parsed);
    }catch(e){setErr("Could not analyze. Try a clearer photo.");}
    setLoading(false);
  };

  const onFile=async(e)=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=async ev=>{
      const b64=ev.target.result.split(",")[1];
      const mtype=file.type||"image/jpeg";
      setImg(ev.target.result);
      await analyze(b64,mtype);
    };
    reader.readAsDataURL(file);
  };

  const rColor=r=>r==="Excellent"?T.green:r==="Good"?T.blue2:r==="Fair"?T.amber:T.red;

  return(
    <div style={{position:"fixed",inset:0,zIndex:550,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(12,26,46,0.6)"}}/>
      <div style={{position:"relative",background:T.s1,borderRadius:"24px 24px 0 0",padding:"20px 20px 52px",maxHeight:"85vh",overflowY:"auto",border:"1px solid "+T.border}}>
        <div style={{width:36,height:4,background:T.s2,borderRadius:2,margin:"0 auto 16px"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Ic name="camera" size={20} color={T.blue2} stroke={2}/>
            <div style={{fontFamily:T.font,fontSize:17,fontWeight:700,color:T.text}}>{ll.scanMeal}</div>
          </div>
          <button onClick={onClose} style={{width:32,height:32,borderRadius:"50%",border:"none",background:T.bg,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="x" size={14} color={T.muted} stroke={2}/></button>
        </div>

        {!img&&(
          <div onClick={()=>fileRef.current.click()} style={{border:"2px dashed "+T.border,borderRadius:T.rLg,padding:"48px 20px",textAlign:"center",cursor:"pointer",background:T.bg}}>
            <Ic name="camera" size={48} color={T.s3} stroke={1}/>
            <div style={{fontFamily:T.fontAr,fontSize:16,color:T.muted,marginTop:12}}>Tap to take or upload photo</div>
            <div style={{fontFamily:T.font,fontSize:12,color:T.dim,marginTop:4}}>AI will analyze calories & macros</div>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onFile} style={{display:"none"}}/>

        {img&&<img src={img} style={{width:"100%",borderRadius:T.rLg,marginBottom:12,maxHeight:220,objectFit:"cover"}} alt="meal"/>}

        {loading&&(
          <div style={{textAlign:"center",padding:"24px 0"}}>
            <div style={{width:36,height:36,border:"3px solid "+T.s2,borderTop:"3px solid "+T.blue2,borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 12px"}}/>
            <div style={{fontFamily:T.fontAr,fontSize:15,color:T.muted}}>{ll.analyzing}</div>
          </div>
        )}

        {err&&<div style={{background:T.red+"15",border:"1px solid "+T.red+"30",borderRadius:T.r,padding:"12px 16px",color:T.red,fontFamily:T.font,fontSize:14,marginBottom:12}}>{err}</div>}

        {result&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontFamily:T.fontAr,fontSize:18,fontWeight:700,color:T.text}}>{result.name}</div>
              <div style={{padding:"4px 12px",borderRadius:20,background:rColor(result.rating)+"20",border:"1px solid "+rColor(result.rating)+"40"}}>
                <span style={{fontFamily:T.font,fontSize:12,fontWeight:700,color:rColor(result.rating)}}>{result.rating}</span>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {[{l:"KCAL",v:result.calories,c:T.red},{l:"PRO",v:result.protein+"g",c:T.green},{l:"CARB",v:result.carbs+"g",c:T.blue2},{l:"FAT",v:result.fat+"g",c:T.amber}].map((m,i)=>(
                <Card key={i} style={{padding:"10px 6px",textAlign:"center",background:T.bg}}>
                  <div style={{fontFamily:T.font,fontSize:16,fontWeight:800,color:m.c}}>{m.v}</div>
                  <div style={{fontFamily:T.font,fontSize:9,fontWeight:700,color:T.muted,letterSpacing:1,marginTop:2}}>{m.l}</div>
                </Card>
              ))}
            </div>
            {result.items&&result.items.length>0&&(
              <Card style={{padding:"12px 16px",background:T.bg}}>
                <div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1,marginBottom:8}}>DETECTED ITEMS</div>
                {result.items.map((item,i)=><div key={i} style={{fontFamily:T.fontAr,fontSize:13,color:T.sub,padding:"4px 0",borderBottom:i<result.items.length-1?"1px solid "+T.border:"none"}}>• {item}</div>)}
              </Card>
            )}
            {result.tip&&(
              <Card style={{padding:"12px 16px",background:T.blue2+"10",borderLeft:"3px solid "+T.blue2}}>
                <div style={{fontFamily:T.font,fontSize:10,fontWeight:700,color:T.blue2,letterSpacing:1,marginBottom:4}}>HEALTH TIP</div>
                <div style={{fontFamily:T.fontAr,fontSize:13,color:T.sub,lineHeight:1.5}}>{result.tip}</div>
              </Card>
            )}
            <button onClick={()=>{
              if(onAddToDay)onAddToDay(result);
              onClose();
            }} style={{padding:"14px",background:T.green,border:"none",borderRadius:T.r,color:"#fff",fontFamily:T.font,fontSize:15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <Ic name="plus" size={16} color="#fff" stroke={2.5}/> Add to My Day
            </button>
            <button onClick={()=>{setImg(null);setResult(null);fileRef.current.click();}} style={{padding:"14px",background:T.bg,border:"1px solid "+T.border,borderRadius:T.r,color:T.muted,fontFamily:T.font,fontSize:15,fontWeight:600,cursor:"pointer"}}>
              Scan Another Meal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App(){
  const[lang,setLang]=useState(()=>sGet("lang")||"en");
  const[scr,setScr]=useState("today");
  const[dl,setDl]=useState(()=>sGet("dl3")||{});
  const[wl,setWl]=useState(()=>sGet("wl3")||{});
  const[ws,setWs]=useState(()=>sGet("ws1")||{});
  const[habits,setHabits]=useState(()=>sGet("hb1")||[]);
  const[hl,setHl]=useState(()=>sGet("hl1")||{});
  const[showPick,setShowPick]=useState(false);
  const[showHF,setShowHF]=useState(false);
  const[editH,setEditH]=useState(null);
  const[selDay,setSelDay]=useState(1);
  const[rt,setRt]=useState(false);
  const[actMeal,setActMeal]=useState(null);
  const[flash,setFlash]=useState(false);
  const[celebrate,setCelebrate]=useState(false);
  const[swapEx,setSwapEx]=useState(null);
  const[showScanner,setShowScanner]=useState(false);
  const[showSettings,setShowSettings]=useState(false);

  const [API_KEY, setApiKey] = useState(()=>localStorage.getItem("msApiKey")||"");

  const ll=lang==="ar"?L.ar:L.en;
  const ar=lang==="ar";
  const today=todayKey();
  const dow=new Date().getDay();
  const todayDayName=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dow];
  const sc=ws[todayDayName]||ws[today];
  const acColor=sc?sc.color:T.muted;
  const dayType=sc?sc.id:"rest";
  const tMeals=getMeals(dayType);
  const tDL=dl[today]||{};
  const tHabits=habits.filter(h=>h.frequency==="daily"||(h.frequency==="weekly"&&h.days&&h.days.includes(dow)));
  const tHL=hl[today]||{};

  const showFlash=()=>{setFlash(true);setTimeout(()=>setFlash(false),1400);};
  const updDL=p=>{const n={...dl,[today]:{...tDL,...p}};setDl(n);sSet("dl3",n);showFlash();};
  const updWL=(day,ei,si,p)=>{const key=today+"-d"+day;const dayLog=wl[key]||{};const sets=[...((dayLog[ei]&&dayLog[ei].sets)||[])];if(!sets[si])sets[si]={kg:"",reps:"",done:false};sets[si]={...sets[si],...p};const n={...wl,[key]:{...dayLog,[ei]:{sets}}};setWl(n);sSet("wl3",n);showFlash();};
  const getWL=day=>wl[today+"-d"+day]||{};
  const saveH=h=>{const next=h.id?habits.map(x=>x.id===h.id?h:x):[...habits,{...h,id:Date.now().toString()}];setHabits(next);sSet("hb1",next);setShowHF(false);setEditH(null);};
  const delH=id=>{const next=habits.filter(h=>h.id!==id);setHabits(next);sSet("hb1",next);};
  const logH=(id,target)=>{const cur=(tHL[id])||0,next=cur>=target?0:cur+1;const n={...hl,[today]:{...tHL,[id]:next}};setHl(n);sSet("hl1",n);showFlash();};
  const getLastBest=(day,ei)=>{const d7=new Date(Date.now()-7*24*3600*1000).toISOString().slice(0,10)+"-d"+day;const sets=((wl[d7]&&wl[d7][ei]&&wl[d7][ei].sets)||[]).filter(s=>s.done&&s.kg);if(!sets.length)return null;return sets.reduce((b,s)=>parseFloat(s.kg)>parseFloat(b.kg||0)?s:b,sets[0]);};
  const greet=()=>{const h=new Date().getHours();if(h<12)return ll.hi;if(h<17)return ll.hiA;return ll.hiE;};
  const fmtDate=()=>{const d=new Date();const mEn=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];const mAr=["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];return ar?d.getDate()+" "+(mAr[d.getMonth()])+" "+d.getFullYear():(mEn[d.getMonth()])+" "+d.getDate()+", "+d.getFullYear();};
  const CHEERS=["Crushed it Mahmoud! Keep that momentum!","Session complete! You are building something great!","Another day stronger! One day at a time!","Well done! Your future self thanks you!","Nailed it! Consistency is key!"];
  const getWeekStart=d=>{const dt=new Date(d);const day=dt.getDay();const diff=day===0?6:day-1;dt.setDate(dt.getDate()-diff);dt.setHours(0,0,0,0);return dt;};

  function TodayScr(){
    const wPct=Math.min(((tDL.water||0)/12)*100,100);
    const mDone=(tDL.mealsEaten||[]).length;
    const hDone=tHabits.filter(h=>(tHL[h.id]||0)>=h.timesPerDay).length;
    return(
      <div style={{paddingBottom:8}}>
        <div style={{padding:"20px 20px 16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
            <Logo/>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{setLang(ar?"en":"ar");sSet("lang",ar?"en":"ar");}} style={{padding:"7px 14px",borderRadius:20,border:"1px solid "+T.border,background:T.s1,color:T.muted,fontFamily:T.font,fontSize:12,fontWeight:600,cursor:"pointer"}}>{ar?"English":"عربي"}</button>
              <button onClick={()=>setShowPick(true)} style={{padding:"7px 14px",borderRadius:20,border:"1px solid "+T.border,background:T.s1,color:T.muted,fontFamily:T.font,fontSize:12,fontWeight:600,cursor:"pointer"}}>{ll.change}</button>
              <button onClick={()=>setShowSettings(true)} style={{width:34,height:34,borderRadius:"50%",border:"1px solid "+T.border,background:T.s1,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="bolt" size={14} color={API_KEY?T.green:T.amber} stroke={2}/></button>
            </div>
          </div>
          <div style={{fontFamily:T.font,fontSize:13,color:T.muted,marginBottom:4}}>{fmtDate()}</div>
          <div style={{fontFamily:T.font,fontSize:28,fontWeight:800,color:T.text,lineHeight:1.2,marginBottom:8}}>{greet()} {ll.name}</div>
          {sc&&<div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:8,height:8,borderRadius:"50%",background:acColor}}/><div style={{fontFamily:T.font,fontSize:14,color:acColor,fontWeight:600}}>{ar?sc.ar:sc.en}</div></div>}
        </div>
        {/* Rings */}
        <div style={{padding:"0 16px 12px"}}>
          <Card style={{padding:"20px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
              {[{val:tDL.water||0,max:12,color:T.blue1,label:ll.water,display:((tDL.water||0)*250/1000).toFixed(1)+"L"},{val:mDone,max:tMeals.length,color:T.blue2,label:ll.meals,display:mDone+"/"+tMeals.length},{val:hDone,max:Math.max(tHabits.length,1),color:T.blue3,label:ll.habits,display:hDone+"/"+tHabits.length}].map((r,i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <Ring value={r.val} max={r.max} size={82} stroke={7} color={r.color}><div style={{fontFamily:T.font,fontSize:13,fontWeight:800,color:r.color}}>{r.display}</div></Ring>
                  <div style={{fontFamily:T.font,fontSize:11,color:T.muted,marginTop:8}}>{r.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        {/* Water */}
        <div style={{padding:"0 16px 12px"}}>
          <Card style={{padding:"18px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><Ic name="drop" size={18} color={T.blue2} stroke={2}/><div style={{fontFamily:T.font,fontSize:16,fontWeight:600,color:T.text}}>{ll.water}</div></div>
              <div style={{fontFamily:T.font,fontSize:14,color:T.muted}}>{((tDL.water||0)*250/1000).toFixed(1)} / 3.0 L</div>
            </div>
            <div style={{height:5,background:T.s2,borderRadius:3,marginBottom:14,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:"linear-gradient(90deg,"+T.blue1+","+T.blue4+")",width:wPct+"%",transition:"width 0.4s"}}/></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:4}}>
              {Array.from({length:12},(_,i)=>{const f=i<(tDL.water||0);return(<button key={i} onClick={()=>updDL({water:(tDL.water||0)===i+1?i:i+1})} style={{aspectRatio:"1",border:"none",borderRadius:6,background:f?"linear-gradient(135deg,"+T.blue2+","+T.blue4+")":T.s2,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",minHeight:32}}><Ic name="drop" size={13} color={f?"#fff":T.dim} stroke={2}/></button>);})}
            </div>
          </Card>
        </div>
        {/* Sleep */}
        <div style={{padding:"0 16px 12px"}}>
          <Card style={{padding:"18px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><Ic name="bed" size={18} color={T.purple} stroke={2}/><div style={{fontFamily:T.font,fontSize:16,fontWeight:600,color:T.text}}>{ll.sleep}</div></div>
              <div style={{fontFamily:T.font,fontSize:24,fontWeight:800,color:tDL.sleep?T.blue2:T.muted}}>{tDL.sleep||"--"}<span style={{fontSize:13,fontWeight:400,color:T.muted}}> h</span></div>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {[5,5.5,6,6.5,7,7.5,8,8.5,9].map(h=>(<button key={h} onClick={()=>updDL({sleep:tDL.sleep===h?null:h})} style={{padding:"8px 12px",border:"1px solid "+(tDL.sleep===h?T.blue2:T.border),borderRadius:20,background:tDL.sleep===h?T.blue2:T.bg,color:tDL.sleep===h?"#fff":T.muted,fontFamily:T.font,fontSize:13,fontWeight:tDL.sleep===h?700:400,cursor:"pointer"}}>{h}h</button>))}
            </div>
          </Card>
        </div>
        {/* Habits */}
        {tHabits.length>0&&(<div style={{padding:"0 16px 12px"}}><Card style={{padding:"18px"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}><div style={{fontFamily:T.font,fontSize:16,fontWeight:600,color:T.text}}>Habits</div><div style={{fontFamily:T.font,fontSize:13,color:T.blue2,fontWeight:700}}>{hDone}/{tHabits.length}</div></div>{tHabits.map(h=>{const done=tHL[h.id]||0,complete=done>=h.timesPerDay;return(<div key={h.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid "+T.border}}><div style={{width:10,height:10,borderRadius:"50%",background:h.color,flexShrink:0}}/><div style={{flex:1,fontFamily:T.fontAr,fontSize:15,fontWeight:500,color:complete?T.muted:T.text,textDecoration:complete?"line-through":"none"}}>{h.name}</div>{h.timesPerDay>1&&<div style={{fontFamily:T.font,fontSize:12,color:T.muted}}>{done}/{h.timesPerDay}</div>}<button onClick={()=>logH(h.id,h.timesPerDay)} style={{width:38,height:38,borderRadius:"50%",border:"none",cursor:"pointer",background:complete?h.color:h.color+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic name="check" size={16} color={complete?"#fff":h.color} stroke={2.5}/></button></div>);})}</Card></div>)}
        {/* Workout Banner */}
        {dayType==="gym"&&(<div style={{padding:"0 16px 12px"}}><div onClick={()=>setScr("workout")} style={{background:"linear-gradient(135deg,"+T.blue1+","+T.blue2+")",borderRadius:T.rXl,padding:"20px",cursor:"pointer",border:"1px solid "+T.blue1+"44",boxShadow:"0 4px 20px "+T.blue2+"30"}}><div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:2,marginBottom:6}}>{ll.todayWorkout.toUpperCase()}</div><div style={{fontFamily:T.font,fontSize:22,fontWeight:800,color:"#fff",marginBottom:6}}>Day {selDay} · {WO[selDay]?WO[selDay].enT:""}</div><div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{fontFamily:T.font,fontSize:13,color:"rgba(255,255,255,0.65)"}}>{WO[selDay]?WO[selDay].ex.length:6} exercises{tDL.gymDone&&<span style={{marginLeft:8,background:"rgba(255,255,255,0.2)",padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>Done</span>}</div><div style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="chev" size={18} color="#fff" stroke={2.5}/></div></div></div></div>)}
        {/* Meals Banner */}
        <div style={{padding:"0 16px 12px"}}><div onClick={()=>setScr("meals")} style={{background:T.s1,borderRadius:T.rXl,padding:"18px 20px",cursor:"pointer",border:"1px solid "+T.border,boxShadow:"0 2px 12px "+T.blue2+"10",display:"flex",alignItems:"center",justifyContent:"space-between"}}><div><div style={{fontFamily:T.font,fontSize:10,fontWeight:700,color:T.muted,letterSpacing:2,marginBottom:4}}>{ll.todayMeals.toUpperCase()}</div><div style={{fontFamily:T.fontAr,fontSize:18,fontWeight:700,color:T.text}}>{ll.fuelSmart}</div><div style={{fontFamily:T.font,fontSize:12,color:T.muted,marginTop:3}}>{mDone}/{tMeals.length} meals · {(tDL.mealsEaten||[]).reduce((a,i)=>a+(tMeals[i]&&tMeals[i].kcal||0),0)} kcal</div></div><div style={{display:"flex",gap:8}}><button onClick={e=>{e.stopPropagation();setShowScanner(true);}} style={{width:40,height:40,borderRadius:"50%",border:"none",background:T.blue2+"15",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="camera" size={18} color={T.blue2} stroke={2}/></button><div style={{width:40,height:40,borderRadius:"50%",background:T.s2,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="chev" size={18} color={T.muted} stroke={2}/></div></div></div></div>
        {/* Activity picker */}
        {showPick&&(<div style={{position:"fixed",inset:0,zIndex:400,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}><div onClick={()=>setShowPick(false)} style={{position:"absolute",inset:0,background:"rgba(12,26,46,0.5)"}}/><div style={{position:"relative",background:T.s1,borderRadius:"24px 24px 0 0",padding:"20px 20px 52px",border:"1px solid "+T.border}}><div style={{width:36,height:4,background:T.s2,borderRadius:2,margin:"0 auto 20px"}}/><div style={{fontFamily:T.font,fontSize:18,fontWeight:700,color:T.text,marginBottom:16,textAlign:"center"}}>Today Activity</div>{ACTS.map(act=>{const isSel=sc&&sc.id===act.id;return(<div key={act.id} onClick={()=>{const n={...ws,[todayDayName]:act};setWs(n);sSet("ws1",n);setShowPick(false);}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:T.r,background:isSel?act.color+"15":T.bg,border:"1px solid "+(isSel?act.color:T.border),cursor:"pointer",marginBottom:8}}><Ic name={act.icon} size={20} color={act.color} stroke={2}/><div style={{fontFamily:T.fontAr,fontSize:17,fontWeight:isSel?700:400,color:isSel?act.color:T.text}}>{ar?act.ar:act.en}</div>{isSel&&<div style={{marginLeft:"auto"}}><Ic name="check" size={18} color={act.color} stroke={2.5}/></div>}</div>);})}</div></div>)}
      </div>
    );
  }

  function HabitsScr(){
    const grps={morning:[],noon:[],evening:[],night:[]};
    tHabits.forEach(h=>(grps[h.when]||grps.morning).push(h));
    return(
      <div style={{paddingBottom:8}}>
        <div style={{padding:"20px 20px 16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <div style={{fontFamily:T.font,fontSize:28,fontWeight:800,color:T.text}}>{ll.habits}</div>
            <button onClick={()=>{setEditH(null);setShowHF(true);}} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:T.blue2,border:"none",borderRadius:20,color:"#fff",fontFamily:T.font,fontSize:14,fontWeight:600,cursor:"pointer"}}><Ic name="plus" size={14} color="#fff" stroke={2.5}/> {ll.addHabit}</button>
          </div>
        </div>
        {habits.length===0?(<div style={{padding:"60px 20px",textAlign:"center"}}><div style={{fontSize:48,marginBottom:12}}>🎯</div><div style={{fontFamily:T.font,fontSize:17,color:T.muted}}>{ll.noHabits}</div></div>):(
          <div style={{padding:"0 16px"}}>
            {tHabits.length>0&&(
              <div style={{marginBottom:20}}>
                <div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1.5,marginBottom:12}}>TODAY</div>
                {["morning","noon","evening","night"].map(wh=>{const grp=grps[wh];if(!grp.length)return null;const tod=TOD.find(t=>t.id===wh);return(<div key={wh} style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><div style={{width:6,height:6,borderRadius:"50%",background:tod.c}}/><div style={{fontFamily:T.font,fontSize:12,color:tod.c,fontWeight:600}}>{ar?tod.ar:tod.en} · {tod.time}</div></div>{grp.map(h=>{const done=tHL[h.id]||0,complete=done>=h.timesPerDay;return(<Card key={h.id} style={{marginBottom:8,padding:"14px 16px"}}><div style={{display:"flex",alignItems:"center",gap:12}}><Ring value={done} max={h.timesPerDay} size={46} stroke={4} color={h.color}>{complete?<Ic name="check" size={14} color={h.color} stroke={2.5}/>:<div style={{width:8,height:8,borderRadius:"50%",background:h.color+"40"}}/>}</Ring><div style={{flex:1}}><div style={{fontFamily:T.fontAr,fontSize:15,fontWeight:500,color:complete?T.muted:T.text,textDecoration:complete?"line-through":"none"}}>{h.name}</div>{h.timesPerDay>1&&<div style={{fontFamily:T.font,fontSize:11,color:T.muted,marginTop:2}}>{done}/{h.timesPerDay}x</div>}</div><button onClick={()=>{setEditH(h);setShowHF(true);}} style={{width:32,height:32,borderRadius:"50%",border:"none",background:T.bg,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="edit" size={13} color={T.muted} stroke={2}/></button><button onClick={()=>delH(h.id)} style={{width:32,height:32,borderRadius:"50%",border:"none",background:T.red+"15",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="x" size={13} color={T.red} stroke={2}/></button><button onClick={()=>logH(h.id,h.timesPerDay)} style={{width:44,height:44,borderRadius:"50%",border:"none",cursor:"pointer",background:complete?h.color:h.color+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic name="check" size={18} color={complete?"#fff":h.color} stroke={2.5}/></button></div></Card>);})}</div>);})}</div>
            )}
            <div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1.5,marginBottom:12}}>ALL HABITS</div>
            {habits.map(h=>(<Card key={h.id} style={{marginBottom:8,padding:"14px 16px"}}><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:40,height:40,borderRadius:"50%",background:h.color+"20",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><div style={{width:14,height:14,borderRadius:"50%",background:h.color}}/></div><div style={{flex:1}}><div style={{fontFamily:T.fontAr,fontSize:15,fontWeight:500,color:T.text}}>{h.name}</div><div style={{fontFamily:T.font,fontSize:11,color:T.muted,marginTop:2}}>{h.frequency==="daily"?"Daily":(h.days&&h.days.length||0)+" days/wk"} · {h.timesPerDay}x</div></div><button onClick={()=>{setEditH(h);setShowHF(true);}} style={{width:32,height:32,borderRadius:"50%",border:"none",background:T.bg,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="edit" size={13} color={T.muted} stroke={2}/></button><button onClick={()=>delH(h.id)} style={{width:32,height:32,borderRadius:"50%",border:"none",background:T.red+"15",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="x" size={13} color={T.red} stroke={2}/></button></div></Card>))}
          </div>
        )}
        {showHF&&<HabitForm habit={editH} onSave={saveH} onClose={()=>{setShowHF(false);setEditH(null);}} ar={ar}/>}
      </div>
    );
  }

  function WorkoutScr(){
    const[tab,setTab]=useState("workout");
    const W=WO[selDay];
    const tWLd=getWL(selDay);
    return(
      <div>
        <div style={{padding:"20px 20px 0"}}>
          <div style={{fontFamily:T.font,fontSize:28,fontWeight:800,color:T.text,marginBottom:16}}>Workout</div>
          <div style={{display:"flex",background:T.s1,borderRadius:T.r,padding:3,marginBottom:16,border:"1px solid "+T.border}}>
            {[{id:"workout",label:"Train"},{id:"schedule",label:"Plan"}].map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"9px",border:"none",borderRadius:10,background:tab===t.id?T.blue2:"transparent",color:tab===t.id?"#fff":T.muted,fontFamily:T.fontAr,fontSize:14,fontWeight:tab===t.id?700:400,cursor:"pointer",transition:"all 0.2s"}}>{t.label}</button>))}
          </div>
        </div>
        {tab==="workout"&&(
          <div>
            <div style={{padding:"0 16px 12px"}}>
              <div style={{display:"flex",gap:8}}>
                {[1,2,3,4].map(d=>(<button key={d} onClick={()=>setSelDay(d)} style={{flex:1,padding:"12px 8px",border:"1px solid "+(selDay===d?T.blue2:T.border),borderRadius:T.r,background:selDay===d?T.blue2:T.s1,color:selDay===d?"#fff":T.muted,fontFamily:T.font,fontSize:13,fontWeight:selDay===d?700:400,cursor:"pointer",transition:"all 0.2s"}}>{ar?ll["day"+d]:"Day "+d}</button>))}
              </div>
            </div>
            {W&&(
              <div>
                <div style={{margin:"0 16px 12px",background:"linear-gradient(135deg,"+T.blue1+","+T.blue2+")",borderRadius:T.rXl,padding:"20px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 4px 16px "+T.blue2+"30"}}>
                  <div><div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:2,marginBottom:4}}>DAY {selDay}</div><div style={{fontFamily:T.font,fontSize:20,fontWeight:800,color:"#fff"}}>{ar?W.arT:W.enT}</div><div style={{fontFamily:T.font,fontSize:12,color:"rgba(255,255,255,0.55)",marginTop:4}}>{W.ex.length} exercises</div></div>
                  <button onClick={()=>{updDL({gymDone:!tDL.gymDone});if(!tDL.gymDone)setCelebrate(true);}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"12px 16px",borderRadius:T.r,border:"none",cursor:"pointer",background:tDL.gymDone?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.15)"}}><Ic name="check" size={22} color={tDL.gymDone?T.blue2:"#fff"} stroke={2.5}/><div style={{fontFamily:T.font,fontSize:9,fontWeight:700,color:tDL.gymDone?T.blue2:"rgba(255,255,255,0.75)",letterSpacing:1}}>DONE</div></button>
                </div>
                <div style={{margin:"0 16px 12px"}}><Card style={{padding:"14px 16px",borderLeft:"3px solid "+T.amber}}><div style={{fontFamily:T.font,fontSize:10,fontWeight:700,color:T.amber,letterSpacing:1.5,marginBottom:4}}>WARM UP</div><div style={{fontFamily:T.fontAr,fontSize:14,color:T.sub}}>{ar?W.arW:W.enW}</div></Card></div>
                {W.ex.map((ex,ei)=>{
                  const exLog=tWLd[ei]||{sets:[]};
                  const doneSets=exLog.sets.filter(s=>s.done).length;
                  const lastBest=getLastBest(selDay,ei);
                  return(
                    <div key={ei} style={{margin:"0 16px 12px"}}>
                      <Card>
                        <ExImg ex={ex} done={doneSets>=ex.sets} ar={ar}/>
                        <div style={{padding:"8px 16px",background:T.bg,display:"flex",alignItems:"center",gap:8}}>
                          <Ic name="bolt" size={12} color={T.amber} stroke={2}/>
                          <div style={{fontFamily:T.fontAr,fontSize:12,color:T.muted,flex:1}}>{ex.sets} sets × {ex.reps} · {ex.rest}s rest</div>
                          <button onClick={()=>setSwapEx({ex,ei,day:selDay})} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",background:T.s2,border:"1px solid "+T.border,borderRadius:20,color:T.muted,fontFamily:T.font,fontSize:11,cursor:"pointer"}}><Ic name="swap" size={11} color={T.muted} stroke={2}/> Swap</button>
                        </div>
                        {lastBest&&(<div style={{padding:"8px 16px",background:T.blue2+"10",borderBottom:"1px solid "+T.border,display:"flex",alignItems:"center",gap:12}}><div style={{fontFamily:T.font,fontSize:11,color:T.muted}}>{ll.lastWeekLabel}: <span style={{color:T.text,fontWeight:600}}>{lastBest.kg}kg × {lastBest.reps}</span></div><div style={{fontFamily:T.font,fontSize:11,color:T.blue2,fontWeight:700}}>{ll.suggestedLabel}: {(parseFloat(lastBest.kg)+2.5).toFixed(1)}kg</div></div>)}
                        <div style={{padding:"12px 16px 16px"}}>
                          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,paddingBottom:8,borderBottom:"1px solid "+T.border}}>
                            <div style={{width:28,flexShrink:0}}/><div style={{width:40,fontFamily:T.font,fontSize:9,fontWeight:700,color:T.muted,textAlign:"center",letterSpacing:1}}>TARGET</div><div style={{flex:1,fontFamily:T.font,fontSize:9,fontWeight:700,color:T.muted,textAlign:"center",letterSpacing:1}}>KG</div><div style={{flex:1,fontFamily:T.font,fontSize:9,fontWeight:700,color:T.muted,textAlign:"center",letterSpacing:1}}>REPS</div><div style={{width:42,flexShrink:0}}/>
                          </div>
                          {Array.from({length:ex.sets},(_,si)=>{
                            const s=(exLog.sets&&exLog.sets[si])||{kg:"",reps:"",done:false};
                            return(
                              <div key={si} style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,opacity:s.done?0.45:1}}>
                                <div style={{width:28,height:28,borderRadius:"50%",background:s.done?T.blue2+"20":T.bg,border:"1px solid "+(s.done?T.blue2:T.border),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontFamily:T.font,fontSize:12,fontWeight:700,color:s.done?T.blue2:T.muted}}>{si+1}</span></div>
                                <div style={{width:40,fontFamily:T.font,fontSize:12,color:T.muted,textAlign:"center",flexShrink:0}}>{ex.reps}</div>
                                <input type="number" inputMode="decimal" placeholder="0" defaultValue={s.kg} key={"kg"+selDay+ei+si+s.kg} onBlur={e=>{if(e.target.value!==String(s.kg))updWL(selDay,ei,si,{kg:e.target.value});}} style={{flex:1,padding:"11px 4px",textAlign:"center",background:T.bg,border:"1px solid "+(s.done?T.blue2:T.border),borderRadius:T.rs,color:T.text,fontSize:17,fontWeight:700,fontFamily:T.font,outline:"none"}}/>
                                <input type="number" inputMode="numeric" placeholder="0" defaultValue={s.reps} key={"rp"+selDay+ei+si+s.reps} onBlur={e=>{if(e.target.value!==String(s.reps))updWL(selDay,ei,si,{reps:e.target.value});}} style={{flex:1,padding:"11px 4px",textAlign:"center",background:T.bg,border:"1px solid "+(s.done?T.blue2:T.border),borderRadius:T.rs,color:T.text,fontSize:17,fontWeight:700,fontFamily:T.font,outline:"none"}}/>
                                <button onClick={()=>{updWL(selDay,ei,si,{done:!s.done});if(!s.done)setRt(true);}} style={{width:42,height:42,border:"1px solid "+(s.done?T.blue2:T.border),borderRadius:"50%",cursor:"pointer",background:s.done?T.blue2:T.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic name="check" size={16} color={s.done?"#fff":T.muted} stroke={s.done?2.5:1.5}/></button>
                              </div>
                            );
                          })}
                        </div>
                      </Card>
                    </div>
                  );
                })}
                <div style={{margin:"0 16px 20px"}}><Card style={{padding:"14px 16px",borderLeft:"3px solid "+T.green}}><div style={{fontFamily:T.font,fontSize:10,fontWeight:700,color:T.green,letterSpacing:1.5,marginBottom:4}}>COOL DOWN</div><div style={{fontFamily:T.fontAr,fontSize:14,color:T.sub}}>{ar?W.arC:W.enC}</div></Card></div>
              </div>
            )}
          </div>
        )}
        {tab==="schedule"&&(
          <div style={{padding:"0 16px"}}>
            <div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1.5,marginBottom:14}}>SET WEEKLY PLAN</div>
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day=>{
              const asgn=ws[day];
              return(
                <Card key={day} style={{marginBottom:8,padding:"14px 16px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:44,height:44,borderRadius:"50%",background:asgn?asgn.color+"20":T.bg,display:"flex",alignItems:"center",justifyContent:"center",border:"1.5px solid "+(asgn?asgn.color:T.border),flexShrink:0}}>
                      {asgn?<Ic name={asgn.icon} size={18} color={asgn.color} stroke={2}/>:<div style={{width:14,height:2,background:T.border,borderRadius:1}}/>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:T.font,fontSize:15,fontWeight:600,color:T.text,marginBottom:6}}>{day}</div>
                      <select value={asgn?asgn.id:""} onChange={e=>{const val=e.target.value;if(!val){const n={...ws};delete n[day];setWs(n);sSet("ws1",n);}else{const act=ACTS.find(a=>a.id===val);if(act){const n={...ws,[day]:act};setWs(n);sSet("ws1",n);}}}}
                        style={{width:"100%",padding:"8px 12px",background:T.bg,border:"1px solid "+(asgn?asgn.color:T.border),borderRadius:T.rs,color:asgn?asgn.color:T.muted,fontFamily:T.font,fontSize:14,fontWeight:600,outline:"none",cursor:"pointer"}}>
                        <option value="">-- Not set --</option>
                        {ACTS.map(act=><option key={act.id} value={act.id}>{ar?act.ar:act.en}</option>)}
                      </select>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
        {swapEx&&(<div style={{position:"fixed",inset:0,zIndex:500,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}><div onClick={()=>setSwapEx(null)} style={{position:"absolute",inset:0,background:"rgba(12,26,46,0.6)"}}/><div style={{position:"relative",background:T.s1,borderRadius:"24px 24px 0 0",padding:"20px 20px 52px",border:"1px solid "+T.border}}><div style={{width:36,height:4,background:T.s2,borderRadius:2,margin:"0 auto 20px"}}/><div style={{fontFamily:T.font,fontSize:18,fontWeight:700,color:T.text,marginBottom:4}}>{ll.alternatives}</div><div style={{fontFamily:T.fontAr,fontSize:13,color:T.muted,marginBottom:20}}>Replacing: {swapEx.ex.en}</div>{(swapEx.ex.swaps||[]).map((alt,i)=>(<div key={i} onClick={()=>setSwapEx(null)} style={{background:T.bg,borderRadius:T.r,padding:"14px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer",border:"1px solid "+T.border}}><div style={{width:36,height:36,borderRadius:T.rs,background:T.blue2+"20",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="dumbbell" size={16} color={T.blue2} stroke={2}/></div><div style={{fontFamily:T.fontAr,fontSize:15,color:T.text,flex:1}}>{alt}</div><Ic name="chev" size={16} color={T.muted} stroke={2}/></div>))}</div></div>)}
      </div>
    );
  }

  function MealsScr(){
    const[selMD,setSelMD]=useState(today);
    const dSc=ws[selMD]||ws[["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date(selMD).getDay()]];
    const mType=dSc?dSc.id:"rest";
    const mMeals=getMeals(mType);
    const mColor=dSc?dSc.color:T.muted;
    const isT=selMD===today;
    const dTDL=isT?tDL:(dl[selMD]||{});
    const eatenKcal=(dTDL.mealsEaten||[]).reduce((a,i)=>a+(mMeals[i]&&mMeals[i].kcal||0),0);
    const last7=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return d.toISOString().slice(0,10);});
    const DNAMES=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return(
      <div>
        <div style={{padding:"20px 20px 0"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{fontFamily:T.font,fontSize:28,fontWeight:800,color:T.text}}>{ll.meals}</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <div style={{padding:"5px 14px",borderRadius:20,background:mColor+"15",border:"1px solid "+mColor+"30"}}><div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:mColor}}>{mType==="gym"?ll.gymDay:["cardio","walk"].includes(mType)?ll.cardioDay:ll.restDay}</div></div>
              <button onClick={()=>setShowScanner(true)} style={{width:36,height:36,borderRadius:"50%",border:"none",background:T.blue2+"15",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="camera" size={17} color={T.blue2} stroke={2}/></button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
            {[{l:"KCAL",v:String(mMeals.reduce((a,m)=>a+m.kcal,0)),c:T.red},{l:"PRO",v:mMeals.reduce((a,m)=>a+(m.p||0),0)+"g",c:T.green},{l:"CARB",v:mMeals.reduce((a,m)=>a+(m.cb||0),0)+"g",c:T.blue2},{l:"FAT",v:mMeals.reduce((a,m)=>a+(m.f||0),0)+"g",c:T.amber}].map((m,i)=>(<Card key={i} style={{padding:"10px 6px",textAlign:"center",background:T.bg}}><div style={{fontFamily:T.font,fontSize:16,fontWeight:800,color:m.c}}>{m.v}</div><div style={{fontFamily:T.font,fontSize:9,fontWeight:700,color:T.muted,letterSpacing:1,marginTop:2}}>{m.l}</div></Card>))}
          </div>
          <div style={{display:"flex",overflowX:"auto",scrollbarWidth:"none",gap:6,paddingBottom:14}}>
            {last7.map(d=>{const isToday=d===today,isSel=selMD===d,dn=DNAMES[new Date(d).getDay()],dd=new Date(d).getDate();return(<button key={d} onClick={()=>setSelMD(d)} style={{flexShrink:0,minWidth:48,padding:"8px 4px",border:"1px solid "+(isSel?T.blue2:T.border),borderRadius:T.r,background:isSel?T.blue2:T.s1,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><div style={{fontFamily:T.font,fontSize:10,color:isSel?"rgba(255,255,255,0.7)":T.muted}}>{dn}</div><div style={{fontFamily:T.font,fontSize:16,fontWeight:700,color:isSel?"#fff":T.text}}>{dd}</div>{isToday&&<div style={{width:5,height:5,borderRadius:"50%",background:isSel?"#fff":T.red}}/>}</button>);})}
          </div>
        </div>
        {isT&&(<div style={{padding:"0 16px 10px"}}><Card style={{padding:"12px 16px",background:T.bg}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div style={{fontFamily:T.fontAr,fontSize:13,color:T.muted}}>{(dTDL.mealsEaten||[]).length} of {mMeals.length} eaten</div><div style={{fontFamily:T.font,fontSize:14,fontWeight:700,color:T.green}}>{eatenKcal} kcal</div></div><div style={{height:5,background:T.s2,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",background:"linear-gradient(90deg,"+T.blue2+","+T.blue4+")",borderRadius:3,width:((dTDL.mealsEaten||[]).length/mMeals.length*100)+"%",transition:"width 0.4s"}}/></div></Card></div>)}
        <div style={{padding:"0 16px 8px"}}>
          {mMeals.map((meal,i)=>{
            const eaten=(dTDL.mealsEaten||[]).includes(i);
            const canEdit=selMD<=today;
            return(
              <Card key={i} style={{marginBottom:10}}>
                <div style={{display:"flex",alignItems:"stretch"}}>
                  <div onClick={()=>setActMeal(actMeal===i?null:i)} style={{flex:1,padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{flexShrink:0}}><div style={{fontFamily:T.font,fontSize:10,color:T.muted}}>{ar?meal.timeAr:meal.time}</div><div style={{fontFamily:T.font,fontSize:9,fontWeight:700,color:T.blue2,letterSpacing:1.5,marginTop:2}}>{meal.tag}</div></div>
                    <div style={{flex:1}}><div style={{fontFamily:T.fontAr,fontSize:16,fontWeight:600,color:eaten?T.muted:T.text,textDecoration:eaten?"line-through":"none"}}>{ar?meal.ar:meal.en}</div></div>
                    <div style={{fontFamily:T.font,fontSize:18,fontWeight:800,color:eaten?T.muted:T.text}}>{meal.kcal}<span style={{fontSize:10,color:T.muted}}>kcal</span></div>
                  </div>
                  {canEdit&&(<button onClick={()=>{const key=selMD;const prev=(dl[key]&&dl[key].mealsEaten)||[];const updated=eaten?prev.filter(x=>x!==i):[...prev,i];const n={...dl,[key]:{...(dl[key]||{}),mealsEaten:updated}};setDl(n);sSet("dl3",n);showFlash();}} style={{width:56,border:"none",cursor:"pointer",background:eaten?T.blue2+"20":T.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,borderRadius:"0 "+T.rXl+" "+T.rXl+" 0"}}><Ic name="check" size={20} color={eaten?T.blue2:T.muted} stroke={2.5}/></button>)}
                </div>
                {actMeal===i&&(<div style={{padding:"10px 16px 16px",borderTop:"1px solid "+T.border}}>{(ar?meal.iAr:meal.iEn).map((item,j)=>(<div key={j} style={{fontFamily:T.fontAr,fontSize:13,color:T.sub,padding:"5px 0",borderBottom:j<meal.iEn.length-1?"1px solid "+T.border+"66":"none"}}>{"- "+item}</div>))}</div>)}
              </Card>
            );
          })}
        </div>

        {/* ── DAILY NUTRITION LOG ─────────────────────── */}
        {(()=>{
          const scanned=tDL.scannedMeals||[];
          const calGoal=getCalGoal(dayType);
          const totalScannedCal=scanned.reduce((a,m)=>a+(m.calories||0),0);
          const totalScannedPro=scanned.reduce((a,m)=>a+(m.protein||0),0);
          const totalScannedCarb=scanned.reduce((a,m)=>a+(m.carbs||0),0);
          const totalScannedFat=scanned.reduce((a,m)=>a+(m.fat||0),0);
          const mealPlanCal=(dTDL.mealsEaten||[]).reduce((a,i)=>a+(mMeals[i]&&mMeals[i].kcal||0),0);
          const totalCal=totalScannedCal+mealPlanCal;
          const pct=Math.min(totalCal/calGoal*100,100);
          const remaining=calGoal-totalCal;
          if(scanned.length===0&&(dTDL.mealsEaten||[]).length===0)return null;
          return(
            <div style={{padding:"0 16px 16px"}}>
              <Card style={{padding:"16px"}}>
                {/* Header */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                  <div style={{fontFamily:T.font,fontSize:15,fontWeight:700,color:T.text}}>Daily Nutrition</div>
                  <div style={{fontFamily:T.font,fontSize:12,color:T.muted}}>{isT?"Today":selMD.slice(5)}</div>
                </div>
                {/* Calorie progress */}
                <div style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <div style={{fontFamily:T.font,fontSize:13,color:T.muted}}>Calories</div>
                    <div style={{fontFamily:T.font,fontSize:13,fontWeight:700,color:remaining>=0?T.blue2:T.red}}>
                      {totalCal} / {calGoal} kcal
                    </div>
                  </div>
                  <div style={{height:8,background:T.s2,borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",background:pct>=100?"linear-gradient(90deg,"+T.red+","+T.amber+")":"linear-gradient(90deg,"+T.blue2+","+T.blue4+")",borderRadius:4,width:pct+"%",transition:"width 0.5s"}}/>
                  </div>
                  <div style={{fontFamily:T.font,fontSize:12,color:remaining>=0?T.green:T.red,marginTop:4,fontWeight:600}}>
                    {remaining>=0?""+remaining+" kcal remaining":""+Math.abs(remaining)+" kcal over goal"}
                  </div>
                </div>
                {/* Macros row */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                  {[{l:"Protein",v:totalScannedPro+(dTDL.mealsEaten||[]).reduce((a,i)=>a+(mMeals[i]&&mMeals[i].p||0),0),unit:"g",c:T.green},{l:"Carbs",v:totalScannedCarb+(dTDL.mealsEaten||[]).reduce((a,i)=>a+(mMeals[i]&&mMeals[i].cb||0),0),unit:"g",c:T.blue2},{l:"Fat",v:totalScannedFat+(dTDL.mealsEaten||[]).reduce((a,i)=>a+(mMeals[i]&&mMeals[i].f||0),0),unit:"g",c:T.amber}].map((m,i)=>(
                    <div key={i} style={{background:T.bg,borderRadius:T.r,padding:"10px",textAlign:"center",border:"1px solid "+T.border}}>
                      <div style={{fontFamily:T.font,fontSize:18,fontWeight:800,color:m.c}}>{m.v}{m.unit}</div>
                      <div style={{fontFamily:T.font,fontSize:10,color:T.muted,marginTop:2}}>{m.l}</div>
                    </div>
                  ))}
                </div>
                {/* Scanned meals log */}
                {scanned.length>0&&(
                  <div>
                    <div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1.5,marginBottom:10}}>SCANNED MEALS</div>
                    {scanned.map((m,i)=>(
                      <div key={m.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<scanned.length-1?"1px solid "+T.border:"none"}}>
                        <div style={{width:36,height:36,borderRadius:10,background:T.blue2+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <Ic name="camera" size={16} color={T.blue2} stroke={2}/>
                        </div>
                        <div style={{flex:1}}>
                          <div style={{fontFamily:T.fontAr,fontSize:14,fontWeight:600,color:T.text}}>{m.name}</div>
                          <div style={{fontFamily:T.font,fontSize:11,color:T.muted,marginTop:2}}>{m.time} · {m.protein}g protein · {m.carbs}g carbs</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontFamily:T.font,fontSize:15,fontWeight:700,color:T.blue2}}>{m.calories}</div>
                          <div style={{fontFamily:T.font,fontSize:10,color:T.muted}}>kcal</div>
                        </div>
                        <button onClick={()=>{const n={...dl,[today]:{...(dl[today]||{}),scannedMeals:scanned.filter((_,j)=>j!==i)}};setDl(n);sSet("dl3",n);}} style={{width:28,height:28,borderRadius:"50%",border:"none",background:T.red+"15",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <Ic name="x" size={12} color={T.red} stroke={2}/>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          );
        })()}
      </div>
    );
  }

  function TrackScr(){
    const[tTab,setTTab]=useState("log");
    const[expanded,setExpanded]=useState([0]);
    const DS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const groupByWeek=()=>{const all=Object.keys(dl).sort((a,b)=>b.localeCompare(a));if(!all.length)return[];const weeks=[];let cur=null;all.forEach(date=>{const ws2=getWeekStart(date);const wk=ws2.toISOString().slice(0,10);if(!cur||cur.key!==wk){const now=getWeekStart(new Date());const diff=Math.round((now.getTime()-ws2.getTime())/(7*24*3600*1000));cur={key:wk,label:diff===0?ll.thisWeek:diff===1?ll.lastWeek:diff+" "+ll.weeksAgo,isNow:diff===0,dates:[]};weeks.push(cur);}cur.dates.push(date);});return weeks;};
    const weeks=groupByWeek();
    const tog=i=>setExpanded(p=>p.includes(i)?p.filter(x=>x!==i):[...p,i]);
    const calcScore=()=>{const now=new Date();const weekStart=getWeekStart(now);const passed=[];for(let i=0;i<7;i++){const d=new Date(weekStart);d.setDate(weekStart.getDate()+i);if(d<=now)passed.push(d.toISOString().slice(0,10));}if(!passed.length)return 0;const logs=passed.map(d=>dl[d]||{});const gymDays=logs.filter(l=>l.gymDone).length;const totalMeals=logs.reduce((a,l)=>a+(l.mealsEaten||[]).length,0);const maxMeals=passed.length*6;const avgW=logs.filter(l=>l.water>0).length?(logs.reduce((a,l)=>a+(l.water||0),0)/logs.filter(l=>l.water>0).length*250/1000):0;const avgS=logs.filter(l=>l.sleep>0).length?(logs.reduce((a,l)=>a+(l.sleep||0),0)/logs.filter(l=>l.sleep>0).length):0;const gymMax=Math.min(passed.length,4);return Math.round((gymDays/Math.max(gymMax,1))*40+(totalMeals/Math.max(maxMeals,1))*30+(Math.min(avgW,3)/3)*15+(Math.min(avgS,8)/8)*15);};
    const score=calcScore();
    function DayRow({date,log}){const tags=[];if(log.gymDone)tags.push({l:"GYM",c:T.blue2});if(log.water>0)tags.push({l:((log.water*250/1000).toFixed(1))+"L",c:T.blue3});if(log.sleep)tags.push({l:log.sleep+"h",c:T.purple});if((log.mealsEaten||[]).length>0)tags.push({l:log.mealsEaten.length+" meals",c:T.green});habits.filter(h=>hl[date]&&hl[date][h.id]&&hl[date][h.id]>=(h.timesPerDay||1)).forEach(h=>tags.push({l:h.name,c:h.color}));return(<div style={{padding:"10px 16px",borderBottom:"1px solid "+T.border}}><div style={{display:"flex",alignItems:"flex-start",gap:12}}><div style={{width:36,flexShrink:0,textAlign:"center"}}><div style={{fontFamily:T.font,fontSize:18,fontWeight:800,color:T.text,lineHeight:1}}>{new Date(date).getDate()}</div><div style={{fontFamily:T.font,fontSize:10,color:T.muted}}>{DS[new Date(date).getDay()]}</div></div><div style={{flex:1,display:"flex",flexWrap:"wrap",gap:6}}>{tags.length>0?tags.map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:4,background:t.c+"15",padding:"4px 10px",borderRadius:20,border:"1px solid "+t.c+"20"}}><div style={{width:6,height:6,borderRadius:"50%",background:t.c,flexShrink:0}}/><span style={{fontFamily:T.font,fontSize:11,fontWeight:600,color:t.c}}>{t.l}</span></div>)):<span style={{fontFamily:T.font,fontSize:12,color:T.muted}}>No data</span>}</div></div></div>);}
    function GymCalendar(){const now=new Date(),year=now.getFullYear(),month=now.getMonth();const firstDay=new Date(year,month,1).getDay();const daysInMonth=new Date(year,month+1,0).getDate();const mName=["January","February","March","April","May","June","July","August","September","October","November","December"][month];const cells=[];for(let i=0;i<(firstDay===0?6:firstDay-1);i++)cells.push(null);for(let d=1;d<=daysInMonth;d++)cells.push(d);return(<Card style={{padding:"16px",marginBottom:12}}><div style={{fontFamily:T.font,fontSize:15,fontWeight:700,color:T.text,marginBottom:14,textAlign:"center"}}>{mName} {year}</div><div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:8}}>{["M","T","W","T","F","S","S"].map((d,i)=>(<div key={i} style={{textAlign:"center",fontFamily:T.font,fontSize:10,fontWeight:600,color:T.muted,padding:"4px 0"}}>{d}</div>))}</div><div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>{cells.map((d,i)=>{if(!d)return<div key={i}/>;const dateStr=year+"-"+String(month+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");const log=dl[dateStr]||{};const isToday=dateStr===today;const bg=log.gymDone?T.blue2:log.sleep||log.water?T.blue4+"66":isToday?T.s2:"transparent";return(<div key={i} style={{aspectRatio:"1",borderRadius:8,background:bg,border:isToday?"2px solid "+T.blue2:"1px solid transparent",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:T.font,fontSize:11,fontWeight:isToday?700:400,color:log.gymDone?"#fff":isToday?T.blue2:T.muted}}>{d}</span></div>);})}</div><div style={{display:"flex",gap:12,marginTop:12,justifyContent:"center"}}>{[{color:T.blue2,label:"Gym"},{color:T.blue4,label:"Logged"},{color:T.s2,label:"Today"}].map((l,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:10,borderRadius:3,background:l.color}}/><span style={{fontFamily:T.font,fontSize:10,color:T.muted}}>{l.label}</span></div>))}</div></Card>);}
    return(
      <div>
        <div style={{padding:"20px 20px 0"}}>
          <div style={{fontFamily:T.font,fontSize:28,fontWeight:800,color:T.text,marginBottom:16}}>{ll.trackYourDay}</div>
          <div style={{display:"flex",background:T.s1,borderRadius:T.r,padding:3,marginBottom:16,border:"1px solid "+T.border}}>
            {[{id:"log",label:"Summary"},{id:"weight",label:"Body"},{id:"report",label:"Report"}].map(t=>(<button key={t.id} onClick={()=>setTTab(t.id)} style={{flex:1,padding:"9px",border:"none",borderRadius:10,background:tTab===t.id?T.blue2:"transparent",color:tTab===t.id?"#fff":T.muted,fontFamily:T.fontAr,fontSize:13,fontWeight:tTab===t.id?700:400,cursor:"pointer",transition:"all 0.2s"}}>{t.label}</button>))}
          </div>
        </div>
        {tTab==="log"&&(<div style={{padding:"0 16px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
            {[{label:ll.daysLogged,val:Object.keys(dl).length,c:T.blue2},{label:ll.totalHabits,val:habits.length,c:T.purple},{label:ll.totalWorkouts,val:Object.values(dl).filter(d=>d.gymDone).length,c:T.green}].map((s,i)=>(<Card key={i} style={{padding:"16px 10px",textAlign:"center"}}><div style={{fontFamily:T.font,fontSize:30,fontWeight:800,color:s.c}}>{s.val}</div><div style={{fontFamily:T.fontAr,fontSize:11,color:T.muted,marginTop:4}}>{s.label}</div></Card>))}
          </div>
          <GymCalendar/>
          {habits.length>0&&(()=>{
            const[hView,setHView]=useState("week");
            return(
            <Card style={{padding:"16px",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1.5}}>HABIT STREAKS</div>
                <div style={{display:"flex",background:T.bg,borderRadius:20,padding:2,border:"1px solid "+T.border}}>
                  {[{id:"week",label:"7 Days"},{id:"month",label:"30 Days"},{id:"all",label:"All Time"}].map(v=>(
                    <button key={v.id} onClick={()=>setHView(v.id)} style={{padding:"4px 10px",border:"none",borderRadius:18,background:hView===v.id?T.blue2:"transparent",color:hView===v.id?"#fff":T.muted,fontFamily:T.font,fontSize:10,fontWeight:hView===v.id?700:400,cursor:"pointer"}}>{v.label}</button>
                  ))}
                </div>
              </div>
              {habits.map(h=>{
                const days=hView==="week"?7:hView==="month"?30:90;
                const arr=Array.from({length:days},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(days-1)+i);const key=d.toISOString().slice(0,10);return{complete:(hl[key]&&hl[key][h.id]&&hl[key][h.id]>=(h.timesPerDay||1))||false,day:DS[d.getDay()],date:key};});
                const total=arr.filter(d=>d.complete).length;
                const pct=Math.round(total/days*100);
                // Calculate current streak
                let streak=0;
                for(let i=arr.length-1;i>=0;i--){if(arr[i].complete)streak++;else break;}
                // Best streak
                let best=0,cur=0;
                arr.forEach(d=>{if(d.complete){cur++;best=Math.max(best,cur);}else cur=0;});
                return(
                  <div key={h.id} style={{marginBottom:16,paddingBottom:16,borderBottom:"1px solid "+T.border}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:10,height:10,borderRadius:"50%",background:h.color}}/>
                        <div style={{fontFamily:T.fontAr,fontSize:14,fontWeight:600,color:T.text}}>{h.name}</div>
                      </div>
                      <div style={{display:"flex",gap:10}}>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontFamily:T.font,fontSize:14,fontWeight:700,color:h.color}}>{streak}</div>
                          <div style={{fontFamily:T.font,fontSize:9,color:T.muted}}>STREAK</div>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontFamily:T.font,fontSize:14,fontWeight:700,color:T.blue2}}>{best}</div>
                          <div style={{fontFamily:T.font,fontSize:9,color:T.muted}}>BEST</div>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontFamily:T.font,fontSize:14,fontWeight:700,color:pct>=70?T.green:pct>=40?T.amber:T.red}}>{pct}%</div>
                          <div style={{fontFamily:T.font,fontSize:9,color:T.muted}}>RATE</div>
                        </div>
                      </div>
                    </div>
                    {hView==="week"&&(
                      <div style={{display:"flex",gap:4}}>
                        {arr.map((d,i)=>(
                          <div key={i} style={{flex:1,textAlign:"center"}}>
                            <div style={{aspectRatio:"1",borderRadius:6,background:d.complete?h.color:T.bg,border:"1px solid "+(d.complete?h.color:T.border),display:"flex",alignItems:"center",justifyContent:"center",marginBottom:3}}>
                              {d.complete&&<Ic name="check" size={9} color="#fff" stroke={3}/>}
                            </div>
                            <div style={{fontFamily:T.font,fontSize:9,color:T.muted}}>{d.day}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {hView==="month"&&(
                      <div style={{display:"grid",gridTemplateColumns:"repeat(10,1fr)",gap:3}}>
                        {arr.map((d,i)=>(
                          <div key={i} style={{aspectRatio:"1",borderRadius:4,background:d.complete?h.color:T.bg,border:"1px solid "+(d.complete?h.color+"60":T.border)}}/>
                        ))}
                      </div>
                    )}
                    {hView==="all"&&(
                      <div style={{display:"grid",gridTemplateColumns:"repeat(13,1fr)",gap:2}}>
                        {arr.map((d,i)=>(
                          <div key={i} style={{aspectRatio:"1",borderRadius:3,background:d.complete?h.color:T.bg,border:"1px solid "+(d.complete?h.color+"60":T.border)}}/>
                        ))}
                      </div>
                    )}
                    <div style={{height:4,background:T.s2,borderRadius:2,marginTop:8,overflow:"hidden"}}>
                      <div style={{height:"100%",background:h.color,borderRadius:2,width:pct+"%",transition:"width 0.5s"}}/>
                    </div>
                  </div>
                );
              })}
            </Card>
          );})()}
          {weeks.length===0&&<div style={{padding:"48px 20px",textAlign:"center"}}><div style={{fontFamily:T.fontAr,fontSize:17,color:T.muted}}>{ll.noData}</div></div>}
          {weeks.map((week,wi)=>{const isExp=expanded.includes(wi);const dWater=week.dates.filter(d=>dl[d]&&dl[d].water>0);const avgW=dWater.length?(dWater.reduce((a,d)=>a+(dl[d].water||0),0)/dWater.length*250/1000).toFixed(1):null;return(<Card key={week.key} style={{marginBottom:10}}><div onClick={()=>tog(wi)} style={{padding:"16px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}><div><div style={{fontFamily:T.fontAr,fontSize:17,fontWeight:600,color:week.isNow?T.blue2:T.text}}>{week.label}</div><div style={{fontFamily:T.font,fontSize:12,color:T.muted,marginTop:2}}>{week.dates.length+" days"+(avgW?" · avg "+avgW+"L":"")}</div></div><div style={{display:"flex",alignItems:"center",gap:8}}>{week.isNow&&<div style={{fontFamily:T.font,fontSize:10,color:T.blue2,fontWeight:700,background:T.blue2+"15",padding:"3px 10px",borderRadius:20}}>NOW</div>}<div style={{transform:"rotate("+(isExp?90:0)+"deg)",transition:"transform 0.2s"}}><Ic name="chev" size={18} color={T.muted} stroke={2}/></div></div></div>{isExp&&week.dates.map(date=><DayRow key={date} date={date} log={dl[date]||{}}/>)}</Card>);})}
        </div>)}
        {tTab==="weight"&&<WtTracker dailyLog={dl} onSave={(date,vals)=>{const n={...dl,[date]:{...(dl[date]||{}),...vals}};setDl(n);sSet("dl3",n);showFlash();}} ar={ar}/>}
        {tTab==="report"&&(()=>{const now=new Date();const weekStart=getWeekStart(now);const passed=[];for(let i=0;i<7;i++){const d=new Date(weekStart);d.setDate(weekStart.getDate()+i);if(d<=now)passed.push(d.toISOString().slice(0,10));}const logs=passed.map(d=>dl[d]||{});const gymDays=logs.filter(l=>l.gymDone).length;const avgWater=logs.filter(l=>l.water>0).length?(logs.reduce((a,l)=>a+(l.water||0),0)/logs.filter(l=>l.water>0).length*250/1000).toFixed(1):"--";const avgSleep=logs.filter(l=>l.sleep>0).length?(logs.reduce((a,l)=>a+(l.sleep||0),0)/logs.filter(l=>l.sleep>0).length).toFixed(1):"--";const totalMeals=logs.reduce((a,l)=>a+(l.mealsEaten||[]).length,0);const habitScores=habits.map(h=>{const done=passed.filter(d=>hl[d]&&hl[d][h.id]&&hl[d][h.id]>=(h.timesPerDay||1)).length;return{...h,done,pct:Math.round(done/passed.length*100)};});const weights=Object.entries(dl).filter(([d,v])=>v&&v.weight&&passed.includes(d)).map(([,v])=>parseFloat(v.weight));const prevStart=new Date(weekStart);prevStart.setDate(weekStart.getDate()-7);const prevDays=Array.from({length:7},(_,i)=>{const d=new Date(prevStart);d.setDate(prevStart.getDate()+i);return d.toISOString().slice(0,10);});const prevWeights=Object.entries(dl).filter(([d,v])=>v&&v.weight&&prevDays.includes(d)).map(([,v])=>parseFloat(v.weight));const latestW=weights.length?weights[weights.length-1]:null;const prevW=prevWeights.length?prevWeights[prevWeights.length-1]:null;const wDiff=latestW&&prevW?(latestW-prevW).toFixed(1):null;const msg=score>=80?"Excellent week! Keep the momentum!":score>=60?"Good week. Push harder next week!":score>=40?"Average week. Focus on consistency!":"Tough week. Tomorrow is a fresh start!";return(<div style={{padding:"0 16px 16px",display:"flex",flexDirection:"column",gap:12}}><div style={{background:"linear-gradient(135deg,"+T.blue1+","+T.blue3+")",borderRadius:T.rXl,padding:"28px 20px",textAlign:"center",boxShadow:"0 6px 24px "+T.blue2+"30"}}><div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:2,marginBottom:10}}>WEEKLY SCORE</div><div style={{fontFamily:T.font,fontSize:72,fontWeight:900,color:"#fff",lineHeight:1}}>{score}</div><div style={{fontFamily:T.font,fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:4}}>out of 100 · {passed.length} days tracked</div><div style={{height:8,background:"rgba(255,255,255,0.15)",borderRadius:4,marginTop:16,overflow:"hidden"}}><div style={{height:"100%",background:"#fff",borderRadius:4,width:score+"%",transition:"width 0.8s ease"}}/></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{[{label:"Gym Sessions",val:gymDays+"/"+Math.min(passed.length,4),color:T.blue2,icon:"dumbbell"},{label:"Avg Water",val:avgWater+"L",color:T.blue3,icon:"drop"},{label:"Avg Sleep",val:avgSleep+"h",color:T.purple,icon:"bed"},{label:"Meals Eaten",val:totalMeals,color:T.green,icon:"food"}].map((s,i)=>(<Card key={i} style={{padding:"18px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{width:34,height:34,borderRadius:"50%",background:s.color+"15",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name={s.icon} size={16} color={s.color} stroke={2}/></div><div style={{fontFamily:T.font,fontSize:11,color:T.muted}}>{s.label}</div></div><div style={{fontFamily:T.font,fontSize:30,fontWeight:800,color:s.color}}>{s.val}</div></Card>))}</div>{wDiff&&(<Card style={{padding:"18px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}><div><div style={{fontFamily:T.font,fontSize:13,color:T.muted,marginBottom:4}}>Weight Change</div><div style={{fontFamily:T.font,fontSize:32,fontWeight:800,color:parseFloat(wDiff)>0?T.red:T.green}}>{parseFloat(wDiff)>0?"+ ":"- "}{Math.abs(parseFloat(wDiff))} kg</div><div style={{fontFamily:T.font,fontSize:12,color:T.muted,marginTop:2}}>{prevW} to {latestW} kg</div></div><div style={{fontSize:44}}>{parseFloat(wDiff)>0?"📈":"📉"}</div></Card>)}{habitScores.length>0&&(<Card style={{padding:"18px"}}><div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1.5,marginBottom:14}}>HABIT PERFORMANCE</div>{habitScores.map((h,i)=>(<div key={i} style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:8,height:8,borderRadius:"50%",background:h.color}}/><div style={{fontFamily:T.fontAr,fontSize:14,color:T.text}}>{h.name}</div></div><div style={{fontFamily:T.font,fontSize:14,fontWeight:700,color:h.pct>=70?T.green:h.pct>=40?T.amber:T.red}}>{h.pct}%</div></div><div style={{height:6,background:T.s2,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",background:h.pct>=70?T.green:h.pct>=40?T.amber:T.red,borderRadius:3,width:h.pct+"%",transition:"width 0.5s"}}/></div></div>))}</Card>)}<Card style={{padding:"18px",borderLeft:"3px solid "+T.blue2}}><div style={{fontFamily:T.fontAr,fontSize:16,color:T.text,lineHeight:1.6}}>{score>=80?"🔥 ":score>=60?"💪 ":score>=40?"🎯 ":"⭐ "}{msg}</div></Card></div>);})()}
      </div>
    );
  }

  const NAV=[{s:"today",icon:"home",en:"Today",ar:"اليوم"},{s:"habits",icon:"check",en:"Habits",ar:"عادات"},{s:"workout",icon:"dumbbell",en:"Workout",ar:"تمرين"},{s:"meals",icon:"food",en:"Meals",ar:"وجبات"},{s:"track",icon:"track",en:"Track",ar:"تتبع"}];
  const CHEERS_LIST=["Crushed it Mahmoud!","Session complete! Building something great!","Another day stronger! One day at a time!","Well done! Your future self thanks you!","Nailed it! Consistency is key!"];

  return(
    <div style={{background:T.bg,minHeight:"100vh",color:T.text,fontFamily:T.fontAr,paddingBottom:84}} dir={ar?"rtl":"ltr"}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Cairo:wght@400;500;600;700;900&display=swap" rel="stylesheet"/>
      <style>{"@keyframes spin{to{transform:rotate(360deg)}} @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}"}</style>
      {scr==="today"&&<TodayScr/>}
      {scr==="habits"&&<HabitsScr/>}
      {scr==="workout"&&<WorkoutScr/>}
      {scr==="meals"&&<MealsScr/>}
      {scr==="track"&&<TrackScr/>}
      {flash&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:T.blue2,color:"#fff",fontFamily:T.font,fontSize:11,fontWeight:700,letterSpacing:1.5,padding:"7px 18px",borderRadius:20,zIndex:600,pointerEvents:"none",boxShadow:"0 4px 12px "+T.blue2+"40"}}>SAVED</div>}
      {rt&&<Timer onDone={()=>setRt(false)}/>}
      {celebrate&&(<div style={{position:"fixed",inset:0,zIndex:700,display:"flex",alignItems:"flex-end"}} onClick={()=>setCelebrate(false)}><div style={{position:"absolute",inset:0,background:"rgba(12,26,46,0.6)"}}/><div style={{position:"relative",width:"100%",background:"linear-gradient(135deg,"+T.blue1+","+T.blue2+")",borderRadius:"24px 24px 0 0",padding:"40px 24px 64px",textAlign:"center",animation:"slideUp 0.4s ease"}}><div style={{fontSize:64,marginBottom:16}}>🎉</div><div style={{fontFamily:T.font,fontSize:20,fontWeight:800,color:"#fff",marginBottom:8}}>{CHEERS_LIST[Math.floor(Math.random()*CHEERS_LIST.length)]}</div><div style={{fontFamily:T.font,fontSize:14,color:"rgba(255,255,255,0.65)"}}>Tap to continue</div></div></div>)}
      {showHF&&scr!=="habits"&&<HabitForm habit={editH} onSave={saveH} onClose={()=>{setShowHF(false);setEditH(null);}} ar={ar}/>}
      {showScanner&&<MealScanner onClose={()=>setShowScanner(false)} ar={ar} apiKey={API_KEY} onAddToDay={meal=>{
  const scanned=dl[today]&&dl[today].scannedMeals||[];
  const entry={...meal,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),id:Date.now().toString()};
  const n={...dl,[today]:{...(dl[today]||{}),scannedMeals:[...scanned,entry]}};
  setDl(n);sSet("dl3",n);showFlash();
}}/>}
      {showSettings&&(
        <div style={{position:"fixed",inset:0,zIndex:600,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div onClick={()=>setShowSettings(false)} style={{position:"absolute",inset:0,background:"rgba(12,26,46,0.5)"}}/>
          <div style={{position:"relative",background:T.s1,borderRadius:"24px 24px 0 0",padding:"24px 20px 52px",border:"1px solid "+T.border}}>
            <div style={{width:36,height:4,background:T.s2,borderRadius:2,margin:"0 auto 20px"}}/>
            <div style={{fontFamily:T.font,fontSize:18,fontWeight:700,color:T.text,marginBottom:6}}>Settings</div>
            <div style={{fontFamily:T.font,fontSize:13,color:T.muted,marginBottom:20}}>Paste your Anthropic API Key to enable meal scanning</div>
            <div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.muted,letterSpacing:1,marginBottom:8}}>ANTHROPIC API KEY</div>
            <input
              type="password"
              placeholder="sk-ant-api03-..."
              defaultValue={API_KEY}
              onBlur={e=>{const k=e.target.value.trim();setApiKey(k);if(k)localStorage.setItem("msApiKey",k);else localStorage.removeItem("msApiKey");}}
              style={{width:"100%",padding:"14px",background:T.bg,border:"1px solid "+(API_KEY?T.green:T.border),borderRadius:T.r,color:T.text,fontSize:14,fontFamily:T.font,outline:"none",boxSizing:"border-box",marginBottom:12}}
            />
            {API_KEY?(
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:16}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:T.green}}/>
                <span style={{fontFamily:T.font,fontSize:13,color:T.green,fontWeight:600}}>API Key saved securely on your device</span>
              </div>
            ):(
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:16}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:T.amber}}/>
                <span style={{fontFamily:T.font,fontSize:13,color:T.amber}}>No key — meal scanning disabled</span>
              </div>
            )}
            <div style={{background:T.blue2+"10",borderRadius:T.r,padding:"12px 14px",marginBottom:20,borderLeft:"3px solid "+T.blue2}}>
              <div style={{fontFamily:T.font,fontSize:11,fontWeight:700,color:T.blue2,marginBottom:4}}>HOW TO GET KEY</div>
              <div style={{fontFamily:T.font,fontSize:12,color:T.sub,lineHeight:1.5}}>1. Go to console.anthropic.com{"
"}2. API Keys → Create Key{"
"}3. Paste it above</div>
            </div>
            <button onClick={()=>setShowSettings(false)} style={{width:"100%",padding:"14px",background:T.blue2,border:"none",borderRadius:T.r,color:"#fff",fontFamily:T.font,fontSize:16,fontWeight:700,cursor:"pointer"}}>Done</button>
          </div>
        </div>
      )}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(239,246,255,0.97)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderTop:"1px solid "+T.border,display:"flex",zIndex:200,paddingBottom:"env(safe-area-inset-bottom,8px)"}}>
        {NAV.map(n=>(<button key={n.s} onClick={()=>setScr(n.s)} style={{flex:1,padding:"10px 2px 8px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}>
          {scr===n.s&&<div style={{position:"absolute",top:0,left:"25%",right:"25%",height:2,background:T.blue2,borderRadius:1}}/>}
          <Ic name={n.icon} size={22} color={scr===n.s?T.blue2:T.muted} stroke={scr===n.s?2:1.5}/>
          <span style={{fontFamily:T.fontAr,fontSize:9,color:scr===n.s?T.blue2:T.muted,fontWeight:scr===n.s?700:400}}>{ar?n.ar:n.en}</span>
        </button>))}
      </div>
    </div>
  );
}
