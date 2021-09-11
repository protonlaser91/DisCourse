"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const Config = require("./config");
var db = require('quick.db');
var userBehavior = new db.table('user');
var qid = new db.table('id');
const myIntents = new Discord.Intents();
myIntents.add(Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES);
const Bot = new Discord.Client({ intents: myIntents });
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
let commands = [];
let events = [];
const cooldowns = new Discord.Collection();
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const vals = {
    questions: [],
    points: 0,
    strikes: 0,
    messages: [],
    absences: 0
};
let studentID;
let teacherID;
function init(guild) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        yield guild.roles.fetch();
        yield guild.channels.fetch();
        yield ((_a = Bot.application) === null || _a === void 0 ? void 0 : _a.fetch());
        if (!guild.roles.cache.some((role) => role.name === 'Teacher')) {
            guild.roles.create({ name: 'Teacher', permissions: [
                    discord_js_1.Permissions.FLAGS.ADMINISTRATOR
                ] });
        }
        if (!guild.roles.cache.some((role) => role.name === 'Mute')) {
            guild.roles.create({ name: 'Mute', permissions: [
                    discord_js_1.Permissions.FLAGS.READ_MESSAGE_HISTORY,
                    discord_js_1.Permissions.FLAGS.VIEW_CHANNEL
                ] });
        }
        if (!guild.roles.cache.some((role) => role.name === 'Student')) {
            guild.roles.create({ name: 'Student', permissions: [
                    discord_js_1.Permissions.FLAGS.VIEW_CHANNEL,
                    discord_js_1.Permissions.FLAGS.ADD_REACTIONS,
                    discord_js_1.Permissions.FLAGS.STREAM,
                    discord_js_1.Permissions.FLAGS.SEND_MESSAGES,
                    discord_js_1.Permissions.FLAGS.EMBED_LINKS,
                    discord_js_1.Permissions.FLAGS.ATTACH_FILES,
                    discord_js_1.Permissions.FLAGS.READ_MESSAGE_HISTORY,
                    discord_js_1.Permissions.FLAGS.CONNECT,
                    discord_js_1.Permissions.FLAGS.SPEAK,
                    discord_js_1.Permissions.FLAGS.USE_PUBLIC_THREADS,
                ] });
        }
        if (!guild.roles.cache.some((role) => role.name === 'Test')) {
            guild.roles.create({ name: 'Test', permissions: [
                    discord_js_1.Permissions.FLAGS.READ_MESSAGE_HISTORY,
                    discord_js_1.Permissions.FLAGS.VIEW_CHANNEL
                ] });
        }
        studentID = (_b = guild.roles.cache.find(role => role.name == 'Student')) === null || _b === void 0 ? void 0 : _b.id;
        teacherID = (_c = guild.roles.cache.find(role => role.name == 'Teacher')) === null || _c === void 0 ? void 0 : _c.id;
        yield ((_d = Bot.guilds.cache.get('775700759869259776')) === null || _d === void 0 ? void 0 : _d.commands.fetch().then((col) => {
            loadCommands(`${__dirname}/commands`, col);
            loadEvents(`${__dirname}/events`);
        }));
        let teacherChannel = guild.channels.cache.some((channel) => channel.name == 'teacher');
        if (!teacherChannel)
            guild.channels.create('teacher', { type: 'GUILD_TEXT', topic: 'DisCourse will send you info here.', permissionOverwrites: [
                    {
                        id: studentID,
                        deny: discord_js_1.Permissions.FLAGS.VIEW_CHANNEL,
                        type: "role"
                    },
                    {
                        id: guild.roles.everyone,
                        deny: discord_js_1.Permissions.FLAGS.VIEW_CHANNEL,
                        type: "role"
                    },
                    {
                        id: teacherID,
                        allow: [discord_js_1.Permissions.FLAGS.SEND_MESSAGES, discord_js_1.Permissions.FLAGS.VIEW_CHANNEL]
                    },
                ] });
        let annChannel = guild.channels.cache.some((channel) => channel.name == 'announcements');
        if (!annChannel)
            guild.channels.create('announcements', { type: 'GUILD_TEXT', topic: 'Messages from your teacher will go here!', permissionOverwrites: [
                    {
                        id: studentID,
                        deny: discord_js_1.Permissions.FLAGS.SEND_MESSAGES,
                        allow: discord_js_1.Permissions.FLAGS.VIEW_CHANNEL
                    },
                    {
                        id: teacherID,
                        allow: [discord_js_1.Permissions.FLAGS.SEND_MESSAGES, discord_js_1.Permissions.FLAGS.VIEW_CHANNEL]
                    }
                ] });
    });
}
Bot.once("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("This bot is online!");
    Bot.user.setPresence({ activities: [{ name: 'educational videos.', type: 'WATCHING' }], status: 'online' });
    (_a = Bot.user) === null || _a === void 0 ? void 0 : _a.setUsername("DisCourse");
    qid.set("id", 0);
    Bot.guilds.fetch().then(() => {
        Bot.guilds.cache.forEach((guild) => __awaiter(void 0, void 0, void 0, function* () {
            yield init(guild);
            guild.members.fetch().then((collection) => {
                collection.forEach((member) => {
                    if (!db.has(member.id)) {
                        db.set(member.id, vals);
                    }
                });
            });
        }));
    });
}));
Bot.on("guildMemberAdd", member => {
    if (!db.has(member.id)) {
        db.set(member.id, vals);
    }
    console.log(member.user);
    var role = member.guild.roles.cache.find(role => role.name == "Student");
    member.roles.add(role);
});
Bot.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    handleCommand(interaction);
}));
Bot.on("messageCreate", msg => {
    if (msg.author.bot)
        return;
    handleEvent(msg);
    if (msg.channel.type == 'DM') {
        msg.author.send(`Please talk to me on a server! This ensures more engagement and reliability.`);
        return;
    }
});
function handleEvent(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let arr = db.get(`${msg.author.id}.messages`);
        if (arr.length < 10) {
            db.push(`${msg.author.id}.messages`, msg.content);
        }
        else {
            db.set(`${msg.author.id}.messages`, []);
        }
        for (const eventClass of events) {
            yield eventClass.runEvent(msg, Bot);
        }
    });
}
function handleCommand(interaction) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let command = interaction.commandName;
        let args = [];
        for (const commandClass of commands) {
            try {
                if (!commandClass.isThisInteraction(command)) {
                    continue;
                }
                if (!cooldowns.has(commandClass.name())) {
                    cooldowns.set(commandClass.name(), new Discord.Collection());
                }
                const now = Date.now();
                const timestamps = cooldowns.get(commandClass.name());
                const cooldownAmount = (commandClass.cooldown() || 3) * 1000;
                if (timestamps.has((_a = interaction.member) === null || _a === void 0 ? void 0 : _a.user.id)) {
                    const expirationTime = timestamps.get((_b = interaction.member) === null || _b === void 0 ? void 0 : _b.user.id) + cooldownAmount;
                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now) / 1000;
                        if (timeLeft > 3600) {
                            return interaction.reply({ ephemeral: true, content: `please wait ${Math.round(timeLeft / 3600)} more hour(s) before reusing the \`${commandClass.name()}\` command.` });
                        }
                        else if (timeLeft > 60 && timeLeft < 3600) {
                            return interaction.reply({ ephemeral: true, content: `please wait ${Math.round(timeLeft / 60)} more minute(s) before reusing the \`${commandClass.name()}\` command.` });
                        }
                        else {
                            return interaction.reply({ ephemeral: true, content: `please wait ${Math.round(timeLeft)} more second(s) before reusing the \`${commandClass.name()}\` command.` });
                        }
                    }
                }
                timestamps.set((_c = interaction.member) === null || _c === void 0 ? void 0 : _c.user.id, now);
                setTimeout(() => { var _a; return timestamps.delete((_a = interaction.member) === null || _a === void 0 ? void 0 : _a.user.id); }, cooldownAmount);
                yield commandClass.runCommand(interaction, Bot);
            }
            catch (e) {
                console.log(e);
            }
        }
    });
}
function loadCommands(commandsPath, allSlashCommands) {
    if (!Config.config.commands || Config.config.commands.length == 0)
        return;
    let commandDatas = [];
    for (const commandName of Config.config.commands) {
        const commandsClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandsClass();
        commands.push(command);
        commandDatas.push(command.data().toJSON());
        const permCommand = allSlashCommands.find((com) => com.name == command.name());
        let xd;
        let complementxd;
        switch (command.perms()) {
            case 'student':
                xd = studentID;
                complementxd = teacherID;
                break;
            case 'teacher':
                xd = teacherID;
                complementxd = studentID;
                break;
            default:
                xd = '';
                complementxd = '';
        }
        if (xd != '') {
            const permissions = [
                {
                    id: xd,
                    type: 'ROLE',
                    permission: true,
                },
                {
                    id: complementxd,
                    type: 'ROLE',
                    permission: false,
                },
            ];
            permCommand === null || permCommand === void 0 ? void 0 : permCommand.permissions.add({ permissions });
        }
    }
    const rest = new rest_1.REST({ version: '9' }).setToken(Config.config.token);
    (() => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Started refreshing application (/) commands.');
            yield rest.put(v9_1.Routes.applicationGuildCommands(Config.config.clientID, Config.config.guildID), { body: commandDatas });
            console.log('Successfully reloaded application (/) commands.');
        }
        catch (error) {
            console.error(error);
        }
    }))();
}
function loadEvents(commandsPath) {
    if (!Config.config.events || Config.config.events.length == 0)
        return;
    for (const eventName of Config.config.events) {
        const eventsClass = require(`${commandsPath}/${eventName}`).default;
        const event = new eventsClass();
        events.push(event);
    }
}
Bot.login(Config.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsbUNBQW1DO0FBQ25DLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUc3QixJQUFJLFlBQVksR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdCLE1BQU0sU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3hDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNySCxNQUFNLEdBQUcsR0FBbUIsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7QUFDckUsMkNBQXlDO0FBSXpDLDBDQUF1QztBQUN2Qyw2Q0FBOEM7QUFHOUMsSUFBSSxRQUFRLEdBQXNCLEVBQUUsQ0FBQztBQUNyQyxJQUFJLE1BQU0sR0FBZ0IsRUFBRSxDQUFDO0FBSzdCLE1BQU0sU0FBUyxHQUFRLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBR2hELFNBQVMsT0FBTyxDQUFDLEdBQVcsRUFBQyxHQUFXO0lBRWhDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pELENBQUM7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