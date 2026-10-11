const SLOTS=["09:00 AM","11:00 AM","01:00 PM","03:00 PM","05:00 PM"];
const PHONE="8590112915",IG="auvenziqstudio",DEV="_shadow_opp";
const CSS=`*{box-sizing:border-box;margin:0}body{font-family:system-ui,sans-serif;background:#0b0b0d;color:#eee;line-height:1.5}
:root{--g:#d4af6a}a{color:inherit}.w{max-width:1050px;margin:auto;padding:0 18px}
nav{position:sticky;top:0;background:#0b0b0dcc;backdrop-filter:blur(10px);z-index:9;border-bottom:1px solid #222}
nav .w{display:flex;justify-content:space-between;align-items:center;height:58px}
.logo{font-weight:700;letter-spacing:2px;color:var(--g);text-decoration:none}
.btn{background:var(--g);color:#111;border:0;padding:12px 22px;border-radius:999px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;font-size:15px}
.btn.o{background:none;color:var(--g);border:1px solid var(--g)}.btn.s{padding:6px 14px;font-size:13px}
.hero{padding:90px 0 70px;text-align:center;background:radial-gradient(circle at 50% 0,#2a2214,transparent 65%)}
h1{font-size:clamp(34px,8vw,64px);line-height:1.1;margin-bottom:14px}h1 span{color:var(--g)}
h2{font-size:28px;margin:60px 0 20px}.sub{color:#aaa;max-width:520px;margin:0 auto 26px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}
.grid figure{border-radius:14px;overflow:hidden;background:#161618;position:relative}
.grid img{width:100%;height:260px;object-fit:cover;display:block;transition:.4s}.grid figure:hover img{transform:scale(1.06)}
.grid figcaption{padding:8px 12px;font-size:13px;color:#bbb}
.card{background:#161618;border:1px solid #222;border-radius:14px;padding:18px;margin-bottom:12px}
.card small{color:#888}input,select,textarea{width:100%;padding:12px;margin:6px 0 12px;background:#0b0b0d;border:1px solid #333;border-radius:10px;color:#eee;font:inherit}
.slots{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}
.slot{padding:10px 16px;border-radius:10px;border:1px solid var(--g);background:none;color:var(--g);cursor:pointer}
.slot.sel{background:var(--g);color:#111}.slot:disabled{border-color:#333;color:#555;text-decoration:line-through;cursor:not-allowed}
footer{margin:70px 0 30px;text-align:center;color:#777;font-size:14px}footer a{color:var(--g)}
.msg{margin-top:10px;font-size:14px}.ok{color:#6fd98a}.er{color:#ff7a7a}
.tabs{display:flex;gap:8px;margin:20px 0}.row{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center}
input[type=date]{color-scheme:dark;min-height:46px;-webkit-appearance:none;appearance:none}label{color:#aaa;font-size:13px}.tag{font-size:12px;padding:2px 10px;border-radius:99px;background:#333}.tag.confirmed{background:#1d4d2b}.tag.cancelled{background:#4d1d1d}`;
const SITE=`<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Auvenziq Studio | Photography</title><style>${CSS}</style></head><body>
<nav><div class=w><a class=logo href=#>AUVENZIQ STUDIO</a><a class="btn s" href=#book>Book now</a></div></nav>
<header class=hero><div class=w><h1>Moments, <span>framed forever.</span></h1><p class=sub>Weddings, portraits, events and brand shoots by Auvenziq Studio. Pick a slot and we will take it from there.</p><a class=btn href=#book>Book a session</a> <a class="btn o" href="https://instagram.com/${IG}" target=_blank>@${IG}</a></div></header>
<main class=w><h2>Our work</h2><div class=grid id=works></div>
<h2>Latest updates</h2><div id=ups></div>
<h2 id=book>Book a slot</h2><div class=card>
<input id=n placeholder="Your name"><input id=p placeholder="Phone number" type=tel>
<select id=sv><option>Wedding</option><option>Portrait</option><option>Event</option><option>Product / Brand</option><option>Other</option></select>
<label for=d>Session date (the day you want us to shoot)</label><input id=d type=date><div class=slots id=sl><small>Choose a date to see available slots</small></div>
<textarea id=nt rows=2 placeholder="Anything we should know? (optional)"></textarea>
<button class=btn onclick=bk()>Confirm booking</button><div class=msg id=m></div></div></main>
<footer><p>Call / WhatsApp: <a href="tel:+91${PHONE}">${PHONE}</a> · Instagram <a href="https://instagram.com/${IG}" target=_blank>@${IG}</a></p><p style="margin-top:6px">Developed by <a href="https://instagram.com/${DEV}" target=_blank>@${DEV}</a></p></footer>
<script>
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
var $=function(i){return document.getElementById(i)},sel="";
fetch("/api/works").then(function(r){return r.json()}).then(function(a){$("works").innerHTML=a.length?a.map(function(w){return "<figure><img loading=lazy src=/img/"+w.id+"><figcaption>"+esc(w.title||"")+"</figcaption></figure>"}).join(""):"<small>Photos coming soon.</small>"});
fetch("/api/updates").then(function(r){return r.json()}).then(function(a){$("ups").innerHTML=a.length?a.map(function(u){return "<div class=card><b>"+esc(u.title)+"</b><p>"+esc(u.body)+"</p><small>"+esc(u.created.slice(0,10))+"</small></div>"}).join(""):"<small>No updates yet.</small>"});
var dt=$("d");dt.min=new Date().toISOString().slice(0,10);dt.onchange=ls;dt.oninput=ls;
function ls(){sel="";if(!dt.value)return;fetch("/api/slots?date="+dt.value).then(function(r){return r.json()}).then(function(x){$("sl").innerHTML=x.all.map(function(s){var t=x.taken.indexOf(s)>-1;return "<button class=slot "+(t?"disabled":"")+" data-s='"+s+"'>"+s+(t?" · Booked":"")+"</button>"}).join("");document.querySelectorAll(".slot:not(:disabled)").forEach(function(b){b.onclick=function(){document.querySelectorAll(".slot").forEach(function(o){o.classList.remove("sel")});b.classList.add("sel");sel=b.dataset.s}})})}
function bk(){var m=$("m");m.className="msg";if(!$("n").value||!$("p").value||!dt.value||!sel){m.className="msg er";m.textContent="Please fill name, phone, date and slot.";return}
fetch("/api/book",{method:"POST",body:JSON.stringify({name:$("n").value,phone:$("p").value,date:dt.value,slot:sel,service:$("sv").value,note:$("nt").value})}).then(function(r){return r.json().then(function(j){return [r.ok,j]})}).then(function(a){if(a[0]){m.className="msg ok";m.textContent="Booked! We will contact you shortly to confirm.";$("n").value=$("p").value=$("nt").value=""}else{m.className="msg er";m.textContent=a[1].error}ls()})}
</script></body></html>`;
const ADMIN=`<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Admin | Auvenziq Studio</title><style>${CSS}</style></head><body><div class=w style="padding-top:30px">
<h1 style="font-size:28px">Admin <span>panel</span></h1>
<div id=lg class=card style="margin-top:20px"><input id=pw type=password placeholder="Admin password"><button class=btn onclick=login()>Login</button><div class="msg er" id=le></div></div>
<div id=ap style="display:none"><div class=tabs><button class="btn s" onclick="tab('b')">Bookings</button><button class="btn s o" onclick="tab('w')">Works</button><button class="btn s o" onclick="tab('u')">Updates</button></div><div id=v></div></div></div>
<script>
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
var $=function(i){return document.getElementById(i)},P=sessionStorage.getItem("p")||"";
function api(u,o){o=o||{};o.headers={"x-pass":P};return fetch(u,o).then(function(r){if(r.status==401){sessionStorage.removeItem("p");location.reload()}return r.json()})}
function login(){P=$("pw").value;fetch("/api/admin/bookings",{headers:{"x-pass":P}}).then(function(r){if(r.ok){sessionStorage.setItem("p",P);start()}else $("le").textContent="Wrong password"})}
function start(){$("lg").style.display="none";$("ap").style.display="block";tab("b")}if(P)start();
function tab(t){$("v").innerHTML="";({b:bk,w:wk,u:up})[t]()}
function bk(){api("/api/admin/bookings").then(function(a){$("v").innerHTML=a.length?a.map(function(b){return "<div class=card><div class=row><b>"+esc(b.name)+"</b><span class='tag "+b.status+"'>"+b.status+"</span></div><p>"+esc(b.date)+" · "+esc(b.slot)+" · "+esc(b.service||"")+"</p><p><a href='tel:"+esc(b.phone)+"'>"+esc(b.phone)+"</a></p><small>"+esc(b.note||"")+"</small><div style='margin-top:10px;display:flex;gap:8px'><button class='btn s' onclick=\\"st("+b.id+",'confirmed')\\">Confirm</button><button class='btn s o' onclick=\\"st("+b.id+",'cancelled')\\">Cancel (free slot)</button></div></div>"}).join(""):"<small>No bookings yet.</small>"})}
function st(id,s){api("/api/admin/status",{method:"POST",body:JSON.stringify({id:id,status:s})}).then(bk)}
function wk(){api("/api/works").then(function(a){$("v").innerHTML="<div class=card><input id=wt placeholder='Title (optional)'><input id=wf type=file accept='image/*' multiple><button class=btn onclick=upl()>Upload photos</button><div class=msg id=wm></div></div><div class=grid>"+a.map(function(w){return "<figure><img src=/img/"+w.id+"><figcaption>"+esc(w.title||"")+" <button class='btn s o' onclick='dw("+w.id+")'>Delete</button></figcaption></figure>"}).join("")+"</div>"})}
function cmp(f){return new Promise(function(res){var im=new Image();im.onload=function(){var k=Math.min(1,1400/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=im.width*k;c.height=im.height*k;c.getContext("2d").drawImage(im,0,0,c.width,c.height);res(c.toDataURL("image/jpeg",0.8))};im.src=URL.createObjectURL(f)})}
function upl(){var f=$("wf").files;if(!f.length)return;$("wm").textContent="Uploading...";Promise.all([].slice.call(f).map(function(x){return cmp(x).then(function(d){return api("/api/admin/work",{method:"POST",body:JSON.stringify({title:$("wt").value,data:d})})})})).then(wk)}
function dw(id){if(confirm("Delete photo?"))api("/api/admin/work?id="+id,{method:"DELETE"}).then(wk)}
function up(){api("/api/updates").then(function(a){$("v").innerHTML="<div class=card><input id=ut placeholder=Title><textarea id=ub rows=3 placeholder='Update text'></textarea><button class=btn onclick=pu()>Post update</button></div>"+a.map(function(u){return "<div class=card><b>"+esc(u.title)+"</b><p>"+esc(u.body)+"</p><button class='btn s o' onclick='du("+u.id+")'>Delete</button></div>"}).join("")})}
function pu(){api("/api/admin/update",{method:"POST",body:JSON.stringify({title:$("ut").value,body:$("ub").value})}).then(up)}
function du(id){api("/api/admin/update?id="+id,{method:"DELETE"}).then(up)}
</script></body></html>`;

