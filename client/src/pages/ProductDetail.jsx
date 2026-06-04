import React, { useState, useEffect } from "react";
import "./ProductDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlug } from "../api/productApi";

export default function ProductDetail({ addToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] =
    useState(null);

  const [selectedSize, setSelectedSize] =
    useState(null);

  const [qty, setQty] = useState(1);

  const [added, setAdded] =
    useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data =
          await getProductBySlug(slug);

        setProduct(data.product);

        if (
          data.product.colors?.length
        ) {
          setSelectedColor(
            data.product.colors[0]
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const discount =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice -
            product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const handleAdd = () => {
    if (!selectedColor) return;

    const hasSizes =
  selectedColor?.sizes?.length > 0;

if (hasSizes && !selectedSize) return;

    addToCart({
      productId: product._id,
      slug: product.slug,
      name: product.name,
      image:
        selectedColor.images?.[0],
      price: product.price,
      color:
        selectedColor.name,
      size: selectedSize || null,
      qty,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="product-detail">
      <div className="container">
        <button
          className="product-detail__back"
          onClick={() =>
            navigate("/products")
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Products
        </button>
      </div>

      <div className="container product-detail__inner">
        {/* Image */}
        <div className="product-detail__image-area">
          <div className="product-detail__image-main">
            <img
              src={
                selectedColor?.images?.[0]
              }
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: "400px",
              }}
            />

            {product.tag && (
              <span className="product-detail__tag">
                {product.tag}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="product-detail__info">
          <p className="product-detail__category">
            {product.category?.name}
          </p>

          <h1 className="product-detail__name">
            {product.name}
          </h1>

          <p className="product-detail__desc">
            {product.description}
          </p>

          <div className="product-detail__price-row">
            <span className="product-detail__price">
              ₹{product.price}
            </span>

            <span className="product-detail__original">
              ₹{product.originalPrice}
            </span>

            <span className="product-detail__badge">
              -{discount}% OFF
            </span>
          </div>

          {/* Colors */}
          <div className="product-detail__colors">
            <p>Select Color</p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {product.colors?.map(
                (color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(
                        color
                      );
                      setSelectedSize(
                        null
                      );
                    }}
                  >
                    {color.name}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Sizes */}
          {selectedColor?.sizes?.length > 0 && (
  <div className="product-detail__sizes">
    <p className="product-detail__sizes-label">
      Select Size *
    </p>

    <div className="product-detail__sizes-row">
      {selectedColor.sizes.map(
        (sizeObj) => (
          <button
            key={sizeObj.size}
            className={`product-detail__size-btn ${
              selectedSize ===
              sizeObj.size
                ? "product-detail__size-btn--active"
                : ""
            }`}
            onClick={() =>
              setSelectedSize(
                sizeObj.size
              )
            }
          >
            {sizeObj.size}
            ({sizeObj.stock})
          </button>
        )
      )}
    </div>
  </div>
)}

          {/* Quantity */}
          <div className="product-detail__qty-row">
            <p className="product-detail__sizes-label">
              Quantity
            </p>

            <div className="product-detail__qty">
              <button
                onClick={() =>
                  setQty((q) =>
                    Math.max(1, q - 1)
                  )
                }
              >
                −
              </button>

              <span>{qty}</span>

              <button
                onClick={() =>
                  setQty((q) => q + 1)
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="product-detail__actions">
            <button
              className={`btn-primary product-detail__add-btn ${
                added
                  ? "product-detail__add-btn--success"
                  : ""
              }`}
              onClick={handleAdd}
              disabled={
  selectedColor?.sizes?.length > 0 &&
  !selectedSize
}
            >
              {added
                ? "✓ Added to Cart!"
                : "🛒 Add to Cart"}
            </button>

            <button
              className="btn-outline"
              onClick={() =>
                navigate("/contact")
              }
            >
              Custom Order
            </button>
          </div>

          {selectedColor?.sizes?.length > 0 &&
  !selectedSize && (
    <p className="product-detail__size-warn">
      ⚠️ Please select a size
      before adding to cart
    </p>
)}

          <div className="product-detail__trust">
            {[
              "🚚 Free shipping above ₹999",
              "↩️ Easy 7-day returns",
              "🌿 Skin-safe certified",
            ].map((t) => (
              <span
                key={t}
                className="product-detail__trust-item"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}