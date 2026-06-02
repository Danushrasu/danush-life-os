import { useState } from "react";

const FOODS = [
  { name: "Chicken Breast (100g)", protein: 31, carbs: 0, fat: 3.6, calories: 165 },
  { name: "Eggs (1 large)", protein: 6, carbs: 0.6, fat: 5, calories: 72 },
  { name: "Rice (100g cooked)", protein: 2.7, carbs: 28, fat: 0.3, calories: 130 },
  { name: "Roti (1 medium)", protein: 3, carbs: 18, fat: 1, calories: 90 },
  { name: "Dal (100g cooked)", protein: 9, carbs: 20, fat: 0.4, calories: 116 },
  { name: "Whey Protein (1 scoop)", protein: 25, carbs: 3, fat: 1.5, calories: 120 },
  { name: "Banana (1 medium)", protein: 1.3, carbs: 27, fat: 0.4, calories: 105 },
  { name: "Milk (200ml)", protein: 6.8, carbs: 9.6, fat: 6.8, calories: 130 },
  { name: "Greek Yogurt (100g)", protein: 10, carbs: 4, fat: 0.4, calories: 59 },
  { name: "Paneer (100g)", protein: 18, carbs: 1.2, fat: 20, calories: 265 },
  { name: "Oats (100g dry)", protein: 13, carbs: 67, fat: 7, calories: 389 },
  { name: "Sweet Potato (100g)", protein: 1.6, carbs: 20, fat: 0.1, calories: 86 },
  { name: "Almonds (30g)", protein: 6, carbs: 6, fat: 14, calories: 173 },
  { name: "Tuna (100g)", protein: 30, carbs: 0, fat: 1, calories: 132 },
  { name: "Bread (1 slice)", protein: 3, carbs: 15, fat: 1, calories: 79 },
  { name: "Peanut Butter (1 tbsp)", protein: 4, carbs: 3, fat: 8, calories: 94 },
  { name: "Idli (1 piece)", protein: 2, carbs: 12, fat: 0.4, calories: 58 },
  { name: "Dosa (1 medium)", protein: 3, carbs: 26, fat: 3, calories: 133 },
  { name: "Curd (100g)", protein: 3.5, carbs: 4.7, fat: 3.3, calories: 60 },
  { name: "Sambar (100ml)", protein: 3, carbs: 8, fat: 2, calories: 55 },
];

const MUSCLES = ["Chest","Back","Shoulders","Biceps","Triceps","Legs","Glutes","Core","Full Body","Cardio"];
const EXERCISES = {
  Chest: ["Bench Press","Incline Press","Push Ups","Cable Fly","Dumbbell Fly","Decline Press"],
  Back: ["Pull Ups","Deadlift","Bent Over Row","Lat Pulldown","Cable Row","T-Bar Row"],
  Shoulders: ["Overhead Press","Lateral Raise","Front Raise","Face Pull","Arnold Press","Shrugs"],
  Biceps: ["Barbell Curl","Dumbbell Curl","Hammer Curl","Preacher Curl","Cable Curl"],
  Triceps: ["Tricep Dip","Skull Crusher","Cable Pushdown","Close Grip Bench","Overhead Extension"],
  Legs: ["Squat","Leg Press","Lunges","Leg Extension","Leg Curl","Calf Raise"],
  Glutes: ["Hip Thrust","Glute Bridge","Romanian Deadlift","Step Ups","Cable Kickback"],
  Core: ["Plank","Crunches","Russian Twist","Leg Raises","Ab Wheel","Mountain Climbers"],
  "Full Body": ["Burpees","Kettlebell Swing","Clean & Press","Thrusters"],
  Cardio: ["Running","Cycling","Jump Rope","HIIT","Swimming","Stair Climbing"],
};

const TABS = [
  { id:"health",    label:"Health",     icon:"💪", color:"#FF6B35" },
  { id:"career",    label:"Career",     icon:"💼", color:"#3B9EE8" },
  { id:"marketing", label:"Marketing",  icon:"💻", color:"#A855F7" },
  { id:"finance",   label:"Finance",    icon:"💰", color:"#4CAF82" },
  { id:"mental",    label:"Mental",     icon:"🧠", color:"#F59E0B" },
  { id:"digital",   label:"Digital",    icon:"📱", color:"#EC4899" },
  { id:"relation",  label:"Relations",  icon:"❤️",  color:"#EF4444" },
  { id:"life",      label:"Life & XP",  icon:"🏏", color:"#06B6D4" },
];

