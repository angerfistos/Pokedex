export default class Historique extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name");
    this.innerHTML = `
    <header>
      <h1>
        Je suis dans le ${name}.
      </h1>
    `;
  }
}
