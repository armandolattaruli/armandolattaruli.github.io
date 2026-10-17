const sections = [
  { section:'bio', text:'Constantly learning and sharpening my knowledge across all things cybersecurity. I’m a SOC Analyst currently fighting for the good side, but I’m deeply into red-team thinking, Linux internals, and anything involving networks. \nIf it can be analyzed, broken, secured, or all three, I’m probably interested.\n' },
  { section:'internationalExperiences', text:'In September 2021 I moved to the Netherland enrolling in the computer science program.\nIn the summer of 2022 I took part' },

  // MODIFICATO: workExperience ora è una lista, formato per riga: icona|colore|testo
  { section:'workExperience', isList:true, text:
    'fa-shield-halved icon |#ffffff|SOC Analyst L1/L2 @ Deloitte (Bari), since January 2025\n' +
    'fa-user-secret|#ff3b3b icon |Phishing analysis and threat hunting with KQL and SPL\n' +
    'fa-magnifying-glass-chart icon |#4da6ff|Alert triage on SIEM/EDR (Splunk, Sentinel, CrowdStrike)\n'
  },

  { section:'academicQualifications', text:'\n' },
  { section:'social', text:'GitHub: https://github.com/armandolattaruli#\nLinkedIn: https://www.linkedin.com/in/armando-lattaruli\n', isSocial:true },
  // { section:'cyber', text:'\n' },
  { section:'cv',  text:'Interested? Request my CV here: <a href="mailto:armandolattaruli@gmail.com?subject=CV%20Request" class="link">armandolattaruli@gmail.com</a>\n' }
];

let i = 0;
let j = 0;
let socialLine = 0;
let listLine = 0; // NUOVO: contatore per le liste

function typeNextChar() {
  if(i >= sections.length) return;

  const sec = sections[i];

  // MODIFICATO: aggiunto && !sec.isList (il prompt delle liste lo stampa il blocco lista)
  if (j === 0 && !sec.isSocial && !sec.isList) {
    const prompt = `\n<span class="username">armando</span><span class="hostname">@portfolio</span> <span class="path">~/${sec.section}</span>\n`;
    terminalBody.innerHTML += prompt;
  }

  // NUOVO: blocco per le liste con icone personalizzate
  if (sec.isList) {
    const lines = sec.text.trim().split('\n');

    // prompt stampato una volta sola, prima della prima riga
    if (listLine === 0) {
      terminalBody.innerHTML +=
        `\n<span class="username">armando</span><span class="hostname">@portfolio</span> <span class="path">~/${sec.section}</span>\n`;
    }

    // finite le righe: passa alla sezione successiva
    if (listLine >= lines.length) {
      listLine = 0;
      i++;
      j = 0;
      setTimeout(typeNextChar, 100);
      return;
    }

    const [iconClass, color, ...rest] = lines[listLine].split('|');
    const text = rest.join('|');

    terminalBody.innerHTML +=
      `<span class="list-line"><i class="fas ${iconClass} bullet-icon" style="color:${color}"></i><span class="text">${text}</span></span>\n`;

    listLine++;
    terminalBody.scrollTop = terminalBody.scrollHeight;
    setTimeout(typeNextChar, 300);
    return;
  }

  if(sec.isSocial) {
    const lines = sec.text.trim().split('\n');
    if(socialLine >= lines.length) {
      socialLine = 0;
      i++;
      j = 0;
      setTimeout(typeNextChar, 100);
      return;
    }

    const line = lines[socialLine];
    let icon = '';
    let url = '';

    if(line.startsWith('GitHub')) { icon = '<i class="fab fa-github icon"></i>'; url = line.split(' ')[1]; }
    else if(line.startsWith('LinkedIn')) { icon = '<i class="fab fa-linkedin icon"></i>'; url = line.split(' ')[1]; }
    else if(line.startsWith('Twitter')) { icon = '<i class="fab fa-twitter icon"></i>'; url = line.split(' ')[1]; }

    terminalBody.innerHTML +=
      `<span class="social-line">${icon}${line.split(':')[0]}: <a href="${url}" class="link">${url}</a></span>\n`;

    socialLine++;
    terminalBody.scrollTop = terminalBody.scrollHeight;

    setTimeout(typeNextChar, 100);
    return;
  }

  // se la sezione contiene HTML, renderizza tutto insieme
  if (sec.section === 'cv') {
    terminalBody.innerHTML += sec.text;
    i++;
    j = 0;
    setTimeout(typeNextChar, 100);
    return;
  }

  // testo normale, carattere per carattere
  const char = sec.text[j];
  terminalBody.innerHTML += `<span class="text">${char}</span>`;
  j++;
  terminalBody.scrollTop = terminalBody.scrollHeight;

  if(j < sec.text.length) setTimeout(typeNextChar, 1);
  else { j = 0; i++; setTimeout(typeNextChar, 1); }
}

typeNextChar();