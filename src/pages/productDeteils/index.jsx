import React from "react";
import { useParams } from "react-router-dom";
import { useRootContext } from "../../context/RootContext";

function ProductDeteils(props) {
  const { product } = useRootContext();
  const { proID } = useParams();

  let findProduct = product.find((el) => el.id === +proID);
  console.log(findProduct);

  return (
    <div>
      <div className="container">
        <div className="productDeteil py-[40px]">
          <img src={findProduct.image} alt="" width={"300px"} />
        </div>
      </div>
    </div>
  );
}

export default ProductDeteils;
