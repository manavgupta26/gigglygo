import { useEffect, useState } from "react";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../api/productApi";
import { uploadImage } from "../api/uploadApi";
import { getCategories, createCategory } from "../api/categoryApi";
import "./AddProduct.css";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    category: "",
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    price: "",
    originalPrice: "",
    discount: "",
    tag: "",
    featured: false,
    bestSeller: false,
    isActive: true,
  });

  const [colors, setColors] = useState([
    { name: "", stock: 0, images: [], sizes: [] },
  ]);

  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addColor = () =>
    setColors([...colors, { name: "", stock: 0, images: [], sizes: [] }]);

  const removeColor = (i) => setColors(colors.filter((_, idx) => idx !== i));

  // CHANGE 1: reset color.stock to 0 when the first size is added
  const addSize = (colorIndex) => {
    const updated = [...colors];
    if (updated[colorIndex].sizes.length === 0) {
      updated[colorIndex].stock = 0;
    }
    updated[colorIndex].sizes.push({ size: "", stock: 0 });
    setColors(updated);
  };

  const removeSize = (colorIndex, sizeIndex) => {
    const updated = [...colors];
    updated[colorIndex].sizes.splice(sizeIndex, 1);
    setColors(updated);
  };

  const handleImageUpload = async (colorIndex, files) => {
    const updated = [...colors];
    for (const file of files) {
      const response = await uploadImage(file);
      updated[colorIndex].images.push(response.url);
    }
    setColors(updated);
  };

  useEffect(() => {
    loadCategories();
    if (isEdit) loadProduct();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data.categories);
  };

  const loadProduct = async () => {
    const data = await getProductById(id);
    const product = data.product;
    setForm({
      category: product.category._id,
      name: product.name || "",
      slug: product.slug || "",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      price: product.price || "",
      originalPrice: product.originalPrice || "",
      discount: product.discount || "",
      tag: product.tag || "",
      featured: product.featured || false,
      bestSeller: product.bestSeller || false,
      isActive: product.isActive ?? true,
    });
    setColors(product.colors || []);
  };

  const handleCreateCategory = async () => {
    try {
      const data = await createCategory(newCategory);
      await loadCategories();
      setForm((prev) => ({ ...prev, category: data.category._id }));
      setShowNewCategory(false);
      setNewCategory({ name: "", slug: "", description: "" });
      alert("Category Created");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create category");
    }
  };

  // CHANGE 2: clean colors payload before submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedColors = colors.map((color) => ({
      ...color,
      stock: color.sizes.length > 0 ? 0 : color.stock,
    }));

    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      discount: Number(form.discount),
      colors: cleanedColors,
    };

    if (isEdit) {
      await updateProduct(id, payload);
      alert("Product Updated");
    } else {
      await createProduct(payload);
      alert("Product Created");
    }

    navigate("/products");
  };

  return (
    <div className="ap-page">
      <div className="ap-page-title">{isEdit ? "Edit Product" : "Add Product"}</div>

      <form onSubmit={handleSubmit}>

        {/* Category */}
        <div className="ap-section">
          <div className="ap-section-title">Category</div>
          <div className="ap-field">
            <label>Select Category</label>
            <select
              className="ap-select"
              value={form.category}
              onChange={(e) => {
                if (e.target.value === "new-category") {
                  setShowNewCategory(true);
                  return;
                }
                setField("category", e.target.value);
              }}
            >
              <option value="">— Choose a category —</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
              <option value="new-category">+ Add New Category</option>
            </select>
          </div>

          {showNewCategory && (
            <div className="ap-new-category-box">
              <div className="ap-new-category-box-title">New Category</div>
              <div className="ap-field">
                <label>Name</label>
                <input
                  className="ap-input"
                  placeholder="e.g. Footwear"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
                    })
                  }
                />
              </div>
              <div className="ap-field">
                <label>Slug</label>
                <input
                  className="ap-input"
                  placeholder="footwear"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                />
              </div>
              <div className="ap-field">
                <label>Description</label>
                <textarea
                  className="ap-textarea"
                  rows={3}
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
              </div>
              <div className="ap-new-category-actions">
                <button type="button" className="ap-btn-primary" onClick={handleCreateCategory}>
                  Create Category
                </button>
                <button type="button" className="ap-btn-secondary" onClick={() => setShowNewCategory(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="ap-section">
          <div className="ap-section-title">Basic Info</div>
          <div className="ap-field">
            <label>Product Name</label>
            <input className="ap-input" placeholder="e.g. Nike Air Force 1" value={form.name}
              onChange={(e) => setField("name", e.target.value)} />
          </div>
          <div className="ap-field">
            <label>Slug</label>
            <input className="ap-input" placeholder="nike-air-force-1" value={form.slug}
              onChange={(e) => setField("slug", e.target.value)} />
          </div>
          <div className="ap-field">
            <label>Tag</label>
            <input className="ap-input" placeholder="e.g. New Arrival" value={form.tag}
              onChange={(e) => setField("tag", e.target.value)} />
          </div>
          <div className="ap-field">
            <label>Short Description</label>
            <textarea className="ap-textarea" rows={3} value={form.shortDescription}
              onChange={(e) => setField("shortDescription", e.target.value)} />
          </div>
          <div className="ap-field">
            <label>Full Description</label>
            <textarea className="ap-textarea" rows={6} value={form.description}
              onChange={(e) => setField("description", e.target.value)} />
          </div>
        </div>

        {/* Pricing */}
        <div className="ap-section">
          <div className="ap-section-title">Pricing</div>
          <div className="ap-row-3">
            <div className="ap-field">
              <label>Price</label>
              <input className="ap-input" type="number" placeholder="0" value={form.price}
                onChange={(e) => setField("price", e.target.value)} />
            </div>
            <div className="ap-field">
              <label>Original Price</label>
              <input className="ap-input" type="number" placeholder="0" value={form.originalPrice}
                onChange={(e) => setField("originalPrice", e.target.value)} />
            </div>
            <div className="ap-field">
              <label>Discount %</label>
              <input className="ap-input" type="number" placeholder="0" value={form.discount}
                onChange={(e) => setField("discount", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Flags */}
        <div className="ap-section">
          <div className="ap-section-title">Flags</div>
          <div className="ap-checkbox-row">
            <label className="ap-checkbox-label">
              <input type="checkbox" checked={form.featured}
                onChange={(e) => setField("featured", e.target.checked)} />
              Featured Product
            </label>
            <label className="ap-checkbox-label">
              <input type="checkbox" checked={form.bestSeller}
                onChange={(e) => setField("bestSeller", e.target.checked)} />
              Best Seller
            </label>
            <label className="ap-checkbox-label">
              <input type="checkbox" checked={form.isActive}
                onChange={(e) => setField("isActive", e.target.checked)} />
              Active
            </label>
          </div>
        </div>

        {/* Colors & Variants */}
        <div className="ap-section">
          <div className="ap-section-title">Colors & Variants</div>

          {colors.map((color, colorIndex) => (
            <div key={colorIndex} className="ap-color-card">
              <div className="ap-color-card-header">
                <span className="ap-color-card-title">
                  Color {colorIndex + 1}{color.name ? ` — ${color.name}` : ""}
                </span>
                {colors.length > 1 && (
                  <button type="button" className="ap-btn-remove" onClick={() => removeColor(colorIndex)}>
                    Remove
                  </button>
                )}
              </div>

              {/* CHANGE 3: conditionally show stock input or total stock display */}
              <div className="ap-row-2">
                <div className="ap-field">
                  <label>Color Name</label>
                  <input className="ap-input" placeholder="e.g. White" value={color.name}
                    onChange={(e) => {
                      const updated = [...colors];
                      updated[colorIndex].name = e.target.value;
                      setColors(updated);
                    }} />
                </div>

                {color.sizes.length === 0 ? (
                  // Requirement 1: no sizes → show editable stock input
                  <div className="ap-field">
                    <label>Stock</label>
                    <input
                      className="ap-input"
                      type="number"
                      placeholder="0"
                      value={color.stock}
                      onChange={(e) => {
                        const updated = [...colors];
                        updated[colorIndex].stock = Number(e.target.value);
                        setColors(updated);
                      }}
                    />
                  </div>
                ) : (
                  // Requirement 2 & 5: sizes exist → hide input, show computed total
                  <div className="ap-field">
                    <label>Total Stock</label>
                    <div
                      className="ap-input"
                      style={{
                        background: "var(--bg-secondary, #f5f5f5)",
                        cursor: "default",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {color.sizes.reduce((sum, s) => sum + (Number(s.stock) || 0), 0)}
                    </div>
                  </div>
                )}
              </div>

              <div className="ap-field">
                <label>Images</label>
                <input type="file" multiple accept="image/*"
                  onChange={(e) => handleImageUpload(colorIndex, e.target.files)} />
                {color.images.length > 0 && (
                  <div className="ap-images-wrap">
                    {color.images.map((img, i) => (
                      <img key={i} src={img} alt="" className="ap-image-thumb" />
                    ))}
                  </div>
                )}
              </div>

              <div className="ap-field">
                <label>Sizes</label>
                {color.sizes.length === 0 && (
                  <p className="ap-empty-hint-sm">No sizes added yet.</p>
                )}
                {color.sizes.map((size, sizeIndex) => (
                  <div key={sizeIndex} className="ap-size-row">
                    <input className="ap-input" placeholder="Size (e.g. 42)" value={size.size}
                      onChange={(e) => {
                        const updated = [...colors];
                        updated[colorIndex].sizes[sizeIndex].size = e.target.value;
                        setColors(updated);
                      }} />
                    <input className="ap-input" type="number" placeholder="Stock" value={size.stock}
                      onChange={(e) => {
                        const updated = [...colors];
                        updated[colorIndex].sizes[sizeIndex].stock = Number(e.target.value);
                        setColors(updated);
                      }} />
                    <button type="button" className="ap-btn-remove"
                      onClick={() => removeSize(colorIndex, sizeIndex)}>✕</button>
                  </div>
                ))}
                <button type="button" className="ap-btn-secondary" onClick={() => addSize(colorIndex)}>
                  + Add Size
                </button>
              </div>
            </div>
          ))}

          <button type="button" className="ap-btn-secondary" onClick={addColor}>
            + Add Color
          </button>
        </div>

        {/* CHANGE 4: dynamic submit label */}
        <div className="ap-form-footer">
          <button type="submit" className="ap-btn-primary">
            {isEdit ? "Update Product" : "Create Product"}
          </button>
        </div>

      </form>
    </div>
  );
}