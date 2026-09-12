
let SEARCH_DATA=[];
fetch('search-index.json').then(r=>r.json()).then(x=>SEARCH_DATA=x).catch(()=>{});
const q=document.querySelector('#siteSearch'), box=document.querySelector('#searchResults');
if(q&&box){
 q.addEventListener('input',()=>{
  const s=q.value.trim().toLowerCase();
  if(s.length<2){box.classList.remove('open');box.innerHTML='';return}
  const rows=SEARCH_DATA.filter(x=>(x.title+' '+x.chapter+' '+x.keywords).toLowerCase().includes(s)).slice(0,12);
  box.innerHTML=rows.map(x=>`<a class="searchItem" href="${x.url}"><b>${x.title}</b><small>${x.chapter}</small></a>`).join('');
  box.classList.toggle('open',rows.length>0);
 });
 document.addEventListener('click',e=>{if(!e.target.closest('.search'))box.classList.remove('open')})
}
document.querySelectorAll('.quizQ').forEach(q=>{
 q.querySelectorAll('button').forEach(b=>b.onclick=()=>{
  const f=q.querySelector('.feedback'); const ok=b.dataset.ok==='1';
  f.textContent=ok?'Correct ✓':'Try again — review the concept and visualization above.';
  f.style.color=ok?'#16805d':'#b66a11';
 });
});
document.querySelectorAll('[data-ohm]').forEach(v=>{
 const V=v.querySelector('[data-v]'),R=v.querySelector('[data-r]'),o=v.querySelector('[data-out]');
 const u=()=>{const a=(+V.value)/(+R.value);o.textContent=`Current I = ${a.toFixed(2)} A  (V=${V.value} V, R=${R.value} Ω)`}; V.oninput=u;R.oninput=u;u();
});
document.querySelectorAll('[data-ph]').forEach(v=>{
 const x=v.querySelector('input'),o=v.querySelector('[data-out]');
 const u=()=>{let n=+x.value, t=n<7?'Acidic':n>7?'Basic':'Neutral';o.textContent=`pH ${n}: ${t}`};x.oninput=u;u();
});
document.querySelectorAll('[data-energy]').forEach(v=>{
 const x=v.querySelector('input'),o=v.querySelector('[data-out]');
 const u=()=>{let e=+x.value; o.innerHTML=`Producer: ${e} units → Primary consumer: ${(e*.1).toFixed(0)} → Secondary consumer: ${(e*.01).toFixed(0)}`};x.oninput=u;u();
});
document.querySelectorAll('[data-balance]').forEach(v=>{
 const a=v.querySelector('[data-a]'),b=v.querySelector('[data-b]'),c=v.querySelector('[data-c]'),o=v.querySelector('[data-out]');
 const u=()=>{let lm=+a.value,lo=2*(+b.value),rm=+c.value,ro=+c.value;o.textContent=(lm===rm&&lo===ro)?'Balanced ✓ atoms match on both sides':`Left Mg ${lm}, O ${lo} · Right Mg ${rm}, O ${ro}`};[a,b,c].forEach(x=>x.oninput=u);u();
});

