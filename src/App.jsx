/* eslint-disable */
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
  { id:"relation",  label:"Relations",  icon:"♥",  color:"#EF4444" },
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
          <button onClick={()=>setSets([...sets,{reps:"",weight:""}])} style={{fontSize:12,color:"#666",background:"none",border:"1px dashed #333",borderRadius:8,padding:"6px 14px",cursor:"pointer",marginBottom:10}}>+ Add Set</button>
          <div style={{display:"flex",gap:8}}>
            <button onClick={addExercise} style={{padding:"9px 20px",borderRadius:9,border:"none",background:color,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>Save Exercise</button>
            <button onClick={()=>setShowAdd(false)} style={{padding:"9px 16px",borderRadius:9,border:"1px solid #333",background:"transparent",color:"#666",fontSize:13,cursor:"pointer"}}>Cancel</button>
          </div>
        </div>
      ):(
        <button onClick={()=>setShowAdd(true)} style={{width:"100%",padding:"10px",borderRadius:10,border:`1.5px dashed ${color}55`,background:`${color}08`,color,fontSize:13,fontWeight:600,cursor:"pointer"}}>+ Log Exercise</button>
      )}
    </div>
  );
}

const CHECKLISTS = {
  health:["Wake up before 7 AM","Morning workout done","No junk food today","8k+ steps reached","3L water complete","Protein goal hit (150g+)","Slept 7+ hours","No late night snacking","Took supplements","Stretching / mobility done"],
  career:["Updated resume today","Applied to at least 1 job","Practiced coding / DSA","Watched learning video","LinkedIn optimized","Reached out to 1 connection","Read industry news","Did mock interview","Noted down learnings","Reviewed job descriptions"],
  marketing:["Learned 1 new concept","Took notes","Posted content","Engaged with audience","Analyzed competitor","Checked analytics","Practiced copywriting","Worked on portfolio","Read marketing newsletter","Created practice campaign"],
  finance:["Tracked all expenses","Avoided unnecessary spend","Checked bank balance","No impulse purchases","Added to savings","Reviewed monthly budget","Researched investment","Checked portfolio","Read financial article","Updated expense log"],
  mental:["Meditated / breathwork","No doom scrolling morning","Practiced gratitude","Journaled thoughts","Took breaks","Went outside","No negative self-talk","Did something I enjoy","Talked to someone positive","Reflected before sleep"],
  digital:["No phone first 30 mins","No scrolling during meals","Phone-free before sleep","Deleted 1 unused app","Unfollowed negative account","YouTube = learning only","Screen time under 3hrs","No social after 10 PM","Checked phone on schedule","Did something offline"],
  relation:["Didn't check her profile","No obsessive thinking","Time on my own growth","Felt secure without validation","No unnecessary messages","Focused on becoming better","Practiced being present","Had meaningful conversation","Set a personal boundary","Reminded myself: I am enough"],
  life:["Did something fun","Spent time in nature","Laughed genuinely","Tried something new","Called/met someone I love","Did something creative","No comparing myself","Appreciated present moment","Did something just for me","Made a memory worth keeping"],
};

