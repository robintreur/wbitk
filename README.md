# WBITK

## Inleiding
Mijn game heet WBITK. In dit spel moet je zorgen dat alle items schoon blijven. Als je bijv. naar een keukenblok kijkt, zie je de teller aflopen. Zorg ervoor dat de teller niet op nul komt. Dit doe je door naar het item te kijken en op de spatiebar te drukken. Je kunt met de toetsen W A S & D door de kamer heen lopen.

## Speelbare game
http://www.womenbelonginthe.kitchen

## Installatie
Om de game te installeren op een server moet je ```npm run-script build``` uitvoeren. Als je dit gedaan hebt, moet je alle bestanden uit de folder "docs" plaatsen op je server.

## Klassendiagram
![alt text](http://wbitk.robintreur.nl/uml.png)

## Pull request link
https://github.com/markjhvonk/webgl-game/pull/1

## Peer review link
https://github.com/markjhvonk/webgl-game/issues/2

## OOP ontwerptechnieken:

### Singleton
De singleton heb ik toegepast in de clickableModel class. Als je op een clickableModel item klikt (door er naar te kijken en op spatiebar te drukken) dan wordt de womanGoToPosition() functie in game aangeroepen.

### Polymorfisme
Polymorfisme heb ik op 2 plekken toegepast:
De eerste plek is de clickableModel class, die extends de model class. De clickableModel hebben als extra een "count down" om te zien hoe vies deze items zijn. Ook kun je op deze items klikken (door er naar te kijken en dan op de spatiebar te drukken.)
De tweede plek is bij de posCharacter class, die extends de character class. De posCharacter class heeft als extra functie dat je de positie en rotatie van de character kan aangeven.

### Strategy
De strategy heb ik toegepast in de Character class. De character (roze poppetje) kan 2 verschillende behaviours krijgen, zij kan "lopen" of "werken". 

### Observer
Het observer pattern heb ik toegepast bij de clickableModel. De clickableModel items kunnen zich "subscriben" bij de character. Als er een clickableModel item vies is (onder de 50% zit) dan kan je op de character klikken en worden alle items 5% schoner.