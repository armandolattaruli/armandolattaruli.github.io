const link = url => `<a href="${url}" class="link">${url}</a>`;

const sections = [
  { section:'bio', text:'Constantly learning and sharpening my knowledge across all things cybersecurity. I’m a SOC Analyst currently fighting for the good side, but I’m deeply into red-team thinking, Linux internals, and anything involving networks. \nIf it can be analyzed, broken, secured, or all three, I’m probably interested.\n' },
  { section:'internationalExperiences', text:'In September 2021 I moved to the Netherland enrolling in the computer science program.\nIn the summer of 2022, I took part in the "Strategic Thinking" Erasmus project, where I worked for a Maltese company on the development of proctoring software.\n' },

  { section:'workExperience', items:[
    { icon:'fas fa-shield-halved', color:'#4da6ff', text:' SOC Analyst L1/L2 @ Deloitte (Bari), since January 2025' },
    { icon:'fas fa-user-secret', color:'#ff3b3b', text:' Phishing analysis and case-by-case queries with KQL and SPL' },
    { icon:'fas fa-magnifying-glass-chart', color:'#28c840', text:' Alert triage on SIEM/EDR (Splunk, Sentinel, CrowdStrike, Netwitness, SentinelOne)' },
  ]},

  { section:'academicQualifications', 
    items:[
    { icon:'fa fa-graduation-cap', text:` Bachelor degree in Computer Science @ Uniba, 2024.` },
    { icon:'fa fa-gun', color:'#ff3b3b', text:` Currently studying for the EJPT certificaion.` },
  ]},

  // prompt:false = nessun prompt, come nel tuo originale
  { section:'social', items:[
    { icon:'fab fa-github',   text:` GitHub: ${link('https://github.com/armandolattaruli')}` },
    { icon:'fab fa-linkedin', text:` LinkedIn: ${link('https://www.linkedin.com/in/armando-lattaruli')}` },
  ]},

  // raw:true = HTML stampato tutto insieme
  { section:'cv', raw:true, text:'Interested? Request my CV here: <a href="mailto:armandolattaruli@gmail.com?subject=CV%20Request" class="link">armandolattaruli@gmail.com</a>\n' }
];

let i = 0;  // sezione corrente
let j = 0;  // carattere corrente (testo)
let k = 0;  // elemento corrente (liste)

function typeNextChar() {
  if (i >= sections.length) return;

  const sec = sections[i];
  const next = delay => { i++; j = 0; k = 0; setTimeout(typeNextChar, delay); };

  // prompt: una volta sola, all'inizio della sezione
  const isFirst = sec.items ? k === 0 : j === 0;
  if (isFirst && sec.prompt !== false) {
    terminalBody.innerHTML +=
  `\n<span class="prompt-line"><span class="username">armando</span><span class="hostname">@portfolio</span> <span class="path">~/${sec.section}</span></span>`;
  }

  // liste con icona (work experience e social)
  if (sec.items) {
    if (k >= sec.items.length) return next(100);

    const { icon, color = '', text } = sec.items[k++];
    terminalBody.innerHTML +=
      `<span class="list-line"><i class="${icon} bullet-icon" style="color:${color}"></i><span class="text">${text}</span></span>\n`;

    terminalBody.scrollTop = terminalBody.scrollHeight;
    return setTimeout(typeNextChar, 300);
  }

  // HTML renderizzato tutto insieme
  if (sec.raw) {
    terminalBody.innerHTML += sec.text;
    return next(100);
  }

  // testo normale, carattere per carattere
  terminalBody.innerHTML += `<span class="text">${sec.text[j++]}</span>`;
  terminalBody.scrollTop = terminalBody.scrollHeight;

  if (j < sec.text.length) setTimeout(typeNextChar, 1);
  else next(1);
}

typeNextChar();