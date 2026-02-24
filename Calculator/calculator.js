// ══════ State ══════
const state = {
    expression: '', justCalc: false, angleMode: 'rad', currentMode: 'basic',
    activeOp: null, memory: 0, hasMemory: false, history: [],
    touchStartX: 0, theme: localStorage.getItem('calc-theme') || 'dark'
};

// ══════ DOM Refs ══════
const $ = id => document.getElementById(id);
const displayEl = $('display'), exprEl = $('expr'), memInd = $('memIndicator'),
      backBtn = $('backspaceBtn'), copyToast = $('copyToast'),
      helpOverlay = $('helpOverlay'), histOverlay = $('historyOverlay'),
      histList = $('historyList'), histEmpty = $('historyEmpty');

// ══════ Expression Parser (safe, no eval) ══════
function tokenize(expr) {
    const tokens = []; let i = 0;
    while (i < expr.length) {
        if (/\s/.test(expr[i])) { i++; continue; }
        if (/[0-9.]/.test(expr[i])) {
            let n = '';
            while (i < expr.length && /[0-9.]/.test(expr[i])) n += expr[i++];
            tokens.push({ t: 'NUM', v: parseFloat(n) });
            if (isNaN(tokens[tokens.length-1].v)) throw new Error('Bad number');
            continue;
        }
        if (expr[i]==='<'&&expr[i+1]==='<') { tokens.push({t:'LSH'}); i+=2; continue; }
        if (expr[i]==='>'&&expr[i+1]==='>') { tokens.push({t:'RSH'}); i+=2; continue; }
        const map = {'+':'ADD','-':'SUB','*':'MUL','/':'DIV','%':'MOD','^':'POW',
                     '&':'BAND','|':'BOR','\u2295':'BXOR','(':'LP',')':'RP'};
        if (map[expr[i]]) { tokens.push({t:map[expr[i]]}); i++; continue; }
        throw new Error('Unknown: '+expr[i]);
    }
    return tokens;
}

class Parser {
    constructor(tokens) { this.tk=tokens; this.p=0; }
    peek() { return this.tk[this.p]; }
    eat() { return this.tk[this.p++]; }
    parse() {
        if (!this.tk.length) return 0;
        const r = this.expr();
        if (this.p < this.tk.length) throw new Error('Unexpected token');
        return r;
    }
    expr() { return this.bor(); }
    bor() { let l=this.bxor(); while(this.peek()?.t==='BOR'){this.eat();l=(l|0)|(this.bxor()|0);} return l; }
    bxor() { let l=this.band(); while(this.peek()?.t==='BXOR'){this.eat();l=(l|0)^(this.band()|0);} return l; }
    band() { let l=this.shift(); while(this.peek()?.t==='BAND'){this.eat();l=(l|0)&(this.shift()|0);} return l; }
    shift() {
        let l=this.add();
        while(this.peek()?.t==='LSH'||this.peek()?.t==='RSH') {
            const op=this.eat().t; const r=this.add();
            l=op==='LSH'?(l|0)<<(r|0):(l|0)>>(r|0);
        }
        return l;
    }
    add() {
        let l=this.mul();
        while(this.peek()?.t==='ADD'||this.peek()?.t==='SUB') {
            const op=this.eat().t; const r=this.mul();
            l=op==='ADD'?l+r:l-r;
        }
        return l;
    }
    mul() {
        let l=this.pow();
        while(this.peek()?.t==='MUL'||this.peek()?.t==='DIV'||this.peek()?.t==='MOD') {
            const op=this.eat().t; const r=this.pow();
            if(op==='MUL') l*=r; else if(op==='DIV'){if(r===0)throw new Error('÷0');l/=r;} else l%=r;
        }
        return l;
    }
    pow() { const b=this.unary(); if(this.peek()?.t==='POW'){this.eat();return Math.pow(b,this.pow());}return b; }
    unary() {
        if(this.peek()?.t==='SUB'){this.eat();return -this.unary();}
        if(this.peek()?.t==='ADD'){this.eat();return this.unary();}
        return this.atom();
    }
    atom() {
        const tk=this.peek();
        if(!tk) throw new Error('Unexpected end');
        if(tk.t==='NUM'){this.eat();return tk.v;}
        if(tk.t==='LP'){this.eat();const v=this.expr();if(this.peek()?.t!=='RP')throw new Error('Missing )');this.eat();return v;}
        throw new Error('Unexpected: '+tk.t);
    }
}

