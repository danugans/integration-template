import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router";

import NavbarAdmin from "../components/NavbarAdmin";
import DeleteData from "../components/modal/DeleteData";

import dataCategory from "../fakeData/category";
import imgEmpty from "../assets/empty.svg";

// Get API config here ...

export default function CategoryAdmin() {
  let history = useHistory();

  const title = "Category admin";
  document.title = "DumbMerch | " + title;

  // Variabel for store category data
  const [categories, setCategories] = useState([]);

  // Create variabel for id category and confirm delete data with useState here ...

  // Init useState & function for handle show-hide modal confirm here ...

  // Fetching categories data from database
  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      // Store categories data to useState variabel
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleEdit = (id) => {
    history.push(`update-category/${id}`);
  };

  // Create function handle get id category & show modal confirm delete data here ...

  /// Create function for handle delete category here ...
  // If confirm is true, execute delete data

  // Call function for handle close modal and execute delete data with useEffect here ...

  const addCategory = () => {
    history.push("/add-category");
  };

  return (
    <>
      <NavbarAdmin title={title} />

      <Container className="py-5">
        <Row>
          <Col>
            <div className="text-header-category mb-4">List Category</div>
          </Col>
          <Col className="text-end">
            <Button
              onClick={addCategory}
              className="btn-dark"
              style={{ width: "100px" }}
            >
              Add
            </Button>
          </Col>
          <Col xs="12">
            {categories.length != 0 ? (
              <Table striped hover size="lg" variant="dark">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Category Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((item, index) => (
                    <tr>
                      <td width="10%" className="align-middle">
                        {index + 1}
                      </td>
                      <td width="60%" className="align-middle">
                        {item.name}
                      </td>
                      <td width="30%">
                        <Button
                          onClick={() => {
                            handleEdit(item.id);
                          }}
                          className="btn-sm btn-success me-2"
                          style={{ width: "135px" }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          className="btn-sm btn-danger"
                          style={{ width: "135px" }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center pt-5">
                <img
                  src={imgEmpty}
                  className="img-fluid"
                  style={{ width: "40%" }}
                />
                <div className="mt-3">No data category</div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}
