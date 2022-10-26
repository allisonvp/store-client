//A function that takes as argument the html element #root and returns an object containing a module variable, a load function that renders a piece of html (module) in the element #root and a reload function that calls the load function to re-render the module stored in the module variable.
const DOMHandler = (function (parentSelector) {
  const parent = document.querySelector(parentSelector);

  //Returns an Error object if there is no parentSelector (in this case the html element #root).
  if (!parent) throw new Error('Parent not found');

  return {
    module: null,
    load(module) {
      this.module = module;
      parent.innerHTML = module;
      module.addListeners();
    },
    reload() {
      this.load(this.module);
    }
  };
})('#root');

export default DOMHandler;