function safeEval(expr) {
    expr = expr.replace(/[\+\-\*\/\%\^\&\|\u2295]$/, '').replace(/(<<|>>)$/, '');
    if (!expr || expr === '-') return 0;
    return new Parser(tokenize(expr)).parse();
}

function roundN(n) { return isFinite(n) ? parseFloat(n.toPrecision(12)) : n; }
function factorial(n) { if(n>170)return Infinity; let r=1; for(let i=2;i<=n;i++)r*=i; return r; }
function toRad(d) { return d*Math.PI/180; }
function toDeg(r) { return r*180/Math.PI; }

// ══════ Display ══════
function setDisplay(val) {
    const s = String(val);
    displayEl.className = 'main-display';
    if (s.length > 18) displayEl.classList.add('sm');
    else if (s.length > 12) displayEl.classList.add('md');
    displayEl.textContent = s;
    backBtn.classList.toggle('visible', state.expression.length > 0);
}

function showErr(msg) {
    displayEl.className = 'main-display err';
    displayEl.textContent = msg || 'Error';
    state.expression = ''; state.justCalc = false;
    backBtn.classList.remove('visible');
    setTimeout(() => setDisplay('0'), 1600);
}

// ══════ Calculator Operations ══════
function appendNum(n) {
    if (state.justCalc) { state.expression = ''; state.justCalc = false; }
    state.expression += n;
    setDisplay(state.expression);
    exprEl.textContent = '';
    clearActiveOp();
}

function appendDot() {
    if (state.justCalc) { state.expression = '0'; state.justCalc = false; }
    const parts = state.expression.split(/[\+\-\*\/\%\^\&\|\u2295]|<<|>>/);
    const last = parts[parts.length - 1];
    if (!last.includes('.')) {
        if (!last) state.expression += '0';
        state.expression += '.';
    }
    setDisplay(state.expression);
}

function insertOp(op) {
    state.justCalc = false;
    if (state.expression === '' && op === '-') { state.expression = '-'; }
    else if (state.expression) {
        state.expression = state.expression.replace(/[\+\-\*\/\%\^\&\|\u2295]+$/, '').replace(/(<<|>>)$/, '') + op;
    }
    setDisplay(state.expression);
    setActiveOp(op);
}

function clearAll() {
    state.expression = ''; state.justCalc = false;
    setDisplay('0'); exprEl.textContent = '';
    clearActiveOp();
}

function backspace() {
    if (state.expression.length > 0) {
        state.expression = state.expression.slice(0, -1);
        setDisplay(state.expression || '0');
    }
}

function toggleSign() {
    try { let v = safeEval(state.expression || '0'); state.expression = String(-v); setDisplay(state.expression); } catch(e) {}
}

function calcPct() {
    try { let v = safeEval(state.expression || '0'); state.expression = String(v/100); setDisplay(state.expression); } catch(e) {}
}

function calcFn(fn) {
    let val;
    try { val = safeEval(state.expression || '0'); } catch(e) { showErr(); return; }
    let r;
    const deg = state.angleMode === 'deg';
    switch(fn) {
        case 'sin': r=Math.sin(deg?toRad(val):val); break;
        case 'cos': r=Math.cos(deg?toRad(val):val); break;
        case 'tan': r=Math.tan(deg?toRad(val):val); break;
        case 'asin': r=deg?toDeg(Math.asin(val)):Math.asin(val); break;
        case 'acos': r=deg?toDeg(Math.acos(val)):Math.acos(val); break;
        case 'atan': r=deg?toDeg(Math.atan(val)):Math.atan(val); break;
        case 'log': r=Math.log10(val); break;
        case 'ln': r=Math.log(val); break;
        case 'log2': r=Math.log2(val); break;
        case 'exp': r=Math.exp(val); break;
        case 'sqrt': r=Math.sqrt(val); break;
        case 'cbrt': r=Math.cbrt(val); break;
        case 'sqr': r=val*val; break;
        case 'abs': r=Math.abs(val); break;
        case 'inv': r=1/val; break;
        case 'fact':
            if(val<0||val!==Math.floor(val)){showErr('DOMAIN ERROR');return;}
            r=factorial(val); break;
    }
    if(!isFinite(r)){showErr(r>0?'∞':r<0?'−∞':'ERROR');return;}
    exprEl.textContent=fn+'('+roundN(val)+') =';
    state.expression=String(roundN(r)); setDisplay(roundN(r)); state.justCalc=true;
}

