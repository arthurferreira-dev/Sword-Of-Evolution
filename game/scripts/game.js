let MenuPause = document.querySelector('#menu-pause');
let SpanIcon = document.querySelector('#span-icon');
let Gameplay = document.querySelector('#game-display');
let AlertEnemy = document.querySelector('#alert-enemy');
let EnemySprite = document.querySelector('img#enemy-sprite');

let nome;
let vida;
let ataque;
let fraqueza;
let info;

const EnemyInfo = [
    nome = document.querySelector('h3#name'), // 0
    vida = document.querySelector('h3#hp'), // 1
    ataque = document.querySelector('h3#ataque'), // 2
    fraqueza = document.querySelector('h3#fraqueza'), // 3
    info = document.querySelector('h3#info') // 4
]

var health = 20 // HP
var att = 2 // ATTACK
var criti = att*2 // CRITICAL

const enemys = ['Gosma', 'Esqueleto', 'Gosma Brilhante', 'Zumbi', 'Zumbi Gigante', 'Saci Pererê', 'O Predador Natural', 'Temteki', 'Medusa'];

const SemiBosses = ['Cíclope', 'Kappa', 'Chupa Cabra', 'Quimera', 'Baku', 'Leshy', 'Curupira'];

const FinalBosses = ['Hidra da Floresta', 'Zeus', 'Fênix'];

let gosma;
let esqueleto;
let gosmaBrilhante;
let zumbi;
let zumbiGigante;
let saci;
let predador;
let temteki;
let medusa;

let ciclope;
let kappa;
let chupacabra;
let quimera;
let baku;
let leshy;
let curupira;

let hidra;
let zeus;
let phoenix;
let harpia;

const enemysAtributes = [
    gosma = {hp:6, attack:1.5}, 
    esqueleto = {hp:20, attack:9}, 
    gosmaBrilhante = {hp:15, attack:6.5}, 
    zumbi = {hp:30, attack:15}, 
    zumbiGigante = {hp:70, attack:45}, 
    saci = {hp:50, attack:50, frac:'1 de dano = hit kill'}, 
    predador = {hp:175, attack:300, info:'fugir é hit kill'}, 
    temteki = {hp:150, attack:200, frac:'Fogo (dobra o dano do User)'}, 
    medusa = {hp:200, attack:75, info:'Se olhar é hit kill'}
]

const SemiBossesAtributes = [
    ciclope = {hp:145, attack:350, frac:'tem ponto cego, cai para 250 espalhado'}, 
    kappa = {hp:200, attack:125, frac:'Fogo, diminui seu attack pela metade (62.5)'}, 
    chupacabra = {hp:350, attack:145, frac:'Nenhuma', info:'Ataca depois de 2 ataques do Player'}, 
    quimera = {hp:350, attack:400, frac:'Ele só recebe Critical'}, baku = {hp:400, attack:70},
    leshy = {hp:280, attack:156, frac:'Fogo, seu HP desce 25'}, 
    curupira = {hp:300, attack:150, frac:'Água, seu ataque é pela metade (75)'}
];

const FinalBossesAtributes = [
    hidra = {hp:650, attack:500}, 
    zeus = {hp:1000, attack:2000}, 
    phoenix = {hp:5000, attack:7500, help:harpia}, 
    harpia = {hp:150*5, attack:75*5, info:`Ajudam a ${FinalBosses[2]} dando suporte`}
]

const Conquistas = [
    welcome = {title:'Bem-vindo(a)', desc:'Participar do jogo pela primeira vez. Obrigado!'}, 
    hero = {title:'Herói Lendário', desc:'Chegar ao nível máximo da campanha.'}, 
    survivalOne = {title:'Sobreviver com 1 de HP!', desc:'Ficar com 1 de HP e ainda vencer o combate.'}, 
    persistente = {title:'Persistente', desc:'Jogar por 7 dias seguidos!'}, 
    subindo = {title:'Subindo na Vida', desc:'Alcançar o nível 5. Adiciona 10 HP.'}, 
    vicio = {title:'Viciado? Eu?', desc:'Alcançar o nível 10. Adiciona 20 HP.'}, 
    fim = {title:'Fim Absoluto', desc:'Derrotar a Fênix (uma vez)...'}, 
    espada = {title:'Espada de Ouro', desc:'Alcançar o nível máximo.'}
]

Salve();
Load();
Game();

function Load() {
    health = Number(GetItem("hp")) || 20;
    att = Number(GetItem("attack")) || 2;
    criti = Number(GetItem("critical")) || att * 2;
}

function Game() {
    const personagem = { hp:health, attack:att, critical:criti }
    console.info('User:', personagem)

    let cont
    if (personagem.attack <= 2) {
        cont = 1;
    } else {
        cont = randomInt(1, 9);
    }

    Timer(randomInt(4, 16));

    console.log(randomInt(500, 1000))

    if (cont === 1) {
        Gosma();
    }
}

function Gosma() {
    EnemySprite.style.width = '600px'
    EnemySprite.src = 'sprites/bg-transparent/gosma.png'
    EnemyInfo[0].style.display = 'block'
    EnemyInfo[1].style.display = 'block'
    EnemyInfo[2].style.display = 'block'
    EnemyInfo[3].style.display = 'none'
    EnemyInfo[4].style.display = 'none'

    EnemyInfo[0].innerHTML = 'Gosma'
    EnemyInfo[1].innerHTML = enemysAtributes[0].hp
    EnemyInfo[2].innerHTML = enemysAtributes[0].attack
}

function Menu() {
    SpanIcon.style.display = 'none'
    MenuPause.classList.remove('hidden')
    Gameplay.classList.add('hidden')
}

function Return() {
    MenuPause.classList.add('hidden')
    SpanIcon.style.display = 'block'
    Gameplay.classList.remove('hidden')
}

function Salve() {
    SetItem("hp", health);
    SetItem("attack", att);
    SetItem("critical", criti);
}

function Leave() {
    Salve();
    window.location.href = '/index.html'
}

// Functions Utils

function SetItem(key, value) {
    localStorage.setItem(key, value);
}

function GetItem(key) {
    return localStorage.getItem(key);
}

function TimerEnemy(seconds, enemy) {
    let segundos = seconds / 1000
    log = `Execução timer de ${segundos * 1000} segundos do inimigo: ${enemy}`
    return setTimeout(console.log(log), segundos);
}

function Timer(segundos) {
    let milliseconds = segundos * 1000;
    return setTimeout(() => {
        console.log(`Execução da função 'Timer' depois de ${segundos} segundos`);
    }, milliseconds);
}

function randomInt(minimo, maximo) {
    let min = Math.ceil(minimo);
    let max = Math.floor(maximo);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}