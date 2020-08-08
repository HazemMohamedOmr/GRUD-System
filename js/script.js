var inputProductName = document.getElementById("inputProductName"),
    inputProductPrice = document.getElementById("inputProductPrice"),
    inputProductCate = document.getElementById("inputProductCate"),
    inputProductDesc = document.getElementById("inputProductDesc"),
    inputProductSearch = document.getElementById("inputProductSearch"),
    productName = document.getElementById("productName"),
    productPrice = document.getElementById("productPrice"),
    productCate = document.getElementById("productCate"),
    productDesc = document.getElementById("productDesc"),
    productList;

if (localStorage.getItem("Products") == null) {
    productList = [];
}
else {
    productList = JSON.parse(localStorage.getItem("Products"));
    displayProduct(productList);
}


function addProduct() {
    var newProduct = {
        name: inputProductName.value,
        price: inputProductPrice.value,
        category: inputProductCate.value,
        description: inputProductDesc.value
    }

    productList.push(newProduct);

    localStorage.setItem("Products", JSON.stringify(productList));

    displayProduct(productList);

    clearForm();
}


function displayProduct(anyArray) {
    var box = "";

    for (var i = 0; i < anyArray.length; i++) {
        box += `<tr>
                    <td>${i + 1}</td>
                    <td>${anyArray[i].name}</td>
                    <td>${anyArray[i].price}</td>
                    <td>${anyArray[i].category}</td>
                    <td>${anyArray[i].description}</td>
                    <td>
                        <button onclick="updateProducts(${i});" type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">Update</button>
                    </td>
                    <td>
                        <button onclick="deleteProduct(${i});" class="btn btn-danger">Delete</button>
                    </td>
                </tr>`
    }

    document.getElementById("tableBody").innerHTML = box;
}

function clearForm() {
    inputProductName.value = "";
    inputProductPrice.value = "";
    inputProductCate.value = "";
    inputProductDesc.value = "";
}

function deleteProduct(index) {
    productList.splice(index, 1);

    localStorage.setItem("Products", JSON.stringify(productList));

    displayProduct(productList);
}

function searchProducts() {
    var wantedProdcuts = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(inputProductSearch.value.toLowerCase()) == true)
            wantedProdcuts.push(productList[i]);
    }

    displayProduct(wantedProdcuts);
}

function updateProducts(index) {
    displayDesc(index);

    document.getElementById("modal-footer").innerHTML = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                           <button type="button" data-dismiss="modal" aria-label="Close" onclick="saveUpdates(${index});" class="btn btn-primary">Save changes</button>`
}

function displayDesc(index) {
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCate.value = productList[index].category;
    productDesc.value = productList[index].description;
}

function saveUpdates(index) {
    productList[index].name = productName.value;
    productList[index].price = productPrice.value;
    productList[index].category = productCate.value;
    productList[index].description = productDesc.value;

    localStorage.setItem("Products", JSON.stringify(productList));

    displayProduct(productList);
}