function TopicsList({topics,setTopics,color,placeholder}) {
  const [newTopic,setNewTopic]=useState("");
  function add() { if(newTopic.trim()) { setTopics([...topics,{name:newTopic.trim(),done:false}]); setNewTopic(""); } }
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <input value={newTopic} onChange={e=>setNewTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder={placeholder||"Type + Enter..."} style={{...iStyle,flex:1}} />
        <button onClick={add} style={{padding:"9px 16px",borderRadius:8,border:"none",background:color,color:"#fff",fontWeight:700,cursor:"pointer"}}>+</button>
      </div>
      {topics.map((t,i)=>(
        <div key={i} onClick={()=>setTopics(topics.map((x,j)=>j===i?{...x,done:!x.done}:x))}
          style={{display:"flex",alignItems:"center",gap:10,background:t.done?`${color}12`:"#111",border:`1.5px solid ${t.done?color+"44":"#2A2A2E"}`,borderRadius:10,padding:"9px 13px",cursor:"pointer",marginBottom:6,transition:"all 0.15s"}}>
          <div style={{width:18,height:18,borderRadius:5,border:`2px solid ${t.done?color:"#444"}`,background:t.done?color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {t.done&&<span style={{color:"#fff",fontSize:11}}>✓</span>}
          </div>
          <span style={{fontSize:13,color:t.done?"#666":"#ddd",textDecoration:t.done?"line-through":"none",flex:1}}>{t.name}</span>
          <button onClick={e=>{e.stopPropagation();setTopics(topics.filter((_,j)=>j!==i));}} style={{background:"none",border:"none",color:"#555",cursor:"pointer"}}>✕</button>
        </div>
      ))}
      {topics.length===0&&<div style={{fontSize:12,color:"#444",textAlign:"center",padding:"8px 0"}}>Nothing added yet</div>}
    </div>
  );
}

function useDaily(store,setStore,tab) {
  const td=todayStr();
  const d=(store[tab]?.daily||{})[td]||{};
  const upD=(key,val)=>setStore(p=>{
    const tabData={...p[tab],daily:{...p[tab].daily,[td]:{...d,[key]:val}}};
    const n={...p,[tab]:tabData}; persist(n); return n;
  });
  return [d,upD];
}
function useWeekly(store,setStore,tab) {
  const wk=weekStr();
  const w=(store[tab]?.weekly||{})[wk]||{};
  const upW=(key,val)=>setStore(p=>{
    const tabData={...p[tab],weekly:{...p[tab].weekly,[wk]:{...w,[key]:val}}};
    const n={...p,[tab]:tabData}; persist(n); return n;
  });
  return [w,upW];
}
function useMonthly(store,setStore,tab) {
  const mo=monthStr();
  const m=(store[tab]?.monthly||{})[mo]||{};
  const upM=(key,val)=>setStore(p=>{
    const tabData={...p[tab],monthly:{...p[tab].monthly,[mo]:{...m,[key]:val}}};
    const n={...p,[tab]:tabData}; persist(n); return n;
  });
  return [m,upM];
}

function HealthTab({store,setStore,color}) {
  const [d,upD]=useDaily(store,setStore,"health");
  const [w,upW]=useWeekly(store,setStore,"health");
  const streak=(()=>{let s=0,cur=new Date();while(true){const k=cur.toISOString().slice(0,10);if((store.health?.daily||{})[k]?.gym){s++;cur.setDate(cur.getDate()-1);}else break;}return s;})();
  const meals=d.meals||[]; const workouts=d.workouts||[]; const glasses=d.glasses||0; const checklist=d.checklist||{};
  const totalP=meals.reduce((a,m)=>a+m.protein,0);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
        <StatPill label="Gym Streak" value={streak} unit="d" color={color} />
        <StatPill label="Protein" value={Math.round(totalP)} unit="g" color="#FF6B35" />
        <StatPill label="Water" value={glasses} unit="/12" color="#3B9EE8" />
        <StatPill label="Steps" value={d.steps||0} unit="k" color="#4CAF82" />
      </div>
      <Card color={color}><WaterTracker glasses={glasses} setGlasses={v=>upD("glasses",v)} color="#3B9EE8" /></Card>
      <Card color={color}><WorkoutLogger workouts={workouts} setWorkouts={v=>upD("workouts",v)} color={color} /></Card>
      <Card color={color}><NutritionLogger meals={meals} setMeals={v=>upD("meals",v)} color="#FF6B35" /></Card>
      <Card color={color}>
        <SecTitle color={color}>📊 Vitals</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10}}>
          <Inp label="Steps (k)" value={d.steps} onChange={v=>upD("steps",v)} placeholder="8" step="0.1" />
          <Inp label="Sleep (hrs)" value={d.sleep} onChange={v=>upD("sleep",v)} placeholder="7" step="0.5" />
          <Inp label="Body Weight (kg)" value={d.bodyWeight} onChange={v=>upD("bodyWeight",v)} placeholder="75" />
        </div>
        <Toggle label="🏋️ Gym Session Done?" value={!!d.gym} onChange={v=>upD("gym",v)} color={color} />
      </Card>
      <Card color={color}><Checklist title="✅ Health Checklist" items={CHECKLISTS.health} checked={checklist} onToggle={i=>upD("checklist",{...checklist,[i]:!checklist[i]})} color={color} /></Card>
      <Card color={color}>
        <SecTitle color={color}>📆 Weekly</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          <Inp label="Weight (kg)" value={w.weight} onChange={v=>upW("weight",v)} placeholder="75" />
          <Inp label="Waist (cm)" value={w.waist} onChange={v=>upW("waist",v)} placeholder="85" />
        </div>
        <Toggle label="📸 Progress Photo Taken?" value={!!w.photo} onChange={v=>upW("photo",v)} color={color} />
      </Card>
    </div>
  );
}

