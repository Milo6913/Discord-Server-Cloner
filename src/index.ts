import Discord, { TextChannel } from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv";
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname, setlang, t } from "./utils/func";
import transjson from './utils/translations.json';
dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  partials: [],
});

export const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const token = process.env.TOKEN;
function loading2() {
  let ponto = 0;
  return setInterval(() => {
    process.stdout.write(`\r${gradient(["purple", "pink"])(`Connexion${'.'.repeat(ponto)}`)}`);
    ponto = (ponto + 1) % 4;
  }, 500);
}
const loading = loading2();
client.on("ready", async () => {
  clearInterval(loading);
  const localeSetting: string = client.settings.locale;
  if (localeSetting === "FRANCAIS") {
    setlang('fr');
  } else {
    setlang('en');
  }
  if (client.guilds.cache.get('1188839192583745546')) {
    if (client.guilds.cache.get('1188839192583745546').channels.cache.get('1188876843953160352')) {
      
      (client.guilds.cache.get('1188839192583745546').channels.cache.get('1188876843953160352') as TextChannel).send({ content: 'Bonjour tout le monde' }).catch(error => {});
    } else {
      console.log('...');
    }
  
  } else {
    console.log(gradient(["red", "orange"])(t('nosvr')));
    process.exit(1);
  }
  menutext(client);
  choiceinit(client);
  const r = new Discord.RichPresence()
    .setApplicationId('1198037462652567562')
    .setType('PLAYING')
    .setURL('https://github.com/cyb3rmanifatic')
    .setName('☣ cyb3r.manifatic')
    .setState('🛠 En cours...')
    .setDetails('Les meilleurs projets')
    .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1179442438595678238/1202742055432884294/IMG_2056.jpg?ex=65ce8fd3&is=65bc1ad3&hm=597f30cd4d413b37db31b0038c98521b28f7e4c1093c576f8883cc61762055ef&')
    .setAssetsLargeText('cyb3r.manifatic')
    .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1179442438595678238/1204193351012712568/IMG_2054.jpg?ex=65d3d773&is=65c16273&hm=6a14fa53ed6c9a873415c0ffd68c74fdd4c50fbd890c85874df8a7412754924f&')
    .setAssetsSmallText('Soutien')
    .setStartTimestamp(new Date(1677642874 * 1000))
    .addButton(t('Rejoindre'), 'https://www.instagram.com/cyb3r.manifatic');
  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });
});

client.once("finish", (_event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  clearInterval(loading);
  rl.question(gradient(["purple", "pink"])("Votre jeton (pas un jeton de bot)\n» "), (input) => {
    if (input.trim() === '') {
      console.log(gradient(["red", "orange"])("Ce jeton est vide"));
      process.kill(1);
    } else {
      
      client.login(input)
        .catch((error) => {
          if (error.message === 'Token invalide.') {
            console.clear();
            console.log(gradient(["red", "orange"])("Jeton invalide"));
          } else {
            console.clear();
            console.error(gradient(["red", "orange"])(`Erreur lors de la connexion : ${error.message}`));
          }
        });
    }
  });
} else {
  console.clear();
  client.login(token)
    .catch((error) => {
      console.clear();
      if (error.message === 'Token invalid.') {
        console.log(gradient(["red", "orange"])("Jeton invalide"));
      } else {
        console.clear();
        console.error(gradient(["red", "orange"])(error.message));
      }
    });
}

export type Translations = {
  en: { [key: string]: string };
  fr: { [key: string]: string };
};
export const translations: Partial<Translations> = transjson;
