import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../api/productApi";
import "./Products.css";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  const getTotalStock = (product) => {
    let total = 0;
    product.colors.forEach((color) => {
      if (color.sizes && color.sizes.length > 0) {
        color.sizes.forEach((size) => { total += size.stock; });
      } else {
        total += color.stock || 0;
      }
    });
    return total;
  };

  const getColorStock = (color) => {
    if (color.sizes && color.sizes.length > 0) {
      return color.sizes.reduce((sum, size) => sum + size.stock, 0);
    }
    return color.stock || 0;
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return "out-of-stock";
    if (stock <= 5) return "low-stock";
    return "in-stock";
  };

  const getStockLabel = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1 className="products-title">Products</h1>
          <p className="products-subtitle">
            {products.length} {products.length === 1 ? "product" : "products"} total
          </p>
        </div>
        <button
          className="btn-add"
          onClick={() => navigate("/products/add")}
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading products…</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No products yet</h3>
          <p>Add your first product to get started.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const totalStock = getTotalStock(product);
            const stockStatus = getStockStatus(totalStock);

            return (
              <div key={product._id} className="product-card">
                {/* Card Header */}
                <div className="card-header">
                  <div className="card-title-row">
                    <h3 className="product-name">{product.name}</h3>
                    <span className={`stock-badge ${stockStatus}`}>
                      {getStockLabel(totalStock)}
                    </span>
                  </div>
                  <div className="product-meta">
                    <span className="product-price">₹{product.price.toLocaleString()}</span>
                    <span className="product-stock">
                      <span className="meta-label">Total Stock:</span>
                      <strong>{totalStock}</strong>
                    </span>
                  </div>
                </div>

                {/* Color Breakdown */}
                <div className="card-body">
                  <p className="section-label">Stock by Color</p>
                  <div className="color-list">
                    {product.colors.map((color) => (
                      <div key={color.name} className="color-row">
                        <div className="color-header">
                          <div className="color-dot-wrapper">
                            <span
                              className="color-dot"
                              style={{ backgroundColor: color.name.toLowerCase() }}
                            />
                            <span className="color-name">{color.name}</span>
                          </div>
                          <span className="color-stock-count">{getColorStock(color)}</span>
                        </div>

                        {color.sizes && color.sizes.length > 0 && (
                          <div className="size-list">
                            {color.sizes.map((size) => (
                              <div key={size.size} className="size-chip">
                                <span className="size-label">{size.size}</span>
                                <span className="size-stock">{size.stock}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="card-footer">
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/products/edit/${product._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}