function calculate() {
    if (!state.expression) return;
    try {
        exprEl.textContent = formatExprDisplay(state.expression) + ' =';
        let r = safeEval(state.expression);
        r = roundN(r);
        if (!isFinite(r)) { showErr(r > 0 ? '∞' : '−∞'); return; }
        addHistory(state.expression, r);
        state.expression = String(r);
        setDisplay(r); state.justCalc = true;
        clearActiveOp();
    } catch(e) { showErr(e.message === '÷0' ? 'Cannot divide by zero' : undefined); }
}

function formatExprDisplay(expr) {
    return expr.replace(/\*/g,'×').replace(/\//g,'÷').replace(/\u2295/g,' XOR ');
}

// ══════ Programmer Mode ══════
function insertBit(op) {
    state.justCalc = false;
    state.expression += op;
    setDisplay(state.expression);
}

function flipBits() {
    try { let v=Math.floor(safeEval(state.expression||'0')); state.expression=String(~v); setDisplay(state.expression); state.justCalc=true; } catch(e){showErr();}
}

function convertBase(base) {
    try {
        let v = Math.floor(safeEval(state.expression||'0')), r;
        switch(base) {
            case 'hex': r='0x'+v.toString(16).toUpperCase(); break;
            case 'bin': r='0b'+v.toString(2); break;
            case 'oct': r='0o'+v.toString(8); break;
            case 'dec': r=String(v); break;
        }
        exprEl.textContent = v+' → '+base.toUpperCase();
        state.expression = String(v); setDisplay(r); state.justCalc = true;
    } catch(e) { showErr(); }
}

// ══════ Active Operator ══════
function setActiveOp(op) {
    clearActiveOp();
    const map = {'/':'div','*':'mul','-':'sub','+':'add'};
    if (map[op]) {
        const btn = document.querySelector('.op-'+map[op]);
        if (btn) { btn.classList.add('op-active'); state.activeOp = btn; }
    }
}
function clearActiveOp() { if (state.activeOp) { state.activeOp.classList.remove('op-active'); state.activeOp = null; } }

// ══════ Memory ══════
function memOp(op) {
    try {
        const v = safeEval(state.expression || '0');
        switch(op) {
            case 'MC': state.memory=0; state.hasMemory=false; break;
            case 'MR': state.expression=String(state.memory); setDisplay(state.memory); state.justCalc=true; break;
            case 'M+': state.memory+=v; state.hasMemory=true; break;
            case 'M-': state.memory-=v; state.hasMemory=true; break;
        }
        memInd.classList.toggle('visible', state.hasMemory);
    } catch(e) {}
}

// ══════ History ══════
function addHistory(expr, result) {
    state.history.unshift({ expr: formatExprDisplay(expr), result: String(result), time: Date.now() });
    if (state.history.length > 20) state.history.pop();
    renderHistory();
}
function renderHistory() {
    histEmpty.style.display = state.history.length ? 'none' : 'block';
    histList.innerHTML = state.history.map((h, i) =>
        `<div class="history-entry" data-idx="${i}"><div class="history-expr">${h.expr} =</div><div class="history-result">${h.result}</div></div>`
    ).join('');
}
function loadHistory(idx) {
    const h = state.history[idx];
    if (h) { state.expression = h.result; setDisplay(h.result); state.justCalc = true; closeOverlay('historyOverlay'); }
}
function clearHistory() { state.history = []; renderHistory(); }

// ══════ Mode & Angle ══════
function setMode(mode, el) {
    state.currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    $('sciRow').style.display = mode==='sci'?'grid':'none';
    $('memRow').style.display = mode==='sci'?'grid':'none';
    $('progRow').style.display = mode==='prog'?'grid':'none';
}
function setAngle(mode) {
    state.angleMode = mode;
    $('pillDeg').classList.toggle('active', mode==='deg');
    $('pillRad').classList.toggle('active', mode==='rad');
}

// ══════ Insert Const ══════
function insertConst(val, label) {
    if (state.justCalc) { state.expression = ''; state.justCalc = false; }
    state.expression += String(val);
    setDisplay(label);
}

// ══════ Overlays ══════
function openOverlay(id) { $(id).classList.add('open'); }
function closeOverlay(id) { $(id).classList.remove('open'); }

// ══════ Copy to Clipboard ══════
function copyResult() {
    const text = displayEl.textContent;
    if (!text || text === '0' || text === 'Error') return;
    navigator.clipboard.writeText(text).then(() => {
        copyToast.classList.add('show');
        setTimeout(() => copyToast.classList.remove('show'), 1200);
    }).catch(() => {});
}

// ══════ Theme ══════
function setTheme(t) {
    state.theme = t;
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('calc-theme', t);
    $('themeBtn').textContent = t === 'dark' ? '☀️' : '🌙';
}

// ══════ Live Clock ══════
function updateClock() {
    const now = new Date();
    $('statusTime').textContent = now.toLocaleTimeString([], { hour:'numeric', minute:'2-digit' });
}

// ══════ Haptic ══════
function haptic() { if (navigator.vibrate) navigator.vibrate(10); }

// ══════ Event Delegation ══════
document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action],[data-num],[data-op],[data-fn],[data-bit],[data-base],[data-mem],[data-mode]');
    if (!btn) return;
    haptic();
    if (btn.dataset.num !== undefined) { appendNum(btn.dataset.num); return; }
    if (btn.dataset.op !== undefined) { insertOp(btn.dataset.op); return; }
    if (btn.dataset.fn !== undefined) { calcFn(btn.dataset.fn); return; }
    if (btn.dataset.bit !== undefined) { insertBit(btn.dataset.bit); return; }
    if (btn.dataset.base !== undefined) { convertBase(btn.dataset.base); return; }
    if (btn.dataset.mem !== undefined) { memOp(btn.dataset.mem); return; }
    if (btn.dataset.mode !== undefined) { setMode(btn.dataset.mode, btn); return; }
    switch(btn.dataset.action) {
        case 'clear': clearAll(); break;
        case 'toggleSign': toggleSign(); break;
        case 'percent': calcPct(); break;
        case 'calculate': calculate(); break;
        case 'dot': appendDot(); break;
        case 'backspace': backspace(); break;
        case 'flipBits': flipBits(); break;
        case 'insertPi': insertConst(Math.PI,'π'); break;
        case 'insertE': insertConst(Math.E,'e'); break;
        case 'openHelp': openOverlay('helpOverlay'); break;
        case 'openHistory': openOverlay('historyOverlay'); break;
        case 'closeHelp': closeOverlay('helpOverlay'); break;
        case 'closeHistory': closeOverlay('historyOverlay'); break;
        case 'clearHistory': clearHistory(); break;
        case 'toggleTheme': setTheme(state.theme==='dark'?'light':'dark'); break;
        case 'setDeg': setAngle('deg'); break;
        case 'setRad': setAngle('rad'); break;
    }
});