const todayStr = () => new Date().toISOString().slice(0,10);
const weekStr  = () => { const d=new Date(),day=d.getDay(),diff=d.getDate()-day+(day===0?-6:1); return new Date(new Date().setDate(diff)).toISOString().slice(0,10); };
const monthStr = () => new Date().toISOString().slice(0,7);

function initStore() {
  return {
    health:    { daily:{}, weekly:{} },
    career:    { daily:{}, weekly:{}, monthly:{} },
    marketing: { daily:{}, weekly:{} },
    finance:   { daily:{}, monthly:{}, milestones:{}, emergencyFund:0, portfolio:0 },
    mental:    { daily:{}, weekly:{} },
    digital:   { daily:{}, weekly:{} },
    relation:  { daily:{}, weekly:{} },
    life:      { daily:{}, monthly:{} },
  };
}
function load() { try { return JSON.parse(localStorage.getItem("d30v3"))||initStore(); } catch { return initStore(); } }
function persist(s) { localStorage.setItem("d30v3",JSON.stringify(s)); }

const iStyle = { background:"#111",border:"1.5px solid #2A2A2E",borderRadius:8,color:"#F0EEE9",padding:"9px 11px",fontSize:14,fontFamily:"inherit",outline:"none",width:"100%",boxSizing:"border-box" };

function Inp({label,type="number",value,onChange,placeholder,step,small}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      {label&&<label style={{fontSize:10,color:"#666",textTransform:"uppercase",letterSpacing:1}}>{label}</label>}
      <input type={type} value={value??""} placeholder={placeholder} step={step}
        onChange={e=>onChange(type==="number"?(e.target.value===""?"":Number(e.target.value)):e.target.value)}
        style={{...iStyle,fontSize:small?13:14}} />
    </div>
  );
}

function Sel({label,value,onChange,options}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      {label&&<label style={{fontSize:10,color:"#666",textTransform:"uppercase",letterSpacing:1}}>{label}</label>}
      <select value={value||""} onChange={e=>onChange(e.target.value)} style={{...iStyle,cursor:"pointer"}}>
        <option value="">Select...</option>
        {options.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Toggle({label,value,onChange,color="#4CAF82"}) {
  return (
    <div onClick={()=>onChange(!value)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:value?`${color}15`:"#111",border:`1.5px solid ${value?color+"44":"#2A2A2E"}`,borderRadius:10,padding:"11px 14px",cursor:"pointer",transition:"all 0.2s"}}>
      <span style={{fontSize:13,color:value?"#fff":"#aaa"}}>{label}</span>
      <div style={{width:44,height:24,borderRadius:12,background:value?color:"#2A2A2E",position:"relative",transition:"background 0.2s",flexShrink:0}}>
        <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:value?23:3,transition:"left 0.2s"}} />
      </div>
    </div>
  );
}

function Slider({label,value,onChange,color}) {
  const v=value||5;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <label style={{fontSize:11,color:"#666",textTransform:"uppercase",letterSpacing:1}}>{label}</label>
        <span style={{fontSize:14,fontWeight:700,color}}>{v}/10</span>
      </div>
      <input type="range" min={1} max={10} value={v} onChange={e=>onChange(Number(e.target.value))} style={{accentColor:color,width:"100%"}} />
    </div>
  );
}

function Card({children,color,style:s={}}) {
  return <div style={{background:"#16161A",borderRadius:16,border:`1.5px solid ${color}33`,padding:"18px 20px",boxShadow:`0 0 24px ${color}10`,...s}}>{children}</div>;
}

function SecTitle({children,color}) {
  return <div style={{fontSize:11,fontWeight:700,color,textTransform:"uppercase",letterSpacing:2,marginBottom:12}}>{children}</div>;
}

