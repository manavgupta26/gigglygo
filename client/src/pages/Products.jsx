import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import ProductCard from "../components/ProductCard";
import "./Products.css";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] =
    useState("all");

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          productsData,
          categoriesData,
        ] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(
          productsData.products || []
        );

        setCategories(
          categoriesData.categories || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        activeCategory === "all" ||
        product.category?._id ===
          activeCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  const totalProducts =
    products.length;

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          padding: "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div className="products-header__bg">
          <div className="products-header__blob blob-shape"></div>
        </div>

        <div className="container products-header__inner">
          <span className="section-tag">
            All Products
          </span>

          <h1 className="products-header__title">
            Shop Baby Essentials
          </h1>

          <p className="products-header__sub">
            {totalProducts} handpicked
            products across{" "}
            {categories.length} categories
          </p>
        </div>
      </div>

      <div className="container products-body">
        {/* Search + Filters */}
        <div className="products-controls">
          <div className="products-search">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="products-search__input"
            />
          </div>

          <div className="products-dropdown">
            <select
              value={
                activeCategory
              }
              onChange={(e) =>
                setActiveCategory(
                  e.target.value
                )
              }
              className="products-dropdown__select"
            >
              <option value="all">
                All Categories
              </option>

              {categories.map((c) => (
                <option
                  key={c._id}
                  value={c._id}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length ===
        0 ? (
          <div className="products-empty">
            <span>🔍</span>

            <h3>
              No products found
            </h3>

            <p>
              Try a different
              search or browse all
              categories
            </p>

            <button
              className="btn-primary"
              onClick={() => {
                setSearch("");
                setActiveCategory(
                  "all"
                );
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  category={
                    product.category
                  }
                  addToCart={
                    addToCart
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}