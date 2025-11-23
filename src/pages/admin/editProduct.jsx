import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MediaUpload from "../../utils/mediaUpload";

export default function EditProductForm() {
    const locationData = useLocation();
      const navigate = useNavigate();
if(locationData.state == null){
    toast.error("Please select a product to edit");
    window.location.href="/admin/products";
}
  const [productId, setProductId] = useState(locationData.state.productId);
  const [name, setName] = useState(locationData.state.name);
  const [altNames, setAltNames] = useState(locationData.state.altNames.join(","));
  const [price, setPrice] = useState(locationData.state.price);
  const [labeledPrice, setLabaledPrice] = useState(locationData.state.labeledPrice);
  const [description, setDescription] = useState(locationData.state.description);
  const [stock, setStock] = useState(locationData.state.stock);
  const [images, setImages] = useState([]);

  async function handleSubmit() {
    const promisesArary = [];
    for (let i = 0; i < images.length; i++) {
      const promise = MediaUpload(images[i]);
      promisesArary[i] = promise;
    }
    try {
      let result = await Promise.all(promisesArary);

      if(images.length == 0){
        result = locationData.state.images
      }
      const altNamesArray = altNames.split(",");
      const product = {
        name: name,
        altNames: altNamesArray,
        price: price,
        labeledPrice: labeledPrice,
        description: description,
        stock: stock,
        images: result,
      };
      const token = localStorage.getItem("token");
      console.log(token);

      await axios.put(
        import.meta.env.VITE_BACKEND_URL+"/api/product/"+productId,
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      toast.error("Prdouct Updating Failed");
    }
  }

  return (
    <div className="w-full h-full rounded-lg flex items-center justify-center">
      <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-700 m-[10px]">
          Edit Product
        </h1>
        <input
          value={productId}
          disabled
          onChange={(e) => {
            setProductId(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product ID"
        />
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product Name"
        />
        <input
          value={altNames}
          onChange={(e) => {
            setAltNames(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Alternative Names"
        />
        <input
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          type="number"
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Price"
        />
        <input
          value={labeledPrice}
          onChange={(e) => {
            setLabaledPrice(e.target.value);
          }}
          type="number"
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Labeled Price"
        />
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Description"
        />
        <input
          type="file"
          onChange={(e) => {
            setImages(e.target.files);
          }}
          multiple
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product Images"
        />
        <input
          value={stock}
          onChange={(e) => {
            setStock(e.target.value);
          }}
          type="number"
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Stock"
        />
        <div className="w-[400px] h-[100px] flex items-center justify-between rounded-lg">
          <Link
            to="/admin/products"
            className="bg-red-500 text-white p-[10px] w-[180px] text-center rounded-lg hover:bg-red-600 cursor-pointer"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            to="/admin/products"
            className="bg-green-500 text-white p-[10px] w-[180px] ml-[10px] text-center rounded-lg hover:bg-green-600 cursor-pointer"
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}