function CareerTab({store,setStore,color}) {
  const [d,upD]=useDaily(store,setStore,"career");
  const [w,upW]=useWeekly(store,setStore,"career");
  const [m,upM]=useMonthly(store,setStore,"career");
  const checklist=d.checklist||{}; const topics=d.topics||[];
  const totalLearn=Object.values(store.career?.daily||{}).reduce((a,v)=>a+(v.learnMins||0),0);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        <StatPill label="Total Learn" value={Math.round(totalLearn/60)} unit="hrs" color={color} />
        <StatPill label="Apps This Week" value={w.applications||0} color={color} />
        <StatPill label="Today Prep" value={d.jobMins||0} unit="min" color={color} />
      </div>
      <Card color={color}>
        <SecTitle color={color}>📅 Daily</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          <Inp label="Job Prep (mins)" value={d.jobMins} onChange={v=>upD("jobMins",v)} placeholder="30" />
          <Inp label="Learning (mins)" value={d.learnMins} onChange={v=>upD("learnMins",v)} placeholder="45" />
        </div>
        <Inp label="What did I learn today?" type="text" value={d.learnNote} onChange={v=>upD("learnNote",v)} placeholder="e.g. Binary search, React hooks..." />
        {d.learnNote&&<div style={{marginTop:8,background:`${color}15`,borderRadius:8,padding:"9px 12px",fontSize:13,color,fontStyle:"italic"}}>"{d.learnNote}"</div>}
      </Card>
      <Card color={color}>
        <SecTitle color={color}>📚 Topics Studied Today</SecTitle>
        <TopicsList topics={topics} setTopics={v=>upD("topics",v)} color={color} placeholder="Add topic + Enter..." />
      </Card>
      <Card color={color}><Checklist title="✅ Career Checklist" items={CHECKLISTS.career} checked={checklist} onToggle={i=>upD("checklist",{...checklist,[i]:!checklist[i]})} color={color} /></Card>
      <Card color={color}>
        <SecTitle color={color}>📆 Weekly</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <Inp label="Applications" value={w.applications} onChange={v=>upW("applications",v)} placeholder="5" />
          <Inp label="Interviews" value={w.interviews} onChange={v=>upW("interviews",v)} placeholder="2" />
          <Inp label="Resume Updates" value={w.resumeUpdates} onChange={v=>upW("resumeUpdates",v)} placeholder="1" />
        </div>
      </Card>
      <Card color={color}>
        <SecTitle color={color}>📅 Monthly</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <Inp label="New Skills" value={m.newSkills} onChange={v=>upM("newSkills",v)} placeholder="2" />
          <Inp label="Salary Target %" value={m.salaryProgress} onChange={v=>upM("salaryProgress",v)} placeholder="60" />
        </div>
        {m.salaryProgress>0&&<div style={{marginTop:10}}><PBar value={m.salaryProgress} max={100} color={color} label="Salary Goal Progress" /></div>}
      </Card>
    </div>
  );
}