// ---------- V2 interactive labs ----------
document.querySelectorAll('[data-balance2]').forEach(v=>{
 const a=v.querySelector('[data-a]'),b=v.querySelector('[data-b]'),c=v.querySelector('[data-c]'),o=v.querySelector('[data-out]');
 const u=()=>{const lm=+a.value,lo=2*(+b.value),rm=+c.value,ro=+c.value;o.textContent=(lm===rm&&lo===ro)?`Balanced ✓ Mg ${lm} = ${rm}, O ${lo} = ${ro}`:`Left: Mg ${lm}, O ${lo} · Right: Mg ${rm}, O ${ro}`};[a,b,c].forEach(x=>x.oninput=u);u();
});
document.querySelectorAll('[data-reaction-lab]').forEach(v=>{const o=v.querySelector('[data-out]');v.querySelectorAll('button').forEach(b=>b.onclick=()=>{o.innerHTML=b.dataset.step==='0'?'Reactants are the starting substances.':b.dataset.step==='1'?'Bonds/arrangements change during the reaction; atoms are conserved.':'Products are new substances formed after the reaction.'})});
document.querySelectorAll('[data-corrosion]').forEach(v=>{const w=v.querySelector('[data-water]'),a=v.querySelector('[data-air]'),s=v.querySelector('[data-salt]'),m=v.querySelector('[data-meter]'),o=v.querySelector('[data-out]');const u=()=>{let score=(w.checked?40:0)+(a.checked?40:0)+(s.checked?20:0);m.style.width=score+'%';o.textContent=score>=80?'High rusting tendency: moisture and oxygen are present.':score>=40?'Limited conditions for rusting.':'Rusting conditions are strongly reduced.'};[w,a,s].forEach(x=>x.onchange=u);u()});
document.querySelectorAll('[data-ph2]').forEach(v=>{const x=v.querySelector('[data-slider]'),n=v.querySelector('[data-num]'),o=v.querySelector('[data-out]');const u=()=>{let p=+x.value;n.textContent=p;o.textContent=p<7?'Acidic — hydrogen ion effect dominates.':p>7?'Basic — hydroxide ion effect dominates.':'Neutral point on this school-level pH scale.'};x.oninput=u;u()});
document.querySelectorAll('[data-ion]').forEach(v=>{const stage=v.querySelector('[data-stage]'),o=v.querySelector('[data-out]');let ions=[];v.querySelectorAll('[data-ionv]').forEach(b=>b.onclick=()=>{ions.push(b.dataset.ionv);stage.innerHTML=ions.map(i=>`<span class="ionBubble">${i}</span>`).join('');o.textContent='Ions present: '+ions.join(', ')});});
document.querySelectorAll('[data-reactivity]').forEach(v=>{const order=['K','Ca','Mg','Al','Zn','Fe','Pb','H','Cu','Ag','Au'];v.querySelector('[data-check]').onclick=()=>{const a=v.querySelector('[data-m1]').value,b=v.querySelector('[data-m2]').value,o=v.querySelector('[data-out]');o.textContent=order.indexOf(a)<order.indexOf(b)?`${a} is higher in the selected series and can displace ${b} from a suitable compound.`:`${a} is not above ${b}; displacement is not predicted by this comparison.`}});
document.querySelectorAll('[data-electron]').forEach(v=>{v.querySelector('[data-transfer]').onclick=()=>{v.querySelector('[data-na]').textContent='Na⁺';v.querySelector('[data-cl]').textContent='Cl⁻';v.querySelector('[data-out]').textContent='Electron transfer creates oppositely charged ions; electrostatic attraction forms the ionic bond.'}});
document.querySelectorAll('[data-metal]').forEach(v=>{v.querySelector('[data-check]').onclick=()=>{const m=v.querySelector('[data-metal-select]').value,c=v.querySelector('[data-condition]').value,o=v.querySelector('[data-out]');o.textContent=`Compare ${m} under ${c}: use the reactivity series and the chapter observations to predict whether reaction is vigorous, slow or absent.`}});
document.querySelectorAll('[data-carbon]').forEach(v=>{const c=v.querySelector('[data-c]'),b=v.querySelector('[data-bond]'),chain=v.querySelector('[data-chain]'),o=v.querySelector('[data-out]');const u=()=>{let n=+c.value,s=b.value==='single'?'—':b.value==='double'?'=':'≡';chain.innerHTML=Array.from({length:n},(_,i)=>`<span class="cAtom">C</span>${i<n-1?`<span class="cBond">${s}</span>`:''}`).join('');o.textContent=`${n} carbon atom(s), ${b.value} C–C bond representation.`};c.oninput=u;b.onchange=u;u()});
document.querySelectorAll('[data-micelle]').forEach(v=>{v.querySelector('[data-start]').onclick=()=>{const h=v.querySelector('[data-heads]');h.innerHTML='';for(let i=0;i<12;i++){let d=document.createElement('span');d.className='soapDot';let ang=i*30*Math.PI/180;d.style.left=`calc(50% + ${Math.cos(ang)*75}px - 12px)`;d.style.top=`calc(50% + ${Math.sin(ang)*75}px - 12px)`;h.appendChild(d)}v.querySelector('[data-out]').textContent='Soap molecules surround oily dirt, forming a micelle that can be carried away in water.'}});
document.querySelectorAll('[data-carbon-reaction]').forEach(v=>{const o=v.querySelector('[data-out]');const m={combustion:'Carbon compound + oxygen → carbon dioxide + water + energy (complete combustion pattern).',oxidation:'Oxidising agents can convert suitable carbon compounds into more oxidised products.',addition:'Unsaturated compounds can add atoms across multiple bonds.',substitution:'In saturated hydrocarbons, one atom/group can be replaced by another under suitable conditions.'};v.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>o.textContent=m[b.dataset.r])});
document.querySelectorAll('[data-pathway]').forEach(v=>{let steps=v.dataset.steps.split('|'),i=-1,stage=v.querySelector('[data-stage]'),o=v.querySelector('[data-out]');stage.innerHTML=steps.map(s=>`<span>${s}</span>`).join('<i>→</i>');const spans=[...stage.querySelectorAll('span')];v.querySelector('[data-next]').onclick=()=>{i=Math.min(i+1,steps.length-1);spans.forEach((s,j)=>s.classList.toggle('active',j<=i));o.textContent=`Step ${i+1}: ${steps[i]}`};v.querySelector('[data-reset]').onclick=()=>{i=-1;spans.forEach(s=>s.classList.remove('active'));o.textContent='Follow the process in order.'}});
document.querySelectorAll('[data-nerve]').forEach(v=>{const spans=[...v.querySelectorAll('.nervePath span')],o=v.querySelector('[data-out]');v.querySelector('[data-fire]').onclick=()=>{spans.forEach((s,i)=>setTimeout(()=>{s.classList.add('active');o.textContent='Impulse moving: '+s.textContent},i*280));setTimeout(()=>spans.forEach(s=>s.classList.remove('active')),spans.length*280+900)}});
document.querySelectorAll('[data-response]').forEach(v=>{const d=v.querySelector('[data-dir]'),stem=v.querySelector('[data-stem]'),o=v.querySelector('[data-out]');const u=()=>{let x=+d.value;stem.style.transform=`rotate(${x/8}deg)`;o.textContent=x>0?'Growth shown toward the selected positive stimulus direction.':x<0?'Growth shown toward the opposite side.':'No directional bias selected.'};d.oninput=u;u()});
document.querySelectorAll('[data-sequence]').forEach(v=>{const o=v.querySelector('[data-out]'),topic=v.dataset.topic;v.querySelectorAll('[data-n]').forEach((b,i)=>b.onclick=()=>{b.classList.add('revealed');o.textContent=`${topic}: stage ${i+1} revealed. Explain what changes from this stage to the next.`})});
document.querySelectorAll('[data-punnett]').forEach(v=>{const gam=g=>g.length===2?[g[0],g[1]]:[g,g];v.querySelector('[data-build]').onclick=()=>{const a=gam(v.querySelector('[data-p1]').value),b=gam(v.querySelector('[data-p2]').value),cells=[a[0]+b[0],a[0]+b[1],a[1]+b[0],a[1]+b[1]].map(x=>x.split('').sort().join(''));v.querySelector('[data-grid]').innerHTML=cells.map(x=>`<div>${x}</div>`).join('');v.querySelector('[data-out]').textContent='Possible genotype combinations: '+cells.join(', ')}}); 
document.querySelectorAll('[data-heredity]').forEach(v=>{v.querySelector('[data-show]').onclick=()=>{const a=v.querySelector('[data-a]').value,b=v.querySelector('[data-b]').value;v.querySelector('[data-out]').textContent=`Offspring allele pair: ${[a,b].sort().join('')}. Connect genotype with the trait rule used in the lesson.`}});
document.querySelectorAll('[data-optics]').forEach(v=>{const x=v.querySelector('[data-u]'),val=v.querySelector('[data-val]'),img=v.querySelector('[data-img]'),o=v.querySelector('[data-out]'),mode=v.dataset.mode;const u=()=>{let d=+x.value;val.textContent=d;let pos=mode==='mirror'?Math.min(90,72+(30-d)/5):Math.min(90,65+(30-d)/6);img.style.left=pos+'%';img.style.height=(110-d/2)+'px';o.textContent=`Object distance ${d} cm. Move the object and relate the image change to focal length and the chapter ray rules.`};x.oninput=u;u()});
document.querySelectorAll('[data-eye]').forEach(v=>{const d=v.querySelector('[data-distance]'),f=v.querySelector('[data-focus]'),def=v.querySelector('[data-defect]'),o=v.querySelector('[data-out]');const u=()=>{let c=def.value,p=c==='Myopia'?58:c==='Hypermetropia'?74:66;f.style.left=p+'%';o.textContent=`${c}: focus shown qualitatively relative to the retina. Object-distance slider = ${d.value} cm. Correction changes effective convergence.`};d.oninput=u;def.onchange=u;u()});
document.querySelectorAll('[data-colour]').forEach(v=>{const w=v.querySelector('[data-wave]'),o=v.querySelector('[data-out]');const u=()=>{let nm=+w.value,c=nm<450?'violet/blue':nm<500?'blue-green':nm<570?'green/yellow':nm<620?'orange':'red';o.textContent=`Approx. ${nm} nm → ${c} region. Shorter visible wavelengths scatter more strongly in the simple school model.`};w.oninput=u;u()});
document.querySelectorAll('[data-ohm2]').forEach(v=>{const V=v.querySelector('[data-v]'),R=v.querySelector('[data-r]'),o=v.querySelector('[data-out]'),vv=v.querySelector('[data-vv]'),rr=v.querySelector('[data-rr]');const u=()=>{vv.textContent=V.value;rr.textContent=R.value;o.textContent=`I = V/R = ${(+V.value/+R.value).toFixed(2)} A`};V.oninput=u;R.oninput=u;u()});
document.querySelectorAll('[data-resistors]').forEach(v=>{const a=v.querySelector('[data-r1]'),b=v.querySelector('[data-r2]'),o=v.querySelector('[data-out]'),m=v.dataset.mode;const u=()=>{let r1=+a.value,r2=+b.value,re=m==='series'?r1+r2:1/(1/r1+1/r2);o.textContent=`R₁=${r1} Ω, R₂=${r2} Ω → Equivalent ${re.toFixed(2)} Ω (${m})`};a.oninput=u;b.oninput=u;u()});
document.querySelectorAll('[data-electric]').forEach(v=>{const V=v.querySelector('[data-v]'),I=v.querySelector('[data-i]'),o=v.querySelector('[data-out]'),t=v.dataset.topic;const u=()=>{let p=+V.value*+I.value;o.textContent=`V=${V.value} V, I=${I.value} A → P = VI = ${p} W. Use this relationship where appropriate for ${t.replaceAll('-',' ')}.`};V.oninput=u;I.oninput=u;u()});
document.querySelectorAll('[data-magnet]').forEach(v=>{const d=v.querySelector('[data-current]'),ring=v.querySelector('[data-ring]'),o=v.querySelector('[data-out]');v.querySelector('[data-toggle]').onclick=()=>{let up=d.value==='up';ring.textContent=up?'↻':'↺';o.textContent=up?'Current direction selected: apply the relevant right-hand/Fleming rule to get field or force direction.':'Current reversed: the corresponding magnetic/force direction reverses in the qualitative model.'}});
document.querySelectorAll('[data-energy2]').forEach(v=>{const e=v.querySelector('[data-e]'),val=v.querySelector('[data-val]'),p=v.querySelector('[data-pyr]'),o=v.querySelector('[data-out]');const u=()=>{let x=+e.value;val.textContent=x;p.innerHTML=[x,x*.1,x*.01,x*.001].map((n,i)=>`<div style="width:${100-i*18}%">${Math.round(n)} units</div>`).join('');o.textContent='Illustrative 10% energy-transfer model across successive trophic levels.'};e.oninput=u;u()});
document.querySelectorAll('[data-waste]').forEach(v=>{const o=v.querySelector('[data-out]'),m={banana:'Biodegradable — microorganisms can break it down.',paper:'Biodegradable under suitable conditions.',plastic:'Non-biodegradable in the chapter-level classification.',glass:'Non-biodegradable in the chapter-level classification.'};v.querySelectorAll('[data-item]').forEach(b=>b.onclick=()=>o.textContent=m[b.dataset.item])});
document.querySelectorAll('[data-ecosystem]').forEach(v=>{let seq=[],o=v.querySelector('[data-out]');v.querySelectorAll('[data-role]').forEach(b=>b.onclick=()=>{seq.push(b.textContent.trim());o.textContent=seq.join(' → ')})});


