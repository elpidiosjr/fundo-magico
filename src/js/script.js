const btn = document.getElementById("generate-btn");
const textarea = document.getElementById("description");
const preview = document.getElementById("preview-section");
const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");

const TEMPO_LOADING = 600;
const TEMPO_ANIMACAO = 100;

const backgrounds = [
	"linear-gradient(90deg, #ff7e5f, #feb47b)",
	"linear-gradient(90deg, #6a11cb, #2575fc)",
	"linear-gradient(90deg, #00c6ff, #0072ff)",
	"linear-gradient(90deg, #f7971e, #ffd200)",
	"linear-gradient(90deg, #ff00cc, #333399)"
];

let ultimoBackground = "";

btn.addEventListener("click", gerarBackground);

// ==========================
// GERA BACKGROUND
// ==========================

async function gerarBackground(event) {
	event.preventDefault();

	const descricao = textarea.value.trim();

	if (!validarDescricao(descricao)) {
		return;
	}

	atualizarBotao(true);

	try {
		await esperar(TEMPO_LOADING);

		const background = gerarBackgroundFake();

		atualizarPreview(background);
		mostrarCodigo(background);

	} finally {
		atualizarBotao(false);
	}
}

// ==========================
// VALIDAÇÃO
// ==========================

function validarDescricao(descricao) {
	if (!descricao) {
		alert("Digite uma descrição primeiro!");

		textarea.focus();

		return false;
	}

	return true;
}

// ==========================
// BOTÃO
// ==========================

function atualizarBotao(carregando) {
	btn.disabled = carregando;

	btn.textContent = carregando
		? "Gerando..."
		: "Gerar Background";
}

// ==========================
// PREVIEW
// ==========================

function atualizarPreview(background) {
	preview.style.display = "block";
	preview.style.opacity = "0";
	preview.style.background = background;

	setTimeout(() => {
		preview.style.opacity = "1";
	}, TEMPO_ANIMACAO);
}

// ==========================
// CÓDIGOS
// ==========================

function mostrarCodigo(background) {
	htmlCode.textContent =
`<div class="background"></div>`;

	cssCode.textContent =
`.background {
	width: 100%;
	height: 100vh;
	background: ${background};
}`;
}

// ==========================
// BACKGROUND MOCK
// ==========================

function gerarBackgroundFake() {

	let background;

	do {
		background =
			backgrounds[Math.floor(Math.random() * backgrounds.length)];
	}
	while (background === ultimoBackground);

	ultimoBackground = background;

	return background;
}

// ==========================
// COPIAR CÓDIGO
// ==========================

async function copiarCodigo(tipo) {

	try {

		const codigo =
			tipo === "html"
				? htmlCode.textContent
				: cssCode.textContent;

		await navigator.clipboard.writeText(codigo);

		const botoes = document.querySelectorAll(".copy-btn");

		const botao =
			tipo === "html"
				? botoes[0]
				: botoes[1];

		const textoOriginal = botao.textContent;

		botao.textContent = "Copiado!";

		setTimeout(() => {
			botao.textContent = textoOriginal;
		}, 1500);

	} catch (erro) {
		console.error("Erro ao copiar código:", erro);
		alert("Não foi possível copiar o código.");
	}
}

// ==========================
// UTILITÁRIO
// ==========================

function esperar(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}