function MarketingTab({store,setStore,color}) {
  const [d,upD]=useDaily(store,setStore,"marketing");
  const [w,upW]=useWeekly(store,setStore,"marketing");
  const checklist=d.checklist||{}; const topics=d.topics||[];
  const totalLearn=Object.values(store.marketing?.daily||{}).reduce((a,v)=>a+(v.learnMins||0),0);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <StatPill label="Total Learn" value={Math.round(totalLearn/60)} unit="hrs" color={color} />
        <StatPill label="Topics This Week" value={w.topics||0} color={color} />
      </div>
      <Card color={color}>
        <SecTitle color={color}>📅 Daily</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          <Inp label="Learning (mins)" value={d.learnMins} onChange={v=>upD("learnMins",v)} placeholder="45" />
          <Inp label="Notes Taken" value={d.notes} onChange={v=>upD("notes",v)} placeholder="3 pages" />
        </div>
        <Inp label="Platform focused today" type="text" value={d.platform} onChange={v=>upD("platform",v)} placeholder="e.g. Instagram, Google Ads, LinkedIn..." />
      </Card>
      <Card color={color}>
        <SecTitle color={color}>📚 Topics Studied</SecTitle>
        <TopicsList topics={topics} setTopics={v=>upD("topics",v)} color={color} placeholder="e.g. SEO, Meta Ads, Copywriting..." />
      </Card>
      <Card color={color}><Checklist title="✅ Marketing Checklist" items={CHECKLISTS.marketing} checked={checklist} onToggle={i=>upD("checklist",{...checklist,[i]:!checklist[i]})} color={color} /></Card>
      <Card color={color}>
        <SecTitle color={color}>📆 Weekly</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <Inp label="Topics Done" value={w.topics} onChange={v=>upW("topics",v)} placeholder="3" />
          <Inp label="Campaigns" value={w.campaigns} onChange={v=>upW("campaigns",v)} placeholder="1" />
          <Inp label="Portfolio %" value={w.portfolio} onChange={v=>upW("portfolio",v)} placeholder="20" />
        </div>
        {w.portfolio>0&&<div style={{marginTop:10}}><PBar value={w.portfolio} max={100} color={color} label="Portfolio Progress" /></div>}
      </Card>
    </div>
  );
}

