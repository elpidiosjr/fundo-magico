const btn = document.getElementById("generate-btn");
const textarea = document.getElementById("description");
const preview = document.getElementById("preview-section");
const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");

btn.addEventListener("click", function (e) {
	e.preventDefault();

	const descricao = textarea.value.trim();

	if (!descricao) {
		alert("Digite uma descrição primeiro!");
		return;
	}

	// Simulação de IA (mock)
	const backgroundGerado = gerarBackgroundFake(descricao);

	// Mostrar preview
preview.style.display = "block";
preview.style.opacity = "0";

setTimeout(() => {
	preview.style.opacity = "1";
}, 100);

preview.style.height = "220px";
preview.style.borderRadius = "16px";
preview.style.marginTop = "20px";
preview.style.background = backgroundGerado;

	// Mostrar código
	htmlCode.textContent = `<div class="background"></div>`;

	cssCode.textContent = `.background {
  width: 100%;
  height: 100vh;
  background: ${backgroundGerado};
}`;
});

// Função fake (simula IA)
function gerarBackgroundFake(texto) {
	const cores = [
		"linear-gradient(90deg, #ff7e5f, #feb47b)",
		"linear-gradient(90deg, #6a11cb, #2575fc)",
		"linear-gradient(90deg, #00c6ff, #0072ff)",
		"linear-gradient(90deg, #f7971e, #ffd200)",
		"linear-gradient(90deg, #ff00cc, #333399)"
	];

	// Escolhe aleatório
	return cores[Math.floor(Math.random() * cores.length)];
}