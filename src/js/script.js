const btn = document.getElementById("generate-btn");
const textarea = document.getElementById("description");
const preview = document.getElementById("preview-section");
const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");

const backgrounds = [
	"linear-gradient(90deg, #ff7e5f, #feb47b)",
	"linear-gradient(90deg, #6a11cb, #2575fc)",
	"linear-gradient(90deg, #00c6ff, #0072ff)",
	"linear-gradient(90deg, #f7971e, #ffd200)",
	"linear-gradient(90deg, #ff00cc, #333399)"
];

let ultimoBackground = "";

btn.addEventListener("click", gerarBackground);

function gerarBackground(e) {
	e.preventDefault();

	const descricao = textarea.value.trim();

	if (!descricao) {
		alert("Digite uma descrição primeiro!");
		textarea.focus();
		return;
	}

	btn.textContent = "Gerando...";
	btn.disabled = true;

	setTimeout(() => {
		const background = gerarBackgroundFake();

		atualizarPreview(background);
		mostrarCodigo(background);

		btn.textContent = "Gerar Background";
		btn.disabled = false;
	}, 600);
}

function atualizarPreview(background) {
	preview.style.display = "block";
	preview.style.opacity = "0";
	preview.style.background = background;

	setTimeout(() => {
		preview.style.opacity = "1";
	}, 100);
}

function mostrarCodigo(background) {
	htmlCode.textContent = `<div class="background"></div>`;

	cssCode.textContent = `.background {
	width: 100%;
	height: 100vh;
	background: ${background};
}`;
}

function gerarBackgroundFake() {
	let background;

	do {
		background =
			backgrounds[Math.floor(Math.random() * backgrounds.length)];
	} while (background === ultimoBackground);

	ultimoBackground = background;

	return background;
}

function copiarCodigo(tipo) {
	const codigo =
		tipo === "html"
			? htmlCode.textContent
			: cssCode.textContent;

	navigator.clipboard.writeText(codigo);

	const botoes = document.querySelectorAll(".copy-btn");
	const botao = tipo === "html" ? botoes[0] : botoes[1];

	const textoOriginal = botao.textContent;

	botao.textContent = "Copiado!";

	setTimeout(() => {
		botao.textContent = textoOriginal;
	}, 1500);
}