/* GGSTech Study V4 interactions */
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.v4deep').forEach(root=>{
  const a=root.querySelector('[data-v4a]'), b=root.querySelector('[data-v4b]'), read=root.querySelector('.v4readout'), needle=root.querySelector('.v4needle');
  const update=()=>{ if(!a)return; const av=+a.value,bv=b?+b.value:1; if(read)read.textContent=`Live value: ${av} | comparison: ${(av/bv).toFixed(2)}`; if(needle)needle.style.left=Math.max(0,Math.min(100,(av/14)*100))+'%'; };
  if(a)a.addEventListener('input',update); if(b)b.addEventListener('input',update); update();
  let score=0,done=0;
  root.querySelectorAll('.v4quiz').forEach(q=>{
    q.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{
      if(q.dataset.done)return;q.dataset.done='1';done++;
      const ok=btn.dataset.ok==='1'; if(ok)score++;
      q.querySelector('.v4feedback').textContent=(ok?'✓ Correct. ':'✗ Not quite. ')+q.dataset.explain;
      root.querySelector('.v4score').textContent=`Score: ${score} / ${done}`;
    }));
  });
 });
});


/* ============================================================
   GGSTech Study V5 — TRUE INTERACTIVE VISUALS
   Sliders now change the visual itself, not only text.
   ============================================================ */
