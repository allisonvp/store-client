function render() {
  return `
    <div class="navbar-container">
        <div class="navbar-section">
            <img class="navbar-logo" src="../../assets/images/bsale-logo.png" alt="bsale-logo" />
        </div>
    </div>
    `;
}

const Navbar = {
  toString() {
    return render();
  }
};

export default Navbar;
