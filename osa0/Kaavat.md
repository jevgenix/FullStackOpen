https://www.websequencediagrams.com/

# 0.4 uusi muistiinpano

note over selain:
Lähetetään uusi muistiinpano
end note

selain->palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

note over palvelin:
new_note tilakoodi 302,
HTTP suorittaa uudelleenohjauksen
end note

palvelin-->selain: uusi HTTP GET /notes pyyntö

note over selain:
Selain lähettää uuden GET kutsun,
palvelin palauttaa /notes html-koodi
end note

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
palvelin-->selain: HTML-koodi

note over selain:
/notes sivu latautuu uudelleen
end note

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
palvelin-->selain: main.css
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
palvelin-->selain: main.js

note over selain:
selain alkaa suorittaa js-koodia
joka pyytää JSON-datan palvelimelta
end note

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
palvelin-->selain: [{ content: "HTML on helppoa", date: "2019-01-01" }, ...]

note over selain:
selain suorittaa tapahtumankäsittelijän
joka renderöi muistiinpanot näytölle
end note

# 0.5 Tehtävä 0.5 Single Page App

title Tehtävä 0.5 Single Page App

note over selain:
Avataan spa
end note

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
palvelin-->selain: HTTP vastaus (304) & HTML-koodi

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
palvelin-->selain: main.css
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
palvelin-->selain: spa.js

note over selain:
selain alkaa suorittaa js-koodia
joka pyytää JSON-datan palvelimelta
end note

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
note over selain:
Palauttaa JSON-muodossa
olevat muistiinpanot
end note
palvelin-->selain: [{ content: "HTML on helppoa", date: "2019-01-01" }, ...]

note over selain:
selain suorittaa tapahtumankäsittelijän
joka renderöi muistiinpanot näytölle
end note

# 0.6 Tehtävä 0.6 Uusi muistiinpano SPA

title Tehtävä 0.6 Uusi muistiinpano SPA

note over selain:
Selain lähettää pelvelimelle
uuden muistiinpanon
JSON-muodossa
end note

selain->palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

note over palvelin:
Palvelin lisää uuden JSON-datan listaan,
sekä palauttaa 201 tilakoodin
end note

palvelin-->selain: HTTP 201 tilakoodi, {"message":"note created"}

note over selain:
Viestin näemme konsolissa
console.log(this.responseText)
end note