function StatPill({label,value,color,unit=""}) {
  return (
    <div style={{background:"#111",borderRadius:10,padding:"10px 14px",border:`1px solid ${color}33`}}>
      <div style={{fontSize:10,color:"#666",textTransform:"uppercase",letterSpacing:1}}>{label}</div>
      <div style={{fontSize:19,fontWeight:800,color,marginTop:2}}>{value??""}<span style={{fontSize:11,fontWeight:400,color:"#555"}}>{unit}</span></div>
    </div>
  );
}

function PBar({value,max,color,label}) {
  const pct=Math.min(100,max>0?Math.round((value/max)*100):0);
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontSize:11,color:"#666"}}>{label}</span>
        <span style={{fontSize:11,color,fontWeight:700}}>{value}/{max}</span>
      </div>
      <div style={{background:"#222",borderRadius:99,height:7,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:color,borderRadius:99,transition:"width 0.4s"}} />
      </div>
    </div>
  );
}

function Checklist({title,items,checked,onToggle,color}) {
  const done=items.filter((_,i)=>checked[i]).length;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <SecTitle color={color}>{title}</SecTitle>
        <span style={{fontSize:13,color,fontWeight:700,marginTop:-2}}>{done}/{items.length}</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {items.map((item,i)=>(
          <div key={i} onClick={()=>onToggle(i)} style={{display:"flex",alignItems:"center",gap:10,background:checked[i]?`${color}12`:"#111",border:`1.5px solid ${checked[i]?color+"44":"#2A2A2E"}`,borderRadius:10,padding:"10px 13px",cursor:"pointer",transition:"all 0.15s"}}>
            <div style={{width:20,height:20,borderRadius:6,border:`2px solid ${checked[i]?color:"#444"}`,background:checked[i]?color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {checked[i]&&<span style={{color:"#fff",fontSize:12,fontWeight:900}}>✓</span>}
            </div>
            <span style={{fontSize:13,color:checked[i]?"#777":"#bbb",textDecoration:checked[i]?"line-through":"none"}}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{marginTop:10}}><PBar value={done} max={items.length} color={color} label="Progress" /></div>
    </div>
  );
}

function WaterTracker({glasses,setGlasses,color}) {
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <SecTitle color={color}>💧 Water Intake</SecTitle>
        <span style={{fontSize:13,color,fontWeight:700}}>{glasses}/12 (~{(glasses*0.25).toFixed(1)}L)</span>
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {Array.from({length:12}).map((_,i)=>(
          <button key={i} onClick={()=>setGlasses(i<glasses?i:i+1)}
            style={{width:40,height:40,borderRadius:9,border:"none",cursor:"pointer",fontSize:18,background:i<glasses?`${color}30`:"#1A1A1E",transition:"all 0.15s"}}>
            {i<glasses?"💧":"🫙"}
          </button>
        ))}
      </div>
      <PBar value={glasses} max={12} color={color} label="Daily Goal: 12 glasses = 3L" />
    </div>
  );
}

function NutritionLogger({meals,setMeals,color}) {
  const [showAdd,setShowAdd]=useState(false);
  const [mode,setMode]=useState("preset");
  const [selected,setSelected]=useState("");
  const [qty,setQty]=useState(1);
  const [custom,setCustom]=useState({name:"",protein:"",carbs:"",fat:"",calories:""});

  const totals=meals.reduce((a,m)=>({protein:a.protein+m.protein,carbs:a.carbs+m.carbs,fat:a.fat+m.fat,calories:a.calories+m.calories}),{protein:0,carbs:0,fat:0,calories:0});

  function addMeal() {
    if(mode==="preset") {
      const food=FOODS.find(f=>f.name===selected); if(!food) return;
      setMeals([...meals,{...food,name:food.name+(qty!==1?` ×${qty}`:""),protein:+(food.protein*qty).toFixed(1),carbs:+(food.carbs*qty).toFixed(1),fat:+(food.fat*qty).toFixed(1),calories:+(food.calories*qty).toFixed(0)}]);
    } else {
      if(!custom.name) return;
      setMeals([...meals,{name:custom.name,protein:+custom.protein||0,carbs:+custom.carbs||0,fat:+custom.fat||0,calories:+custom.calories||0}]);
      setCustom({name:"",protein:"",carbs:"",fat:"",calories:""});
    }
    setShowAdd(false); setSelected(""); setQty(1);
  }

  const macros=[
    {label:"Protein",val:Math.round(totals.protein),unit:"g",color:"#FF6B35",goal:150},
    {label:"Carbs",  val:Math.round(totals.carbs),  unit:"g",color:"#3B9EE8",goal:250},
    {label:"Fat",    val:Math.round(totals.fat),    unit:"g",color:"#F59E0B",goal:70},
    {label:"kcal",   val:Math.round(totals.calories),unit:"", color:"#4CAF82",goal:2200},
  ];

  return (
    <div>
      <SecTitle color={color}>🥗 Nutrition & Food Log</SecTitle>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
        {macros.map(m=>(
          <div key={m.label} style={{background:"#111",borderRadius:10,padding:"10px",border:`1px solid ${m.color}33`,textAlign:"center"}}>
            <div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:1}}>{m.label}</div>
            <div style={{fontSize:18,fontWeight:800,color:m.color}}>{m.val}<span style={{fontSize:10}}>{m.unit}</span></div>
            <div style={{fontSize:9,color:"#444"}}>/{m.goal}{m.unit}</div>
            <div style={{background:"#222",borderRadius:99,height:3,marginTop:4,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${Math.min(100,(m.val/m.goal)*100)}%`,background:m.color,borderRadius:99}} />
            </div>
          </div>
        ))}
      </div>

      {meals.length>0&&(
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
          {meals.map((m,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#111",borderRadius:10,padding:"9px 13px",border:"1px solid #222"}}>
              <div>
                <div style={{fontSize:13,color:"#ddd",fontWeight:600}}>{m.name}</div>
                <div style={{fontSize:11,color:"#555"}}>P:{m.protein}g · C:{m.carbs}g · F:{m.fat}g · {m.calories}kcal</div>
              </div>
              <button onClick={()=>setMeals(meals.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:16}}>✕</button>
            </div>
          ))}
        </div>
      )}

      {showAdd?(
        <div style={{background:"#111",borderRadius:12,padding:"14px",border:"1.5px solid #2A2A2E"}}>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            {["preset","custom"].map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"7px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:mode===m?700:400,background:mode===m?color:"#2A2A2E",color:mode===m?"#fff":"#888"}}>
                {m==="preset"?"📋 Quick Add":"✏️ Custom"}
              </button>
            ))}
          </div>
          {mode==="preset"?(
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <Sel value={selected} onChange={setSelected} options={FOODS.map(f=>f.name)} />
              <Inp label="Quantity (servings)" value={qty} onChange={setQty} placeholder="1" step="0.5" />
              {selected&&(()=>{const f=FOODS.find(x=>x.name===selected);return f?<div style={{fontSize:11,color:"#555"}}>Per serving → P:{f.protein}g · C:{f.carbs}g · F:{f.fat}g · {f.calories}kcal</div>:null;})()}
            </div>
          ):(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div style={{gridColumn:"1/-1"}}><Inp label="Food name" type="text" value={custom.name} onChange={v=>setCustom(p=>({...p,name:v}))} placeholder="e.g. Home rice bowl" /></div>
              <Inp label="Protein (g)" value={custom.protein} onChange={v=>setCustom(p=>({...p,protein:v}))} placeholder="10" />
              <Inp label="Carbs (g)" value={custom.carbs} onChange={v=>setCustom(p=>({...p,carbs:v}))} placeholder="30" />
              <Inp label="Fat (g)" value={custom.fat} onChange={v=>setCustom(p=>({...p,fat:v}))} placeholder="5" />
              <Inp label="Calories" value={custom.calories} onChange={v=>setCustom(p=>({...p,calories:v}))} placeholder="200" />
            </div>
          )}
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <button onClick={addMeal} style={{padding:"9px 20px",borderRadius:9,border:"none",background:color,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>Add ✓</button>
            <button onClick={()=>setShowAdd(false)} style={{padding:"9px 16px",borderRadius:9,border:"1px solid #333",background:"transparent",color:"#666",fontSize:13,cursor:"pointer"}}>Cancel</button>
          </div>
        </div>
      ):(
        <button onClick={()=>setShowAdd(true)} style={{width:"100%",padding:"10px",borderRadius:10,border:`1.5px dashed ${color}55`,background:`${color}08`,color,fontSize:13,fontWeight:600,cursor:"pointer"}}>+ Add Food / Meal</button>
      )}
    </div>
  );
}

function WorkoutLogger({workouts,setWorkouts,color}) {
  const [showAdd,setShowAdd]=useState(false);
  const [muscle,setMuscle]=useState("");
  const [exercise,setExercise]=useState("");
  const [sets,setSets]=useState([{reps:"",weight:""}]);

  function addExercise() {
    if(!muscle||!exercise) return;
    const volume=sets.reduce((a,s)=>a+(Number(s.reps)*Number(s.weight||0)),0);
    setWorkouts([...workouts,{muscle,exercise,sets:sets.filter(s=>s.reps),volume:Math.round(volume)}]);
    setShowAdd(false); setMuscle(""); setExercise(""); setSets([{reps:"",weight:""}]);
  }

  const totalVol=workouts.reduce((a,w)=>a+w.volume,0);
  const musclesHit=[...new Set(workouts.map(w=>w.muscle))];

  return (
    <div>
      <SecTitle color={color}>🏋️ Workout Log</SecTitle>
      {musclesHit.length>0&&(
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
          {musclesHit.map(m=><span key={m} style={{padding:"4px 10px",borderRadius:99,background:`${color}22`,color,fontSize:11,fontWeight:700}}>{m}</span>)}
          <span style={{padding:"4px 10px",borderRadius:99,background:"#2A2A2E",color:"#888",fontSize:11}}>Vol: {totalVol}kg</span>
        </div>
      )}
      {workouts.map((w,i)=>(
        <div key={i} style={{background:"#111",borderRadius:12,padding:"12px 14px",border:"1px solid #222",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <div><span style={{fontSize:12,color,fontWeight:700}}>{w.muscle}</span><span style={{fontSize:14,color:"#ddd",fontWeight:600,marginLeft:8}}>{w.exercise}</span></div>
            <button onClick={()=>setWorkouts(workouts.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:"#555",cursor:"pointer"}}>✕</button>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {w.sets.map((s,j)=><span key={j} style={{fontSize:12,background:"#1E1E22",borderRadius:6,padding:"3px 9px",color:"#aaa"}}>Set {j+1}: {s.reps} reps{s.weight?` @ ${s.weight}kg`:""}</span>)}
          </div>
          {w.volume>0&&<div style={{fontSize:11,color:"#555",marginTop:4}}>Total Volume: {w.volume}kg</div>}
        </div>
      ))}
      {showAdd?(
        <div style={{background:"#111",borderRadius:12,padding:"14px",border:"1.5px solid #2A2A2E"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            <Sel label="Muscle Group" value={muscle} onChange={m=>{setMuscle(m);setExercise("");}} options={MUSCLES} />
            <Sel label="Exercise" value={exercise} onChange={setExercise} options={muscle?EXERCISES[muscle]:[]} />
          </div>
          <div style={{fontSize:11,color:"#666",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Sets</div>
          {sets.map((s,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:8,marginBottom:6}}>
              <Inp label={i===0?"Reps":""} value={s.reps} onChange={v=>{const ns=[...sets];ns[i]={...ns[i],reps:v};setSets(ns);}} placeholder="12" small />
              <Inp label={i===0?"Weight (kg)":""} value={s.weight} onChange={v=>{const ns=[...sets];ns[i]={...ns[i],weight:v};setSets(ns);}} placeholder="0=bodyweight" small />
              <button onClick={()=>setSets(sets.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:"#555",cursor:"pointer",marginTop:i===0?18:0}}>✕</button>
            </div>
          ))}
          <button onClick={()=>setSets([...sets,{reps:"",weight:""}])} style={{fontSize:12,color:"#666",background:"none",border:"1px dashed #333",borderRadius:8,padding:"6px 14px",cursor:"pointer",marginBottom:10}}>+ Add Set</
