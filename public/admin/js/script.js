// Button Status
const listButtonStatus = document.querySelectorAll("[button-status]");

if (listButtonStatus.length > 0) {
  let url = new URL(window.location.href);

  listButtonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
// End Button Status

// Form Search
const formSearch = document.querySelector("#form-search");

if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = event.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Form Search

// Button Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if (listButtonPagination.length > 0) {
  let url = new URL(window.location.href);

  listButtonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
// End Button Pagination

// show-alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));

  // Sau time giây sẽ đóng thông báo
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  // Khi click vào nút close-alert sẽ đóng luôn
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End show-alert

// Button checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const listInputCheckbox = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("change", () => {
    listInputCheckbox.forEach(input => {
      input.checked = inputCheckAll.checked;
    });
  });

  listInputCheckbox.forEach(input => {
    input.addEventListener("change", () => {
      let isAllChecked = true;
      listInputCheckbox.forEach(input => {
        if (!input.checked) {
          isAllChecked = false;
        }
      });
      inputCheckAll.checked = isAllChecked;
    })
  });
}
// End checkbox multi

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const listInputIdChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
    const typeChange = event.target.elements.type.value;

    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này?");
      if (!isConfirm) return;
    }

    if (listInputIdChecked.length > 0) {
      let ids = [];

      listInputIdChecked.forEach(input => {
        const id = input.value;

        if (typeChange == "change-position") {
          const position = input.closest("tr").querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      const stringIds = ids.join(", ");
      formChangeMulti.querySelector("input[name='ids']").value = stringIds;

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để thực hiện thao tác!");
    }
  });
}
// End Form change multi

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
  const deleteImagePreview = uploadImage.querySelector('#delete-image');
  const imageContainer = uploadImage.querySelector('.image-container');

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
      if (deleteImagePreview) {
        imageContainer.style.display = 'inline-block';
        deleteImagePreview.style.display = 'block';
      }
    }
  });

  if (deleteImagePreview) {
    deleteImagePreview.addEventListener('click', () => {
      uploadImageInput.value = '';
      uploadImagePreview.src = '';
      imageContainer.style.display = 'none';
      deleteImagePreview.style.display = 'none';
    });
  }
}
// End Upload Image

// Sort
const sort = document.querySelector("[sort]");
if (sort) {
  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  const url = new URL(window.location.href);

  sortSelect.addEventListener("change", () => {
    const [sortKey, sortValue] = sortSelect.value.split("-");
    if (sortKey && sortValue) {
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);

      window.location.href = url.href;
    }
  });

  // Thêm selected mặc định cho option
  const defaultSortKey = url.searchParams.get("sortKey");
  const defaultSortValue = url.searchParams.get("sortValue");

  if (defaultSortKey && defaultSortValue) {
    const optionSelected = sortSelect.querySelector(`option[value="${defaultSortKey}-${defaultSortValue}"]`);
    optionSelected.selected = true;
  }

  if (sortClear) {
    sortClear.addEventListener("click", () => {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
      window.location.href = url.href;
    })
  }
}
// End Sort