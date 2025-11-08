const terminalBody = document.getElementById('terminal-body');

const sections = [
  { section:'bio', text:'Appassionato di informatica, cybersecurity e automazione. Unisco curiosità tecnica e spirito hacker.\n\n' },
  { section:'esperienze_estero', text:'Viaggi studio e progetti tech in diversi paesi europei, esplorando culture e metodologie diverse.\n\n' },
  { section:'esperienze_lavorative', text:'Collaborazioni in ambito cybersecurity, analisi vulnerabilità e sviluppo software orientato alla sicurezza.\n\n' },
  { section:'titoli', text:'Laurea in Informatica, corsi avanzati in sicurezza informatica, sviluppo backend e automazione.\n\n' },
  { section:'social', text:'GitHub: https://github.com/#\nLinkedIn: https://linkedin.com/#\nTwitter: https://twitter.com/#\n\n', isSocial:true },
  { section:'cyber', text:'Esperienza con strumenti SIEM ed EDR, analisi incidenti e processi di hardening.\n' },
  { section:'cv', text:'Download CV: [link placeholder]\n' }
];

let i=0, j=0;
function typeNextChar() {
  if(i>=sections.length) return;

  const sec = sections[i];

  if(j===0) {
    // scrivi prompt
    const prompt = `<span class="username">armando</span><span class="hostname">@${sec.section}</span> <span class="path">~/portfolio</span>\n`;
    terminalBody.innerHTML += prompt;
  }

  const char = sec.text[j];

  if(sec.isSocial) {
    // sostituisci link con icona
    const lineEnd = sec.text.indexOf('\n', j);
    if(lineEnd>0) {
      const line = sec.text.substring(j,lineEnd);
      let icon = '';
      if(line.startsWith('GitHub')) icon = '<i class="fab fa-github icon"></i>';
      if(line.startsWith('LinkedIn')) icon = '<i class="fab fa-linkedin icon"></i>';
      if(line.startsWith('Twitter')) icon = '<i class="fab fa-twitter icon"></i>';
      terminalBody.innerHTML += icon + line.split(':')[0] + ': <a href="'+line.split(' ')[1]+'" class="link">'+line.split(' ')[1]+'</a>\n';
      j = lineEnd+1;
      i++;
      setTimeout(typeNextChar, 200);
      return;
    }
  } else {
    terminalBody.innerHTML += `<span class="text">${char}</span>`;
    j++;
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  if(j<sec.text.length) setTimeout(typeNextChar, 20);
  else { j=0; i++; setTimeout(typeNextChar, 100);}
}

typeNextChar();
