import React, { useState, useEffect } from "react";
import { getCategories, postCategory } from "../../../services/apiService";
const Category = () => {
  const [categories, setCategories] = useState([]); // Lưu danh sách danh mục
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [newCategory, setNewCategory] = useState(""); // Dữ liệu danh mục mới

  // Lấy danh sách danh mục với phân trang
  const fetchCategories = async (page, limit) => {
    try {
      const data = await getCategories(page, limit);
      setCategories(data.categories); // Giả sử data trả về dưới dạng { categories: [...] }
      setTotalPages(data.totalPages); // Giả sử data có tổng số trang
    } catch (error) {
      console.error("Có lỗi khi lấy danh mục:", error);
    }
  };

  // Gọi API để lấy danh mục khi component mount hoặc khi page thay đổi
  useEffect(() => {
    const limit = 10; // Số mục mỗi trang
    fetchCategories(page, limit);
  }, [page]); // Chỉ gọi lại khi page thay đổi

  // Hàm chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); // Cập nhật trang hiện tại
    }
  };

  // Hàm xử lý thêm danh mục mới
  const handleAddCategory = async () => {
    try {
      if (newCategory.trim() === "") {
        alert("Vui lòng nhập tên danh mục.");
        return;
      }

      await postCategory(newCategory); // Gọi API để thêm danh mục mới
      setNewCategory(""); // Reset input
      fetchCategories(page, 10); // Lấy lại danh sách danh mục sau khi thêm
    } catch (error) {
      console.error("Có lỗi khi thêm danh mục:", error);
    }
  };

  return (
    <div>
      <h2>Danh Mục</h2>

      {/* Form để thêm danh mục mới */}
      <div>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nhập tên danh mục"
        />
        <button onClick={handleAddCategory}>Thêm Danh Mục</button>
      </div>

      {/* Hiển thị danh sách danh mục */}
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>

      {/* Hiển thị nút phân trang */}
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Category;
