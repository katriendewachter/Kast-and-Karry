# Kast & Karry op Netlify zetten

Deze map bevat:

- `public/index.html`: de app zelf
- `netlify/functions/lijst.mjs`: de kleine opslag waarmee iedereen met dezelfde gezinscode dezelfde lijst ziet
- `netlify.toml` en `package.json`: instellingen voor Netlify

**Let op:** sleep deze map niet naar Netlify Drop (app.netlify.com/drop). Drop zet alleen de pagina online, zonder de opslag. Dan werkt het delen tussen twee mensen niet. Gebruik daarom de werkwijze via GitHub hieronder.

## Online zetten via GitHub (zonder te programmeren)

1. Maak een gratis account op github.com.
2. Klik rechtsboven op **+** en dan op **New repository**. Geef het de naam `kast-en-karry` en klik op **Create repository**.
3. Klik op **uploading an existing file**. Sleep de **inhoud** van deze map erin, dus de mappen `public` en `netlify` en de bestanden `netlify.toml`, `package.json` en `LEESMIJ.md`. Klik daarna op **Commit changes**.
4. Ga naar app.netlify.com en kies **Add new site** en dan **Import an existing project**. Kies **GitHub** en daarna de repository `kast-en-karry`.
5. Laat alle instellingen staan zoals ze zijn en klik op **Deploy**. Na een minuutje is de app online.
6. Optioneel: geef de site een mooiere naam via **Site configuration** en **Change site name**, bijvoorbeeld `kast-en-karry`.

## Gebruiken

1. Open de site. De app vraagt een **gezinscode**, bijvoorbeeld `boodschappen-4821`.
2. Tik op **Kopieer deellink** en stuur die link naar Bart. Hij komt dan meteen op dezelfde lijst terecht.
3. Zet bij **Looproute** de gangen één keer in de volgorde van de Colruyt in Dendermonde.
4. Vul bij **Vergeet-me-niet** de 10 dingen in die je altijd vergeet.
5. Tik op **Lijst afdrukken**. De app vraagt eerst naar die 10 dingen en opent daarna het printvenster.

## Op de boodschappenlijst

- **Wat hebben we nog nodig?** Typ een of meer producten, gescheiden door komma's. De app zet ze zelf in de juiste gang. Een nieuwe lijst begint leeg.
- **Kies uit alle producten** heeft onderaan **Staat het er niet bij? Voeg het zelf toe**. Kies de gang, en het product komt meteen op de lijst. Lien en Bart vinden het voortaan allebei terug.

- **Onze vaste producten**: Lien en Bart kiezen zelf wat ze het vaakst nodig hebben (via **Aanpassen**). Met één tik staat een product op de lijst, of alles tegelijk met **+ Alles**.
- Staat iets al op de lijst, dan komt het er geen tweede keer op.
- Voor Lien: Duyvis nootjes staan altijd op de lijst. Na het afvinken en wissen komen ze vanzelf terug, en een teller houdt bij hoeveel zakjes er dit jaar gekocht zijn. Uitzetten kan met de schakelaar bij **Onze vaste producten**. 🥜
- **Nu in het seizoen** toont groenten en fruit van deze maand, en rond feestdagen ook wat erbij hoort (Sinterklaas, Kerst, Pasen, barbecue, terug naar school). Tik erop om het op de lijst te zetten.
- **Kies uit alle producten** toont zo'n 800 producten per gang, ook verzorging, huishouden en kantoor & school, met een zoekvak.

- **Wie ben jij?** Kies één keer per gsm Lien of Bart. Naast elk product staat dan een L of B. Bart scoort een nootjespunt als hij Duyvis nootjes op de lijst zet of koopt.

## Weekmenu en wijn

- Kies bij een recept **Plan in…** en een dag. In het tabblad **Week** zie je het menu, en met één knop gaan alle ontbrekende ingrediënten van de week op de lijst.
- **Wijn van de week**: elke week een tip uit een selectie topwijnen van gerenommeerde huizen. Staan er gerechten in het weekmenu, dan kiest de app een wijn die erbij past. Bij elk recept staat ook een wijnsuggestie.
- In **In huis**: is iets op, tik erop en het gaat naar de boodschappenlijst.

## Koken met wat je in huis hebt

In het tabblad **In huis** vul je in wat er in je koelkast en kasten ligt. De app toont dan evenwichtige gerechten uit een ingebouwde verzameling van 23 recepten. Bij elk gerecht zie je wat je al hebt en wat nog ontbreekt. Met één knop zet je de ontbrekende producten op de boodschappenlijst.

Onder **Kies uit alle ingrediënten** staan zo'n 600 producten, per gang gegroepeerd, met een zoekvak. Tik een product aan om het bij "in huis" te zetten. Staat iets er niet bij, dan voegen Lien en Bart het onderaan zelf toe, samen met de gang waar het ligt. Ook op de boodschappenlijst leert de app bij: kies je zelf een gang voor een product, dan onthoudt de app dat voor de volgende keer.

Onder **Mijn favoriete ingrediënten** voeg je je lievelingsproducten toe. Die verschijnen als snelknop, en gerechten met je favorieten komen bovenaan.

Onder **Mijn recepten** bewaar je je eigen lievelingsgerechten, met ingrediënten en bereiding. Met het hartje ♡ bewaar je ook ingebouwde recepten als favoriet. Je favoriete recepten krijgen voorrang, en staan klaar ook als je nog niets invulde bij "Wat heb je in huis?".

Bij **Zoek recepten online** kies je een paar ingrediënten en tik je op een receptensite (Dagelijkse Kost, 15gram, Colruyt, Allerhande en andere). De zoekresultaten openen in een nieuw tabblad.

### Optioneel: de chef (nieuwe ideeën met AI)

De ingebouwde recepten werken meteen en gratis. Wil je ook altijd nieuwe ideeën die op maat gemaakt zijn, dan kun je de chef aanzetten:

1. Maak een account op console.anthropic.com, zet er een klein bedrag op en maak een **API key** aan.
2. Ga in Netlify naar **Site configuration**, dan **Environment variables**, en kies **Add a variable**.
3. Vul als naam `ANTHROPIC_API_KEY` in en plak je sleutel als waarde.
4. Kies **Deploys** en dan **Trigger deploy**. Daarna verschijnt in het tabblad Koken de knop **Vraag de chef**.

Elke vraag aan de chef kost een fractie van een cent. Zonder sleutel blijft de knop gewoon verborgen.

Tip: open de site op je gsm en kies in het browsermenu **Zet op beginscherm**. Dan staat de app tussen je andere apps.

De gezinscode werkt als een sleutel. Wie de code kent, kan de lijst zien en aanpassen. Kies dus iets wat niet te raden is.
