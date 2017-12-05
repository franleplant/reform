// CoW style of context container
export default class Context {
  inline: boolean = false;

  setInline(inline: boolean): Context {
    const newInstance = new Context();
    newInstance.inline = inline;
    return newInstance;
  }
}
