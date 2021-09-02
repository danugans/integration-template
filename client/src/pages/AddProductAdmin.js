import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router";

import NavbarAdmin from "../components/NavbarAdmin";

import { API } from "../config/api";

export default function AddProductAdmin() {
  console.clear();
  const title = "Product admin";
  document.title = "DumbMerch | " + title;

  let history = useHistory();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  }); //Store product data

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked == true) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      console.log(form);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log(response);

      history.push("/product-admin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Add Product</div>
          </Col>
          <Col xs="12">
            <form onSubmit={handleSubmit}>
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    alt="preview"
                  />
                </div>
              )}
              <input type="file" id="upload" name="image" hidden onChange={handleChange} />
              <label for="upload" className="label-file-add-product">
                Upload file
              </label>
              <input
                type="text"
                placeholder="Product Name"
                name="name"
                onChange={handleChange}
                className="input-edit-category mt-4"
              />
              <textarea
                placeholder="Product Desc"
                name="desc"
                onChange={handleChange}
                className="input-edit-category mt-4"
                style={{ height: "130px" }}
              ></textarea>
              <input
                type="number"
                placeholder="Price (Rp.)"
                name="price"
                onChange={handleChange}
                className="input-edit-category mt-4"
              />
              <input
                type="number"
                placeholder="Stock"
                name="qty"
                onChange={handleChange}
                className="input-edit-category mt-4"
              />

              <div className="card-form-input mt-4 px-2 py-1 pb-2">
                <div className="text-secondary mb-1" style={{ fontSize: "15px" }}>
                  Category
                </div>
                {categories.map((item, index) => (
                  <label key={index} className="checkbox-inline me-4">
                    <input type="checkbox" value={item.id} onClick={handleChangeCategoryId} /> {item.name}
                  </label>
                ))}
              </div>

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Add
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
