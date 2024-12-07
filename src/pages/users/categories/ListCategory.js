import React, { useEffect, useState } from "react";
import {
  getCategories,
  getProductByCategoryId,
} from "../../../services/apiService";
import "./ListCategory.scss";
import { useNavigate, useParams } from "react-router-dom";

const ListCategory = (props) => {
  const [categories, setCategories] = useState([]);
  const LIMIT_PRODUCTS = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetchListCategory();
  }, []);

  const fetchListCategory = async (page) => {
    let data = await getCategories(1, LIMIT_PRODUCTS);
    console.log(">>>>> check data listcategory", data);
    setCategories(data);
  };

  const handleCategoryClick = (categoryId) => {
    console.log("check category", categoryId);

    navigate(`/products/category/${categoryId}`);
  };

  return (
    <div className="category-list">
      <h3>Danh Mục Sản Phẩm</h3>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="category-item"
            onClick={() => handleCategoryClick(category.id, 0)}
          >
            <span>{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCategory;
