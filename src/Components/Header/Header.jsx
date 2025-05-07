import { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { BiChevronDown } from 'react-icons/bi';
import "./Header.css"
const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock data - replace with your actual categories
  const categories = [
    { name: 'Electronics', subcategories: ['Phones', 'Laptops', 'Accessories'] },
    { name: 'Home & Living', subcategories: ['Furniture', 'Decor', 'Kitchen'] },
    { name: 'Fashion', subcategories: ['Men', 'Women', 'Kids'] },
    { name: 'Health & Beauty', subcategories: ['Skincare', 'Haircare', 'Makeup'] },
  ];

  return (
    <header className={`dropship-header ${isScrolled ? 'header-scrolled' : ''}`}>
      {/* Top Announcement Bar */}
      <div className="header-announcement">
        <p>✨ Free shipping on orders over $50 | 30-day money-back guarantee ✨</p>
      </div>

      {/* Main Header Content */}
      <div className="header-main-container">
        {/* Logo Section */}
        <div className="header-logo">
          <a href="/" aria-label="Home">
            <img 
              src="/logo.svg" 
              alt="Dropship Store" 
              className="logo-desktop"
              width="180"
              height="40"
            />
            <img 
              src="/logo-mobile.svg" 
              alt="Dropship Store" 
              className="logo-mobile"
              width="120"
              height="30"
            />
          </a>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="header-search">
          <form role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            <button type="submit" aria-label="Search">
              <FiSearch className="search-icon" />
            </button>
          </form>
        </div>

        {/* User Actions */}
        <div className="header-actions">
          <button className="header-action-btn" aria-label="Account">
            <FiUser />
            <span className="action-label">Account</span>
          </button>
          
          <button className="header-action-btn" aria-label="Wishlist">
            <FiHeart />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            <span className="action-label">Wishlist</span>
          </button>
          
          <button className="header-action-btn" aria-label="Cart">
            <FiShoppingCart />
            {cartItemsCount > 0 && <span className="badge">{cartItemsCount}</span>}
            <span className="action-label">Cart</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="header-navigation">
        <ul className="nav-list">
          {categories.map((category) => (
            <li key={category.name} className="nav-item has-dropdown">
              <a href={`/category/${category.name.toLowerCase()}`}>
                {category.name}
                <BiChevronDown className="dropdown-arrow" />
              </a>
              <div className="dropdown-menu">
                <div className="dropdown-container">
                  <ul className="dropdown-list">
                    {category.subcategories.map((subcat) => (
                      <li key={subcat}>
                        <a href={`/category/${category.name.toLowerCase()}/${subcat.toLowerCase()}`}>
                          {subcat}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="dropdown-featured">
                    <img 
                      src={`/images/${category.name.toLowerCase()}-featured.jpg`} 
                      alt={category.name}
                      width="300"
                      height="200"
                    />
                    <a href={`/category/${category.name.toLowerCase()}`} className="featured-link">
                      Shop All {category.name}
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-container">
            <div className="mobile-search">
              <form role="search">
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                  <FiSearch />
                </button>
              </form>
            </div>
            
            <ul className="mobile-nav-list">
              {categories.map((category) => (
                <li key={category.name}>
                  <details>
                    <summary>
                      {category.name}
                      <BiChevronDown />
                    </summary>
                    <ul>
                      {category.subcategories.map((subcat) => (
                        <li key={subcat}>
                          <a href={`/category/${category.name.toLowerCase()}/${subcat.toLowerCase()}`}>
                            {subcat}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
              <li><a href="/account">My Account</a></li>
              <li><a href="/wishlist">Wishlist</a></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;