// Overlay background click
[helpOverlay, histOverlay].forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
});

// History entry click
histList.addEventListener('click', e => {
    const entry = e.target.closest('.history-entry');
    if (entry) loadHistory(parseInt(entry.dataset.idx));
});

// Display click to copy
displayEl.addEventListener('click', copyResult);

// ══════ Keyboard ══════
document.addEventListener('keydown', e => {
    if (helpOverlay.classList.contains('open') || histOverlay.classList.contains('open')) {
        if (e.key === 'Escape') { helpOverlay.classList.remove('open'); histOverlay.classList.remove('open'); }
        return;
    }
    if (e.key >= '0' && e.key <= '9') appendNum(e.key);
    else if (e.key === '.') appendDot();
    else if (e.key === '+') insertOp('+');
    else if (e.key === '-') insertOp('-');
    else if (e.key === '*') insertOp('*');
    else if (e.key === '/') { e.preventDefault(); insertOp('/'); }
    else if (e.key === '%') insertOp('%');
    else if (e.key === '^') insertOp('^');
    else if (e.key === '(' || e.key === ')') { state.expression += e.key; setDisplay(state.expression); }
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Backspace') backspace();
    else if (e.key === 'Escape') clearAll();
});

// ══════ Swipe to Delete ══════
const dispArea = $('displayArea');
dispArea.addEventListener('touchstart', e => { state.touchStartX = e.touches[0].clientX; }, { passive: true });
dispArea.addEventListener('touchend', e => {
    const dx = state.touchStartX - e.changedTouches[0].clientX;
    if (dx > 50) { backspace(); haptic(); }
});

// ══════ iOS Active Fix ══════
document.querySelectorAll('.btn').forEach(b => b.addEventListener('touchstart', ()=>{}, {passive:true}));

// ══════ Init ══════
setTheme(state.theme);
updateClock();
setInterval(updateClock, 1000);
renderHistory();
