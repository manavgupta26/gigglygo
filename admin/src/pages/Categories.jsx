import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";
import { uploadImage } from "../api/uploadApi";
import "./Categories.css";

export default function Categories() {
  const [editImage, setEditImage] = useState({ url: "", public_id: "" });
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data.categories);
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    setCreating(true);
    await createCategory({
      name,
      slug: name.toLowerCase().replaceAll(" ", "-"),
    });
    setName("");
    setCreating(false);
    loadCategories();
  };

  const handleUpdate = async (id) => {
    if (uploading) {
      alert("Please wait for image upload to finish.");
      return;
    }
    await updateCategory(id, { name: editName, image: editImage });
    setEditingId(null);
    setEditName("");
    setEditImage({ url: "", public_id: "" });
    loadCategories();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category and all products inside it?")) return;
    setDeletingId(id);
    await deleteCategory(id);
    setDeletingId(null);
    loadCategories();
  };

  const handleCategoryImageUpload = async (file) => {
    try {
      setUploading(true);
      const response = await uploadImage(file);
      setEditImage({ url: response.url, public_id: response.public_id });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditImage({ url: "", public_id: "" });
  };

  return (
    <div className="cat-page">
      {/* Header */}
      <div className="cat-header">
        <div>
          <h1 className="cat-title">Categories</h1>
          <p className="cat-subtitle">{categories.length} categor{categories.length !== 1 ? "ies" : "y"}</p>
        </div>
      </div>

      {/* Create */}
      <div className="cat-create-bar">
        <input
          className="cat-input"
          placeholder="New category name…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
        <button
          className="btn btn-primary"
          onClick={handleCreate}
          disabled={creating || !name.trim()}
        >
          {creating ? (
            <>
              <span className="btn-spinner" />
              Adding…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </>
          )}
        </button>
      </div>

      {/* List */}
      <div className="cat-list">
        {categories.length === 0 && (
          <div className="cat-empty">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            <p>No categories yet. Create one above.</p>
          </div>
        )}

        {categories.map((c) => (
          <div className={`cat-row ${editingId === c._id ? "cat-row--editing" : ""}`} key={c._id}>
            {editingId === c._id ? (
              /* ── Edit mode ── */
              <div className="cat-edit-form">
                <input
                  className="cat-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Category name"
                  autoFocus
                />

                <div className="cat-edit-image-row">
                  <label className="upload-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    {uploading ? "Uploading…" : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleCategoryImageUpload(e.target.files[0])}
                    />
                  </label>

                  {editImage?.url && (
                    <div className="edit-thumb-wrap">
                      <img src={editImage.url} alt="" className="edit-thumb" />
                      <button
                        className="btn-remove-img"
                        onClick={() => setEditImage({ url: "", public_id: "" })}
                        title="Remove image"
                      >×</button>
                    </div>
                  )}
                </div>

                <div className="cat-edit-actions">
                  <button
                    className="btn btn-primary"
                    disabled={uploading || !editName.trim()}
                    onClick={() => handleUpdate(c._id)}
                  >
                    {uploading ? "Uploading…" : "Save Changes"}
                  </button>
                  <button className="btn btn-ghost" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* ── View mode ── */
              <>
                <div className="cat-info">
                  {c.image?.url ? (
                    <img src={c.image.url} alt={c.name} className="cat-thumb" />
                  ) : (
                    <div className="cat-thumb cat-thumb-placeholder">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="cat-name">{c.name}</span>
                </div>

                <div className="cat-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingId(c._id);
                      setEditName(c.name);
                      setEditImage(c.image || { url: "", public_id: "" });
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    disabled={deletingId === c._id}
                    onClick={() => handleDelete(c._id)}
                  >
                    {deletingId === c._id ? (
                      <span className="btn-spinner btn-spinner--red" />
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    )}
                    {deletingId === c._id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}