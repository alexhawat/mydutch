export const grammarLessons = [
  {
    id: 1,
    title: "Dutch Pronunciation Guide",
    level: "Beginner",
    content: `
## Key Pronunciation Rules

### Vowels
- **a** - Like 'a' in "father" (e.g., kaas)
- **e** - Like 'e' in "bed" (e.g., eten)
- **i** - Like 'i' in "bit" (e.g., vis)
- **o** - Like 'o' in "pot" (e.g., op)
- **u** - Like 'u' in "put" but rounded (e.g., nu)

### Special Sounds
- **ij/ei** - Pronounced the same, like "eye" (e.g., ei, fijn)
- **ou/au** - Like "ow" in "how" (e.g., oud, blauw)
- **ui** - Unique Dutch sound, no English equivalent (e.g., huis)
- **eu** - Like French "eu" (e.g., neus)
- **oe** - Like "oo" in "boot" (e.g., boek)

### Consonants
- **g/ch** - Guttural sound from the throat (e.g., goed, nacht)
- **j** - Like 'y' in "yes" (e.g., ja)
- **v** - Between English 'v' and 'f' (e.g., vader)
- **w** - Between English 'w' and 'v' (e.g., water)
- **sch** - "s" + guttural "ch" (e.g., school)

### Tips
- Double vowels are held longer (aa, ee, oo)
- Double consonants shorten the preceding vowel
- Final consonants are often devoiced (d → t, v → f)
    `,
    examples: [
      { dutch: "Goedemorgen", breakdown: "KHOO-duh-MOR-khun" },
      { dutch: "Alsjeblieft", breakdown: "AHL-syuh-bleeft" },
      { dutch: "Natuurlijk", breakdown: "nah-TOOR-luk" }
    ]
  },

  {
    id: 2,
    title: "Personal Pronouns",
    level: "Beginner",
    content: `
## Subject Pronouns

| Dutch | English | Example |
|-------|---------|---------|
| ik | I | Ik ben Jan |
| jij/je | you (informal) | Jij bent aardig |
| u | you (formal) | U bent de baas |
| hij | he | Hij werkt hard |
| zij/ze | she | Zij is mooi |
| het | it | Het is koud |
| wij/we | we | Wij leren Nederlands |
| jullie | you (plural) | Jullie zijn laat |
| zij/ze | they | Zij komen morgen |

## Object Pronouns

| Dutch | English |
|-------|---------|
| mij/me | me |
| jou/je | you |
| hem | him |
| haar | her |
| ons | us |
| jullie | you (plural) |
| hen/hun | them |

### Usage Tips
- Use "jij/je" with friends, family, children
- Use "u" with strangers, elderly, formal situations
- "Je" and "ze" are unstressed, shorter forms
    `,
    examples: [
      { dutch: "Ik zie je morgen", english: "I'll see you tomorrow" },
      { dutch: "Hij geeft het aan haar", english: "He gives it to her" },
      { dutch: "Wij helpen jullie", english: "We help you (plural)" }
    ]
  },

  {
    id: 3,
    title: "Present Tense Verbs",
    level: "Beginner",
    content: `
## Regular Verb Conjugation

### Pattern: Zijn (to be) - Irregular
- ik ben
- jij/je bent
- u bent
- hij/zij/het is
- wij/we zijn
- jullie zijn
- zij/ze zijn

### Pattern: Hebben (to have) - Irregular
- ik heb
- jij/je hebt
- u hebt/heeft
- hij/zij/het heeft
- wij/we hebben
- jullie hebben
- zij/ze hebben

### Regular Verbs: Werken (to work)
- ik werk
- jij/je werkt
- u werkt
- hij/zij/het werkt
- wij/we werken
- jullie werken
- zij/ze werken

### Rules
1. Find the stem: remove -en from infinitive (werken → werk)
2. Add endings:
   - ik: stem
   - jij/je: stem + t
   - hij/zij/het: stem + t
   - wij/jullie/zij: infinitive (stem + en)

### Spelling Rules
- Verbs ending in -t: don't add extra t (praten → jij praat)
- Short vowel in stem: double consonant (zitten → ik zit)
- Long vowel: keep single consonant (maken → ik maak)
    `,
    examples: [
      { dutch: "Ik werk in Amsterdam", english: "I work in Amsterdam" },
      { dutch: "Jij hebt een fiets", english: "You have a bicycle" },
      { dutch: "Wij zijn gelukkig", english: "We are happy" }
    ]
  },

  {
    id: 4,
    title: "Word Order",
    level: "Beginner",
    content: `
## Basic Word Order: SVO

Dutch follows Subject-Verb-Object order in main clauses:

**Subject + Verb + Object**

Examples:
- Ik eet een appel (I eat an apple)
- Hij leest een boek (He reads a book)
- Wij drinken koffie (We drink coffee)

## Inversion

When starting with something other than the subject, the verb comes second and subject follows:

**Time/Place + Verb + Subject + Rest**

Examples:
- Morgen ga ik naar Amsterdam (Tomorrow I go to Amsterdam)
- In de zomer zwemmen wij veel (In summer we swim a lot)
- Nu drink ik koffie (Now I drink coffee)

## Questions

### Yes/No Questions
Verb comes first:
- Werk jij hier? (Do you work here?)
- Is het koud? (Is it cold?)

### Wh-Questions
Question word + verb + subject:
- Waar woon jij? (Where do you live?)
- Wat doe je? (What are you doing?)

## Important Rule: Verb Second!
In main clauses, the finite verb is ALWAYS in second position.
    `,
    examples: [
      { dutch: "Vandaag eet ik brood", english: "Today I eat bread" },
      { dutch: "Spreek jij Nederlands?", english: "Do you speak Dutch?" },
      { dutch: "Waarom leer je Nederlands?", english: "Why are you learning Dutch?" }
    ]
  },

  {
    id: 5,
    title: "Articles: De & Het",
    level: "Beginner",
    content: `
## Definite Articles

Dutch has two definite articles ("the"):

### De (common gender) - ~2/3 of words
- de man (the man)
- de vrouw (the woman)
- de fiets (the bicycle)

### Het (neuter gender) - ~1/3 of words
- het huis (the house)
- het kind (the child)
- het boek (the book)

### Plural: Always "de"
- de mannen (the men)
- de huizen (the houses)

## Indefinite Article: Een

"Een" = "a/an" (for all genders)
- een man (a man)
- een huis (a house)
- een fiets (a bicycle)

## How to Know De or Het?

### Usually Het:
- Diminutives: het meisje (the girl)
- Infinitives as nouns: het eten (the food)
- Languages: het Nederlands
- Metals: het goud (gold)
- Compass directions: het noorden

### Usually De:
- People: de man, de vrouw
- Vegetables/fruits: de appel
- Rivers/mountains: de Rijn
- Numbers/letters: de drie

### Best Approach
**Always learn the article with the noun!** There's no 100% reliable rule.
    `,
    examples: [
      { dutch: "de kat en het konijn", english: "the cat and the rabbit" },
      { dutch: "een boek en een pen", english: "a book and a pen" },
      { dutch: "de huizen zijn groot", english: "the houses are big" }
    ]
  },

  {
    id: 6,
    title: "Common Phrases for Conversation",
    level: "Beginner",
    content: `
## Greetings & Politeness
- Hoe gaat het? (How are it going?)
- Goed, dank je! (Good, thanks!)
- En met jou? (And with you?)
- Aangenaam! (Pleased to meet you!)
- Tot ziens! (Goodbye!)

## Asking for Help
- Spreek je Engels? (Do you speak English?)
- Ik begrijp het niet (I don't understand)
- Kun je dat herhalen? (Can you repeat that?)
- Wat betekent dit? (What does this mean?)
- Hoe zeg je...? (How do you say...?)

## In a Restaurant
- Mag ik de menukaart? (May I have the menu?)
- Ik wil graag... (I would like...)
- De rekening, alsjeblieft (The bill, please)
- Het was heerlijk! (It was delicious!)

## Shopping
- Hoeveel kost dit? (How much does this cost?)
- Mag ik passen? (May I try this on?)
- Ik kijk alleen (I'm just looking)
- Waar is de kassa? (Where is the checkout?)

## Directions
- Waar is...? (Where is...?)
- Hier rechtdoor (Straight ahead here)
- Links/rechts (Left/right)
- Bij de hoek (At the corner)

## Useful Expressions
- Dat klopt (That's correct)
- Geen probleem (No problem)
- Ik weet het niet (I don't know)
- Misschien (Maybe)
- Natuurlijk! (Of course!)
    `,
    examples: [
      { dutch: "Pardon, spreek je Engels?", english: "Excuse me, do you speak English?" },
      { dutch: "Waar is het station?", english: "Where is the station?" },
      { dutch: "Mag ik een kopje koffie?", english: "May I have a cup of coffee?" }
    ]
  },

  {
    id: 7,
    title: "Plural Nouns",
    level: "Intermediate",
    content: `
## Forming Plurals

### Add -en (most common)
- boek → boeken (books)
- dag → dagen (days)
- fiets → fietsen (bicycles)

### Add -s (after -el, -em, -en, -er, -je)
- tafel → tafels (tables)
- meisje → meisjes (girls)
- auto → auto's (cars)

### Spelling Changes

**Double vowel → single vowel**
- maan → manen (moons)
- boot → boten (boats)

**Single vowel → double vowel**
- dag → dagen (days)
- weg → wegen (roads)

**f → v, s → z**
- brief → brieven (letters)
- huis → huizen (houses)

### Irregular Plurals
- kind → kinderen (children)
- ei → eieren (eggs)
- stad → steden (cities)

## Remember
The article for ALL plurals is "de"
- het boek → de boeken
- de fiets → de fietsen
    `,
    examples: [
      { dutch: "twee boeken en drie fietsen", english: "two books and three bicycles" },
      { dutch: "de huizen zijn groot", english: "the houses are big" },
      { dutch: "veel kinderen in het park", english: "many children in the park" }
    ]
  },

  {
    id: 8,
    title: "Separable Verbs",
    level: "Intermediate",
    content: `
## What are Separable Verbs?

Many Dutch verbs consist of a prefix + base verb. In a sentence, these can separate!

### Common Separable Verbs
- opbellen (to call up)
- meekomen (to come along)
- uitnodigen (to invite)
- aankomen (to arrive)
- teruggaan (to go back)
- ophangen (to hang up)
- weggaan (to go away)

### How They Separate

**In main clauses, prefix goes to the end:**
- Ik bel je morgen op (I'll call you tomorrow)
- Hij komt om 3 uur aan (He arrives at 3 o'clock)
- Wij gaan terug naar huis (We go back home)

**Infinitive form stays together:**
- Ik wil je opbellen (I want to call you)
- Hij moet aankomen (He must arrive)

**In subordinate clauses, stays together:**
- ...omdat ik je opbel (because I call you)

## Common Prefixes
- op- (up): opstaan (get up)
- af- (off): afmaken (finish)
- mee- (along): meegaan (go along)
- aan- (on): aandoen (turn on)
- uit- (out): uitgaan (go out)
- in- (in): inkomen (come in)
- terug- (back): terugkomen (come back)
    `,
    examples: [
      { dutch: "Ik sta om 7 uur op", english: "I get up at 7 o'clock" },
      { dutch: "Kom je mee naar het feest?", english: "Are you coming along to the party?" },
      { dutch: "Ze nodigt ons uit", english: "She invites us" }
    ]
  }
];

export const getGrammarLesson = (id) => {
  return grammarLessons.find(lesson => lesson.id === id);
};

export const getGrammarByLevel = (level) => {
  return grammarLessons.filter(lesson => lesson.level === level);
};