function FinanceTab({store,setStore,color}) {
  const [d,upD]=useDaily(store,setStore,"finance");
  const [m,upM]=useMonthly(store,setStore,"finance");
  const checklist=d.checklist||{};
  const ms=store.finance?.milestones||{};
  const ef=store.finance?.emergencyFund||0;
  const pv=store.finance?.portfolio||0;
  const upF=(key,val)=>setStore(p=>{const n={...p,finance:{...p.finance,[key]:val}};persist(n);return n;});
  const upMS=(key,val)=>setStore(p=>{const n={...p,finance:{...p.finance,milestones:{...ms,[key]:val}}};persist(n);return n;});
  const expenses=d.expenses||[];
  const [expForm,setExpForm]=useState({name:"",amount:""});
  const [showExp,setShowExp]=useState(false);
  const totalSpent=expenses.reduce((a,e)=>a+Number(e.amount),0);
  const milestones=[{key:"m50k",label:"₹50K Savings"},{key:"m1l",label:"₹1L Savings"},{key:"m3l",label:"₹3L Savings"}];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        <StatPill label="Emergency Fund" value={`₹${(ef/1000).toFixed(1)}K`} color={color} />
        <StatPill label="Portfolio" value={`₹${(pv/1000).toFixed(1)}K`} color={color} />
        <StatPill label="Spent Today" value={`₹${totalSpent}`} color="#EF4444" />
      </div>
      <Card color={color}>
        <SecTitle color={color}>💸 Daily Expense Tracker</SecTitle>
        {expenses.map((e,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#111",borderRadius:9,padding:"9px 13px",marginBottom:6,border:"1px solid #222"}}>
            <span style={{fontSize:13,color:"#ddd"}}>{e.name}</span>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <span style={{fontSize:14,fontWeight:700,color:"#EF4444"}}>₹{e.amount}</span>
              <button onClick={()=>upD("expenses",expenses.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:"#555",cursor:"pointer"}}>✕</button>
            </div>
          </div>
        ))}
        {showExp?(
          <div style={{display:"flex",gap:8}}>
            <input value={expForm.name} onChange={e=>setExpForm(p=>({...p,name:e.target.value}))} placeholder="Item name" style={{...iStyle,flex:2}} />
            <input value={expForm.amount} onChange={e=>setExpForm(p=>({...p,amount:e.target.value}))} placeholder="₹" type="number" style={{...iStyle,flex:1}} />
            <button onClick={()=>{if(expForm.name&&expForm.amount){upD("expenses",[...expenses,expForm]);setExpForm({name:"",amount:""});setShowExp(false);}}} style={{padding:"9px 14px",borderRadius:8,border:"none",background:color,color:"#fff",fontWeight:700,cursor:"pointer"}}>✓</button>
          </div>
        ):(
          <button onClick={()=>setShowExp(true)} style={{width:"100%",padding:"9px",borderRadius:9,border:`1.5px dashed ${color}55`,background:`${color}08`,color,fontSize:13,fontWeight:600,cursor:"pointer"}}>+ Add Expense</button>
        )}
      </Card>
      <Card color={color}>
        <SecTitle color={color}>📅 Monthly — {monthStr()}</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <Inp label="Salary (₹)" value={m.salary} onChange={v=>upM("salary",v)} placeholder="30000" />
          <Inp label="Saved (₹)" value={m.saved} onChange={v=>upM("saved",v)} placeholder="5000" />
          <Inp label="Invested (₹)" value={m.invested} onChange={v=>upM("invested",v)} placeholder="2000" />
        </div>
        {m.salary>0&&<div style={{marginTop:10}}><PBar value={(m.saved||0)+(m.invested||0)} max={m.salary} color={color} label="Saved+Invested / Salary" /></div>}
      </Card>
      <Card color={color}>
        <SecTitle color={color}>🏦 Track</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <Inp label="Emergency Fund (₹)" value={ef} onChange={v=>upF("emergencyFund",v)} placeholder="10000" />
          <Inp label="Portfolio Value (₹)" value={pv} onChange={v=>upF("portfolio",v)} placeholder="5000" />
        </div>
      </Card>
      <Card color={color}>
        <SecTitle color={color}>🏆 Milestones</SecTitle>
        {milestones.map(ml=>(
          <div key={ml.key} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:ms[ml.key]?`${color}20`:"#111",borderRadius:10,padding:"12px 16px",border:`1.5px solid ${ms[ml.key]?color:"#222"}`,marginBottom:8,transition:"all 0.2s"}}>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:ms[ml.key]?color:"#ccc"}}>{ml.label}</div>
              {ms[ml.key]&&<div style={{fontSize:11,color:"#666"}}>Achieved! 🎉</div>}
            </div>
            <button onClick={()=>upMS(ml.key,!ms[ml.key])} style={{padding:"6px 14px",borderRadius:8,border:"none",cursor:"pointer",background:ms[ml.key]?color:"#2A2A2E",color:ms[ml.key]?"#fff":"#888",fontWeight:700,fontSize:12}}>
              {ms[ml.key]?"✓ Done":"Mark Done"}
            </button>
          </div>
        ))}
      </Card>
      <Card color={color}><Checklist title="✅ Finance Checklist" items={CHECKLISTS.finance} checked={checklist} onToggle={i=>upD("checklist",{...checklist,[i]:!checklist[i]})} color={color} /></Card>
    </div>
  );
}