(function(){
  function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
  function setText(el,t){if(el) el.textContent=t;}
  function svgAttr(el,k,v){if(el) el.setAttribute(k,String(v));}

  function initV5(root){
    if(root.dataset.v5ready==='1') return;
    root.dataset.v5ready='1';
    const a=root.querySelector('[data-v4a]');
    const b=root.querySelector('[data-v4b]');
    const read=root.querySelector('.v4readout');
    if(!a) return;

    // Make controls meaningful on each visual type.
    const sim=root.querySelector('.v4sim');
    if(!sim) return;

    const isPH=!!sim.querySelector('.v4ph');
    const isCircuit=!!sim.querySelector('.v4wire');
    const isRay=!!sim.querySelector('.v4lens,.v4ray');
    const isMag=!!sim.querySelector('.v4field');
    const isOrgan=!!sim.querySelector('.v4organ');
    const isPunnett=!!sim.querySelector('.v4punnett');
    const isMolecule=!!sim.querySelector('.v4molecule');
    const isProcess=!!sim.querySelector('.v4process');
    const isEco=!!sim.querySelector('.v4eco');

    const la=a.closest('label'), lb=b&&b.closest('label');

    // Add a small live status panel.
    let status=root.querySelector('.v5status');
    if(!status){
      status=document.createElement('div'); status.className='v5status';
      sim.insertAdjacentElement('afterend', status);
    }

    function update(){
      const av=+a.value, bv=b?+b.value:1;

      if(isPH){
        if(la) la.childNodes[0].nodeValue='pH value ';
        if(lb) lb.childNodes[0].nodeValue='Concentration / strength ';
        const needle=sim.querySelector('.v4needle');
        if(needle) needle.style.left=(av/14*100)+'%';
        const type=av<7?'Acidic':av>7?'Basic':'Neutral';
        sim.style.filter=`saturate(${0.8+bv/10})`;
        setText(read,`pH ${av.toFixed(0)} • ${type}`);
        setText(status, av<7?'More H⁺ character → acidic':av>7?'More OH⁻ character → basic':'H⁺ and OH⁻ balanced → neutral');
        return;
      }

      if(isCircuit){
        if(la) la.childNodes[0].nodeValue='Voltage (V) ';
        if(lb) lb.childNodes[0].nodeValue='Resistance (Ω) ';
        const V=av, R=Math.max(1,bv), I=V/R;
        const dot=sim.querySelector('.v4flow');
        if(dot){
          dot.style.animationDuration=clamp(4.8-I*.45,.55,4.8)+'s';
          dot.style.r=String(clamp(8+I*1.2,9,19));
        }
        const component=sim.querySelector('rect');
        if(component){
          component.style.opacity=String(clamp(.45+R/18,.5,1));
          component.setAttribute('stroke-width', String(clamp(2+R/5,2.5,6)));
        }
        setText(read,`V = ${V.toFixed(1)} V • R = ${R.toFixed(1)} Ω • I = ${I.toFixed(2)} A`);
        setText(status, I>2.5?'Higher current: charge flow is faster':'Lower current: resistance limits charge flow');
        return;
      }

      if(isRay){
        if(la) la.childNodes[0].nodeValue='Object distance ';
        if(lb) lb.childNodes[0].nodeValue='Lens / bending strength ';
        const obj=sim.querySelector('.v4obj');
        const rays=[...sim.querySelectorAll('.v4ray')];
        const x=clamp(55+av*10,65,205);
        if(obj){svgAttr(obj,'x1',x);svgAttr(obj,'x2',x);}
        // Rebuild the two principal rays so they visibly move.
        if(rays[0]) rays[0].setAttribute('d',`M${x} 75 L310 75 L${clamp(455+bv*8,470,560)} 180`);
        if(rays[1]) rays[1].setAttribute('d',`M${x} 75 L310 180 L${clamp(470+bv*5,480,555)} ${clamp(125-bv*4,70,120)}`);
        const lens=sim.querySelector('.v4lens');
        if(lens) lens.style.transform=`scaleX(${.75+bv*.04})`;
        setText(read,`Object position ${av} • optical strength ${bv}`);
        setText(status,'Move the object and watch the principal rays change direction and meeting point.');
        return;
      }

      if(isMag){
        if(la) la.childNodes[0].nodeValue='Current strength ';
        if(lb) lb.childNodes[0].nodeValue='Direction control ';
        const fields=[...sim.querySelectorAll('.v4field')];
        fields.forEach((f,i)=>{
          f.style.strokeWidth=String(clamp(1+av/3,2,6));
          f.style.opacity=String(clamp(.25+av/18,.3,1));
          f.style.transformOrigin='310px 130px';
          f.style.transform=`scale(${.82+av*.018+i*.01})`;
        });
        const arrow=sim.querySelector('path[fill="#ff7e45"]');
        if(arrow) arrow.style.transform=bv<5?'rotate(180deg)':'rotate(0deg)';
        if(arrow) arrow.style.transformOrigin='310px 60px';
        setText(read,`Current level ${av} • direction ${bv<5?'reversed':'forward'}`);
        setText(status,'Stronger current makes the represented magnetic field stronger; reversing current reverses field direction.');
        return;
      }

      if(isOrgan){
        if(la) la.childNodes[0].nodeValue='Select / activity level ';
        if(lb) lb.childNodes[0].nodeValue='Process rate ';
        const parts=[...sim.querySelectorAll('.v4organpart')];
        parts.forEach((p,i)=>{
          const active=(i===0?av<=7:av>7);
          p.style.opacity=active?'1':'.35';
          p.style.transformOrigin='center';
          p.style.transform=active?`scale(${1.0+bv*.025})`:'scale(.9)';
          p.style.cursor='pointer';
        });
        const path=sim.querySelector('.v4organpath');
        if(path) path.style.animationDuration=clamp(7-bv*.5,1.1,6.5)+'s';
        setText(read,`Active focus: ${av<=7?'Part A':'Part B'} • process rate ${bv}`);
        setText(status,'Click a coloured part to highlight it; change process rate to see the pathway speed change.');
        return;
      }

      if(isPunnett){
        if(la) la.childNodes[0].nodeValue='Parent A allele choice ';
        if(lb) lb.childNodes[0].nodeValue='Parent B allele choice ';
        const pa=av<=5?'AA':av<=10?'Aa':'aa';
        const pb=bv<=3?'AA':bv<=7?'Aa':'aa';
        function gametes(g){return g==='AA'?['A','A']:g==='aa'?['a','a']:['A','a'];}
        const ga=gametes(pa), gb=gametes(pb), cells=[...sim.querySelectorAll('.v4punnett b')];
        const kids=[ga[0]+gb[0],ga[0]+gb[1],ga[1]+gb[0],ga[1]+gb[1]].map(x=>x==='aA'?'Aa':x);
        cells.forEach((c,i)=>c.textContent=kids[i]);
        const dom=kids.filter(x=>x!=='aa').length;
        setText(read,`Parents ${pa} × ${pb} • dominant phenotype ${dom}/4`);
        setText(status,`Offspring possibilities: ${kids.join(', ')}`);
        return;
      }

      if(isMolecule){
        if(la) la.childNodes[0].nodeValue='Bond angle / movement ';
        if(lb) lb.childNodes[0].nodeValue='Bond length ';
        const atoms=[...sim.querySelectorAll('.v4atom')], bonds=[...sim.querySelectorAll('.v4bond')];
        atoms.forEach((x,i)=>x.style.transform=`translateY(${(i%2?1:-1)*(av-7)*3}px) scale(${.9+bv*.02})`);
        bonds.forEach(x=>x.style.width=(55+bv*7)+'px');
        setText(read,`Structure moved • relative bond length ${55+bv*7}`);
        setText(status,'Changing geometry helps relate displayed structure to bonding and molecular arrangement.');
        return;
      }

      if(isProcess){
        if(la) la.childNodes[0].nodeValue='Process stage ';
        if(lb) lb.childNodes[0].nodeValue='Process speed ';
        const nodes=[...sim.querySelectorAll('.v4process div')];
        const idx=Math.floor((av-1)/14*nodes.length);
        nodes.forEach((n,i)=>{n.classList.toggle('v5active',i===clamp(idx,0,nodes.length-1));});
        sim.style.setProperty('--v5speed',clamp(6-bv*.45,1,5.5)+'s');
        setText(read,`Stage ${clamp(idx+1,1,nodes.length)} of ${nodes.length}`);
        setText(status,'Move through the process one stage at a time and connect each step with its result.');
        return;
      }

      if(isEco){
        if(la) la.childNodes[0].nodeValue='Trophic / pathway level ';
        if(lb) lb.childNodes[0].nodeValue='Energy / impact level ';
        const nodes=[...sim.querySelectorAll('.v4eco .node')];
        const idx=clamp(Math.floor((av-1)/14*nodes.length),0,Math.max(0,nodes.length-1));
        nodes.forEach((n,i)=>{n.classList.toggle('v5active',i===idx); n.style.opacity=i<=idx?'1':'.35';});
        setText(read,`Selected level ${idx+1} • relative energy/impact ${bv}`);
        setText(status,'Trace how matter/energy or environmental effect moves through the displayed system.');
        return;
      }

      setText(read,`Control A ${av} • Control B ${bv}`);
      sim.style.transform=`scale(${.96+av/350})`;
      setText(status,'The model now responds to the controls.');
    }

    // Clickable biology parts.
    sim.querySelectorAll('.v4organpart').forEach((p,i)=>p.addEventListener('click',()=>{
      sim.querySelectorAll('.v4organpart').forEach(x=>x.classList.remove('v5selected'));
      p.classList.add('v5selected');
      setText(status,`Selected Part ${i+1}. Follow its connection with the animated pathway and function.`);
    }));

    a.addEventListener('input',update,{passive:true});
    if(b) b.addEventListener('input',update,{passive:true});
    update();
  }

  function boot(){document.querySelectorAll('.v4deep').forEach(initV5);}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();

function initV6(){document.querySelectorAll('.v6deep').forEach(root=>{let drive=root.querySelector('[data-role=drive]'),opp=root.querySelector('[data-role=opp]'),meter=root.querySelector('.v6meter');function update(){let a=drive?+drive.value:5,b=opp?+opp.value:1;if(meter)meter.textContent=opp?`Live response: ${(a/b).toFixed(2)} (change the controls and compare)`:`Live condition: ${a}`;let e=root.querySelector('.v6electron');if(e)e.style.animation=`v6move ${Math.max(.5,4-a/4)}s linear infinite`;let obj=root.querySelector('.v6obj');if(obj)obj.setAttribute('x1',60+a*12),obj.setAttribute('x2',60+a*12);let ph=root.querySelector('.v6ph i');if(ph)ph.style.left=(a/14*100)+'%';}if(drive)drive.oninput=update;if(opp)opp.oninput=update;update();root.querySelectorAll('[data-part]').forEach(b=>b.onclick=()=>{root.querySelectorAll('[data-part]').forEach(x=>x.classList.remove('active'));b.classList.add('active')});let sc=0,ans=0;root.querySelectorAll('.v6q').forEach(q=>q.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(q.dataset.done)return;q.dataset.done=1;ans++;let ok=b.dataset.ok==='1';if(ok)sc++;q.querySelector('.v6fb').textContent=ok?'✓ Correct — '+q.dataset.explain:'✗ Not this one — '+q.dataset.explain;root.querySelector('.v6score').textContent=`Score: ${sc} / ${ans}`;}));});}document.addEventListener('DOMContentLoaded',initV6);
