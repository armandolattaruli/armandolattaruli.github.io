const sections = [
  { section:'bio', text:'\n' },
  { section:'esperienze_estero', text:'\n' },
  { section:'esperienze_lavorative', text:'\n' },
  { section:'titoli', text:'\n' },
  { section:'social', text:'GitHub: https://github.com/#\nLinkedIn: https://linkedin.com/#\nTwitter: https://twitter.com/#\n', isSocial:true },
  { section:'cyber', text:'\n' },
  { section:'cv', text:'Download CV: [link placeholder]\n' }
];

let i = 0;
let j = 0;
let socialLine = 0;

function typeNextChar() {
  if(i >= sections.length) return;

  const sec = sections[i];

  // se è la prima lettera della sezione, stampa il prompt
  if(j === 0 && !sec.isSocial) {
    const prompt = `<span class="username">armando</span><span class="hostname">@${sec.section}</span> <span class="path">~/portfolio</span>\n`;
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

    terminalBody.innerHTML += icon + line.split(':')[0] + ': <a href="'+url+'" class="link">'+url+'</a>\n';
    socialLine++;
    terminalBody.scrollTop = terminalBody.scrollHeight;

    setTimeout(typeNextChar, 50);
    return;
  }

  // testo normale
  const char = sec.text[j];
  terminalBody.innerHTML += `<span class="text">${char}</span>`;
  j++;
  terminalBody.scrollTop = terminalBody.scrollHeight;

  if(j < sec.text.length) setTimeout(typeNextChar, 20);
  else { j = 0; i++; setTimeout(typeNextChar, 100); }
}

typeNextChar();
