const OK_MAIL = "yasmin.usilva@gmail.com",
    OK_PASS = "1234",
    CAD_MAIL = "teste@doesangue.com",
    CAD_PASS = "teste";
const titles = {
    home: "Visão Geral",
    agenda: "Agendamentos",
    doacoes: "Minhas Doações",
    campanhas: "Campanhas",
    perfil: "Meus Dados",
};
const agenda = [
    {
        d: "25 mai. 2026 — 08:00",
        u: "Hemocentro Central",
        t: "Sangue total",
        s: "Confirmado",
    },
    {
        d: "15 jan. 2026 — 09:00",
        u: "Unidade Móvel",
        t: "Sangue total",
        s: "Realizado",
    },
    {
        d: "10 set. 2025 — 07:30",
        u: "Hemocentro Norte",
        t: "Plaquetas",
        s: "Realizado",
    },
];
const doacoes = [
    { d: "15 jan. 2026", u: "Unidade Móvel", t: "Sangue total" },
    { d: "10 set. 2025", u: "Hemocentro Norte", t: "Sangue total" },
    { d: "22 abr. 2026", u: "Hemocentro Central", t: "Plaquetas" },
];
const camps = [
    {
        n: "Campanha de Inverno 2026",
        p: "Os estoques de sangue caem durante o inverno. Cada doação é essencial para manter os hospitais abastecidos.",
        b: "Urgente",
        c: "w",
        bg: "linear-gradient(135deg,#5C1A26,#A63045)",
        i: "home",
    },
    {
        n: "Junho Vermelho",
        p: "O mês mundial do doador de sangue celebra a generosidade de quem escolhe salvar vidas de forma voluntária.",
        b: "Ativa",
        c: "g",
        bg: "linear-gradient(135deg,#2A6B4A,#1a4a32)",
        i: "heart",
    },
    {
        n: "Tipo O Negativo — Alerta",
        p: "Doadores O− são universais. Os estoques estão criticamente baixos nos hemocentros da região.",
        b: "Urgente",
        c: "w",
        bg: "linear-gradient(135deg,#4A3B2A,#2e2419)",
        i: "info",
    },
];
const $ = (id) => document.getElementById(id);
const ic = (n) =>
    `<svg class="i" style="width:22px;height:22px"><use href="#${n}"/></svg>`;

function render() {
    $("list-agenda").innerHTML = agenda
        .map(
            (a) =>
                `<div class="card"><div class="li"><div><div class="it">${a.d}</div><div class="is">${a.u} · ${a.t}</div></div><span class="badge ${a.s === "Confirmado" ? "g" : ""}">${a.s}</span></div></div>`,
        )
        .join("");
    $("list-doacoes").innerHTML = doacoes
        .map(
            (a) =>
                `<div class="card"><div class="li"><div><div class="it">${a.u}</div><div class="is">${a.d} · ${a.t}</div></div><span class="badge g">Aprovada</span></div></div>`,
        )
        .join("");
    $("list-camp").innerHTML = camps
        .map(
            (c) =>
                `<div class="card camp"><div class="hd" style="background:${c.bg}"><span>${ic(c.i)}</span></div><h3 class="serif">${c.n}</h3><p>${c.p}</p><div class="li"><span class="badge ${c.c}">${c.b}</span><button class="btn sm" onclick="sheet(true)">Participar</button></div></div>`,
        )
        .join("");
    $("n-ativos").textContent = agenda.filter((a) => a.s === "Confirmado").length;
}
function show(id) {
    document.querySelectorAll(".scr").forEach((s) => s.classList.remove("on"));
    $(id).classList.add("on");
}
function tab(p) {
    document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.toggle("on", t.dataset.t === p));
    document.querySelectorAll(".pg").forEach((x) => x.classList.remove("on"));
    $("p-" + p).classList.add("on");
    $("title").textContent = titles[p];
    $("main").scrollTop = 0;
}
function pw(id) {
    const e = $(id);
    e.type = e.type === "password" ? "text" : "password";
}
function setErr(id, msg) {
    const e = $(id);
    e.textContent = msg;
    e.classList.toggle("show", !!msg);
}
function login() {
    const m = $("l-email").value.trim(),
        p = $("l-pass").value;
    if (!m || !p) return setErr("l-err", "Por favor, preencha todos os campos.");
    if (m !== OK_MAIL || p !== OK_PASS) {
        $("l-email").classList.add("bad");
        $("l-pass").classList.add("bad");
        return setErr("l-err", "E-mail ou senha incorretos.");
    }
    setErr("l-err", "");
    $("l-email").classList.remove("bad");
    $("l-pass").classList.remove("bad");
    show("s-app");
    tab("home");
    toast("Login realizado. Bem-vinda, Yasmin.");
}
function cadastro() {
    const n = $("c-nome").value.trim(),
        m = $("c-email").value.trim(),
        t = $("c-tel").value.trim(),
        p = $("c-pass").value,
        c = $("c-conf").value;
    if (!n || !m || !t || !p || !c)
        return setErr("c-err", "Por favor, preencha todos os campos.");
    if (p !== c) return setErr("c-err", "As senhas não coincidem.");
    if (m !== CAD_MAIL || p !== CAD_PASS)
        return setErr(
            "c-err",
            "Este e-mail não está autorizado para cadastro nesta plataforma.",
        );
    setErr("c-err", "");
    show("s-app");
    tab("home");
    toast("Conta criada com sucesso. Bem-vinda.");
}
function logout() {
    $("l-email").value = "";
    $("l-pass").value = "";
    show("s-login");
}
function sheet(open) {
    $("ov").classList.toggle("on", open);
    $("bs").classList.toggle("on", open);
}
function agendar() {
    const v = $("a-dt").value;
    if (!v) return toast("Escolha uma data para continuar.");
    const [y, m, d] = v.split("-"),
        mes = [
            "jan",
            "fev",
            "mar",
            "abr",
            "mai",
            "jun",
            "jul",
            "ago",
            "set",
            "out",
            "nov",
            "dez",
        ][+m - 1];
    agenda.unshift({
        d: `${d} ${mes}. ${y} — ${$("a-hr").value}`,
        u: $("a-un").value,
        t: $("a-tp").value,
        s: "Confirmado",
    });
    render();
    sheet(false);
    tab("agenda");
    toast("Agendamento confirmado. Você receberá uma confirmação por e-mail.");
}
let tt;
function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(() => t.classList.remove("show"), 3000);
}
$("l-pass").addEventListener("keydown", (e) => {
    if (e.key === "Enter") login();
});
render();