const http=require("http"),{Pool}=require("pg");
const pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.DATABASE_URL&&!/localhost/.test(process.env.DATABASE_URL)?{rejectUnauthorized:false}:false});
const init=`create table if not exists bookings(id serial primary key,name text,phone text,"date" text,slot text,service text,note text,status text default 'pending',created timestamptz default now());
create unique index if not exists uq_slot on bookings("date",slot) where status<>'cancelled';
create table if not exists works(id serial primary key,title text,data text);
create table if not exists updates(id serial primary key,title text,body text,created timestamptz default now());`;
http.createServer(async(req,res)=>{try{
const u=new URL(req.url,"http://x"),p=u.pathname,m=req.method,Q=(s,a)=>pool.query(s,a||[]);
const J=(d,s=200)=>{res.writeHead(s,{"content-type":"application/json"});res.end(JSON.stringify(d))};
const Hh=h=>{res.writeHead(200,{"content-type":"text/html;charset=utf-8"});res.end(h)};
const body=async()=>{const c=[];let n=0;for await(const x of req){n+=x.length;if(n>3e6)throw new Error("big");c.push(x)}return JSON.parse(Buffer.concat(c).toString()||"{}")};
if(p==="/")return Hh(SITE);if(p==="/admin")return Hh(ADMIN);
if(p.startsWith("/img/")){const r=(await Q("select data from works where id=$1",[parseInt(p.slice(5))||0])).rows[0];if(!r||!r.data){res.writeHead(404);return res.end()}res.writeHead(200,{"content-type":"image/jpeg","cache-control":"public,max-age=86400"});return res.end(Buffer.from(r.data.split(",")[1],"base64"))}
if(p==="/api/works")return J((await Q("select id,title from works order by id desc")).rows);
if(p==="/api/updates")return J((await Q("select id,title,body,created from updates order by id desc limit 20")).rows);
if(p==="/api/slots"){const r=await Q(`select slot from bookings where "date"=$1 and status<>'cancelled'`,[u.searchParams.get("date")||""]);return J({all:SLOTS,taken:r.rows.map(x=>x.slot)})}
if(p==="/api/book"&&m==="POST"){const b=await body();
if(!b.name||!b.phone||!SLOTS.includes(b.slot)||!/^\d{4}-\d{2}-\d{2}$/.test(b.date))return J({error:"Invalid details"},400);
try{await Q(`insert into bookings(name,phone,"date",slot,service,note) values($1,$2,$3,$4,$5,$6)`,[b.name.slice(0,80),b.phone.slice(0,20),b.date,b.slot,(b.service||"").slice(0,40),(b.note||"").slice(0,300)])}catch(e){return J({error:"Sorry, that slot was just booked. Pick another."},409)}
return J({ok:true})}
if(p.startsWith("/api/admin/")){
if(!process.env.ADMIN_PASSWORD||req.headers["x-pass"]!==process.env.ADMIN_PASSWORD)return J({error:"Unauthorized"},401);
if(p==="/api/admin/bookings")return J((await Q(`select * from bookings order by "date" desc,slot`)).rows);
if(p==="/api/admin/status"){const b=await body();if(!["pending","confirmed","cancelled"].includes(b.status))return J({error:"bad"},400);try{await Q("update bookings set status=$1 where id=$2",[b.status,b.id])}catch(e){return J({error:"Slot conflict"},409)}return J({ok:1})}
if(p==="/api/admin/work"&&m==="POST"){const b=await body();if(!b.data||!b.data.startsWith("data:image/jpeg;base64,")||b.data.length>1500000)return J({error:"Image too large"},400);await Q("insert into works(title,data) values($1,$2)",[(b.title||"").slice(0,80),b.data]);return J({ok:1})}
if(p==="/api/admin/work"&&m==="DELETE"){await Q("delete from works where id=$1",[parseInt(u.searchParams.get("id"))||0]);return J({ok:1})}
if(p==="/api/admin/update"&&m==="POST"){const b=await body();if(!b.title)return J({error:"Title needed"},400);await Q("insert into updates(title,body) values($1,$2)",[b.title.slice(0,100),(b.body||"").slice(0,1000)]);return J({ok:1})}
if(p==="/api/admin/update"&&m==="DELETE"){await Q("delete from updates where id=$1",[parseInt(u.searchParams.get("id"))||0]);return J({ok:1})}
}
res.writeHead(404);res.end("Not found")}catch(e){console.error(e);res.writeHead(500);res.end("Server error")}}).listen(process.env.PORT||3000,async()=>{await pool.query(init);console.log("up")});