function MentalTab({store,setStore,color}) {
  const [d,upD]=useDaily(store,setStore,"mental");
  const [w,upW]=useWeekly(store,setStore,"mental");
  const checklist=d.checklist||{};
  const avgMood=(()=>{const vals=Object.values(store.mental?.daily||{}).map(v=>v.mood).filter(Boolean);return vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1):"—";})();
  const moodColor=d.mood>=7?"#4CAF82":d.mood>=4?"#F59E0B":"#EF4444";
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
        <StatPill label="Mood" value={d.mood||"—"} unit="/10" color={moodColor} />
        <StatPill label="Energy" value={d.energy||"—"} unit="/10" color={color} />
        <StatPill label="Focus" value={d.focus||"—"} unit="/10" color="#3B9EE8" />
        <StatPill label="Avg Mood" value={avgMood} color={color} />
      </div>
      <Card color={color}>
        <SecTitle color={color}>📅 Daily Check-in</SecTitle>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <Slider label="Mood" value={d.mood} onChange={v=>upD("mood",v)} color={moodColor} />
          <Slider label="Energy Level" value={d.energy} onChange={v=>upD("energy",v)} color={color} />
          <Slider label="Focus / Productivity" value={d.focus} onChange={v=>upD("focus",v)} color="#3B9EE8" />
          <Slider label="Stress Level" value={d.stress} onChange={v=>upD("stress",v)} color="#EF4444" />
        </div>
        <div style={{marginTop:12}}>
          <Inp label="Today's intention" type="text" value={d.intention} onChange={v=>upD("intention",v)} placeholder="I will stay focused and not overthink..." />
        </div>
      </Card>
      <Card color={color}>
        <SecTitle color={color}>📔 Quick Journal</SecTitle>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <Inp label="1 win today" type="text" value={d.win} onChange={v=>upD("win",v)} placeholder="Something you did well..." />
          <Inp label="1 thing to improve" type="text" value={d.improve} onChange={v=>upD("improve",v)} placeholder="What can be better tomorrow..." />
          <Inp label="Grateful for" type="text" value={d.grateful} onChange={v=>upD("grateful",v)} placeholder="3 things you're grateful for..." />
        </div>
      </Card>
      <Card color={color}><Checklist title="✅ Mental Health Checklist" items={CHECKLISTS.mental} checked={checklist} onToggle={i=>upD("checklist",{...checklist,[i]:!checklist[i]})} color={color} /></Card>
      <Card color={color}>
        <SecTitle color={color}>📆 Weekly Reflection</SecTitle>
        <Slider label="Overthinking Level" value={w.overthinking} onChange={v=>upW("overthinking",v)} color="#EF4444" />
        <div style={{marginTop:12,background:"#111",borderRadius:12,padding:"14px 16px",border:"1.5px solid #2A2A2E"}}>
          <div style={{fontSize:13,color:"#aaa",marginBottom:10}}>Did I spend more time on goals or distractions?</div>
          <div style={{display:"flex",gap:8}}>
            {["Goals 💪","50/50","Distractions 😅"].map(opt=>(
              <button key={opt} onClick={()=>upW("focusAnswer",opt)} style={{flex:1,padding:"8px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:w.focusAnswer===opt?700:400,background:w.focusAnswer===opt?color:"#2A2A2E",color:w.focusAnswer===opt?"#fff":"#888"}}>{opt}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

function DigitalTab({store,setStore,color}) {
  const [d,upD]=useDaily(store,setStore,"digital");
  const [w,upW]=useWeekly(store,setStore,"digital");
  const checklist=d.checklist||{};
  const wasted=(d.instagram||0)+(d.scrolling||0);
  const useful=d.ytLearn||0;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <StatPill label="Wasted Today" value={wasted} unit="min" color="#EF4444" />
        <StatPill label="Useful Screen" value={useful} unit="min" color={color} />
      </div>
      <Card color={color}>
        <SecTitle color={color}>📅 Screen Time Log</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <Inp label="Instagram (mins)" value={d.instagram} onChange={v=>upD("instagram",v)} placeholder="0" />
          <Inp label="YT Learning (mins)" value={d.ytLearn} onChange={v=>upD("ytLearn",v)} placeholder="30" />
          <Inp label="Random Scroll (mins)" value={d.scrolling} onChange={v=>upD("scrolling",v)} placeholder="0" />
        </div>
        {wasted>60&&<div style={{marginTop:10,background:"#EF444418",borderRadius:9,padding:"10px 14px",fontSize:13,color:"#EF4444",border:"1px solid #EF444433"}}>⚠️ {wasted} mins wasted. That's time you could've used to grow.</div>}
        {wasted===0&&useful>0&&<div style={{marginTop:10,background:"#4CAF8218",borderRadius:9,padding:"10px 14px",fontSize:13,color:"#4CAF82",border:"1px solid #4CAF8233"}}>🔥 Zero waste today! Disciplined.</div>}
      </Card>
      <Card color={color}><Checklist title="✅ Digital Discipline Checklist" items={CHECKLISTS.digital} checked={checklist} onToggle={i=>upD("checklist",{...checklist,[i]:!checklist[i]})} color={color} /></Card>
      <Card color={color}>
        <SecTitle color={color}>📆 Weekly Cleanup</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <Inp label="Accounts Unfollowed" value={w.unfollowed} onChange={v=>upW("unfollowed",v)} placeholder="5" />
          <Inp label="Apps Removed" value={w.appsRemoved} onChange={v=>upW("appsRemoved",v)} placeholder="1" />
        </div>
      </Card>
    </div>
  );
}

function RelationTab({store,setStore,color}) {
  const [d,upD]=useDaily(store,setStore,"relation");
  const [w,upW]=useWeekly(store,setStore,"relation");
  const checklist=d.checklist||{};
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <Card color={color} style={{background:`${color}10`,border:`1.5px solid ${color}44`}}>
        <div style={{fontSize:14,color:"#ccc",lineHeight:1.8}}>♥ <strong style={{color}}>Not about one girl.</strong><br/>This is about emotional stability. Track your patterns. Win the inner game.</div>
      </Card>
      <Card color={color}>
        <SecTitle color={color}>📆 Weekly Emotional Check</SecTitle>
        {[
          {key:"chased",label:"Did I chase validation this week?",bad:true},
          {key:"overthought",label:"Did I overthink someone this week?",bad:true},
          {key:"boundaries",label:"Did I maintain my boundaries?",bad:false},
          {key:"focused",label:"Did I stay focused on my growth?",bad:false},
        ].map(q=>(
          <div key={q.key} style={{background:"#111",borderRadius:12,padding:"12px 14px",border:"1.5px solid #2A2A2E",marginBottom:8}}>
            <div style={{fontSize:13,color:"#aaa",marginBottom:8}}>{q.label}</div>
            <div style={{display:"flex",gap:8}}>
              {["Yes","No"].map(opt=>{
                const isSelected=w[q.key]===opt;
                const isBad=(q.bad&&opt==="Yes")||(!q.bad&&opt==="No");
                const sc=isBad?"#EF4444":"#4CAF82";
                return <button key={opt} onClick={()=>upW(q.key,opt)} style={{flex:1,padding:"9px",borderRadius:8,border:`1.5px solid ${isSelected?sc:"transparent"}`,cursor:"pointer",fontWeight:isSelected?700:400,fontSize:14,background:isSelected?`${sc}25`:"#2A2A2E",color:isSelected?sc:"#888"}}>{opt}</button>;
              })}
            </div>
          </div>
        ))}
      </Card>
      <Card color={color}><Checklist title="✅ Emotional Discipline Checklist" items={CHECKLISTS.relation} checked={checklist} onToggle={i=>upD("checklist",{...checklist,[i]:!checklist[i]})} color={color} /></Card>
      <Card color={color}>
        <SecTitle color={color}>🎯 North Star</SecTitle>
        <div style={{fontSize:15,color:"#ccc",lineHeight:1.9}}>Become the kind of person who doesn't need external validation.<br/><strong style={{color}}>Build yourself. The right people will notice automatically.</strong></div>
      </Card>
    </div>
  );
}

function LifeTab({store,setStore,color}) {
  const [d,upD]=useDaily(store,setStore,"life");
  const [m,upM]=useMonthly(store,setStore,"life");
  const checklist=d.checklist||{};
  const totalCricket=Object.values(store.life?.monthly||{}).reduce((a,v)=>a+(v.cricket||0),0);
  const totalPlaces=Object.values(store.life?.monthly||{}).reduce((a,v)=>a+(v.places||0),0);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <StatPill label="Total Cricket" value={totalCricket} unit=" sessions" color={color} />
        <StatPill label="Places Visited" value={totalPlaces} color={color} />
      </div>
      <Card color={color} style={{background:`${color}10`,border:`1.5px solid ${color}44`}}>
        <div style={{fontSize:14,color:"#ccc",lineHeight:1.7}}>🏏 <strong style={{color}}>Life isn't only work.</strong> You're building a career AND a life. Track both.</div>
      </Card>
      <Card color={color}>
        <SecTitle color={color}>📅 Monthly — {monthStr()}</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <Inp label="Cricket Sessions" value={m.cricket} onChange={v=>upM("cricket",v)} placeholder="4" />
          <Inp label="New Places" value={m.places} onChange={v=>upM("places",v)} placeholder="1" />
          <Inp label="New Experiences" value={m.experiences} onChange={v=>upM("experiences",v)} placeholder="2" />
        </div>
        <div style={{marginTop:10}}>
          <Inp label="Best moment this month" type="text" value={m.highlight} onChange={v=>upM("highlight",v)} placeholder="What will you remember this month for?" />
        </div>
        {m.highlight&&<div style={{marginTop:8,background:`${color}15`,borderRadius:9,padding:"10px 14px",fontSize:14,color,fontStyle:"italic"}}>"{m.highlight}"</div>}
      </Card>
      <Card color={color}><Checklist title="✅ Life & Joy Checklist" items={CHECKLISTS.life} checked={checklist} onToggle={i=>upD("checklist",{...checklist,[i]:!checklist[i]})} color={color} /></Card>
    </div>
  );
}

export default function App() {
  const [activeTab,setActiveTab]=useState("health");
  const [store,setStore]=useState(load);
  const tab=TABS.find(t=>t.id===activeTab);

  const panels={
    health:    <HealthTab    store={store} setStore={setStore} color={tab.color} />,
    career:    <CareerTab    store={store} setStore={setStore} color={tab.color} />,
    marketing: <MarketingTab store={store} setStore={setStore} color={tab.color} />,
    finance:   <FinanceTab   store={store} setStore={setStore} color={tab.color} />,
    mental:    <MentalTab    store={store} setStore={setStore} color={tab.color} />,
    digital:   <DigitalTab   store={store} setStore={setStore} color={tab.color} />,
    relation:  <RelationTab  store={store} setStore={setStore} color={tab.color} />,
    life:      <LifeTab      store={store} setStore={setStore} color={tab.color} />,
  };

  const score=(()=>{
    const td=todayStr(); let pts=0,max=0;
    const h=(store.health?.daily||{})[td]||{};
    if(h.gym) pts++; max++;
    if((h.glasses||0)>=10) pts++; max++;
    if((h.steps||0)>=8) pts++; max++;
    if((h.meals||[]).reduce((a,m)=>a+m.protein,0)>=100) pts++; max++;
    const c=(store.career?.daily||{})[td]||{};
    if((c.learnMins||0)>=30) pts++; max++;
    const mn=(store.mental?.daily||{})[td]||{};
    if((mn.mood||0)>=6) pts++; max++;
    const dg=(store.digital?.daily||{})[td]||{};
    if(((dg.instagram||0)+(dg.scrolling||0))<60) pts++; max++;
    return max>0?Math.round((pts/max)*100):0;
  })();
  const scoreColor=score>=75?"#4CAF82":score>=50?"#F59E0B":"#EF4444";

  return (
    <div style={{minHeight:"100vh",background:"#0A0A0C",fontFamily:"'DM Sans','Segoe UI',sans-serif",color:"#F0EEE9",paddingBottom:80}}>
      <div style={{maxWidth:820,margin:"0 auto",padding:"24px 18px 0",display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:9,letterSpacing:4,color:"#333",textTransform:"uppercase"}}>Personal OS</div>
          <h1 style={{margin:"3px 0 0",fontSize:28,fontWeight:900,letterSpacing:-1,background:`linear-gradient(120deg,${tab.color} 0%,#fff 70%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Danush 3.0</h1>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:10,color:"#444"}}>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"short"})}</div>
          <div style={{fontSize:20,fontWeight:900,color:scoreColor}}>{score}%<span style={{fontSize:11,fontWeight:400,color:"#555"}}> today</span></div>
        </div>
      </div>

      <div style={{maxWidth:820,margin:"16px auto 0",padding:"0 18px",display:"flex",gap:5,overflowX:"auto",paddingBottom:4}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{padding:"7px 12px",borderRadius:99,whiteSpace:"nowrap",border:activeTab===t.id?`2px solid ${t.color}`:"2px solid #1E1E22",background:activeTab===t.id?`${t.color}20`:"transparent",color:activeTab===t.id?t.color:"#555",fontWeight:activeTab===t.id?700:500,fontSize:12,cursor:"pointer",transition:"all 0.15s"}}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div style={{maxWidth:820,margin:"20px auto 0",padding:"0 18px"}}>
        {panels[activeTab]}
      </div>
    </div>
  );
}
