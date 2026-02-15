const sections = [
  { section:'bio', text:'Constantly learning and sharpening my knowledge across all things cybersecurity. I’m a SOC Analyst currently fighting for the good side, but I’m deeply into red-team thinking, Linux internals, and anything involving networks. \nIf it can be analyzed, broken, secured, or all three, I’m probably interested.\n' },
  { section:'internationalExperiences', text:'\n' },
  { section:'workExperience', text:'\n' },
  { section:'academicQualifications', text:'\n' },
  { section:'social', text:'GitHub: https://github.com/#\nLinkedIn: https://linkedin.com/#\n', isSocial:true },
  // { section:'cyber', text:'\n' },
  { section:'cv',  text:'Interested? Request my CV here: <a href="mailto:armandolattaruli@gmail.com?subject=CV%20Request" class="link">armandolattaruli@gmail.com</a>\n' }
];

let i = 0;
let j = 0;
let socialLine = 0;

function typeNextChar() {
  if(i >= sections.length) return;

  const sec = sections[i];

  // se è la prima lettera della sezione, stampa il prompt
if (j === 0 && !sec.isSocial) {
  const prompt = `\n<span class="username">armando</span><span class="hostname">@portfolio</span> <span class="path">~/${sec.section}</span>\n`;
  terminalBody.innerHTML += prompt;
}


  if(sec.isSocial) {
    // social: processa riga per riga
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
    //  more lines for each social icon??

    terminalBody.innerHTML +=
      `<span class="social-line">${icon}${line.split(':')[0]}: <a href="${url}" class="link">${url}</a></span>\n`;


    socialLine++;
    terminalBody.scrollTop = terminalBody.scrollHeight;

    setTimeout(typeNextChar, 100);
    return;
  }

  // testo normale
  // if section contains HTML, render all at once
if (sec.section === 'cv') {
  terminalBody.innerHTML += sec.text;
  i++;
  j = 0;
  setTimeout(typeNextChar, 100);
  return;
}

  const char = sec.text[j];
  terminalBody.innerHTML += `<span class="text">${char}</span>`;
  j++;
  terminalBody.scrollTop = terminalBody.scrollHeight;

  if(j < sec.text.length) setTimeout(typeNextChar, 20);
  else { j = 0; i++; setTimeout(typeNextChar, 100); }
}

typeNextChar();
